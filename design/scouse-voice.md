# Scouse's recorded introduction

The browser's system TTS has been removed. The introduction uses a static WAV
with consistent delivery across devices. `lib/scouse-intro.json` holds the exact
transcript, chosen voice, and asset URL. While `audioSrc` is null, the transcript
and chat remain available, but no audio button is shown.

## Generate once

1. Use the existing `GEMINI_API_KEYS` configuration in `.env.local` (never a `NEXT_PUBLIC_` variable).
2. Run `node scripts/generate-scouse-voice.mjs` from the repository root.
3. Listen to `public/sounds/scouse-intro.wav` and review pronunciation and pacing.
4. Build and deploy the WAV, manifest, and code together.

This makes one billable speech-generation call, not one call per visitor.
No API key or public generation endpoint is shipped to the browser.
The script uses `gemini-3.8-flash-tts`, the Algieba voice, and a warm conversational
direction based on the official documentation:
https://ai.google.dev/gemini-api/docs/generate-content/speech-generation

A professionally recorded file can be substituted; set `audioSrc` to its path
under `/sounds/` and match the transcript to the recording.
Adjust the UI's AI-generated disclosure if substituting a human recording.

## Playback checks

- First homepage visit in a fresh tab: wait for the welcome callout, then Listen.
- The callout stays visible until `ended`; Stop leaves it available to replay.
- Close, Escape, opening chat, route changes and hiding the tab stop playback.
- Slow network and missing audio show a retryable text fallback.
- Mouth motion follows waveform amplitude; it is not phoneme-level lip-sync.
- Reduced motion plays audio without the facial analyser or idle animations.
- Test mobile Safari and Chrome with sound enabled before publishing.
