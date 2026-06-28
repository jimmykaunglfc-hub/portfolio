'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function GamesSharedLayoutContent({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const isAppView = searchParams?.get('app') === 'true';

  return (
    <>
      {/* CENTRALIZED APP INJECTION: 
        If opened inside the App, this dynamically overrides CSS styles 
        for ALL 6 games instantly without touching their individual files.
      */}
      {isAppView && (
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* 1. Hide any link or anchor tags navigating back to the web arcade grid */
              a[href="/games"], 
              a[href^="/games?"], 
              main a:has(svg) { 
                display: none !important; 
              }

              /* 2. Strip the large web header padding (pt-32 / pt-24) to pull the game upward */
              main {
                padding-top: 1.5rem !important;
              }
            `,
          }}
        />
      )}
      {children}
    </>
  );
}

// Wrapped in Suspense to prevent Next.js build-time de-optimization from useSearchParams
export default function GamesSharedLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={null}>
      <GamesSharedLayoutContent>{children}</GamesSharedLayoutContent>
    </Suspense>
  );
}