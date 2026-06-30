"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { Settings, Volume2, VolumeX, RotateCcw, List, Box, ChevronDown } from "lucide-react";

// Helper to generate random dice
const rollDice = (count: number) => {
  return Array.from({ length: count }, () => Math.floor(Math.random() * 6) + 1);
};

// CSS-based realistic dice face generator
const DiceFace = ({ value, index }: { value: number; index: number }) => {
  const rotation = useRef(Math.random() * 40 - 20).current;
  const offsetX = useRef(Math.random() * 20 - 10).current;
  const offsetY = useRef(Math.random() * 20 - 10).current;

  const dots = [];
  for (let i = 0; i < value; i++) {
    dots.push(<div key={i} className="w-2.5 h-2.5 bg-zinc-900 rounded-full shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]" />);
  }

  let layoutClass = "";
  if (value === 1) layoutClass = "flex items-center justify-center";
  else if (value === 2) layoutClass = "flex justify-between p-1 items-center before:content-[''] after:content-[''] flex-col space-y-3";
  else if (value === 3) layoutClass = "flex justify-between p-1 flex-col items-center";
  else if (value === 4) layoutClass = "grid grid-cols-2 gap-1.5 p-1 place-items-center";
  else if (value === 5) layoutClass = "grid grid-cols-3 gap-0.5 p-1 place-items-center [&>*:nth-child(2)]:col-start-2 [&>*:nth-child(2)]:row-start-2";
  else if (value === 6) layoutClass = "grid grid-cols-2 gap-y-1.5 gap-x-2 p-1 place-items-center";

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1, rotate: rotation, x: offsetX, y: offsetY }}
      transition={{ type: "spring", stiffness: 300, damping: 20, delay: index * 0.05 }}
      className="w-12 h-12 bg-zinc-100 rounded-xl shadow-[inset_0_-4px_8px_rgba(0,0,0,0.2),_0_8px_15px_rgba(0,0,0,0.5)] flex items-center justify-center border-t border-white"
    >
      <div className={`w-full h-full ${layoutClass}`}>
        {dots}
      </div>
    </motion.div>
  );
};

export default function LiarsDicePage() {
  const [diceCount, setDiceCount] = useState(5);
  const [diceValues, setDiceValues] = useState<number[]>(rollDice(5));
  const [isCupOpen, setIsCupOpen] = useState(false);
  const [isRolling, setIsRolling] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
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

    if (isCupOpen) {
      await cupControls.start({ y: 0, transition: { type: "spring", bounce: 0.2 } });
      setIsCupOpen(false);
    }

    await cupControls.start({
      x: [-15, 15, -15, 15, -10, 10, -5, 5, 0],
      transition: { duration: 0.5 }
    });

    setDiceValues(rollDice(diceCount));
    setIsRolling(false);
  };

  const toggleCup = () => {
    if (isCupOpen) {
      cupControls.start({ y: 0, transition: { type: "spring", bounce: 0.2, duration: 0.6 } });
      setIsCupOpen(false);
    } else {
      cupControls.start({ y: -240, transition: { type: "spring", bounce: 0.3, duration: 0.6 } });
      setIsCupOpen(true);
    }
  };

  // Hardware Shake Detection
  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      if (!event.accelerationIncludingGravity) return;
      const { x, y, z } = event.accelerationIncludingGravity;
      if (x && y && z) {
        const acceleration = Math.sqrt(x * x + y * y + z * z);
        if (acceleration > 20 && !isRolling && !isCupOpen) {
          triggerRoll();
        }
      }
    };

    window.addEventListener("devicemotion", handleMotion);
    return () => window.removeEventListener("devicemotion", handleMotion);
  }, [isRolling, isCupOpen, diceCount]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#09090b] font-sans text-white overflow-hidden relative selection:bg-transparent">
      
      {/* 1. TOP HEADER */}
      <div className="w-full flex justify-between items-center px-6 py-4 relative z-50">
        <button className="text-zinc-400 hover:text-white transition-colors">
          <Settings className="w-6 h-6" />
        </button>
        
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mb-1">Dice Count</span>
          <button className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-4 py-1.5 rounded-full text-sm font-bold shadow-sm">
            {diceCount} <ChevronDown className="w-3 h-3 text-zinc-500" />
          </button>
        </div>

        <button onClick={() => setSoundEnabled(!soundEnabled)} className="text-zinc-400 hover:text-white transition-colors">
          {soundEnabled ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6 text-zinc-600" />}
        </button>
      </div>

      {/* 2. THE GAME STAGE */}
      <div className="flex-1 w-full relative flex items-center justify-center">
        
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-48 h-48 flex flex-wrap justify-center items-center content-center gap-3 px-4">
          {diceValues.map((val, idx) => (
            <DiceFace key={`${idx}-${val}`} value={val} index={idx} />
          ))}
        </div>

        <motion.div
          drag="y"
          dragConstraints={{ top: -280, bottom: 0 }}
          dragElastic={0.1}
          animate={cupControls}
          onDragEnd={(e, info) => {
            if (info.offset.y < -100 || info.velocity.y < -500) {
              cupControls.start({ y: -240 });
              setIsCupOpen(true);
            } else {
              cupControls.start({ y: 0 });
              setIsCupOpen(false);
            }
          }}
          className="relative z-30 w-56 h-64 cursor-grab active:cursor-grabbing touch-none"
          style={{ touchAction: "none" }}
        >
          <div className="w-full h-full bg-gradient-to-b from-zinc-700 via-zinc-900 to-black rounded-t-[3rem] rounded-b-[45px] shadow-[inset_0_10px_20px_rgba(255,255,255,0.1),_0_20px_50px_rgba(0,0,0,0.8)] border-x border-t border-zinc-700 relative overflow-hidden flex flex-col justify-end">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:8px_8px]" />
            <div className="w-full h-4 bg-gradient-to-b from-blue-600 to-blue-900 rounded-b-[45px] shadow-[0_10px_40px_rgba(37,99,235,0.8)]" />
          </div>
        </motion.div>
      </div>

      {/* 3. BOTTOM CONTROLS */}
      <div className="w-full px-6 pb-12 z-50 flex flex-col items-center gap-4 bg-gradient-to-t from-[#09090b] via-[#09090b] to-transparent pt-10">
        
        <p className="text-[11px] text-zinc-500 font-medium tracking-widest uppercase mb-2">
          {isCupOpen ? "Your Roll" : "Shake or tap to roll"}
        </p>

        {isCupOpen ? (
          <button 
            onClick={toggleCup}
            className="w-full max-w-[280px] bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold py-4 rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] tracking-wider"
          >
            CLOSE CUP
          </button>
        ) : (
          <button 
            onClick={triggerRoll}
            disabled={isRolling}
            className="w-full max-w-[280px] bg-blue-600 hover:bg-blue-500 active:scale-95 disabled:bg-blue-800 text-white font-bold py-4 rounded-full transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] tracking-wider"
          >
            {isRolling ? "SHAKING..." : "SHAKE DICE"}
          </button>
        )}

        <button 
          onClick={isCupOpen ? triggerRoll : toggleCup}
          className="w-full max-w-[280px] bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 active:scale-95 text-zinc-300 font-bold py-4 rounded-full transition-all tracking-wider flex items-center justify-center gap-2"
        >
          {isCupOpen ? "ROLL AGAIN" : "OPEN CUP"}
        </button>

        <div className="grid grid-cols-3 gap-4 w-full max-w-[280px] mt-4">
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

    </div>
  );
}