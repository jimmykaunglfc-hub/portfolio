export const dynamic = 'force-dynamic';

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default async function BlogIndex() {
  // 1. Query your live entries directly from the Supabase 'blog_posts' table
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching blog posts from Supabase:", error);
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex items-center gap-4">
          <BookOpen className="w-10 h-10 text-blue-500" />
          Insights & <span className="text-blue-500">Articles</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Thoughts, strategies, and deep dives into product management, software engineering, and creating exceptional user experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts && posts.map((post: any) => {
          // 2. Generate a URL-safe route parameter from the title to handle structural routing
          const slug = post.slug || (post.title || "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');

          if (!slug) return null;

          const titleLower = (post.title || "").toLowerCase();
          
          let tagLabel = "Product Strategy";
          let tagStyle = "bg-blue-500/10 text-blue-600 dark:text-blue-400";
          let borderHover = "hover:border-blue-500/30";
          let linkStyle = "text-blue-600 dark:text-blue-400";
          let estReadTime = "5 min read";

          if (titleLower.includes("qa") || titleLower.includes("testing") || titleLower.includes("gatekeeper")) {
            tagLabel = "Quality Assurance";
            tagStyle = "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/10";
            borderHover = "hover:border-indigo-500/30";
            linkStyle = "text-indigo-600 dark:text-indigo-400";
            estReadTime = "6 min read";
          } else if (titleLower.includes("refused") || titleLower.includes("owner") || titleLower.includes("features") || titleLower.includes("airbnb")) {
            tagLabel = "Product Management";
            tagStyle = "bg-orange-500/10 text-orange-600 dark:text-orange-400";
            borderHover = "hover:border-orange-500/30";
            linkStyle = "text-orange-600 dark:text-orange-400";
            estReadTime = "4 min read";
          } else if (titleLower.includes("ai") || titleLower.includes("era") || titleLower.includes("waiting")) {
            tagLabel = "Tech Strategy";
            tagStyle = "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400";
            borderHover = "hover:border-cyan-500/30";
            linkStyle = "text-cyan-600 dark:text-cyan-400";
            estReadTime = "6 min read";
          }

          return (
            <Link 
              href={`/blog/${slug}`}
              key={slug}
              className={`group flex flex-col bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${borderHover} cursor-pointer`}
            >
              <div className="p-8 flex flex-col h-full w-full pointer-events-none">
                
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${tagStyle}`}>
                    {tagLabel}
                  </span>
                  <span className="text-gray-500 text-xs font-medium">{estReadTime}</span>
                </div>

                <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors ${
                  tagLabel === "Product Management" ? "group-hover:text-orange-500" :
                  tagLabel === "Tech Strategy" ? "group-hover:text-cyan-500" :
                  tagLabel === "Quality Assurance" ? "group-hover:text-indigo-500" : "group-hover:text-blue-500"
                }`}>
                  {post.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed flex-grow line-clamp-4">
                  {post.summary || "Click to read full article insights breakdown."}
                </p>

                <div className={`mt-auto inline-flex items-center gap-2 font-bold text-sm transition-all group-hover:gap-3 ${linkStyle}`}>
                  Read Article <ArrowRight className="w-4 h-4" />
                </div>

              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}