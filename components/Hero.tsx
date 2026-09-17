'use client';

import { motion } from 'framer-motion';

const reveal = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <section className="min-h-[82vh] flex flex-col items-center justify-center px-6 text-center pt-32 pb-16 relative z-10 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none bg-[radial-gradient(ellipse_42%_38%_at_50%_35%,rgba(194,255,58,0.15),transparent_72%)] dark:bg-[radial-gradient(ellipse_42%_38%_at_50%_35%,rgba(194,255,58,0.10),transparent_72%)]" />
      <div className="absolute top-[23%] left-[12%] hidden md:block w-2 h-2 rounded-full bg-[#c2ff3a] animate-float-a" />
      <div className="absolute bottom-[24%] right-[14%] hidden md:block w-3 h-3 rounded-full border border-[#c2ff3a]/60 animate-float-b" />
      <div className="absolute top-[23%] left-[12%] hidden md:block w-2 h-2 rounded-full border border-[#c2ff3a] animate-[pulse-ring_2.6s_ease-out_infinite]" />
      
      {/* Executive Badge Capsule - Polished Contrast */}
      <motion.div variants={reveal} initial="hidden" animate="show" transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 bg-white/70 dark:bg-[#0c1122]/80 shadow-sm border border-[#0d1020]/10 dark:border-white/10 px-4 py-1.5 rounded-sm mb-8 backdrop-blur-md transition-colors">
        <span className="w-1.5 h-1.5 rounded-full bg-[#7dae13] dark:bg-[#c2ff3a] animate-pulse" />
        <span className="text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-[#526327] dark:text-[#c2ff3a]">
          Head of Digital Operations
        </span>
      </motion.div>

      <motion.h1 variants={reveal} initial="hidden" animate="show" transition={{ duration: 0.8, delay: 0.12 }} className="font-display text-4xl md:text-6xl font-bold text-[#0d1020] dark:text-[#dfe2ee] max-w-4xl mb-8 leading-[1.05] tracking-[-0.035em] transition-colors">
        Orchestrating High-Impact <br className="hidden md:block"/> <span className="text-[#719d12] dark:text-[#c2ff3a]">Digital Platforms</span> &amp; FinTech Channels.
      </motion.h1>

      <motion.p variants={reveal} initial="hidden" animate="show" transition={{ duration: 0.7, delay: 0.28 }} className="text-base md:text-lg text-slate-600 dark:text-[#8891ae] max-w-2xl mb-12 leading-relaxed font-light transition-colors">
        Driving end-to-end product lifecycles, optimizing operational infrastructure, and leading cross-functional teams to deliver secure, market-leading enterprise systems.
      </motion.p>

      {/* Primary Action Buttons */}
      <motion.div variants={reveal} initial="hidden" animate="show" transition={{ duration: 0.7, delay: 0.42 }} className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center relative z-20 pointer-events-auto">
        <a href="/#expertise" className="bg-[#c2ff3a] text-[#10170a] hover:bg-[#d5ff76] px-8 py-3.5 rounded-sm font-mono font-semibold text-xs tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_28px_rgba(194,255,58,0.16)] flex items-center justify-center gap-2 group">
          View Core Filters 
          <span className="material-symbols-outlined text-lg text-[#10170a] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </a>
        <a href="/#experience" className="bg-white/70 dark:bg-[#0c1122]/80 shadow-sm border border-[#0d1020]/10 dark:border-white/10 text-[#0d1020] dark:text-[#dfe2ee] hover:bg-white dark:hover:bg-white/5 px-8 py-3.5 rounded-sm font-mono font-medium text-xs tracking-[0.08em] uppercase transition-all duration-300 hover:-translate-y-1 flex items-center justify-center gap-2 backdrop-blur-md">
          <span className="material-symbols-outlined text-lg text-current">history_edu</span>
          Leadership History
        </a>
      </motion.div>
    </section>
  );
}
