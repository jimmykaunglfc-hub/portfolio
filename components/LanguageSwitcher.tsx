'use client';

import { useState, useRef, useEffect } from 'react';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState('en');
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Read the active language from Google's cookie on page load
  useEffect(() => {
    const cookies = document.cookie.split(';');
    const googtransCookie = cookies.find(c => c.trim().startsWith('googtrans='));
    
    if (googtransCookie) {
      if (googtransCookie.includes('/en/my')) {
        setLang('my');
      } else {
        setLang('en');
      }
    }
  }, []);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // The Magic Auto-Translate Function
  const handleTranslate = (targetLang: string) => {
    setLang(targetLang);
    setIsOpen(false);
    
    // Set the cookie for both the root domain and the current path
    document.cookie = `googtrans=/en/${targetLang}; path=/;`;
    document.cookie = `googtrans=/en/${targetLang}; domain=.${window.location.hostname}; path=/;`;
    
    // Reload the page to trigger Google's auto-translation script
    window.location.reload();
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Main NavBar Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-zinc-200/50 dark:bg-white/5 border border-zinc-300/50 dark:border-white/10 hover:bg-zinc-300/80 dark:hover:bg-white/10 px-3 py-1.5 rounded-full transition-all duration-300 cursor-pointer text-sm font-medium shadow-sm"
      >
        <span className="text-base">{lang === 'en' ? '🇬🇧' : '🇲🇲'}</span>
        <span className="uppercase text-zinc-700 dark:text-zinc-300 font-mono tracking-wider">
          {lang === 'en' ? 'EN' : 'MY'}
        </span>
        <span className="material-symbols-outlined text-sm text-zinc-500">expand_more</span>
      </button>

      {/* Glassmorphism Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-xl bg-white/90 dark:bg-[#131315]/90 backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-2xl z-50 overflow-hidden transform origin-top-right transition-all">
          <div className="py-1">
            <button
              onClick={() => handleTranslate('en')}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer ${lang === 'en' ? 'bg-zinc-100/50 dark:bg-white/5 font-semibold text-[#002e6a] dark:text-[#adc6ff]' : 'text-zinc-700 dark:text-zinc-300'}`}
            >
              <span className="text-lg">🇬🇧</span> English
            </button>
            <button
              onClick={() => handleTranslate('my')}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-3 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors cursor-pointer ${lang === 'my' ? 'bg-zinc-100/50 dark:bg-white/5 font-semibold text-[#002e6a] dark:text-[#adc6ff]' : 'text-zinc-700 dark:text-zinc-300'}`}
            >
              <span className="text-lg">🇲🇲</span> မြန်မာ
            </button>
          </div>
        </div>
      )}
    </div>
  );
}