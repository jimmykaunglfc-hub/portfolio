import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { ABOUT_ME, BLOG_POSTS, GAMES_DATA } from '@/sanity/lib/portfolioData';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. The Translator: Converts the modern frontend 'parts' format 
    // safely into the classic 'content' strings the backend expects.
    const safeMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.parts ? m.parts.map((p: any) => p.text).join('') : (m.content || "")
    }));

    const result = await streamText({
      model: openai('gpt-4o-mini'), 
      messages: safeMessages, // We pass the translated messages here!
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

    // 2. We use the specific UI Message stream response that your 
    // upgraded frontend architecture strictly demands.
    return result.toUIMessageStreamResponse(); 
    
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}