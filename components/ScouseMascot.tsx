'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/** Scouse's 3D-rendered identity, shared by the launcher and chat portraits. */
export default function ScouseMascot({ size = 56, className = '', animated = false }: { size?: number; className?: string; animated?: boolean }) {
  const portrait = size <= 48;
  const root = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const targetX = useMotionValue(0), targetY = useMotionValue(0);
  const leanX = useSpring(targetX, { stiffness: 85, damping: 19, mass: .8 });
  const leanY = useSpring(targetY, { stiffness: 85, damping: 19, mass: .8 });

  useEffect(() => {
    if (!animated || reduced || !root.current) return;
    const element = root.current;
    const finePointer = window.matchMedia('(pointer: fine)');
    let frame = 0, pointerX = 0, pointerY = 0;
    const settle = () => {
      cancelAnimationFrame(frame); frame = 0;
      targetX.set(0); targetY.set(0);
    };
    const follow = () => {
      frame = 0;
      const bounds = element.getBoundingClientRect();
      const dx = pointerX - bounds.left - bounds.width / 2;
      const dy = pointerY - bounds.top - bounds.height / 2;
      const proximity = Math.max(0, 1 - Math.hypot(dx, dy) / 480);
      targetY.set(Math.max(-7, Math.min(7, dx / 25)) * proximity);
      targetX.set(Math.max(-4, Math.min(4, -dy / 35)) * proximity);
    };
    const move = (event: PointerEvent) => {
      if (!finePointer.matches || event.pointerType !== 'mouse' || event.buttons) { settle(); return; }
      pointerX = event.clientX; pointerY = event.clientY;
      if (!frame) frame = requestAnimationFrame(follow);
    };
    const leave = (event: PointerEvent) => { if (!event.relatedTarget) settle(); };
    const visibility = () => {
      element.dataset.paused = String(document.hidden);
      if (document.hidden) settle();
    };
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', settle);
    window.addEventListener('scroll', settle, { passive: true });
    finePointer.addEventListener('change', settle);
    document.addEventListener('visibilitychange', visibility);
    visibility();
    return () => {
      settle();
      delete element.dataset.paused;
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', settle);
      window.removeEventListener('scroll', settle);
      finePointer.removeEventListener('change', settle);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, [animated, reduced, targetX, targetY]);

  return <span
    ref={root}
    className={`scouse-mascot ${animated ? 'scouse-mascot--animated' : ''} ${portrait ? 'scouse-mascot--portrait' : ''} ${className}`}
    style={{ '--scouse-size': `${size}px` } as CSSProperties}
    aria-hidden="true"
  >
    <span className="scouse-mascot__float">
      <motion.span className="scouse-mascot__attention" style={{ rotateX: reduced ? 0 : leanX, rotateY: reduced ? 0 : leanY }}>
      <Image
        src="/mascots/scouse-project-master.webp"
        alt=""
        width={640}
        height={640}
        sizes={`${portrait ? size * 3 : size}px`}
        loading={animated ? 'eager' : 'lazy'}
        draggable={false}
        className="scouse-mascot__render"
      />
      </motion.span>
    </span>
  </span>;
}
