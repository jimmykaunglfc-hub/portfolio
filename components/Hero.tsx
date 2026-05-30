import Link from 'next/link';

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 text-center pt-28">
      {/* Dynamic Animated Greeting Badge */}
      <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
        <span className="text-xs font-semibold uppercase tracking-widest text-blue-300">
          Hello, I'm Kaung Htet
        </span>
      </div>

      <h1 className="text-4xl md:text-6xl font-bold text-gradient max-w-4xl mb-8 leading-tight tracking-tight">
        Architecting Digital <br className="hidden md:block"/> Excellence for Global Leaders.
      </h1>

      <p className="text-base md:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed font-light">
        Senior Executive Specialist driving technological transformation in FinTech and Enterprise Platforms. Balancing technical precision with creative strategy.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
        <Link href="#work" className="bg-blue-400 hover:bg-blue-500 text-zinc-950 px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)] flex items-center justify-center gap-2">
          View Portfolio <span className="material-symbols-outlined text-lg font-bold">arrow_forward</span>
        </Link>
        <Link href="#cv" className="bg-white/5 border border-white/10 hover:bg-white/10 text-zinc-100 px-8 py-4 rounded-full font-semibold text-sm backdrop-blur-md transition-all duration-300">
          Curriculum Vitae
        </Link>
      </div>

      {/* Cinematic Tech Backdrop Mockup */}
      <div className="mt-24 w-full max-w-7xl mx-auto px-4 opacity-30">
        <div className="aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 relative">
          <img 
            alt="Executive Infrastructure Network View" 
            className="w-full h-full object-cover grayscale opacity-40 mix-blend-lighten"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxUCLGjqA3ADToGDFXL926V0xUuZgOKwHuy1nzbofro-6kBlezm1sCrYS512TKZ46m7I1IsCMqPY7Y1Ubki3kTHsvBrTxIiXBvfOGKxdThV7KEqR8JTQxWyJqIlBLue9bOjtowxtVMoyyIBypgRNuGWl13-ukt_Y02R-isubmQtj3qtwYpGWK6ZrJ_jms94BsdEV6GOUfm06if1gLGSBxgHlHT4AiUksKljjOtpxsC0RnRRfVEgv7DSVwOXp0S0VhGuuomxrApNp4"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
        </div>
      </div>
    </section>
  );
}