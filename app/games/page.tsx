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
        <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1">
          <div className="h-48 bg-gray-100 dark:bg-white/5 flex items-center justify-center border-b border-gray-200 dark:border-white/10">
            {/* Using the BrainCircuit icon to match the puzzle theme */}
            <BrainCircuit className="w-16 h-16 text-gray-400 dark:text-gray-500" />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
              Neural Decrypt
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
              Solve trivia queries across logic, language, and mathematics to unlock the core grid matrix.
            </p>
            
            {/* THE FIX: This link now correctly points to the puzzle folder we just created */}
            <Link 
              href="/games/puzzle"
              className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
            >
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}