'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type MotionTarget = { element: HTMLElement; top: number; height: number; visible: boolean; delay: number; animation?: Animation };

/** Entry animations finish in real time: reading never depends on reaching a timeline midpoint. */
export default function PageExperience({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const privatePage = /^\/(admin|studio)(\/|$)/.test(pathname);

  useEffect(() => {
    const container = root.current;
    if (!container || privatePage || /^\/games\/.+/.test(pathname)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const targets = new Map<HTMLElement, MotionTarget>();
    let frame = 0, scanFrame = 0, hashHandled = false, disposed = false;
    const update = () => {
      frame = 0;
      const scroll = window.scrollY, viewport = window.innerHeight;
      targets.forEach((target) => {
        const { element, top, height } = target;
        const relativeTop = top - scroll;
        // Reset only outside the viewport, never while someone is reading.
        if (relativeTop >= viewport || relativeTop + height <= 0) {
          target.visible = false;
          target.animation?.cancel();
          target.animation = undefined;
          return;
        }
        if (target.visible || relativeTop > viewport - Math.min(64, viewport * .08)) return;
        target.visible = true;
        if (reduced.matches || typeof element.animate !== 'function') return;
        const fromAbove = relativeTop < 0;
        target.animation = element.animate([
          { opacity: 0, transform: `translate3d(0,${fromAbove ? -48 : 88}px,0) scale(.91)` },
          { opacity: 1, transform: 'translate3d(0,0,0) scale(1)' },
        ], { duration: 1000, delay: target.delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
        const animation = target.animation;
        // Release effects so card hover styles work again after the reveal.
        animation.onfinish = () => { animation.cancel(); if (target.animation === animation) target.animation = undefined; };
      });
    };
    const queue = () => { if (!frame && !disposed) frame = requestAnimationFrame(update); };
    const measure = () => {
      let previousTop = -Infinity, rowIndex = 0;
      targets.forEach((target) => {
        // Layout offsets do not include our animated transforms.
        let top = 0;
        let node: HTMLElement | null = target.element;
        while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
        target.top = top;
        target.height = target.element.offsetHeight;
        rowIndex = Math.abs(previousTop - top) < 32 ? rowIndex + 1 : 0;
        target.delay = Math.min(rowIndex * 90, 180);
        previousTop = top;
      });
      queue();
    };
    const scan = () => {
      scanFrame = 0;
      if (!hashHandled && window.location.hash) {
        try {
          const target = document.getElementById(decodeURIComponent(window.location.hash.slice(1)));
          if (target) { target.scrollIntoView({ behavior: 'instant', block: 'start' }); hashHandled = true; }
        } catch { hashHandled = true; }
      } else if (!window.location.hash) hashHandled = true;
      const selectors = [
        '.exec-practice > div:first-child', '.exec-practice__roles > article', '.exec-proof > div',
        '.exec-section__heading', '.exec-case', '.exec-model__header', '.exec-model__steps > li',
        '.exec-timeline > article', '.exec-text-link', '.exec-lab > div', '.exec-contact .exec-shell',
        '.editorial-page > div:first-child', '.editorial-page > .grid > a',
        '.games-catalog > div:first-child', '.games-catalog > .grid > .group',
        '.legal-page > .glass-card > section', '.profile-page > section > div',
        '.projects-page > div > div', '.contact-page > div',
      ];
      // Never transform both a parent and its descendants, or article reading bodies.
      container.querySelectorAll<HTMLElement>(selectors.join(',')).forEach((element) => {
        if (!targets.has(element)) targets.set(element, { element, top: 0, height: 0, visible: false, delay: 0 });
      });
      targets.forEach((target, element) => {
        if (!container.contains(element)) { target.animation?.cancel(); targets.delete(element); }
      });
      measure();
    };
    const queueScan = () => { if (!scanFrame) scanFrame = requestAnimationFrame(scan); };
    const mutation = new MutationObserver(queueScan);
    mutation.observe(container, { childList: true, subtree: true });
    const resize = new ResizeObserver(measure);
    resize.observe(container);
    const motionChanged = () => {
      targets.forEach((target) => { target.animation?.cancel(); target.animation = undefined; target.visible = false; });
      queue();
    };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      const focused = event.target;
      targets.forEach((target) => { if (target.element.contains(focused)) target.animation?.finish(); });
    };
    queueScan();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', measure, { passive: true });
    reduced.addEventListener('change', motionChanged);
    container.addEventListener('focusin', focus);
    void document.fonts.ready.then(() => { if (!disposed) measure(); });
    return () => {
      disposed = true;
      cancelAnimationFrame(frame); cancelAnimationFrame(scanFrame); mutation.disconnect(); resize.disconnect();
      targets.forEach((target) => target.animation?.cancel());
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', measure);
      reduced.removeEventListener('change', motionChanged); container.removeEventListener('focusin', focus);
    };
  }, [pathname, privatePage]);

  return <div ref={root} className={`site-content ${privatePage ? '' : 'public-experience'}`}>
    {!privatePage && <div className="page-atmosphere" aria-hidden="true" />}
    {children}
  </div>;
}
