'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** A damped wave simulation. Pointer strokes disturb the surface; clicks launch larger waves. */
export default function CustomCursor() {
  const pathname = usePathname();
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const fine = window.matchMedia('(pointer: fine)');
    let width = 0, height = 0, frame = 0, lastFrame = 0, activeUntil = 0;
    let current = new Float32Array(0), previous = new Float32Array(0);
    let pixels: ImageData;
    let dark = document.documentElement.classList.contains('dark');
    let lastPointer: { x: number; y: number } | null = null;
    const resize = () => {
      width = Math.max(2, Math.ceil(window.innerWidth / 6));
      height = Math.max(2, Math.ceil(window.innerHeight / 6));
      // Limit work on large monitors without changing the screen-space interaction.
      const scale = Math.min(1, 300 / width);
      width = Math.ceil(width * scale); height = Math.ceil(height * scale);
      canvas.width = width; canvas.height = height;
      current = new Float32Array(width * height); previous = new Float32Array(width * height);
      pixels = context.createImageData(width, height);
      lastPointer = null;
    };
    const draw = (stamp: number) => {
      frame = 0;
      if (motion.matches || document.hidden) { context.clearRect(0, 0, width, height); return; }
      if (stamp - lastFrame < 1000 / 40) { frame = requestAnimationFrame(draw); return; }
      lastFrame = stamp;
      const rgba = pixels.data;
      for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
          const i = y * width + x;
          previous[i] = ((current[i - 1] + current[i + 1] + current[i - width] + current[i + width]) * .5 - previous[i]) * .978;
          const gx = current[i - 1] - current[i + 1];
          const gy = current[i - width] - current[i + width];
          const light = gx * .7 + gy * .55;
          const strength = Math.min(Math.abs(light) * (dark ? 2.4 : 2.8), dark ? 105 : 88);
          const offset = i * 4;
          // Adjacent highlights and shaded troughs give the waves a refracted, watery edge.
          rgba[offset] = light > 0 ? (dark ? 136 : 43) : (dark ? 63 : 71);
          rgba[offset + 1] = light > 0 ? (dark ? 202 : 107) : (dark ? 106 : 88);
          rgba[offset + 2] = light > 0 ? (dark ? 246 : 187) : (dark ? 187 : 154);
          rgba[offset + 3] = strength;
        }
      }
      const swap = current; current = previous; previous = swap;
      context.putImageData(pixels, 0, 0);
      if (stamp < activeUntil) frame = requestAnimationFrame(draw);
      else context.clearRect(0, 0, width, height);
    };
    const disturb = (screenX: number, screenY: number, strength: number, radius: number) => {
      if (motion.matches) return;
      const cx = screenX / window.innerWidth * width;
      const cy = screenY / window.innerHeight * height;
      for (let y = Math.max(1, Math.floor(cy - radius)); y <= Math.min(height - 2, Math.ceil(cy + radius)); y++) {
        for (let x = Math.max(1, Math.floor(cx - radius)); x <= Math.min(width - 2, Math.ceil(cx + radius)); x++) {
          const distance = Math.hypot(x - cx, y - cy) / radius;
          if (distance < 1) current[y * width + x] += Math.cos(distance * Math.PI * .5) * strength;
        }
      }
      activeUntil = performance.now() + 2800;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (!fine.matches || event.pointerType !== 'mouse' || motion.matches) return;
      const point = { x: event.clientX, y: event.clientY };
      if (lastPointer) {
        const distance = Math.hypot(point.x - lastPointer.x, point.y - lastPointer.y);
        if (distance < 3) return;
        // Interpolate the stroke, producing a continuous wake rather than a following object.
        const count = Math.min(12, Math.ceil(distance / 9));
        for (let i = 1; i <= count; i++) {
          const t = i / count;
          disturb(lastPointer.x + (point.x - lastPointer.x) * t, lastPointer.y + (point.y - lastPointer.y) * t, 14, 2.3);
        }
      }
      lastPointer = point;
    };
    const click = (event: PointerEvent) => { disturb(event.clientX, event.clientY, 125, 5); };
    const reset = () => { lastPointer = null; };
    const clear = () => {
      if (motion.matches || document.hidden) {
        cancelAnimationFrame(frame); frame = 0; current.fill(0); previous.fill(0);
        context.clearRect(0, 0, width, height); reset();
      }
    };
    const theme = new MutationObserver(() => { dark = document.documentElement.classList.contains('dark'); });
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    resize(); window.addEventListener('resize', resize);
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', click, { passive: true });
    window.addEventListener('blur', reset); document.addEventListener('pointerleave', reset);
    document.addEventListener('visibilitychange', clear); motion.addEventListener('change', clear);
    return () => {
      cancelAnimationFrame(frame); theme.disconnect(); window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move); window.removeEventListener('pointerdown', click);
      window.removeEventListener('blur', reset); document.removeEventListener('pointerleave', reset);
      document.removeEventListener('visibilitychange', clear); motion.removeEventListener('change', clear);
    };
  }, []);
  return <canvas ref={ref} className={`water-surface ${pathname.startsWith('/blog') ? 'water-surface--reading' : ''}`} aria-hidden="true" />;
}
