'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, Moon, Sun, X } from 'lucide-react';

const links = [
  { href: '/#selected-work', label: 'Selected work', id: 'selected-work' },
  { href: '/#operating-model', label: 'Expertise', id: 'operating-model' },
  { href: '/#trajectory', label: 'Experience', id: 'trajectory' },
  { href: '/blog', label: 'Insights', id: 'blog' },
  { href: '/games', label: 'Lab', id: 'games' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(true);
  const [isApp, setIsApp] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dark = localStorage.getItem('theme') !== 'light';
    document.documentElement.classList.toggle('dark', dark);
    document.body.classList.toggle('dark', dark);
    const nativeWindow = window as Window & { Capacitor?: { isNativePlatform?: () => boolean } };
    const nativeNavigator = navigator as Navigator & { standalone?: boolean };
    const ua = navigator.userAgent.toLowerCase();
    const native = Boolean(nativeWindow.Capacitor?.isNativePlatform?.() || window.matchMedia('(display-mode: standalone)').matches || nativeNavigator.standalone || /(iphone|ipod|ipad).*applewebkit(?!.*safari)|android.*wv/.test(ua));
    // Synchronize browser-only preferences after hydration.
    const hydrate = requestAnimationFrame(() => { setIsDark(dark); setIsApp(native); });
    const scroll = () => header.current?.classList.toggle('is-scrolled', window.scrollY > 24);
    scroll(); window.addEventListener('scroll', scroll, { passive: true });
    return () => { cancelAnimationFrame(hydrate); window.removeEventListener('scroll', scroll); };
  }, []);

  useEffect(() => {
    if (pathname !== '/') return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -50% 0px' });
    links.forEach(({ id }) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    menu.current?.querySelector<HTMLAnchorElement>('a')?.focus();
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setOpen(false); toggle.current?.focus(); }
      if (event.key === 'Tab') {
        const items = [toggle.current, ...Array.from(menu.current?.querySelectorAll<HTMLAnchorElement>('a') || [])].filter(Boolean) as HTMLElement[];
        const first = items[0], last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', keyboard);
    return () => { document.body.style.overflow = previous; document.removeEventListener('keydown', keyboard); };
  }, [open]);

  const theme = () => {
    const dark = !isDark;
    setIsDark(dark); document.documentElement.classList.toggle('dark', dark); document.body.classList.toggle('dark', dark);
    localStorage.setItem('theme', dark ? 'dark' : 'light');
  };
  if (isApp || pathname.startsWith('/studio') || pathname.startsWith('/admin')) return null;
  return <header ref={header} className={`executive-nav ${open ? 'menu-open' : ''}`}>
    <a className="skip-navigation" href="#main-content">Skip to content</a>
    <div className="executive-nav__inner">
      <Link href="/" className="executive-nav__brand" aria-label="Jimmy Kaung — home" onClick={() => setOpen(false)}>
        <svg viewBox="0 0 32 32" width="30" height="30" fill="none" aria-hidden="true"><path d="M7 5v22M25 5 14 16l11 11" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" /><path d="m14 16 11 11" stroke="#75b5ff" strokeWidth="2.8" strokeLinecap="round" /></svg>
        <span>KHNCO<span className="brand-period">.</span><small>Digital leadership</small></span>
      </Link>
      <nav className="executive-nav__desktop" aria-label="Main navigation">{links.map((link) => <Link key={link.id} href={link.href} aria-current={(pathname === '/' ? active === link.id : pathname.startsWith(link.href)) ? 'location' : undefined}>{link.label}</Link>)}</nav>
      <div className="executive-nav__actions">
        <button className="executive-nav__theme" onClick={theme} aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}>{isDark ? <Sun size={17} /> : <Moon size={17} />}</button>
        <Link className="executive-nav__contact" href="/#contact">Let’s talk <ArrowUpRight size={16} /></Link>
        <button ref={toggle} className="executive-nav__toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X size={23} /> : <Menu size={23} />}</button>
      </div>
    </div>
    {open && <div ref={menu} id="mobile-navigation" className="executive-nav__mobile"><p>Explore the portfolio</p><nav aria-label="Mobile navigation">{links.map((link, i) => <Link key={link.id} href={link.href} onClick={() => setOpen(false)}><span>0{i + 1}</span>{link.label}<ArrowUpRight size={22} /></Link>)}<Link href="/#contact" onClick={() => setOpen(false)}><span>06</span>Get in touch<ArrowUpRight size={22} /></Link></nav><small>Kaung Htet Nyein Chan Oo<br />Operations · Product · Projects</small></div>}
  </header>;
}
