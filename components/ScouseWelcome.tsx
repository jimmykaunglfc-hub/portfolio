'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Play, Square, X, Sparkles, ArrowUpRight } from 'lucide-react';
import intro from '../lib/scouse-intro.json';

const { transcript: INTRO, audioSrc } = intro as { transcript: string; audioSrc: string | null };
const timeLabel = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;

/** Speech is opt-in; the transcript remains available if a voice cannot play. */
export default function ScouseWelcome({ enabled, onChat, children }: {
  enabled: boolean;
  onChat: () => void;
  children: (speaking: boolean, mouth: number, welcomeVisible: boolean) => ReactNode;
}) {
  const [visible, setVisible] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [starting, setStarting] = useState(false);
  const [mouth, setMouth] = useState(0);
  const [error, setError] = useState('');
  const [playback, setPlayback] = useState({ elapsed: 0, duration: 0 });
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
      player.current.ontimeupdate = player.current.onloadedmetadata = null;
      player.current.pause();
      player.current.removeAttribute('src');
      player.current.load();
      player.current = null;
    }
    if (context.current) { void context.current.close().catch(() => {}); context.current = null; }
  }
  function stop(close = false) {
    releaseVoice(); setSpeaking(false); setStarting(false); setMouth(0); setPlayback({ elapsed: 0, duration: 0 });
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
    const updatePlayback = () => setPlayback({ elapsed: audio.currentTime, duration: Number.isFinite(audio.duration) ? audio.duration : 0 });
    audio.ontimeupdate = updatePlayback;
    audio.onloadedmetadata = updatePlayback;
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
      {visible && <motion.aside className={`scouse-welcome ${speaking ? 'scouse-welcome--speaking' : ''}`} aria-label="An introduction from Scouse"
        initial={{ opacity: 0, y: reduced ? 0 : 12, scale: reduced ? 1 : .96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: reduced ? 0 : 8 }}>
        <header className="scouse-welcome__heading">
          <span className="scouse-welcome__identity" aria-hidden="true"><Sparkles size={21} /></span>
          <div className="scouse-welcome__name"><span>YOUR AI PORTFOLIO GUIDE</span><strong>Scouse<i aria-hidden="true" /></strong></div>
          <button className="scouse-welcome__dismiss" onClick={() => stop(true)} aria-label="Dismiss Scouse introduction"><X size={17} /></button>
        </header>
        <div className="scouse-welcome__body"><h2>Let’s connect the dots.</h2><p>{INTRO}</p></div>
        {audioSrc && <div className="scouse-welcome__audio">
          <button className="scouse-welcome__play" onClick={() => speaking || starting ? stop() : speak()} aria-label={speaking ? 'Stop introduction' : starting ? 'Cancel audio' : 'Listen to Scouse introduction'}>
            <span className="scouse-welcome__play-icon">{speaking || starting ? <Square size={14} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</span>
            <span className="scouse-welcome__play-label"><strong>{speaking ? 'Scouse is speaking' : starting ? 'Preparing your welcome' : 'Hear a personal welcome'}</strong><span>{speaking ? 'Tap to stop' : starting ? 'Tap to cancel' : 'A short introduction, in my own voice'}</span></span>
            <span className="scouse-welcome__waveform" aria-hidden="true">{[.5,.85,1,.7,.4].map((height, i) => <i key={i} style={{ height: `${4 + (speaking && !reduced ? mouth : .15) * height * 23}px` }} />)}</span>
          </button>
          <div className="scouse-welcome__progress" aria-hidden="true"><span style={{ transform: `scaleX(${playback.duration ? playback.elapsed / playback.duration : 0})` }} /></div>
          <div className="scouse-welcome__audio-meta"><span>AI-generated voice · Optional audio</span><span aria-hidden="true">{playback.duration ? `${timeLabel(playback.elapsed)} / ${timeLabel(playback.duration)}` : 'SOUND OFF'}</span></div>
        </div>}
        <div className="scouse-welcome__footer">
          <span role="status">{speaking ? 'Introducing myself…' : starting ? 'Loading audio…' : 'What would you like to explore?'}</span>
          <button onClick={() => { stop(true); onChat(); }}>Ask Scouse <ArrowUpRight size={15} /></button>
        </div>
        {error && <p className="scouse-welcome__error" role="status">{error}</p>}
      </motion.aside>}
    </AnimatePresence>
    {children(speaking, mouth, visible)}
  </>;
}
