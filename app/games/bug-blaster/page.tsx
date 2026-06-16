"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gamepad2, Play, RotateCcw, Trophy, Heart, Zap, Crosshair } from "lucide-react";
import Link from "next/link";

export default function BugBlaster() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [hp, setHp] = useState(3);
  const [weaponLevel, setWeaponLevel] = useState(1);

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
    let currentScore = 0;
    let currentHp = 3;
    let currentLevel = 1;
    let shakeIntensity = 0;

    // Entities
    const player = { x: canvas.width / 2, y: canvas.height - 60, width: 40, height: 40, color: "#3b82f6", invulnerable: 0 };
    let targetX = canvas.width / 2; 
    let targetY = canvas.height - 80;
    
    let lasers: { x: number, y: number, width: number, height: number, vx: number, vy: number, color: string, damage: number }[] = [];
    let bugs: { x: number, y: number, width: number, height: number, speed: number, hp: number, maxHp: number, type: string, color: string }[] = [];
    let particles: { x: number, y: number, vx: number, vy: number, life: number, color: string }[] = [];
    let stars: { x: number, y: number, size: number, speed: number, opacity: number }[] = [];

    // Initialize Starfield
    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2,
        speed: Math.random() * 3 + 0.5,
        opacity: Math.random()
      });
    }

    // Controls tracking
    const handleMove = (clientX: number, clientY: number) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      targetX = (clientX - rect.left) * scaleX;
      targetY = (clientY - rect.top) * scaleY;
      
      // Clamp to screen bounds
      targetX = Math.max(player.width / 2, Math.min(canvas.width - player.width / 2, targetX));
      targetY = Math.max(canvas.height / 2, Math.min(canvas.height - player.height / 2, targetY));
    };

    const onMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX, e.touches[0].clientY);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    // Core Loop
    const render = () => {
      frameCount++;

      // 1. Screen Shake & Clear Canvas
      ctx.save();
      if (shakeIntensity > 0) {
        const dx = (Math.random() - 0.5) * shakeIntensity;
        const dy = (Math.random() - 0.5) * shakeIntensity;
        ctx.translate(dx, dy);
        shakeIntensity -= 0.5; // Dampen shake
      }

      ctx.fillStyle = "#09090b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. Draw & Update Starfield
      stars.forEach(star => {
        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // 3. Update & Draw Player
      player.x += (targetX - player.x) * 0.15;
      player.y += (targetY - player.y) * 0.15;
      
      if (player.invulnerable > 0) player.invulnerable--;

      // Blinking effect when invulnerable
      if (player.invulnerable === 0 || Math.floor(frameCount / 5) % 2 === 0) {
        ctx.shadowBlur = 20;
        ctx.shadowColor = player.color;
        ctx.fillStyle = player.color;
        ctx.beginPath();
        ctx.moveTo(player.x, player.y - player.height / 2); // Nose
        ctx.lineTo(player.x + player.width / 2, player.y + player.height / 2); // Right wing
        ctx.lineTo(player.x - player.width / 2, player.y + player.height / 2); // Left wing
        ctx.closePath();
        ctx.fill();

        // Engine glow
        ctx.fillStyle = "#f97316";
        ctx.beginPath();
        ctx.arc(player.x, player.y + player.height / 2 + 5, Math.random() * 5 + 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 4. Weapons & Upgrades (Calculate Level based on score)
      const newLevel = Math.min(4, Math.floor(currentScore / 500) + 1);
      if (newLevel !== currentLevel) {
        currentLevel = newLevel;
        setWeaponLevel(currentLevel); // Update UI
      }

      // Auto-Fire Lasers
      if (frameCount % 12 === 0) {
        const fire = (ox: number, vx: number, color: string, dmg: number) => {
          lasers.push({ x: player.x + ox, y: player.y - player.height / 2, width: 4, height: 16, vx, vy: -12, color, damage: dmg });
        };

        if (currentLevel === 1) {
          fire(0, 0, "#facc15", 1);
        } else if (currentLevel === 2) {
          fire(-10, 0, "#38bdf8", 1);
          fire(10, 0, "#38bdf8", 1);
        } else if (currentLevel === 3) {
          fire(0, 0, "#a855f7", 1);
          fire(-15, -2, "#a855f7", 1);
          fire(15, 2, "#a855f7", 1);
        } else {
          fire(-10, 0, "#fb7185", 1.5);
          fire(10, 0, "#fb7185", 1.5);
          fire(-20, -3, "#fb7185", 1);
          fire(20, 3, "#fb7185", 1);
        }
      }

      // 5. Update & Draw Lasers
      for (let i = lasers.length - 1; i >= 0; i--) {
        const l = lasers[i];
        l.x += l.vx;
        l.y += l.vy;
        
        ctx.fillStyle = l.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = l.color;
        ctx.fillRect(l.x - l.width/2, l.y, l.width, l.height);
        
        if (l.y < 0 || l.x < 0 || l.x > canvas.width) lasers.splice(i, 1);
      }
      ctx.shadowBlur = 0;

      // 6. Spawn Enemies (Variety introduced)
      const spawnRate = Math.max(15, 50 - Math.floor(currentScore / 100)); 
      if (frameCount % spawnRate === 0) {
        const rand = Math.random();
        let size, speed, bugHp, type, color;

        if (rand > 0.85 && currentLevel > 1) {
          // Tank Bug (Red)
          size = 50; speed = 1.0 + (currentScore/2000); bugHp = 4; type = "tank"; color = "#ef4444";
        } else if (rand > 0.6 && currentLevel > 1) {
          // Fast Bug (Blue)
          size = 25; speed = 3.5 + (currentScore/1500); bugHp = 1; type = "fast"; color = "#38bdf8";
        } else {
          // Standard Bug (Green)
          size = 35; speed = 2.0 + (currentScore/1500); bugHp = 1; type = "standard"; color = "#22c55e";
        }

        bugs.push({
          x: Math.random() * (canvas.width - size) + size / 2,
          y: -50,
          width: size,
          height: size,
          speed, hp: bugHp, maxHp: bugHp, type, color
        });
      }

      // 7. Update & Draw Bugs
      for (let i = bugs.length - 1; i >= 0; i--) {
        const b = bugs[i];
        
        // Wobble movement for fast bugs
        if (b.type === "fast") b.x += Math.sin(frameCount * 0.1) * 2;
        b.y += b.speed;
        
        ctx.fillStyle = b.color;
        ctx.shadowBlur = b.type === "tank" ? 20 : 10;
        ctx.shadowColor = b.color;
        
        // Draw Bug Body
        ctx.beginPath();
        ctx.roundRect(b.x - b.width / 2, b.y - b.height / 2, b.width, b.height, 8);
        ctx.fill();
        
        // Draw Bug Eyes
        ctx.fillStyle = "#09090b";
        ctx.fillRect(b.x - b.width / 3, b.y + b.height / 6, b.width / 4, b.height / 4);
        ctx.fillRect(b.x + b.width / 12, b.y + b.height / 6, b.width / 4, b.height / 4);

        // Draw Health Bar for Tanks
        if (b.maxHp > 1 && b.hp < b.maxHp) {
          ctx.fillStyle = "rgba(255,255,255,0.3)";
          ctx.fillRect(b.x - b.width/2, b.y - b.height/2 - 10, b.width, 4);
          ctx.fillStyle = "#22c55e";
          ctx.fillRect(b.x - b.width/2, b.y - b.height/2 - 10, b.width * (b.hp / b.maxHp), 4);
        }
        
        // Collision: Bug vs Player
        const dist = Math.hypot(player.x - b.x, player.y - b.y);
        if (dist < (player.width / 2 + b.width / 2) - 5 && player.invulnerable === 0) {
          currentHp -= 1;
          setHp(currentHp); // Update React UI
          shakeIntensity = 15; // Screen shake!
          player.invulnerable = 60; // 1 second of i-frames (at 60fps)
          
          bugs.splice(i, 1); // Destroy the bug that hit you

          if (currentHp <= 0) {
            setIsGameOver(true);
            setHighScore(prev => Math.max(prev, currentScore));
          }
          continue;
        }

        // Collision: Bug vs Laser
        let bugDestroyed = false;
        for (let j = lasers.length - 1; j >= 0; j--) {
          const l = lasers[j];
          if (
            l.x < b.x + b.width / 2 &&
            l.x + l.width > b.x - b.width / 2 &&
            l.y < b.y + b.height / 2 &&
            l.y + l.height > b.y - b.height / 2
          ) {
            b.hp -= l.damage;
            lasers.splice(j, 1); 
            
            // Tiny hit particle
            particles.push({
              x: l.x, y: l.y, vx: (Math.random()-0.5)*4, vy: (Math.random()-0.5)*4, life: 0.5, color: "#ffffff"
            });

            if (b.hp <= 0) {
              // Massive explosion particles
              for(let p=0; p<12; p++) {
                particles.push({
                  x: b.x, y: b.y,
                  vx: (Math.random() - 0.5) * 10, vy: (Math.random() - 0.5) * 10,
                  life: 1.0, color: b.color
                });
              }
              currentScore += (b.type === "tank" ? 50 : b.type === "fast" ? 30 : 10);
              setScore(currentScore);
              bugs.splice(i, 1);
              bugDestroyed = true;
              break; 
            }
          }
        }
        
        // Remove off-screen bugs
        if (!bugDestroyed && b.y > canvas.height + 50) {
          bugs.splice(i, 1);
        }
      }
      ctx.shadowBlur = 0;

      // 8. Update & Draw Particles (Explosions)
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.03;
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

      ctx.restore(); // Restore context (ends screen shake area)
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
    setHp(3);
    setWeaponLevel(1);
    setIsGameOver(false);
    setIsPlaying(true);
  };

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto relative z-10 font-sans">
      
      {/* Header & Stats Dashboard */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link href="/games" className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-blue-500 transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Arcade
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white mb-4 flex items-center gap-4">
            <Gamepad2 className="w-10 h-10 text-red-500" />
            Bug <span className="text-red-500 dark:text-red-400">Blaster</span>
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xl">
            Swipe or use mouse to steer. Auto-fire active. Upgrade weapons by scoring points. Watch out for Red Tanks and Blue Speedsters!
          </p>
        </div>
        
        {/* Dynamic HUD */}
        <div className="grid grid-cols-2 md:flex gap-3 md:gap-4">
          
          {/* Health Bar */}
          <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 px-4 py-3 rounded-2xl flex flex-col shadow-lg w-full md:w-32">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Heart className="w-3 h-3 text-red-500"/> Hull</span>
            <div className="flex gap-1">
              {[1, 2, 3].map(i => (
                <div key={i} className={`h-4 flex-1 rounded-sm transition-colors ${i <= hp ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-gray-200 dark:bg-white/10'}`}></div>
              ))}
            </div>
          </div>

          {/* Weapon Level */}
          <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 px-4 py-3 rounded-2xl flex flex-col shadow-lg w-full md:w-32">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Zap className="w-3 h-3 text-blue-500"/> Cannon</span>
            <span className="text-xl font-black text-blue-500 leading-none tracking-tight">Lv.{weaponLevel}</span>
          </div>

          {/* Score */}
          <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 px-4 py-3 rounded-2xl flex flex-col shadow-lg w-full md:w-32">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Crosshair className="w-3 h-3 text-green-500"/> Score</span>
            <span className="text-xl font-black text-gray-900 dark:text-white leading-none">{score}</span>
          </div>

          {/* High Score */}
          <div className="bg-white dark:bg-[#121214] border border-gray-200 dark:border-white/10 px-4 py-3 rounded-2xl flex flex-col shadow-lg w-full md:w-32">
            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Trophy className="w-3 h-3 text-yellow-500"/> Best</span>
            <span className="text-xl font-black text-yellow-500 leading-none">{highScore}</span>
          </div>
        </div>
      </div>

      {/* Game Canvas Container */}
      <div className="w-full max-w-4xl mx-auto aspect-[3/4] md:aspect-video bg-[#09090b] rounded-3xl overflow-hidden border-2 border-gray-200 dark:border-white/10 shadow-2xl relative shadow-red-500/10">
        
        <canvas 
          ref={canvasRef}
          width={900}
          height={600}
          className="w-full h-full object-cover cursor-crosshair"
          style={{ display: isPlaying && !isGameOver ? 'block' : 'none' }}
        />

        {/* OVERLAYS (Start / Game Over) */}
        <AnimatePresence>
          {!isPlaying && !isGameOver && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md z-10">
              <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <Gamepad2 className="w-12 h-12 text-blue-500" />
              </div>
              <h2 className="text-4xl font-black text-white mb-2 tracking-widest uppercase">System Ready</h2>
              <p className="text-blue-200 mb-8 font-medium text-center max-w-xs">Destroy bugs to upgrade your weapons. Protect the core.</p>
              <button onClick={startGame} className="flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-600 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(59,130,246,0.4)]">
                <Play className="w-5 h-5 fill-current" /> Initialize Combat
              </button>
            </motion.div>
          )}

          {isGameOver && (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 flex flex-col items-center justify-center bg-red-950/90 backdrop-blur-md z-10 border-4 border-red-500/50">
              <h2 className="text-5xl md:text-6xl font-black text-white mb-2 tracking-widest uppercase drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]">Hull Breach</h2>
              
              <div className="bg-black/50 p-6 rounded-2xl border border-red-500/30 text-center mb-8 w-64">
                <div className="text-red-200 text-sm font-bold uppercase tracking-wider mb-1">Final Score</div>
                <div className="text-4xl font-black text-white mb-4">{score}</div>
                <div className="text-red-300 text-sm font-medium">Max Weapon Level: {weaponLevel}</div>
              </div>

              <button onClick={startGame} className="flex items-center gap-2 bg-white text-red-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-200 transition-transform hover:scale-105 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                <RotateCcw className="w-5 h-5" /> Reboot System
              </button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}