'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Ambient Top Background Flares embedded globally */}
      <div className="glow-flare absolute top-[-200px] left-[-100px] w-[600px] h-[600px] bg-blue-400" />
      <div className="glow-flare absolute top-[40%] right-[10%] w-[400px] h-[400px] bg-indigo-600" />

      <nav className="fixed top-0 w-full z-50 bg-zinc-950/40 backdrop-blur-2xl border-b border-white/5 h-20 transition-all duration-300">
        <div className="flex justify-between items-center px-6 md:px-12 max-w-7xl mx-auto h-full">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-zinc-100">
            KHNCO<span className="text-blue-400">.</span>
          </Link>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="#work" className="text-blue-300 font-bold border-b-2 border-blue-400 pb-1 text-sm tracking-wide transition-colors">Work</Link>
            <Link href="#expertise" className="text-zinc-400 font-medium text-sm tracking-wide hover:text-blue-300 transition-colors">Expertise</Link>
            <Link href="#about" className="text-zinc-400 font-medium text-sm tracking-wide hover:text-blue-300 transition-colors">About</Link>
            <Link href="#contact" className="text-zinc-400 font-medium text-sm tracking-wide hover:text-blue-300 transition-colors">Contact</Link>
            <Link href="#contact" className="ml-4 bg-blue-400 hover:bg-blue-500 text-zinc-950 font-semibold px-6 py-2.5 rounded-full text-xs tracking-wider uppercase transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
              Get in Touch
            </Link>
          </div>

          {/* Hamburger Mobile Toggle */}
          <button onClick={() => setIsOpen(true)} className="md:hidden text-zinc-100 material-symbols-outlined text-2xl p-2">
            menu
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Slide-Over */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 animate-fade-in">
          <Link onClick={() => setIsOpen(false)} className="text-3xl font-bold text-blue-300" href="#work">Work</Link>
          <Link onClick={() => setIsOpen(false)} className="text-3xl font-bold text-zinc-200" href="#expertise">Expertise</Link>
          <Link onClick={() => setIsOpen(false)} className="text-3xl font-bold text-zinc-200" href="#about">About</Link>
          <Link onClick={() => setIsOpen(false)} className="text-3xl font-bold text-zinc-200" href="#contact">Contact</Link>
          <button onClick={() => setIsOpen(false)} className="bg-blue-400 text-zinc-950 font-bold px-8 py-4 rounded-full text-sm w-64 mt-6 uppercase tracking-wider">
            Close Menu
          </button>
        </div>
      )}
    </>
  );
}