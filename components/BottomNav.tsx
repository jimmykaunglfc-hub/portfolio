'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Home, LayoutGrid, FileText, Gamepad2 } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();
  const [isApp, setIsApp] = useState(false);

  useEffect(() => {
    // NATIVE APP DETECTION ENGINE
    const isCapacitor = (window as any).Capacitor?.isNativePlatform?.();
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
    const ua = window.navigator.userAgent.toLowerCase();
    const isIosWebview = /(iphone|ipod|ipad).*applewebkit(?!.*safari)/.test(ua);
    const isAndroidWebview = /android.*wv/.test(ua);

    if (isCapacitor || isStandalone || isIosWebview || isAndroidWebview) {
      setIsApp(true);
    }
  }, []);

  // Hides the bottom dock on standard web browsers OR inside your admin/studio portals
  if (!isApp || pathname?.startsWith('/studio') || pathname?.startsWith('/admin')) return null;

  // Exact path matching logic (No more complex hash tracking needed!)
  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname?.startsWith(path);
  };

  return (
    <>
      {/* Invisible spacer to push web content up so it doesn't hide behind the dock */}
      <div className="h-28 md:hidden w-full" />
      
      <div 
        className="md:hidden fixed left-0 right-0 z-50 px-5 pointer-events-none no-select"
        style={{ bottom: 'max(1.25rem, env(safe-area-inset-bottom))' }}
      >
        <nav className="pointer-events-auto flex justify-around items-center w-full max-w-sm mx-auto h-[4.5rem] px-2 bg-white/50 dark:bg-black/50 backdrop-blur-xl backdrop-saturate-150 border border-white/60 dark:border-white/10 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.12),inset_0_1px_1px_rgba(255,255,255,0.5)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)]">
          
          <Link href="/" className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group">
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10 shadow-inner' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
              <Home className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive('/') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold tracking-wider uppercase">Home</span>
            </div>
          </Link>
          
          {/* UPDATED: Now points directly to the /matrix page route! */}
          <Link href="/matrix" className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group">
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/matrix') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10 shadow-inner' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
              <LayoutGrid className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive('/matrix') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold tracking-wider uppercase">Matrix</span>
            </div>
          </Link>

          <Link href="/blog" className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group">
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/blog') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10 shadow-inner' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
              <FileText className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive('/blog') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold tracking-wider uppercase">Blog</span>
            </div>
          </Link>

          <Link href="/games" className="relative flex flex-col items-center justify-center w-[22%] h-[3.5rem] rounded-2xl transition-all duration-300 group">
            <div className={`flex flex-col items-center justify-center w-full h-full rounded-2xl transition-all duration-300 ${isActive('/games') ? 'text-[#002e6a] dark:text-[#adc6ff] bg-black/5 dark:bg-white/10 shadow-inner' : 'text-zinc-500 dark:text-zinc-400 active:scale-90'}`}>
              <Gamepad2 className={`w-6 h-6 mb-1 transition-all duration-300 ${isActive('/games') ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] font-bold tracking-wider uppercase">Games</span>
            </div>
          </Link>

        </nav>
      </div>
    </>
  );
}