import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { ABOUT_ME, BLOG_POSTS, GAMES_DATA } from '../../../sanity/lib/portfolioData';

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // 1. Package the portfolio dataset into a structured context layer
    const livePortfolioData = {
      aboutMe: ABOUT_ME,
      blogPosts: BLOG_POSTS,
      gamesData: GAMES_DATA
    };

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

    // 3. Extract your clean API key from environment variables
    const rawKeyString = process.env.GEMINI_API_KEYS || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
    const activeKey = rawKeyString.replace(/['"]/g, "").split(',')[0]?.trim();

    if (!activeKey) {
      return new Response("Configuration Error: Please verify your API key is added to your environment variables.", { status: 400 });
    }

    const googleProvider = createGoogleGenerativeAI({ apiKey: activeKey });

    // 4. Fire the generation context pass targeting the stable 2.5 flash engine
    const result = await streamText({
      model: googleProvider('gemini-2.5-flash'), 
      messages: alternatingMessages, 
      system: `You are the official AI assistant for Jimmy Kaung's portfolio website. 
      Here is Jimmy Kaung's comprehensive, verified portfolio context:
      ${JSON.stringify(livePortfolioData)}
      
      Instructions:
      - Thoroughly answer user queries regarding Jimmy's background, professional pillars, blog summaries, and custom games using ONLY the context provided above.
      - Keep responses professional, clear, and context-grounded.
      - If asked about unrelated things outside of this context, politely decline.`,
    });

    return result.toUIMessageStreamResponse({
      originalMessages: messages,
      onError: (err: any) => err?.message || 'Streaming exception occurred.',
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0'
      }
    });

  } catch (globalError: any) {
    console.error("Global chat router collapse:", globalError);
    return new Response(`Global Server Route Exception: ${globalError?.message || 'Unknown error'}`, { status: 500 });
  }
}