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

    // 2. CONSOLIDATION ENGINE: Merge consecutive same-role messages
    // This fixes the Gemini schema error permanently when a user clicks buttons sequentially!
    const alternatingMessages: any[] = [];
    
    for (const msg of messages) {
      const normalizedRole = msg.role === 'user' ? 'user' : 'assistant';
      
      // Safely parse text content string regardless of framework input formats
      let textContent = "";
      if (typeof msg.content === 'string') {
        textContent = msg.content;
      } else if (Array.isArray(msg.parts)) {
        textContent = msg.parts.map((p: any) => p.text || "").join("");
      } else if (Array.isArray(msg.content)) {
        textContent = msg.content.map((c: any) => c.text || "").join("");
      }

      // If the previous message has the exact same role, combine their contents together
      if (alternatingMessages.length > 0 && alternatingMessages[alternatingMessages.length - 1].role === normalizedRole) {
        alternatingMessages[alternatingMessages.length - 1].content += "\n" + textContent;
      } else {
        alternatingMessages.push({
          role: normalizedRole,
          content: textContent || "Hello"
        });
      }
    }

    // 3. Extract and parse your pooled environment API tokens
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

    // 4. Sequential API Token Rotation Loop
    for (let i = 0; i < apiKeys.length; i++) {
      try {
        const googleProvider = createGoogleGenerativeAI({ apiKey: apiKeys[i] });
        
        const result = await streamText({
          model: googleProvider('gemini-2.5-flash'), 
          messages: alternatingMessages, // Pass the safely alternated array here
          system: `You are the official AI assistant for Jimmy Kaung's portfolio website. 
          Jimmy's Live Database Context:
          ${JSON.stringify(livePortfolioData)}
          
          Only answer questions based on this data context layer. If asked about unrelated things, politely decline.`,
        });

        // originalMessages option preserves existing message IDs to avoid rendering duplications on the client
        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          onError: (err: any) => err?.message || 'An unexpected streaming exception occurred.'
        });

      } catch (err: any) {
        lastError = err;
        console.error(`Gemini token rotation slot [${i}] validation failed:`, err);
        continue; // Immediately fail over to the next key signature in your array
      }
    }

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