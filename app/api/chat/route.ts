import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { client } from '@/sanity/lib/client'; 

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Strict message structural normalization to prevent SDK schema configuration crashes
    const coreMessages = messages.map((m: any) => {
      let contentString = "";
      if (typeof m.content === 'string') {
        contentString = m.content;
      } else if (Array.isArray(m.parts)) {
        contentString = m.parts.map((p: any) => p.text || "").join("");
      } else if (Array.isArray(m.content)) {
        contentString = m.content.map((c: any) => c.text || "").join("");
      }
      return {
        role: m.role === 'user' ? 'user' : 'assistant',
        content: contentString || "Hello"
      };
    });

    // 2. Fetch your live data layer seamlessly from Sanity
    const livePortfolioData = await client.fetch(`{
      "careerTrajectory": *[_type == "trajectory"]{ year, company, executiveSummary },
      "blogPosts": *[_type == "post"]{ title, excerpt, "bodyText": body },
      "games": *[_type == "game"]{ name, description, hint }
    }`, {}, { cache: 'no-store' });

    // 3. Extract your pooled API keys
    const keysString = process.env.GEMINI_API_KEYS || "";
    const apiKeys = keysString.split(',').map(k => k.trim()).filter(Boolean);

    if (apiKeys.length === 0 && process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      apiKeys.push(process.env.GOOGLE_GENERATIVE_AI_API_KEY);
    }

    // UNMASK ERROR: If keys are completely missing, stream the exact error directly to the chat bubble UI
    if (apiKeys.length === 0) {
      return new Response(
        `0:"⚠️ Pipeline Configuration Error: No keys found in your GEMINI_API_KEYS environment variable. Please add your comma-separated list of keys into your Vercel environment variables settings panel and run a Redeploy."\n`,
        { headers: { 'Content-Type': 'text/x-component; charset=utf-8' } }
      );
    }

    let textStreamResult = null;
    let fallbackError: any = null;

    // 4. Execute Key Failover Rotation Loop
    for (let i = 0; i < apiKeys.length; i++) {
      const activeKey = apiKeys[i];
      try {
        const googleProvider = createGoogleGenerativeAI({ apiKey: activeKey });
        
        textStreamResult = await streamText({
          model: googleProvider('gemini-2.5-flash'), 
          messages: coreMessages, 
          system: `You are the official AI assistant for Jimmy Kaung's portfolio website.
          Jimmy's Live Website Database Context:
          ${JSON.stringify(livePortfolioData, null, 2)}
          Only answer questions based on this provided data. If asked something completely unrelated, politely decline.`,
        });

        if (textStreamResult) break;

      } catch (error: any) {
        fallbackError = error;
        console.warn(`Key index [${i}] validation exception occurred: ${error.message}`);
        continue; 
      }
    }

    // UNMASK ERROR: If all keys are rejected or rate-limited, stream the underlying engine reason straight to the chat UI
    if (!textStreamResult) {
      const errorMessage = fallbackError?.message || "Rate limits or authentication exception hit.";
      return new Response(
        `0:"⚠️ AI Engine Exhaustion: All keys in your rotation pool failed. Underlying provider exception: ${errorMessage.replace(/"/g, '\\"')}"\n`,
        { headers: { 'Content-Type': 'text/x-component; charset=utf-8' } }
      );
    }

    return textStreamResult.toUIMessageStreamResponse(); 
    
  } catch (error: any) {
    console.error("Critical Chat Lifecycle Error:", error);
    // Catch-all safety wrapper: streams the error directly to the text tray instead of crash flags
    return new Response(
      `0:"⚠️ System Exception: An internal error occurred while compiling your chat route stream. Details: ${error.message.replace(/"/g, '\\"')}"\n`,
      { headers: { 'Content-Type': 'text/x-component; charset=utf-8' } }
    );
  }
}