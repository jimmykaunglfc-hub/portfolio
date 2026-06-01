'use client';

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto relative z-10">
      
      {/* Return Navigation Anchor */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#4d8eff] dark:text-[#adc6ff] hover:underline mb-8">
        <span className="material-symbols-outlined text-base">arrow_back</span>
        Return to Executive Portfolio
      </Link>

      <div className="glass-card rounded-3xl p-8 md:p-12 space-y-8 border border-zinc-200/60 dark:border-zinc-800/40">
        <div className="space-y-2 border-b border-zinc-200 dark:border-white/5 pb-6">
          <h1 className="text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs font-mono text-zinc-500 dark:text-slate-400">
            Last Updated: June 2026
          </p>
        </div>

        <section className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light text-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            1. Acceptance of Terms
          </h2>
          <p>
            By interacting with this web engine asset (kghtetoo.com), you verify your absolute alignment with these operational conditions. If you disagree with any segment of these framework protocols, please terminate your system access loop immediately.
          </p>
        </section>

        <section className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light text-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            2. Intellectual Property Governance
          </h2>
          <p>
            The comprehensive operational matrices, timeline charts, trajectory blueprint records, and localized visual configurations deployed here represent proprietary informational data owned by <strong>Kaung Htet Nyein Chan Oo</strong>. 
          </p>
          <p>
            Unauthorized replication, systematic compilation, or mirroring of these operational metrics for secondary commercial branding platforms without direct authorization is restricted.
          </p>
        </section>

        <section className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light text-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            3. Disclaimer of Informational Scope
          </h2>
          <p>
            The content presented across this platform serves strictly as a record summary of past operational delivery executions, cross-functional organizational management milestones, and technical consultation capabilities. 
          </p>
        </section>

        <section className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light text-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            4. Framework Adjustments
          </h2>
          <p>
            We reserve the right to prune or expand these interface rules at any point without prior operational broadcast windows. Continued reference interactions on your end mean you align with the modified terms.
          </p>
        </section>
      </div>
    </main>
  );
}