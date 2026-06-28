'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
// UPGRADED: Using Lucide-React for premium, consistent native-feeling icons
import { Home, LayoutGrid, FileText, Gamepad2 } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');

  // Track the URL hash to differentiate between Home (/) and Matrix (/#expertise)
  useEffect(() => {
    setCurrentHash(window.location.hash);
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (pathname?.startsWith('/studio')) return null;

  // Exact path matching logic including hash support
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' && currentHash !== '#expertise';
    if (path === '/#expertise') return pathname === '/' && currentHash === '#expertise';
    return pathname?.startsWith(path);
  };

  return (
    <div 
      className="md:hidden fixed left-0 right-0 z-50 px-5 pointer-events-none no-select"
      style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
    >
      {/* UPGRADED GLASSMORPHISM: 
        - bg-white/50 & dark:bg-[#09090b]/60 (More transparent)
        - backdrop-blur-xl & backdrop-saturate-150 (Apple's native glass formula)
        - Inner white borders for 3D bevel reflection
      */}
      <nav className="pointer-events-auto flex justify-around items-center w-full max-w-sm mx-auto h-[4.5rem] px-2 bg-white/50 dark:bg-black/50 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]">
        
        <Link 
          href="/" 
          onClick={() => setCurrentHash('')}
          className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group"
        >
          <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10 shadow-inner' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
            <Home className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive('/') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] font-bold tracking-wider uppercase">Home</span>
          </div>
        </Link>
        
        <Link 
          href="/#expertise" 
          onClick={() => setCurrentHash('#expertise')}
          className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group"
        >
          <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/#expertise') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10 shadow-inner' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
            <LayoutGrid className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive('/#expertise') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] font-bold tracking-wider uppercase">Matrix</span>
          </div>
        </Link>

        <Link 
          href="/blog" 
          onClick={() => setCurrentHash('')}
          className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group"
        >
          <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/blog') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10 shadow-inner' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
            <FileText className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive('/blog') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] font-bold tracking-wider uppercase">Blog</span>
          </div>
        </Link>

        <Link 
          href="/games" 
          onClick={() => setCurrentHash('')}
          className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group"
        >
          <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/games') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10 shadow-inner' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
            <Gamepad2 className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive('/games') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
            <span className="text-[10px] font-bold tracking-wider uppercase">Games</span>
          </div>
        </Link>

      </nav>
    </div>
  );
}