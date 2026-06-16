"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Target, Plus, Minus, Info, CheckCircle2, 
  RotateCcw, Zap, AlertTriangle, ShieldAlert, Wrench, ArrowRight 
} from "lucide-react";
import Link from "next/link";

// --- GAME DATA & LEVEL CONFIGURATIONS ---
const GAME_LEVELS = [
  {
    id: 1,
    title: "The Basics",
    description: "Maximize Business Value without exceeding engineering capacity.",
    maxCapacity: 20,
    targetValue: 260,
    rules: {},
    backlog: [
      { id: "T-01", title: "Implement SSO Login", points: 5, value: 80, type: "feature" },
      { id: "T-02", title: "Fix Memory Leak in Checkout", points: 8, value: 100, type: "bug" },
      { id: "T-03", title: "Update Terms of Service Text", points: 2, value: 10, type: "chore" },
      { id: "T-04", title: "Add Dark Mode Toggle", points: 3, value: 40, type: "feature" },
      { id: "T-05", title: "Refactor Database Schema", points: 13, value: 90, type: "tech-debt" },
      { id: "T-06", title: "Dashboard Export to PDF", points: 5, value: 60, type: "feature" },
      { id: "T-07", title: "Resolve API Rate Limiting", points: 3, value: 50, type: "bug" },
      { id: "T-08", title: "New Onboarding Tooltips", points: 2, value: 30, type: "feature" },
    ]
  },
  {
    id: 2,
    title: "The Hotfix",
    description: "A critical zero-day vulnerability was found. You MUST include the Security Patch, even though it provides no new business value.",
    maxCapacity: 22,
    targetValue: 220,
    rules: { mandatory: ["SEC-01"] },
    backlog: [
      { id: "SEC-01", title: "CRITICAL: Zero-Day Auth Patch", points: 5, value: 0, type: "bug" },
      { id: "F-01", title: "User Profile Avatars", points: 3, value: 40, type: "feature" },
      { id: "F-02", title: "Stripe Payment Integration", points: 8, value: 110, type: "feature" },
      { id: "F-03", title: "Email Notification System", points: 5, value: 70, type: "feature" },
      { id: "TD-01", title: "Migrate from Webpack to Vite", points: 8, value: 60, type: "tech-debt" },
      { id: "F-04", title: "Social Media Sharing", points: 4, value: 50, type: "feature" },
      { id: "B-01", title: "Fix Mobile Navbar Alignment", points: 2, value: 20, type: "bug" },
    ]
  },
  {
    id: 3,
    title: "Maintenance Window",
    description: "The system is unstable. You must dedicate at least 10 Story Points specifically to 'Bug' or 'Tech-Debt' tickets.",
    maxCapacity: 25,
    targetValue: 230,
    rules: { minMaintenancePoints: 10 },
    backlog: [
      { id: "F-10", title: "AI Chatbot Assistant", points: 8, value: 100, type: "feature" },
      { id: "TD-10", title: "Upgrade React Version", points: 6, value: 40, type: "tech-debt" },
      { id: "B-10", title: "Fix Timeout Errors on Search", points: 5, value: 50, type: "bug" },
      { id: "F-11", title: "Multi-Language Support", points: 5, value: 80, type: "feature" },
      { id: "B-11", title: "Resolve 404s on Old Links", points: 3, value: 20, type: "bug" },
      { id: "TD-11", title: "Optimize Image Assets", points: 4, value: 30, type: "tech-debt" },
      { id: "F-12", title: "Custom Dashboard Widgets", points: 6, value: 70, type: "feature" },
    ]
  },
  {
    id: 4,
    title: "Resource Bottleneck",
    description: "Your Lead Backend Engineer can only work on one major architecture ticket. You cannot pick BOTH the 'Database Migration' and 'GraphQL API'.",
    maxCapacity: 20,
    targetValue: 240,
    rules: { conflicts: [["ARCH-1", "ARCH-2"]] },
    backlog: [
      { id: "ARCH-1", title: "Migrate to PostgreSQL", points: 8, value: 110, type: "tech-debt" },
      { id: "ARCH-2", title: "Build GraphQL API", points: 7, value: 100, type: "feature" },
      { id: "F-20", title: "Two-Factor Authentication", points: 5, value: 80, type: "feature" },
      { id: "F-21", title: "In-App Messaging", points: 6, value: 90, type: "feature" },
      { id: "B-20", title: "Fix Safari Login Glitch", points: 2, value: 30, type: "bug" },
      { id: "F-22", title: "CSV Data Import", points: 4, value: 50, type: "feature" },
      { id: "C-20", title: "Update Privacy Policy", points: 1, value: 10, type: "chore" },
    ]
  },
  {
    id: 5,
    title: "The Master Sprint",
    description: "The ultimate PM test. Include the mandatory patch, dedicate 8 pts to maintenance, navigate the frontend conflict, and hit the value target.",
    maxCapacity: 28,
    targetValue: 260,
    rules: { 
      mandatory: ["M-01"], 
      minMaintenancePoints: 8, 
      conflicts: [["FE-1", "FE-2"]] 
    },
    backlog: [
      { id: "M-01", title: "COMPLIANCE: GDPR Deletion Tool", points: 5, value: 0, type: "chore" },
      { id: "FE-1", title: "Rewrite Checkout in Next.js", points: 8, value: 120, type: "tech-debt" },
      { id: "FE-2", title: "New Landing Page Design", points: 6, value: 100, type: "feature" },
      { id: "B-30", title: "Memory Leak in Background Jobs", points: 5, value: 40, type: "bug" },
      { id: "TD-30", title: "Remove Dead Code Library", points: 4, value: 40, type: "tech-debt" },
      { id: "F-30", title: "User Referral Program", points: 5, value: 80, type: "feature" },
      { id: "F-31", title: "Interactive Analytics Graphs", points: 5, value: 70, type: "feature" },
      { id: "F-32", title: "Push Notifications", points: 4, value: 60, type: "feature" },
    ]
  }
];

export default function SprintPlanner() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [sprint, setSprint] = useState<string[]>([]);
  
  const level = GAME_LEVELS[currentLevelIndex];
  const rules = level.rules;
  const isGameComplete = currentLevelIndex === GAME_LEVELS.length - 1;

  // --- ENGINE CALCULATIONS ---
  const currentPoints = sprint.reduce((acc, id) => acc + (level.backlog.find(t => t.id === id)?.points || 0), 0);
  const currentValue = sprint.reduce((acc, id) => acc + (level.backlog.find(t => t.id === id)?.value || 0), 0);
  
  const maintenancePoints = sprint.reduce((acc, id) => {
    const t = level.backlog.find(t => t.id === id);
    if (t && (t.type === 'bug' || t.type === 'tech-debt')) return acc + t.points;
    return acc;
  }, 0);

  // --- RULE VALIDATION ---
  const isOverCapacity = currentPoints > level.maxCapacity;
  const meetsValue = currentValue >= level.targetValue;
  
  const meetsMandatory = !rules.mandatory ? true : rules.mandatory.every(id => sprint.includes(id));
  const meetsMaintenance = !rules.minMaintenancePoints ? true : maintenancePoints >= rules.minMaintenancePoints;
  
  const hasConflicts = !rules.conflicts ? false : rules.conflicts.some(pair => sprint.includes(pair[0]) && sprint.includes(pair[1]));

  // Ultimate Win Condition
  const isWinning = !isOverCapacity && meetsValue && meetsMandatory && meetsMaintenance && !hasConflicts;

  const toggleTicket = (id: string) => {
    if (sprint.includes(id)) {
      setSprint(sprint.filter(t => t !== id));
    } else {
      setSprint([...sprint, id]);
    }
  };

  const nextLevel = () => {
    setSprint([]);
    setCurrentLevelIndex(prev => prev + 1);
  };

  const resetGame = () => {
    setSprint([]);
    setCurrentLevelIndex(0);
  };

  const getBadgeColor = (type: string) => {
    switch(type) {
      case "feature": return "bg-blue-500/10 text-blue-500 border-blue-500/20";
      case "bug": return "bg-red-500/10 text-red-500 border-red-500/20";
      case "tech-debt": return "bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 border-yellow-500/20";
      default: return "bg-gray-500/10 text-gray-500 border-gray-500/20";
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      {/* HEADER */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white flex items-center gap-4">
              <Target className="w-10 h-10 text-blue-500" />
              Sprint <span className="text-blue-500 dark:text-blue-400">Optimizer</span>
            </h1>
            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-sm font-bold uppercase tracking-widest border border-blue-500/20">
              Level {currentLevelIndex + 1} / {GAME_LEVELS.length}
            </span>
          </div>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            <span className="font-bold text-gray-900 dark:text-white">{level.title}: </span>{level.description}
          </p>
        </div>
      </div>

      {/* SUCCESS BANNER */}
      <AnimatePresence mode="wait">
        {isWinning && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-green-500/5">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-500 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-green-500 text-lg">
                  {isGameComplete ? "Master Product Manager!" : "Sprint Goal Achieved!"}
                </h3>
                <p className="text-sm text-green-600 dark:text-green-400">
                  {isGameComplete ? "You navigated every constraint and optimized all 5 sprints flawlessly." : "You successfully maximized ROI while respecting all engineering constraints."}
                </p>
              </div>
            </div>
            {isGameComplete ? (
              <button onClick={resetGame} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20">
                <RotateCcw className="w-4 h-4" /> Play Again
              </button>
            ) : (
              <button onClick={nextLevel} className="flex items-center justify-center gap-2 w-full sm:w-auto bg-blue-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/20">
                Start Level {currentLevelIndex + 2} <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* === LEFT: THE BACKLOG === */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-4 px-2">
            <span className="font-bold text-sm text-gray-500 uppercase tracking-wide">Product Backlog ({level.backlog.length} Items)</span>
          </div>
          <div className="space-y-3">
            {level.backlog.map(ticket => {
              const inSprint = sprint.includes(ticket.id);
              const isMandatory = rules.mandatory?.includes(ticket.id);
              
              // Highlight conflicts visually on the tickets
              let isConflicting = false;
              if (rules.conflicts && inSprint) {
                rules.conflicts.forEach(pair => {
                  if ((pair[0] === ticket.id && sprint.includes(pair[1])) || (pair[1] === ticket.id && sprint.includes(pair[0]))) {
                    isConflicting = true;
                  }
                });
              }

              return (
                <div 
                  key={ticket.id}
                  onClick={() => toggleTicket(ticket.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    inSprint 
                      ? isConflicting 
                        ? "bg-red-500/10 border-red-500/50 scale-[0.98]" 
                        : "bg-blue-500/5 border-blue-500/30 opacity-70 scale-[0.98]" 
                      : "bg-white dark:bg-[#121214] border-gray-200 dark:border-white/10 hover:border-blue-500/50 hover:shadow-lg"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-gray-400">{ticket.id}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 ${getBadgeColor(ticket.type)}`}>
                        {ticket.type}
                      </span>
                      {isMandatory && <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border bg-red-500/10 text-red-500 border-red-500/20 flex items-center gap-1"><ShieldAlert className="w-3 h-3" /> Mandatory</span>}
                    </div>
                    <h3 className={`font-bold ${isConflicting ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>{ticket.title}</h3>
                  </div>
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{ticket.points} pts</div>
                      <div className="text-xs text-gray-500">Effort</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600 dark:text-green-400">+{ticket.value}</div>
                      <div className="text-xs text-gray-500">Value</div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${inSprint ? isConflicting ? 'bg-red-500 text-white' : 'bg-red-500/10 text-red-500' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white'}`}>
                      {inSprint ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* === RIGHT: SPRINT DASHBOARD === */}
        <div className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            
            {/* 1. Constraint Checklist Box */}
            <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide text-sm">Sprint Objectives</h3>
              <div className="space-y-3">
                
                {/* Rule: Value Target */}
                <div className={`flex items-center justify-between p-3 rounded-xl border ${meetsValue ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400'}`}>
                  <span className="font-medium text-sm">Hit {level.targetValue} Business Value</span>
                  {meetsValue ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold">{currentValue} / {level.targetValue}</span>}
                </div>

                {/* Rule: Capacity Check */}
                <div className={`flex items-center justify-between p-3 rounded-xl border ${isOverCapacity ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'}`}>
                  <span className="font-medium text-sm">Stay under {level.maxCapacity} Points</span>
                  {isOverCapacity ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>

                {/* Optional Rule: Mandatory */}
                {rules.mandatory && (
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${meetsMandatory ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-500'}`}>
                    <span className="font-medium text-sm flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Include Mandatory Tickets</span>
                    {meetsMandatory ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                )}

                {/* Optional Rule: Maintenance */}
                {rules.minMaintenancePoints && (
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${meetsMaintenance ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-500'}`}>
                    <span className="font-medium text-sm flex items-center gap-2"><Wrench className="w-4 h-4"/> {rules.minMaintenancePoints}+ pts of Bug/Tech-Debt</span>
                    {meetsMaintenance ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold">{maintenancePoints} / {rules.minMaintenancePoints}</span>}
                  </div>
                )}

                {/* Optional Rule: Conflicts */}
                {rules.conflicts && (
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${hasConflicts ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'}`}>
                    <span className="font-medium text-sm">Resolve Resource Conflicts</span>
                    {hasConflicts ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                )}

              </div>
            </div>

            {/* 2. Visual Capacity & Summary Box */}
            <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
              
              {/* Capacity Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className={isOverCapacity ? "text-red-500" : "text-gray-900 dark:text-white"}>
                    Capacity: {currentPoints} / {level.maxCapacity} pts
                  </span>
                  {isOverCapacity && <span className="text-red-500 flex items-center gap-1"><Info className="w-4 h-4" /> Overloaded</span>}
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((currentPoints / level.maxCapacity) * 100, 100)}%` }}
                    className={`h-full transition-colors ${isOverCapacity ? 'bg-red-500' : 'bg-blue-500'}`}
                  />
                </div>
              </div>

              {/* Value Tracker */}
              <div className="mb-8 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 opacity-50"></div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Business Value</div>
                <div className={`text-5xl font-black mb-2 transition-colors ${meetsValue ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>{currentValue}</div>
              </div>

              {/* Selected Tickets Summary */}
              <div>
                <div className="text-sm font-bold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-500" /> Active Tickets ({sprint.length})
                </div>
                {sprint.length === 0 ? (
                  <div className="text-sm text-gray-500 italic p-4 text-center border border-dashed border-gray-300 dark:border-white/10 rounded-xl">
                    Click tickets in the backlog to add them to your sprint.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {sprint.map(id => {
                      const t = level.backlog.find(ticket => ticket.id === id);
                      return (
                        <div key={id} className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-white/5 rounded-lg border border-transparent">
                          <span className="font-medium text-gray-900 dark:text-white truncate pr-4">{t?.title}</span>
                          <span className="text-gray-500 flex-shrink-0">{t?.points} pts</span>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>

            </div>
          </div>
        </div>

      </div>
    </main>
  );
}