"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Cpu, RefreshCcw, Download, Unlock } from "lucide-react";
import Link from "next/link";

export default function NeuralDecrypt() {
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerSequence, setPlayerSequence] = useState<number[]>([]);
  const [level, setLevel] = useState(1);
  const [isShowingSequence, setIsShowingSequence] = useState(false);
  const [activeNode, setActiveNode] = useState<number | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  const MAX_LEVEL = 4;

  const startLevel = (currentLevel: number) => {
    const newSequence = Array.from({ length: currentLevel + 2 }, () => Math.floor(Math.random() * 9));
    setSequence(newSequence);
    setPlayerSequence([]);
    setIsShowingSequence(true);
    setIsGameOver(false);
  };

  useEffect(() => {
    if (!isShowingSequence || sequence.length === 0) return;
    let i = 0;
    const interval = setInterval(() => {
      setActiveNode(sequence[i]);
      setTimeout(() => setActiveNode(null), 400);
      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(() => setIsShowingSequence(false), 500);
      }
    }, 800);
    return () => clearInterval(interval);
  }, [isShowingSequence, sequence]);

  const handleNodeClick = (index: number) => {
    if (isShowingSequence || isGameOver || isWin) return;
    
    setActiveNode(index);
    setTimeout(() => setActiveNode(null), 200);

    const newPlayerSeq = [...playerSequence, index];
    setPlayerSequence(newPlayerSeq);

    const currentIndex = newPlayerSeq.length - 1;
    if (newPlayerSeq[currentIndex] !== sequence[currentIndex]) {
      setIsGameOver(true);
      return;
    }

    if (newPlayerSeq.length === sequence.length) {
      if (level === MAX_LEVEL) {
        setIsWin(true);
      } else {
        setTimeout(() => {
          setLevel(prev => prev + 1);
          startLevel(level + 1);
        }, 1000);
      }
    }
  };

  const downloadNeuralBadge = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200; canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#1e1b4b"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "#06b6d4"; 
    ctx.lineWidth = 8;
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80);

    ctx.strokeStyle = "#a855f7"; 
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    ctx.fillStyle = "#06b6d4";
    ctx.fillRect(30, 30, 20, 20); ctx.fillRect(canvas.width - 50, 30, 20, 20);
    ctx.fillRect(30, canvas.height - 50, 20, 20); ctx.fillRect(canvas.width - 50, canvas.height - 50, 20, 20);

    ctx.textAlign = "center";
    ctx.fillStyle = "#a855f7";
    ctx.font = "bold 25px monospace";
    ctx.letterSpacing = "10px";
    ctx.fillText("NEURAL NETWORK OVERRIDE", canvas.width / 2, 180);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 85px sans-serif";
    ctx.fillText("MASTER NETRUNNER", canvas.width / 2, 320);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "28px monospace";
    ctx.fillText("> System security successfully bypassed.", canvas.width / 2, 440);
    ctx.fillText("> Complex logical patterns deciphered.", canvas.width / 2, 480);
    ctx.fillText("> Mainframe access granted.", canvas.width / 2, 520);

    ctx.fillStyle = "#06b6d4";
    ctx.font = "bold 40px monospace";
    ctx.fillText("{ STATUS: FIREWALL BREACHED }", canvas.width / 2, 630);

    const date = new Date().toLocaleDateString("en-US");
    ctx.fillStyle = "#6366f1";
    ctx.font = "20px monospace";
    ctx.fillText(`SYS.DATE: ${date}`, canvas.width / 2, 720);

    const link = document.createElement("a");
    link.download = "Neural-Decrypt-Badge.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10 font-sans">
      <div className="mb-12">
        <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-cyan-500 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Arcade
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-4">
            <Cpu className="w-10 h-10 text-cyan-500" />
            Neural <span className="text-cyan-500">Decrypt</span>
          </h1>
          <div className="text-right">
            <div className="text-sm font-bold text-gray-500 uppercase tracking-widest">Firewall Level</div>
            <div className="text-2xl font-black text-cyan-500">{level} / {MAX_LEVEL}</div>
          </div>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-4">
          Memorize the node sequence and repeat it to breach the firewall.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {(isWin || isGameOver) && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className={`mb-8 p-6 border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-lg ${isWin ? 'bg-cyan-500/10 border-cyan-500/30' : 'bg-red-500/10 border-red-500/30'}`}>
            <div className="flex items-center gap-4">
              <Unlock className={`w-8 h-8 ${isWin ? 'text-cyan-500' : 'text-red-500'}`} />
              <div>
                <h3 className={`font-bold text-lg ${isWin ? 'text-cyan-500' : 'text-red-500'}`}>
                  {isWin ? "Mainframe Accessed!" : "Connection Terminated"}
                </h3>
                <p className={`text-sm ${isWin ? 'text-cyan-600 dark:text-cyan-400' : 'text-red-600 dark:text-red-400'}`}>
                  {isWin ? "You successfully bypassed all security nodes." : "Incorrect sequence detected."}
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              {isWin && (
                <button onClick={downloadNeuralBadge} className="flex items-center justify-center gap-2 bg-transparent text-cyan-600 dark:text-cyan-400 border-2 border-cyan-500 px-6 py-3 rounded-full font-bold text-sm hover:bg-cyan-500/10 transition-colors shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                  <Download className="w-4 h-4" /> Netrunner Badge
                </button>
              )}
              <button onClick={() => { setLevel(1); setIsWin(false); startLevel(1); }} className={`flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white transition-colors ${isWin ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-red-500 hover:bg-red-600'}`}>
                <RefreshCcw className="w-4 h-4" /> Restart Hack
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-md mx-auto">
        {!isWin && !isGameOver && sequence.length === 0 ? (
          <div className="text-center">
            <button onClick={() => startLevel(1)} className="px-8 py-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold rounded-full text-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all hover:scale-105">
              Initialize Breach
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, index) => (
              <div 
                key={index} 
                onClick={() => handleNodeClick(index)}
                className={`aspect-square rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                  activeNode === index 
                    ? 'bg-cyan-500 border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.8)] scale-95' 
                    : 'bg-slate-900 border-slate-700 hover:border-cyan-500/50'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}