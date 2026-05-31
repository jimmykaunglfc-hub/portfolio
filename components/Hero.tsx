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

      {/* FIXED: High-contrast title typography ensures crystal clear visibility */}
      <h1 className="text-4xl md:text-6xl font-extrabold text-zinc-900 dark:text-white max-w-4xl mb-8 leading-tight tracking-tight">
        Orchestrating High-Impact <br className="hidden md:block"/> Digital Platforms &amp; FinTech Channels.
      </h1>

      {/* FIXED: High-contrast subtitle typography */}
      <p className="text-base md:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mb-12 leading-relaxed font-light">
        Driving end-to-end product lifecycles, optimizing operational infrastructure, and leading cross-functional teams to deliver secure, market-leading enterprise systems.
      </p>

      {/* Primary Landing Action Switches */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center relative z-20 pointer-events-auto">
        <a href="/#expertise" className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] hover:bg-zinc-900 dark:hover:bg-[#94b3f8] px-10 py-4 rounded-full font-bold text-sm transition-all duration-300 hover:scale-105 shadow-md flex items-center justify-center gap-2 group">
          View Core Pillars 
          <span className="material-symbols-outlined text-lg text-white dark:text-[#002e6a] group-hover:translate-x-1 transition-transform">
            arrow_forward
          </span>
        </a>
        <a href="/#experience" className="bg-zinc-200/50 dark:bg-white/5 border border-zinc-300 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 px-10 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg text-zinc-900 dark:text-white">history_edu</span>
          Leadership History
        </a>
      </div>

      {/* Cityscape Technical Viewframe Layer */}
      <div className="mt-20 w-full max-w-7xl mx-auto px-4 opacity-20 dark:opacity-30 pointer-events-none select-none">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-zinc-300 dark:border-white/10 relative">
          <img 
            alt="Global Digital Framework Operations" 
            className="w-full h-full object-cover grayscale mix-blend-multiply dark:mix-blend-lighten"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxUCLGjqA3ADToGDFXL926V0xUuZgOKwHuy1nzbofro-6kBlezm1sCrYS512TKZ46m7I1IsCMqPY7Y1Ubki3kTHsvBrTxIiXBvfOGKxdThV7KEqR8JTQxWyJqIlBLue9bOjtowxtVMoyyIBypgRNuGWl13-ukt_Y02R-isubmQtj3qtwYpGWK6ZrJ_jms94BsdEV6GOUfm06if1gLGSBxgHlHT4AiUksKljjOtpxsC0RnRRfVEgv7DSVwOXp0S0VhGuuomxrApNp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#09090b]" />
        </div>
      </div>
    </section>
  );
}