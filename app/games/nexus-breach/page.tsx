"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Sparkles, AlertTriangle, ShieldCheck, RotateCcw, Hexagon } from "lucide-react";

export default function NexusBreachPage() {
  const [trapIndex, setTrapIndex] = useState<number>(0);
  const [clearedIndexes, setClearedIndexes] = useState<number[]>([]);
  const [gameStatus, setGameStatus] = useState<'idle' | 'playing' | 'gameover' | 'won'>('idle');

  // Initialize or reset the board
  const initGame = () => {
    setTrapIndex(Math.floor(Math.random() * 16));
    setClearedIndexes([]);
    setGameStatus('playing');
  };

  useEffect(() => {
    initGame();
  }, []);

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
    <div className="fixed inset-0 flex flex-col items-center w-full h-full bg-slate-50 dark:bg-[#09090b] font-sans text-slate-900 dark:text-white overflow-hidden overscroll-none selection:bg-transparent transition-colors duration-300">
      
      {/* 1. TOP HEADER */}
      <header className="w-full flex justify-between items-center px-6 py-4 relative z-50 pt-[env(safe-area-inset-top)] border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md">
        <button 
          onClick={() => window.parent.postMessage('close-game', '*')} // Fallback if needed, but App Router handles overlay
          className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-500 active:opacity-70 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" /> Exit Node
        </button>
        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">Nexus Breach</span>
      </header>

      {/* 2. HUD (Heads Up Display) */}
      <div className="w-full px-6 py-8 flex justify-between items-center max-w-sm mx-auto">
        <div className="flex flex-col">
          <span className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-1">Nodes Recovered</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <span className="text-2xl font-black">{clearedIndexes.length} <span className="text-sm text-slate-400 dark:text-zinc-600">/ 15</span></span>
          </div>
        </div>
        
        <div className="flex flex-col items-end text-right">
          <span className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-1">System Status</span>
          <span className={`text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
            gameStatus === 'playing' ? 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20' :
            gameStatus === 'gameover' ? 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20 animate-pulse' :
            'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
          }`}>
            {gameStatus === 'playing' ? 'Active' : gameStatus === 'gameover' ? 'Breached' : 'Secured'}
          </span>
        </div>
      </div>

      {/* 3. THE GAME GRID */}
      <div className="flex-1 w-full flex items-center justify-center px-6">
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
                    ? "bg-red-500/20 border-2 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.6)]" 
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

      {/* 4. BOTTOM ACTION BAR / RESTART PANEL */}
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
          ) : (
            <motion.div 
              key="action"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-[280px]"
            >
              <button 
                onClick={initGame}
                className={`w-full font-black py-4 rounded-2xl tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 ${
                  gameStatus === 'won' 
                    ? 'bg-emerald-600 text-white shadow-emerald-600/30 hover:bg-emerald-500' 
                    : 'bg-white dark:bg-zinc-100 text-slate-900 dark:text-black shadow-white/10 hover:bg-slate-200'
                }`}
              >
                <RotateCcw className="w-5 h-5" />
                {gameStatus === 'won' ? 'PLAY AGAIN' : 'REBOOT SYSTEM'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}