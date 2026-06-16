"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Target, Plus, Minus, Info, CheckCircle2, RotateCcw, Zap } from "lucide-react";
import Link from "next/link";

// The Product Backlog
const BACKLOG_TICKETS = [
  { id: "T-01", title: "Implement SSO Login", points: 5, value: 80, type: "feature" },
  { id: "T-02", title: "Fix Memory Leak in Checkout", points: 8, value: 100, type: "bug" },
  { id: "T-03", title: "Update Terms of Service Text", points: 2, value: 10, type: "chore" },
  { id: "T-04", title: "Add Dark Mode Toggle", points: 3, value: 40, type: "feature" },
  { id: "T-05", title: "Refactor Database Schema", points: 13, value: 90, type: "tech-debt" },
  { id: "T-06", title: "Dashboard Export to PDF", points: 5, value: 60, type: "feature" },
  { id: "T-07", title: "Resolve API Rate Limiting", points: 3, value: 50, type: "bug" },
  { id: "T-08", title: "New Onboarding Tooltips", points: 2, value: 30, type: "feature" },
];

const MAX_CAPACITY = 20; // Maximum Story Points for the sprint
const TARGET_VALUE = 260; // Value score user must hit to "Win"

export default function SprintPlanner() {
  const [sprint, setSprint] = useState<string[]>([]);
  
  // Calculations
  const currentPoints = sprint.reduce((acc, id) => {
    return acc + (BACKLOG_TICKETS.find(t => t.id === id)?.points || 0);
  }, 0);
  
  const currentValue = sprint.reduce((acc, id) => {
    return acc + (BACKLOG_TICKETS.find(t => t.id === id)?.value || 0);
  }, 0);

  const isOverCapacity = currentPoints > MAX_CAPACITY;
  const isWinning = !isOverCapacity && currentValue >= TARGET_VALUE;

  const toggleTicket = (id: string) => {
    if (sprint.includes(id)) {
      setSprint(sprint.filter(t => t !== id));
    } else {
      setSprint([...sprint, id]);
    }
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
      
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex items-center gap-4">
            <Target className="w-10 h-10 text-blue-500" />
            Sprint <span className="text-blue-500 dark:text-blue-400">Optimizer</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            You are the Product Manager. Build a sprint that generates at least <strong>{TARGET_VALUE} Business Value</strong> without exceeding your engineering capacity of <strong>{MAX_CAPACITY} Story Points</strong>.
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isWinning && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 p-6 bg-green-500/10 border border-green-500/30 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
              <div>
                <h3 className="font-bold text-green-500 text-lg">Sprint Goal Achieved!</h3>
                <p className="text-sm text-green-600 dark:text-green-400">You successfully maximized ROI while respecting engineering capacity constraints.</p>
              </div>
            </div>
            <button onClick={() => setSprint([])} className="flex items-center gap-2 bg-green-500 text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-green-600 transition-colors">
              <RotateCcw className="w-4 h-4" /> Reset Sprint
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: THE BACKLOG */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2 mb-4 px-2">
            <span className="font-bold text-sm text-gray-500 uppercase tracking-wide">Product Backlog ({BACKLOG_TICKETS.length} Items)</span>
          </div>
          <div className="space-y-3">
            {BACKLOG_TICKETS.map(ticket => {
              const inSprint = sprint.includes(ticket.id);
              return (
                <div 
                  key={ticket.id}
                  onClick={() => toggleTicket(ticket.id)}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    inSprint 
                      ? "bg-blue-500/5 border-blue-500/30 opacity-60 scale-[0.98]" 
                      : "bg-white dark:bg-[#121214] border-gray-200 dark:border-white/10 hover:border-blue-500/50 hover:shadow-lg"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-gray-400">{ticket.id}</span>
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${getBadgeColor(ticket.type)}`}>{ticket.type}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 dark:text-white">{ticket.title}</h3>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900 dark:text-white">{ticket.points} pts</div>
                      <div className="text-xs text-gray-500">Effort</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-green-600 dark:text-green-400">+{ticket.value}</div>
                      <div className="text-xs text-gray-500">Value</div>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${inSprint ? 'bg-red-500/10 text-red-500' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-white'}`}>
                      {inSprint ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT: THE CURRENT SPRINT */}
        <div className="lg:col-span-5">
          <div className="sticky top-28">
            <div className="flex items-center gap-2 mb-4 px-2">
              <span className="font-bold text-sm text-gray-500 uppercase tracking-wide">Current Sprint</span>
            </div>
            
            <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
              
              {/* Capacity Bar */}
              <div className="mb-8">
                <div className="flex justify-between text-sm font-bold mb-2">
                  <span className={isOverCapacity ? "text-red-500" : "text-gray-900 dark:text-white"}>
                    Capacity: {currentPoints} / {MAX_CAPACITY} pts
                  </span>
                  {isOverCapacity && <span className="text-red-500 flex items-center gap-1"><Info className="w-4 h-4" /> Overloaded</span>}
                </div>
                <div className="h-3 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((currentPoints / MAX_CAPACITY) * 100, 100)}%` }}
                    className={`h-full transition-colors ${isOverCapacity ? 'bg-red-500' : 'bg-blue-500'}`}
                  />
                </div>
              </div>

              {/* Value Tracker */}
              <div className="mb-8 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 opacity-50"></div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Generated Business Value</div>
                <div className="text-5xl font-black text-gray-900 dark:text-white mb-2">{currentValue}</div>
                <div className="text-sm text-gray-500 font-medium">Target: {TARGET_VALUE} Value</div>
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
                      const t = BACKLOG_TICKETS.find(ticket => ticket.id === id);
                      return (
                        <div key={id} className="flex justify-between items-center text-sm p-2 bg-gray-50 dark:bg-white/5 rounded-lg">
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