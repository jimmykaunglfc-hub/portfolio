'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // Controls mobile dropdown
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

  if (pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <>
      <div className="glow-flare w-[500px] h-[500px] bg-[#adc6ff] top-[-200px] left-[-100px]" />
      <div className="glow-flare w-[400px] h-[400px] bg-[#3131c0] top-[30%] right-[5%]" />

      <nav className="fixed top-0 w-full z-50 h-20 transition-all duration-300 bg-white/70 dark:bg-zinc-950/50 backdrop-blur-xl border-b border-zinc-200/50 dark:border-white/5">
        <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-full w-full">
          
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
          
          <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            
            {/* 1. PROFILE DROPDOWN (Hover) */}
            <div className="relative group py-6">
              <button className="flex items-center gap-1 text-zinc-900 dark:text-white font-semibold text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors duration-200">
                <span className="material-symbols-outlined text-base">account_circle</span>
                Profile
                <span className="material-symbols-outlined text-base transition-transform group-hover:rotate-180">expand_more</span>
              </button>
              
              {/* Dropdown Menu Box */}
              <div className="absolute top-[85%] left-[-10px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 flex flex-col bg-white dark:bg-[#131315] border border-zinc-200 dark:border-white/10 rounded-xl shadow-xl min-w-[200px] overflow-hidden py-2">
                <Link className="flex items-center gap-3 px-4 py-3 text-zinc-900 dark:text-white font-medium text-sm hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors" href="/#expertise">
                  <span className="material-symbols-outlined text-lg">layers</span> Capabilities
                </Link>
                <Link className="flex items-center gap-3 px-4 py-3 text-zinc-900 dark:text-white font-medium text-sm hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors" href="/#experience">
                  <span className="material-symbols-outlined text-lg">timeline</span> Trajectory
                </Link>
                <Link className="flex items-center gap-3 px-4 py-3 text-zinc-900 dark:text-white font-medium text-sm hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors" href="/#contact">
                  <span className="material-symbols-outlined text-lg">alternate_email</span> Contact
                </Link>
              </div>
            </div>

            {/* 2. BLOG PAGE */}
            <Link href="/blog" className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors duration-200">
              <span className="material-symbols-outlined text-base text-inherit">article</span> 
              Blog Post
            </Link>

            {/* 3. GAMES PAGE */}
            <Link href="/games" className="flex items-center gap-2 text-zinc-900 dark:text-white font-semibold text-sm hover:text-[#4d8eff] dark:hover:text-[#adc6ff] transition-colors duration-200">
              <span className="material-symbols-outlined text-base text-inherit">sports_esports</span> 
              Games
            </Link>

            <button 
              onClick={toggleTheme} 
              className="flex items-center justify-center p-2.5 rounded-xl bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-white/10 transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <span className="material-symbols-outlined text-lg block text-inherit">
                {isDark ? 'light_mode' : 'dark_mode'}
              </span>
            </button>

            {/* GET IN TOUCH FIX: Now points cleanly to the #contact section */}
            <Link href="/#contact" className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] px-5 py-2.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all duration-300 hover:scale-105 shadow-sm flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm font-bold text-white dark:text-[#002e6a]">mail</span> 
              Get in Touch
            </Link>
          </div>

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

      {/* MOBILE FULLSCREEN MENU */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-white/95 dark:bg-[#131315]/95 backdrop-blur-2xl flex flex-col pt-24 px-8 overflow-y-auto transition-all duration-300">
          <div className="flex flex-col gap-4 w-full max-w-sm mx-auto">
            
            {/* Mobile Profile Accordion */}
            <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2 mb-2">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)} 
                className="flex justify-between items-center w-full text-2xl font-medium text-zinc-900 dark:text-white py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined">account_circle</span>
                  Profile
                </div>
                <span className={`material-symbols-outlined transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}>expand_more</span>
              </button>
              
              {/* Expandable Mobile Links */}
              {isProfileOpen && (
                <div className="flex flex-col gap-5 mt-4 ml-8 border-l-2 border-zinc-200 dark:border-zinc-800 pl-4 mb-4">
                  <Link onClick={() => setIsMenuOpen(false)} className="text-lg text-zinc-600 dark:text-zinc-400 flex items-center gap-3" href="/#expertise"><span className="material-symbols-outlined text-base">layers</span> Capabilities</Link>
                  <Link onClick={() => setIsMenuOpen(false)} className="text-lg text-zinc-600 dark:text-zinc-400 flex items-center gap-3" href="/#experience"><span className="material-symbols-outlined text-base">timeline</span> Trajectory</Link>
                  <Link onClick={() => setIsMenuOpen(false)} className="text-lg text-zinc-600 dark:text-zinc-400 flex items-center gap-3" href="/#contact"><span className="material-symbols-outlined text-base">alternate_email</span> Contact</Link>
                </div>
              )}
            </div>

            <Link onClick={() => setIsMenuOpen(false)} href="/blog" className="text-2xl font-medium text-zinc-900 dark:text-white flex items-center gap-3 py-2 border-b border-zinc-200 dark:border-zinc-800">
              <span className="material-symbols-outlined">article</span> Blog Post
            </Link>

            <Link onClick={() => setIsMenuOpen(false)} href="/games" className="text-2xl font-medium text-zinc-900 dark:text-white flex items-center gap-3 py-2 border-b border-zinc-200 dark:border-zinc-800">
              <span className="material-symbols-outlined">sports_esports</span> Games
            </Link>

            <button onClick={() => setIsMenuOpen(false)} className="bg-[#002e6a] dark:bg-[#adc6ff] text-white dark:text-[#002e6a] px-8 py-4 rounded-full font-bold text-sm w-full mt-10 tracking-wide uppercase shadow-lg cursor-pointer">
              Close Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
}