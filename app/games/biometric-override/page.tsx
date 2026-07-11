"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Fingerprint, ScanLine } from "lucide-react";
import Link from "next/link";

// High-tech color palette for different fingers
const NODE_COLORS = [
  "border-cyan-500 shadow-cyan-500",
  "border-pink-500 shadow-pink-500",
  "border-emerald-500 shadow-emerald-500",
  "border-amber-500 shadow-amber-500",
  "border-purple-500 shadow-purple-500",
  "border-rose-500 shadow-rose-500",
];

const INNER_COLORS = [
  "bg-cyan-500", "bg-pink-500", "bg-emerald-500", "bg-amber-500", "bg-purple-500", "bg-rose-500"
];

type TouchPoint = {
  id: number;
  x: number;
  y: number;
  colorIndex: number;
};

export default function BiometricOverridePage() {
  const [touches, setTouches] = useState<TouchPoint[]>([]);
  const [phase, setPhase] = useState<'idle' | 'scanning' | 'selected'>('idle');
  const [winnerId, setWinnerId] = useState<number | null>(null);
  
  // Detect if we are inside the Mobile App's iframe or on the standard Website
  const [isApp, setIsApp] = useState(true); 
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsApp(urlParams.get('app') === 'true');
  }, []);

  // Multi-Touch Handlers
  const handleTouch = (e: React.TouchEvent) => {
    // If a winner is already selected, wait until all fingers leave to reset
    if (phase === 'selected') {
      if (e.touches.length === 0) {
        setPhase('idle');
        setWinnerId(null);
        setTouches([]);
      }
      return;
    }

    const currentTouches = Array.from(e.touches).map((t, index) => ({
      id: t.identifier,
      x: t.clientX,
      y: t.clientY,
      colorIndex: index % NODE_COLORS.length
    }));

    setTouches(currentTouches);

    // Game Logic: Start scanning if 2 or more fingers are on screen
    if (currentTouches.length >= 2) {
      if (phase === 'idle') {
        setPhase('scanning');
        // Trigger haptic feedback if available
        if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate([50, 50, 50]);
        }
      }
    } else {
      // Cancel scan if someone lets go early
      setPhase('idle');
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  // Timer Effect
  useEffect(() => {
    if (phase === 'scanning') {
      timerRef.current = setTimeout(() => {
        // Pick a random winner from the current touches
        const randomWinner = touches[Math.floor(Math.random() * touches.length)];
        setWinnerId(randomWinner.id);
        setPhase('selected');
        
        // Winning Haptic Feedback
        if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
          window.navigator.vibrate([200, 100, 200]);
        }
      }, 3000); // 3 seconds of suspense!
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, touches]);

  return (
    <div 
      className={`${isApp ? 'fixed inset-0' : 'min-h-screen pt-32 pb-12'} flex flex-col items-center w-full bg-slate-50 dark:bg-[#09090b] font-sans text-slate-900 dark:text-white overscroll-none selection:bg-transparent transition-colors duration-300 touch-none`}
      onTouchStart={handleTouch}
      onTouchMove={handleTouch}
      onTouchEnd={handleTouch}
      onTouchCancel={handleTouch}
    >
      
      {/* 1. TOP HEADER (Hidden in Mobile App to prevent duplicates) */}
      {!isApp && (
        <header className="w-full flex justify-between items-center px-6 py-4 border-b border-slate-200 dark:border-white/5 bg-white/50 dark:bg-black/50 backdrop-blur-md mb-4 max-w-7xl mx-auto rounded-2xl relative z-50">
          <Link href="/games" className="flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-500 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-500">Biometric Override</span>
        </header>
      )}

      {/* 2. HUD / STATUS INSTRUCTIONS */}
      <div className={`w-full px-6 flex flex-col items-center justify-center pointer-events-none relative z-40 ${isApp ? 'pt-[env(safe-area-inset-top)] mt-12' : 'mt-10'}`}>
        <div className="bg-white/80 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 backdrop-blur-xl px-6 py-4 rounded-3xl shadow-2xl flex flex-col items-center text-center max-w-xs">
          <Fingerprint className={`w-8 h-8 mb-2 ${phase === 'scanning' ? 'text-blue-500 animate-pulse' : phase === 'selected' ? 'text-red-500' : 'text-slate-400 dark:text-zinc-500'}`} />
          <h2 className="text-sm font-black uppercase tracking-widest mb-1">
            {phase === 'idle' ? 'Awaiting Inputs' : phase === 'scanning' ? 'Scanning Biometrics' : 'Target Locked'}
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-400 font-medium">
            {phase === 'idle' ? 'Everyone place one finger on the screen to begin.' : 
             phase === 'scanning' ? 'Hold steady...' : 
             'Release all fingers to reset.'}
          </p>
        </div>
      </div>

      {/* 3. MULTI-TOUCH RENDERING LAYER */}
      <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none">
        
        {/* Subtle Background Radar Sweep during scanning */}
        <AnimatePresence>
          {phase === 'scanning' && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-[150vw] h-[150vw] rounded-full border border-blue-500/10 animate-[spin_4s_linear_infinite]" 
                   style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(59, 130, 246, 0.1) 100%)' }} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Render Each Finger */}
        <AnimatePresence>
          {touches.map((touch) => {
            const isWinner = winnerId === touch.id;
            const isLoser = phase === 'selected' && !isWinner;

            if (isLoser) return null; // Hide losers when winner is selected

            return (
              <motion.div
                key={touch.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className="absolute pointer-events-none"
                style={{ 
                  left: touch.x, 
                  top: touch.y, 
                  transform: 'translate(-50%, -50%)' 
                }}
              >
                {/* Outer Ripple / Glowing Aura */}
                <div className={`absolute -inset-10 rounded-full border-2 opacity-50 
                  ${isWinner ? 'border-red-500 animate-[ping_1.5s_cubic-bezier(0,0,0.2,1)_infinite]' : NODE_COLORS[touch.colorIndex]} 
                  ${phase === 'scanning' ? 'animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]' : ''}`} 
                />
                
                {/* Secondary Ring */}
                <div className={`absolute -inset-4 rounded-full border-[3px] 
                  ${isWinner ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.8)] animate-pulse' : NODE_COLORS[touch.colorIndex]}`} 
                />

                {/* Core Finger Node */}
                <div className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md border-[4px]
                  ${isWinner ? 'bg-red-500/20 border-red-500 shadow-[inset_0_0_20px_rgba(239,68,68,0.8)]' : `bg-black/50 ${NODE_COLORS[touch.colorIndex]}`}`}
                >
                  <ScanLine className={`w-6 h-6 ${isWinner ? 'text-red-500' : 'text-white/70'}`} />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}