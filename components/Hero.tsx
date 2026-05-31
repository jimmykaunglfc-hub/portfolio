export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-24 pb-12 relative z-10">
      {/* Active Executive Pulse Capsule */}
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full mb-8 pointer-events-auto">
        <span className="w-2 h-2 rounded-full bg-[#adc6ff] animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-widest text-[#adc6ff]">
          Head of Digital Operations
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-gradient max-w-4xl mb-8 leading-tight tracking-tight">
        Orchestrating High-Impact <br className="hidden md:block"/> Digital Platforms &amp; FinTech Channels.
      </h1>

      <p className="text-base md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed font-light">
        Driving end-to-end product lifecycles, optimizing operational infrastructure, and leading cross-functional teams to deliver secure, market-leading enterprise systems.
      </p>

      {/* FIXED: Switched to native HTML anchors with absolute root prefixes */}
      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center relative z-20 pointer-events-auto">
        <a href="/#expertise" className="bg-[#adc6ff] hover:bg-[#94b3f8] text-[#002e6a] px-10 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] active:scale-95 flex items-center justify-center gap-2">
          View Core Pillars <span className="material-symbols-outlined text-lg font-bold">arrow_forward</span>
        </a>
        <a href="/#experience" className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-full font-semibold text-sm backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:-translate-y-0.5 flex items-center justify-center">
          Leadership History
        </a>
      </div>

      {/* Panoramic Technology Cityscape Overlay Frame */}
      <div className="mt-24 w-full max-w-7xl mx-auto px-4 opacity-25 pointer-events-none select-none">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 relative">
          <img 
            alt="Global Digital Framework Operations" 
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-lighten"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxUCLGjqA3ADToGDFXL926V0xUuZgOKwHuy1nzbofro-6kBlezm1sCrYS512TKZ46m7I1IsCMqPY7Y1Ubki3kTHsvBrTxIiXBvfOGKxdThV7KEqR8JTQxWyJqIlBLue9bOjtowxtVMoyyIBypgRNuGWl13-ukt_Y02R-isubmQtj3qtwYpGWK6ZrJ_jms94BsdEV6GOUfm06if1gLGSBxgHlHT4AiUksKljjOtpxsC0RnRRfVEgv7DSVwOXp0S0VhGuuomxrApNp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-transparent" />
        </div>
      </div>
    </section>
  );
}