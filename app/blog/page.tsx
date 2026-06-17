"use client";

import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function BlogIndex() {
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
        
        {/* Article 1 */}
        <div className="group flex flex-col bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/30">
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
                Product Strategy
              </span>
              <span className="text-gray-500 text-xs font-medium">5 min read</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-500 transition-colors">
              Product Management Is Not Just About Building Products — It’s About Sustaining Their Success
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
              The true value of Product Management appears after the product reaches the market. Here is why launching a product is just the starting point, and how to drive long-term value.
            </p>
            <Link href="/blog/product-management-success" className="mt-auto inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold text-sm hover:gap-3 transition-all">
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Article 2 */}
        <div className="group flex flex-col bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/30">
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
                Product Management
              </span>
              <span className="text-gray-500 text-xs font-medium">4 min read</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-orange-500 transition-colors">
              The Product Owner Who Refused to Build More Features
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
              When people think about Product Owners, many imagine writing user stories and managing backlogs. But true transformation happens when you take responsibility for the outcome, not just the output.
            </p>
            <Link href="/blog/airbnb-product-owner" className="mt-auto inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-sm hover:gap-3 transition-all">
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Article 3 (The New AI Article) */}
        <div className="group flex flex-col bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-cyan-500/30">
          <div className="p-8 flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider">
                Tech Strategy
              </span>
              <span className="text-gray-500 text-xs font-medium">6 min read</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cyan-500 transition-colors">
              The Market Is Not Waiting: Why the AI Era Is Redefining Digital Product Success
            </h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 leading-relaxed flex-grow">
              For years, digital businesses competed on features. Today, they compete on learning speed and AI integration. Discover the new formula for building products in the age of AI.
            </p>
            <Link href="/blog/ai-era-product-success" className="mt-auto inline-flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-bold text-sm hover:gap-3 transition-all">
              Read Article <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}