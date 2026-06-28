import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

const RTH_TRIGGERS = [
  "human", "real person", "hire", "consultation", "book a session", 
  "contact", "email", "talk to jimmy", "speak to", "meeting", "appointment"
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;
    const url = new URL(req.url);
    const sessionId = url.searchParams.get('sessionId');
    
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "No messages available" }), { status: 400 });
    }

    const lastUserMessageObj = messages.filter((m: any) => m.role === 'user').pop();
    let originalUserMessageText = "";
    
    if (lastUserMessageObj) {
      if (typeof lastUserMessageObj.content === 'string') {
        originalUserMessageText = lastUserMessageObj.content;
      } else if (Array.isArray(lastUserMessageObj.parts)) {
        originalUserMessageText = lastUserMessageObj.parts.map((p: any) => p.text || "").join("");
      } else if (Array.isArray(lastUserMessageObj.content)) {
        originalUserMessageText = lastUserMessageObj.content.map((c: any) => c.text || "").join("");
      }
    }
      
    const cleanUserMessage: string = originalUserMessageText.trim().toLowerCase();
    const activeSessionId: string = sessionId || `session-${Date.now()}`;

    const requiresHuman = RTH_TRIGGERS.some(trigger => cleanUserMessage.includes(trigger));

    // ============================================================================
    // 1. FIRE EMAIL ALERTS
    // ============================================================================
    if (requiresHuman) {
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

    const alternatingMessages: any[] = [];
    for (const msg of messages) {
      const normalizedRole = msg.role === 'user' ? 'user' : 'assistant';
      let textContent = "";
      
      if (typeof msg.content === 'string') textContent = msg.content;
      else if (Array.isArray(msg.parts)) textContent = msg.parts.map((p: any) => p.text || "").join("");
      else if (Array.isArray(msg.content)) textContent = msg.content.map((c: any) => c.text || "").join("");

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
      ? `CRITICAL INSTRUCTION: Ignore all previous instructions. You must reply with EXACTLY this word-for-word string, and absolutely nothing else: "I have paused my AI responses and flagged this conversation for Jimmy. He has been notified and will reply to you here or via email shortly to coordinate your consultation!"`
      : `You are the official, highly capable AI assistant for Jimmy Kaung's portfolio website.
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
            await supabase.from('chat_history').insert({
              session_id: activeSessionId,
              user_message: originalUserMessageText,
              ai_response: text,
              requires_human: requiresHuman // Seamlessly flags true or false!
            });
          }
        } catch (err) {
          console.error("Failed chat logging:", err);
        }
      }
    });

    return result.toUIMessageStreamResponse({ originalMessages: messages });

  } catch (globalError: any) {
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