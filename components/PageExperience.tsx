'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type MotionTarget = { element: HTMLElement; animation: Animation; top: number; height: number };

/** Native view timelines reverse automatically; older browsers use the same scroll progress in JS. */
export default function PageExperience({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const privatePage = /^\/(admin|studio)(\/|$)/.test(pathname);

  useEffect(() => {
    const container = root.current;
    if (!container || privatePage || /^\/games\/.+/.test(pathname)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const nativeTimelines = CSS.supports('animation-timeline', 'view()');
    const elements = new Set<HTMLElement>();
    const fallback = new Map<HTMLElement, MotionTarget>();
    let frame = 0, scanFrame = 0, hashHandled = false;
    const layoutPosition = (element: HTMLElement) => {
      // offsetTop ignores the animated transform, preventing geometry feedback.
      let top = 0;
      let node: HTMLElement | null = element;
      while (node) { top += node.offsetTop; node = node.offsetParent as HTMLElement | null; }
      return { top, height: element.offsetHeight };
    };
    const update = () => {
      frame = 0;
      if (reduced.matches) return;
      const viewport = window.innerHeight, scroll = window.scrollY;
      fallback.forEach(({ element, animation, top, height }) => {
        const progress = element.dataset.scrollFocused ? .5 : Math.min(1, Math.max(0, (viewport + scroll - top) / (viewport + height)));
        animation.currentTime = progress * 1000;
      });
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    const measure = () => {
      fallback.forEach((target) => Object.assign(target, layoutPosition(target.element)));
      queue();
    };
    const register = (element: HTMLElement) => {
      if (elements.has(element)) return;
      elements.add(element);
      if (nativeTimelines) { element.dataset.scrollMotion = 'view'; return; }
      if (reduced.matches || typeof element.animate !== 'function') return;
      element.dataset.scrollMotion = 'fallback';
      const animation = element.animate([
        { opacity: 0, transform: 'translate3d(0, 80px, 0) scale(.88)', filter: 'blur(6px)', offset: 0 },
        { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0px)', offset: .25 },
        { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0px)', offset: .75 },
        { opacity: 0, transform: 'translate3d(0, -50px, 0) scale(.93)', filter: 'blur(5px)', offset: 1 },
      ], { duration: 1000, easing: 'linear', fill: 'both' });
      animation.pause();
      const position = layoutPosition(element);
      animation.currentTime = Math.min(1, Math.max(0, (window.innerHeight + window.scrollY - position.top) / (window.innerHeight + position.height))) * 1000;
      fallback.set(element, { element, animation, ...position });
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
        '.exec-timeline > article', '.exec-text-link', '.exec-lab > div', '.exec-contact .exec-shell > *',
        '.editorial-page > div:first-child', '.editorial-page > .grid > a',
        '.games-catalog > div:first-child', '.games-catalog > .grid > .group',
        '.legal-page > .glass-card > section', '.profile-page > section > div',
        '.projects-page > div > div', '.contact-page > div',
      ];
      // Article reading bodies stay steady; only their surrounding UI animates.
      container.querySelectorAll<HTMLElement>(selectors.join(',')).forEach(register);
      measure();
    };
    const queueScan = () => { if (!scanFrame) scanFrame = requestAnimationFrame(scan); };
    const mutation = new MutationObserver(queueScan);
    mutation.observe(container, { childList: true, subtree: true });
    const resize = new ResizeObserver(measure);
    resize.observe(container);
    const motionChanged = () => {
      fallback.forEach(({ animation }) => animation.cancel()); fallback.clear();
      if (!nativeTimelines) { elements.clear(); queueScan(); }
    };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      // Keep a focused control readable even when it is at the edge of the viewport.
      const element = event.target.closest<HTMLElement>('[data-scroll-motion]');
      if (element) { element.dataset.scrollFocused = 'true'; queue(); }
    };
    const blur = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>('[data-scroll-motion]');
      if (element && !(event.relatedTarget instanceof Node && element.contains(event.relatedTarget))) { delete element.dataset.scrollFocused; queue(); }
    };
    queueScan();
    window.addEventListener('scroll', queue, { passive: true }); window.addEventListener('resize', measure, { passive: true });
    reduced.addEventListener('change', motionChanged);
    container.addEventListener('focusin', focus); container.addEventListener('focusout', blur);
    return () => {
      cancelAnimationFrame(frame); cancelAnimationFrame(scanFrame); mutation.disconnect(); resize.disconnect();
      fallback.forEach(({ animation }) => animation.cancel());
      elements.forEach((element) => { delete element.dataset.scrollMotion; delete element.dataset.scrollFocused; });
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', measure);
      reduced.removeEventListener('change', motionChanged);
      container.removeEventListener('focusin', focus); container.removeEventListener('focusout', blur);
    };
  }, [pathname, privatePage]);

  return <div ref={root} className={`site-content ${privatePage ? '' : 'public-experience'}`}>
    {!privatePage && <div className="page-atmosphere" aria-hidden="true" />}
    {children}
  </div>;
}
