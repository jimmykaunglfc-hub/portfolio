import Link from 'next/link';

export default function GamesArcade() {
  return (
    <main className="pt-32 pb-24 min-h-screen px-6 md:px-12 max-w-7xl mx-auto relative z-10">
      
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white mb-4">
          Digital <span className="text-[#4d8eff] dark:text-[#adc6ff]">Playground</span>
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl">
          A collection of free-to-play browser games and interactive experiments built for fun.
        </p>
      </div>

      {/* Grid Layout for Games */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Placeholder Game Card 1 */}
        <div className="group bg-white/50 dark:bg-white/5 border border-zinc-200 dark:border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-[#4d8eff]/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          <div className="aspect-video w-full bg-zinc-200 dark:bg-zinc-800 rounded-lg mb-6 flex items-center justify-center">
             <span className="material-symbols-outlined text-4xl text-zinc-400">stadia_controller</span>
          </div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
            Retro Snake
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6">
            The classic arcade game rebuilt with modern web technologies. Try to beat the high score.
          </p>
          <button className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2.5 rounded-xl font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-sm">play_arrow</span> Play Now
          </button>
        </div>

      </div>
    </main>
  );
}