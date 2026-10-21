/** Run once, locally: node scripts/generate-scouse-voice.mjs
 * Uses the project's existing Gemini credentials. Never runs on visits.
 */
import nextEnv from '@next/env';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
nextEnv.loadEnvConfig(root);
const key = (process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY || '').replace(/['"]/g, '').split(',')[0].trim();
if (!key) {
  console.error('Configure Gemini credentials in .env.local, then run this script again. No audio has been generated.');
  process.exit(1);
}
const manifestUrl = new URL('../lib/scouse-intro.json', import.meta.url);
const manifest = JSON.parse(await readFile(manifestUrl, 'utf8'));
const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash-tts:generateContent', {
  method: 'POST',
  headers: { 'x-goog-api-key': key, 'Content-Type': 'application/json' },
  body: JSON.stringify({
    contents: [{ role: 'user', parts: [{ text: manifest.transcript, speech_metadata: {
      style: 'Warm, thoughtful professional welcoming one person to a portfolio. Natural conversational English with a subtle British accent. Relaxed, confident, genuinely friendly, never a sales announcer or a cartoon robot. Gentle phrasing, small natural pauses, varied intonation and clear articulation. Pronounce Scouse as skowss, rhyming with house. No music or sound effects.',
    } }] }],
    generationConfig: { responseModalities: ['AUDIO'], speechConfig: { voiceConfig: { voice: manifest.voice } } },
  }),
  signal: AbortSignal.timeout(90000),
});
if (!response.ok) {
  // Do not print response bodies or request headers that could contain secrets.
  console.error(`Voice generation failed (HTTP ${response.status}). Check the key, billing and speech-model access. Existing assets were not changed.`);
  process.exit(1);
}
const result = await response.json();
const audio = result.candidates?.[0]?.content?.parts?.find(part => part.inlineData?.mimeType?.startsWith('audio/'))?.inlineData;
const bytes = Buffer.from(audio?.data || '', 'base64');
if (bytes.length < 1024 || bytes.toString('ascii', 0, 4) !== 'RIFF' || bytes.toString('ascii', 8, 12) !== 'WAVE') {
  throw new Error('The speech service did not return a valid audio asset. Existing assets were not changed.');
}
await mkdir(new URL('../public/sounds/', import.meta.url), { recursive: true });
await writeFile(new URL('../public/sounds/scouse-intro.wav', import.meta.url), bytes);
await writeFile(manifestUrl, JSON.stringify({ ...manifest, audioSrc: '/sounds/scouse-intro.wav' }, null, 2) + '\n');
console.log(`Generated Scouse introduction (${bytes.length} bytes). Listen to the recording, then rebuild and deploy with the WAV and manifest.`);
