'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  // THE INVISIBILITY CLOAK: If the URL contains /studio, hide the Navbar completely
  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <>
      <div className="glow-flare w-[500px] h-[500px] bg-[#adc6ff] top-[-200px] left-[-100px]" />
      <div className="glow-flare w-[400px] h-[400px] bg-[#3131c0] top-[30%] right-[5%]" />

      <nav className="fixed top-0 w-full z-50 h-20 transition-all duration-300 bg-white/70 dark:bg-zinc-950/50 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-full w-full">
          
          {/* EMBEDDED FAVICON VECTOR LOGO MARK */}
          <Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-tighter text-zinc-900 dark:text-white pointer-events-auto group">
            <svg className="w-7 h-7 flex-shrink-0 transition-transform group-hover:scale-105" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
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
            <span className="font-sans font-extrabold tracking-tight">KHNCO<span className="text-[#4d8eff] dark:text-[#adc6ff]">.</span></span>
          </Link>
          
          {/* FIXED: Icons now dynamically invert to crisp black on light mode / white on dark mode */}
          <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            <a className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors duration-200" href="/#expertise">
              <span className="material-symbols-outlined text-base text-inherit">layers</span> 
              Capabilities
            </a>
            <a className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors duration-200" href="/#experience">
              <span className="material-symbols-outlined text-base text-inherit">timeline</span> 
              Trajectory
            </a>
            <a className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors duration-200" href="/#contact">
              <span className="material-symbols-outlined text-base text-inherit">alternate_email</span> 
              Contact
            </a>

            <button 
              onClick={toggleTheme} 
              className="flex items-center justify-center p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Change Theme Mode"
            >
              <span className="material-symbols-outlined text-lg block text-inherit">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <a href="mailto:jimmykg.spacex@gmail.com" className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm font-bold text-white dark:text-[#002e6a]">mail</span> 
              Get in Touch
            </a>
          </div>

          {/* Mobile Navigation controls */}
          <div className="flex items-center gap-4 md:hidden pointer-events-auto">
            <button onClick={toggleTheme} className="p-2 text-zinc-900 dark:text-white material-symbols-outlined text-xl cursor-pointer">
              {isDark ? 'light_mode' : 'dark_mode'}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="text-zinc-900 dark:text-white material-symbols-outlined text-2xl p-2 cursor-pointer">
              menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Over Screen Panel */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 dark:bg-[#131315]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-300">
          <a onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-zinc-900 dark:text-white flex items-center gap-2" href="/#expertise"><span className="material-symbols-outlined">layers</span> Capabilities</a>
          <a onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-zinc-900 dark:text-white flex items-center gap-2" href="/#experience"><span className="material-symbols-outlined">timeline</span> Trajectory</a>
          <a onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-zinc-900 dark:text-white flex items-center gap-2" href="/#contact"><span className="material-symbols-outlined">alternate_email</span> Contact</a>
          <button onClick={() => setIsMenuOpen(false)} className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] px-8 py-3 rounded-full font-bold text-sm w-64 mt-6 tracking-wide uppercase shadow-lg cursor-pointer">
            Close Menu
          </button>
        </div>
      )}
    </>
  );
}