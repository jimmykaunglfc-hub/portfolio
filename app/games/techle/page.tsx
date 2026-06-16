"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Keyboard, RefreshCcw, CheckCircle2, XCircle, HelpCircle, X } from "lucide-react";
import Link from "next/link";

// Curated 5-letter Tech/Dev words
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

  // Initialize game on mount
  useEffect(() => {
    startNewGame();
    // Briefly show help on first load, or just rely on the user clicking the icon
    // We'll leave it closed by default here, but they can click the help icon!
  }, []);

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

  // Global Keyboard Listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => onKeyPress(e.key);
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onKeyPress]);

  // Evaluates a guess against the solution to assign colors
  const evaluateGuess = (guess: string) => {
    const result: LetterStatus[] = Array(COLS).fill("absent");
    const solutionChars = solution.split("");
    const guessChars = guess.split("");

    // First pass: Find exact matches (Green)
    guessChars.forEach((char, i) => {
      if (char === solutionChars[i]) {
        result[i] = "correct";
        solutionChars[i] = ""; // Mark as used
        guessChars[i] = ""; // Mark as processed
      }
    });

    // Second pass: Find partial matches (Yellow)
    guessChars.forEach((char, i) => {
      if (char !== "" && solutionChars.includes(char)) {
        result[i] = "present";
        solutionChars[solutionChars.indexOf(char)] = ""; // Mark as used
      }
    });

    return result;
  };

  // Keyboard state calculation
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
            aria-label="How to play"
          >
            <HelpCircle className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Game Over Banner */}
      <div className="w-full max-w-lg h-16 mb-4 flex items-center justify-center">
        <AnimatePresence>
          {gameStatus !== "playing" && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`w-full py-3 px-6 rounded-xl flex items-center justify-between shadow-lg ${gameStatus === "won" ? "bg-green-500 text-white shadow-green-500/20" : "bg-gray-800 text-white shadow-gray-900/50 border border-gray-700"}`}>
              <div className="flex items-center gap-3 font-bold">
                {gameStatus === "won" ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6 text-red-500" />}
                {gameStatus === "won" ? "System Decrypted!" : `Access Denied. Word: ${solution}`}
              </div>
              <button onClick={startNewGame} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-1.5 rounded-full text-sm font-bold transition-colors">
                <RefreshCcw className="w-4 h-4" /> Replay
              </button>
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
              key={rowIndex} 
              className="grid grid-cols-5 gap-2"
              animate={isCurrentRow && shakeRow ? { x: [-5, 5, -5, 5, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              {Array.from({ length: COLS }).map((_, colIndex) => {
                const char = guess[colIndex] || "";
                const status = isCurrentRow && char ? "empty" : evaluation[colIndex];
                
                return (
                  <div 
                    key={colIndex}
                    className={`aspect-square flex items-center justify-center text-2xl md:text-3xl font-black uppercase rounded-xl border-2 transition-all duration-500 ${char && isCurrentRow ? 'border-gray-500 dark:border-gray-400 scale-[1.02]' : ''} ${getTileColor(status)}`}
                  >
                    {char && (
                      <motion.span initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}>
                        {char}
                      </motion.span>
                    )}
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
                <button
                  key={key}
                  onClick={() => onKeyPress(key)}
                  className={`h-14 md:h-16 rounded-xl font-bold text-sm md:text-base flex items-center justify-center transition-colors active:scale-95 ${isSpecial ? 'px-3 md:px-4 text-xs' : 'flex-1 max-w-[3rem]'} ${getKeyColor(key)}`}
                >
                  {key === "DELETE" ? "DEL" : key}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Instructions Modal Overlay */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 relative">
                <button 
                  onClick={() => setShowHelp(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Play</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Guess the <strong>TECHLE</strong> in 6 tries. Every word is related to programming, tech, or web development!
                </p>
                
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-6 list-disc pl-5">
                  <li>Each guess must be a valid 5-letter word.</li>
                  <li>Hit the enter button to submit.</li>
                  <li>After each guess, the color of the tiles will change to show how close your guess was to the word.</li>
                </ul>

                <div className="space-y-4 mb-6">
                  <div>
                    <div className="flex gap-1 mb-2">
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold text-white bg-green-500 rounded-md">R</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">E</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">A</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">C</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">T</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>R</strong> is in the word and in the correct spot.</p>
                  </div>
                  
                  <div>
                    <div className="flex gap-1 mb-2">
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">B</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">U</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold text-white bg-yellow-500 rounded-md">I</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">L</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">D</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>I</strong> is in the word but in the wrong spot.</p>
                  </div>

                  <div>
                    <div className="flex gap-1 mb-2">
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">L</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">O</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">G</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold text-gray-400 bg-gray-800 border-gray-800 rounded-md">I</div>
                      <div className="w-10 h-10 flex items-center justify-center text-lg font-bold border-2 border-gray-300 dark:border-gray-700 rounded-md">C</div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400"><strong>I</strong> is not in the word in any spot.</p>
                  </div>
                </div>

                <button 
                  onClick={() => setShowHelp(false)}
                  className="w-full py-3 rounded-xl font-bold bg-orange-500 hover:bg-orange-600 text-white transition-colors"
                >
                  Let's Play!
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </main>
  );
}