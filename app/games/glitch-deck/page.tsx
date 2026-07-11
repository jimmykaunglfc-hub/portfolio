"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ShieldCheck, AlertOctagon, RotateCcw, Skull, X, Layers, Users } from "lucide-react";
import Link from "next/link";

type PenaltyTheme = 'Standard' | 'Drink' | 'Truth' | 'Dare';
const PENALTY_THEMES: PenaltyTheme[] = ['Standard', 'Drink', 'Truth', 'Dare'];

type Card = {
  id: number;
  isGlitch: boolean;
  isFlipped: boolean;
};

export default function GlitchDeckPage() {
  const [playerCount, setPlayerCount] = useState<number>(4);
  const [cards, setCards] = useState<Card[]>([]);
  const [gameStatus, setGameStatus] = useState<'setup' | 'playing' | 'gameover'>('setup');
  const [penaltyTheme, setPenaltyTheme] = useState<PenaltyTheme>('Drink');
  const [showPenalty, setShowPenalty] = useState(false);
  const [isApp, setIsApp] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsApp(urlParams.get('app') === 'true');
  }, []);

  const cycleTheme = () => {
    setPenaltyTheme(prev => PENALTY_THEMES[(PENALTY_THEMES.indexOf(prev) + 1) % PENALTY_THEMES.length]);
  };

  const startGame = () => {
    // Generate cards and pick one random glitch
    const newCards = Array.from({ length: playerCount }).map((_, i) => ({
      id: i,
      isGlitch: false,
      isFlipped: false
    }));
    
    const glitchIndex = Math.floor(Math.random() * playerCount);
    newCards[glitchIndex].isGlitch = true;

    setCards(newCards);
    setGameStatus('playing');
    setShowPenalty(false);
  };

  const flipCard = (index: number) => {
    if (gameStatus !== 'playing' || cards[index].isFlipped) return;

    const newCards = [...cards];
    newCards[index].isFlipped = true;
    setCards(newCards);

    if (newCards[index].isGlitch) {
      // Hit the Glitch!
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([200, 100, 300]);
      }
      setTimeout(() => {
        setGameStatus('gameover');
        setShowPenalty(true);
      }, 600); // Slight delay for the dramatic card flip animation
    } else {
      // Safe!
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate(50);
      }
    }
  };

  return (
    <div className={`${isApp ? 'fixed inset-0 overflow-hidden' : 'min-h-screen pt-32 pb-12'} flex flex-col items-center w-full bg-slate-50 dark:bg-[#09090b] font-sans text-slate-900 dark:text-white overscroll-none selection:bg-transparent transition-colors duration-300`}>
      
      {/* 1. TOP HEADER */}
      {!isApp && (
        <header className="w-full flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md mb-4 max-w-7xl mx-auto rounded-2xl relative z-50">
          <Link href="/games" className="flex items-center gap-1.5 text-xs font-bold text-purple-600 dark:text-purple-500 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">The Glitch Deck</span>
        </header>
      )}

      {/* 2. SETUP PHASE */}
      <AnimatePresence mode="wait">
        {gameStatus === 'setup' && (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}
            className={`flex flex-col items-center justify-center w-full max-w-sm px-6 flex-1 ${isApp ? 'mt-10' : ''}`}
          >
            <div className="w-20 h-20 bg-purple-100 dark:bg-purple-500/10 rounded-3xl flex items-center justify-center mb-6 border border-purple-200 dark:border-purple-500/20 shadow-lg">
              <Layers className="w-10 h-10 text-purple-600 dark:text-purple-500" />
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-2 text-center tracking-tight">The Glitch Deck</h1>
            <p className="text-sm text-slate-500 dark:text-zinc-400 text-center mb-10 leading-relaxed">
              Select the number of players. Take turns drawing a card. Avoid the corrupted glitch node.
            </p>

            <div className="w-full bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 p-6 rounded-3xl shadow-sm mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-slate-400 dark:text-zinc-500" />
                  <span className="font-bold text-sm">Player Count</span>
                </div>
                <span className="text-2xl font-black text-purple-600 dark:text-purple-400">{playerCount}</span>
              </div>
              
              <input 
                type="range" 
                min="2" max="12" 
                value={playerCount} 
                onChange={(e) => setPlayerCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 dark:text-zinc-500 mt-2 font-bold">
                <span>2</span>
                <span>12</span>
              </div>
            </div>

            {/* Theme Selector Toggle */}
            <div className="w-full flex justify-between items-center bg-white dark:bg-zinc-900/50 border border-slate-200 dark:border-white/5 p-4 rounded-2xl shadow-sm mb-8">
              <div className="flex items-center gap-2">
                <Skull className="w-4 h-4 text-slate-400 dark:text-zinc-500" />
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Penalty Mode:</span>
              </div>
              <button 
                onClick={cycleTheme} 
                className="text-[11px] font-black uppercase tracking-widest text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/10 border border-purple-200 dark:border-purple-500/20 px-3 py-2 rounded-xl active:scale-95 transition-transform flex items-center gap-1.5"
              >
                {penaltyTheme} {penaltyTheme === 'Drink' ? '🥃' : penaltyTheme === 'Truth' ? '🤫' : penaltyTheme === 'Dare' ? '🎯' : '💥'}
              </button>
            </div>

            <button 
              onClick={startGame}
              className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-2xl tracking-widest transition-transform active:scale-95 shadow-[0_0_30px_rgba(147,51,234,0.4)]"
            >
              INITIALIZE DECK
            </button>
          </motion.div>
        )}

        {/* 3. PLAYING PHASE */}
        {gameStatus !== 'setup' && (
          <motion.div 
            key="game"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="flex flex-col flex-1 w-full max-w-lg px-6 relative z-10 pt-6"
          >
            {/* Status Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-1">Cards Remaining</span>
                <span className="text-xl font-black">{cards.filter(c => !c.isFlipped).length} <span className="text-sm text-slate-400 dark:text-zinc-600">/ {playerCount}</span></span>
              </div>
              <button onClick={() => setGameStatus('setup')} className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/5 p-2 rounded-full shadow-sm active:scale-95">
                <RotateCcw className="w-4 h-4 text-slate-600 dark:text-zinc-400" />
              </button>
            </div>

            {/* The Grid of Cards */}
            <div className="flex-1 w-full flex items-center justify-center">
              <div className={`grid gap-3 w-full max-w-[360px] mx-auto ${
                playerCount <= 4 ? 'grid-cols-2' : 
                playerCount <= 9 ? 'grid-cols-3' : 'grid-cols-4'
              }`}>
                {cards.map((card, index) => (
                  <div key={card.id} className="relative w-full aspect-[3/4] [perspective:1000px]">
                    <motion.div 
                      className="w-full h-full relative [transform-style:preserve-3d] cursor-pointer"
                      animate={{ rotateY: card.isFlipped ? 180 : 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      onClick={() => flipCard(index)}
                    >
                      {/* CARD FRONT (Facedown State) */}
                      <div className="absolute inset-0 [backface-visibility:hidden] bg-gradient-to-br from-slate-800 to-slate-900 dark:from-zinc-800 dark:to-zinc-950 rounded-xl border-2 border-slate-700 dark:border-zinc-700 shadow-lg flex items-center justify-center group hover:border-purple-500/50 transition-colors">
                        <div className="absolute inset-2 border border-slate-600/30 dark:border-white/5 rounded-lg border-dashed" />
                        <Layers className="w-6 h-6 text-slate-600 dark:text-zinc-600 group-hover:text-purple-500/50 transition-colors" />
                      </div>

                      {/* CARD BACK (Revealed State) */}
                      <div className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-xl border-2 shadow-xl flex flex-col items-center justify-center p-2 ${
                        card.isGlitch 
                          ? 'bg-gradient-to-br from-red-600 to-red-900 border-red-400 shadow-red-500/40' 
                          : 'bg-gradient-to-br from-emerald-500 to-emerald-800 border-emerald-300 shadow-emerald-500/20'
                      }`}>
                        {card.isGlitch ? (
                          <>
                            <AlertOctagon className="w-10 h-10 text-white mb-2 drop-shadow-md animate-pulse" />
                            <span className="text-[10px] font-black tracking-widest text-white uppercase drop-shadow-md">GLITCH</span>
                          </>
                        ) : (
                          <>
                            <ShieldCheck className="w-10 h-10 text-white mb-2 drop-shadow-md" />
                            <span className="text-[10px] font-black tracking-widest text-white uppercase drop-shadow-md">SECURE</span>
                          </>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="text-[11px] text-slate-500 dark:text-zinc-500 font-medium tracking-widest uppercase text-center mt-8 pb-10">
              {gameStatus === 'playing' ? "Draw your card." : "System breached."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. PENALTY MODAL (Closable) */}
      <AnimatePresence>
        {showPenalty && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-900/80 dark:bg-black/80 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-white dark:bg-zinc-900 border-2 border-red-500 rounded-[2rem] p-8 max-w-sm w-full text-center shadow-[0_0_50px_rgba(239,68,68,0.3)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-red-500/5 animate-pulse pointer-events-none" />

              <button 
                onClick={() => setShowPenalty(false)} 
                className="absolute top-4 right-4 text-red-400 hover:text-red-200 bg-red-500/10 p-2 rounded-full transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 bg-red-50 dark:bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-200 dark:border-red-500/20 relative z-10">
                <AlertOctagon className="w-10 h-10 text-red-500" />
              </div>
              
              <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mb-2 relative z-10">
                GLITCH DRAWN
              </h2>
              
              <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 p-6 rounded-2xl mb-8 mt-6 shadow-inner relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-500 mb-3 block">
                  Penalty Required
                </span>
                <p className="text-xl font-black text-slate-800 dark:text-red-100">
                  {penaltyTheme === 'Drink' && "Take a shot! 🥃"}
                  {penaltyTheme === 'Truth' && "Reveal a Truth! 🤫"}
                  {penaltyTheme === 'Dare' && "Complete a Dare! 🎯"}
                  {penaltyTheme === 'Standard' && "You drew the glitch. You lose. 💥"}
                </p>
              </div>

              <button 
                onClick={() => { setShowPenalty(false); setGameStatus('setup'); }} 
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl tracking-widest transition-transform active:scale-95 shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 relative z-10"
              >
                <RotateCcw className="w-5 h-5" /> RESET DECK
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}