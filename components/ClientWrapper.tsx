"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import SiteEntrance from "./SiteEntrance";
import ProductAssembly from "./ProductAssembly";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const [journeyVisible, setJourneyVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const homeEntry = window.location.pathname === '/' && !window.location.hash;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const frame = requestAnimationFrame(() => {
      setMounted(true);
      setJourneyVisible(homeEntry);
      setIntroVisible(homeEntry && !reduced.matches);
    });
    if (!homeEntry || reduced.matches) return () => cancelAnimationFrame(frame);
    const dismiss = () => setIntroVisible(false);
    // The journey mounts at its untouched starting point after dismissal.
    const events = ['pointerdown', 'wheel', 'keydown', 'touchstart'] as const;
    events.forEach((name) => window.addEventListener(name, dismiss, { passive: true, once: true }));
    reduced.addEventListener('change', dismiss, { once: true });
    // Allow the mechanical entrance to finish before safety dismissal.
    const fallback = window.setTimeout(dismiss, 5000);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fallback);
      events.forEach((name) => window.removeEventListener(name, dismiss));
      reduced.removeEventListener('change', dismiss);
    };
  }, []);

  return <>
    {!mounted ? <div className="client-boot-surface" /> : !(pathname === '/' && journeyVisible) ? children : null}
    {mounted && pathname === '/' && journeyVisible && !introVisible && <ProductAssembly>{children}</ProductAssembly>}
    {pathname === '/' && (!mounted || introVisible) &&
      <SiteEntrance ready={mounted} onComplete={() => setIntroVisible(false)} />}
  </>;
}
