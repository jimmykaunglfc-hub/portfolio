import Link from "next/link";
import { Play, Brain, Bug, Target, Gamepad2, Keyboard, Type, Hexagon, Box, Fingerprint, Zap, Layers, Scissors, Swords} from "lucide-react";

export default function GamesIndex() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4">
          Digital <span className="text-blue-500">Arcade</span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Test your skills in product management, quality assurance, logic, and pure reflex with these interactive experiences.
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* Game 1: Neural Decrypt */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 hover:border-purple-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a1025] to-[#2d1b4e] dark:from-black dark:via-gray-900 dark:to-purple-950"></div>
            <Brain className="relative z-10 w-24 h-24 text-purple-500 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-purple-500 transition-colors duration-300">Neural Decrypt</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">A logic puzzle testing your deductive reasoning and pattern recognition skills.</p>
            <Link href="/games/puzzle" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-purple-600 dark:hover:bg-purple-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 2: QA Bug Hunt */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10 hover:border-emerald-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0f1a15] to-[#122f22] dark:from-black dark:via-gray-900 dark:to-emerald-950"></div>
            <Bug className="relative z-10 w-24 h-24 text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-emerald-500 transition-colors duration-300">QA Bug Hunt</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">Spot the differences! Find UX/UI issues between the production and staging environments.</p>
            <Link href="/games/qa-test" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 3: Sprint Optimizer */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0f172a] to-[#1e3a8a] dark:from-black dark:via-gray-900 dark:to-blue-950"></div>
            <Target className="relative z-10 w-24 h-24 text-blue-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors duration-300">Sprint Optimizer</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">Balance resources, technical debt, and business value in this multi-level Agile PM simulator.</p>
            <Link href="/games/sprint-planner" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-blue-600 dark:hover:bg-blue-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 4: Bug Blaster */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a0f0f] to-[#241212] dark:from-black dark:via-gray-900 dark:to-red-950"></div>
            <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full group-hover:bg-red-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Gamepad2 className="relative z-10 w-24 h-24 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover:scale-110 group-hover:rotate-[5deg] transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
              Bug Blaster
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              A high-speed HTML5 Canvas arcade shooter. Dodge regressions and blast bugs before they crash the system.
            </p>
            <Link href="/games/bug-blaster" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 5: Nexus Breach */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#0a191f] to-[#0f3741] dark:from-black dark:via-gray-900 dark:to-cyan-950"></div>
            <div className="absolute inset-0 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#06b6d4_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Hexagon className="relative z-10 w-24 h-24 text-cyan-500 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-cyan-500 transition-colors duration-300">
              Nexus Breach
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              A high-stakes 4x4 grid puzzle. 15 safe data nodes. 1 corrupted trap. Push your luck to secure the system.
            </p>
            <Link href="/games/nexus-breach" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-cyan-600 dark:hover:bg-cyan-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 6: Liar's Dice */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1f160a] to-[#412c0f] dark:from-black dark:via-gray-900 dark:to-amber-950"></div>
            <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full group-hover:bg-amber-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Box className="relative z-10 w-24 h-24 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors duration-300">
              Liar's Dice
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              A high-fidelity digital dice cup with realistic 3D physics. Pass and play in-person with friends.
            </p>
            <Link href="/games/liars-dice" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-amber-600 dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 7: Techle */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10 hover:border-orange-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a140f] to-[#2d1c0b] dark:from-black dark:via-gray-900 dark:to-orange-950"></div>
            <div className="absolute inset-0 bg-orange-500/10 blur-3xl rounded-full group-hover:bg-orange-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#f97316_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Keyboard className="relative z-10 w-24 h-24 text-orange-500 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-orange-500 transition-colors duration-300">
              Techle
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              Decrypt the 5-letter tech word of the day in 6 tries. A classic word puzzle built for developers.
            </p>
            <Link href="/games/techle" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-orange-600 dark:hover:bg-orange-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 8: Lexicon Lock */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-pink-500/10 hover:border-pink-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#1a0f16] to-[#2d0b1a] dark:from-black dark:via-gray-900 dark:to-pink-950"></div>
            <div className="absolute inset-0 bg-pink-500/10 blur-3xl rounded-full group-hover:bg-pink-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#ec4899_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Type className="relative z-10 w-24 h-24 text-pink-500 drop-shadow-[0_0_15px_rgba(236,72,153,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-pink-500 transition-colors duration-300">
              Lexicon Lock
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              An English anagram puzzle. Unscramble the letters to crack the vault. Difficulty scales up to 8-letter master words!
            </p>
            <Link href="/games/lexicon-lock" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-pink-600 dark:hover:bg-pink-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 9: Biometric Override */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-rose-500/10 hover:border-rose-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#2a0a18] to-[#4c0519] dark:from-black dark:via-gray-900 dark:to-rose-950"></div>
            <div className="absolute inset-0 bg-rose-500/10 blur-3xl rounded-full group-hover:bg-rose-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#f43f5e_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Fingerprint className="relative z-10 w-24 h-24 text-rose-500 drop-shadow-[0_0_15px_rgba(244,63,94,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-rose-500 transition-colors duration-300">
              Biometric Override
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              A native multi-touch selector. Everyone places a finger on the scanner; the system randomly locks onto one target.
            </p>
            <Link href="/games/biometric-override" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-rose-600 dark:hover:bg-rose-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 10: Core Meltdown */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-amber-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#2a1b0a] to-[#4c2d05] dark:from-black dark:via-gray-900 dark:to-amber-950"></div>
            <div className="absolute inset-0 bg-amber-500/10 blur-3xl rounded-full group-hover:bg-amber-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#f59e0b_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Zap className="relative z-10 w-24 h-24 text-amber-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)] group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-amber-500 transition-colors duration-300">
              Core Meltdown
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              A high-anxiety hot-potato game. Pass the unstable core before the hidden timer runs out. 
            </p>
            <Link href="/games/core-meltdown" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-amber-600 dark:hover:bg-amber-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 11: The Glitch Deck */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/10 hover:border-indigo-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#18112a] to-[#2c184c] dark:from-black dark:via-gray-900 dark:to-indigo-950"></div>
            <div className="absolute inset-0 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#6366f1_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Layers className="relative z-10 w-24 h-24 text-indigo-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-indigo-500 transition-colors duration-300">
              The Glitch Deck
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              A high-stakes 3D card draw. Select your player count and take turns flipping cards, but don't draw the Glitch.
            </p>
            <Link href="/games/glitch-deck" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-indigo-600 dark:hover:bg-indigo-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 12: Terminal Defuse */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-red-500/10 hover:border-red-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#241212] to-[#4c1818] dark:from-black dark:via-gray-900 dark:to-red-950"></div>
            <div className="absolute inset-0 bg-red-500/10 blur-3xl rounded-full group-hover:bg-red-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#ef4444_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Scissors className="relative z-10 w-24 h-24 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] group-hover:scale-110 group-hover:rotate-[-10deg] transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-red-500 transition-colors duration-300">
              Terminal Defuse
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              Action-movie wire cutting. Swipe to snap the neon wires, but do not trigger the live trap. 
            </p>
            <Link href="/games/terminal-defuse" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-red-600 dark:hover:bg-red-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

        {/* Game 13: Neural Duel */}
        <div className="group bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10 hover:border-green-500/30">
          <div className="h-48 relative flex items-center justify-center border-b border-gray-200 dark:border-white/10 overflow-hidden bg-gray-900">
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-[#102418] to-[#164c2a] dark:from-black dark:via-gray-900 dark:to-green-950"></div>
            <div className="absolute inset-0 bg-green-500/10 blur-3xl rounded-full group-hover:bg-green-500/20 transition-colors duration-700"></div>
            <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1.5px,transparent_1.5px)] opacity-[0.10] [background-size:16px_16px]"></div>
            <Swords className="relative z-10 w-24 h-24 text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)] group-hover:scale-110 transition-transform duration-500" />
          </div>
          <div className="p-6 relative z-10 flex flex-col h-[calc(100%-12rem)]">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-green-500 transition-colors duration-300">
              Neural Duel
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 flex-grow">
              A 1v1 split-screen reflex duel. Wait for the flash and tap your side first. If you tap early, your system short-circuits.
            </p>
            <Link href="/games/neural-duel" className="w-full flex items-center justify-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-3 rounded-xl font-bold tracking-wide hover:bg-green-600 dark:hover:bg-green-500 dark:hover:text-white transition-all duration-300 mt-auto">
              <Play className="w-4 h-4 fill-current" /> Play Now
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}