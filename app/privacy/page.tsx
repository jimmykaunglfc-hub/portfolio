'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-zinc-500 dark:text-slate-400">
            Last Updated: June 2026
          </p>
        </div>

        <section className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light text-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            1. Scope of This Policy
          </h2>
          <p>
            This Privacy Policy governs data processing protocols for the personal executive portfolio website of <strong>Kaung Htet Nyein Chan Oo</strong> (accessible at kghtetoo.com). This platform serves primarily as a digital track record repository and professional presentation channel.
          </p>
        </section>

        <section className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light text-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            2. Data Collection Parameters
          </h2>
          <p>
            We respect your digital boundaries. This platform does not deploy tracking pixels or persistent marketing trackers. Data collection is isolated strictly to:
          </p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Direct Communications:</strong> Information submitted manually via secure email links (`mailto:`) or direct telephone contact.</li>
            <li><strong>Anonymized Telemetry:</strong> Clean, non-identifying metrics managed securely through the deployment hosting engine (Vercel) to monitor framework uptime and access layout performance.</li>
          </ul>
        </section>

        <section className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light text-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            3. Data Retention &amp; Security
          </h2>
          <p>
            Professional records and communication pipelines are strictly guarded. No personal data, contact information, or operational correspondence shared through this web presence will ever be traded, leased, or distributed to external vendor platforms.
          </p>
        </section>

        <section className="space-y-4 text-zinc-700 dark:text-zinc-300 leading-relaxed font-light text-sm">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white font-sans tracking-tight">
            4. Executive Contact Coordination
          </h2>
          <p>
            For inquiries regarding user data management or systemic protection parameters, direct communication paths are open via:
          </p>
          <p className="font-mono text-xs text-[#4d8eff] dark:text-[#adc6ff]">
            jimmykg.spacex@gmail.com
          </p>
        </section>
      </div>
    </main>
  );
}