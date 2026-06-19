import { streamText } from 'ai';
import { google } from '@ai-sdk/google'; 
import { client } from '@/sanity/lib/client'; 

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const safeMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.parts ? m.parts.map((p: any) => p.text).join('') : (m.content || "")
    }));

    // BROADCAST QUERY: Fetch everything live with no caching!
    const livePortfolioData = await client.fetch(`{
      "careerTrajectory": *[_type == "trajectory"]{ year, company, executiveSummary },
      "blogPosts": *[_type == "post"]{ title, "slug": slug.current, excerpt, body },
      "games": *[_type == "game"]{ title, description, hint, rules }
    }`, {}, { cache: 'no-store' }); 

    const result = await streamText({
      model: google('gemini-2.5-flash'), 
      messages: safeMessages, 
      system: `You are the official AI assistant for Jimmy Kaung's portfolio website. 
      You are professional, clear, concise, and helpful.
      
      You have real-time access to Jimmy's database. Here is his live data:
      ${JSON.stringify(livePortfolioData, null, 2)}
      
      Instructions:
      - Use the "careerTrajectory" details to talk about his professional background.
      - Use the "blogPosts" details to summarize or discuss articles he wrote.
      - Use the "games" details to give descriptions, rules, or exact hints for his arcade games.
      
      Only answer questions based on this provided data. If asked something completely unrelated, politely decline.`,
    });

    return result.toUIMessageStreamResponse(); 
    
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}