import Hero from '../components/Hero';
import Link from 'next/link';

export default function Home() {
  const pillars = [
    {
      title: "Platform Architecture",
      desc: "Designing scalable, resilient cloud infrastructures and multi-tenant ecosystems that power enterprise operations.",
      icon: "hub",
      badges: ["Cloud Native", "Microservices"],
      color: "text-[#adc6ff]"
    },
    {
      title: "FinTech Solutions",
      desc: "Engineered secure payment gateways and compliance-first financial systems for high-frequency transactions.",
      icon: "payments",
      badges: ["PCI-DSS", "Blockchain"],
      color: "text-[#ddb7ff]"
    },
    {
      title: "Strategic Process",
      desc: "Optimizing SDLC through automated governance, metrics-driven leadership, and agile operational excellence.",
      icon: "precision_manufacturing",
      badges: ["Agile", "CI/CD"],
      color: "text-[#c0c1ff]"
    }
  ];

  return (
    <main className="relative min-h-screen bg-[#09090b]">
      <Hero />

      {/* Core Matrix Grid Panel Dashboard */}
      <section id="expertise" className="py-28 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6 border-b border-white/5 pb-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-white mb-3 tracking-tight">Core Competencies</h2>
            <p className="text-slate-400 font-light text-base leading-relaxed">Strategic execution across critical digital domains, combining engineering rigor with executive oversight.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-12 h-1 bg-white/10 rounded-full" />
            <div className="w-24 h-1 bg-[#adc6ff] rounded-full" />
          </div>
        </div>

        {/* Triple Column High-Fidelity Animated Panel Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((item, index) => (
            <div key={index} className="glass-card p-10 rounded-2xl flex flex-col justify-between gap-8 group">
              <div className="space-y-6">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <span className={`material-symbols-outlined text-3xl ${item.color}`}>{item.icon}</span>
                </div>
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-white tracking-tight group-hover:text-[#adc6ff] transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-400 font-light text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                {item.badges.map((badge, bIdx) => (
                  <span key={bIdx} className="bg-white/[0.03] px-3 py-1 rounded-full text-xs font-medium text-slate-400 border border-white/5 group-hover:border-[#adc6ff]/20 transition-colors duration-300">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scaled Partnership Conversion Framework */}
      <section id="contact" className="px-6 max-w-7xl mx-auto mb-28">
        <div className="glass-card rounded-3xl p-12 md:p-20 text-center overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent group">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-110">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle cx="100" cy="0" fill="url(#grad1)" r="80" />
              <defs>
                <radialGradient cx="50%" cy="50%" id="grad1" r="50%">
                  <stop offset="0%" stopColor="#adc6ff" stopOpacity="1" />
                  <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Ready to scale your next initiative?</h2>
          <p className="text-slate-400 font-light text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            I am currently considering executive advisory roles and strategic partnerships for upcoming global product roadmaps.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
            <button className="bg-[#adc6ff] text-[#002e6a] font-semibold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] active:scale-95">
              Schedule a Strategy Session
            </button>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-8 py-4 rounded-full font-semibold text-sm transition-all duration-300 hover:-translate-y-0.5">
              Download Portfolio PDF
            </button>
          </div>
        </div>
      </section>

      {/* Premium Executive Footer */}
      <footer className="bg-[#131315]/40 border-t border-white/5 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 max-w-7xl mx-auto gap-6">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="text-2xl font-bold tracking-tight text-white">KHNCO<span className="text-[#adc6ff]">.</span></div>
            <p className="text-xs text-slate-500 font-light">© 2026 KHNCO. Executive Portfolio.</p>
          </div>
          <div className="flex gap-8">
            <Link className="text-xs font-medium text-slate-400 hover:text-white tracking-wider uppercase transition-colors" href="#">LinkedIn</Link>
            <Link className="text-xs font-medium text-slate-400 hover:text-white tracking-wider uppercase transition-colors" href="#">Twitter</Link>
            <Link className="text-xs font-medium text-slate-400 hover:text-white tracking-wider uppercase transition-colors" href="#">Dribbble</Link>
          </div>
        </div>
      </footer>

      {/* Delayed Physics Flare Anchors */}
      <div className="glow-flare flare-2 w-[500px] h-[500px] bg-[#b76dff] bottom-[-100px] right-[-100px]" />
    </main>
  );
}