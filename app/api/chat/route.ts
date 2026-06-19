import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { client } from '@/sanity/lib/client'; 

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const safeMessages = messages.map((m: any) => ({
      role: m.role,
      content: m.parts ? m.parts.map((p: any) => p.text).join('') : (m.content || "")
    }));

    // 1. Fetch live data layer records from Sanity
    const livePortfolioData = await client.fetch(`{
      "careerTrajectory": *[_type == "trajectory"]{ year, company, executiveSummary },
      "blogPosts": *[_type == "post"]{ title, excerpt, "bodyText": body },
      "games": *[_type == "game"]{ name, description, hint }
    }`, {}, { cache: 'no-store' });

    // 2. Extract and parse your pooled API keys
    const keysString = process.env.GEMINI_API_KEYS || "";
    const apiKeys = keysString.split(',').map(k => k.trim()).filter(Boolean);

    // Fallback check if the old single variable is still floating around
    if (apiKeys.length === 0 && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      apiKeys.push(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    }

    if (apiKeys.length === 0) {
      return new Response("Error: No Gemini API keys found in environment variables.", { status: 500 });
    }

    let textStreamResult = null;
    let fallbackError = null;

    // 3. API Key Rotation Loop Mechanism
    for (let i = 0; i < apiKeys.length; i++) {
      const activeKey = apiKeys[i];
      
      try {
        // Force explicit generation using the selected key out of the pool
        const googleProvider = createGoogleGenerativeAI({ apiKey: activeKey });

        textStreamResult = await streamText({
          model: googleProvider('gemini-2.5-flash'), 
          messages: safeMessages, 
          system: `You are the official AI assistant for Jimmy Kaung's portfolio website. 
          You are professional, clear, concise, and helpful.
          
          You have real-time access to Jimmy's database. Here is his live portfolio data:
          ${JSON.stringify(livePortfolioData, null, 2)}
          
          Instructions:
          - Use the "careerTrajectory" details to answer questions about his job history.
          - Use the "blogPosts" details to summarize, discuss, or quote his articles.
          - Use the "games" details to give descriptions or exact hints for his 6 arcade games.
          
          Only answer questions based on this provided data. If asked something completely unrelated, politely decline.`,
        });

        // If the execution clears without throwing a quota exception, break out of rotation loop
        console.log(`Successfully completed response stream utilizing API key index: [${i}]`);
        break;

      } catch (error: any) {
        console.warn(`Gemini API Key index [${i}] failed or encountered rate limits. Transitioning to next key...`);
        fallbackError = error;
        continue; // Fail over immediately to the next token signature in the array
      }
    }

    // If the loop exhausts every key without success, print the final validation crash
    if (!textStreamResult) {
      console.error("All pooled Gemini tokens exhausted or rate-limited:", fallbackError);
      return new Response(`AI Engine Exhaustion: ${fallbackError?.message || "Rate limits hit"}`, { status: 429 });
    }

    return textStreamResult.toUIMessageStreamResponse(); 
    
  } catch (error) {
    console.error("Critical Chat Lifecycle Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}