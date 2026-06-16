"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, Target, Plus, Minus, Info, CheckCircle2, 
  RotateCcw, Zap, AlertTriangle, ShieldAlert, Wrench, ArrowRight, Download 
} from "lucide-react";
import Link from "next/link";

// --- GAME DATA & LEVEL CONFIGURATIONS ---
const GAME_LEVELS = [
  {
    id: 1, title: "The Basics", description: "Maximize Business Value without exceeding engineering capacity.",
    maxCapacity: 20, targetValue: 260, rules: {},
    backlog: [
      { id: "T-01", title: "Implement SSO Login", points: 5, value: 80, type: "feature" },
      { id: "T-02", title: "Fix Memory Leak", points: 8, value: 100, type: "bug" },
      { id: "T-03", title: "Update TOS Text", points: 2, value: 10, type: "chore" },
      { id: "T-04", title: "Add Dark Mode", points: 3, value: 40, type: "feature" },
      { id: "T-05", title: "Refactor DB Schema", points: 13, value: 90, type: "tech-debt" },
      { id: "T-06", title: "Dashboard PDF Export", points: 5, value: 60, type: "feature" },
      { id: "T-07", title: "Resolve API Limits", points: 3, value: 50, type: "bug" },
      { id: "T-08", title: "New Tooltips", points: 2, value: 30, type: "feature" },
    ]
  },
  {
    id: 2, title: "The Hotfix", description: "A critical zero-day vulnerability was found. You MUST include the Security Patch.",
    maxCapacity: 22, targetValue: 220, rules: { mandatory: ["SEC-01"] },
    backlog: [
      { id: "SEC-01", title: "CRITICAL: Auth Patch", points: 5, value: 0, type: "bug" },
      { id: "F-01", title: "User Avatars", points: 3, value: 40, type: "feature" },
      { id: "F-02", title: "Stripe Integration", points: 8, value: 110, type: "feature" },
      { id: "F-03", title: "Email System", points: 5, value: 70, type: "feature" },
      { id: "TD-01", title: "Migrate to Vite", points: 8, value: 60, type: "tech-debt" },
      { id: "F-04", title: "Social Sharing", points: 4, value: 50, type: "feature" },
      { id: "B-01", title: "Fix Navbar", points: 2, value: 20, type: "bug" },
    ]
  },
  {
    id: 3, title: "Maintenance Window", description: "Dedicate at least 10 Story Points specifically to 'Bug' or 'Tech-Debt' tickets.",
    maxCapacity: 25, targetValue: 230, rules: { minMaintenancePoints: 10 },
    backlog: [
      { id: "F-10", title: "AI Chatbot Assistant", points: 8, value: 100, type: "feature" },
      { id: "TD-10", title: "Upgrade React Version", points: 6, value: 40, type: "tech-debt" },
      { id: "B-10", title: "Fix Timeout Errors", points: 5, value: 50, type: "bug" },
      { id: "F-11", title: "Multi-Language", points: 5, value: 80, type: "feature" },
      { id: "B-11", title: "Resolve 404s", points: 3, value: 20, type: "bug" },
      { id: "TD-11", title: "Optimize Assets", points: 4, value: 30, type: "tech-debt" },
      { id: "F-12", title: "Custom Widgets", points: 6, value: 70, type: "feature" },
    ]
  },
  {
    id: 4, title: "Resource Bottleneck", description: "Your Lead Backend Engineer can only work on ONE major architecture ticket. (Conflict)",
    maxCapacity: 20, targetValue: 240, rules: { conflicts: [["ARCH-1", "ARCH-2"]] },
    backlog: [
      { id: "ARCH-1", title: "Migrate to PostgreSQL", points: 8, value: 110, type: "tech-debt" },
      { id: "ARCH-2", title: "Build GraphQL API", points: 7, value: 100, type: "feature" },
      { id: "F-20", title: "Two-Factor Auth", points: 5, value: 80, type: "feature" },
      { id: "F-21", title: "In-App Messaging", points: 6, value: 90, type: "feature" },
      { id: "B-20", title: "Fix Safari Glitch", points: 2, value: 30, type: "bug" },
      { id: "F-22", title: "CSV Import", points: 4, value: 50, type: "feature" },
      { id: "C-20", title: "Update Privacy", points: 1, value: 10, type: "chore" },
    ]
  },
  {
    id: 5, title: "The Master Sprint", description: "Include mandatory patch, 8 pts maintenance, navigate conflict, and hit target.",
    maxCapacity: 28, targetValue: 260,
    rules: { mandatory: ["M-01"], minMaintenancePoints: 8, conflicts: [["FE-1", "FE-2"]] },
    backlog: [
      { id: "M-01", title: "COMPLIANCE: GDPR", points: 5, value: 0, type: "chore" },
      { id: "FE-1", title: "Rewrite Checkout", points: 8, value: 120, type: "tech-debt" },
      { id: "FE-2", title: "New Landing Page", points: 6, value: 100, type: "feature" },
      { id: "B-30", title: "Memory Leak", points: 5, value: 40, type: "bug" },
      { id: "TD-30", title: "Remove Dead Code", points: 4, value: 40, type: "tech-debt" },
      { id: "F-30", title: "Referral Program", points: 5, value: 80, type: "feature" },
      { id: "F-31", title: "Interactive Graphs", points: 5, value: 70, type: "feature" },
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

  const currentPoints = sprint.reduce((acc, id) => acc + (level.backlog.find(t => t.id === id)?.points || 0), 0);
  const currentValue = sprint.reduce((acc, id) => acc + (level.backlog.find(t => t.id === id)?.value || 0), 0);
  
  const maintenancePoints = sprint.reduce((acc, id) => {
    const t = level.backlog.find(t => t.id === id);
    if (t && (t.type === 'bug' || t.type === 'tech-debt')) return acc + t.points;
    return acc;
  }, 0);

  const isOverCapacity = currentPoints > level.maxCapacity;
  const meetsValue = currentValue >= level.targetValue;
  const meetsMandatory = !rules.mandatory ? true : rules.mandatory.every(id => sprint.includes(id));
  const meetsMaintenance = !rules.minMaintenancePoints ? true : maintenancePoints >= rules.minMaintenancePoints;
  const hasConflicts = !rules.conflicts ? false : rules.conflicts.some(pair => sprint.includes(pair[0]) && sprint.includes(pair[1]));

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

  // --- PREMIUM CERTIFICATE GENERATOR ---
  const downloadCertificate = async () => {
    const canvas = document.createElement("canvas");
    canvas.width = 1600; 
    canvas.height = 1200;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    // Premium Corporate Blue/Slate Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGrad.addColorStop(0, "#0f172a"); // Slate 900
    bgGrad.addColorStop(1, "#020617"); // Slate 950
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Subtle Blueprint Grid Overlay
    ctx.strokeStyle = "rgba(59, 130, 246, 0.05)"; // Very faint blue
    ctx.lineWidth = 2;
    for(let i = 0; i < canvas.width; i+=40) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for(let i = 0; i < canvas.height; i+=40) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }
    
    // Elegant Multi-layer Borders
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 2;
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

    ctx.strokeStyle = "#3b82f6"; // Blue 500
    ctx.lineWidth = 6;
    ctx.strokeRect(80, 80, canvas.width - 160, canvas.height - 160);

    // Corner Accents (Corporate Blocks)
    ctx.fillStyle = "#3b82f6";
    const cSize = 20;
    ctx.fillRect(70, 70, cSize, cSize);
    ctx.fillRect(canvas.width - 70 - cSize, 70, cSize, cSize);
    ctx.fillRect(70, canvas.height - 70 - cSize, cSize, cSize);
    ctx.fillRect(canvas.width - 70 - cSize, canvas.height - 70 - cSize, cSize, cSize);

    // Load Favicon / Logo
    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = "/favicon.ico";
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });
      ctx.drawImage(img, canvas.width / 2 - 60, 160, 120, 120);
    } catch (e) {
      // Fallback: Stylized Target/Bullseye
      ctx.save();
      ctx.translate(canvas.width / 2, 220);
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 12;
      ctx.beginPath(); ctx.arc(0, 0, 45, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.arc(0, 0, 18, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
    }

    // Typography
    ctx.textAlign = "center";
    
    // Header
    (ctx as any).letterSpacing = "8px";
    ctx.fillStyle = "#3b82f6";
    ctx.font = "bold 26px sans-serif";
    ctx.fillText("AGILE PRODUCT MANAGEMENT", canvas.width / 2, 380);

    // Main Title
    (ctx as any).letterSpacing = "2px";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 85px sans-serif";
    ctx.fillText("CERTIFIED SPRINT OPTIMIZER", canvas.width / 2, 500);

    // Line Separator
    ctx.fillStyle = "#3b82f6";
    ctx.fillRect(canvas.width / 2 - 150, 560, 300, 4);

    // Body Text
    (ctx as any).letterSpacing = "0px";
    ctx.fillStyle = "#94a3b8"; // Slate 400
    ctx.font = "italic 36px sans-serif";
    ctx.fillText("This official document verifies that the player has demonstrated", canvas.width / 2, 680);
    ctx.fillText("exceptional skill in managing engineering capacity, technical debt,", canvas.width / 2, 740);
    ctx.fillText("and business value across all Sprint Optimizer simulations.", canvas.width / 2, 800);

    // Rank
    (ctx as any).letterSpacing = "4px";
    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 40px sans-serif";
    ctx.fillText("RANK ACHIEVED: MASTER PRODUCT MANAGER", canvas.width / 2, 960);

    // Date
    (ctx as any).letterSpacing = "2px";
    const date = new Date().toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' });
    ctx.fillStyle = "#64748b"; // Slate 500
    ctx.font = "24px monospace";
    ctx.fillText(`VERIFIED ON: ${date}`, canvas.width / 2, 1060);

    const link = document.createElement("a");
    link.download = "Sprint-Optimizer-Master-Certificate.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
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
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <button onClick={downloadCertificate} className="flex items-center justify-center gap-2 bg-white text-green-600 border-2 border-green-500 px-6 py-3 rounded-full font-bold text-sm hover:bg-green-50 transition-colors shadow-lg shadow-green-500/20">
                  <Download className="w-4 h-4" /> Certificate
                </button>
                <button onClick={resetGame} className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-green-600 transition-colors shadow-lg shadow-green-500/20">
                  <RotateCcw className="w-4 h-4" /> Play Again
                </button>
              </div>
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
            
            <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wide text-sm">Sprint Objectives</h3>
              <div className="space-y-3">
                <div className={`flex items-center justify-between p-3 rounded-xl border ${meetsValue ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400'}`}>
                  <span className="font-medium text-sm">Hit {level.targetValue} Business Value</span>
                  {meetsValue ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold">{currentValue} / {level.targetValue}</span>}
                </div>
                <div className={`flex items-center justify-between p-3 rounded-xl border ${isOverCapacity ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'}`}>
                  <span className="font-medium text-sm">Stay under {level.maxCapacity} Points</span>
                  {isOverCapacity ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                </div>
                {rules.mandatory && (
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${meetsMandatory ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-500'}`}>
                    <span className="font-medium text-sm flex items-center gap-2"><ShieldAlert className="w-4 h-4"/> Include Mandatory Tickets</span>
                    {meetsMandatory ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                )}
                {rules.minMaintenancePoints && (
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${meetsMaintenance ? 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400' : 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-500'}`}>
                    <span className="font-medium text-sm flex items-center gap-2"><Wrench className="w-4 h-4"/> {rules.minMaintenancePoints}+ pts Bug/Tech-Debt</span>
                    {meetsMaintenance ? <CheckCircle2 className="w-5 h-5" /> : <span className="font-bold">{maintenancePoints} / {rules.minMaintenancePoints}</span>}
                  </div>
                )}
                {rules.conflicts && (
                  <div className={`flex items-center justify-between p-3 rounded-xl border ${hasConflicts ? 'bg-red-500/10 border-red-500/20 text-red-500' : 'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400'}`}>
                    <span className="font-medium text-sm">Resolve Resource Conflicts</span>
                    {hasConflicts ? <AlertTriangle className="w-5 h-5" /> : <CheckCircle2 className="w-5 h-5" />}
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 rounded-3xl p-6 md:p-8 shadow-xl">
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

              <div className="mb-8 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 to-blue-500 opacity-50"></div>
                <div className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Business Value</div>
                <div className={`text-5xl font-black mb-2 transition-colors ${meetsValue ? 'text-green-500' : 'text-gray-900 dark:text-white'}`}>{currentValue}</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}