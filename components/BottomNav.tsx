'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, LayoutGrid, FileText, Gamepad2 } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const [currentHash, setCurrentHash] = useState('');
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    setCurrentHash(window.location.hash);
    const handleHashChange = () => setCurrentHash(window.location.hash);
    window.addEventListener('hashchange', handleHashChange);

    // Hide if inside the Native App (The Native App has its own floating dock in page.tsx)
    const isCapacitor = (window as any).Capacitor?.isNativePlatform?.();
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const ua = window.navigator.userAgent.toLowerCase();
    if (isCapacitor || isStandalone || /(iphone|ipod|ipad).*applewebkit(?!.*safari)/.test(ua) || /android.*wv/.test(ua)) {
      setIsApp(true);
    }
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (isApp || pathname?.startsWith('/studio') || pathname?.startsWith('/admin')) return null;

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/' && currentHash !== '#expertise';
    if (path === '/#expertise') return pathname === '/' && currentHash === '#expertise';
    return pathname?.startsWith(path);
  };

  return (
    <>
      <div className="h-28 md:hidden w-full" />
      {/* Floating Glass Navigation Dock */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-50 pointer-events-none no-select">
        <nav className="pointer-events-auto flex justify-around items-center w-full max-w-sm mx-auto h-[4.5rem] px-2 bg-white/70 dark:bg-[#131315]/80 backdrop-blur-2xl border border-zinc-200/50 dark:border-white/10 rounded-3xl shadow-2xl dark:shadow-[0_8px_30px_rgba(0,0,0,0.8)]">
          
          <Link href="/" onClick={() => setCurrentHash('')} className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group">
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
              <Home className={`w-5 h-5 mb-1 transition-all duration-300 ${isActive('/') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[9px] font-bold tracking-wider uppercase">Home</span>
            </div>
          </Link>
          
          <Link href="/#expertise" onClick={() => setCurrentHash('#expertise')} className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group">
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/#expertise') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
              <LayoutGrid className={`w-5 h-5 mb-1 transition-all duration-300 ${isActive('/#expertise') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[9px] font-bold tracking-wider uppercase">Matrix</span>
            </div>
          </Link>

          <Link href="/blog" onClick={() => setCurrentHash('')} className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group">
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/blog') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
              <FileText className={`w-5 h-5 mb-1 transition-all duration-300 ${isActive('/blog') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[9px] font-bold tracking-wider uppercase">Blog</span>
            </div>
          </Link>

          <Link href="/games" onClick={() => setCurrentHash('')} className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group">
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/games') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
              <Gamepad2 className={`w-5 h-5 mb-1 transition-all duration-300 ${isActive('/games') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[9px] font-bold tracking-wider uppercase">Games</span>
            </div>
          </Link>

        </nav>
      </div>
    </>
  );
}