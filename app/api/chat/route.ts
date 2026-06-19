import { streamText, generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { client } from '@/sanity/lib/client'; 

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Fetch live contextual data layers directly from Sanity Studio
    const livePortfolioData = await client.fetch(`{
      "careerTrajectory": *[_type == "trajectory"]{ year, company, executiveSummary },
      "blogPosts": *[_type == "post"]{ title, excerpt, "bodyText": body },
      "games": *[_type == "game"]{ title, description, hint }
    }`, {}, { cache: 'no-store' });

    // 2. CONSOLIDATION ENGINE: Merge consecutive same-role messages to satisfy Gemini schemas
    const alternatingMessages: any[] = [];
    for (const msg of messages) {
      const normalizedRole = msg.role === 'user' ? 'user' : 'assistant';
      
      let textContent = "";
      if (typeof msg.content === 'string') {
        textContent = msg.content;
      } else if (Array.isArray(msg.parts)) {
        textContent = msg.parts.map((p: any) => p.text || "").join("");
      } else if (Array.isArray(msg.content)) {
        textContent = msg.content.map((c: any) => c.text || "").join("");
      }

      if (alternatingMessages.length > 0 && alternatingMessages[alternatingMessages.length - 1].role === normalizedRole) {
        alternatingMessages[alternatingMessages.length - 1].content += "\n" + textContent;
      } else {
        alternatingMessages.push({
          role: normalizedRole,
          content: textContent || "Hello"
        });
      }
    }

    // 3. BULLETPROOF KEY EXTRACTOR: Merges and sanitizes both potential naming setups
    const rawKeys = process.env.GEMINI_API_KEYS || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
    const cleanKeys = rawKeys.replace(/['"]/g, "").trim();
    const apiKeys = cleanKeys.split(',').map(k => k.trim()).filter(Boolean);

    if (apiKeys.length === 0) {
      return new Response("Configuration Error: No API keys found in GEMINI_API_KEYS or GOOGLE_GENERATIVE_AI_API_KEY variables.", { status: 400 });
    }

    let lastErrorMsg = "Unknown provider initialization exception";

    // 4. Try each key sequentially with a blocking pre-flight network validation check
    for (let i = 0; i < apiKeys.length; i++) {
      const activeKey = apiKeys[i];
      
      try {
        const googleProvider = createGoogleGenerativeAI({ apiKey: activeKey });
        const modelInstance = googleProvider('gemini-2.0-flash');

        // FIXED: Replaced legacy 'maxTokens' parameter with the official specification 'maxOutputTokens'
        await generateText({
          model: modelInstance,
          prompt: "ping",
          maxOutputTokens: 1,
        });

        // Key verified successfully! Proceed to stream the live database context response
        const result = await streamText({
          model: modelInstance, 
          messages: alternatingMessages, 
          system: `You are the official AI assistant for Jimmy Kaung's portfolio website. 
          Jimmy's Live Database Context:
          ${JSON.stringify(livePortfolioData)}
          Only answer questions based on this data context layer. If asked about unrelated things, politely decline.`,
        });

        return result.toUIMessageStreamResponse({
          originalMessages: messages,
          onError: (err: any) => err?.message || 'Streaming authentication exception occurred.'
        });

      } catch (err: any) {
        lastErrorMsg = err?.message || "Invalid Key String Signature";
        console.error(`Validation explicitly failed for key pool index [${i}]:`, lastErrorMsg);
        continue; // Fail over instantly to the next token key in the array
      }
    }

    // 5. Plain-text fallback output to force the client-side error drawer to show the absolute truth
    return new Response(`All configured keys (${apiKeys.length}) in the pool failed validation. Google API Error: ${lastErrorMsg}`, { status: 400 });
    
  } catch (globalError: any) {
    console.error("Global chat router collapse:", globalError);
    return new Response(`Global Server Route Exception: ${globalError?.message || 'Unknown compilation error'}`, { status: 500 });
  }
}