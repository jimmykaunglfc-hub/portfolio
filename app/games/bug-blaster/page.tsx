"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Target, RefreshCcw, CheckCircle2, Bug, ShieldAlert, Download, XCircle } from "lucide-react";
import Link from "next/link";

export default function BugBlaster() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [activeBug, setActiveBug] = useState<number | null>(null);

  const WIN_SCORE = 20;

  const startGame = () => {
    setScore(0);
    setTimeLeft(30);
    setIsPlaying(true);
    setIsGameOver(false);
  };

  const handleBugClick = (index: number) => {
    if (!isPlaying || index !== activeBug) return;
    setScore(prev => prev + 1);
    setActiveBug(null);
  };

  useEffect(() => {
    let bugInterval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      bugInterval = setInterval(() => {
        setActiveBug(Math.floor(Math.random() * 9));
      }, Math.max(400, 1000 - score * 30)); // Speeds up as score increases
    }
    return () => clearInterval(bugInterval);
  }, [isPlaying, timeLeft, score]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (timeLeft === 0 && isPlaying) {
      setIsPlaying(false);
      setIsGameOver(true);
      setActiveBug(null);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const downloadBugBlasterBadge = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200; canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#000000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "#39ff14"; 
    ctx.lineWidth = 15;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.fillStyle = "rgba(57, 255, 20, 0.05)";
    for(let i = 0; i < canvas.height; i += 10) {
      ctx.fillRect(0, i, canvas.width, 2);
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "#39ff14";
    ctx.font = "bold 35px monospace";
    ctx.letterSpacing = "5px";
    ctx.fillText("ARCADE DEFENSE FORCE", canvas.width / 2, 180);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 80px monospace";
    ctx.fillText("BUG BLASTER ELITE", canvas.width / 2, 320);

    ctx.fillStyle = "#a1a1aa";
    ctx.font = "30px sans-serif";
    ctx.fillText(`Awarded for blasting ${score} critical swarm defects`, canvas.width / 2, 450);
    ctx.fillText("and securing the production environment.", canvas.width / 2, 490);

    ctx.fillStyle = "#39ff14";
    ctx.font = "bold 40px monospace";
    ctx.fillText("STATUS: SECTOR CLEARED", canvas.width / 2, 600);

    const date = new Date().toLocaleDateString("en-US");
    ctx.fillStyle = "#a1a1aa";
    ctx.font = "20px monospace";
    ctx.fillText(`LOG DATE: ${date}`, canvas.width / 2, 700);

    const link = document.createElement("a");
    link.download = "Bug-Blaster-Badge.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const isWin = score >= WIN_SCORE;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 font-sans">
      <div className="mb-12">
        <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-green-500 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Arcade
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-4 mb-4">
          <Target className="w-10 h-10 text-green-500" />
          Bug <span className="text-green-500">Blaster</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Click the bugs before they escape. Score at least {WIN_SCORE} points before the 30-second timer runs out!
        </p>
      </div>

      {/* Game Over UI */}
      <AnimatePresence mode="wait">
        {isGameOver && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mb-8 p-6 border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg ${isWin ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <div className="flex items-center gap-4">
              {isWin ? <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" /> : <XCircle className="w-8 h-8 text-red-500 flex-shrink-0" />}
              <div>
                <h3 className={`font-bold text-lg ${isWin ? 'text-green-500' : 'text-red-500'}`}>
                  {isWin ? "Sector Cleared!" : "Production is Overrun!"}
                </h3>
                <p className={`text-sm ${isWin ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                  You blasted {score} bugs in 30 seconds.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {isWin && (
                <button onClick={downloadBugBlasterBadge} className="flex items-center justify-center gap-2 bg-transparent text-green-600 dark:text-green-400 border-2 border-green-500 px-6 py-3 rounded-full font-bold text-sm hover:bg-green-500/10 transition-colors shadow-[0_0_10px_rgba(34,197,94,0.3)]">
                  <Download className="w-4 h-4" /> Arcade Badge
                </button>
              )}
              <button onClick={startGame} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-colors shadow-lg ${isWin ? 'bg-green-500 hover:bg-green-600 shadow-green-500/20' : 'bg-red-500 hover:bg-red-600 shadow-red-500/20'}`}>
                <RefreshCcw className="w-4 h-4" /> Play Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Game Header */}
      <div className="flex justify-between items-center mb-8 bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 p-6 rounded-3xl shadow-xl">
        <div className="text-center">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Time Left</div>
          <div className={`text-4xl font-black ${timeLeft <= 10 && isPlaying ? 'text-red-500 animate-pulse' : 'text-gray-900 dark:text-white'}`}>00:{timeLeft.toString().padStart(2, '0')}</div>
        </div>
        {!isPlaying && !isGameOver && (
          <button onClick={startGame} className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-full text-lg shadow-lg shadow-green-500/30 transition-all hover:scale-105 active:scale-95">
            Start Protocol
          </button>
        )}
        <div className="text-center">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Score</div>
          <div className="text-4xl font-black text-green-500">{score}</div>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mx-auto">
        {Array.from({ length: 9 }).map((_, index) => (
          <div 
            key={index} 
            className="aspect-square bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl md:rounded-3xl shadow-sm overflow-hidden relative cursor-crosshair flex items-center justify-center"
            onClick={() => handleBugClick(index)}
          >
            <AnimatePresence>
              {activeBug === index && (
                <motion.div
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 20 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute inset-0 flex items-center justify-center bg-red-500/10 text-red-500"
                >
                  <Bug className="w-16 h-16 md:w-24 md:h-24 animate-bounce" />
                </motion.div>
              )}
            </AnimatePresence>
            {!isPlaying && !isGameOver && (
              <ShieldAlert className="w-8 h-8 text-gray-300 dark:text-gray-700 opacity-50" />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}