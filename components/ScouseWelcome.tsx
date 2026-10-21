'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Volume2, Square, X } from 'lucide-react';
import intro from '../lib/scouse-intro.json';

const { transcript: INTRO, audioSrc } = intro as { transcript: string; audioSrc: string | null };

/** Speech is opt-in; the transcript remains available if a voice cannot play. */
export default function ScouseWelcome({ enabled, children }: {
  enabled: boolean;
  children: (speaking: boolean, mouth: number) => ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [starting, setStarting] = useState(false);
  const [mouth, setMouth] = useState(0);
  const [error, setError] = useState('');
  const player = useRef<HTMLAudioElement | null>(null);
  const context = useRef<AudioContext | null>(null);
  const frame = useRef(0);
  const watchdog = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();

  function clearTimers() {
    cancelAnimationFrame(frame.current);
    if (watchdog.current) clearTimeout(watchdog.current);
  }
  function releaseVoice() {
    clearTimers();
    if (player.current) {
      player.current.onplaying = player.current.onwaiting = player.current.onended = player.current.onerror = null;
      player.current.pause();
      player.current.removeAttribute('src');
      player.current.load();
      player.current = null;
    }
    if (context.current) { void context.current.close().catch(() => {}); context.current = null; }
  }
  function stop(close = false) {
    releaseVoice(); setSpeaking(false); setStarting(false); setMouth(0);
    if (close) setVisible(false);
  }

  useEffect(() => {
    if (!enabled) return;
    try { if (sessionStorage.getItem('scouse-welcome-seen')) return; } catch { /* Optional persistence. */ }
    const show = window.setTimeout(() => {
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
    // Refs own the active player and audio graph, independent of render state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function speak() {
    if (!audioSrc || starting || speaking) return;
    releaseVoice(); setError(''); setStarting(true);
    const audio = new Audio(audioSrc);
    audio.preload = 'auto'; audio.volume = .9;
    player.current = audio;
    const fail = () => {
      if (player.current !== audio) return;
      stop(); setError('Audio is unavailable right now. You can read my introduction above or try again.');
    };
    let analyser: AnalyserNode | null = null;
    // Follow the real waveform, including pauses, instead of a fabricated mouth loop.
    if ('AudioContext' in window && !reduced) {
      try {
        const graph = new AudioContext();
        context.current = graph;
        const source = graph.createMediaElementSource(audio);
        analyser = graph.createAnalyser(); analyser.fftSize = 256;
        source.connect(analyser); analyser.connect(graph.destination);
        void graph.resume().catch(fail);
      } catch { /* Audio playback can still work without facial analysis. */ }
    }
    const samples = new Uint8Array(256);
    let lastUpdate = 0;
    const animateMouth = (now: number) => {
      if (player.current !== audio || audio.paused || audio.ended) return;
      if (analyser && now - lastUpdate > 70) {
        analyser.getByteTimeDomainData(samples);
        const rms = Math.sqrt(samples.reduce((sum, value) => sum + ((value - 128) / 128) ** 2, 0) / samples.length);
        setMouth(Math.min(1, Math.max(0, (rms - .012) * 7)));
        lastUpdate = now;
      }
      frame.current = requestAnimationFrame(animateMouth);
    };
    watchdog.current = setTimeout(fail, 12000);
    audio.onplaying = () => {
      if (watchdog.current) clearTimeout(watchdog.current);
      setStarting(false); setSpeaking(true);
      cancelAnimationFrame(frame.current);
      if (analyser) frame.current = requestAnimationFrame(animateMouth);
    };
    audio.onwaiting = () => {
      cancelAnimationFrame(frame.current); setMouth(0); setSpeaking(false); setStarting(true);
      if (watchdog.current) clearTimeout(watchdog.current);
      watchdog.current = setTimeout(fail, 12000);
    };
    audio.onended = () => stop(true);
    audio.onerror = fail;
    void audio.play().catch(() => { if (player.current === audio) fail(); });
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
          {audioSrc && <button onClick={() => speaking || starting ? stop() : speak()}>
            {speaking || starting ? <Square size={13} /> : <Volume2 size={16} />}
            {speaking ? 'Stop introduction' : starting ? 'Cancel audio' : 'Listen to Scouse'}
          </button>}
          <span role="status">{speaking ? 'Speaking · AI-generated voice' : starting ? 'Loading voice…' : audioSrc ? 'AI-generated voice · Optional audio' : 'Your AI portfolio guide · Ask me anything'}</span>
        </div>
        {error && <p className="scouse-welcome__error" role="status">{error}</p>}
      </motion.aside>}
    </AnimatePresence>
    {children(speaking, mouth)}
  </>;
}
