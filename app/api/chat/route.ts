import { streamText } from 'ai';
import { google } from '@ai-sdk/google'; 
import { client } from '@/sanity/lib/client'; 
// 1. Bring back the static data for things not yet in Sanity
import { ABOUT_ME, BLOG_POSTS, GAMES_DATA } from '@/sanity/lib/portfolioData';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const safeMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.parts ? m.parts.map((p: any) => p.text).join('') : (m.content || "")
    }));

    // 2. Fetch ONLY the schema that actually exists in your Sanity database
    const liveCareerData = await client.fetch(`*[_type == "trajectory"]{ 
      year, 
      company, 
      executiveSummary 
    }`, {}, { cache: 'no-store' }); 

    const result = await streamText({
      model: google('gemini-2.5-flash'), 
      messages: safeMessages, 
      // 3. Inject BOTH the live database and the static file into the AI's brain!
      system: `You are the official AI assistant for Jimmy Kaung's portfolio. 
      You are professional, concise, and helpful. 
      
      Here is the absolute latest, up-to-date information about Jimmy.
      
      --- LIVE CAREER TRAJECTORY (Auto-updates from Sanity Database) ---
      ${JSON.stringify(liveCareerData, null, 2)}
      
      --- ABOUT ME ---
      ${ABOUT_ME}
      
      --- MY BLOG POSTS ---
      ${JSON.stringify(BLOG_POSTS, null, 2)}
      
      --- MY GAMES & HINTS ---
      ${JSON.stringify(GAMES_DATA, null, 2)}
      
      Only answer questions based on this data. If asked something unrelated, politely decline.`,
    });

    return result.toUIMessageStreamResponse(); 
    
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}