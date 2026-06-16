"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Bug, ShieldCheck, CreditCard, Users, RefreshCcw, 
  ArrowRight, User, Lock, Unlock, ToggleRight, ShoppingCart, ShieldAlert,
  Mail, Key, CheckCircle2, XCircle
} from "lucide-react";
import Link from "next/link";

const GAME_LEVELS = [
  { id: 1, title: "Financial Dashboard", description: "Find the 5 visual regressions in the Staging build's finance cards.", totalBugs: 5 },
  { id: 2, title: "User Settings Form", description: "Review the Account Settings. Check for bad security icons, typos, and broken toggle states.", totalBugs: 5 },
  { id: 3, title: "E-Commerce Checkout", description: "Audit the checkout flow. Look out for bad pricing formats, incorrect math, and wrong button states.", totalBugs: 5 },
  { id: 4, title: "Login Portal", description: "Check the authentication screen for contrast issues, wrong icons, typos, and alignment.", totalBugs: 5 },
  { id: 5, title: "SaaS Pricing Tier", description: "Audit the Pro tier card for bad billing copy, missing features, wrong currencies, and bad styling.", totalBugs: 5 }
];

export default function QABugHunt() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [foundBugs, setFoundBugs] = useState<string[]>([]);
  
  const levelConfig = GAME_LEVELS[currentLevel];
  const isLevelWon = foundBugs.length === levelConfig.totalBugs;
  const isGameComplete = isLevelWon && currentLevel === GAME_LEVELS.length - 1;

  const handleBugClick = (bugId: string) => {
    if (!foundBugs.includes(bugId)) setFoundBugs([...foundBugs, bugId]);
  };

  const nextLevel = () => {
    setFoundBugs([]);
    setCurrentLevel(prev => prev + 1);
  };

  const resetGame = () => {
    setFoundBugs([]);
    setCurrentLevel(0);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-4">
              <Bug className="w-10 h-10 text-blue-500" />
              QA <span className="text-blue-500 dark:text-blue-400">Bug Hunt</span>
            </h1>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-bold uppercase tracking-widest border border-blue-500/20">
              Level {currentLevel + 1} / {GAME_LEVELS.length}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            {levelConfig.description}
          </p>
        </div>
        
        <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 px-6 py-4 rounded-2xl flex items-center gap-4 shadow-lg">
          <div className="text-sm font-bold text-gray-500 uppercase tracking-wider">Bugs Found</div>
          <div className={`text-2xl font-black transition-colors duration-300 ${isLevelWon ? 'text-green-500' : 'text-blue-500'}`}>
            {foundBugs.length} / {levelConfig.totalBugs}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isLevelWon && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <ShieldCheck className="w-8 h-8 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-500 text-lg">{isGameComplete ? "QA Master Certified!" : "Build Approved!"}</h3>
                <p className="text-sm text-green-600 dark:text-green-400">{isGameComplete ? "You found every single regression across all builds." : "You successfully identified all UI regressions in this build."}</p>
              </div>
            </div>
            {isGameComplete ? (
              <button onClick={resetGame} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-green-600 transition-colors"><RefreshCcw className="w-4 h-4" /> Play Again</button>
            ) : (
              <button onClick={nextLevel} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-600 transition-colors">Proceed to Level {currentLevel + 2} <ArrowRight className="w-4 h-4" /></button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* === LEFT: PRODUCTION BUILD (Correct) === */}
        <div className="opacity-80">
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="font-bold text-sm text-gray-500 uppercase tracking-wide">Production (Reference)</span>
          </div>
          <div className="bg-white dark:bg-[#121214] border-2 border-gray-200 dark:border-white/10 rounded-3xl p-8 pointer-events-none min-h-[400px]">
            
            {/* LEVEL 1 */}
            {currentLevel === 0 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Financial Overview</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl"><CreditCard className="w-6 h-6 text-blue-500 mb-2" /><div className="text-sm text-gray-500">Total Revenue</div><div className="text-xl font-bold text-gray-900 dark:text-white">$45,231.89</div></div>
                  <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl"><Users className="w-6 h-6 text-blue-500 mb-2" /><div className="text-sm text-gray-500">Active Users</div><div className="text-xl font-bold text-gray-900 dark:text-white">1,204</div></div>
                </div>
                <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold">Generate Report</button>
              </>
            )}

            {/* LEVEL 2 */}
            {currentLevel === 1 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h2>
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm text-gray-500 block mb-1">Email Address</label><div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white flex items-center gap-3"><User className="w-4 h-4 text-gray-400" /> user@kghtetoo.com</div></div>
                  <div><label className="text-sm text-gray-500 block mb-1">Password</label><div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white flex items-center gap-3"><Lock className="w-4 h-4 text-gray-400" /> ••••••••••••</div></div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg"><span className="text-gray-900 dark:text-white font-medium">Push Notifications</span><ToggleRight className="w-8 h-8 text-blue-500" /></div>
                </div>
                <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold">Save Changes</button>
              </>
            )}

            {/* LEVEL 3 */}
            {currentLevel === 2 && (
              <>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 mb-6">
                  <div className="flex justify-between text-gray-900 dark:text-white mb-2"><span>Premium Subscription</span><span className="font-medium">$99.00</span></div>
                  <div className="flex justify-between text-gray-500 mb-4 pb-4 border-b border-gray-200 dark:border-white/10"><span>Digital Tax (5%)</span><span>$4.95</span></div>
                  <div className="flex justify-between text-gray-900 dark:text-white text-xl font-bold"><span>Total USD</span><span>$103.95</span></div>
                </div>
                <button className="w-full bg-green-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"><ShoppingCart className="w-5 h-5" /> Checkout Securely</button>
              </>
            )}

            {/* LEVEL 4 */}
            {currentLevel === 3 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
                  <p className="text-gray-500 text-sm">Please sign in to your account</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white flex items-center gap-3"><Mail className="w-5 h-5 text-gray-400" /> <span className="text-gray-400">Email Address</span></div>
                  <div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white flex items-center gap-3"><Key className="w-5 h-5 text-gray-400" /> <span className="text-gray-400">Password</span></div>
                </div>
                <button className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold mb-4">Sign In</button>
                <div className="text-center text-sm text-blue-500 font-medium">Forgot Password?</div>
              </>
            )}

            {/* LEVEL 5 */}
            {currentLevel === 4 && (
              <>
                <div className="text-center mb-6">
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 rounded-full text-xs font-bold uppercase tracking-wider">Pro Tier</span>
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-1">$49.00</div>
                  <div className="text-sm text-gray-500">per user / month</div>
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Unlimited Projects</div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Priority Support</div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Advanced Analytics</div>
                </div>
                <button className="w-full border-2 border-blue-500 text-blue-500 py-3 rounded-xl font-bold">Upgrade to Pro</button>
              </>
            )}

          </div>
        </div>

        {/* === RIGHT: STAGING BUILD (Has 5 Bugs) === */}
        <div>
          <div className="flex items-center gap-2 mb-4 px-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"></div>
            <span className="font-bold text-sm text-yellow-600 dark:text-yellow-500 uppercase tracking-wide">Staging (Find Bugs Here)</span>
          </div>
          <div className={`bg-white dark:bg-[#121214] border-2 rounded-3xl p-8 min-h-[400px] transition-colors ${isLevelWon ? 'border-green-500/50' : 'border-blue-500/30 shadow-[0_0_30px_rgba(59,130,246,0.1)]'}`}>
            
            {/* LEVEL 1 BUGS */}
            {currentLevel === 0 && (
              <>
                <h2 onClick={() => handleBugClick("header-typo")} className={`text-2xl font-bold mb-6 cursor-pointer transition-colors ${foundBugs.includes("header-typo") ? "text-red-500 line-through" : "hover:text-gray-400"}`}>Finance Overview</h2>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl"><CreditCard onClick={() => handleBugClick("icon-color")} className={`w-6 h-6 mb-2 cursor-pointer transition-colors ${foundBugs.includes("icon-color") ? "text-red-500" : "text-purple-500 hover:opacity-70"}`} /><div className="text-sm text-gray-500">Total Revenue</div><div onClick={() => handleBugClick("number-format")} className={`text-xl font-bold cursor-pointer transition-colors ${foundBugs.includes("number-format") ? "text-red-500 line-through" : "hover:text-gray-400"}`}>$45,231,89</div></div>
                  <div onClick={() => handleBugClick("border-radius")} className={`bg-gray-50 dark:bg-white/5 p-4 cursor-pointer transition-all ${foundBugs.includes("border-radius") ? "rounded-xl border-2 border-red-500 bg-red-50 dark:bg-red-500/10" : "rounded-sm border-2 border-transparent hover:border-gray-300 dark:hover:border-white/20"}`}><Users className="w-6 h-6 text-blue-500 mb-2 pointer-events-none" /><div className="text-sm text-gray-500 pointer-events-none">Active Users</div><div className="text-xl font-bold text-gray-900 dark:text-white pointer-events-none">1,204</div></div>
                </div>
                <button onClick={() => handleBugClick("button-typo")} className={`w-full text-white py-3 rounded-xl font-bold transition-colors ${foundBugs.includes("button-typo") ? "bg-red-500 line-through" : "bg-blue-500 hover:bg-blue-600"}`}>Generte Report</button>
              </>
            )}

            {/* LEVEL 2 BUGS */}
            {currentLevel === 1 && (
              <>
                <h2 onClick={() => handleBugClick("l2-header")} className={`text-2xl font-bold mb-6 cursor-pointer transition-colors ${foundBugs.includes("l2-header") ? "text-red-500 line-through" : "hover:text-gray-400"}`}>Acount Settings</h2>
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm text-gray-500 block mb-1">Email Address</label><div onClick={() => handleBugClick("l2-email")} className={`cursor-pointer w-full bg-gray-50 dark:bg-white/5 border rounded-lg p-3 flex items-center gap-3 transition-colors ${foundBugs.includes("l2-email") ? "border-red-500 text-red-500 line-through" : "border-gray-200 dark:border-white/10 hover:border-gray-400"}`}><User className="w-4 h-4 pointer-events-none text-gray-400" /> user@kghtetoo .com</div></div>
                  <div><label className="text-sm text-gray-500 block mb-1">Password</label><div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 flex items-center gap-3"><Unlock onClick={() => handleBugClick("l2-icon")} className={`w-4 h-4 cursor-pointer transition-colors ${foundBugs.includes("l2-icon") ? "text-red-500" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`} /> ••••••••••••</div></div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg"><span className="font-medium">Push Notifications</span><ToggleRight onClick={() => handleBugClick("l2-toggle")} className={`w-8 h-8 cursor-pointer transition-colors ${foundBugs.includes("l2-toggle") ? "text-red-500" : "text-red-400 hover:text-red-500"}`} /></div>
                </div>
                <button onClick={() => handleBugClick("l2-btn")} className={`w-full py-3 rounded-xl font-bold transition-colors ${foundBugs.includes("l2-btn") ? "bg-red-500 text-white line-through" : "bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-gray-400 hover:bg-gray-300"}`}>Save Changes</button>
              </>
            )}

            {/* LEVEL 3 BUGS */}
            {currentLevel === 2 && (
              <>
                <h2 onClick={() => handleBugClick("l3-header")} className={`text-2xl font-bold mb-6 cursor-pointer transition-colors ${foundBugs.includes("l3-header") ? "text-red-500 line-through" : "hover:text-gray-400"}`}>Order Sumary</h2>
                <div className="bg-gray-50 dark:bg-white/5 rounded-2xl p-6 mb-6">
                  <div className="flex justify-between mb-2"><span>Premium Subscription</span><span onClick={() => handleBugClick("l3-price")} className={`font-medium cursor-pointer transition-colors ${foundBugs.includes("l3-price") ? "text-red-500 line-through" : "hover:text-gray-400"}`}>$99,00</span></div>
                  <div className="flex justify-between text-gray-500 mb-4 pb-4 border-b border-gray-200 dark:border-white/10"><span>Digital Tax (5%)</span><span onClick={() => handleBugClick("l3-tax")} className={`cursor-pointer transition-colors ${foundBugs.includes("l3-tax") ? "text-red-500 line-through" : "hover:text-gray-900 dark:hover:text-white"}`}>$40.95</span></div>
                  <div className="flex justify-between text-xl font-bold"><span>Total USD</span><span>$103.95</span></div>
                </div>
                <button onClick={() => handleBugClick("l3-btn-color")} className={`w-full text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors ${foundBugs.includes("l3-btn-color") ? "bg-red-500" : "bg-blue-500 hover:bg-blue-600"}`}>
                  <ShieldAlert onClick={(e) => { e.stopPropagation(); handleBugClick("l3-btn-icon"); }} className={`w-5 h-5 cursor-pointer transition-colors ${foundBugs.includes("l3-btn-icon") ? "text-red-900" : "hover:text-gray-300"}`} /> 
                  <span className={foundBugs.includes("l3-btn-color") ? "line-through text-red-900" : ""}>Checkout Securely</span>
                </button>
              </>
            )}

            {/* LEVEL 4 BUGS */}
            {currentLevel === 3 && (
              <>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome Back</h2>
                  <p onClick={() => handleBugClick("l4-subtitle")} className={`text-sm cursor-pointer transition-colors ${foundBugs.includes("l4-subtitle") ? "text-red-500 line-through" : "text-gray-900 dark:text-white hover:text-gray-400"}`}>Please sign in to your acount</p> {/* Typo */}
                </div>
                <div className="space-y-4 mb-6">
                  <div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white flex items-center gap-3">
                    <User onClick={() => handleBugClick("l4-icon")} className={`w-5 h-5 cursor-pointer transition-colors ${foundBugs.includes("l4-icon") ? "text-red-500" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`} /> {/* Wrong icon */}
                    <span className="text-gray-400">Email Address</span>
                  </div>
                  <div className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg p-3 text-gray-900 dark:text-white flex items-center gap-3"><Key className="w-5 h-5 text-gray-400" /> <span className="text-gray-400">Password</span></div>
                </div>
                <button onClick={() => handleBugClick("l4-btn")} className={`w-full py-3 rounded-xl font-bold mb-4 transition-colors ${foundBugs.includes("l4-btn") ? "bg-red-500 text-white line-through" : "bg-gray-300 text-gray-600 dark:bg-white/20 dark:text-gray-300 hover:bg-gray-400"}`}>Sign In</button> {/* Bad contrast button */}
                <div onClick={() => handleBugClick("l4-align")} className={`text-left text-sm font-medium cursor-pointer transition-colors ${foundBugs.includes("l4-align") ? "text-red-500 line-through text-center" : "text-blue-500"}`}>Forgot Password?</div> {/* Misaligned */}
              </>
            )}

            {/* LEVEL 5 BUGS */}
            {currentLevel === 4 && (
              <>
                <div className="text-center mb-6">
                  <span onClick={() => handleBugClick("l5-badge")} className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors ${foundBugs.includes("l5-badge") ? "bg-red-500/20 text-red-500 line-through" : "bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-gray-400"}`}>Pro Tier</span> {/* Wrong badge color */}
                  <div className="text-4xl font-bold text-gray-900 dark:text-white mt-4 mb-1 flex justify-center items-baseline gap-1">
                    <span onClick={() => handleBugClick("l5-currency")} className={`cursor-pointer transition-colors ${foundBugs.includes("l5-currency") ? "text-red-500 line-through" : "text-gray-900 dark:text-white hover:text-gray-400"}`}>€</span> {/* Euro instead of Dollar */}
                    49.00
                  </div>
                  <div onClick={() => handleBugClick("l5-billing")} className={`text-sm cursor-pointer transition-colors ${foundBugs.includes("l5-billing") ? "text-red-500 line-through" : "text-gray-500 hover:text-gray-900 dark:hover:text-white"}`}>per year / user</div> {/* Says year instead of month */}
                </div>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Unlimited Projects</div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm">
                    <XCircle onClick={() => handleBugClick("l5-check")} className={`w-4 h-4 cursor-pointer transition-colors ${foundBugs.includes("l5-check") ? "text-red-500" : "text-gray-400 hover:text-gray-900 dark:hover:text-white"}`} /> Priority Support {/* X instead of Check */}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 text-sm"><CheckCircle2 className="w-4 h-4 text-green-500" /> Advanced Analytics</div>
                </div>
                <button onClick={() => handleBugClick("l5-btn")} className={`w-full border-2 py-3 rounded-xl font-bold transition-colors ${foundBugs.includes("l5-btn") ? "bg-red-500 text-white border-red-500 line-through" : "bg-blue-500 text-white border-blue-500"}`}>Upgrade to Pro</button> {/* Solid fill instead of outline */}
              </>
            )}

          </div>
        </div>

      </div>
    </main>
  );
}