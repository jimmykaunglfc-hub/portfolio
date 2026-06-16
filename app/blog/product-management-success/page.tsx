"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, Search, Target, Code, Rocket, 
  TrendingUp, Repeat, Layers, CheckCircle2,
  Users, Activity, DollarSign
} from "lucide-react";
import Link from "next/link";

export default function BlogPost() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 relative z-10 font-sans bg-gray-50 dark:bg-[#09090b]">
      
      {/* Subtle Background Grid */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(#d1d5db_1px,transparent_1px)] dark:bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none"></div>

      <article className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Navigation */}
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors mb-8 md:mb-12">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {/* Header Section */}
        <header className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold tracking-wide uppercase">
              Product Strategy
            </span>
            <span className="text-gray-500 text-sm font-medium">5 min read</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-6 leading-tight">
            Product Management Is Not Just About Building Products — <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">It’s About Sustaining Their Success</span>
          </h1>
        </header>

        {/* Content Section 1: Introduction */}
        <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed mb-16">
          <p className="text-xl">
            In many software organizations, product management is often misunderstood as a role focused only on gathering requirements, creating roadmaps, and coordinating development until launch day.
          </p>
          <p className="text-xl font-medium text-gray-900 dark:text-white mt-6">
            But in reality, launching a product is not the finish line. <br/>
            <span className="text-blue-500">It is the starting point.</span>
          </p>
          <p className="mt-6">
            The true value of Product Management appears after the product reaches the market — when real users begin interacting with it, customer behaviors emerge, business assumptions are tested, and long-term growth decisions determine whether the product succeeds or slowly becomes irrelevant.
          </p>
        </div>

        {/* Content Section 2: SDLC Visual Grid */}
        <div className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Product Management Across the Software Development Life Cycle (SDLC)
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Product Management plays a strategic role throughout the entire SDLC.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phase 1 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-6">
                <Search className="w-6 h-6 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">1. Discovery & Validation</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Before development begins, PMs identify customer pain points, validate opportunities, and ensure teams solve meaningful problems.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Market & customer research</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Opportunity assessment</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div> Product vision definition</li>
              </ul>
            </motion.div>

            {/* Phase 2 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">2. Planning & Definition</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                PMs transform business objectives into actionable requirements, acting as the bridge between business, users, and engineering.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Defining product scope</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Writing acceptance criteria</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Managing priorities</li>
              </ul>
            </motion.div>

            {/* Phase 3 */}
            <motion.div whileHover={{ y: -5 }} className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6">
                <Code className="w-6 h-6 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">3. Development & Delivery</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                During implementation, PMs ensure teams remain focused on outcomes rather than outputs, monitoring delivery risks.
              </p>
              <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 font-medium">
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Managing trade-offs</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Removing ambiguity</li>
                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Supporting decision-making</li>
              </ul>
            </motion.div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/10 border-l-4 border-blue-500 rounded-r-xl">
            <p className="text-lg font-semibold text-blue-900 dark:text-blue-300 italic">
              "A product built without validation is simply expensive guessing. Successful products are rarely the result of perfect execution alone — they are the result of continuous prioritization."
            </p>
          </div>
        </div>

        {/* Content Section 3: The Critical Phase */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center flex-shrink-0">
              <Rocket className="w-6 h-6 text-red-500" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              The Most Critical Phase Begins After Release
            </h2>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 mb-10">
            <p>
              Many organizations unintentionally treat launch day as the completion of Product Management. This is where products often fail. Releasing software only answers one question: <strong>“Can we build it?”</strong>
            </p>
            <p className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-200 dark:border-white/10 pb-4">
              Post-launch Product Management answers the more important question: <br/>
              <span className="text-blue-500">“Should users continue using it?”</span>
            </p>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Customer Retention: The Ultimate Metric</h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Acquiring users is expensive. Retaining users creates sustainable growth. After launch, Product Managers focus on:
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {["User Adoption", "Retention Rates", "Churn Analysis", "Customer Feedback", "Behavioral Analytics", "Feature Effectiveness"].map((item, i) => (
              <span key={i} className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-sm font-bold text-gray-700 dark:text-gray-300 shadow-sm flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-500" /> {item}
              </span>
            ))}
          </div>

          <p className="text-lg font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-[#18181b] p-6 rounded-xl border border-gray-200 dark:border-white/10">
            A product that continuously retains users compounds in value over time. Retention becomes a stronger indicator of product success than downloads, registrations, or initial traffic.
          </p>
        </div>

        {/* Content Section 4: Value & Growth */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Driving Long-Term Product Value
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-10">
            The market constantly changes. Customer expectations evolve. Competitors innovate. Without active Product Management, products gradually lose relevance. PMs increase product value by:
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"><Repeat className="w-5 h-5 text-green-500" /></div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Continuous Improvement</h4>
                <p className="text-gray-600 dark:text-gray-400">Releasing enhancements based on real usage data rather than assumptions.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"><Users className="w-5 h-5 text-blue-500" /></div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Customer-Centric Iteration</h4>
                <p className="text-gray-600 dark:text-gray-400">Turning customer feedback into measurable product improvements.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"><Layers className="w-5 h-5 text-purple-500" /></div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Strategic Prioritization</h4>
                <p className="text-gray-600 dark:text-gray-400">Choosing initiatives that maximize business outcomes and customer impact.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-yellow-500/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1"><TrendingUp className="w-5 h-5 text-yellow-500" /></div>
              <div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Revenue & Growth Optimization</h4>
                <p className="text-gray-600 dark:text-gray-400">Identifying opportunities to increase conversion, improve engagement, expand offerings, and strengthen monetization.</p>
              </div>
            </div>
          </div>

          <div className="text-center p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl shadow-2xl relative overflow-hidden">
             <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] opacity-[0.15] [background-size:12px_12px]"></div>
             <h3 className="relative z-10 text-2xl md:text-3xl font-black text-white">
               The goal is not feature growth.<br/>
               <span className="text-blue-500">The goal is value growth.</span>
             </h3>
          </div>
        </div>

        {/* Content Section 5: Custodian of Success */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Product Management Is the Custodian of Success
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl p-8">
              <ul className="space-y-4 text-gray-600 dark:text-gray-400 font-medium">
                <li className="flex items-center gap-3"><Code className="w-5 h-5 text-gray-400" /> Engineering builds the product.</li>
                <li className="flex items-center gap-3"><Users className="w-5 h-5 text-gray-400" /> Marketing introduces the product.</li>
                <li className="flex items-center gap-3"><DollarSign className="w-5 h-5 text-gray-400" /> Sales distributes the product.</li>
                <li className="flex gap-3 text-gray-900 dark:text-white font-bold pt-4 border-t border-gray-200 dark:border-white/10 mt-4">
                  <Target className="w-6 h-6 text-blue-500 flex-shrink-0" /> 
                  But Product Management ensures the product continues delivering value over time.
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-100 dark:border-blue-500/20 rounded-2xl p-8">
              <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-4">A successful product is measured by:</h4>
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> How many customers stay</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> How much value customers receive</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> How effectively the product evolves</li>
                <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-blue-500" /> How sustainably the business grows</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Conclusion */}
        <footer className="border-t border-gray-200 dark:border-white/10 pt-12">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">Final Thoughts</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
            Software products are living systems. The companies that win are not necessarily those that launch first — they are the ones that learn faster, adapt continuously, and stay closest to customer needs. 
          </p>
          <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-bold">
            Product Management exists to make that happen. Because building a product is only the beginning. <br/>
            <span className="text-blue-500">Creating lasting product value is the real achievement.</span>
          </p>
        </footer>

      </article>
    </main>
  );
}