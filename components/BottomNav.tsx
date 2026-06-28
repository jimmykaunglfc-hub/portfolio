'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const pathname = usePathname();

  // Hide the navigation if we are inside the Sanity Admin Studio
  if (pathname?.startsWith('/studio')) return null;

  // Helper to dynamically color the active tab
  const isActive = (path: string) => pathname === path;

  return (
    <nav className="md:hidden fixed bottom-0 w-full z-50 bg-white/85 dark:bg-[#131315]/85 backdrop-blur-2xl border-t border-zinc-200/80 dark:border-white/10 pb-[env(safe-area-inset-bottom)] no-select">
      <div className="flex justify-between items-center h-[4.5rem] px-6">
        
        <Link href="/" className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive('/') ? 'text-[#4d8eff] dark:text-[#adc6ff]' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
          <span className="material-symbols-outlined text-2xl mb-0.5">home</span>
          <span className="text-[10px] font-semibold tracking-wide">Home</span>
        </Link>
        
        {/* We use an anchor link here to scroll smoothly to the matrix on the home page */}
        <Link href="/#expertise" className="flex flex-col items-center justify-center w-full h-full gap-1 text-zinc-500 dark:text-zinc-400 hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors">
          <span className="material-symbols-outlined text-2xl mb-0.5">layers</span>
          <span className="text-[10px] font-semibold tracking-wide">Matrix</span>
        </Link>

        <Link href="/blog" className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive('/blog') ? 'text-[#4d8eff] dark:text-[#adc6ff]' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
          <span className="material-symbols-outlined text-2xl mb-0.5">article</span>
          <span className="text-[10px] font-semibold tracking-wide">Insights</span>
        </Link>

        <Link href="/games" className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors ${isActive('/games') ? 'text-[#4d8eff] dark:text-[#adc6ff]' : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300'}`}>
          <span className="material-symbols-outlined text-2xl mb-0.5">sports_esports</span>
          <span className="text-[10px] font-semibold tracking-wide">Games</span>
        </Link>

      </div>
    </nav>
  );
}