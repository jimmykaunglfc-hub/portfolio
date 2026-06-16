"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Keyboard, RefreshCcw, CheckCircle2, XCircle, HelpCircle, X, Download } from "lucide-react";
import Link from "next/link";

const TECH_WORDS = [
  "REACT", "BUILD", "DEBUG", "PIXEL", "CLOUD", "LOGIC", "STACK", "ARRAY", "CACHE", 
  "TOKEN", "QUERY", "FETCH", "ROUTE", "LINUX", "MACRO", "PROXY", "SCOPE", "SWIFT", 
  "THEME", "INDEX", "NODES", "CYBER", "MODEM", "VIRUS", "PATCH", "GATES", "APPLE"
];

const ROWS = 6;
const COLS = 5;

type GameStatus = "playing" | "won" | "lost";
type LetterStatus = "correct" | "present" | "absent" | "empty";

export default function TechleGame() {
  const [solution, setSolution] = useState("");
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState("");
  const [gameStatus, setGameStatus] = useState<GameStatus>("playing");
  const [shakeRow, setShakeRow] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  useEffect(() => { startNewGame(); }, []);

  const startNewGame = () => {
    const randomWord = TECH_WORDS[Math.floor(Math.random() * TECH_WORDS.length)];
    setSolution(randomWord);
    setGuesses([]);
    setCurrentGuess("");
    setGameStatus("playing");
  };

  const onKeyPress = useCallback((key: string) => {
    if (gameStatus !== "playing" || showHelp) return;

    if (key === "Backspace" || key === "DELETE") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (key === "Enter" || key === "ENTER") {
      if (currentGuess.length !== COLS) {
        setShakeRow(true);
        setTimeout(() => setShakeRow(false), 500);
        return;
      }
      
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      setCurrentGuess("");

      if (currentGuess === solution) {
        setGameStatus("won");
      } else if (newGuesses.length >= ROWS) {
        setGameStatus("lost");
      }
      return;
    }

    if (/^[a-zA-Z]$/.test(key) && currentGuess.length < COLS) {
      setCurrentGuess((prev) => prev + key.toUpperCase());
    }
  }, [currentGuess, gameStatus, guesses, solution, showHelp]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => onKeyPress(e.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  const evaluateGuess = (guess: string) => {
    const result: LetterStatus[] = Array(COLS).fill("absent");
    const solutionChars = solution.split("");
    const guessChars = guess.split("");

    guessChars.forEach((char, i) => {
      if (char === solutionChars[i]) {
        result[i] = "correct";
        solutionChars[i] = ""; 
        guessChars[i] = ""; 
      }
    });

    guessChars.forEach((char, i) => {
      if (char !== "" && solutionChars.includes(char)) {
        result[i] = "present";
        solutionChars[solutionChars.indexOf(char)] = ""; 
      }
    });
    return result;
  };

  const usedKeys: Record<string, LetterStatus> = {};
  guesses.forEach((guess) => {
    const evaluation = evaluateGuess(guess);
    guess.split("").forEach((char, i) => {
      const status = evaluation[i];
      if (usedKeys[char] === "correct") return; 
      
      if (status === "correct" || status === "present") {
        usedKeys[char] = status;
      } else if (!usedKeys[char]) {
        usedKeys[char] = "absent";
      }
    });
  });

  const getTileColor = (status: LetterStatus) => {
    switch (status) {
      case "correct": return "bg-green-500 border-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]";
      case "present": return "bg-yellow-500 border-yellow-500 text-white shadow-[0_0_15px_rgba(234,179,8,0.4)]";
      case "absent": return "bg-gray-800 border-gray-800 text-gray-300";
      default: return "bg-transparent border-gray-300 dark:border-white/20 text-gray-900 dark:text-white";
    }
  };

  const getKeyColor = (key: string) => {
    const status = usedKeys[key];
    switch (status) {
      case "correct": return "bg-green-500 text-white";
      case "present": return "bg-yellow-500 text-white";
      case "absent": return "bg-gray-800 text-gray-500 dark:bg-gray-800 dark:text-gray-600";
      default: return "bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-white/20";
    }
  };

  const keyboardRows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "DELETE"]
  ];

  // --- PREMIUM CERTIFICATE GENERATOR ENGINE ---
  const downloadCertificate = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600; 
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Gradient Core Matrix Background
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, "#1a0b02"); // Subtle warm orange depths
    bgGrad.addColorStop(1, "#09090b"); 
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Technical Grid Lines
    ctx.strokeStyle = "rgba(249, 115, 22, 0.03)";
    ctx.lineWidth = 1;
    for(let i = 0; i < canvas.width; i+=40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for(let i = 0; i < canvas.height; i+=40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // High-End Outlines
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    ctx.strokeStyle = "#f97316"; // Orange 500
    ctx.lineWidth = 6;
    ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160);

    // Terminal Tech Brackets
    ctx.strokeStyle = "#f97316";
    ctx.lineWidth = 10;
    const s = 40;
    ctx.beginPath(); ctx.moveTo(85, 85+s); ctx.lineTo(85, 85); ctx.lineTo(85+s, 85); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(canvas.width-85-s, 85); ctx.lineTo(canvas.width-85, 85); ctx.lineTo(canvas.width-85, 85+s); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(85, canvas.height-85-s); ctx.lineTo(85, canvas.height-85); ctx.lineTo(85+s, canvas.height-85); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(canvas.width-85-s, canvas.height-85); ctx.lineTo(canvas.width-85, canvas.height-85); ctx.lineTo(canvas.width-85, canvas.height-85-s); ctx.stroke();

    // Fetch and Load Favicon
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/favicon.ico";
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      ctx.drawImage(img, canvas.width / 2 - 50, 160, 100, 100);
    } catch (e) {
      // Fallback terminal prompt logo >_
      ctx.save();
      ctx.translate(canvas.width / 2, 210);
      ctx.fillStyle = "#f97316";
      ctx.font = "bold 60px monospace";
      ctx.fillText(">_", -30, 20);
      ctx.restore();
    }

    // Typography Setup
    ctx.textAlign = "center";
    (ctx as any).letterSpacing = "8px";
    ctx.fillStyle = "#f97316";
    ctx.font = "bold 26px monospace";
    ctx.fillText("TECHLE DECRYPTION PROTOCOL", canvas.width / 2, 380);

    (ctx as any).letterSpacing = "4px";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 85px sans-serif";
    ctx.fillText("SYSTEM DECRYPTED", canvas.width / 2, 500);

    // Separator line
    ctx.fillStyle = "#f97316";
    ctx.fillRect(canvas.width / 2 - 150, 560, 300, 4);

    // Body Text Elements
    (ctx as any).letterSpacing = "0px";
    ctx.fillStyle = "#94a3b8"; // Slate 400
    ctx.font = "italic 36px sans-serif";
    ctx.fillText("This official data log verifies that the operative successfully bypassed", canvas.width / 2, 680);
    ctx.fillText(`mainframe protocols and parsed the system keyword within ${guesses.length} processing cycles.`, canvas.width / 2, 740);

    // Solved Decrypted Word Target
    (ctx as any).letterSpacing = "10px";
    ctx.fillStyle = "#22c55e"; // Success green glow
    ctx.font = "bold 55px monospace";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#22c55e";
    ctx.fillText(`[ ${solution} ]`, canvas.width / 2, 880);
    ctx.shadowBlur = 0; // Reset

    // Security Rating
    (ctx as any).letterSpacing = "4px";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 38px monospace";
    ctx.fillText("SECURITY PROFILE VALIDATION: ELITE DECRYPTER", canvas.width / 2, 1000);

    // Date/Timestamp
    (ctx as any).letterSpacing = "2px";
    const date = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = "#52525b"; // Zinc 600
    ctx.font = "24px monospace";
    ctx.fillText(`DECRYPTION LOG STAMP: ${date}`, canvas.width / 2, 1100);

    // Execute Download
    const link = document.createElement("a");
    link.download = `Techle-Decrypted-${solution}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans flex flex-col items-center">
      
      {/* Header */}
      <div className="w-full max-w-lg mb-8 flex items-center justify-between">
        <div className="w-24">
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-orange-500 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Arcade
          </Link>
        </div>
        
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-3">
          <Keyboard className="w-8 h-8 text-orange-500" />
          Tech<span className="text-orange-500">le</span>
        </h1>
        
        <div className="w-24 flex justify-end">
          <button 
            onClick={() => setShowHelp(true)} 
            className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-500/10 rounded-full transition-all"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Game Over Banner */}
      <div className="w-full max-w-lg h-16 mb-4 flex items-center justify-center">
        <AnimatePresence>
          {gameStatus !== "playing" && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`w-full py-3 px-6 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg ${gameStatus === "won" ? "bg-green-500 text-white shadow-green-500/20" : "bg-gray-800 text-white shadow-gray-900/50 border border-gray-700"}`}>
              <div className="flex items-center gap-3 font-bold text-center sm:text-left">
                {gameStatus === "won" ? <CheckCircle2 className="w-6 h-6 flex-shrink-0" /> : <XCircle className="w-6 h-6 text-red-500 flex-shrink-0" />}
                {gameStatus === "won" ? "System Decrypted!" : `Access Denied. Word: ${solution}`}
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                {gameStatus === "won" && (
                  <button onClick={downloadCertificate} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-green-600 px-4 py-1.5 rounded-full text-sm font-bold hover:bg-gray-100 transition-colors shadow-sm">
                    <Download className="w-4 h-4" /> Badge
                  </button>
                )}
                <button onClick={startNewGame} className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full text-sm font-bold transition-colors">
                  <RefreshCcw className="w-4 h-4" /> Replay
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid */}
      <div className="grid grid-rows-6 gap-2 mb-10 w-full max-w-sm mx-auto">
        {Array.from({ length: ROWS }).map((_, rowIndex) => {
          const isCurrentRow = rowIndex === guesses.length;
          const guess = isCurrentRow ? currentGuess : guesses[rowIndex] || "";
          const evaluation = guesses[rowIndex] ? evaluateGuess(guesses[rowIndex]) : Array(COLS).fill("empty");
          
          return (
            <motion.div 
              key={rowIndex} className="grid grid-cols-5 gap-2"
              animate={isCurrentRow && shakeRow ? { x: [-5, 5, -5, 5, 0] } : {}} transition={{ duration: 0.4 }}
            >
              {Array.from({ length: COLS }).map((_, colIndex) => {
                const char = guess[colIndex] || "";
                const status = isCurrentRow && char ? "empty" : evaluation[colIndex];
                
                return (
                  <div key={colIndex} className={`aspect-square flex items-center justify-center text-2xl md:text-3xl font-black uppercase rounded-xl border-2 transition-all duration-500 ${char && isCurrentRow ? 'border-gray-500 dark:border-gray-400 scale-[1.02]' : ''} ${getTileColor(status)}`}>
                    {char && <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>{char}</motion.span>}
                  </div>
                );
              })}
            </motion.div>
          );
        })}
      </div>

      {/* On-Screen Keyboard */}
      <div className="w-full max-w-lg space-y-2 select-none">
        {keyboardRows.map((row, i) => (
          <div key={i} className="flex justify-center gap-1.5 md:gap-2 w-full">
            {row.map((key) => {
              const isSpecial = key === "ENTER" || key === "DELETE";
              return (
                <button key={key} onClick={() => onKeyPress(key)} className={`h-14 md:h-16 rounded-xl font-bold text-sm md:text-base flex items-center justify-center transition-colors active:scale-95 ${isSpecial ? 'px-3 md:px-4 text-xs' : 'flex-1 max-w-[3rem]'} ${getKeyColor(key)}`}>
                  {key === "DELETE" ? "DEL" : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Instructions Modal */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
              <div className="p-6 relative">
                <button onClick={() => setShowHelp(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Play</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">Guess the <strong>TECHLE</strong> in 6 tries. Every word is related to programming, tech, or web development!</p>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6 list-disc pl-5">
                  <li>Each guess must be a valid 5-letter word.</li>
                  <li>Hit the enter button to submit.</li>
                  <li>After each guess, the color of the tiles changes to show how close you were.</li>
                </ul>
                <button onClick={() => setShowHelp(false)} className="w-full py-3 rounded-xl font-bold bg-orange-500 hover:bg-orange-600 text-white transition-colors">Let's Play!</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}