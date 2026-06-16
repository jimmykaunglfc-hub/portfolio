"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Type, RefreshCcw, CheckCircle2, Shuffle, X, Unlock, Lock, Download, Award } from "lucide-react";
import Link from "next/link";

// General English vocabulary categorized by difficulty length
const GAME_LEVELS = [
  { id: 1, title: "Novice", letters: 4, words: ["TIME", "PLAY", "EASY", "FAST", "COOL", "WIND", "FIRE", "HOPE", "STAR", "MIND"] },
  { id: 2, title: "Apprentice", letters: 5, words: ["SMART", "BRAIN", "MAGIC", "WORLD", "HAPPY", "LIGHT", "DREAM", "PEACE", "HEART", "RIVER"] },
  { id: 3, title: "Adept", letters: 6, words: ["PUZZLE", "WONDER", "NATURE", "SPIRIT", "HIDDEN", "GARDEN", "ENERGY", "PLANET", "SILVER", "AUTHOR"] },
  { id: 4, title: "Expert", letters: 7, words: ["JOURNEY", "MYSTERY", "SILENCE", "FORTUNE", "DESTINY", "FREEDOM", "HARMONY", "COURAGE", "VICTORY", "DIAMOND"] },
  { id: 5, title: "Master", letters: 8, words: ["DISCOVERY", "BRILLIANT", "ADVENTURE", "UNIVERSE", "BEAUTIFUL", "CHAMPION", "STRENGTH", "MOUNTAIN", "TREASURE", "KNOWLEDGE"] }
];

const WORDS_PER_LEVEL = 3;

interface LetterObj {
  id: string;
  char: string;
  isUsed: boolean;
}

export default function LexiconLock() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [levelWords, setLevelWords] = useState<string[]>([]);
  const [wordIndex, setWordIndex] = useState(0);
  
  const [targetWord, setTargetWord] = useState("");
  const [availableLetters, setAvailableLetters] = useState<LetterObj[]>([]);
  const [selectedLetters, setSelectedLetters] = useState<LetterObj[]>([]);
  
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);
  
  const levelData = GAME_LEVELS[currentLevel];
  const isGameComplete = isLevelComplete && currentLevel === GAME_LEVELS.length - 1;

  // Initialize a level
  useEffect(() => {
    const shuffledBank = [...GAME_LEVELS[currentLevel].words].sort(() => 0.5 - Math.random());
    const selected = shuffledBank.slice(0, WORDS_PER_LEVEL);
    setLevelWords(selected);
    setWordIndex(0);
    setIsLevelComplete(false);
  }, [currentLevel]);

  // Load the current word
  useEffect(() => {
    if (levelWords.length === 0 || isLevelComplete) return;
    
    const word = levelWords[wordIndex];
    setTargetWord(word);
    
    let scrambled = word.split("");
    while (scrambled.join("") === word && word.length > 1) {
      scrambled = scrambled.sort(() => 0.5 - Math.random());
    }
    
    const letterObjects = scrambled.map((char, index) => ({
      id: `${char}-${index}-${Math.random()}`,
      char,
      isUsed: false
    }));
    
    setAvailableLetters(letterObjects);
    setSelectedLetters([]);
    setIsSuccess(false);
  }, [levelWords, wordIndex, isLevelComplete]);

  const handleSelectLetter = (letter: LetterObj) => {
    if (letter.isUsed || isSuccess || isLevelComplete) return;

    setAvailableLetters(prev => prev.map(l => l.id === letter.id ? { ...l, isUsed: true } : l));
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    if (newSelected.length === targetWord.length) {
      const spelledWord = newSelected.map(l => l.char).join("");
      if (spelledWord === targetWord) {
        handleWordSuccess();
      } else {
        handleWordError();
      }
    }
  };

  const handleDeselectLetter = (letter: LetterObj, index: number) => {
    if (isSuccess || isLevelComplete) return;
    
    const newSelected = [...selectedLetters];
    newSelected.splice(index, 1);
    setSelectedLetters(newSelected);
    
    setAvailableLetters(prev => prev.map(l => l.id === letter.id ? { ...l, isUsed: false } : l));
  };

  const handleWordSuccess = () => {
    setIsSuccess(true);
    setTimeout(() => {
      if (wordIndex + 1 < WORDS_PER_LEVEL) {
        setWordIndex(prev => prev + 1);
      } else {
        setIsLevelComplete(true);
      }
    }, 1000);
  };

  const handleWordError = () => {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
      setSelectedLetters([]);
      setAvailableLetters(prev => prev.map(l => ({ ...l, isUsed: false })));
    }, 600);
  };

  const handleShuffle = () => {
    if (isSuccess || isLevelComplete) return;
    setAvailableLetters(prev => [...prev].sort(() => 0.5 - Math.random()));
  };

  const handleClear = () => {
    if (isSuccess || isLevelComplete) return;
    setSelectedLetters([]);
    setAvailableLetters(prev => prev.map(l => ({ ...l, isUsed: false })));
  };

  const nextLevel = () => setCurrentLevel(prev => prev + 1);
  const resetGame = () => setCurrentLevel(0);

  // --- PREMIUM CERTIFICATE GENERATOR ENGINE ---
  const downloadCertificate = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600;
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Premium Gradient Background (Deep Rose to Slate Black)
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, "#280b1b"); 
    bgGrad.addColorStop(1, "#020617"); 
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Elegant Borders
    ctx.strokeStyle = "rgba(236, 72, 153, 0.2)"; // Pink 500 low opacity
    ctx.lineWidth = 4;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    ctx.strokeStyle = "#ec4899"; // Pink 500
    ctx.lineWidth = 10;
    ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160);

    // Book/Lexicon Corner Accents (Stylized brackets)
    ctx.fillStyle = "#ec4899";
    const cornerLength = 40;
    const cornerThick = 10;
    
    // Top Left
    ctx.fillRect(75, 75, cornerLength, cornerThick);
    ctx.fillRect(75, 75, cornerThick, cornerLength);
    // Top Right
    ctx.fillRect(canvas.width - 75 - cornerLength, 75, cornerLength, cornerThick);
    ctx.fillRect(canvas.width - 75 - cornerThick, 75, cornerThick, cornerLength);
    // Bottom Left
    ctx.fillRect(75, canvas.height - 75 - cornerThick, cornerLength, cornerThick);
    ctx.fillRect(75, canvas.height - 75 - cornerLength, cornerThick, cornerLength);
    // Bottom Right
    ctx.fillRect(canvas.width - 75 - cornerLength, canvas.height - 75 - cornerThick, cornerLength, cornerThick);
    ctx.fillRect(canvas.width - 75 - cornerThick, canvas.height - 75 - cornerLength, cornerThick, cornerLength);

    // Load Favicon / Logo
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/favicon.ico";
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      ctx.drawImage(img, canvas.width / 2 - 60, 140, 120, 120);
    } catch (e) {
      // Fallback: A stylized 'A' shape
      ctx.save();
      ctx.translate(canvas.width / 2, 200);
      ctx.strokeStyle = "#ec4899";
      ctx.lineWidth = 8;
      ctx.beginPath(); ctx.moveTo(0, -40); ctx.lineTo(40, 40); ctx.lineTo(-40, 40); ctx.closePath(); ctx.stroke();
      ctx.fillStyle = "#ec4899";
      ctx.fillRect(-20, 10, 40, 8);
      ctx.restore();
    }

    // Typography
    ctx.textAlign = "center";
    (ctx as any).letterSpacing = "8px";
    ctx.fillStyle = "#ec4899";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("DIGITAL ARCADE LINGUISTICS", canvas.width / 2, 360);

    (ctx as any).letterSpacing = "2px";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 85px serif"; // Serif for the dictionary/lexicon feel
    ctx.fillText("CERTIFICATE OF MASTERY", canvas.width / 2, 480);

    // Separator Line
    ctx.fillStyle = "#ec4899";
    ctx.fillRect(canvas.width / 2 - 200, 540, 400, 4);

    // Body Text
    (ctx as any).letterSpacing = "0px";
    ctx.fillStyle = "#94a3b8"; // Slate 400
    ctx.font = "italic 36px serif";
    ctx.fillText("This document officially certifies that the player has demonstrated", canvas.width / 2, 660);
    ctx.fillText("an exceptional mastery of the English language, successfully", canvas.width / 2, 720);
    ctx.fillText("deciphering all anagrams to unlock the final Lexicon Vault.", canvas.width / 2, 780);

    // Rank
    (ctx as any).letterSpacing = "6px";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 42px sans-serif";
    ctx.fillText("RANK ACHIEVED: LEXICON MASTER", canvas.width / 2, 940);

    // Date
    (ctx as any).letterSpacing = "2px";
    const date = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = "#f472b6"; // Pink 400
    ctx.font = "24px monospace";
    ctx.fillText(`VAULT UNLOCKED ON: ${date}`, canvas.width / 2, 1040);

    const link = document.createElement("a");
    link.download = "Lexicon-Lock-Master-Certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      {/* HEADER SECTION */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-pink-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-4">
              <Type className="w-10 h-10 text-pink-500" />
              Lexicon <span className="text-pink-500 dark:text-pink-400">Lock</span>
            </h1>
            <span className="px-3 py-1 rounded-full bg-pink-500/10 text-pink-500 text-sm font-bold uppercase tracking-widest border border-pink-500/20">
              Level {currentLevel + 1} / {GAME_LEVELS.length}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            Unscramble the letters to crack the vault. Words get longer as you progress!
          </p>
        </div>
        
        {/* Progress Tracker */}
        <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Words Solved</div>
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <div key={i} className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${i < wordIndex || isLevelComplete ? 'bg-pink-500 border-pink-500 text-white' : 'bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-400'}`}>
                {i < wordIndex || isLevelComplete ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SUCCESS / LEVEL COMPLETE BANNER */}
      <AnimatePresence mode="wait">
        {isLevelComplete && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-8 p-6 bg-pink-500/10 border border-pink-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-lg">
            <div className="flex items-center gap-4">
              {isGameComplete ? <Award className="w-10 h-10 text-pink-500 flex-shrink-0" /> : <CheckCircle2 className="w-8 h-8 text-pink-500 flex-shrink-0" />}
              <div>
                <h3 className="font-bold text-pink-500 text-lg">
                  {isGameComplete ? "Lexicon Master!" : `${levelData.title} Vault Unlocked!`}
                </h3>
                <p className="text-sm text-pink-600 dark:text-pink-400">
                  {isGameComplete ? "You have conquered the English language and solved every level." : "Excellent vocabulary! The words are getting longer next."}
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              {isGameComplete && (
                <button 
                  onClick={downloadCertificate} 
                  className="flex items-center justify-center gap-2 w-full sm:w-auto bg-white text-pink-600 border-2 border-pink-500 px-6 py-3 rounded-full font-bold text-sm hover:bg-pink-50 transition-colors shadow-lg"
                >
                  <Download className="w-4 h-4" /> Get Certificate
                </button>
              )}
              
              {isGameComplete ? (
                <button onClick={resetGame} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-pink-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20">
                  <RefreshCcw className="w-4 h-4" /> Play Again
                </button>
              ) : (
                <button onClick={nextLevel} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-pink-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20">
                  Proceed to Level {currentLevel + 2}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* GAME BOARD */}
      {!isLevelComplete && (
        <div className="max-w-2xl mx-auto bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-xl flex flex-col items-center">
          
          {/* Answer Slots */}
          <motion.div 
            className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 min-h-[4rem]"
            animate={isError ? { x: [-10, 10, -10, 10, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            {Array.from({ length: targetWord.length }).map((_, i) => {
              const letter = selectedLetters[i];
              return (
                <div 
                  key={`slot-${i}`}
                  onClick={() => letter && handleDeselectLetter(letter, i)}
                  className={`w-12 h-14 md:w-16 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-black uppercase transition-all duration-300 border-b-4 ${
                    letter 
                      ? isSuccess 
                        ? 'bg-green-500 border-green-700 text-white shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-110' 
                        : isError 
                          ? 'bg-red-500 border-red-700 text-white' 
                          : 'bg-pink-500 border-pink-700 text-white cursor-pointer hover:bg-pink-400'
                      : 'bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-gray-700 text-transparent'
                  }`}
                >
                  {letter ? letter.char : ""}
                </div>
              );
            })}
          </motion.div>

          {/* Letter Pool */}
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
            {availableLetters.map((letter) => (
              <button
                key={letter.id}
                onClick={() => handleSelectLetter(letter)}
                disabled={letter.isUsed}
                className={`w-12 h-14 md:w-16 md:h-20 rounded-xl md:rounded-2xl flex items-center justify-center text-2xl md:text-4xl font-black uppercase transition-all duration-300 shadow-sm border-b-4 ${
                  letter.isUsed 
                    ? 'opacity-0 scale-50 pointer-events-none' 
                    : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-900 text-gray-900 dark:text-white hover:-translate-y-1 hover:shadow-md active:border-b-0 active:translate-y-1'
                }`}
              >
                {letter.char}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-4">
            <button 
              onClick={handleShuffle}
              disabled={isSuccess}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 font-bold text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-50"
            >
              <Shuffle className="w-5 h-5" /> Shuffle
            </button>
            <button 
              onClick={handleClear}
              disabled={isSuccess || selectedLetters.length === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 font-bold text-gray-600 dark:text-gray-300 transition-colors disabled:opacity-50"
            >
              <X className="w-5 h-5" /> Clear
            </button>
          </div>

        </div>
      )}

    </main>
  );
}