import Hero from '../components/Hero'; // Fixed path to step out of the app folder

export default function Home() {
  const strategicPillars = [
    {
      label: "Platform",
      title: "Migration & UI/UX Strategy",
      description: "Leading seamless platform shifts with a razor-sharp focus on user-centric flow and interactive digital banking design."
    },
    {
      label: "FinTech",
      title: "Product Development",
      description: "Managing full lifecycle deployment of digital financial ecosystems, driving deep customer engagement and channel expansion."
    },
    {
      label: "Process",
      title: "Automation & Optimization",
      description: "Streamlining complex banking back-office workflows, minimizing execution latency, and orchestrating agile system metrics."
    }
  ];

  return (
    <main className="min-h-screen bg-zinc-950">
      {/* Premium Dynamic Hero Section */}
      <Hero />

      {/* Clean Grid Architecture Section */}
      <section className="mx-auto max-w-7xl px-6 pb-32 pt-4">
        <div className="mb-12 border-t border-zinc-900 pt-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-blue-500">
            Core Competencies
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Strategic Value & Execution
          </p>
        </div>

        {/* Minimalist Tech Portfolio Grid */}
        <div className="grid gap-6 sm:grid-cols-3">
          {strategicPillars.map((pillar, index) => (
            <div 
              key={index} 
              className="group relative rounded-2xl border border-zinc-900 bg-zinc-900/20 p-8 backdrop-blur-md transition-all duration-300 hover:border-zinc-800 hover:bg-zinc-900/50"
            >
              {/* Left Subtle Glow Border Accent on Hover */}
              <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-blue-500 to-indigo-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <span className="mb-4 block font-mono text-xs font-medium uppercase tracking-wider text-zinc-500">
                {pillar.label}
              </span>
              <h3 className="text-lg font-bold tracking-tight text-white transition-colors duration-200 group-hover:text-blue-400">
                {pillar.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}