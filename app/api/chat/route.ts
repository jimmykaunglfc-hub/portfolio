import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { client } from '@/sanity/lib/client'; 

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Fetch live database context from Sanity Studio
    const livePortfolioData = await client.fetch(`{
      "careerTrajectory": *[_type == "trajectory"]{ year, company, executiveSummary },
      "blogPosts": *[_type == "post"]{ title, excerpt, "bodyText": body },
      "games": *[_type == "game"]{ title, description, hint }
    }`, {}, { cache: 'no-store' });

    // 2. CONSOLIDATION ENGINE: Merge consecutive same-role messages for Gemini compliance
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

    // 3. Extract the first clean key from whichever variable you currently have active
    const rawKeyString = process.env.GEMINI_API_KEYS || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
    const activeKey = rawKeyString.replace(/['"]/g, "").split(',')[0]?.trim();

    if (!activeKey) {
      return new Response("Configuration Error: Please verify your API key is added to your environment variables.", { status: 400 });
    }

    const googleProvider = createGoogleGenerativeAI({ apiKey: activeKey });

    // 4. Launch the stream immediately in a single pass with the ultra-stable 1.5-flash model
    const result = await streamText({
      model: googleProvider('gemini-1.5-flash'), 
      messages: alternatingMessages, 
      system: `You are the official AI assistant for Jimmy Kaung's portfolio website. 
      Jimmy's Live Database Context:
      ${JSON.stringify(livePortfolioData)}
      Only answer questions based on this data context layer. If asked about unrelated things, politely decline.`,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onError: (err: any) => err?.message || 'Streaming exception occurred.'
    });

  } catch (globalError: any) {
    console.error("Global chat router collapse:", globalError);
    return new Response(`Global Server Route Exception: ${globalError?.message || 'Unknown error'}`, { status: 500 });
  }
}