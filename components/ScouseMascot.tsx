'use client';

import Image from 'next/image';
import { useEffect, useRef, type CSSProperties } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

/** Scouse's 3D-rendered identity, shared by the launcher and chat portraits. */
export default function ScouseMascot({ size = 56, className = '', animated = false, speaking = false, mouth = 0 }: { size?: number; className?: string; animated?: boolean; speaking?: boolean; mouth?: number }) {
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
    className={`scouse-mascot ${animated ? 'scouse-mascot--animated' : ''} ${speaking ? 'scouse-mascot--speaking' : ''} ${portrait ? 'scouse-mascot--portrait' : ''} ${className}`}
    style={{ '--scouse-size': `${size}px` } as CSSProperties}
    aria-hidden="true"
  >
    <span className="scouse-mascot__float">
      <motion.span className="scouse-mascot__attention" style={{ rotateX: reduced ? 0 : leanX, rotateY: reduced ? 0 : leanY }}>
      <span className="scouse-mascot__actor">
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
      {animated && !portrait && <svg className="scouse-mascot__face" viewBox="0 0 640 640" fill="none">
        <g className="scouse-mascot__blink">
          <ellipse cx="292" cy="125" rx="25" ry="21" fill="#03141f" />
          <path d="M273 125Q292 132 310 122" stroke="#7cecff" strokeWidth="2" />
        </g>
        <g className="scouse-mascot__blink">
          <ellipse cx="373" cy="103" rx="21" ry="22" fill="#03141f" />
          <path d="M359 104Q373 109 389 100" stroke="#7cecff" strokeWidth="2" />
        </g>
        {speaking && <g transform="rotate(-12 342 145)">
          <ellipse cx="342" cy="145" rx="23" ry="11" fill="#03141f" />
          <ellipse className="scouse-mascot__mouth" cx="342" cy="145" rx={16 - mouth * 5} ry={reduced ? 2 : 2 + mouth * 7} fill="#052e40" stroke="#6deaff" strokeWidth="2.5" />
        </g>}
      </svg>}
      </span>
      </motion.span>
    </span>
  </span>;
}
