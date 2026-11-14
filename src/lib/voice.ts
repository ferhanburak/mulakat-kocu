import * as Speech from 'expo-speech';

/**
 * Text-to-speech for the interviewer, using the device's own voices (free,
 * works in Expo Go and on web). When an AI interviewer is added later, this is
 * the seam where a cloud voice can replace the device voice.
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

/** Speaks `text`, interrupting anything already playing. */
export async function speak(text: string, lang: VoiceLang = 'tr', handlers: { onDone?: () => void } = {}) {
  await Speech.stop();
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
  Speech.stop().catch(() => {});
}
