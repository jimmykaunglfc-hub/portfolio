'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Volume2, Square, X } from 'lucide-react';

const INTRO = "Welcome to Jimmy’s portfolio. I’m Scouse, your AI portfolio guide. I can help you explore Jimmy’s experience in product leadership, project delivery, and digital operations. How can I help you today?";

/** Speech is opt-in; the transcript remains available if a voice cannot play. */
export default function ScouseWelcome({ enabled, children }: {
  enabled: boolean;
  children: (speaking: boolean, mouth: number) => ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [supported, setSupported] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [starting, setStarting] = useState(false);
  const [mouth, setMouth] = useState(0);
  const [error, setError] = useState('');
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const cadence = useRef<ReturnType<typeof setInterval> | null>(null);
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pulse = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  function clearTimers() {
    if (cadence.current) clearInterval(cadence.current);
    if (watchdog.current) clearTimeout(watchdog.current);
    if (pulse.current) clearTimeout(pulse.current);
  }
  function releaseVoice() {
    clearTimers();
    if (utterance.current) {
      utterance.current.onstart = utterance.current.onend = utterance.current.onerror = utterance.current.onboundary = null;
      utterance.current = null;
      window.speechSynthesis.cancel();
    }
  }
  function stop(close = false) {
    releaseVoice(); setSpeaking(false); setStarting(false); setMouth(0);
    if (close) setVisible(false);
  }

  useEffect(() => {
    if (!enabled) return;
    try { if (sessionStorage.getItem('scouse-welcome-seen')) return; } catch { /* Optional persistence. */ }
    const show = window.setTimeout(() => {
      setSupported('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
      setVisible(true);
      try { sessionStorage.setItem('scouse-welcome-seen', '1'); } catch { /* Optional persistence. */ }
    }, 4700);
    return () => clearTimeout(show);
  }, [enabled]);

  useEffect(() => {
    const hidden = () => { if (document.hidden) stop(); };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') stop(true); };
    document.addEventListener('visibilitychange', hidden);
    window.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('visibilitychange', hidden);
      window.removeEventListener('keydown', escape);
      releaseVoice();
    };
    // Refs own the active utterance and timers, independent of render state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function speak() {
    if (!supported || starting || speaking) return;
    releaseVoice(); setError(''); setStarting(true);
    const speech = new SpeechSynthesisUtterance(INTRO);
    const voices = window.speechSynthesis.getVoices();
    speech.voice = voices.find(v => v.lang === 'en-GB' && v.localService)
      ?? voices.find(v => v.lang.startsWith('en') && v.localService)
      ?? voices.find(v => v.lang.startsWith('en')) ?? null;
    speech.lang = speech.voice?.lang ?? 'en-GB';
    speech.rate = .96; speech.pitch = 1; speech.volume = .85;
    utterance.current = speech;
    const fail = () => { stop(); setError('Audio is unavailable right now. You can read my introduction above or try again.'); };
    watchdog.current = setTimeout(fail, 6000);
    speech.onstart = () => {
      if (watchdog.current) clearTimeout(watchdog.current);
      setStarting(false); setSpeaking(true);
      // A modest cadence fallback for engines without word-boundary events.
      let step = 0;
      cadence.current = setInterval(() => setMouth([.25, .8, .15, .55, 0][step++ % 5]), 140);
      watchdog.current = setTimeout(fail, 45000);
    };
    speech.onboundary = (event) => {
      if (event.name !== 'word') return;
      if (cadence.current) { clearInterval(cadence.current); cadence.current = null; }
      if (pulse.current) clearTimeout(pulse.current);
      const word = INTRO.slice(event.charIndex).split(/\s/)[0];
      setMouth(/[ou]/i.test(word) ? .9 : .5);
      pulse.current = setTimeout(() => setMouth(0), Math.min(260, 80 + word.length * 22));
    };
    speech.onend = () => { stop(true); };
    speech.onerror = fail;
    try { window.speechSynthesis.speak(speech); } catch { fail(); }
  }

  return <>
    <AnimatePresence>
      {visible && <motion.aside className="scouse-welcome" aria-label="An introduction from Scouse"
        initial={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : .96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : 8 }}>
        <div className="scouse-welcome__heading"><span><i /> Scouse · Your portfolio guide</span>
          <button onClick={() => stop(true)} aria-label="Dismiss Scouse introduction"><X size={16} /></button></div>
        <p>{INTRO}</p>
        <div className="scouse-welcome__controls">
          {supported && <button onClick={() => speaking || starting ? stop() : speak()}>
            {speaking || starting ? <Square size={13} /> : <Volume2 size={16} />}
            {speaking ? 'Stop introduction' : starting ? 'Cancel audio' : 'Listen to Scouse'}
          </button>}
          <span role="status">{speaking ? 'Speaking…' : starting ? 'Starting voice…' : 'Sound is optional'}</span>
        </div>
        {error && <p className="scouse-welcome__error" role="status">{error}</p>}
      </motion.aside>}
    </AnimatePresence>
    {children(speaking, mouth)}
  </>;
}
