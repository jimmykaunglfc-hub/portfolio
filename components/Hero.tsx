export default function Hero() {
  return (
    <section className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center pt-32 pb-12 relative z-10">
      
      {/* Executive Badge Capsule */}
      <div className="inline-flex items-center gap-2 bg-zinc-200/60 dark:bg-white/5 border border-zinc-300 dark:border-white/10 px-4 py-1.5 rounded-full mb-8">
        <span className="w-2 h-2 rounded-full bg-[#4d8eff] dark:bg-[#adc6ff] animate-pulse" />
        <span className="text-xs font-mono font-semibold uppercase tracking-widest text-[#002e6a] dark:text-[#adc6ff]">
          Head of Digital Operations
        </span>
      </div>

      {/* High-contrast responsive color classes flip smoothly from black to white */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white max-w-4xl mb-8 leading-tight tracking-tight">
        Orchestrating High-Impact <br className="hidden md:block"/> Digital Platforms &amp; FinTech Channels.
      </h1>

      <p className="text-base md:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mb-12 leading-relaxed font-light">
        Driving end-to-end product lifecycles, optimizing operational infrastructure, and leading cross-functional teams to deliver secure, market-leading enterprise systems.
      </p>

      {/* Primary Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center relative z-20 pointer-events-auto">
        <a href="/#expertise" className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] hover:bg-zinc-900 dark:hover:bg-[#94b3f8] px-10 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center gap-2 group">
          View Core Filters 
          <span className="material-symbols-outlined text-lg text-white dark:text-[#002e6a] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </a>
        <a href="/#experience" className="bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 px-10 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg text-zinc-900 dark:text-white">history_edu</span>
          Leadership History
        </a>
      </div>
    </section>
  );
}