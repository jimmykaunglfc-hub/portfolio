'use client';

import { useEffect, useRef } from 'react';

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; accent: boolean };

export default function InteractiveBackground() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    const pointer = { x: -1000, y: -1000 };
    let frame = 0;
    let particles: Particle[] = [];
    const resize = () => {
      const density = Math.min(window.devicePixelRatio, 2);
      canvas.width = window.innerWidth * density;
      canvas.height = window.innerHeight * density;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(density, 0, 0, density, 0, 0);
      particles = Array.from({ length: window.innerWidth < 768 ? 24 : 48 }, (_, index) => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.28,
        vy: (Math.random() - 0.5) * 0.28,
        radius: Math.random() * 1.5 + 0.5,
        accent: index < 5,
      }));
    };
    const draw = () => {
      const dark = document.documentElement.classList.contains('dark');
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const particle of particles) {
        const dx = particle.x - pointer.x;
        const dy = particle.y - pointer.y;
        const distance = Math.hypot(dx, dy);
        if (distance < 145 && distance > 1) {
          particle.vx += (dx / distance) * 0.015;
          particle.vy += (dy / distance) * 0.015;
        }
        particle.vx *= 0.985; particle.vy *= 0.985;
        particle.x += particle.vx; particle.y += particle.vy;
        if (particle.x < -8) particle.x = window.innerWidth + 8;
        if (particle.x > window.innerWidth + 8) particle.x = -8;
        if (particle.y < -8) particle.y = window.innerHeight + 8;
        if (particle.y > window.innerHeight + 8) particle.y = -8;
      }
      for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
        const distance = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y);
        if (distance < 115) {
          context.beginPath(); context.moveTo(particles[i].x, particles[i].y); context.lineTo(particles[j].x, particles[j].y);
          context.strokeStyle = dark ? `rgba(223,226,238,${(1 - distance / 115) * 0.06})` : `rgba(13,16,32,${(1 - distance / 115) * 0.045})`;
          context.lineWidth = 0.7; context.stroke();
        }
      }
      for (const particle of particles) {
        context.beginPath(); context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = particle.accent ? 'rgba(194,255,58,0.55)' : dark ? 'rgba(223,226,238,0.22)' : 'rgba(13,16,32,0.16)';
        context.fill();
      }
      frame = requestAnimationFrame(draw);
    };
    const move = (event: MouseEvent) => { pointer.x = event.clientX; pointer.y = event.clientY; };
    resize(); draw();
    window.addEventListener('resize', resize); window.addEventListener('mousemove', move, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('mousemove', move); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none hidden md:block" />;
}
