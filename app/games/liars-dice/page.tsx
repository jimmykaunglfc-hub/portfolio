"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { Settings, Volume2, VolumeX, RotateCcw, List, Box, ChevronDown, Info, X } from "lucide-react";

// Helper to generate random dice
const rollDice = (count: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
};

// CSS-based authentic Asian Dice face generator (1 & 4 Red, others Blue)
const DiceFace = ({ value, index }: { value: number; index: number }) => {
  const rotation = useRef(Math.random() * 40 - 20).current;
  const offsetX = useRef(Math.random() * 16 - 8).current;
  const offsetY = useRef(Math.random() * 16 - 8).current;

  const renderDots = () => {
    switch (value) {
      case 1:
        return (
          <div className="flex items-center justify-center w-full h-full">
            <div className="w-5 h-5 bg-red-600 rounded-full shadow-[inset_0_2px_4px_rgba(153,27,27,0.8)]" />
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col justify-between items-center w-full h-full p-1.5">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)] self-end" />
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)] self-start" />
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col justify-between items-center w-full h-full p-1.5">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)] self-end" />
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)]" />
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)] self-start" />
          </div>
        );
      case 4:
        return (
          <div className="grid grid-cols-2 grid-rows-2 gap-1.5 w-full h-full p-1.5 place-items-center">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-red-600 rounded-full shadow-[inset_0_2px_3px_rgba(153,27,27,0.8)]" />
            ))}
          </div>
        );
      case 5:
        return (
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full p-1 place-items-center">
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)] col-start-1 row-start-1" />
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)] col-start-3 row-start-1" />
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)] col-start-2 row-start-2" />
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)] col-start-1 row-start-3" />
            <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)] col-start-3 row-start-3" />
          </div>
        );
      case 6:
        return (
          <div className="grid grid-cols-2 grid-rows-3 gap-x-2 gap-y-1 w-full h-full p-1 place-items-center">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[inset_0_2px_3px_rgba(30,64,175,0.8)]" />
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
      className="w-12 h-12 bg-gradient-to-br from-zinc-50 to-zinc-300 rounded-xl shadow-[inset_0_-4px_8px_rgba(0,0,0,0.15),_0_8px_15px_rgba(0,0,0,0.6)] flex items-center justify-center border border-white"
    >
      {renderDots()}
    </motion.div>
  );
};

export default function LiarsDicePage() {
  const [diceCount, setDiceCount] = useState(5);
  const [diceValues, setDiceValues] = useState<number[]>(rollDice(5));
  const [isRolling, setIsRolling] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  
  const cupControls = useAnimation();
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

    await cupControls.start({
      x: [-15, 15, -20, 20, -10, 10, -5, 5, 0],
      y: [0, -5, 0, -5, 0, -2, 0], // Slight jumping while shaking
      transition: { duration: 0.5 }
    });

    setDiceValues(rollDice(diceCount));
    setIsRolling(false);
  };

  // Dynamically cycles dice count from 1 to 5
  const handleDiceCountChange = () => {
    const newCount = diceCount === 5 ? 1 : diceCount + 1;
    setDiceCount(newCount);
    setDiceValues(rollDice(newCount));
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
    <div className="flex flex-col items-center w-full min-h-screen bg-[#09090b] font-sans text-white overflow-hidden relative selection:bg-transparent">
      
      {/* 1. TOP HEADER */}
      <div className="w-full flex justify-between items-center px-6 py-4 relative z-50">
        <button onClick={() => setIsRulesOpen(true)} className="text-zinc-400 hover:text-white transition-colors">
          <Info className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Dice Count</span>
          <button onClick={handleDiceCountChange} className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm active:scale-95 transition-transform">
            {diceCount} <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>
        </div>

        <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-zinc-400 hover:text-white transition-colors">
          {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 text-zinc-600" />}
        </button>
      </div>

      {/* 2. THE GAME STAGE */}
      <div className="flex-1 w-full relative flex items-center justify-center">
        
        {/* The Dice (Underneath) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-48 h-48 flex flex-wrap justify-center items-center content-center gap-3 px-4">
          {diceValues.map((val, idx) => (
            <DiceFace key={`${idx}-${val}`} value={val} index={idx} />
          ))}
        </div>

        {/* The 3D Professional Draggable Cup */}
        <motion.div
          drag="y"
          dragConstraints={{ top: -280, bottom: 0 }}
          dragElastic={0} // 0 Elasticity means it stops exactly where your finger is
          animate={cupControls}
          onDragEnd={(e, info) => {
            // Snaps open or closed based on velocity and release position
            if (info.offset.y < -120 || info.velocity.y < -500) {
              cupControls.start({ y: -260, transition: { type: "spring", bounce: 0.3 } });
            } else {
              cupControls.start({ y: 0, transition: { type: "spring", bounce: 0.3 } });
            }
          }}
          className="relative z-30 w-56 h-64 cursor-grab active:cursor-grabbing touch-none flex flex-col justify-end"
          style={{ touchAction: "none" }}
        >
          {/* Main Cup Cylinder Layer */}
          <div className="w-full h-full bg-gradient-to-r from-[#111111] via-[#2a2a2a] to-[#0a0a0a] rounded-t-[45px] rounded-b-[15px] shadow-[inset_0_0_20px_rgba(0,0,0,0.8),_0_30px_60px_rgba(0,0,0,0.9)] relative overflow-hidden flex flex-col justify-end border-t border-zinc-700">
            
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:6px_6px]" />
            
            {/* 3D Lip / Base of the cup */}
            <div className="relative w-full h-8 bg-gradient-to-r from-[#0a0a0a] via-[#333333] to-[#0a0a0a] rounded-b-[15px] border-b-[3px] border-blue-600 shadow-[0_5px_20px_rgba(37,99,235,0.6)] flex items-end">
               <div className="w-full h-2 bg-blue-500/20 rounded-b-[15px]" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* 3. BOTTOM CONTROLS */}
      <div className="w-full px-6 pb-12 z-50 flex flex-col items-center gap-4 bg-gradient-to-t from-[#09090b] via-[#09090b] to-transparent pt-10">
        
        {/* Helper Text */}
        <p className="text-[11px] text-zinc-500 font-medium tracking-widest uppercase mb-2">
          Pull cup to peek • Tap to roll
        </p>

        {/* Constant 3D Physical Shake Button */}
        <button 
          onClick={triggerRoll}
          disabled={isRolling}
          className="w-full max-w-[280px] bg-blue-600 text-white font-black py-4 rounded-2xl tracking-widest transition-all
            shadow-[0_6px_0_#1e3a8a,_0_15px_20px_rgba(0,0,0,0.4)] 
            active:shadow-[0_0px_0_#1e3a8a,_0_0px_0px_rgba(0,0,0,0)] 
            active:translate-y-[6px] disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isRolling ? "SHAKING..." : "SHAKE DICE"}
        </button>

        {/* Quick Actions Dock */}
        <div className="grid grid-cols-3 gap-4 w-full max-w-[280px] mt-6">
          <button onClick={triggerRoll} className="flex flex-col items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors">
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800"><RotateCcw className="w-5 h-5" /></div>
            <span className="text-[9px] font-bold uppercase tracking-wider">Roll Again</span>
          </button>
          <button className="flex flex-col items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors">
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800"><List className="w-5 h-5" /></div>
            <span className="text-[9px] font-bold uppercase tracking-wider">History</span>
          </button>
          <button className="flex flex-col items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors">
            <div className="p-3 rounded-2xl bg-zinc-900 border border-zinc-800"><Box className="w-5 h-5" /></div>
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
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 w-full max-w-sm shadow-2xl relative"
            >
              <button onClick={() => setIsRulesOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white bg-zinc-800 p-1.5 rounded-full">
                <X className="w-5 h-5" />
              </button>
              
              <h2 className="text-xl font-black text-white tracking-tight mb-4">Liar's Dice Rules</h2>
              
              <div className="space-y-4 text-sm text-zinc-400 leading-relaxed max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                <p>
                  <strong className="text-white">1. The Setup:</strong> Each player needs their own app/device. Everyone shakes their dice and keeps their cup closed.
                </p>
                <p>
                  <strong className="text-white">2. Peeking:</strong> Slowly drag your cup upward to secretly check your dice. Do not let others see!
                </p>
                <p>
                  <strong className="text-white">3. Bidding:</strong> The first player makes a bid guessing the <em>total</em> number of a specific dice face under <em>all</em> players' cups combined (e.g., "There are at least four 3s").
                </p>
                <p>
                  <strong className="text-white">4. Raising or Calling:</strong> The next player must either raise the bid (e.g., "Five 3s" or "Four 4s") or call the previous player a <strong>"Liar!"</strong>
                </p>
                <p>
                  <strong className="text-white">5. The Reveal:</strong> If "Liar!" is called, everyone lifts their cups. If the total dice match or exceed the bid, the challenger loses a die. If not, the bidder loses a die.
                </p>
                <div className="p-3 bg-blue-900/20 border border-blue-900/50 rounded-xl mt-4">
                  <span className="text-blue-400 font-bold block mb-1">Wildcards:</span>
                  1s (the big red dots) count as wildcards and can represent any number, unless a player specifically bids on 1s!
                </div>
              </div>
              
              <button 
                onClick={() => setIsRulesOpen(false)} 
                className="w-full mt-6 bg-white text-black font-bold py-3 rounded-xl active:scale-95 transition-transform"
              >
                Got It
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}