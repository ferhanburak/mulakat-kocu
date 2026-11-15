import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import * as Speech from 'expo-speech';
import { VOICE_CLIPS } from '@/data/voiceClips';

/**
 * The interviewer's voice. Catalogue questions play a pre-recorded neural voice clip
 * (native Turkish or English speaker, see scripts/generate_voices.py); any other text,
 * or a question without a clip yet, falls back to the device's own text-to-speech.
 */
export type VoiceLang = 'tr' | 'en';

const LOCALE: Record<VoiceLang, string> = { tr: 'tr-TR', en: 'en-US' };
const voiceCache: Partial<Record<VoiceLang, string | null>> = {};

/** Best available voice for the language, preferring enhanced quality. */
async function voiceFor(lang: VoiceLang): Promise<string | undefined> {
  if (voiceCache[lang] !== undefined) return voiceCache[lang] ?? undefined;
  try {
    const voices = await Speech.getAvailableVoicesAsync();
    const prefix = LOCALE[lang].slice(0, 2).toLowerCase();
    const matching = voices.filter((v) => v.language?.toLowerCase().replace('_', '-').startsWith(prefix));
    const best =
      matching.find((v) => v.quality === Speech.VoiceQuality.Enhanced) ??
      matching.find((v) => v.language?.toLowerCase().replace('_', '-') === LOCALE[lang].toLowerCase()) ??
      matching[0];
    voiceCache[lang] = best?.identifier ?? null;
  } catch {
    voiceCache[lang] = null;
  }
  return voiceCache[lang] ?? undefined;
}

let player: AudioPlayer | null = null;
/** Called when the current clip ends or is interrupted. */
let clipDone: (() => void) | undefined;

function finishClip() {
  const done = clipDone;
  clipDone = undefined;
  done?.();
}

function playClip(source: number, onDone?: () => void) {
  if (!player) {
    player = createAudioPlayer(source);
    player.addListener('playbackStatusUpdate', (status) => {
      if (status.didJustFinish) finishClip();
    });
  } else {
    player.replace(source);
  }
  clipDone = onDone;
  player.seekTo(0).catch(() => {});
  player.play();
}

function stopClip() {
  player?.pause();
  finishClip();
}

/** Speaks `text`, interrupting anything already playing. */
export async function speak(text: string, lang: VoiceLang = 'tr', handlers: { onDone?: () => void } = {}) {
  stopClip();
  await Speech.stop();
  const clip = VOICE_CLIPS[text];
  if (clip !== undefined) {
    try {
      playClip(clip, handlers.onDone);
      return;
    } catch {
      clipDone = undefined; // fall through to the device voice
    }
  }
  const voice = await voiceFor(lang);
  Speech.speak(text, {
    language: LOCALE[lang],
    voice,
    rate: 0.95,
    pitch: 1,
    onDone: handlers.onDone,
    onStopped: handlers.onDone,
    onError: handlers.onDone,
  });
}

export function stopSpeaking() {
  stopClip();
  Speech.stop().catch(() => {});
}
