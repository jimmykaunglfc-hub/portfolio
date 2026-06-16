"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Bug, ShieldCheck, CreditCard, Activity, Users, AlertCircle, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QABugHunt() {
  const router = useRouter();
  const [foundBugs, setFoundBugs] = useState<string[]>([]);
  
  const totalBugs = 5;
  const isWon = foundBugs.length === totalBugs;

  const handleBugClick = (bugId: string) => {
    if (!foundBugs.includes(bugId)) {
      setFoundBugs([...foundBugs, bugId]);
    }
  };

  const resetGame = () => setFoundBugs([]);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex items-center gap-4">
            <Bug className="w-10 h-10 text-blue-500" />
            QA <span className="text-blue-500 dark:text-blue-400">Bug Hunt</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            Compare the Staging build (Right) to the Production design (Left). Click on the 5 visual bugs in the Staging build to pass QA.
          </p>
        </div>
        
        <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Bugs Found</div>
          <div className={`text-2xl font-black ${isWon ? 'text-green-500' : 'text-blue-500'}`}>
            {foundBugs.length} / {totalBugs}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isWon && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-bold text-green-500 text-lg">Build Approved!</h3>
                <p className="text-sm text-green-600 dark:text-green-400">You successfully identified all UI regressions.</p>
              </div>
            </div>
            <button onClick={resetGame} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-green-600 transition-colors">
              <RefreshCcw className="w-4 h-4" /> Play Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* LEFT: PRODUCTION BUILD (Correct) */}
        <div className="opacity-80">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="font-bold text-sm text-gray-500 uppercase">Production Design (Reference)</span>
          </div>
          
          <div className="bg-white dark:bg-[#121214] border-2 border-gray-200 dark:border-white/10 rounded-3xl p-8 pointer-events-none">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Overview</h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                <CreditCard className="w-6 h-6 text-blue-500 mb-2" />
                <div className="text-sm text-gray-500">Total Revenue</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">$45,231.89</div>
              </div>
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                <Users className="w-6 h-6 text-blue-500 mb-2" />
                <div className="text-sm text-gray-500">Active Users</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white">1,204</div>
              </div>
            </div>

            <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold">
              Generate Report
            </button>
          </div>
        </div>

        {/* RIGHT: STAGING BUILD (Has 5 Bugs) */}
        <div>
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
            <span className="font-bold text-sm text-yellow-600 dark:text-yellow-500 uppercase">Staging Build (Find Bugs Here)</span>
          </div>
          
          <div className={`bg-white dark:bg-[#121214] border-2 rounded-3xl p-8 transition-colors ${isWon ? 'border-green-500/50' : 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]'}`}>
            
            {/* Bug 1: Typo in Header */}
            <h2 
              onClick={() => handleBugClick("header-typo")}
              className={`text-2xl font-bold mb-6 cursor-pointer transition-colors ${foundBugs.includes("header-typo") ? "text-red-500 line-through" : "text-gray-900 dark:text-white hover:text-gray-400"}`}
            >
              Finance Overview {/* Missing 'al' */}
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl">
                
                {/* Bug 2: Wrong Icon Color */}
                <CreditCard 
                  onClick={() => handleBugClick("icon-color")}
                  className={`w-6 h-6 mb-2 cursor-pointer transition-colors ${foundBugs.includes("icon-color") ? "text-red-500" : "text-purple-500 hover:opacity-70"}`} 
                />
                <div className="text-sm text-gray-500">Total Revenue</div>
                
                {/* Bug 3: Wrong Decimal formatting */}
                <div 
                  onClick={() => handleBugClick("number-format")}
                  className={`text-xl font-bold cursor-pointer transition-colors ${foundBugs.includes("number-format") ? "text-red-500 line-through" : "text-gray-900 dark:text-white hover:text-gray-400"}`}
                >
                  $45,231,89 {/* Comma instead of decimal */}
                </div>
              </div>

              {/* Bug 4: Sharp corners instead of rounded-xl */}
              <div 
                onClick={() => handleBugClick("border-radius")}
                className={`bg-gray-50 dark:bg-white/5 p-4 cursor-pointer transition-all ${foundBugs.includes("border-radius") ? "rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-500/10" : "rounded-sm border-2 border-transparent hover:border-gray-300 dark:hover:border-white/20"}`}
              >
                <Users className="w-6 h-6 text-blue-500 mb-2 pointer-events-none" />
                <div className="text-sm text-gray-500 pointer-events-none">Active Users</div>
                <div className="text-xl font-bold text-gray-900 dark:text-white pointer-events-none">1,204</div>
              </div>
            </div>

            {/* Bug 5: Typo on Button */}
            <button 
              onClick={() => handleBugClick("button-typo")}
              className={`w-full text-white py-3 rounded-xl font-bold transition-colors ${foundBugs.includes("button-typo") ? "bg-red-500 line-through" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              Generte Report {/* Missing 'a' */}
            </button>
          </div>
        </div>

      </div>
    </main>
  );
}