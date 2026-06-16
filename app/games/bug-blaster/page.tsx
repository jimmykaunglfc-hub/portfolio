"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gamepad2, Play, RotateCcw, Trophy } from "lucide-react";
import Link from "next/link";

export default function BugBlaster() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  // --- HTML5 CANVAS GAME LOOP ---
  useEffect(() => {
    if (!isPlaying || isGameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    // Game Variables
    let frameCount = 0;
    const player = { x: canvas.width / 2, y: canvas.height - 60, width: 40, height: 40, color: "#3b82f6" };
    let targetX = canvas.width / 2; // For smooth mouse/touch tracking
    
    let lasers: { x: number, y: number, width: number, height: number, speed: number }[] = [];
    let bugs: { x: number, y: number, width: number, height: number, speed: number, hp: number }[] = [];
    let particles: { x: number, y: number, vx: number, vy: number, life: number, color: string }[] = [];
    
    let currentScore = 0;

    // Controls tracking
    const handleMove = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      targetX = (clientX - rect.left) * scaleX;
      // Clamp to screen bounds
      targetX = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, targetX));
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Core Loop
    const render = () => {
      frameCount++;

      // 1. Clear Canvas
      ctx.fillStyle = "#09090b"; // Dark background
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Update & Draw Player (Smooth follow)
      player.x += (targetX - player.x) * 0.15;
      
      ctx.shadowBlur = 20;
      ctx.shadowColor = player.color;
      ctx.fillStyle = player.color;
      ctx.beginPath();
      ctx.moveTo(player.x, player.y - player.height / 2); // Nose
      ctx.lineTo(player.x + player.width / 2, player.y + player.height / 2); // Right wing
      ctx.lineTo(player.x - player.width / 2, player.y + player.height / 2); // Left wing
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0; // Reset

      // 3. Auto-Fire Lasers
      if (frameCount % 15 === 0) {
        lasers.push({ x: player.x - 2, y: player.y - player.height / 2, width: 4, height: 15, speed: 10 });
      }

      // 4. Update & Draw Lasers
      ctx.fillStyle = "#facc15"; // Yellow lasers
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#facc15";
      for (let i = lasers.length - 1; i >= 0; i--) {
        const l = lasers[i];
        l.y -= l.speed;
        ctx.fillRect(l.x, l.y, l.width, l.height);
        if (l.y < 0) lasers.splice(i, 1); // Remove off-screen
      }
      ctx.shadowBlur = 0;

      // 5. Spawn Bugs (Difficulty increases over time)
      const spawnRate = Math.max(20, 60 - Math.floor(currentScore / 100)); 
      if (frameCount % spawnRate === 0) {
        const size = 30 + Math.random() * 20;
        bugs.push({
          x: Math.random() * (canvas.width - size) + size / 2,
          y: -50,
          width: size,
          height: size,
          speed: 1.5 + Math.random() * 2 + (currentScore / 1000), // Speed increases with score
          hp: size > 40 ? 2 : 1 // Larger bugs take 2 hits
        });
      }

      // 6. Update & Draw Bugs
      for (let i = bugs.length - 1; i >= 0; i--) {
        const b = bugs[i];
        b.y += b.speed;
        
        ctx.fillStyle = b.hp > 1 ? "#ef4444" : "#22c55e"; // Red for tough, Green for weak
        ctx.shadowBlur = 15;
        ctx.shadowColor = ctx.fillStyle;
        // Draw bug as a square with a bite taken out
        ctx.fillRect(b.x - b.width / 2, b.y - b.height / 2, b.width, b.height);
        ctx.fillStyle = "#09090b";
        ctx.fillRect(b.x - b.width / 4, b.y, b.width / 2, b.height / 2);
        
        // Collision: Bug vs Player (Game Over)
        const dist = Math.hypot(player.x - b.x, player.y - b.y);
        if (dist < (player.width / 2 + b.width / 2) - 5) {
          setIsGameOver(true);
          setHighScore(prev => Math.max(prev, currentScore));
        }

        // Collision: Bug vs Laser
        for (let j = lasers.length - 1; j >= 0; j--) {
          const l = lasers[j];
          if (
            l.x < b.x + b.width / 2 &&
            l.x + l.width > b.x - b.width / 2 &&
            l.y < b.y + b.height / 2 &&
            l.y + l.height > b.y - b.height / 2
          ) {
            lasers.splice(j, 1); // Destroy laser
            b.hp -= 1;
            
            if (b.hp <= 0) {
              // Create explosion particles
              for(let p=0; p<8; p++) {
                particles.push({
                  x: b.x, y: b.y,
                  vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8,
                  life: 1.0, color: ctx.shadowColor
                });
              }
              bugs.splice(i, 1); // Destroy bug
              currentScore += (b.width > 40 ? 20 : 10);
              setScore(currentScore);
            }
            break; // Stop checking other lasers for this destroyed bug
          }
        }
        
        // Remove off-screen bugs
        if (b.y > canvas.height + 50 && bugs[i]) {
          bugs.splice(i, 1);
        }
      }
      ctx.shadowBlur = 0;

      // 7. Update & Draw Particles (Explosions)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;
        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1.0;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [isPlaying, isGameOver]);

  const startGame = () => {
    setScore(0);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      {/* Header */}
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex items-center gap-4">
            <Gamepad2 className="w-10 h-10 text-red-500" />
            Bug <span className="text-red-500 dark:text-red-400">Blaster</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
            A retro HTML5 Canvas arcade shooter. Slide your mouse or finger to move. Auto-fire is engaged. Don't let the bugs hit you.
          </p>
        </div>
        
        {/* Score Board */}
        <div className="flex gap-4">
          <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 px-6 py-4 rounded-2xl flex flex-col items-center shadow-lg">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Score</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white">{score}</span>
          </div>
          <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 px-6 py-4 rounded-2xl flex flex-col items-center shadow-lg">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-500"/> Best</span>
            <span className="text-2xl font-black text-yellow-500">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="w-full max-w-3xl mx-auto aspect-[3/4] md:aspect-video bg-[#09090b] rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-white/10 shadow-2xl relative shadow-red-500/10">
        
        <canvas 
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-full object-cover cursor-crosshair"
          style={{ display: isPlaying && !isGameOver ? 'block' : 'none' }}
        />

        {/* OVERLAYS (Start / Game Over) */}
        <AnimatePresence>
          {!isPlaying && !isGameOver && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm z-10">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Gamepad2 className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-3xl font-black text-white mb-2 tracking-widest uppercase">System Ready</h2>
              <p className="text-gray-400 mb-8 font-medium">Swipe or move mouse to control. Auto-fire active.</p>
              <button onClick={startGame} className="flex items-center gap-2 bg-red-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-red-600 transition-transform hover:scale-105 shadow-lg shadow-red-500/30">
                <Play className="w-5 h-5 fill-current" /> Initialize Combat
              </button>
            </motion.div>
          )}

          {isGameOver && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/80 backdrop-blur-md z-10 border-4 border-red-500/50">
              <h2 className="text-5xl font-black text-white mb-2 tracking-widest uppercase drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]">Hull Breach</h2>
              <p className="text-red-200 mb-8 font-medium text-lg">Final Score: {score}</p>
              <button onClick={startGame} className="flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-transform hover:scale-105 shadow-lg shadow-white/20">
                <RotateCcw className="w-5 h-5" /> Reboot System
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}