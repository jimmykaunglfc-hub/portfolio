'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 h-20 transition-all duration-300 bg-white/70 dark:bg-zinc-950/50 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-full w-full">
          
          {/* FIXED LOGO MARK: Clean customized abstract token signature */}
          <Link href="/" className="flex items-center gap-3 text-xl font-bold tracking-tighter text-zinc-900 dark:text-white pointer-events-auto group">
            <div className="w-8 h-8 rounded-lg bg-[#002e6a] dark:bg-[#adc6ff] flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="material-symbols-outlined text-sm font-bold text-white dark:text-[#002e6a]">
                token
              </span>
            </div>
            <span className="font-sans font-extrabold tracking-tight">KHNCO<span className="text-[#4d8eff] dark:text-[#adc6ff]">.</span></span>
          </Link>
          
          {/* PC Desktop Layout with integrated adaptive iconography */}
          <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            <a className="flex items-center gap-1.5 text-zinc-500 dark:text-slate-400 font-medium text-sm hover:text-zinc-950 dark:hover:text-white transition-colors duration-200" href="/#expertise">
              <span className="material-symbols-outlined text-base text-zinc-400 dark:text-slate-500">layers</span> Capabilities
            </a>
            <a className="flex items-center gap-1.5 text-zinc-500 dark:text-slate-400 font-medium text-sm hover:text-zinc-950 dark:hover:text-white transition-colors duration-200" href="/#experience">
              <span className="material-symbols-outlined text-base text-zinc-400 dark:text-slate-500">timeline</span> Trajectory
            </a>
            <a className="flex items-center gap-1.5 text-zinc-500 dark:text-slate-400 font-medium text-sm hover:text-zinc-950 dark:hover:text-white transition-colors duration-200" href="/#contact">
              <span className="material-symbols-outlined text-base text-zinc-400 dark:text-slate-500">alternate_email</span> Contact
            </a>

            {/* FIXED PREMIUM THEME SWITCHER: High-end luxury toggle capsule */}
            <button 
              onClick={toggleTheme} 
              className="flex items-center justify-center p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-800 dark:text-slate-300 hover:bg-zinc-200 dark:hover:bg-white/10 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Change Theme Blueprint Mode"
            >
              <span className="material-symbols-outlined text-lg block">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* High Contrast Adaptive Core Action Button */}
            <a href="mailto:jimmykg.spacex@gmail.com" className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm font-bold text-white dark:text-[#002e6a]">mail</span> 
              Get in Touch
            </a>
          </div>

          {/* Mobile UI Controls */}
          <div className="flex items-center gap-4 md:hidden pointer-events-auto">
            <button onClick={toggleTheme} className="p-2 text-zinc-700 dark:text-slate-300 material-symbols-outlined text-xl cursor-pointer">
              {isDark ? 'light_mode' : 'dark_mode'}
            </button>
            <button onClick={() => setIsMenuOpen(true)} className="text-zinc-900 dark:text-white material-symbols-outlined text-2xl p-2 cursor-pointer">
              menu
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Slide-Over Container */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 dark:bg-[#131315]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-300">
          <a onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-zinc-800 dark:text-white flex items-center gap-2" href="/#expertise"><span className="material-symbols-outlined">layers</span> Capabilities</a>
          <a onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-zinc-800 dark:text-white flex items-center gap-2" href="/#experience"><span className="material-symbols-outlined">timeline</span> Trajectory</a>
          <a onClick={() => setIsMenuOpen(false)} className="text-2xl font-medium text-zinc-800 dark:text-white flex items-center gap-2" href="/#contact"><span className="material-symbols-outlined">alternate_email</span> Contact</a>
          <button onClick={() => setIsMenuOpen(false)} className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] px-8 py-3 rounded-full font-bold text-sm w-64 mt-6 tracking-wide uppercase shadow-lg cursor-pointer">
            Close Menu
          </button>
        </div>
      )}
    </>
  );
}