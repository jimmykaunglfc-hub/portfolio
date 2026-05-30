import Hero from '../components/Hero';

export default function Home() {
  const competencies = [
    {
      title: "Platform Architecture",
      desc: "Designing scalable, resilient cloud infrastructures and multi-tenant ecosystems that power enterprise operations.",
      icon: "hub",
      badges: ["Cloud Native", "Microservices"],
      color: "text-blue-300"
    },
    {
      title: "FinTech Solutions",
      desc: "Engineered secure payment gateways and compliance-first financial systems for high-frequency transactions.",
      icon: "payments",
      badges: ["PCI-DSS", "Blockchain"],
      color: "text-purple-300"
    },
    {
      title: "Strategic Process",
      desc: "Optimizing SDLC through automated governance, metrics-driven leadership, and agile operational excellence.",
      icon: "precision_manufacturing",
      badges: ["Agile", "CI/CD"],
      color: "text-zinc-300"
    }
  ];

  return (
    <main className="relative min-h-screen bg-zinc-950 pb-24">
      <Hero />

      {/* Competencies Dashboard Panel */}
      <section id="expertise" className="py-24 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-8">
          <div className="max-w-xl">
            <h2 className="text-3xl font-bold text-zinc-100 mb-3 tracking-tight">Core Competencies</h2>
            <p className="text-zinc-400 font-light text-base">Strategic execution across critical digital domains, combining engineering rigor with executive oversight.</p>
          </div>
          <div className="flex gap-2 h-1 bg-white/5 w-32 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-blue-400/30" />
            <div className="w-2/3 h-full bg-blue-400" />
          </div>
        </div>

        {/* 3-Column Glassmorphic Architecture Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {competencies.map((item, i) => (
            <div key={i} className="glass-card p-8 rounded-2xl flex flex-col justify-between gap-8 group">
              <div className="space-y-6">
                <div className={`w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center ${item.color}`}>
                  <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-blue-300 transition-colors duration-300">{item.title}</h3>
                  <p className="text-zinc-400 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 pt-4">
                {item.badges.map((badge, bIdx) => (
                  <span key={bIdx} className="bg-white/5 px-3 py-1 rounded-full text-xs font-medium text-zinc-400 border border-white/5">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Impact Partnership CTA Section */}
      <section id="contact" className="px-6 max-w-7xl mx-auto mt-12">
        <div className="glass-card rounded-3xl p-12 md:p-16 text-center relative overflow-hidden bg-gradient-to-br from-zinc-900/40 to-transparent">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-4 tracking-tight">Ready to scale your next initiative?</h2>
          <p className="text-zinc-400 font-light text-base md:text-lg max-w-xl mx-auto mb-10">
            I am currently considering executive advisory roles and strategic partnerships for upcoming roadmap cycles.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-blue-400 hover:bg-blue-500 text-zinc-950 font-semibold px-8 py-4 rounded-full text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Schedule a Strategy Session
            </button>
            <button className="bg-zinc-900 border border-white/10 hover:bg-zinc-800 text-zinc-200 px-8 py-4 rounded-full font-semibold text-sm transition-colors duration-300">
              Download Portfolio PDF
            </button>
          </div>
        </div>
      </section>

      {/* Lower Decorative Ambient Lighting Anchor */}
      <div className="glow-flare absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-purple-500" />
    </main>
  );
}