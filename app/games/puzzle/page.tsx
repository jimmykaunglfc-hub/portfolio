"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, BrainCircuit, CheckCircle2, XCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

// The 9 Trivia Questions
const triviaQuestions = [
  {
    category: "General Knowledge",
    question: "In computing, what does the acronym 'API' stand for?",
    options: ["Automated Program Interface", "Application Programming Interface", "Applied Process Integration", "Application Protocol Index"],
    answer: 1,
  },
  {
    category: "Mathematics",
    question: "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, __?",
    options: ["11", "12", "13", "15"],
    answer: 2,
  },
  {
    category: "English Language",
    question: "Which of the following is a palindrome?",
    options: ["Rhythm", "Racecar", "Sequence", "Tension"],
    answer: 1,
  },
  {
    category: "Logic",
    question: "If a computer processes 1 instruction every microsecond, how many does it process in a second?",
    options: ["100,000", "1,000,000", "10,000,000", "1,000"],
    answer: 1,
  },
  {
    category: "General Knowledge",
    question: "Which tech company created the open-source UI software framework 'Flutter'?",
    options: ["Meta", "Apple", "Microsoft", "Google"],
    answer: 3,
  },
  {
    category: "English Language",
    question: "What is the synonym for 'Ubiquitous'?",
    options: ["Rare", "Omnipresent", "Complex", "Fragile"],
    answer: 1,
  },
  {
    category: "Mathematics",
    question: "Solve: 8 ÷ 2(2 + 2) =",
    options: ["1", "16", "8", "4"],
    answer: 1, // Using modern order of operations (PEMDAS/BODMAS)
  },
  {
    category: "Logic",
    question: "How many bits make up a standard byte?",
    options: ["4", "8", "16", "32"],
    answer: 1,
  },
  {
    category: "General Knowledge",
    question: "Who is widely considered to be the first computer programmer?",
    options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "Grace Hopper"],
    answer: 2,
  },
];

export default function PuzzleGame() {
  const [unlockedPieces, setUnlockedPieces] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [wrongAnswer, setWrongAnswer] = useState<number | null>(null);

  const isGameWon = unlockedPieces.length === 9;

  const handleAnswer = (selectedIndex: number) => {
    if (selectedIndex === triviaQuestions[currentQuestion].answer) {
      // Correct Answer
      setUnlockedPieces([...unlockedPieces, currentQuestion]);
      setWrongAnswer(null);
      if (currentQuestion < 8) {
        setTimeout(() => setCurrentQuestion(currentQuestion + 1), 600);
      }
    } else {
      // Wrong Answer
      setWrongAnswer(selectedIndex);
      setTimeout(() => setWrongAnswer(null), 800);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      {/* Header */}
      <div className="mb-12">
        <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Arcade
        </Link>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex items-center gap-4">
          <BrainCircuit className="w-10 h-10 text-blue-500" />
          Neural <span className="text-blue-500 dark:text-blue-400">Decrypt</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Solve the trivia queries to unlock the core grid. A test of logic, language, and mathematics.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* LEFT SIDE: The 3x3 Puzzle Grid */}
        <div className="lg:col-span-5">
          <div className="w-full aspect-square rounded-3xl p-4 bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 shadow-2xl relative overflow-hidden flex items-center justify-center">
            
            {/* The Masterpiece Background (Revealed as pieces unlock) */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 opacity-90 z-0"></div>
            
            {/* The Grid Overlay */}
            <div className="relative z-10 grid grid-cols-3 gap-2 w-full h-full">
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((index) => {
                const isUnlocked = unlockedPieces.includes(index);
                const isCurrent = currentQuestion === index && !isUnlocked;

                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      backgroundColor: isUnlocked ? "rgba(255,255,255,0)" : "rgba(24, 24, 27, 1)", // Zinc-900
                      borderColor: isCurrent ? "rgba(59, 130, 246, 0.8)" : "rgba(255,255,255,0.1)",
                    }}
                    className={`rounded-xl border flex items-center justify-center backdrop-blur-md transition-all duration-500 ${
                      !isUnlocked && "bg-gray-100 dark:bg-zinc-900 shadow-inner"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isUnlocked ? (
                        <motion.div
                          key="unlocked"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-white"
                        >
                          <Unlock className="w-6 h-6 opacity-50" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="locked"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          className={isCurrent ? "text-blue-500" : "text-gray-400 dark:text-gray-600"}
                        >
                          <Lock className="w-6 h-6" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE: The Trivia Console */}
        <div className="lg:col-span-7 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {isGameWon ? (
              <motion.div
                key="win-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/10 border border-green-500/30 rounded-3xl p-10 text-center"
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-4">Grid Decrypted!</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Flawless execution. You have successfully unlocked the neural matrix.
                </p>
                <button 
                  onClick={() => { setUnlockedPieces([]); setCurrentQuestion(0); }}
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-transform"
                >
                  Reset Matrix
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="question-screen"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold tracking-wide uppercase">
                    {triviaQuestions[currentQuestion].category}
                  </span>
                  <span className="text-gray-500 font-medium text-sm">
                    Node {currentQuestion + 1} / 9
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 leading-snug">
                  {triviaQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {triviaQuestions[currentQuestion].options.map((option, index) => {
                    const isWrong = wrongAnswer === index;
                    return (
                      <motion.button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        animate={isWrong ? { x: [-10, 10, -10, 10, 0] } : {}}
                        transition={{ duration: 0.4 }}
                        className={`w-full text-left p-5 rounded-xl font-medium text-lg border transition-all duration-200 flex items-center justify-between ${
                          isWrong 
                            ? "bg-red-500/10 border-red-500/50 text-red-500" 
                            : "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        {option}
                        {isWrong && <XCircle className="w-5 h-5 text-red-500" />}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}