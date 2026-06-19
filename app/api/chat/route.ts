import { streamText } from 'ai';
import { google } from '@ai-sdk/google'; 
import { client } from '@/sanity/lib/client'; 
// 1. Bring back your static data file so the AI instantly gets your 6 games and 3 blogs!
import { ABOUT_ME, BLOG_POSTS, GAMES_DATA } from '@/sanity/lib/portfolioData';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const safeMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.parts ? m.parts.map((p: any) => p.text).join('') : (m.content || "")
    }));

    // 2. Fetch your live Career Trajectory from Sanity
    const liveCareerData = await client.fetch(`*[_type == "trajectory"]{ 
      year, 
      company, 
      executiveSummary 
    }`, {}, { cache: 'no-store' }); 

    const result = await streamText({
      model: google('gemini-2.5-flash'), 
      messages: safeMessages, 
      // 3. Feed the AI both your live database records and your 6 games / 3 blogs
      system: `You are the official AI assistant for Jimmy Kaung's portfolio website. 
      You are professional, clear, concise, and helpful.
      
      Here is Jimmy's complete portfolio data pool:
      
      --- LIVE CAREER TRAJECTORY (Auto-updates from Sanity Database) ---
      ${JSON.stringify(liveCareerData, null, 2)}
      
      --- ABOUT ME ---
      ${ABOUT_ME}
      
      --- MY BLOG POSTS (3 Posts) ---
      ${JSON.stringify(BLOG_POSTS, null, 2)}
      
      --- MY ARCADE GAMES & HINTS (6 Games) ---
      ${JSON.stringify(GAMES_DATA, null, 2)}
      
      Instructions:
      - Use the "LIVE CAREER TRAJECTORY" and "ABOUT ME" sections to answer questions about his background.
      - Use "MY BLOG POSTS" to discuss or summarize articles he has written.
      - Use "MY ARCADE GAMES & HINTS" to provide titles, descriptions, rules, or exact hints for all 6 of his games (including sprint-planner, qa-test game, Techle, Bug Blaster, etc.).
      
      Only answer questions based on this provided data. If asked something completely unrelated, politely decline.`,
    });

    return result.toUIMessageStreamResponse(); 
    
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}