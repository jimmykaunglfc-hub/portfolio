import Link from 'next/link';

export default function BlogGlossary() {
  return (
    <main className="pt-32 pb-24 min-h-screen px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          Insights & <span className="text-[#4d8eff] dark:text-[#adc6ff]">Perspectives</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          A glossary of thoughts on digital operations, product management, and the future of FinTech.
        </p>
      </div>

      {/* Grid Layout for Glossaries */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Placeholder Article Card 1 */}
        <article className="group bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-[#4d8eff]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="text-sm font-medium text-[#4d8eff] dark:text-[#adc6ff] mb-3">Product Strategy</div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-[#4d8eff] dark:group-hover:text-[#adc6ff] transition-colors">
            Orchestrating High-Impact Platforms
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 line-clamp-3">
            An exploration into scaling operational infrastructure and leading cross-functional teams to deliver secure enterprise systems.
          </p>
          <Link href="#" className="inline-flex items-center gap-2 text-sm font-bold text-zinc-900 dark:text-white group-hover:text-[#4d8eff] dark:group-hover:text-[#adc6ff] transition-colors">
            Read Article <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </article>

      </div>
    </main>
  );
}