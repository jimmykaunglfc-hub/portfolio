"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Search, CheckCircle2, Download, RefreshCcw, AlertCircle } from "lucide-react";
import Link from "next/link";

const UI_DEFECTS = [
  { id: 1, type: "typo", element: "Submiting...", isDefect: true, description: "Spelling error on primary CTA" },
  { id: 2, type: "color", element: "Cancel", isDefect: false, description: "Valid secondary button" },
  { id: 3, type: "alignment", element: "UserAvatar", isDefect: true, description: "Profile image is broken" },
  { id: 4, type: "text", element: "Welcome Back", isDefect: false, description: "Standard header" },
  { id: 5, type: "contrast", element: "TOS Link", isDefect: true, description: "Text contrast fails accessibility standards" },
  { id: 6, type: "spacing", element: "Navbar", isDefect: false, description: "Valid navigation spacing" },
];

export default function QABugHunt() {
  const [foundBugs, setFoundBugs] = useState<number[]>([]);
  const totalBugs = UI_DEFECTS.filter(d => d.isDefect).length;
  const isWin = foundBugs.length === totalBugs;

  const handleIdentifyDefect = (defect: typeof UI_DEFECTS[0]) => {
    if (defect.isDefect && !foundBugs.includes(defect.id)) {
      setFoundBugs(prev => [...prev, defect.id]);
    }
  };

  const resetGame = () => {
    setFoundBugs([]);
  };

  const downloadQACertificate = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200; canvas.height = 800;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.fillStyle = "#0f172a"; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.strokeStyle = "#eab308"; 
    ctx.lineWidth = 20;
    ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);
    
    ctx.fillStyle = "#eab308";
    for(let i = 50; i < canvas.width - 50; i += 60) {
      ctx.beginPath();
      ctx.moveTo(i, 50); ctx.lineTo(i + 20, 50); ctx.lineTo(i - 10, 80); ctx.lineTo(i - 30, 80);
      ctx.fill();
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "#eab308";
    ctx.font = "bold 28px sans-serif";
    ctx.letterSpacing = "8px";
    ctx.fillText("QUALITY ASSURANCE DIVISION", canvas.width / 2, 200);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 75px sans-serif";
    ctx.fillText("CERTIFIED BUG HUNTER", canvas.width / 2, 320);

    ctx.fillStyle = "#94a3b8";
    ctx.font = "italic 32px sans-serif";
    ctx.fillText("This certifies that the user has a meticulous eye for detail and", canvas.width / 2, 450);
    ctx.fillText("successfully identified all visual and functional discrepancies.", canvas.width / 2, 495);

    ctx.fillStyle = "#eab308";
    ctx.font = "bold 45px sans-serif";
    ctx.fillText("PASSED: READY FOR PRODUCTION", canvas.width / 2, 600);

    const date = new Date().toLocaleDateString("en-US");
    ctx.fillStyle = "#64748b";
    ctx.font = "22px monospace";
    ctx.fillText(`QA SIGN-OFF DATE: ${date}`, canvas.width / 2, 700);

    const link = document.createElement("a");
    link.download = "QA-Bug-Hunt-Certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-5xl mx-auto relative z-10 font-sans">
      <div className="mb-12">
        <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-yellow-500 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Arcade
        </Link>
        <div className="flex items-center gap-4 mb-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-4">
            <Search className="w-10 h-10 text-yellow-500" />
            QA Bug <span className="text-yellow-500">Hunt</span>
          </h1>
          <span className="px-3 py-1 rounded-full bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 text-sm font-bold border border-yellow-500/20">
            {foundBugs.length} / {totalBugs} Found
          </span>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Act as QA. Inspect the UI elements below and log all the visual or functional defects.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {isWin && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-8 p-6 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-yellow-500/5">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-yellow-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-yellow-600 dark:text-yellow-500 text-lg">Sign-off Complete!</h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-400">You successfully identified all {totalBugs} UI defects. The release is ready.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button onClick={downloadQACertificate} className="flex items-center justify-center gap-2 bg-yellow-500 text-slate-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20">
                <Download className="w-4 h-4" /> Download QA Certificate
              </button>
              <button onClick={resetGame} className="flex items-center justify-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-full font-bold text-sm border hover:bg-gray-50 transition-colors">
                <RefreshCcw className="w-4 h-4" /> New Sprint
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {UI_DEFECTS.map((defect) => {
          const isFound = foundBugs.includes(defect.id);
          return (
            <div 
              key={defect.id}
              onClick={() => handleIdentifyDefect(defect)}
              className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${isFound ? 'bg-green-500/10 border-green-500/50 scale-95' : 'bg-white dark:bg-[#121214] border-gray-200 dark:border-white/10 hover:border-yellow-500/50 hover:shadow-lg'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="font-mono text-sm text-gray-500">{defect.type.toUpperCase()}</div>
                {isFound && <AlertCircle className="w-5 h-5 text-green-500" />}
              </div>
              <div className={`text-2xl font-bold mb-2 ${defect.id === 1 ? 'line-through decoration-red-500' : ''} ${defect.id === 5 ? 'text-gray-300 dark:text-gray-700' : 'text-gray-900 dark:text-white'}`}>
                {defect.id === 3 ? <div className="w-16 h-16 bg-gray-200 dark:bg-white/5 rounded-full flex items-center justify-center text-xs text-red-500 border border-red-500">404</div> : defect.element}
              </div>
              {isFound && <p className="text-sm font-bold text-green-600 dark:text-green-400 mt-4">Logged: {defect.description}</p>}
            </div>
          );
        })}
      </div>
    </main>
  );
}