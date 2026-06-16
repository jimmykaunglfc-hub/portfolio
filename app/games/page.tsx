"use client";

import Link from "next/link";
import { BrainCircuit, Play, Bug, Target } from "lucide-react";

export default function GamesIndex() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      <div className="mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          Digital <span className="text-blue-500">Playground</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          A collection of interactive browser games proving logic, QA, and frontend expertise.
        </p>
      </div>

      {/* The Grid Container for all the Games */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Game 1: Neural Decrypt */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0a0f1c] to-[#120b1f] dark:from-black dark:via-gray-900 dark:to-slate-900"></div>
            <div className="absolute inset-0 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] opacity-[0.15] [background-size:16px_16px]"></div>
            <BrainCircuit className="relative z-10 w-24 h-24 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 group-hover:rotate-[-5deg] transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">
              Neural Decrypt
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 h-10">
              Solve trivia queries across logic and tech to unlock the core matrix.
            </p>
            <Link href="/games/puzzle" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 2: QA Bug Hunt */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0a1510] to-[#0b1f14] dark:from-black dark:via-gray-900 dark:to-green-950"></div>
            <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full group-hover:bg-green-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Bug className="relative z-10 w-24 h-24 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors duration-300">
              QA Bug Hunt
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 h-10">
              Analyze the staging UI build and click the hidden regressions to pass QA.
            </p>
            <Link href="/games/qa-test" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-green-600 dark:hover:bg-green-500 dark:hover:text-white transition-all duration-300">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 3: Sprint Optimizer */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0d0f1a] to-[#161224] dark:from-black dark:via-gray-900 dark:to-indigo-950"></div>
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Target className="relative z-10 w-24 h-24 text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors duration-300">
              Sprint Optimizer
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 h-10">
              Balance engineering capacity against business value to build the perfect Agile sprint.
            </p>
            <Link href="/games/sprint-planner" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-300">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>
        
{/* Game 4: Bug Blaster */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a0f0f] to-[#241212] dark:from-black dark:via-gray-900 dark:to-red-950"></div>
            <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full group-hover:bg-red-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Gamepad2 className="relative z-10 w-24 h-24 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
              Bug Blaster
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              A high-speed HTML5 Canvas arcade shooter. Dodge the regressions and blast the bugs before they crash the system.
            </p>
            <Link href="/games/bug-blaster" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}