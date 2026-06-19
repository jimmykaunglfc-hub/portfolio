import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
// Updated import path to match where your file actually is!
import { ABOUT_ME, BLOG_POSTS, GAMES_DATA } from '@/sanity/lib/portfolioData';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemPrompt = `
    You are the official AI assistant for my portfolio website. 
    Your job is to answer questions about my background, my blog posts, and my arcade games.
    
    Be helpful, concise, and professional. 
    
    Here is the absolute latest, up-to-date information about my website:
    
    ABOUT ME:
    ${ABOUT_ME}
    
    MY BLOG POSTS:
    ${JSON.stringify(BLOG_POSTS, null, 2)}
    
    MY GAMES & HINTS:
    ${JSON.stringify(GAMES_DATA, null, 2)}
    
    If a user asks for a hint, provide it based on the data above. If they ask about a topic not covered in the data above, politely let them know you primarily answer questions regarding my portfolio, games, and articles.
  `;

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    system: systemPrompt,
    messages,
  });

  // Updated to match your specific AI SDK version!
  return result.toUIMessageStreamResponse();
}