export const dynamic = 'force-dynamic';

import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { supabase } from "../../../lib/supabase";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;

  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error || !post) {
    notFound();
  }

  const titleLower = (post.title || "").toLowerCase();
  let tagLabel = "Product Strategy";
  let tagStyle = "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/10";
  
  if (titleLower.includes("qa") || titleLower.includes("testing") || titleLower.includes("gatekeeper")) {
    tagLabel = "Quality Assurance";
    tagStyle = "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10";
  } else if (titleLower.includes("refused") || titleLower.includes("owner") || titleLower.includes("features") || titleLower.includes("airbnb") || titleLower.includes("sustaining")) {
    tagLabel = "Product Management";
    tagStyle = "bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/10";
  } else if (titleLower.includes("ai") || titleLower.includes("era") || titleLower.includes("waiting")) {
    tagLabel = "Tech Strategy";
    tagStyle = "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/10";
  }

  const renderInlineStyles = (text: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    return text.split(boldRegex).map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-extrabold text-gray-900 dark:text-white">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 font-sans text-gray-950 dark:text-white">
      
      <Link 
        href="/blog" 
        className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors mb-8 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Articles
      </Link>

      <article className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl overflow-hidden shadow-xl">
        
        {/* NEW: DYNAMIC MAIN BANNER COVER IMAGE DISPLAY */}
        {post.cover_image && (
          <div className="w-full h-[280px] md:h-[400px] overflow-hidden border-b border-gray-200 dark:border-white/10 relative">
            <img src={post.cover_image} className="w-full h-full object-cover select-none" alt="Article Hero Banner" />
          </div>
        )}

        <div className="p-8 md:p-14">
          {/* Category Badge & Timestamp Row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${tagStyle}`}>
              {tagLabel}
            </span>
            <div className="flex items-center gap-1.5 text-gray-500 text-xs font-medium">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {new Date(post.created_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
          </div>

          {/* Primary Article Title */}
          <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight mb-6 text-gray-900 dark:text-white">
            {post.title}
          </h1>

          {/* Excerpt Summary Blockquote Container */}
          {post.summary && (
            <div className="p-5 border-l-4 border-blue-500 bg-zinc-50 dark:bg-zinc-900/40 rounded-r-2xl text-sm md:text-base text-gray-600 dark:text-gray-400 italic mb-10 leading-relaxed">
              {post.summary}
            </div>
          )}

          {/* HIGH-FIDELITY PARSER ENGINE WITH INLINE PICTURE COMPILER */}
          <div className="space-y-6 text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed font-normal">
            {post.content ? (
              (() => {
                const lines = post.content.split('\n');
                let insideList = false;
                const compiledElements: React.ReactNode[] = [];
                let bufferedListItems: React.ReactNode[] = [];

                lines.forEach((block: string, index: number) => {
                  const line = block.trim();

                  if (!line.startsWith('- ') && insideList) {
                    compiledElements.push(
                      <ul key={`list-group-${index}`} className="list-disc pl-6 my-5 space-y-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                        {bufferedListItems}
                      </ul>
                    );
                    bufferedListItems = [];
                    insideList = false;
                  }

                  // NEW: INLINE IMAGE RENDER MAPPER MATCH
                  if (line.startsWith('![') && line.includes('](')) {
                    const url = line.substring(line.indexOf('(') + 1, line.indexOf(')'));
                    const alt = line.substring(line.indexOf('[') + 1, line.indexOf(']'));
                    compiledElements.push(
                      <div key={index} className="w-full my-8 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 shadow-md bg-zinc-50 dark:bg-zinc-950">
                        <img src={url} alt={alt} className="w-full h-auto object-cover max-h-[500px]" />
                      </div>
                    );
                  }
                  else if (line.startsWith('## ')) {
                    compiledElements.push(
                      <h2 key={index} className="text-xl md:text-2xl font-black text-gray-900 dark:text-white tracking-tight pt-6 mt-8 border-t border-gray-100 dark:border-white/5 first:border-none first:pt-0 first:mt-0">
                        {line.replace('## ', '')}
                      </h2>
                    );
                  }
                  else if (line.startsWith('### ')) {
                    compiledElements.push(
                      <h3 key={index} className="text-lg md:text-xl font-extrabold text-gray-900 dark:text-white tracking-tight pt-4 mt-6">
                        {line.replace('### ', '')}
                      </h3>
                    );
                  }
                  else if (line.startsWith('> ')) {
                    compiledElements.push(
                      <blockquote key={index} className="pl-4 border-l-2 border-blue-500 italic text-gray-500 my-5 text-sm md:text-base bg-zinc-50/50 dark:bg-zinc-900/20 py-2 pr-4 rounded-r-xl">
                        {renderInlineStyles(line.replace('> ', ''))}
                      </blockquote>
                    );
                  }
                  else if (line.startsWith('- ')) {
                    insideList = true;
                    bufferedListItems.push(
                      <li key={`li-${index}`} className="leading-relaxed">
                        {renderInlineStyles(line.replace('- ', ''))}
                      </li>
                    );
                  }
                  else if (line.startsWith('```')) {
                    return;
                  }
                  else if (line) {
                    compiledElements.push(
                      <p key={index} className="text-sm md:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                        {renderInlineStyles(line)}
                      </p>
                    );
                  }
                });

                if (insideList && bufferedListItems.length > 0) {
                  compiledElements.push(
                    <ul key="list-group-final" className="list-disc pl-6 my-5 space-y-2 text-sm md:text-base text-gray-600 dark:text-gray-400">
                      {bufferedListItems}
                    </ul>
                  );
                }

                return compiledElements;
              })()
            ) : (
              <p className="text-gray-400 italic text-sm">No complete content block elements indexed for this record module.</p>
            )}
          </div>
        </div>

      </article>
    </main>
  );
}