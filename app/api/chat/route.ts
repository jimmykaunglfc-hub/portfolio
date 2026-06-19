import { streamText } from 'ai';
// 1. Import Google instead of OpenAI
import { google } from '@ai-sdk/google'; 
import { ABOUT_ME, BLOG_POSTS, GAMES_DATA } from '@/sanity/lib/portfolioData';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const safeMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.parts ? m.parts.map((p: any) => p.text).join('') : (m.content || "")
    }));

    const result = await streamText({
      // 2. Use the blazing fast Gemini 2.5 Flash model
      model: google('gemini-2.5-flash'), 
      messages: safeMessages, 
      system: `You are the official AI assistant for Jimmy Kaung's portfolio. 
      You are professional, concise, and helpful. 
      
      Here is the absolute latest, up-to-date information about Jimmy:
      
      ABOUT ME:
      ${ABOUT_ME}
      
      MY BLOG POSTS:
      ${JSON.stringify(BLOG_POSTS, null, 2)}
      
      MY GAMES & HINTS:
      ${JSON.stringify(GAMES_DATA, null, 2)}
      
      Only answer questions based on this data. If asked something unrelated, politely decline.`,
    });

    return result.toUIMessageStreamResponse(); 
    
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}