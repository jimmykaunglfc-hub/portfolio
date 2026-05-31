'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Synchronize layout theme mechanics with DOM root element
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
      {/* Background Lighting Flares */}
      <div className="glow-flare w-[500px] h-[500px] bg-[#adc6ff] top-[-200px] left-[-100px]" />
      <div className="glow-flare w-[400px] h-[400px] bg-[#3131c0] top-[30%] right-[5%]" />

      {/* ENHANCEMENT #1: Frosted Glassmorphic Navigation Shield */}
      <nav className="fixed top-0 w-full z-50 h-20 transition-all duration-300 bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl border-b border-zinc-200/40 dark:border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-full w-full">
          
          {/* ENHANCEMENT #5: Sleek Embedded Favicon Branding */}
          <Link href="/" className="flex items-center gap-2.5 text-2xl font-bold tracking-tighter text-zinc-900 dark:text-white pointer-events-auto group">
            <span className="material-symbols-outlined text-[#3131c0] dark:text-[#adc6ff] text-2xl animate-spin-slow group-hover:scale-110 transition-transform">
              blur_on
            </span>
            <span>KHNCO<span className="text-[#4d8eff] dark:text-[#adc6ff]">.</span></span>
          </Link>
          
          {/* ENHANCEMENT #4: High-Fidelity Desktop Icons */}
          <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            <a className="flex items-center gap-1.5 text-zinc-500 dark:text-slate-400 font-medium text-sm hover:text-zinc-900 dark:hover:text-white transition-colors duration-200" href="/#expertise">
              <span className="material-symbols-outlined text-base">layers</span> Capabilities
            </a>
            <a className="flex items-center gap-1.5 text-zinc-500 dark:text-slate-400 font-medium text-sm hover:text-zinc-900 dark:hover:text-white transition-colors duration-200" href="/#experience">
              <span className="material-symbols-outlined text-base">timeline</span> Trajectory
            </a>
            <a className="flex items-center gap-1.5 text-zinc-500 dark:text-slate-400 font-medium text-sm hover:text-zinc-900 dark:hover:text-white transition-colors duration-200" href="/#contact">
              <span className="material-symbols-outlined text-base">alternate_email</span> Contact
            </a>

            {/* ENHANCEMENT #2: Dark / Light Mode Interactive Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-slate-300 hover:text-zinc-950 dark:hover:text-white transition-all cursor-pointer hover:scale-105 active:scale-95"
              title="Toggle Layout Theme Color"
            >
              <span className="material-symbols-outlined text-lg block">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            <a href="mailto:jimmykg.spacex@gmail.com" className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] active:scale-95 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm font-bold">mail</span> Get in Touch
            </a>
          </div>

          {/* Mobile Display Control Block */}
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

      {/* Screen-Filling Mobile Slide-Over Container */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 dark:bg-[#131315]/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 transition-all duration-300 animate-fade-in">
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