'use client';

import { usePathname } from 'next/navigation';
import AIChat from './AIChat';
import CustomCursor from './CustomCursor';
import InteractiveBackground from './InteractiveBackground';
import Navbar from './Navbar';

/**
 * Public-only visual and interaction layer.
 *
 * Keeping this decision above the individual components guarantees their
 * canvases, animation frames, observers, Supabase listeners, and global event
 * handlers are never initialized inside administrative or Studio routes.
 */
export default function PublicSiteChrome() {
  const pathname = usePathname();
  const privateRoute = /^\/(admin|studio)(\/|$)/.test(pathname);

  if (privateRoute) return null;

  return <>
    <InteractiveBackground />
    <CustomCursor />
    <Navbar />
    <AIChat />
  </>;
}
