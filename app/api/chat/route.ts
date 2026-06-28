import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Initialize Supabase client using your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// ============================================================================
// 1. DEFINE YOUR ROUTE-TO-HUMAN (RTH) TRIGGERS
// ============================================================================
const RTH_TRIGGERS = [
  "human", "real person", "hire", "consultation", "book a session", 
  "contact", "email", "talk to jimmy", "speak to", "meeting", "appointment"
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages, sessionId } = body;
    
    // Extract the very last thing the user typed
    const lastUserMessageObj = messages.filter((m: any) => m.role === 'user').pop();
    const lastUserMessage = lastUserMessageObj ? lastUserMessageObj.content.toLowerCase() : "";
    const activeSessionId = sessionId || `session-${Date.now()}`;

    // ============================================================================
    // 2. THE INTERCEPTOR: Check for RTH before waking up Gemini
    // ============================================================================
    const requiresHuman = RTH_TRIGGERS.some(trigger => lastUserMessage.includes(trigger));

    if (requiresHuman) {
      const rthMessage = "I have paused my AI responses and flagged this conversation for Jimmy. He has been notified and will reply to you here or via email shortly to coordinate your consultation!";
      
      // Fire Email Alert asynchronously 
      sendSMTPAlert(lastUserMessage, activeSessionId);
      
      // Log the flagged ticket to Supabase for the Admin Panel
      if (supabaseUrl && supabaseKey) {
        await supabase.from('chat_history').insert({
          session_id: activeSessionId,
          user_message: lastUserMessage,
          ai_response: rthMessage,
          requires_human: true
        });
      }

      // Return the handoff message instantly (Bypassing Gemini completely)
      return new Response(rthMessage, { 
        status: 200, 
        headers: { 'Content-Type': 'text/plain' } 
      });
    }

    // ============================================================================
    // 3. NORMAL AI PROCESSING (Executes only if no triggers were detected)
    // ============================================================================

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase keys are missing. AI will not have access to live database.");
    }

    // DYNAMIC FETCH: Query live, up-to-date data directly from Supabase tables
    const { data: liveBlogPosts, error: blogError } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    const { data: liveAboutMe, error: aboutError } = await supabase.from('about_me').select('*');
    const { data: liveGamesData, error: gamesError } = await supabase.from('games_data').select('*');

    if (blogError || aboutError || gamesError) {
      console.error("Supabase fetch error:", blogError || aboutError || gamesError);
    }

    // Package the live dataset into the context layer
    const livePortfolioData = {
      aboutMe: liveAboutMe || [], 
      blogPosts: liveBlogPosts || [], 
      gamesData: liveGamesData || []
    };

    // CONSOLIDATION ENGINE: Merge consecutive same-role messages for Gemini compliance
    const alternatingMessages: any[] = [];
    for (const msg of messages) {
      const normalizedRole = msg.role === 'user' ? 'user' : 'assistant';
      
      let textContent = "";
      if (typeof msg.content === 'string') {
        textContent = msg.content;
      } else if (Array.isArray(msg.parts)) {
        textContent = msg.parts.map((p: any) => p.text || "").join("");
      } else if (Array.isArray(msg.content)) {
        textContent = msg.content.map((c: any) => c.text || "").join("");
      }

      if (alternatingMessages.length > 0 && alternatingMessages[alternatingMessages.length - 1].role === normalizedRole) {
        alternatingMessages[alternatingMessages.length - 1].content += "\n" + textContent;
      } else {
        alternatingMessages.push({
          role: normalizedRole,
          content: textContent || "Hello"
        });
      }
    }

    // Extract your clean API key from environment variables
    const rawKeyString = process.env.GEMINI_API_KEYS || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
    const activeKey = rawKeyString.replace(/['"]/g, "").split(',')[0]?.trim();

    if (!activeKey) {
      return new Response("Configuration Error: Please verify your API key is added to your environment variables.", { status: 400 });
    }

    const googleProvider = createGoogleGenerativeAI({ apiKey: activeKey });

    // Fire the generation context pass targeting the stable 2.5 flash engine
    const result = await streamText({
      model: googleProvider('gemini-2.5-flash'), 
      messages: alternatingMessages, 
      system: `You are the official, highly capable AI assistant for Jimmy Kaung's portfolio website.
      
      CRITICAL MULTILINGUAL MANDATE:
      - You must natively understand and speak all global languages supported by Gemini, with special coverage for Burmese (Myanmar script), Thai, and English.
      - ALWAYS match the exact language and script used by the user. If the user prompts you in Burmese, you MUST reply fully and naturally in fluent Burmese using standard Myanmar script. Do not translate their questions into English answers.
      
      Here is Jimmy Kaung's comprehensive, verified portfolio context:
      ${JSON.stringify(livePortfolioData)}
      
      Instructions:
      - Thoroughly answer user queries regarding Jimmy's background, professional pillars, blog summaries, and custom games using the context provided above. Translate this contextual knowledge accurately into the language the user is speaking.
      - Keep responses professional, clear, and context-grounded.
      - If asked about completely unrelated things outside of this portfolio scope, politely decline in the user's chosen language.`,
      
      // HISTORY LOGGING: Save the completed AI interaction to Supabase safely
      onFinish: async ({ text }) => {
        try {
          if (lastUserMessage && supabaseUrl && supabaseKey) {
            const { error: insertError } = await supabase.from('chat_history').insert({
              session_id: activeSessionId,
              user_message: lastUserMessage,
              ai_response: text,
              requires_human: false // Normal AI chats are logged as false!
            });
            
            if (insertError) console.error("Supabase Chat Insert Failed:", insertError.message);
          }
        } catch (err) {
          console.error("Failed to execute onFinish chat logging:", err);
        }
      }
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onError: (err: any) => err?.message || 'Streaming exception occurred.',
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
      }
    });

  } catch (globalError: any) {
    console.error("Global chat router collapse:", globalError);
    return new Response(`Global Server Route Exception: ${globalError?.message || 'Unknown error'}`, { status: 500 });
  }
}

// ============================================================================
// 4. SMTP EMAIL SENDER HELPER (Fires your Gmail Alert)
// ============================================================================
async function sendSMTPAlert(userMessage: string, sessionId: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jimmykg.spacex@gmail.com',
      pass: process.env.SMTP_PASS, // From .env.local (App Password)
    },
  });

  const mailOptions = {
    from: 'jimmykg.spacex@gmail.com',
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
        <p>Log in to your <a href="https://yourdomain.com/admin" style="color: #3b82f6; font-weight: bold;">Admin Console</a> to reply directly.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("RTH Email Alert Transmitted Successfully.");
  } catch (error) {
    console.error("Failed to transmit RTH Email:", error);
  }
}