"use client";

import Link from "next/link";
import { BrainCircuit, Play } from "lucide-react";

export default function GamesIndex() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          Digital <span className="text-blue-500">Playground</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          A collection of free-to-play browser games and interactive experiments built for fun.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Neural Decrypt (Puzzle Game) Card */}
        {/* Added 'group' class to trigger hover effects on child elements */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30">
          
          {/* UPGRADED: Glowing, animated game cover area */}
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            
            {/* Deep background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0a0f1c] to-[#120b1f] dark:from-black dark:via-gray-900 dark:to-slate-900"></div>
            
            {/* Animated center glow */}
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors duration-700"></div>
            
            {/* Tech matrix grid overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] opacity-[0.15] [background-size:16px_16px]"></div>

            {/* The Icon: enlarged, glowing, and animated on hover */}
            <BrainCircuit className="relative z-10 w-24 h-24 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-500" />
          </div>

          <div className="p-6 relative z-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">
              Neural Decrypt
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Solve trivia queries across logic, language, and mathematics to unlock the core grid matrix.
            </p>
            
            <Link 
              href="/games/puzzle"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300"
            >
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}