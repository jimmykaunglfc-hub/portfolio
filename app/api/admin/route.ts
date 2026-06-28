import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import nodemailer from 'nodemailer';

// Use Service Role Key to safely bypass RLS when inserting logs
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

// 1. DEFINE YOUR RTH TRIGGERS HERE
const RTH_TRIGGERS = [
  "human", "real person", "hire", "consultation", "book a session", 
  "contact", "email", "talk to jimmy", "speak to", "meeting", "appointment"
];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // Assuming your frontend sends { messages: [{ role: 'user', content: '...' }], sessionId: '...' }
    const { messages, sessionId } = body;
    
    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided" }, { status: 400 });
    }

    const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
    
    // 2. CHECK FOR TRIGGERS (Does the user want a human?)
    const requiresHuman = RTH_TRIGGERS.some(trigger => lastUserMessage.includes(trigger));
    
    let aiResponseText = "";

    if (requiresHuman) {
      // --- ROUTE TO HUMAN INITIATED ---
      aiResponseText = "I have paused my AI responses and flagged this conversation for Jimmy. He has been notified and will reply to you here or via email shortly to coordinate your consultation!";
      
      // Fire Email Alert to your Gmail
      await sendSMTPAlert(lastUserMessage, sessionId || 'anonymous-session');
      
    } else {
      // --- NORMAL AI PROCESSING ---
      // ⚠️ IMPORTANT: Drop your actual OpenAI / Gemini generation code here!
      // Example: 
      // const aiData = await openai.chat.completions.create({ model: "gpt-4", messages });
      // aiResponseText = aiData.choices[0].message.content;
      
      aiResponseText = "I am Portfolio AI. (Please ensure your OpenAI/Gemini API call is inserted here in the backend!)";
    }

    // 3. SAVE LOGS TO SUPABASE (This populates your Admin Panel!)
    const { error } = await supabaseAdmin.from('chat_history').insert({
      session_id: sessionId || `session-${Date.now()}`,
      user_message: lastUserMessage,
      ai_response: aiResponseText,
      requires_human: requiresHuman
    });
    
    if (error) {
      console.error("Supabase Save Error:", error.message);
    }

    // 4. RETURN RESPONSE TO FRONTEND
    return NextResponse.json({ role: "assistant", content: aiResponseText });

  } catch (error: any) {
    console.error("Chat API Operational Failure:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ============================================================================
// SMTP EMAIL SENDER HELPER (Configured for Gmail)
// ============================================================================
async function sendSMTPAlert(userMessage: string, sessionId: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jimmykg.spacex@gmail.com',
      pass: process.env.SMTP_PASS, // Pulls from your .env.local file
    },
  });

  const mailOptions = {
    from: 'jimmykg.spacex@gmail.com',
    to: 'jimmykg.spacex@gmail.com', // Sending the alert to yourself
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
        <p>Log in to your <a href="https://yourdomain.com/admin" style="color: #3b82f6; font-weight: bold;">Admin Console</a> to reply directly to their chat window.</p>
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