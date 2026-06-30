"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Settings, Volume2, VolumeX, RotateCcw, Box, ChevronDown, Info, X } from "lucide-react";

// Helper to generate random dice
const rollDice = (count: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
};

// 🎨 Dynamic Themes Configuration
const THEMES = [
  { 
    id: 'classic', name: 'Classic Black', 
    cupBody: 'from-zinc-800 via-zinc-900 to-black', cupRim: 'from-blue-500 to-blue-700 border-blue-400', 
    diceBg: 'from-zinc-50 to-zinc-300', dotBlue: 'bg-blue-600 shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)]', dotRed: 'bg-red-600 shadow-[inset_0_2px_3px_rgba(153,27,27,0.8)]' 
  },
  { 
    id: 'crimson', name: 'Crimson Leather', 
    cupBody: 'from-red-900 via-[#450a0a] to-black', cupRim: 'from-amber-400 to-amber-600 border-amber-300', 
    diceBg: 'from-amber-50 to-amber-200', dotBlue: 'bg-zinc-900 shadow-[inset_0_2px_3px_rgba(0,0,0,0.8)]', dotRed: 'bg-red-700 shadow-[inset_0_2px_3px_rgba(153,27,27,0.8)]' 
  },
  { 
    id: 'jade', name: 'Royal Jade', 
    cupBody: 'from-emerald-900 via-[#064e3b] to-black', cupRim: 'from-emerald-400 to-emerald-600 border-emerald-300', 
    diceBg: 'from-emerald-50 to-emerald-100', dotBlue: 'bg-emerald-900 shadow-[inset_0_2px_3px_rgba(6,78,59,0.8)]', dotRed: 'bg-rose-600 shadow-[inset_0_2px_3px_rgba(225,29,72,0.8)]' 
  }
];

// CSS-based authentic Asian Dice face generator (1 & 4 Red, others Blue/Themed)
const DiceFace = ({ value, index, theme }: { value: number; index: number; theme: any }) => {
  const rotation = useRef(Math.random() * 40 - 20).current;
  const offsetX = useRef(Math.random() * 16 - 8).current;
  const offsetY = useRef(Math.random() * 16 - 8).current;

  const renderDots = () => {
    switch (value) {
      case 1:
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className={`w-5 h-5 rounded-full ${theme.dotRed}`} />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-between items-center w-full h-full p-1.5">
            <div className={`w-2.5 h-2.5 rounded-full self-end ${theme.dotBlue}`} />
            <div className={`w-2.5 h-2.5 rounded-full self-start ${theme.dotBlue}`} />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col justify-between items-center w-full h-full p-1.5">
            <div className={`w-2.5 h-2.5 rounded-full self-end ${theme.dotBlue}`} />
            <div className={`w-2.5 h-2.5 rounded-full ${theme.dotBlue}`} />
            <div className={`w-2.5 h-2.5 rounded-full self-start ${theme.dotBlue}`} />
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-1.5 w-full h-full p-1.5 place-items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${theme.dotRed}`} />
            ))}
          </div>
        );
      case 5:
        return (
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-1 place-items-center">
            <div className={`w-2.5 h-2.5 rounded-full col-start-1 row-start-1 ${theme.dotBlue}`} />
            <div className={`w-2.5 h-2.5 rounded-full col-start-3 row-start-1 ${theme.dotBlue}`} />
            <div className={`w-2.5 h-2.5 rounded-full col-start-2 row-start-2 ${theme.dotBlue}`} />
            <div className={`w-2.5 h-2.5 rounded-full col-start-1 row-start-3 ${theme.dotBlue}`} />
            <div className={`w-2.5 h-2.5 rounded-full col-start-3 row-start-3 ${theme.dotBlue}`} />
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-2 grid-rows-3 gap-x-2 gap-y-1 w-full h-full p-1 place-items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className={`w-2.5 h-2.5 rounded-full ${theme.dotBlue}`} />
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, rotate: rotation, x: offsetX, y: offsetY }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
      className={`w-12 h-12 bg-gradient-to-br ${theme.diceBg} rounded-xl shadow-[inset_0_-4px_8px_rgba(0,0,0,0.15),_0_8px_15px_rgba(0,0,0,0.4)] flex items-center justify-center border border-white/50`}
    >
      {renderDots()}
    </motion.div>
  );
};

export default function LiarsDicePage() {
  const [diceCount, setDiceCount] = useState(5);
  const [diceValues, setDiceValues] = useState<number[]>(rollDice(5));
  const [isCupOpen, setIsCupOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [themeIndex, setThemeIndex] = useState(0);
  
  const cupControls = useAnimation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeTheme = THEMES[themeIndex];

  useEffect(() => {
    audioRef.current = new Audio('/sounds/dice-shake.mp3'); 
  }, []);

  const triggerRoll = async () => {
    if (isRolling) return;
    
    setIsRolling(true);
    if (soundEnabled && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    // Force cup down if it was open, then shake
    await cupControls.start({ y: 0, transition: { type: "spring", bounce: 0.2 } });
    setIsCupOpen(false);

    await cupControls.start({
      x: [-15, 15, -20, 20, -10, 10, -5, 5, 0],
      y: [0, -5, 0, -5, 0, -2, 0], // Slight jumping while shaking
      transition: { duration: 0.5 }
    });

    setDiceValues(rollDice(diceCount));
    setIsRolling(false);
  };

  const toggleCup = () => {
    if (isCupOpen) {
      cupControls.start({ y: 0, transition: { type: "spring", bounce: 0.3, duration: 0.5 } });
      setIsCupOpen(false);
    } else {
      cupControls.start({ y: -220, transition: { type: "spring", bounce: 0.4, duration: 0.5 } });
      setIsCupOpen(true);
    }
  };

  const handleDiceCountChange = () => {
    const newCount = diceCount === 5 ? 1 : diceCount + 1;
    setDiceCount(newCount);
    setDiceValues(rollDice(newCount));
  };

  const cycleTheme = () => {
    setThemeIndex((prev) => (prev + 1) % THEMES.length);
  };

  // Hardware Shake Detection
  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      if (!event.accelerationIncludingGravity) return;
      const { x, y, z } = event.accelerationIncludingGravity;
      if (x && y && z) {
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        if (acceleration > 20 && !isRolling) {
          triggerRoll();
        }
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [isRolling, diceCount]);

  return (
    // 'fixed inset-0 overscroll-none' prevents the background from bouncing when dragging the cup
    <div className="fixed inset-0 flex flex-col items-center w-full h-full bg-slate-50 dark:bg-[#09090b] font-sans text-slate-900 dark:text-white overflow-hidden overscroll-none selection:bg-transparent transition-colors duration-300">
      
      {/* 1. TOP HEADER */}
      <div className="w-full flex justify-between items-center px-6 py-4 relative z-50 pt-[env(safe-area-inset-top)]">
        <button onClick={() => setIsRulesOpen(true)} className="text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
          <Info className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-500 dark:text-zinc-500 uppercase tracking-widest font-bold mb-1">Dice Count</span>
          <button onClick={handleDiceCountChange} className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-all">
            {diceCount} <ChevronDown className="w-3 h-3 text-slate-400 dark:text-zinc-500" />
          </button>
        </div>

        <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors">
          {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 text-slate-300 dark:text-zinc-600" />}
        </button>
      </div>

      {/* 2. THE GAME STAGE */}
      <div className="flex-1 w-full relative flex items-center justify-center -mt-10">
        
        {/* The Dice (Underneath) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-48 h-48 flex flex-wrap justify-center items-center content-center gap-3 px-4">
          {diceValues.map((val, idx) => (
            <DiceFace key={`${idx}-${val}`} value={val} index={idx} theme={activeTheme} />
          ))}
        </div>

        {/* The 3D Professional Draggable Cup */}
        <motion.div
          drag="y"
          dragConstraints={{ top: -200, bottom: 0 }} // Limits how high it can be pulled
          dragElastic={0.05} // Low elasticity makes it easy to pull
          dragMomentum={false} // Stops it from flying away when released
          animate={cupControls}
          onDragEnd={(e, info) => {
            // Very forgiving snap logic: if pulled up slightly, it opens
            if (info.offset.y < -50 || info.velocity.y < -200) {
              cupControls.start({ y: -220, transition: { type: "spring", bounce: 0.25 } });
              setIsCupOpen(true);
            } else {
              cupControls.start({ y: 0, transition: { type: "spring", bounce: 0.3 } });
              setIsCupOpen(false);
            }
          }}
          className="relative z-30 w-[14rem] h-[17rem] cursor-grab active:cursor-grabbing touch-none flex flex-col justify-end perspective-1000"
          style={{ touchAction: "none" }} // Prevents mobile scrolling when dragging
        >
          {/* Main 3D Cup Cylinder */}
          <div className={`w-full h-full bg-gradient-to-r ${activeTheme.cupBody} rounded-t-[40px] rounded-b-[15px] shadow-[inset_0_0_20px_rgba(0,0,0,0.8),_0_40px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col justify-end border-t border-white/5`}>
            
            {/* Top Ellipse to simulate 3D cylinder opening facing down */}
            <div className="absolute -top-3 left-0 w-full h-8 bg-gradient-to-b from-white/10 to-transparent rounded-[50%]" />
            
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />
            
            {/* 3D Lip / Glowing Base of the cup */}
            <div className={`relative w-full h-8 bg-gradient-to-r ${activeTheme.cupRim} rounded-b-[15px] border-b-[3px] shadow-[0_5px_20px_rgba(0,0,0,0.6)] flex items-end`}>
               <div className="w-full h-2 bg-white/20 rounded-b-[15px]" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. BOTTOM CONTROLS */}
      <div className="w-full px-6 pb-[calc(2rem+env(safe-area-inset-bottom))] z-50 flex flex-col items-center gap-4 pt-10">
        
        <p className="text-[11px] text-slate-500 dark:text-zinc-500 font-medium tracking-widest uppercase mb-2">
          Pull cup to peek • Tap to roll
        </p>

        {/* Constant Physical Shake Button */}
        <button 
          onClick={triggerRoll}
          disabled={isRolling}
          className="w-full max-w-[280px] bg-blue-600 text-white font-black py-4 rounded-2xl tracking-widest transition-all
            shadow-[0_6px_0_#1e3a8a,_0_15px_20px_rgba(37,99,235,0.3)] 
            active:shadow-[0_0px_0_#1e3a8a,_0_0px_0px_rgba(0,0,0,0)] 
            active:translate-y-[6px] disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isRolling ? "SHAKING..." : "SHAKE DICE"}
        </button>

        <button 
          onClick={toggleCup}
          className="w-full max-w-[280px] bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-800 active:scale-95 text-slate-700 dark:text-zinc-300 font-bold py-4 rounded-2xl transition-all tracking-wider flex items-center justify-center shadow-sm"
        >
          {isCupOpen ? "CLOSE CUP" : "OPEN CUP"}
        </button>

        {/* Quick Actions Dock */}
        <div className="grid grid-cols-2 gap-4 w-full max-w-[280px] mt-4">
          <button onClick={triggerRoll} className="flex flex-col items-center gap-2 text-slate-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors group">
            <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm group-active:scale-90 transition-transform"><RotateCcw className="w-5 h-5" /></div>
            <span className="text-[9px] font-bold uppercase tracking-wider">Roll Again</span>
          </button>
          <button onClick={cycleTheme} className="flex flex-col items-center gap-2 text-slate-500 dark:text-zinc-500 hover:text-blue-600 dark:hover:text-blue-500 transition-colors group">
            <div className="p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-sm group-active:scale-90 transition-transform"><Box className="w-5 h-5" /></div>
            <span className="text-[9px] font-bold uppercase tracking-wider">Themes</span>
          </button>
        </div>
      </div>

      {/* 4. RULES MODAL OVERLAY */}
      <AnimatePresence>
        {isRulesOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative"
            >
              <button onClick={() => setIsRulesOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:text-zinc-500 dark:hover:text-white bg-slate-100 dark:bg-zinc-800 p-1.5 rounded-full transition-colors">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-4 flex items-center gap-2">
                Liar's Dice Rules
              </h2>
              
              <div className="space-y-5 text-[13px] text-slate-600 dark:text-zinc-400 leading-relaxed max-h-[55vh] overflow-y-auto pr-2 custom-scrollbar">
                
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1">1. The Setup</strong>
                  Each player uses their own device. Set your agreed dice count (usually 5). Everyone hits <strong className="text-blue-600 dark:text-blue-400">SHAKE DICE</strong> and keeps their cup closed.
                </div>
                
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1">2. Secret Peeking</strong>
                  Slowly drag your cup upward to peek at your roll. <strong className="text-red-500">Do not let others see!</strong>
                </div>
                
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1">3. The First Bid</strong>
                  The starting player guesses the <em>total</em> number of a specific dice face under <em>all players' cups combined</em>. (e.g., "I bet there are at least four 3s total").
                </div>
                
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1">4. Raising the Stakes</strong>
                  Moving clockwise, the next player must either:
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-500 dark:text-zinc-500">
                    <li>Raise the quantity (e.g., "Five 3s")</li>
                    <li>Raise the face value (e.g., "Four 4s")</li>
                    <li>Call the previous player a <strong className="text-red-500">"Liar!"</strong></li>
                  </ul>
                </div>

                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1">5. The Reveal</strong>
                  If "Liar!" is called, everyone opens their cups. Count the dice!
                  <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-500 dark:text-zinc-500">
                    <li>If the bid was true (there are enough dice), the challenger loses a die.</li>
                    <li>If the bid was a lie (not enough dice), the bidder loses a die.</li>
                  </ul>
                </div>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 rounded-2xl mt-4">
                  <span className="text-blue-700 dark:text-blue-400 font-black tracking-widest uppercase text-[10px] block mb-1">Advanced Rule: Wildcards</span>
                  <p className="text-slate-700 dark:text-blue-200/80">1s (the big red dots) count as wildcards! They represent any number... unless a player specifically bids on 1s.</p>
                </div>

              </div>
              
              <button 
                onClick={() => setIsRulesOpen(false)} 
                className="w-full mt-6 bg-slate-900 dark:bg-white text-white dark:text-black font-bold py-3.5 rounded-xl active:scale-95 transition-transform"
              >
                Close Rulebook
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}