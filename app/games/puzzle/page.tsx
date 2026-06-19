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

  // --- PREMIUM CERTIFICATE GENERATOR ENGINE ---
  const downloadNeuralBadge = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600; 
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Premium Deep Indigo Background
    const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    bgGrad.addColorStop(0, "#1e1b4b"); // Indigo 950
    bgGrad.addColorStop(1, "#020617"); // Slate 950
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Glowing Cyan Thin Border
    ctx.strokeStyle = "#06b6d4"; 
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    // Tech Corner Brackets
    ctx.strokeStyle = "#06b6d4";
    ctx.lineWidth = 10;
    const s = 40; // size
    // Top Left
    ctx.beginPath(); ctx.moveTo(80, 80+s); ctx.lineTo(80, 80); ctx.lineTo(80+s, 80); ctx.stroke();
    // Top Right
    ctx.beginPath(); ctx.moveTo(canvas.width-80-s, 80); ctx.lineTo(canvas.width-80, 80); ctx.lineTo(canvas.width-80, 80+s); ctx.stroke();
    // Bottom Left
    ctx.beginPath(); ctx.moveTo(80, canvas.height-80-s); ctx.lineTo(80, canvas.height-80); ctx.lineTo(80+s, canvas.height-80); ctx.stroke();
    // Bottom Right
    ctx.beginPath(); ctx.moveTo(canvas.width-80-s, canvas.height-80); ctx.lineTo(canvas.width-80, canvas.height-80); ctx.lineTo(canvas.width-80, canvas.height-80-s); ctx.stroke();

    // DRAW GAME ICON (Cpu)
    ctx.save();
    ctx.translate(canvas.width / 2 - 60, 130); // Position at top center
    ctx.scale(5, 5); // Scale up a standard 24x24 SVG
    ctx.strokeStyle = "#06b6d4";
    ctx.lineWidth = 1.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    // Native Lucide 'Cpu' SVG Paths
    const box = new Path2D("M6 4h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z");
    const inner = new Path2D("M9 9h6v6H9z");
    const pins = new Path2D("M9 1v3 M15 1v3 M9 20v3 M15 20v3 M20 9h3 M20 14h3 M1 9h3 M1 14h3");
    ctx.stroke(box);
    ctx.stroke(inner);
    ctx.stroke(pins);
    ctx.restore();

    // Typography
    ctx.textAlign = "center";
    (ctx as any).letterSpacing = "12px";
    ctx.fillStyle = "#a855f7"; // Purple 500
    ctx.font = "bold 26px monospace";
    ctx.fillText("NEURAL NETWORK OVERRIDE", canvas.width / 2, 360);

    (ctx as any).letterSpacing = "6px";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 90px sans-serif";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#06b6d4"; // Glowing Title
    ctx.fillText("MASTER NETRUNNER", canvas.width / 2, 480);
    ctx.shadowBlur = 0; // Reset

    // Body Text (Properly Spaced)
    (ctx as any).letterSpacing = "0px";
    ctx.fillStyle = "#94a3b8"; // Slate 400
    ctx.font = "32px monospace";
    ctx.fillText("> System security successfully bypassed.", canvas.width / 2, 630);
    ctx.fillText("> Complex logical memory patterns deciphered.", canvas.width / 2, 690);
    ctx.fillText("> Mainframe access permanently granted.", canvas.width / 2, 750);

    // Status
    (ctx as any).letterSpacing = "4px";
    ctx.fillStyle = "#06b6d4"; // Cyan 500
    ctx.font = "bold 45px monospace";
    ctx.fillText("{ STATUS: FIREWALL BREACHED }", canvas.width / 2, 900);

    // Date
    (ctx as any).letterSpacing = "0px";
    const date = new Date().toLocaleDateString("en-US", { year: 'numeric', month: '2-digit', day: '2-digit' });
    ctx.fillStyle = "#6366f1"; // Indigo 500
    ctx.font = "24px monospace";
    ctx.fillText(`SYS.DATE: ${date}`, canvas.width / 2, 980);

    // LOAD FAVICON AS SIGNATURE AT BOTTOM
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/favicon.ico";
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      // Draw signature logo at bottom center
      ctx.drawImage(img, canvas.width / 2 - 40, 1030, 80, 80);
    } catch (e) {
      // Fallback text signature if image fails
      ctx.fillStyle = "#6366f1"; // Indigo 500
      ctx.font = "italic 20px sans-serif";
      ctx.fillText("AUTHORIZED BY: KHNCO.", canvas.width / 2, 1070);
    }

    // Execute Download (Mobile & Desktop Safe)
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      
      const fileName = "Neural-Decrypt-Master-Badge.png";
      const file = new File([blob], fileName, { type: "image/png" });

      // 1. Try Mobile Native Share (iOS/Android "Save Image" or "Share")
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'Master Netrunner!',
            text: 'Check out my Neural Decrypt Master Badge!',
          });
          return; // Stop here if native share works
        } catch (error) {
          console.log('Share cancelled or failed', error);
          // Fall through to standard download if cancelled
        }
      }

      // 2. Standard Desktop Fallback
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link); // CRITICAL: Required for iOS/Firefox fallback
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url); // Clean up memory
    }, "image/png");
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