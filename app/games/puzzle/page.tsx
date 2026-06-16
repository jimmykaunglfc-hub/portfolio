"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Unlock, BrainCircuit, CheckCircle2, XCircle, ArrowLeft, LogOut, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Master Question Bank (18 Questions) - The game will randomly pick 9 each time
const masterQuestionBank = [
  { category: "General Knowledge", question: "In computing, what does the acronym 'API' stand for?", options: ["Automated Program Interface", "Application Programming Interface", "Applied Process Integration", "Application Protocol Index"], answer: 1 },
  { category: "Mathematics", question: "What is the next number in the Fibonacci sequence: 0, 1, 1, 2, 3, 5, 8, __?", options: ["11", "12", "13", "15"], answer: 2 },
  { category: "English Language", question: "Which of the following is a palindrome?", options: ["Rhythm", "Racecar", "Sequence", "Tension"], answer: 1 },
  { category: "Logic", question: "If a computer processes 1 instruction every microsecond, how many does it process in a second?", options: ["100,000", "1,000,000", "10,000,000", "1,000"], answer: 1 },
  { category: "General Knowledge", question: "Which tech company created the open-source UI software framework 'Flutter'?", options: ["Meta", "Apple", "Microsoft", "Google"], answer: 3 },
  { category: "English Language", question: "What is the synonym for 'Ubiquitous'?", options: ["Rare", "Omnipresent", "Complex", "Fragile"], answer: 1 },
  { category: "Mathematics", question: "Solve: 8 ÷ 2(2 + 2) =", options: ["1", "16", "8", "4"], answer: 1 },
  { category: "Logic", question: "How many bits make up a standard byte?", options: ["4", "8", "16", "32"], answer: 1 },
  { category: "General Knowledge", question: "Who is widely considered to be the first computer programmer?", options: ["Alan Turing", "Charles Babbage", "Ada Lovelace", "Grace Hopper"], answer: 2 },
  { category: "Mathematics", question: "What is the square root of 144?", options: ["10", "12", "14", "16"], answer: 1 },
  { category: "Logic", question: "Some months have 31 days. How many have 28?", options: ["1", "6", "12", "0"], answer: 2 },
  { category: "General Knowledge", question: "What does 'HTTP' stand for?", options: ["HyperText Transfer Protocol", "HyperLink Transfer Technology", "HyperText Transmission Process", "Host Tracking Transfer Protocol"], answer: 0 },
  { category: "English Language", question: "Which word means 'to unnecessarily delay doing something'?", options: ["Procrastinate", "Accelerate", "Instigate", "Delegate"], answer: 0 },
  { category: "Mathematics", question: "What is 15% of 200?", options: ["15", "20", "30", "45"], answer: 2 },
  { category: "General Knowledge", question: "Which of these is a well-known NoSQL database?", options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"], answer: 2 },
  { category: "English Language", question: "What is the antonym of 'Benevolent'?", options: ["Kind", "Malevolent", "Generous", "Apathetic"], answer: 1 },
  { category: "Logic", question: "I speak without a mouth and hear without ears. What am I?", options: ["A shadow", "An echo", "A memory", "A dream"], answer: 1 },
  { category: "General Knowledge", question: "What is the main function of a DNS server?", options: ["Storing websites", "Translating domain names to IP addresses", "Encrypting passwords", "Blocking malware"], answer: 1 },
];

export default function PuzzleGame() {
  const router = useRouter();
  
  // Game State
  const [activeQuestions, setActiveQuestions] = useState<typeof masterQuestionBank>([]);
  const [unlockedPieces, setUnlockedPieces] = useState<number[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  
  // Interaction State
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  // Initialize Game on Load
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Shuffle the master bank and pick 9 questions
    const shuffled = [...masterQuestionBank].sort(() => 0.5 - Math.random()).slice(0, 9);
    setActiveQuestions(shuffled);
    setUnlockedPieces([]);
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const handleAnswer = (selectedIndex: number) => {
    // Prevent double clicking
    if (selectedAnswer !== null) return; 
    
    setSelectedAnswer(selectedIndex);
    const isCorrect = selectedIndex === activeQuestions[currentQuestion].answer;

    if (isCorrect) {
      setUnlockedPieces(prev => [...prev, currentQuestion]);
      setScore(prev => prev + 1);
    } // If wrong, they get 0 points and the piece is never added to unlockedPieces

    // Wait 1.2 seconds so user can see correct/wrong feedback, then move to next
    setTimeout(() => {
      setSelectedAnswer(null);
      setCurrentQuestion(prev => prev + 1);
    }, 1200);
  };

  const quitGame = () => {
    if(confirm("Are you sure you want to quit? Your progress will be lost.")) {
      router.push('/games');
    }
  };

  // Prevent rendering until questions are loaded client-side
  if (activeQuestions.length === 0) return null; 

  const isGameOver = currentQuestion >= 9;

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex items-center gap-4">
            <BrainCircuit className="w-10 h-10 text-blue-500" />
            Neural <span className="text-blue-500 dark:text-blue-400">Decrypt</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            Solve the trivia queries to unlock the core grid. You only have one attempt per node.
          </p>
        </div>

        {/* Quit Button */}
        {!isGameOver && (
          <button 
            onClick={quitGame}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 font-bold text-sm hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-4 h-4" /> Quit Game
          </button>
        )}
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
                const isCurrent = currentQuestion === index && !isGameOver;
                const isFailed = index < currentQuestion && !isUnlocked; // Passed it, but didn't unlock it

                return (
                  <motion.div
                    key={index}
                    initial={false}
                    animate={{
                      backgroundColor: isUnlocked ? "rgba(255,255,255,0)" : "rgba(24, 24, 27, 1)", 
                      borderColor: isCurrent ? "rgba(59, 130, 246, 0.8)" : isFailed ? "rgba(239, 68, 68, 0.3)" : "rgba(255,255,255,0.1)",
                    }}
                    className={`rounded-xl border flex items-center justify-center backdrop-blur-md transition-all duration-500 ${
                      !isUnlocked && "bg-gray-100 dark:bg-zinc-900 shadow-inner"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {isUnlocked ? (
                        <motion.div key="unlocked" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="text-white">
                          <Unlock className="w-6 h-6 opacity-50" />
                        </motion.div>
                      ) : (
                        <motion.div key="locked" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={isCurrent ? "text-blue-500" : isFailed ? "text-red-500/50" : "text-gray-400 dark:text-gray-600"}>
                          {isFailed ? <XCircle className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
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
            {isGameOver ? (
              
              /* --- GAME OVER RESULTS SCREEN --- */
              <motion.div
                key="results-screen"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-10 text-center shadow-2xl"
              >
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg ${score > 6 ? 'bg-green-500 shadow-green-500/30' : score > 3 ? 'bg-blue-500 shadow-blue-500/30' : 'bg-red-500 shadow-red-500/30'}`}>
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-2">
                  System Diagnostics Complete
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8 text-lg">
                  You successfully unlocked {score} out of 9 matrix nodes.
                </p>

                {/* Score Display */}
                <div className="flex justify-center items-center gap-4 mb-10">
                  <div className="text-5xl font-black text-blue-500">{score}</div>
                  <div className="text-3xl font-bold text-gray-300 dark:text-gray-700">/ 9</div>
                  <div className="text-left ml-2 leading-tight">
                    <div className="text-sm font-bold text-gray-900 dark:text-white uppercase">Total Points</div>
                    <div className="text-xs text-gray-500">1 pt per correct node</div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={startNewGame}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-full font-bold tracking-wide hover:bg-blue-500 transition-colors"
                  >
                    <RefreshCcw className="w-5 h-5" /> Replay Matrix
                  </button>
                  <button 
                    onClick={() => router.push('/games')}
                    className="w-full sm:w-auto bg-gray-200 dark:bg-white/10 text-gray-900 dark:text-white px-8 py-3.5 rounded-full font-bold tracking-wide hover:bg-gray-300 dark:hover:bg-white/20 transition-colors"
                  >
                    Return to Arcade
                  </button>
                </div>
              </motion.div>

            ) : (
              
              /* --- TRIVIA QUESTION SCREEN --- */
              <motion.div
                key={`question-${currentQuestion}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-bold tracking-wide uppercase">
                    {activeQuestions[currentQuestion].category}
                  </span>
                  <div className="text-right">
                    <span className="text-gray-900 dark:text-white font-bold text-lg">{score} pts</span>
                    <span className="text-gray-500 font-medium text-sm ml-4">Node {currentQuestion + 1} / 9</span>
                  </div>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8 leading-snug">
                  {activeQuestions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {activeQuestions[currentQuestion].options.map((option, index) => {
                    
                    const isCorrectAnswer = index === activeQuestions[currentQuestion].answer;
                    const isSelected = selectedAnswer === index;
                    
                    // Determine Button Styling based on selection state
                    let btnStyle = "bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 hover:border-blue-500/50 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer";
                    
                    if (selectedAnswer !== null) {
                      if (isCorrectAnswer) {
                        btnStyle = "bg-green-500/10 border-green-500/50 text-green-600 dark:text-green-400"; // Always highlight correct answer
                      } else if (isSelected && !isCorrectAnswer) {
                        btnStyle = "bg-red-500/10 border-red-500/50 text-red-600 dark:text-red-400"; // Highlight user's wrong pick
                      } else {
                        btnStyle = "opacity-40 pointer-events-none border-transparent dark:border-transparent"; // Dim others
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleAnswer(index)}
                        disabled={selectedAnswer !== null} // Lock all buttons after clicking
                        className={`w-full text-left p-5 rounded-xl font-medium text-lg border transition-all duration-300 flex items-center justify-between ${btnStyle}`}
                      >
                        {option}
                        
                        {/* Status Icons */}
                        {selectedAnswer !== null && isCorrectAnswer && <CheckCircle2 className="w-5 h-5" />}
                        {selectedAnswer !== null && isSelected && !isCorrectAnswer && <XCircle className="w-5 h-5" />}
                      </button>
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