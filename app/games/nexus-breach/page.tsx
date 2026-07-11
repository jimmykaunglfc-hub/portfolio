"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, AlertTriangle, ShieldCheck, RotateCcw, Hexagon, Skull } from "lucide-react";
import Link from "next/link";

type PenaltyTheme = 'Standard' | 'Drink' | 'Truth' | 'Dare';
const PENALTY_THEMES: PenaltyTheme[] = ['Standard', 'Drink', 'Truth', 'Dare'];

export default function NexusBreachPage() {
  const [trapIndex, setTrapIndex] = useState<number>(0);
  const [clearedIndexes, setClearedIndexes] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameover' | 'won'>('idle');
  const [penaltyTheme, setPenaltyTheme] = useState<PenaltyTheme>('Drink'); // Default to Drink mode!
  
  // Detect if we are inside the Mobile App's iframe or on the standard Website
  const [isApp, setIsApp] = useState(true); 

  useEffect(() => {
    // Check the URL for the app parameter passed by our iframe
    const urlParams = new URLSearchParams(window.location.search);
    setIsApp(urlParams.get('app') === 'true');
    initGame();
  }, []);

  // Initialize or reset the board
  const initGame = () => {
    setTrapIndex(Math.floor(Math.random() * 16));
    setClearedIndexes([]);
    setGameStatus('playing');
  };

  const cycleTheme = () => {
    setPenaltyTheme(prev => PENALTY_THEMES[(PENALTY_THEMES.indexOf(prev) + 1) % PENALTY_THEMES.length]);
  };

  const handleBoxClick = (index: number) => {
    if (gameStatus !== 'playing' || clearedIndexes.includes(index)) return;

    if (index === trapIndex) {
      // Hit the trap!
      setGameStatus('gameover');
    } else {
      // Safe!
      const newCleared = [...clearedIndexes, index];
      setClearedIndexes(newCleared);
      
      // If 15 boxes are cleared, user wins
      if (newCleared.length === 15) {
        setGameStatus('won');
      }
    }
  };

  return (
    <div className={`${isApp ? 'fixed inset-0 overflow-hidden' : 'min-h-screen pt-32 pb-12'} flex flex-col items-center w-full bg-slate-50 dark:bg-[#09090b] font-sans text-slate-900 dark:text-white overscroll-none selection:bg-transparent transition-colors duration-300`}>
      
      {/* 1. TOP HEADER (Hidden in Mobile App to prevent duplicates!) */}
      {!isApp && (
        <header className="w-full flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md mb-4 max-w-7xl mx-auto rounded-2xl">
          <Link href="/games" className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-500 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">Nexus Breach</span>
        </header>
      )}

      {/* 2. HUD & PENALTY THEME SELECTOR */}
      <div className={`w-full px-6 flex flex-col gap-4 max-w-sm mx-auto ${isApp ? 'pt-[env(safe-area-inset-top)] mt-6' : ''}`}>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-1">Nodes Recovered</span>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span className="text-2xl font-black">{clearedIndexes.length} <span className="text-sm text-slate-400 dark:text-zinc-600">/ 15</span></span>
            </div>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-1">System Status</span>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              gameStatus === 'playing' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
              gameStatus === 'gameover' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 animate-pulse' :
              'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
            }`}>
              {gameStatus === 'playing' ? 'Active' : gameStatus === 'gameover' ? 'Breached' : 'Secured'}
            </span>
          </div>
        </div>

        {/* Theme Selector Toggle */}
        <div className="flex justify-between items-center bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 p-3 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <Skull className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Penalty Mode:</span>
          </div>
          <button 
            onClick={cycleTheme} 
            className="text-[11px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 px-3 py-1.5 rounded-lg active:scale-95 transition-transform flex items-center gap-1.5"
          >
            {penaltyTheme} {penaltyTheme === 'Drink' ? '🥃' : penaltyTheme === 'Truth' ? '🤫' : penaltyTheme === 'Dare' ? '🎯' : '💥'}
          </button>
        </div>

      </div>

      {/* 3. THE GAME GRID */}
      <div className="flex-1 w-full flex items-center justify-center px-6 mt-4">
        <div className="grid grid-cols-4 grid-rows-4 gap-3 w-full max-w-[340px] aspect-square relative z-10">
          {Array.from({ length: 16 }).map((_, i) => {
            const isCleared = clearedIndexes.includes(i);
            const isTrap = i === trapIndex;
            const revealTrap = gameStatus === 'gameover' && isTrap;
            const revealSafe = gameStatus === 'gameover' && !isTrap && !isCleared;

            return (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: i * 0.02 }}
                whileHover={gameStatus === 'playing' && !isCleared ? { scale: 1.05 } : {}}
                whileTap={gameStatus === 'playing' && !isCleared ? { scale: 0.95 } : {}}
                onClick={() => handleBoxClick(i)}
                disabled={gameStatus !== 'playing' || isCleared}
                className={`relative w-full h-full rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden ${
                  revealTrap 
                    ? "bg-red-500/20 border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)] z-20" 
                    : isCleared || revealSafe
                    ? "bg-slate-200/50 dark:bg-zinc-900/50 border border-slate-300 dark:border-white/5 shadow-[inset_0_5px_15px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_5px_15px_rgba(0,0,0,0.5)]"
                    : "bg-gradient-to-br from-blue-50 to-blue-100 dark:from-[#1e1e24] dark:to-[#121214] border border-blue-200 dark:border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.05),_inset_0_-2px_5px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_20px_rgba(0,0,0,0.4),_inset_0_-2px_5px_rgba(0,0,0,0.5)] hover:border-blue-400 dark:hover:border-blue-500/50"
                }`}
              >
                {/* Unclicked Beautiful State */}
                {!isCleared && !revealTrap && !revealSafe && (
                  <Hexagon className="w-8 h-8 text-blue-400/50 dark:text-blue-500/30 absolute" strokeWidth={1} />
                )}
                {!isCleared && !revealTrap && !revealSafe && (
                  <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 opacity-70" />
                )}

                {/* Cleared Safe State */}
                {isCleared && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                )}

                {/* Revealed Trap State */}
                {revealTrap && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.4 }}>
                    <AlertTriangle className="w-8 h-8 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* 4. BOTTOM ACTION BAR (Only visible if won or playing) */}
      <div className="w-full px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-8 h-32 flex flex-col items-center justify-center relative z-50">
        <AnimatePresence mode="wait">
          {gameStatus === 'playing' ? (
            <motion.p 
              key="hint"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="text-[11px] text-slate-500 dark:text-zinc-500 font-medium tracking-widest uppercase text-center"
            >
              15 safe nodes. 1 corrupted trap.<br/>Push your luck.
            </motion.p>
          ) : gameStatus === 'won' ? (
            <motion.div 
              key="action"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-[280px]"
            >
              <button 
                onClick={initGame}
                className="w-full font-black py-4 rounded-2xl tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-emerald-500"
              >
                <RotateCcw className="w-5 h-5" /> PLAY AGAIN
              </button>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {/* 5. DRAMATIC PENALTY POPUP MODAL */}
      <AnimatePresence>
        {gameStatus === 'gameover' && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 dark:bg-black/80 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} 
              animate={{ scale: 1, y: 0 }} 
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-zinc-900 border-2 border-red-500 rounded-[2rem] p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.3)] relative overflow-hidden"
            >
              {/* Flashing Danger Background */}
              <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />

              <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-200 dark:border-red-500/20 relative z-10">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2 relative z-10">
                SYSTEM BREACHED
              </h2>
              
              {/* Dynamic Penalty Box */}
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 p-6 rounded-2xl mb-8 mt-6 shadow-inner relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-3 block">
                  Penalty Required
                </span>
                <p className="text-xl font-black text-slate-800 dark:text-red-100">
                  {penaltyTheme === 'Drink' && "Take a shot! 🥃"}
                  {penaltyTheme === 'Truth' && "Reveal a Truth! 🤫"}
                  {penaltyTheme === 'Dare' && "Complete a Dare! 🎯"}
                  {penaltyTheme === 'Standard' && "Node corrupted. You lose. 💥"}
                </p>
              </div>

              <button 
                onClick={initGame} 
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl tracking-widest transition-transform active:scale-95 shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 relative z-10"
              >
                <RotateCcw className="w-5 h-5" /> REBOOT SYSTEM
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}