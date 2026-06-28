import { streamText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google'; 
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client using your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Supabase keys are missing. AI will not have access to live database.");
    }

    // 1. DYNAMIC FETCH: Query live, up-to-date data directly from Supabase tables
    const { data: liveBlogPosts, error: blogError } = await supabase
      .from('blog_posts') 
      .select('*')
      .order('created_at', { ascending: false });

    const { data: liveAboutMe, error: aboutError } = await supabase
      .from('about_me')
      .select('*');

    const { data: liveGamesData, error: gamesError } = await supabase
      .from('games_data')
      .select('*');

    // Log any errors if RLS blocks the fetch or tables are missing
    if (blogError || aboutError || gamesError) {
      console.error("Supabase fetch error:", blogError || aboutError || gamesError);
    }

    // 2. Package the live dataset into the context layer
    const livePortfolioData = {
      aboutMe: liveAboutMe || [], 
      blogPosts: liveBlogPosts || [], 
      gamesData: liveGamesData || []
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
      
      // 6. HISTORY LOGGING: Save the completed interaction to Supabase
      onFinish: async ({ text }) => {
        try {
          // Extract the final, normalized user message
          const lastUserMessageObj = alternatingMessages.filter((m: any) => m.role === 'user').pop();
          const lastUserMessage = lastUserMessageObj ? lastUserMessageObj.content : "";
          
          if (lastUserMessage && supabaseUrl && supabaseKey) {
            await supabase.from('chat_history').insert({
              user_message: lastUserMessage,
              ai_response: text
            });
          }
        } catch (err) {
          console.error("Failed to save chat history to Supabase:", err);
        }
      }
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