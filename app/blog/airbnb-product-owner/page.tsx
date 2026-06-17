"use client";

import React from "react";
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  TrendingDown, 
  Lightbulb, 
  ShieldCheck, 
  Target, 
  Eye, 
  ToggleLeft, 
  RefreshCw,
  Sparkles,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ProductOwnerBlogPost() {
  return (
    <article className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 pt-32 pb-24 px-4 sm:px-6 md:px-12 max-w-4xl mx-auto font-sans selection:bg-orange-500/30">
      
      {/* Navigation & Meta Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-zinc-800 pb-6">
        <Link 
          href="/blog" 
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-orange-500 dark:text-zinc-400 dark:hover:text-orange-400 transition-colors group w-fit"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Insights
        </Link>
        
        <div className="flex items-center gap-4 text-xs font-medium text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
          <span className="bg-orange-100 dark:bg-orange-950/40 text-orange-600 dark:text-orange-400 px-2.5 py-1 rounded-md font-bold">
            Product Management
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> 4 Min Read
          </span>
        </div>
      </div>

      {/* Main Hero Header */}
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
          The Product Owner Who Refused to Build More Features — <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 dark:from-orange-400 dark:to-amber-400">And Changed a Company</span>
        </h1>
        <p className="text-lg sm:text-xl text-slate-500 dark:text-zinc-400 font-medium leading-relaxed max-w-3xl">
          When people think about Product Owners, many imagine writing user stories, managing backlog items, and running sprint ceremonies. But true transformation happens when you take responsibility for the outcome, not just the output.
        </p>
      </header>

      {/* Intro Accent Graphic Block */}
      <div className="relative border-l-4 border-orange-500 bg-slate-100 dark:bg-zinc-900 p-5 rounded-r-xl mb-12 shadow-sm">
        <p className="text-base font-medium leading-relaxed italic text-slate-700 dark:text-zinc-300">
          "History shows that the real impact of Product Ownership begins after release — when someone takes responsibility for whether the product succeeds. One of the strongest examples comes from Airbnb."
        </p>
        <div className="absolute right-4 bottom-4 opacity-10 dark:opacity-[0.03]">
          <BookOpen className="w-16 h-16 text-slate-900 dark:text-white" />
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-12 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-zinc-300">
        
        {/* Section 1: The Situation */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
            <span className="p-2 rounded-lg bg-red-500/10 text-red-500 dark:text-red-400">
              <TrendingDown className="w-5 h-5" />
            </span>
            The Situation: Growth Without Sustainable Success
          </h2>
          <p>
            Around 2009, Airbnb was struggling. Users visited the platform but bookings remained low. Investors questioned whether the business model would survive. The team was shipping features but growth was not accelerating as expected.
          </p>
          
          {/* Framed Graphic Container */}
          <div className="my-8 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-bold text-slate-400 dark:text-zinc-500 uppercase tracking-widest mb-4">
              The Standard Corporate Counter-Response
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: "Build more features", desc: "Attract audiences blindly by packing the UI core." },
                { title: "Launch campaigns", desc: "Force unnatural traffic acquisition spikes." },
                { title: "Increase output", desc: "Push engineering velocity faster without safety rails." }
              ].map((item, index) => (
                <div key={index} className="border border-slate-100 dark:border-zinc-800/60 bg-slate-50 dark:bg-zinc-900 p-4 rounded-xl relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-1 h-full bg-slate-300 dark:bg-zinc-700 group-hover:bg-orange-500 transition-colors" />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{item.title}</h4>
                  <p className="text-xs text-slate-500 dark:text-zinc-400 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-2 mt-4 text-center justify-center bg-orange-500/5 dark:bg-orange-500/10 py-3 rounded-xl border border-orange-500/20 text-base">
            <Sparkles className="w-5 h-5 text-orange-500 flex-shrink-0" />
            Instead, the product team asked a different question: "Why are users not converting?"
          </p>
        </section>

        {/* Section 2: The Product Mindset */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight">
            <span className="p-2 rounded-lg bg-orange-500/10 text-orange-500 dark:text-orange-400">
              <Lightbulb className="w-5 h-5" />
            </span>
            The Product Mindset That Changed Everything
          </h2>
          <p>
            The product leadership team investigated customer behavior. What they discovered was surprisingly simple: <strong className="text-slate-900 dark:text-white font-semibold">listings with poor-quality photos performed badly.</strong>
          </p>
          
          <div className="bg-slate-900 text-slate-100 p-6 rounded-2xl my-6 border border-zinc-800 relative overflow-hidden shadow-md">
            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-orange-400 font-mono text-sm tracking-widest uppercase mb-2">// Root Cause Analysis</h3>
                <p className="text-xl font-bold text-white leading-tight mb-3">
                  The issue was not technology. <br />The issue was trust.
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  People were deciding whether to stay in a stranger’s home based on low-quality, blurry images taken on early generation smartphones.
                </p>
              </div>
              <div className="bg-slate-800/80 border border-slate-700/60 p-4 rounded-xl space-y-2.5 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2 text-green-400"><ShieldCheck className="w-4 h-4" /> Bypassed traditional roadmap</div>
                <div className="flex items-center gap-2 text-orange-400"><ArrowRight className="w-4 h-4" /> Traveled to New York hosts directly</div>
                <div className="flex items-center gap-2 text-orange-400"><ArrowRight className="w-4 h-4" /> Photographed listings manually</div>
                <div className="flex items-center gap-2 text-green-400"><ShieldCheck className="w-4 h-4" /> Metrics conversion validation</div>
              </div>
            </div>
          </div>

          <p>
            By focusing entirely on the real customer bottleneck instead of complex code deployments, the results scaled exponentially: Bookings increased, trust stabilized, and overall platform growth accelerated organically. 
          </p>
          <p className="italic text-slate-500 dark:text-zinc-400">
            The turning point was not engineering scale. It was absolute product ownership.
          </p>
        </section>

        {/* Section 3: Takeaways Framework Grid */}
        <section className="space-y-6">
          <div className="border-t border-slate-200 dark:border-zinc-800 pt-8">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight">
              What Product Owners Can Learn
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                icon: <Target className="w-5 h-5 text-emerald-500" />,
                bg: "bg-emerald-500/5 dark:bg-emerald-500/10",
                title: "1. Features do not create value — outcomes do",
                desc: "Customers do not buy roadmaps or praise velocity metrics. They buy solved problems. Measure success by behavioral shifts, not ticket counts."
              },
              {
                icon: <Eye className="w-5 h-5 text-blue-500" />,
                bg: "bg-blue-500/5 dark:bg-blue-500/10",
                title: "2. Discovery matters more than assumption",
                desc: "Before gathering rigid functional requirements, spend time validating if the underlying problem actually exists beyond pure intuition."
              },
              {
                icon: <ToggleLeft className="w-5 h-5 text-amber-500" />,
                bg: "bg-amber-500/5 dark:bg-amber-500/10",
                title: "3. Protect strategic focus relentlessly",
                desc: "Not every functional idea deserves development team cycles. Backlog management is strategy execution—prioritization is leadership."
              },
              {
                icon: <RefreshCw className="w-5 h-5 text-purple-500" />,
                bg: "bg-purple-500/5 dark:bg-purple-500/10",
                title: "4. Product ownership continues after launch",
                desc: "Ship day isn't the finish line. True longevity requires an loops of constant iteration: Observe → Learn → Improve → Scale."
              }
            ].map((card, idx) => (
              <div key={idx} className="p-5 rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900/40 shadow-sm flex flex-col gap-3">
                <div className={`p-2 rounded-xl w-fit ${card.bg}`}>
                  {card.icon}
                </div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white tracking-tight">{card.title}</h3>
                <p className="text-sm text-slate-500 dark:text-zinc-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Conclusion Callout */}
        <footer className="border-t border-slate-200 dark:border-zinc-800 pt-8 mt-12 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Why This Matters</h2>
          <p>
            Many organizations believe Product teams exist to deliver functional requests from stakeholders. But great Product Owners do something completely different: They protect customer value, challenge legacy assumptions, make difficult prioritization trade-offs, and maintain clarity when everyone wants something different.
          </p>
          <p className="text-slate-950 dark:text-white font-extrabold text-lg bg-gradient-to-r from-orange-500/10 to-transparent p-4 rounded-xl border-l-4 border-orange-500">
            The difference between a failed product and a global success is often not more development. It is better product decisions. And sometimes, the biggest breakthrough comes from building less — but solving the right problem.
          </p>
        </footer>

      </div>
    </article>
  );
}