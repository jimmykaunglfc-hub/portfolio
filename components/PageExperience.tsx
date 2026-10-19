'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

type Reveal = { element: HTMLElement; animation: Animation; progress: number };

/** Scroll-linked content reveals. Animate content, never a section's empty padding. */
export default function PageExperience({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const privatePage = /^\/(admin|studio)(\/|$)/.test(pathname);

  useEffect(() => {
    const container = root.current;
    if (!container || privatePage || /^\/games\/.+/.test(pathname)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const seen = new Set<HTMLElement>();
    const pending = new Map<HTMLElement, Reveal>();
    let frame = 0, scanFrame = 0, hashHandled = false;
    const finish = (reveal: Reveal) => {
      reveal.element.dataset.reveal = 'visible';
      reveal.animation.cancel();
      pending.delete(reveal.element);
    };
    const update = () => {
      frame = 0;
      const viewport = window.innerHeight;
      let settling = false;
      // Read all geometry before changing any animations.
      const positions = Array.from(pending.values()).map((reveal) => ({ reveal, top: reveal.element.getBoundingClientRect().top }));
      for (const { reveal, top } of positions) {
        const target = Math.min(1, Math.max(reveal.progress, (viewport * .94 - top) / Math.min(300, viewport * .36)));
        const next = reduced.matches ? 1 : target - reveal.progress < .002 ? target : reveal.progress + (target - reveal.progress) * .22;
        reveal.progress = next;
        reveal.animation.currentTime = next * 1000;
        reveal.element.dataset.reveal = next > 0 ? 'scrubbing' : 'pending';
        if (next >= .999) finish(reveal);
        else if (target - next > .002) settling = true;
      }
      if (settling) frame = requestAnimationFrame(update);
    };
    const queue = () => { if (!frame) frame = requestAnimationFrame(update); };
    const scan = () => {
      scanFrame = 0;
      // This app mounts its public content after hydration. Restore deep links
      // once their targets exist instead of leaving the visitor at the hero.
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
        '.editorial-page > div:first-child', '.editorial-page > .grid > a', '.editorial-page > article',
        '.games-catalog > div:first-child', '.games-catalog > .grid > .group',
        '.legal-page > .glass-card > section', '.profile-page > section > div',
        '.projects-page > div > div', '.contact-page > div',
      ];
      container.querySelectorAll<HTMLElement>(selectors.join(',')).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        // Initially visible content and reduced-motion users are never hidden.
        if (reduced.matches || typeof element.animate !== 'function' || element.getBoundingClientRect().top < window.innerHeight * .9) return;
        const animation = element.animate([
          { opacity: 0, transform: 'translate3d(0, 64px, 0) scale(.98)', filter: 'blur(5px)', offset: 0 },
          { opacity: .9, transform: 'translate3d(0, 14px, 0) scale(.996)', filter: 'blur(0px)', offset: .7 },
          { opacity: 1, transform: 'translate3d(0, 0, 0) scale(1)', filter: 'blur(0px)', offset: 1 },
        ], { duration: 1000, easing: 'linear', fill: 'both' });
        animation.pause(); animation.currentTime = 0;
        element.dataset.reveal = 'pending';
        pending.set(element, { element, animation, progress: 0 });
      });
      queue();
    };
    const queueScan = () => { if (!scanFrame) scanFrame = requestAnimationFrame(scan); };
    const mutation = new MutationObserver(queueScan);
    mutation.observe(container, { childList: true, subtree: true });
    const motionChanged = () => { if (reduced.matches) Array.from(pending.values()).forEach(finish); };
    const focus = (event: FocusEvent) => {
      if (!(event.target instanceof Element)) return;
      const element = event.target.closest<HTMLElement>('[data-reveal]');
      const reveal = element && pending.get(element);
      if (reveal) finish(reveal);
    };
    // Wait for the route commit and child layout effects before collecting targets.
    queueScan();
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue, { passive: true });
    reduced.addEventListener('change', motionChanged); container.addEventListener('focusin', focus);
    return () => {
      cancelAnimationFrame(frame); cancelAnimationFrame(scanFrame); mutation.disconnect();
      pending.forEach((reveal) => reveal.animation.cancel());
      seen.forEach((element) => { delete element.dataset.reveal; });
      window.removeEventListener('scroll', queue); window.removeEventListener('resize', queue);
      reduced.removeEventListener('change', motionChanged); container.removeEventListener('focusin', focus);
    };
  }, [pathname, privatePage]);

  return <div ref={root} className={`site-content ${privatePage ? '' : 'public-experience'}`}>
    {!privatePage && <div className="page-atmosphere" aria-hidden="true" />}
    {children}
  </div>;
}
