"use client";

import React from "react";
import { 
  ArrowLeft, Clock, Zap, Target, Search, BarChart3, 
  Workflow, ArrowRight, ArrowDown, Sparkles, BrainCircuit, LineChart, CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function AIEraProductSuccess() {
  return (
    <article className="min-h-screen bg-slate-50 dark:bg-zinc-950 text-slate-800 dark:text-zinc-200 pt-32 pb-24 font-sans selection:bg-blue-500/30">
      
      {/* Hero Header & Meta */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 dark:border-zinc-800 pb-6 mb-8">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-500 dark:text-zinc-400 dark:hover:text-blue-400 transition-colors group w-fit"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to Insights
          </Link>
          <div className="flex items-center gap-4 text-xs font-medium text-slate-400 dark:text-zinc-500 uppercase tracking-wider">
            <span className="bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2.5 py-1 rounded-md font-bold">
              Tech Strategy
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 6 Min Read
            </span>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
          The Market Is Not Waiting: Why the AI Era Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">Redefining Digital Product Success</span>
        </h1>
      </div>

      {/* Hero Image / Visualization */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800">
          <img 
            src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop" 
            alt="Abstract AI Data Visualization" 
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>
          <div className="absolute bottom-8 left-8 right-8 text-white">
            <p className="text-sm font-bold tracking-widest uppercase text-blue-400 mb-2">The Evolution of Competition</p>
            
            {/* CSS Timeline Visualization */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0 w-full mt-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
              <div className="flex-1 flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">1</div>
                <span className="font-medium text-slate-300">Features</span>
                <div className="hidden sm:block flex-1 h-[1px] bg-slate-600 mx-2"></div>
              </div>
              <div className="flex-1 flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-xs font-bold text-slate-200">2</div>
                <span className="font-medium text-slate-200">Speed</span>
                <div className="hidden sm:block flex-1 h-[1px] bg-slate-500 mx-2"></div>
              </div>
              <div className="flex-1 flex items-center gap-3 w-full">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-bold shadow-[0_0_15px_rgba(59,130,246,0.6)]">3</div>
                <span className="font-bold text-white">Learning & Adaptation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-12 space-y-12 text-base sm:text-lg leading-relaxed text-slate-700 dark:text-zinc-300">
        
        {/* Intro */}
        <section>
          <p className="text-xl sm:text-2xl font-medium text-slate-900 dark:text-white leading-relaxed mb-6">
            For years, digital businesses competed on features. Then they competed on speed. Today, a new shift is happening.
          </p>
          <p>
            They compete on learning speed, adaptation speed, and AI integration capability. This is not another technology trend. This is a market restructuring event. The companies that understand this shift early will define customer expectations for the next decade. The companies that react late may still survive — but they will struggle to lead.
          </p>
        </section>

        {/* Market Reconfiguration */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight border-b border-slate-200 dark:border-zinc-800 pb-4">
            <BarChart3 className="w-6 h-6 text-blue-500" /> We Are Entering the Era of Market Reconfiguration
          </h2>
          <p>
            Historically, industries evolved gradually. AI is accelerating that cycle. Recent global research indicates that AI adoption could contribute up to 15 percentage points to global GDP growth by 2035, while forcing industries to reorganize and redraw competitive boundaries. 
          </p>
          
          {/* Simulated Venn Diagram Visualization */}
          <div className="bg-slate-100 dark:bg-[#121214] p-8 rounded-2xl border border-slate-200 dark:border-zinc-800 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3"></div>
            
            <h3 className="relative z-10 text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Fluid Market Boundaries</h3>
            <div className="relative z-10 flex flex-col md:flex-row justify-center items-center gap-4">
              <div className="w-full md:w-48 p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm z-20">
                <span className="font-bold text-slate-900 dark:text-white">Software Company</span>
              </div>
              <div className="flex gap-2 rotate-90 md:rotate-0">
                <ArrowRight className="w-5 h-5 text-blue-500" /><ArrowLeft className="w-5 h-5 text-blue-500" />
              </div>
              <div className="w-full md:w-48 p-4 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-700 rounded-xl shadow-sm z-20">
                <span className="font-bold text-slate-900 dark:text-white">Traditional Bank</span>
              </div>
            </div>
            <p className="relative z-10 text-sm mt-8 text-slate-500 dark:text-zinc-400 max-w-md mx-auto">
              Entire value chains are being rebuilt around data, automation, and intelligence rather than traditional sector definitions.
            </p>
          </div>
        </section>

        {/* Compressing Time */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight border-b border-slate-200 dark:border-zinc-800 pb-4">
            <Zap className="w-6 h-6 text-yellow-500" /> AI Is Not Eliminating Competition — It Is Compressing Time
          </h2>
          <p>
            One of the biggest misunderstandings in business today is believing AI only reduces cost. That view is already outdated. Organizations that extract the highest value from AI are using it to discover opportunities faster, reduce product development cycles, improve customer experience, launch experiments continuously, and create entirely new revenue streams.
          </p>

          {/* Role Shift Visualization */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
            <div className="p-6 border border-slate-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 rounded-2xl">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Old PM Paradigm</div>
              <div className="text-xl font-bold text-slate-400 line-through decoration-red-500/50">Backlog Operators</div>
            </div>
            <div className="p-6 border border-blue-500/30 bg-blue-50 dark:bg-blue-950/20 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10"><BrainCircuit className="w-16 h-16" /></div>
              <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">New PM Paradigm</div>
              <ul className="space-y-2 font-bold text-slate-900 dark:text-white text-lg relative z-10">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500"/> Opportunity Evaluators</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500"/> Market Interpreters</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500"/> AI Adoption Strategists</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-blue-500"/> Value Creators</li>
              </ul>
            </div>
          </div>
        </section>

        {/* The Formulas - Flowchart Visualization */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight border-b border-slate-200 dark:border-zinc-800 pb-4">
            <Workflow className="w-6 h-6 text-emerald-500" /> The New Digital Product Formula
          </h2>
          
          <div className="space-y-8 my-8">
            {/* Old Formula Pipeline */}
            <div>
              <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">The Old Linear Formula</h3>
              <div className="flex flex-col md:flex-row gap-2 md:items-center text-sm font-medium text-slate-500 opacity-60">
                <div className="px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-lg">Problem</div>
                <ArrowRight className="hidden md:block w-4 h-4" /><ArrowDown className="md:hidden w-4 h-4 mx-auto" />
                <div className="px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-lg">Requirements</div>
                <ArrowRight className="hidden md:block w-4 h-4" /><ArrowDown className="md:hidden w-4 h-4 mx-auto" />
                <div className="px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-lg">Build</div>
                <ArrowRight className="hidden md:block w-4 h-4" /><ArrowDown className="md:hidden w-4 h-4 mx-auto" />
                <div className="px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-lg">Launch</div>
                <ArrowRight className="hidden md:block w-4 h-4" /><ArrowDown className="md:hidden w-4 h-4 mx-auto" />
                <div className="px-4 py-2 border border-slate-300 dark:border-zinc-700 rounded-lg">Maintain</div>
              </div>
            </div>

            {/* New Formula Pipeline */}
            <div>
              <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> The New AI-Accelerated Loop
              </h3>
              <div className="flex flex-col md:flex-row gap-2 md:items-center text-sm font-bold text-slate-900 dark:text-white">
                <div className="px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm">Customer Signals</div>
                <ArrowRight className="hidden md:block w-4 h-4 text-emerald-500" /><ArrowDown className="md:hidden w-4 h-4 mx-auto text-emerald-500" />
                <div className="px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm">AI Discovery</div>
                <ArrowRight className="hidden md:block w-4 h-4 text-emerald-500" /><ArrowDown className="md:hidden w-4 h-4 mx-auto text-emerald-500" />
                <div className="px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm">Rapid Validation</div>
                <ArrowRight className="hidden md:block w-4 h-4 text-emerald-500" /><ArrowDown className="md:hidden w-4 h-4 mx-auto text-emerald-500" />
                <div className="px-4 py-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-lg shadow-sm">Intelligent Delivery</div>
                <ArrowRight className="hidden md:block w-4 h-4 text-emerald-500" /><ArrowDown className="md:hidden w-4 h-4 mx-auto text-emerald-500" />
                <div className="px-4 py-3 bg-emerald-500 text-white rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.4)]">Optimization</div>
              </div>
            </div>
          </div>
          <p className="font-semibold border-l-4 border-emerald-500 pl-4 py-1 italic">
            The launch itself is no longer the milestone. Learning becomes the milestone. Products that do not continuously adapt become obsolete faster than before.
          </p>
        </section>

        {/* Embedded Secondary Image */}
        <div className="w-full h-[300px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-zinc-800 my-12">
          <img 
            src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" 
            alt="Data Analytics and Innovation" 
            className="w-full h-full object-cover"
          />
        </div>

        {/* The Biggest Risk */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight border-b border-slate-200 dark:border-zinc-800 pb-4">
            <Target className="w-6 h-6 text-red-500" /> The Biggest Risk: Building Faster Instead of Thinking Better
          </h2>
          <p>
            Many companies are currently making the same mistake. They purchase AI tools. They automate reports. They generate content. But they do not redesign decision-making.
          </p>
          <div className="bg-slate-900 text-white p-8 rounded-2xl relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 rounded-full blur-[100px]"></div>
            <p className="text-xl font-medium leading-relaxed relative z-10 mb-6">
              "Technology alone is not the advantage. Execution architecture becomes the advantage."
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
              <div className="bg-black/40 p-4 rounded-xl border border-white/10">
                <span className="block text-xs text-red-400 font-bold uppercase tracking-widest mb-1">The Old Question</span>
                <span className="font-mono text-sm">"Are we using AI?"</span>
              </div>
              <div className="bg-blue-500/20 p-4 rounded-xl border border-blue-500/30">
                <span className="block text-xs text-blue-400 font-bold uppercase tracking-widest mb-1">The Better Question</span>
                <span className="font-mono text-sm">"Are we creating products differently because AI exists?"</span>
              </div>
            </div>
          </div>
        </section>

        {/* 5 Strategies List */}
        <section className="space-y-8">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3 tracking-tight border-b border-slate-200 dark:border-zinc-800 pb-4">
            <Search className="w-6 h-6 text-purple-500" /> What Product Leaders Should Do Now
          </h2>
          
          <div className="space-y-6">
            {[
              { num: "1", title: "Rebuild Product Discovery", desc: "Customer interviews alone are no longer enough. Combine user insight, market signals, AI-assisted research, and behavioral analytics. Discover faster than competitors." },
              { num: "2", title: "Prioritize Capability Over Feature Count", desc: "Stop measuring roadmap success by delivery volume. Measure adoption, retention, learning velocity, and revenue impact." },
              { num: "3", title: "Design Products That Learn", desc: "Products should evolve continuously. AI-powered recommendation, personalization, prediction, and automation will increasingly become expected rather than premium." },
              { num: "4", title: "Build Cross-Functional Innovation Systems", desc: "Marketing, Product, Data, Engineering, and Operations can no longer operate independently. The future belongs to connected decision-making." },
              { num: "5", title: "Invest Before Certainty Exists", desc: "Waiting for 'proof' may become the most expensive decision. Market leaders often win before the market fully understands the shift." },
            ].map((item) => (
              <div key={item.num} className="flex gap-4 sm:gap-6 bg-white dark:bg-zinc-900/50 p-6 rounded-2xl border border-slate-200 dark:border-zinc-800 shadow-sm">
                <div className="w-12 h-12 flex-shrink-0 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 flex items-center justify-center rounded-full font-black text-xl">
                  {item.num}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="text-slate-600 dark:text-zinc-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trillion Dollar Stat / Conclusion */}
        <section className="pt-8">
          <div className="border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/10 rounded-3xl p-8 sm:p-12 text-center mb-12">
            <LineChart className="w-12 h-12 text-blue-500 mx-auto mb-6" />
            <h2 className="text-xl font-bold text-slate-500 uppercase tracking-widest mb-4">The Product Opportunity of the Decade</h2>
            <div className="text-5xl sm:text-7xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
              $2.6 - $4.4 <span className="text-blue-500">Trillion</span>
            </div>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Research estimates generative AI could contribute this annually in economic value. But opportunity does not reward awareness. It rewards execution. The next generation of digital winners will not necessarily be the largest organizations. They will be the fastest learners.
            </p>
          </div>

          <div className="border-l-4 border-slate-900 dark:border-white pl-6 py-2">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Final Thought</h3>
            <p className="text-lg">
              The market is shifting. Customers are changing. Expectations are rising. The question is not whether AI will transform your industry. The question is whether your product strategy will evolve before the market does.
            </p>
            <p className="text-xl font-black text-slate-900 dark:text-white mt-4 bg-yellow-400/20 inline-block px-2">
              Because in the AI era—standing still is no longer neutral. It is moving backward.
            </p>
          </div>
        </section>

      </div>
    </article>
  );
}