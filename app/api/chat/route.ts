import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { createClient } from '@supabase/supabase-js';
import { ABOUT_ME, GAMES_DATA } from '../../../sanity/lib/portfolioData'; // Assuming these are still static

// Initialize Supabase client using your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase keys are missing. AI will not have access to live blog posts.");
    }

    // 1. DYNAMIC FETCH: Query live, up-to-date blog posts directly from Supabase
    // Note: Change 'articles' to whatever your actual Supabase table name is (e.g., 'posts', 'insights')
    const { data: liveBlogPosts, error: supabaseError } = await supabase
      .from('articles') 
      .select('*')
      .order('created_at', { ascending: false });

    if (supabaseError) {
      console.error("Supabase fetch error:", supabaseError);
    }

    // 2. Package the live dataset into the context layer
    const livePortfolioData = {
      aboutMe: ABOUT_ME,
      blogPosts: liveBlogPosts || [], // Injects the live array from Supabase
      gamesData: GAMES_DATA
    };

    // 3. CONSOLIDATION ENGINE: Merge consecutive same-role messages for Gemini compliance
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

    // 4. Extract your clean API key from environment variables
    const rawKeyString = process.env.GEMINI_API_KEYS || process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";
    const activeKey = rawKeyString.replace(/['"]/g, "").split(',')[0]?.trim();

    if (!activeKey) {
      return new Response("Configuration Error: Please verify your API key is added to your environment variables.", { status: 400 });
    }

    const googleProvider = createGoogleGenerativeAI({ apiKey: activeKey });

    // 5. Fire the generation context pass targeting the stable 2.5 flash engine
    const result = await streamText({
      model: googleProvider('gemini-2.5-flash'), 
      messages: alternatingMessages, 
      system: `You are the official, highly capable AI assistant for Jimmy Kaung's portfolio website.
      
      CRITICAL MULTILINGUAL MANDATE:
      - You must natively understand and speak all global languages supported by Gemini, with special coverage for Burmese (Myanmar script), Thai, and English.
      - ALWAYS match the exact language and script used by the user. If the user prompts you in Burmese, you MUST reply fully and naturally in fluent Burmese using standard Myanmar script. Do not translate their questions into English answers.
      
      Here is Jimmy Kaung's comprehensive, verified portfolio context:
      ${JSON.stringify(livePortfolioData)}
      
      Instructions:
      - Thoroughly answer user queries regarding Jimmy's background, professional pillars, blog summaries, and custom games using the context provided above. Translate this contextual knowledge accurately into the language the user is speaking.
      - Keep responses professional, clear, and context-grounded.
      - If asked about completely unrelated things outside of this portfolio scope, politely decline in the user's chosen language.`,
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