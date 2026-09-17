'use client';

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let frame = 0; const position = { x: -100, y: -100 }; const target = { x: -100, y: -100 };
    const move = (event: MouseEvent) => { target.x = event.clientX; target.y = event.clientY; dot.current?.style.setProperty('transform', `translate(${target.x - 3}px, ${target.y - 3}px)`); };
    const over = (event: MouseEvent) => ring.current?.classList.toggle('cursor-hovering', Boolean((event.target as HTMLElement).closest('a, button, input, textarea')));
    const animate = () => { position.x += (target.x - position.x) * 0.14; position.y += (target.y - position.y) * 0.14; ring.current?.style.setProperty('transform', `translate(${position.x - 16}px, ${position.y - 16}px)`); frame = requestAnimationFrame(animate); };
    window.addEventListener('mousemove', move); document.addEventListener('mouseover', over); animate();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('mousemove', move); document.removeEventListener('mouseover', over); };
  }, []);
  return <><div ref={dot} className="custom-cursor-dot" /><div ref={ring} className="custom-cursor-ring" /></>;
}
