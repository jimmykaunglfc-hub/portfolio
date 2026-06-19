import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { client } from '@/sanity/lib/client'; 

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Fetch live contextual data from your Sanity Studio layer
    const livePortfolioData = await client.fetch(`{
      "careerTrajectory": *[_type == "trajectory"]{ year, company, executiveSummary },
      "blogPosts": *[_type == "post"]{ title, excerpt, "bodyText": body },
      "games": *[_type == "game"]{ title, description, hint }
    }`, {}, { cache: 'no-store' });

    // 2. Extract and parse your pooled environment API tokens
    const keysString = process.env.GEMINI_API_KEYS || "";
    const apiKeys = keysString.split(',').map(k => k.trim()).filter(Boolean);

    if (apiKeys.length === 0 && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      apiKeys.push(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    }

    if (apiKeys.length === 0) {
      return new Response(
        JSON.stringify({ error: "Environment variable setup missing: No keys found inside GEMINI_API_KEYS." }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let lastError: any = null;

    // 3. Sequential API Token Rotation Loop
    for (let i = 0; i < apiKeys.length; i++) {
      try {
        const googleProvider = createGoogleGenerativeAI({ apiKey: apiKeys[i] });
        
        const result = await streamText({
          model: googleProvider('gemini-2.5-flash'), 
          messages: messages, 
          system: `You are the official AI assistant for Jimmy Kaung's portfolio website. 
          Jimmy's Live Database Context:
          ${JSON.stringify(livePortfolioData)}
          
          Only answer questions based on this data context layer. If asked about unrelated things, politely decline.`,
        });

        // FIXED: Utilized the official 'onError' configuration callback for type safety
        return result.toUIMessageStreamResponse({
          onError: (err: any) => err?.message || 'An unexpected streaming exception occurred.'
        });

      } catch (err: any) {
        lastError = err;
        console.error(`Gemini token rotation slot [${i}] validation failed:`, err);
        continue; // Immediately cascade to your next active standby token key
      }
    }

    // 4. Return structural error logs if every single token in your pool fails validation
    return new Response(
      JSON.stringify({ error: `All pooled Gemini tokens exhausted. Last provider error: ${lastError?.message || 'Unknown provider exception'}` }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (globalError: any) {
    console.error("Global chat router collapse:", globalError);
    return new Response(
      JSON.stringify({ error: globalError?.message || 'Internal Router Compilation Exception' }), 
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}