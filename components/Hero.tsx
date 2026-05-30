import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden bg-zinc-950 px-6 py-12 text-center">
      
      {/* Background Decorative Gradient Flares */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px] sm:h-[400px] sm:w-[400px]" />
      <div className="absolute bottom-1/4 left-1/3 -z-10 h-[250px] w-[250px] rounded-full bg-purple-600/10 blur-[100px]" />

      <div className="max-w-3xl space-y-6">
        {/* Subtle Greeting Badge */}
        <span className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium tracking-wide text-blue-400 backdrop-blur-md">
          Hello, I'm
        </span>

        {/* Premium Metallic Gradient Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-200 to-zinc-500 sm:text-6xl sm:leading-none">
          Kaung Htet <br className="sm:hidden" /> Nyein Chan Oo
        </h1>

        {/* Subheading Badge/Text */}
        <h2 className="mx-auto max-w-lg text-lg font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 sm:text-2xl">
          Project & Channel Management Leader
        </h2>

        {/* Description Text */}
        <p className="mx-auto max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
          Leading high-impact initiatives to optimize financial operations, drive customer engagement, and streamline banking processes in digital financial services.
        </p>

        {/* Interactive Premium Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
          {/* Glowing Primary Action Button */}
          <Link 
            href="/projects" 
            className="group relative w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] sm:w-auto"
          >
            View My Projects
          </Link>

          {/* Clean Glassmorphic Secondary Button */}
          <Link 
            href="/contact" 
            className="w-full rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20 sm:w-auto"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}