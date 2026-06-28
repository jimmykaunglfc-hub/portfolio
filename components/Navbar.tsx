'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  if (pathname?.startsWith('/studio')) return null;

  return (
    <>
      <div className="glow-flare w-[500px] h-[500px] bg-[#adc6ff] top-[-200px] left-[-100px]" />
      <div className="glow-flare w-[400px] h-[400px] bg-[#3131c0] top-[30%] right-[5%]" />

      <nav className="font-sans fixed top-0 w-full z-50 transition-all duration-300 bg-white/70 dark:bg-zinc-950/50 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/5 h-[calc(4.5rem+env(safe-area-inset-top))] pt-[env(safe-area-inset-top)] no-select">
        <div className="flex justify-between items-center px-4 md:px-12 max-w-7xl mx-auto h-full w-full">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 text-xl font-bold tracking-tighter text-zinc-900 dark:text-white pointer-events-auto group">
            <svg className="w-6 h-6 md:w-7 md:h-7 flex-shrink-0 transition-transform group-hover:scale-105" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
              <defs>
                <linearGradient id="pillarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={isDark ? "#FFFFFF" : "#0f172a"} />
                  <stop offset="100%" stopColor={isDark ? "#94A3B8" : "#64748b"} />
                </linearGradient>
                <linearGradient id="vectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#adc6ff" />
                  <stop offset="100%" stopColor="#4d8eff" />
                </linearGradient>
              </defs>
              <path d="M9 5v22" stroke="url(#pillarGrad)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M24 5L14 15" stroke="url(#pillarGrad)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M15 15l10 12" stroke="url(#vectorGrad)" strokeWidth="3.5" strokeLinecap="round" />
            </svg>
            <span className="font-extrabold tracking-tight text-lg md:text-xl">KHNCO<span className="text-[#4d8eff] dark:text-[#adc6ff]">.</span></span>
          </Link>
          
          {/* Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            <div className="relative group py-6">
              <button className="flex items-center gap-1 text-zinc-900 dark:text-white font-semibold text-sm group-hover:text-[#4d8eff] dark:group-hover:text-[#adc6ff] transition-colors duration-300">
                <span className="material-symbols-outlined text-base">account_circle</span>
                Profile
                <span className="material-symbols-outlined text-base transition-transform duration-300 group-hover:rotate-180">expand_more</span>
              </button>
              <div className="absolute top-[85%] left-[-10px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex flex-col bg-white dark:bg-[#131315] border border-zinc-200 dark:border-white/10 rounded-xl shadow-xl min-w-[200px] overflow-hidden py-2">
                <Link className="flex items-center gap-3 px-4 py-3 text-zinc-900 dark:text-white font-medium text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] hover:bg-zinc-50 dark:hover:bg-white/5 transition-all duration-300" href="/#expertise"><span className="material-symbols-outlined text-lg">layers</span> Capabilities</Link>
                <Link className="flex items-center gap-3 px-4 py-3 text-zinc-900 dark:text-white font-medium text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] hover:bg-zinc-50 dark:hover:bg-white/5 transition-all duration-300" href="/#experience"><span className="material-symbols-outlined text-lg">timeline</span> Trajectory</Link>
                <Link className="flex items-center gap-3 px-4 py-3 text-zinc-900 dark:text-white font-medium text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] hover:bg-zinc-50 dark:hover:bg-white/5 transition-all duration-300" href="/#contact"><span className="material-symbols-outlined text-lg">alternate_email</span> Contact</Link>
              </div>
            </div>
            <Link href="/blog" className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors duration-300"><span className="material-symbols-outlined text-base text-inherit">article</span> Blog Post</Link>
            <Link href="/games" className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors duration-300"><span className="material-symbols-outlined text-base text-inherit">sports_esports</span> Games</Link>
            
            <LanguageSwitcher />

            <button onClick={toggleTheme} className="flex items-center justify-center p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95"><span className="material-symbols-outlined text-lg block text-inherit">{isDark ? 'light_mode' : 'dark_mode'}</span></button>

            <Link href="/#contact" className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-sm flex items-center gap-1.5"><span className="material-symbols-outlined text-sm font-bold text-white dark:text-[#002e6a]">mail</span> Get in Touch</Link>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex items-center gap-3 md:hidden pointer-events-auto">
            <LanguageSwitcher />
            <button onClick={toggleTheme} className="p-2 text-zinc-900 dark:text-white material-symbols-outlined text-xl cursor-pointer hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors duration-300">
              {isDark ? 'light_mode' : 'dark_mode'}
            </button>
          </div>

        </div>
      </nav>
    </>
  );
}