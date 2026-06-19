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

    // BROADCAST QUERY: Dynamic layout block extraction query
    const livePortfolioData = await client.fetch(`{
      "careerTrajectory": *[_type == "trajectory"]{ year, company, executiveSummary },
      "blogPosts": *[_type == "post"]{ 
        title, 
        excerpt,
        // Grabs plain string characters directly inside Portable Text blocks for the AI
        "bodyText": body[type == "block"].children[].text 
      },
      "games": *[_type == "game"]{ name, description, hint }
    }`, {}, { cache: 'no-store' }); 

    const result = await streamText({
      model: google('gemini-2.5-flash'), 
      messages: safeMessages, 
      system: `You are the official AI assistant for Jimmy Kaung's portfolio website. 
      You are professional, clear, concise, and helpful.
      
      You have real-time access to Jimmy's database. Here is his live portfolio data layer:
      ${JSON.stringify(livePortfolioData, null, 2)}
      
      Instructions:
      - Use the "careerTrajectory" details to answer questions about his job history.
      - Use the "blogPosts" details to summarize, discuss, or quote case studies he has written (like the Knight Capital release failure).
      - Use the "games" details to give descriptions or exact hints for all 6 arcade games (Techle, Bug Blaster, Lexicon Lock, QA Bug Hunt, Sprint Planner, Neural Decrypt).
      
      Only answer questions based on this provided data. If asked something completely unrelated, politely decline.`,
    });

    return result.toUIMessageStreamResponse(); 
    
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}