"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Skull, Compass, Navigation } from "lucide-react";
import Link from "next/link";

type PenaltyTheme = 'Standard' | 'Drink' | 'Truth' | 'Dare';
const PENALTY_THEMES: PenaltyTheme[] = ['Standard', 'Drink', 'Truth', 'Dare'];

export default function QuantumCompassPage() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [penaltyTheme, setPenaltyTheme] = useState<PenaltyTheme>('Drink');
  const [isApp, setIsApp] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsApp(urlParams.get('app') === 'true');
  }, []);

  const cycleTheme = () => {
    if (isSpinning) return;
    setPenaltyTheme(prev => PENALTY_THEMES[(PENALTY_THEMES.indexOf(prev) + 1) % PENALTY_THEMES.length]);
  };

  const handleSwipe = (e: any, info: any) => {
    if (isSpinning) return;
    
    // Calculate swipe velocity magnitude
    const velocity = Math.sqrt(Math.pow(info.velocity.x, 2) + Math.pow(info.velocity.y, 2));
    
    // Require at least a little bit of force to spin
    if (velocity > 150) {
      triggerSpin(velocity);
    }
  };

  const triggerSpin = (velocity: number = 1000) => {
    if (isSpinning) return;
    setIsSpinning(true);

    // Initial haptic kick
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }

    // Base spins on swipe velocity (between 3 and 10 extra rotations)
    const spinMultiplier = Math.min(10, Math.max(3, Math.floor(velocity / 200)));
    const randomDegrees = Math.floor(Math.random() * 360);
    
    // Add to current rotation so it continuously spins forward
    const totalRotation = rotation + (360 * spinMultiplier) + randomDegrees;
    setRotation(totalRotation);

    // Match this duration to the Framer Motion transition duration
    const spinDuration = 4000; 

    setTimeout(() => {
      setIsSpinning(false);
      // Haptic bump when it finally locks onto a target
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        window.navigator.vibrate([100, 50, 200]);
      }
    }, spinDuration);
  };

  return (
    <div className={`${isApp ? 'fixed inset-0 overflow-hidden' : 'min-h-screen pt-32 pb-12'} flex flex-col items-center w-full bg-slate-900 dark:bg-[#09090b] font-sans text-white overscroll-none selection:bg-transparent transition-colors duration-300 relative`}>
      
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.05)_0%,transparent_70%)]" />

      {/* 1. TOP HEADER */}
      {!isApp && (
        <header className="w-full flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-md mb-4 max-w-7xl mx-auto rounded-2xl relative z-50">
          <Link href="/games" className="flex items-center gap-1.5 text-xs font-bold text-fuchsia-500 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Quantum Compass</span>
        </header>
      )}

      {/* 2. HUD & PENALTY THEME SELECTOR */}
      <div className={`w-full px-6 flex flex-col gap-4 max-w-sm mx-auto relative z-40 ${isApp ? 'pt-[env(safe-area-inset-top)] mt-6' : ''}`}>
        
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Device Status</span>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-fuchsia-500" />
              <span className="text-xl font-black">{isSpinning ? 'CALCULATING' : 'LOCKED'}</span>
            </div>
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
            disabled={isSpinning}
            className="text-[11px] font-black uppercase tracking-widest text-fuchsia-500 bg-fuchsia-500/10 border border-fuchsia-500/20 px-3 py-1.5 rounded-lg active:scale-95 disabled:opacity-50 transition-transform flex items-center gap-1.5"
          >
            {penaltyTheme} {penaltyTheme === 'Drink' ? '🥃' : penaltyTheme === 'Truth' ? '🤫' : penaltyTheme === 'Dare' ? '🎯' : '💥'}
          </button>
        </div>
      </div>

      {/* 3. THE SPINNER ARENA */}
      <div className="flex-1 w-full flex flex-col items-center justify-center px-6 relative z-20">
        
        {/* Full screen swipe detector */}
        <motion.div 
          className="absolute inset-0 z-30 touch-none"
          onPanEnd={handleSwipe}
          onClick={() => triggerSpin(800)} // Fallback for simple clicks
        />

        <div className="relative w-72 h-72 rounded-full border-4 border-zinc-800 bg-zinc-950 flex items-center justify-center shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          {/* Radar Ring Visuals */}
          <div className="absolute inset-2 border border-zinc-800 rounded-full border-dashed opacity-50" />
          <div className="absolute inset-8 border border-zinc-800 rounded-full opacity-30" />
          
          {/* The Spinning Baton */}
          <motion.div
            className="w-full h-full absolute inset-0 drop-shadow-[0_0_15px_rgba(217,70,239,0.5)] flex items-center justify-center"
            animate={{ rotate: rotation }}
            transition={{ type: "tween", ease: "circOut", duration: 4 }}
          >
            {/* The physical pointer design */}
            <div className="relative w-8 h-[85%] flex flex-col items-center">
              {/* Arrow Head */}
              <div className="w-0 h-0 border-l-[16px] border-l-transparent border-r-[16px] border-r-transparent border-b-[32px] border-b-fuchsia-500" />
              {/* Arrow Body */}
              <div className="w-3 h-full bg-gradient-to-b from-fuchsia-500 to-fuchsia-900 rounded-b-full shadow-inner" />
              
              {/* Center Pivot Point */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-zinc-900 rounded-full border-4 border-fuchsia-500 shadow-lg flex items-center justify-center">
                <div className="w-2 h-2 bg-white rounded-full" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 4. INSTRUCTIONS */}
      <div className="w-full px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] h-32 flex flex-col items-center justify-center relative z-40 pointer-events-none">
        <AnimatePresence mode="wait">
          {isSpinning ? (
            <motion.p 
              key="spinning"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="text-[18px] text-fuchsia-500 font-black tracking-widest uppercase text-center animate-pulse"
            >
              ROUTING...
            </motion.p>
          ) : (
            <motion.p 
              key="idle"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="text-[11px] text-zinc-500 font-medium tracking-widest uppercase text-center"
            >
              Place device in the center.<br/>Swipe forcefully to spin the compass.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}