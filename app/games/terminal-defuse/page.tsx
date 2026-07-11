"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Skull, RotateCcw, X, Scissors, AlertOctagon, Zap } from "lucide-react";
import Link from "next/link";

type PenaltyTheme = 'Standard' | 'Drink' | 'Truth' | 'Dare';
const PENALTY_THEMES: PenaltyTheme[] = ['Standard', 'Drink', 'Truth', 'Dare'];

const WIRE_COLORS = [
  "from-cyan-400 to-cyan-600 shadow-cyan-500",
  "from-pink-400 to-pink-600 shadow-pink-500",
  "from-emerald-400 to-emerald-600 shadow-emerald-500",
  "from-amber-400 to-amber-600 shadow-amber-500",
  "from-purple-400 to-purple-600 shadow-purple-500",
  "from-rose-400 to-rose-600 shadow-rose-500",
];

type Wire = {
  id: number;
  isCut: boolean;
  isTrap: boolean;
  color: string;
};

export default function TerminalDefusePage() {
  const [wires, setWires] = useState<Wire[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'gameover'>('playing');
  const [penaltyTheme, setPenaltyTheme] = useState<PenaltyTheme>('Drink');
  const [showPenalty, setShowPenalty] = useState(false);
  const [isApp, setIsApp] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsApp(urlParams.get('app') === 'true');
    initGame();
  }, []);

  const cycleTheme = () => {
    setPenaltyTheme(prev => PENALTY_THEMES[(PENALTY_THEMES.indexOf(prev) + 1) % PENALTY_THEMES.length]);
  };

  const initGame = () => {
    const newWires = Array.from({ length: 6 }).map((_, i) => ({
      id: i,
      isCut: false,
      isTrap: false,
      color: WIRE_COLORS[i]
    }));
    
    // Pick exactly 1 live wire
    const trapIndex = Math.floor(Math.random() * 6);
    newWires[trapIndex].isTrap = true;

    setWires(newWires);
    setGameStatus('playing');
    setShowPenalty(false);
  };

  const cutWire = (index: number) => {
    if (gameStatus !== 'playing' || wires[index].isCut) return;

    const newWires = [...wires];
    newWires[index].isCut = true;
    setWires(newWires);

    // Haptic snap effect
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(40);
    }

    if (newWires[index].isTrap) {
      // BOOM! Hit the live wire.
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        setTimeout(() => window.navigator.vibrate([200, 100, 400]), 200);
      }
      setGameStatus('gameover');
      setTimeout(() => setShowPenalty(true), 800); // Wait for the visual snap before popup
    }
  };

  return (
    <div className={`${isApp ? 'fixed inset-0 overflow-hidden' : 'min-h-screen pt-32 pb-12'} flex flex-col items-center w-full bg-slate-900 dark:bg-[#09090b] font-sans text-white overscroll-none selection:bg-transparent transition-colors duration-300 relative`}>
      
      {/* Background Danger Pulse if GameOver */}
      <div 
        className={`absolute inset-0 z-0 pointer-events-none transition-all duration-500 ${gameStatus === 'gameover' ? 'bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.2)_0%,transparent_70%)] animate-pulse' : 'bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05)_0%,transparent_70%)]'}`}
      />

      {/* 1. TOP HEADER */}
      {!isApp && (
        <header className="w-full flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-md mb-4 max-w-7xl mx-auto rounded-2xl relative z-50">
          <Link href="/games" className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Terminal Defuse</span>
        </header>
      )}

      {/* 2. HUD & PENALTY THEME SELECTOR */}
      <div className={`w-full px-6 flex flex-col gap-4 max-w-sm mx-auto relative z-40 ${isApp ? 'pt-[env(safe-area-inset-top)] mt-6' : ''}`}>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Wires Remaining</span>
            <div className="flex items-center gap-2">
              <Scissors className="w-5 h-5 text-red-500" />
              <span className="text-2xl font-black">{wires.filter(w => !w.isCut).length} <span className="text-sm text-zinc-600">/ 6</span></span>
            </div>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Core Status</span>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              gameStatus === 'playing' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-red-500/10 text-red-500 border-red-500/50 animate-pulse'
            }`}>
              {gameStatus === 'playing' ? 'Armed' : 'Detonated'}
            </span>
          </div>
        </div>

        {/* Theme Selector Toggle */}
        <div className="flex justify-between items-center bg-zinc-900/50 border border-white/5 p-3 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <Skull className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-bold text-zinc-300">Penalty Mode:</span>
          </div>
          <button 
            onClick={cycleTheme} 
            className="text-[11px] font-black uppercase tracking-widest text-red-500 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg active:scale-95 transition-transform flex items-center gap-1.5"
          >
            {penaltyTheme} {penaltyTheme === 'Drink' ? '🥃' : penaltyTheme === 'Truth' ? '🤫' : penaltyTheme === 'Dare' ? '🎯' : '💥'}
          </button>
        </div>
      </div>

      {/* 3. THE BOMB TERMINAL (WIRE GRID) */}
      <div className="flex-1 w-full flex flex-col items-center justify-center px-6 relative z-20">
        <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-[2rem] w-full max-w-sm shadow-[inset_0_0_50px_rgba(0,0,0,0.8),_0_20px_40px_rgba(0,0,0,0.5)] flex flex-col gap-5 relative overflow-hidden">
          
          {/* Top Server Nodes */}
          <div className="flex justify-between px-4 mb-2">
            {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-3 bg-zinc-800 rounded-full border border-zinc-700 shadow-inner" />)}
          </div>

          {/* The Swipeable Wires */}
          <div className="flex justify-between px-5 h-48 relative">
            {wires.map((wire, index) => (
              <div key={wire.id} className="relative w-4 h-full flex flex-col items-center group">
                
                {/* Framer Motion Pan Detector - Requires a swipe to cut! */}
                <motion.div 
                  className="absolute inset-x-[-20px] inset-y-0 z-30 cursor-crosshair touch-none"
                  onPan={(e, info) => {
                    // Detect if the user swiped horizontally across this invisible hit-box
                    if (Math.abs(info.offset.x) > 20) {
                      cutWire(index);
                    }
                  }}
                />

                {/* Wire Visuals */}
                {!wire.isCut ? (
                  // Intact Wire
                  <div className={`w-2.5 h-full rounded-full bg-gradient-to-b ${wire.color} shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform duration-100 group-active:scale-x-75`} />
                ) : (
                  // Snapped Wire (Splits in two)
                  <div className="w-full h-full flex flex-col justify-between items-center relative">
                    {/* Top Half Drooping */}
                    <motion.div 
                      initial={{ rotate: 0, y: 0 }} 
                      animate={{ rotate: -15, y: -5 }} 
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className={`w-2.5 h-[40%] rounded-full bg-gradient-to-b ${wire.color} origin-top opacity-50`} 
                    />
                    
                    {/* Spark/Explosion Animation at the cut site */}
                    {wire.isTrap ? (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: [1, 2, 0] }} transition={{ duration: 0.5 }} className="absolute top-1/2 -translate-y-1/2 z-10">
                        <Zap className="w-10 h-10 text-white fill-white drop-shadow-[0_0_20px_rgba(239,68,68,1)] animate-ping" />
                      </motion.div>
                    ) : (
                      <motion.div initial={{ scale: 0, opacity: 1 }} animate={{ scale: 1.5, opacity: 0 }} transition={{ duration: 0.3 }} className="absolute top-1/2 -translate-y-1/2 z-10 w-4 h-4 bg-white rounded-full shadow-[0_0_10px_white]" />
                    )}

                    {/* Bottom Half Drooping */}
                    <motion.div 
                      initial={{ rotate: 0, y: 0 }} 
                      animate={{ rotate: 15, y: 5 }} 
                      transition={{ type: 'spring', bounce: 0.5 }}
                      className={`w-2.5 h-[40%] rounded-full bg-gradient-to-b ${wire.color} origin-bottom opacity-50`} 
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Server Nodes */}
          <div className="flex justify-between px-4 mt-2">
            {[...Array(6)].map((_, i) => <div key={i} className="w-3 h-3 bg-zinc-800 rounded-full border border-zinc-700 shadow-inner" />)}
          </div>

        </div>
      </div>

      {/* 4. INSTRUCTIONS & ACTIONS */}
      <div className="w-full px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] h-32 flex flex-col items-center justify-center relative z-40">
        <AnimatePresence mode="wait">
          {gameStatus === 'playing' ? (
            <motion.p 
              key="hint"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="text-[11px] text-zinc-500 font-medium tracking-widest uppercase text-center"
            >
              Swipe horizontally to cut a wire.<br/>Do not cut the live trap!
            </motion.p>
          ) : (
            <motion.div 
              key="action"
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-[280px]"
            >
              <button 
                onClick={initGame}
                className="w-full font-black py-4 rounded-2xl tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg active:scale-95 bg-red-600 text-white shadow-red-600/30 hover:bg-red-500"
              >
                <RotateCcw className="w-5 h-5" /> REBOOT TERMINAL
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 5. DRAMATIC PENALTY POPUP MODAL (Closable) */}
      <AnimatePresence>
        {showPenalty && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-red-950/90 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-black border-2 border-red-500 rounded-[2rem] p-8 max-w-sm w-full text-center shadow-[0_0_100px_rgba(239,68,68,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />

              <button 
                onClick={() => setShowPenalty(false)} 
                className="absolute top-4 right-4 text-red-400 hover:text-red-200 bg-red-500/10 p-2 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50 relative z-10">
                <AlertOctagon className="w-10 h-10 text-red-500" />
              </div>
              
              <h2 className="text-2xl font-black text-white tracking-tight mb-2 relative z-10">
                LIVE WIRE CUT
              </h2>
              
              <div className="bg-red-950 border border-red-500/50 p-6 rounded-2xl mb-8 mt-6 shadow-inner relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-3 block">
                  Penalty Required
                </span>
                <p className="text-xl font-black text-white">
                  {penaltyTheme === 'Drink' && "Take a shot! 🥃"}
                  {penaltyTheme === 'Truth' && "Reveal a Truth! 🤫"}
                  {penaltyTheme === 'Dare' && "Complete a Dare! 🎯"}
                  {penaltyTheme === 'Standard' && "You detonated the core. 💥"}
                </p>
              </div>

              <button 
                onClick={() => setShowPenalty(false)} 
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl tracking-widest transition-transform active:scale-95 shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 relative z-10"
              >
                ACCEPT PENALTY
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}