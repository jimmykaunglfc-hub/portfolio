'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full border-t border-zinc-200/60 dark:border-white/5 mt-20 bg-zinc-50/30 dark:bg-zinc-950/20 backdrop-blur-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-10">
        
        {/* Top Segment: Brand Credentials vs Social Matrices */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          
          {/* Identity Block */}
          <div className="space-y-2">
            <h5 className="text-xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
              Kaung Htet Nyein Chan Oo
            </h5>
            <p className="text-xs font-mono font-semibold uppercase tracking-wider text-[#4d8eff] dark:text-[#adc6ff]">
              Head of Digital Operations
            </p>
            <p className="text-sm font-light text-zinc-600 dark:text-zinc-400 max-w-sm">
              Orchestrating high-impact digital platforms &amp; FinTech ecosystems.
            </p>
          </div>

          {/* Connected Action Channels */}
          <div className="flex items-center gap-3">
            
            {/* Email Icon */}
            <a 
              href="mailto:jimmykg.spacex@gmail.com"
              className="w-10 h-10 rounded-full border border-zinc-300 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[#002e6a] dark:hover:bg-[#adc6ff] hover:text-white dark:hover:text-[#002e6a] hover:border-transparent transition-all duration-300 hover:scale-105"
              title="Secure Email Access"
            >
              <span className="material-symbols-outlined text-lg">mail</span>
            </a>

            {/* LinkedIn Icon */}
            <a 
              href="https://www.linkedin.com/in/kaung-htet-nyein-chan-oo-593952167/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-300 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[#0077b5] hover:text-white dark:hover:bg-[#0077b5] hover:border-transparent transition-all duration-300 hover:scale-105"
              title="LinkedIn Professional Network"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            {/* Telegram Icon */}
            <a 
              href="https://t.me/jimmyooig1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-300 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[#0088cc] hover:text-white dark:hover:bg-[#0088cc] hover:border-transparent transition-all duration-300 hover:scale-105"
              title="Telegram Secure Channel"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 11.998c0 6.627-5.373 12-12 12s-12-5.373-12-12 5.373-12 12-12 12 5.373 12 12zm-3.149-4.398c-.268-.269-.707-.354-1.155-.241l-14.88 5.736c-.473.18-.516.736-.089.982l3.784 2.184 1.44 4.51c.108.337.491.468.773.265l2.646-1.902 4.191 3.123c.365.272.883.123 1.054-.305l3.52-8.793c.184-.457.037-.991-.294-1.259zm-12.72 5.358l7.502-4.524c.101-.061.211.08.117.156l-6.522 5.276-.239 2.274-.858-3.182z"/>
              </svg>
            </a>

            {/* Facebook Icon */}
            <a 
              href="https://www.facebook.com/handsomekaunghtet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full border border-zinc-300 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-[#1877f2] hover:text-white dark:hover:bg-[#1877f2] hover:border-transparent transition-all duration-300 hover:scale-105"
              title="Facebook Personal Channel"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

          </div>
        </div>

        {/* Dynamic Separator Line Layout */}
        <hr className="border-t border-zinc-200 dark:border-white/5" />

        {/* Bottom Segment: Copyright Array and Legal Disclaimers */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
          <p>© 2026 Kaung Htet Nyein Chan Oo. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}