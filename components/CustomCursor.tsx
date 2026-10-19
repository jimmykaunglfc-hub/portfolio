'use client';

import { useEffect, useRef } from 'react';

/** A velocity-responsive droplet with a soft sapphire, cyan, and lavender wake. */
export default function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)');
    const canvas = canvasRef.current;
    const follower = followerRef.current;
    if (!canvas || !follower) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    let frame = 0, lastTime = 0;
    let visible = false, interactive = false, down = false;
    const target = { x: -100, y: -100 };
    const droplets = Array.from({ length: 9 }, () => ({ x: -100, y: -100 }));
    const resize = () => {
      const density = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * density; canvas.height = window.innerHeight * density;
      context.setTransform(density, 0, 0, density, 0, 0);
    };
    const move = (event: PointerEvent) => {
      visible = event.pointerType === 'mouse';
      if (target.x === -100) droplets.forEach((drop) => { drop.x = event.clientX; drop.y = event.clientY; });
      target.x = event.clientX; target.y = event.clientY;
      interactive = Boolean(event.target instanceof Element && event.target.closest('a,button,summary,[role="tab"]'));
    };
    const hide = () => { visible = false; };
    const press = () => { down = true; };
    const release = () => { down = false; };
    const draw = (time: number) => {
      const dt = Math.min((time - lastTime) / 16.67 || 1, 2); lastTime = time;
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const active = visible && media.matches && !document.hidden;
      follower.style.opacity = active ? '1' : '0';
      if (active) {
        let anchor = target;
        droplets.forEach((drop, index) => {
          const dx = anchor.x - drop.x, dy = anchor.y - drop.y;
          const ease = 1 - Math.pow(1 - (index === 0 ? .24 : .32), dt);
          drop.x += dx * ease; drop.y += dy * ease;
          if (index === 0) {
            const stretch = Math.min(Math.hypot(dx, dy) / 120, .65);
            const scale = down ? .7 : interactive ? 1.5 : 1;
            follower.style.transform = `translate3d(${drop.x}px,${drop.y}px,0) rotate(${Math.atan2(dy, dx)}rad) scale(${scale * (1 + stretch)},${scale * (1 - stretch * .35)})`;
            follower.dataset.interactive = String(interactive);
          }
          const radius = (29 - index * 2) * (interactive ? 1.2 : 1);
          const glow = context.createRadialGradient(drop.x, drop.y, 0, drop.x, drop.y, radius);
          const color = index < 3 ? '78,130,255' : index < 6 ? '78,202,225' : '151,134,239';
          glow.addColorStop(0, `rgba(${color},${.09 - index * .007})`);
          glow.addColorStop(1, `rgba(${color},0)`);
          context.fillStyle = glow; context.beginPath(); context.arc(drop.x, drop.y, radius, 0, Math.PI * 2); context.fill();
          anchor = drop;
        });
      }
      frame = requestAnimationFrame(draw);
    };
    resize(); frame = requestAnimationFrame(draw);
    window.addEventListener('resize', resize); window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', press); window.addEventListener('pointerup', release);
    document.addEventListener('pointerleave', hide); window.addEventListener('blur', hide);
    return () => {
      cancelAnimationFrame(frame); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', press); window.removeEventListener('pointerup', release);
      document.removeEventListener('pointerleave', hide); window.removeEventListener('blur', hide);
    };
  }, []);
  return <div aria-hidden="true" className="liquid-cursor"><canvas ref={canvasRef} /><div ref={followerRef} className="liquid-cursor__drop" /></div>;
}
