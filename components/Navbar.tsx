'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Background Lighting Anchor Assets */}
      <div className="glow-flare w-[600px] h-[600px] bg-[#adc6ff] top-[-200px] left-[-100px]" />
      <div className="glow-flare flare-3 w-[400px] h-[400px] bg-[#3131c0] top-[40%] right-[10%]" />

      <nav className="fixed top-0 w-full z-50 bg-zinc-950/40 backdrop-blur-2xl border-b border-b-white/5 h-20 transition-all duration-300">
        <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-full w-full">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-white pointer-events-auto">
            KHNCO<span className="text-[#adc6ff]">.</span>
          </Link>
          
          {/* PC Desktop Version Navigation Links */}
          <div className="hidden md:flex items-center gap-8 pointer-events-auto">
            <a className="text-slate-400 font-medium text-sm hover:text-white transition-colors duration-300" href="/#expertise">
              Capabilities
            </a>
            <a className="text-slate-400 font-medium text-sm hover:text-white transition-colors duration-300" href="/#experience">
              Trajectory
            </a>
            <a className="text-slate-400 font-medium text-sm hover:text-white transition-colors duration-300" href="/#contact">
              Contact
            </a>
            <a href="mailto:jimmykg.spacex@gmail.com" className="ml-4 bg-[#adc6ff] text-[#002e6a] px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(173,198,255,0.4)] active:scale-95">
              Get in Touch
            </a>
          </div>

          {/* MOBILE VIEW ONLY: Isolated container ensures absolute removal on PC layouts */}
          <div className="block md:hidden pointer-events-auto">
            <button onClick={() => setIsMenuOpen(true)} className="text-white material-symbols-outlined text-2xl p-2 cursor-pointer block">
              menu
            </button>
          </div>
        </div>
      </nav>

      {/* Screen-Filling Responsive Mobile Slide-Over */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#131315]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 transition-all duration-300">
          <a onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-white" href="/#expertise">Capabilities</a>
          <a onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-white" href="/#experience">Trajectory</a>
          <a onClick={() => setIsMenuOpen(false)} className="text-3xl font-semibold text-white" href="/#contact">Contact</a>
          <button onClick={() => setIsMenuOpen(false)} className="bg-[#adc6ff] text-[#002e6a] px-8 py-4 rounded-full font-bold text-sm w-64 mt-6 tracking-wide uppercase shadow-lg cursor-pointer">
            Close Menu
          </button>
        </div>
      )}
    </>
  );
}