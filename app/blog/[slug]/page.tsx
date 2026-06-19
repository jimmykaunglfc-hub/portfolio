export const dynamic = 'force-dynamic';

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import { client } from "@/sanity/lib/client";

export default async function BlogIndex() {
  // Fetch all articles live from Sanity with cache fully disabled
  const posts = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc) {
      title,
      "slug": slug.current,
      excerpt
    }`,
    {},
    { cache: 'no-store' }
  );

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      {/* Catalog Header Section */}
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex items-center gap-4">
          <BookOpen className="w-10 h-10 text-blue-500" />
          Insights & <span className="text-blue-500">Articles</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Thoughts, strategies, and deep dives into product management, software engineering, and creating exceptional user experiences.
        </p>
      </div>

      {/* Dynamic Grid Mapping */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts && posts.map((post: any) => {
          // Safeguard if a document is missing a slug configuration
          if (!post.slug) return null;

          const titleLower = (post.title || "").toLowerCase();
          
          let tagLabel = "Product Strategy";
          let tagStyle = "bg-blue-500/10 text-blue-600 dark:text-blue-400";
          let borderHover = "hover:border-blue-500/30";
          let linkStyle = "text-blue-600 dark:text-blue-400";
          let estReadTime = "5 min read";

          // Intelligently assign color theme based on keywords
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
            <div 
              key={post.slug}
              className={`group flex flex-col bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 ${borderHover}`}
            >
              <div className="p-8 flex flex-col h-full">
                
                {/* Meta Header */}
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${tagStyle}`}>
                    {tagLabel}
                  </span>
                  <span className="text-gray-500 text-xs font-medium">{estReadTime}</span>
                </div>

                {/* Article Card Title */}
                <h3 className={`text-2xl font-bold text-gray-900 dark:text-white mb-4 transition-colors ${
                  tagLabel === "Product Management" ? "group-hover:text-orange-500" :
                  tagLabel === "Tech Strategy" ? "group-hover:text-cyan-500" :
                  tagLabel === "Quality Assurance" ? "group-hover:text-indigo-500" : "group-hover:text-blue-500"
                }`}>
                  {post.title}
                </h3>

                {/* Article Card Excerpt Summary */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed flex-grow line-clamp-4">
                  {post.excerpt || "Click read article to check out the full insights breakdown."}
                </p>

                {/* Navigation Link Router Button */}
                <Link 
                  href={`/blog/${post.slug}`} 
                  className={`mt-auto inline-flex items-center gap-2 font-bold text-sm hover:gap-3 transition-all ${linkStyle}`}
                >
                  Read Article <ArrowRight className="w-4 h-4" />
                </Link>

              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}