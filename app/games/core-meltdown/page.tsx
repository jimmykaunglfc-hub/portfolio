"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Radiation, Skull, RotateCcw, Zap, X } from "lucide-react";
import Link from "next/link";

type PenaltyTheme = 'Standard' | 'Drink' | 'Truth' | 'Dare';
const PENALTY_THEMES: PenaltyTheme[] = ['Standard', 'Drink', 'Truth', 'Dare'];

export default function CoreMeltdownPage() {
  const [phase, setPhase] = useState<'idle' | 'active' | 'meltdown'>('idle');
  const [dangerLevel, setDangerLevel] = useState(0); // 0 to 100
  const [passCount, setPassCount] = useState(0);
  const [penaltyTheme, setPenaltyTheme] = useState<PenaltyTheme>('Drink');
  const [isApp, setIsApp] = useState(true);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const dangerIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    setIsApp(urlParams.get('app') === 'true');
    
    return () => cleanupTimers();
  }, []);

  const cleanupTimers = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (dangerIntervalRef.current) clearInterval(dangerIntervalRef.current);
  };

  const cycleTheme = () => {
    if (phase !== 'idle') return;
    setPenaltyTheme(prev => PENALTY_THEMES[(PENALTY_THEMES.indexOf(prev) + 1) % PENALTY_THEMES.length]);
  };

  const startCore = () => {
    cleanupTimers();
    setPassCount(0);
    setDangerLevel(0);
    setPhase('active');

    // Random duration between 5 to 15 seconds
    const duration = Math.floor(Math.random() * 10000) + 5000;
    const startTime = Date.now();

    // The hidden bomb timer
    timerRef.current = setTimeout(() => {
      triggerMeltdown();
    }, duration);

    // The UI intensity updater
    dangerIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, (elapsed / duration) * 100);
      setDangerLevel(progress);

      // Heartbeat vibration that gets faster as danger rises
      if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
        if (Math.random() > (1 - progress / 100)) {
          window.navigator.vibrate(20 + progress / 2);
        }
      }
    }, 100);
  };

  const passCore = () => {
    if (phase !== 'active') return;
    setPassCount(c => c + 1);
    
    // Quick confirm vibration for passing
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const triggerMeltdown = () => {
    cleanupTimers();
    setPhase('meltdown');
    setDangerLevel(100);
    
    // Massive explosion vibration
    if (typeof window !== "undefined" && window.navigator && window.navigator.vibrate) {
      window.navigator.vibrate([300, 100, 300, 100, 500]);
    }
  };

  // Calculate dynamic styling based on danger level
  const coreColor = `rgb(${Math.min(255, dangerLevel * 2.5)}, ${Math.max(0, 200 - dangerLevel * 2)}, ${Math.max(0, 255 - dangerLevel * 2.5)})`;
  const shakeIntensity = (dangerLevel / 100) * 15; // Max shake in pixels

  return (
    <div className={`${isApp ? 'fixed inset-0 overflow-hidden' : 'min-h-screen pt-32 pb-12'} flex flex-col items-center w-full bg-slate-900 dark:bg-[#09090b] font-sans text-white overscroll-none selection:bg-transparent transition-colors duration-300 relative`}>
      
      {/* Background Danger Aura */}
      {phase === 'active' && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-100"
          style={{ 
            background: `radial-gradient(circle at center, rgba(239,68,68,${dangerLevel / 150}) 0%, transparent 70%)`,
            opacity: dangerLevel / 100 
          }}
        />
      )}

      {/* 1. TOP HEADER */}
      {!isApp && (
        <header className="w-full flex justify-between items-center px-6 py-4 border-b border-white/5 bg-black/50 backdrop-blur-md mb-4 max-w-7xl mx-auto rounded-2xl relative z-50">
          <Link href="/games" className="flex items-center gap-1.5 text-xs font-bold text-amber-500 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Core Meltdown</span>
        </header>
      )}

      {/* 2. HUD & STATUS */}
      <div className={`w-full px-6 flex flex-col gap-4 max-w-sm mx-auto relative z-40 ${isApp ? 'pt-[env(safe-area-inset-top)] mt-6' : ''}`}>
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Passes</span>
            <div className="flex items-center gap-2 text-2xl font-black text-amber-500">
              <Zap className="w-5 h-5" /> {passCount}
            </div>
          </div>
          
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Core Stability</span>
            <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full border ${
              phase === 'idle' ? 'bg-zinc-800 text-zinc-400 border-zinc-700' :
              phase === 'meltdown' ? 'bg-red-500/20 text-red-500 border-red-500/50 animate-pulse' :
              'bg-amber-500/20 text-amber-500 border-amber-500/50'
            }`}>
              {phase === 'idle' ? 'Offline' : phase === 'meltdown' ? 'Critical Failure' : 'Unstable'}
            </span>
          </div>
        </div>

        {/* Theme Selector */}
        <div className="flex justify-between items-center bg-zinc-900/50 border border-white/5 p-3 rounded-2xl shadow-sm">
          <div className="flex items-center gap-2">
            <Skull className="w-4 h-4 text-zinc-500" />
            <span className="text-xs font-bold text-zinc-300">Penalty Mode:</span>
          </div>
          <button 
            onClick={cycleTheme} 
            disabled={phase !== 'idle'}
            className="text-[11px] font-black uppercase tracking-widest text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg active:scale-95 disabled:opacity-50 transition-transform flex items-center gap-1.5"
          >
            {penaltyTheme} {penaltyTheme === 'Drink' ? '🥃' : penaltyTheme === 'Truth' ? '🤫' : penaltyTheme === 'Dare' ? '🎯' : '💥'}
          </button>
        </div>
      </div>

      {/* 3. THE GLOWING CORE */}
      <div className="flex-1 w-full flex items-center justify-center relative z-20">
        <motion.div
          animate={
            phase === 'active' 
              ? { x: [-shakeIntensity, shakeIntensity, -shakeIntensity], y: [-shakeIntensity, shakeIntensity, -shakeIntensity] } 
              : {}
          }
          transition={phase === 'active' ? { repeat: Infinity, duration: Math.max(0.05, 0.4 - dangerLevel / 300) } : {}}
          className="relative flex items-center justify-center w-64 h-64"
        >
          {/* Core Outer Glow */}
          <div 
            className={`absolute inset-0 rounded-full blur-3xl transition-colors duration-100`}
            style={{ backgroundColor: phase === 'meltdown' ? 'rgba(239,68,68,0.5)' : phase === 'active' ? coreColor : 'rgba(59,130,246,0.1)' }}
          />

          {/* The Physical Core Button */}
          <button
            onClick={phase === 'idle' ? startCore : passCore}
            className={`relative w-48 h-48 rounded-full border-4 flex items-center justify-center transition-all duration-100 shadow-[0_0_50px_rgba(0,0,0,0.5)] ${
              phase === 'idle' ? 'bg-zinc-900 border-blue-500/50 hover:bg-zinc-800' :
              phase === 'meltdown' ? 'bg-red-600 border-red-400' :
              'active:scale-95'
            }`}
            style={{
              backgroundColor: phase === 'active' ? coreColor : undefined,
              borderColor: phase === 'active' ? 'white' : undefined,
            }}
          >
            {/* Inner Ring Animation */}
            {phase === 'active' && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: Math.max(0.2, 1 - dangerLevel / 100) }}
                className="absolute inset-0 border-[8px] border-white/20 rounded-full"
              />
            )}
            
            <Radiation className={`w-20 h-20 ${phase === 'idle' ? 'text-blue-500' : phase === 'meltdown' ? 'text-white' : 'text-black'}`} />
          </button>
        </motion.div>
      </div>

      {/* 4. INSTRUCTIONS & ACTIONS */}
      <div className="w-full px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] h-32 flex flex-col items-center justify-center relative z-40">
        <AnimatePresence mode="wait">
          {phase === 'idle' ? (
            <motion.p 
              key="start"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="text-[12px] text-zinc-400 font-medium tracking-widest uppercase text-center max-w-[250px]"
            >
              Tap the core to start the timer.<br/>Pass it before it explodes!
            </motion.p>
          ) : phase === 'active' ? (
            <motion.p 
              key="pass"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="text-[18px] text-white font-black tracking-widest uppercase text-center animate-pulse drop-shadow-md"
            >
              TAP TO PASS!
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>

      {/* 5. MELTDOWN PENALTY MODAL */}
      <AnimatePresence>
        {phase === 'meltdown' && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-red-950/90 backdrop-blur-md p-6"
          >
            <motion.div 
              initial={{ scale: 0.8, y: 50 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="bg-black border-2 border-red-500 rounded-[2rem] p-8 max-w-sm w-full text-center shadow-[0_0_100px_rgba(239,68,68,0.5)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.2)_0%,transparent_100%)] animate-pulse pointer-events-none" />

              <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-red-500/50 relative z-10">
                <Skull className="w-12 h-12 text-red-500" />
              </div>
              
              <h2 className="text-3xl font-black text-white tracking-tight mb-2 relative z-10">
                MELTDOWN!
              </h2>
              
              <div className="bg-red-950 border border-red-500/50 p-6 rounded-2xl mb-8 mt-6 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-3 block">
                  Penalty Applied
                </span>
                <p className="text-xl font-black text-white">
                  {penaltyTheme === 'Drink' && "Take a shot! 🥃"}
                  {penaltyTheme === 'Truth' && "Reveal a Truth! 🤫"}
                  {penaltyTheme === 'Dare' && "Complete a Dare! 🎯"}
                  {penaltyTheme === 'Standard' && "You blew up the server. 💥"}
                </p>
              </div>

              <button 
                onClick={() => setPhase('idle')} 
                className="w-full py-4 bg-red-600 hover:bg-red-500 text-white font-black rounded-xl tracking-widest transition-transform active:scale-95 shadow-lg flex items-center justify-center gap-2 relative z-10"
              >
                <RotateCcw className="w-5 h-5" /> REBOOT CORE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}