'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Dynamic Physics Ambient Back-Lighting Flares */}
      <div className="glow-flare w-[600px] h-[600px] bg-[#adc6ff] top-[-200px] left-[-100px]" />
      <div className="glow-flare flare-3 w-[400px] h-[400px] bg-[#3131c0] top-[40%] right-[10%]" />

      <nav className="fixed top-0 w-full z-50 bg-white/[0.03] backdrop-blur-2xl border-b border-white/10 h-20 transition-all duration-300" id="navbar">
        <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-full">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
            KHNCO<span className="text-[#adc6ff]">.</span>
          </Link>
          
          {/* Desktop Control Actions */}
          <div className="hidden md:flex items-center gap-8">
            <Link className="text-white font-bold border-b-2 border-[#adc6ff] pb-1 text-sm transition-colors duration-300" href="#work">Work</Link>
            <Link className="text-slate-400 font-medium text-sm hover:text-white transition-colors duration-300" href="#expertise">Expertise</Link>
            <Link className="text-slate-400 font-medium text-sm hover:text-white transition-colors duration-300" href="#about">About</Link>
            <Link className="text-slate-400 font-medium text-sm hover:text-white transition-colors duration-300" href="#contact">Contact</Link>
            <Link href="#contact" className="ml-4 bg-[#adc6ff] text-[#002e6a] px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] active:scale-95">
              Get in Touch
            </Link>
          </div>

          {/* Interactive Mobile Target Switch */}
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden text-white material-symbols-outlined text-2xl p-2">
            menu
          </button>
        </div>
      </nav>

      {/* Screen-Filling Responsive Slide-Over Menu Container */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#131315]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-300">
          <Link onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-[#adc6ff]" href="#work">Work</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-white" href="#expertise">Expertise</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-white" href="#about">About</Link>
          <Link onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-white" href="#contact">Contact</Link>
          <button onClick={() => setIsMenuOpen(false)} className="bg-[#adc6ff] text-[#002e6a] px-8 py-4 rounded-full font-bold text-sm w-64 mt-6 tracking-wide uppercase shadow-lg">
            Close Menu
          </button>
        </div>
      )}
    </>
  );
}