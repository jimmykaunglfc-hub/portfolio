import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { client } from '@/sanity/lib/client'; 

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Fetch fresh contextual data layers directly from Sanity Studio
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

    // 3. BULLETPROOF KEY EXTRACTOR: Scans both environment naming schemes safely
    const sourceVariables = [
      process.env.GEMINI_API_KEYS,
      process.env.GOOGLE_GENERATIVE_AI_API_KEY
    ];

    const apiKeys: string[] = [];
    for (const envValue of sourceVariables) {
      if (!envValue) continue;
      // Strips accidental wrapping quotation marks and breaks commas into real standalone keys
      const sanitized = envValue.replace(/['"]/g, "").trim();
      const extracted = sanitized.split(',').map(k => k.trim()).filter(Boolean);
      apiKeys.push(...extracted);
    }

    // If both variable lookups come back completely empty, notify the UI stream directly
    if (apiKeys.length === 0) {
      return new Response(
        JSON.stringify({ error: "Missing Key Configuration: Ensure GEMINI_API_KEYS is added to Vercel Settings." }), 
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    let lastError: any = null;

    // 4. Sequential API Key Token Rotation Loop
    for (let i = 0; i < apiKeys.length; i++) {
      const activeKey = apiKeys[i];
      
      // Ignore placeholder strings safely
      if (activeKey.includes("YourFirstKey") || activeKey.includes("api_key")) {
        continue;
      }

      try {
        const googleProvider = createGoogleGenerativeAI({ apiKey: activeKey });
        
        // UPGRADE: Targeted the precise production model string 'gemini-2.0-flash'
        const result = await streamText({
          model: googleProvider('gemini-2.0-flash'), 
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
        lastError = err;
        console.error(`Gemini token rotation slot [${i}] validation failed explicitly:`, err.message);
        continue; // Advance to next available key string in the list array
      }
    }

    // 5. Hard failure fallback response if Google rejects every single provided key token
    return new Response(
      JSON.stringify({ 
        error: `All keys in your pool were explicitly rejected by Google. Last message: ${lastError?.message || 'Auth failure'}` 
      }), 
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