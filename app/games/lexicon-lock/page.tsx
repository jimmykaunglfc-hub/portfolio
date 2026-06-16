"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Type, RefreshCcw, CheckCircle2, Shuffle, X, Unlock, Lock } from "lucide-react";
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
    // Pick 3 random words from the current level's bank
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
    
    // Scramble the word (make sure it isn't accidentally the exact word)
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

  // Handle letter tapping
  const handleSelectLetter = (letter: LetterObj) => {
    if (letter.isUsed || isSuccess || isLevelComplete) return;

    // Mark as used
    setAvailableLetters(prev => prev.map(l => l.id === letter.id ? { ...l, isUsed: true } : l));
    const newSelected = [...selectedLetters, letter];
    setSelectedLetters(newSelected);

    // Check win/loss condition if word is fully typed
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
    
    // Remove from selected
    const newSelected = [...selectedLetters];
    newSelected.splice(index, 1);
    setSelectedLetters(newSelected);
    
    // Mark as available
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
      // Reset the tiles
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
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-8 p-6 bg-pink-500/10 border border-pink-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-pink-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-pink-500 text-lg">
                  {isGameComplete ? "Lexicon Master!" : `${levelData.title} Vault Unlocked!`}
                </h3>
                <p className="text-sm text-pink-600 dark:text-pink-400">
                  {isGameComplete ? "You have conquered the English language and solved every level." : "Excellent vocabulary! The words are getting longer next."}
                </p>
              </div>
            </div>
            {isGameComplete ? (
              <button onClick={resetGame} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-pink-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20">
                <RefreshCcw className="w-4 h-4" /> Play Again
              </button>
            ) : (
              <button onClick={nextLevel} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-pink-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/20">
                Proceed to Level {currentLevel + 2}
              </button>
            )}
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