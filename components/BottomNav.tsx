'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  // Hide the navigation if we are inside the Sanity Admin Studio
  if (pathname?.startsWith('/studio')) return null;

  // Exact path matching for active states
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    if (path.startsWith('/#')) return false; // Prevents anchor links from staying highlighted
    return pathname?.startsWith(path);
  };

  return (
    <div className="md:hidden fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] left-0 right-0 z-50 px-5 pointer-events-none no-select">
      <nav className="pointer-events-auto flex justify-around items-center w-full max-w-sm mx-auto h-[4.25rem] px-2 bg-white/75 dark:bg-[#131315]/80 backdrop-blur-3xl border border-zinc-200/80 dark:border-white/10 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        
        <Link href="/" className="relative flex flex-col items-center justify-center w-[22%] h-[3.25rem] rounded-2xl transition-all duration-300 group">
          <div className={`flex flex-col items-center justify-center w-full h-full rounded-xl transition-all duration-300 ${isActive('/') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 active:scale-95'}`}>
            <span className="material-symbols-outlined text-[24px] mb-0.5">home</span>
            <span className="text-[9px] font-bold tracking-wider uppercase">Home</span>
          </div>
        </Link>
        
        <Link href="/#expertise" className="relative flex flex-col items-center justify-center w-[22%] h-[3.25rem] rounded-2xl transition-all duration-300 group">
          <div className="flex flex-col items-center justify-center w-full h-full rounded-xl transition-all duration-300 text-zinc-500 dark:text-zinc-400 active:scale-95">
            <span className="material-symbols-outlined text-[24px] mb-0.5">grid_view</span>
            <span className="text-[9px] font-bold tracking-wider uppercase">Matrix</span>
          </div>
        </Link>

        <Link href="/blog" className="relative flex flex-col items-center justify-center w-[22%] h-[3.25rem] rounded-2xl transition-all duration-300 group">
          <div className={`flex flex-col items-center justify-center w-full h-full rounded-xl transition-all duration-300 ${isActive('/blog') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 active:scale-95'}`}>
            <span className="material-symbols-outlined text-[24px] mb-0.5">article</span>
            <span className="text-[9px] font-bold tracking-wider uppercase">Blog</span>
          </div>
        </Link>

        <Link href="/games" className="relative flex flex-col items-center justify-center w-[22%] h-[3.25rem] rounded-2xl transition-all duration-300 group">
          <div className={`flex flex-col items-center justify-center w-full h-full rounded-xl transition-all duration-300 ${isActive('/games') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 active:scale-95'}`}>
            <span className="material-symbols-outlined text-[24px] mb-0.5">sports_esports</span>
            <span className="text-[9px] font-bold tracking-wider uppercase">Games</span>
          </div>
        </Link>

      </nav>
    </div>
  );
}