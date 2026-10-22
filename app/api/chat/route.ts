import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
// Server-side chat writes must use the service role. The former anon-first order
// allowed email alerts to succeed while RLS silently rejected the inbox record.
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const RTH_TRIGGERS = [
  "human", "real person", "hire", "consultation", "book a session", 
  "contact", "email", "talk to jimmy", "speak to", "meeting", "appointment"
];

export async function GET(req: Request) {
  const sessionId = new URL(req.url).searchParams.get('sessionId') || '';
  if (!/^session-[a-zA-Z0-9-]{20,80}$/.test(sessionId)) {
    return Response.json({ error: 'Invalid chat session.' }, { status: 400 });
  }
  const { data, error } = await supabase
    .from('chat_history')
    .select('id, ai_response, created_at')
    .eq('session_id', sessionId)
    .eq('user_message', 'SYSTEM_ADMIN_OVERRIDE')
    .order('created_at', { ascending: true });
  if (error) {
    console.error('Admin reply retrieval failed:', error);
    return Response.json({ error: 'Replies are temporarily unavailable.' }, { status: 500 });
  }
  return Response.json({ replies: data || [] }, { headers: { 'Cache-Control': 'no-store' } });
}

type IncomingChatMessage = {
  role?: string;
  content?: string | Array<{ text?: string }>;
  parts?: Array<{ text?: string }>;
};

function messageText(message: IncomingChatMessage) {
  if (typeof message.content === 'string') return message.content;
  if (Array.isArray(message.parts)) return message.parts.map((part) => part.text || '').join('');
  if (Array.isArray(message.content)) return message.content.map((part) => part.text || '').join('');
  return '';
}

export async function POST(req: Request) {
  try {
    const body = await req.json() as { messages?: IncomingChatMessage[] };
    const messages = body.messages;
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('sessionId');
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages available" }), { status: 400 });
    }

    const lastUserMessageObj = messages.filter((message) => message.role === 'user').pop();
    const originalUserMessageText = lastUserMessageObj ? messageText(lastUserMessageObj) : '';
      
    const cleanUserMessage: string = originalUserMessageText.trim().toLowerCase();
    const activeSessionId: string = sessionId || `session-${Date.now()}`;

    const requiresHuman = RTH_TRIGGERS.some(trigger => cleanUserMessage.includes(trigger));

    // Persist an RTH request before sending the email or starting the stream.
    // This makes the admin inbox the source of truth even when the visitor closes
    // the page before Gemini finishes generating its response.
    let routedTicketId: string | null = null;
    if (requiresHuman) {
      const { data: ticket, error: ticketError } = await supabase
        .from('chat_history')
        .insert({
          session_id: activeSessionId,
          user_message: originalUserMessageText,
          ai_response: 'Scouse routed this conversation to human support.',
          requires_human: true,
        })
        .select('id')
        .single();

      if (ticketError) {
        console.error('RTH persistence failed before email dispatch:', ticketError);
      } else {
        routedTicketId = ticket.id;
      }

      try {
        await sendSMTPAlert(originalUserMessageText, activeSessionId);
        console.log("✅ SMTP Alert successful!");
      } catch (err) {
        // If the email fails, it prints exactly why here so you can fix it!
        console.error("❌ SMTP Alert failed to send. Check App Password or Port:", err);
      }
    }

    // ============================================================================
    // 2. NORMAL AI PROCESSING & DYNAMIC CONTEXT
    // ============================================================================
    const { data: liveBlogPosts } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    const { data: liveAboutMe } = await supabase.from('about_me').select('*');
    const { data: liveGamesData } = await supabase.from('games_data').select('*');

    const livePortfolioData = {
      aboutMe: liveAboutMe || [], 
      blogPosts: liveBlogPosts || [], 
      gamesData: liveGamesData || []
    };

    const alternatingMessages: Array<{ role: 'user' | 'assistant'; content: string }> = [];
    for (const msg of messages) {
      const normalizedRole = msg.role === 'user' ? 'user' : 'assistant';
      const textContent = messageText(msg);

      if (alternatingMessages.length > 0 && alternatingMessages[alternatingMessages.length - 1].role === normalizedRole) {
        alternatingMessages[alternatingMessages.length - 1].content += "\n" + textContent;
      } else {
        alternatingMessages.push({ role: normalizedRole, content: textContent || "Hello" });
      }
    }

    const rawKeyString = process.env.GEMINI_API_KEYS || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
    const activeKey = rawKeyString.replace(/['"]/g, "").split(',')[0]?.trim();

    if (!activeKey) return new Response("Configuration Error: Missing API credentials.", { status: 400 });

    const googleProvider = createGoogleGenerativeAI({ apiKey: activeKey });

    // ============================================================================
    // 3. THE MAGIC FIX: FORCE GEMINI TO DELIVER THE RTH MESSAGE
    // ============================================================================
    const systemPrompt = requiresHuman
      ? `You are Scouse, Jimmy Kaung's AI portfolio guide. Reply with this handoff message: "I’m Scouse. I’ve flagged your conversation for Jimmy so he can follow up about your enquiry." Do not promise a reply time.`
      : `You are Scouse, the official AI portfolio guide for Jimmy Kaung (Kaung Htet Nyein Chan Oo).
        - Your name is Scouse. Always use that name when identifying yourself; never call yourself Jimmy or imply that you are a human.
        - On your first reply in a new conversation, briefly introduce yourself as Scouse, then answer the visitor's question. Do not repeat the introduction on every turn.
        - If asked your name, give one short sentence identifying yourself as Scouse, without repeating the name a second time.
        - You help visitors understand Jimmy's digital operations, product management, project delivery, writing, and interactive Lab work.
        - Be friendly, concise, professional, and grounded in the supplied portfolio data. Do not invent achievements, metrics, or experience.
        - ALWAYS match the exact language and script used by the user.
        Context: ${JSON.stringify(livePortfolioData)}
        Instructions: Answer queries based on the context. If asked about unrelated things, politely decline.`;

    const result = await streamText({
      model: googleProvider('gemini-2.5-flash'), 
      messages: alternatingMessages, 
      system: systemPrompt,
      onFinish: async ({ text }) => {
        try {
          if (originalUserMessageText && supabaseUrl && supabaseKey) {
            const operation = routedTicketId
              ? supabase.from('chat_history').update({ ai_response: text }).eq('id', routedTicketId)
              : supabase.from('chat_history').insert({
                  session_id: activeSessionId,
                  user_message: originalUserMessageText,
                  ai_response: text,
                  requires_human: requiresHuman,
                });
            const { error } = await operation;
            if (error) console.error('Chat history persistence rejected:', error);
          }
        } catch (err) {
          console.error("Failed chat logging:", err);
        }
      }
    });

    return result.toUIMessageStreamResponse();

  } catch (globalError: unknown) {
    console.error("Global chat router catch intercept:", globalError);
    return new Response("System Error", { status: 500 });
  }
}

// ============================================================================
// 4. ROBUST SMTP CONFIGURATION
// ============================================================================
async function sendSMTPAlert(userMessage: string, sessionId: string) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Explicitly routing to Gmail
    port: 465, // Force secure SSL port
    secure: true,
    auth: {
      user: process.env.SMTP_USER || 'jimmykg.spacex@gmail.com',
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER || 'jimmykg.spacex@gmail.com',
    to: 'jimmykg.spacex@gmail.com',
    subject: `🚨 Urgent: Portfolio Chat RTH Triggered!`,
    html: `
      <div style="font-family: sans-serif; color: #1f2937;">
        <h2 style="color: #ef4444;">Human Intervention Requested</h2>
        <p>A user on your portfolio just triggered the Route-to-Human protocol.</p>
        <div style="background: #f4f4f5; padding: 15px; border-left: 4px solid #3b82f6; margin-bottom: 20px; border-radius: 4px;">
          <strong>User Message:</strong><br/><br/>
          "${userMessage}"
        </div>
        <p><strong>Session ID:</strong> <code>${sessionId}</code></p>
      </div>
    `,
  };

  await transporter.sendMail(mailOptions);
}
