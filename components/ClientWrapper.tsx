"use client";

import { useState, useEffect } from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // While checking if it's the Native App or Web, show a sleek blank background matching the theme
  if (!mounted) {
    return <div className="min-h-screen bg-slate-50 dark:bg-[#050505]" />;
  }

  return <>{children}</>;
}