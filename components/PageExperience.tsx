'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** Shared public-page appearance and progressive scroll choreography. */
export default function PageExperience({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const root = useRef<HTMLDivElement>(null);
  const privatePage = /^\/(admin|studio)(\/|$)/.test(pathname);

  useEffect(() => {
    const container = root.current;
    if (!container || privatePage || /^\/games\/.+/.test(pathname)) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const seen = new Set<HTMLElement>();
    const animations = new Set<Animation>();
    let scanFrame = 0;
    const reveal = (element: HTMLElement, instant = false) => {
      if (element.dataset.reveal !== 'pending') return;
      element.dataset.reveal = 'visible';
      if (instant || reduced.matches || typeof element.animate !== 'function') return;
      const delay = Number(element.dataset.revealDelay || 0);
      const animation = element.animate([
        { opacity: 0, transform: 'perspective(1400px) translate3d(0, 74px, 0) rotateX(3deg) scale(.975)', filter: 'blur(7px)' },
        { opacity: 1, transform: 'perspective(1400px) translate3d(0, 0, 0) rotateX(0) scale(1)', filter: 'blur(0px)' },
      ], { duration: 1000, delay, easing: 'cubic-bezier(.16,1,.3,1)', fill: 'both' });
      animations.add(animation);
      animation.onfinish = () => { animation.cancel(); animations.delete(animation); };
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { reveal(entry.target as HTMLElement); observer.unobserve(entry.target); }
      });
    }, { threshold: 0, rootMargin: '0px 0px -7% 0px' });
    const scan = () => {
      scanFrame = 0;
      const selectors = [
        '.executive-portfolio > section:not(.exec-hero)',
        '.editorial-page > div:first-child', '.editorial-page > .grid > a',
        '.editorial-page article > *',
        '.games-catalog > div:first-child', '.games-catalog > .grid > .group',
        '.legal-page > .glass-card > section',
        '.profile-page > section', '.projects-page > div > div', '.contact-page > div',
      ];
      container.querySelectorAll<HTMLElement>(selectors.join(',')).forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        if (reduced.matches || element.getBoundingClientRect().top < window.innerHeight * .92) return;
        element.dataset.reveal = 'pending';
        if (element.parentElement?.classList.contains('grid')) {
          element.dataset.revealDelay = String((Array.from(element.parentElement.children).indexOf(element) % (window.innerWidth > 1000 ? 3 : window.innerWidth > 767 ? 2 : 1)) * 90);
        }
        observer.observe(element);
      });
    };
    const queueScan = () => { if (!scanFrame) scanFrame = requestAnimationFrame(scan); };
    const mutation = new MutationObserver(queueScan);
    mutation.observe(container, { childList: true, subtree: true });
    const motionChanged = () => {
      if (reduced.matches) {
        seen.forEach((element) => reveal(element, true));
        animations.forEach((animation) => animation.cancel()); animations.clear();
      }
    };
    const focus = (event: FocusEvent) => {
      if (event.target instanceof Element) {
        const pending = event.target.closest<HTMLElement>('[data-reveal="pending"]');
        if (pending) reveal(pending, true);
      }
    };
    scan(); reduced.addEventListener('change', motionChanged); container.addEventListener('focusin', focus);
    return () => {
      observer.disconnect(); mutation.disconnect(); cancelAnimationFrame(scanFrame);
      animations.forEach((animation) => animation.cancel());
      seen.forEach((element) => { delete element.dataset.reveal; delete element.dataset.revealDelay; });
      reduced.removeEventListener('change', motionChanged); container.removeEventListener('focusin', focus);
    };
  }, [pathname, privatePage]);

  return <div ref={root} className={`site-content ${privatePage ? '' : 'public-experience'}`}>
    {!privatePage && <div className="page-atmosphere" aria-hidden="true" />}
    {children}
  </div>;
}
