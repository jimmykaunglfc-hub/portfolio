"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import SiteEntrance from "./SiteEntrance";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [introVisible, setIntroVisible] = useState(false);
  const pathname = usePathname();
  const entranceStarted = useRef(false);

  useEffect(() => {
    setMounted(true);
    if (window.location.pathname !== '/' || window.location.hash) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduced.matches) return;
    try {
      if (!entranceStarted.current && sessionStorage.getItem('khnco-entrance-seen')) return;
      sessionStorage.setItem('khnco-entrance-seen', '1');
    } catch { /* A blocked storage API must never block entry. */ }
    entranceStarted.current = true;
    setIntroVisible(true);
    const dismiss = () => setIntroVisible(false);
    // No scroll lock: visitors can continue immediately, even during the reveal.
    const events = ['pointerdown', 'wheel', 'keydown', 'touchstart'] as const;
    events.forEach((name) => window.addEventListener(name, dismiss, { passive: true, once: true }));
    reduced.addEventListener('change', dismiss, { once: true });
    // Allow the 2.5s CSS entrance to finish before the safety dismissal.
    const fallback = window.setTimeout(dismiss, 3200);
    return () => {
      clearTimeout(fallback);
      events.forEach((name) => window.removeEventListener(name, dismiss));
      reduced.removeEventListener('change', dismiss);
    };
  }, []);

  return <>
    {mounted ? children : <div className="client-boot-surface" />}
    {pathname === '/' && (!mounted || introVisible) &&
      <SiteEntrance ready={mounted} onComplete={() => setIntroVisible(false)} />}
  </>;
}
