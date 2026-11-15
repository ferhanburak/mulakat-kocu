import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import * as Speech from 'expo-speech';
import { DEFAULT_INTERVIEWER, type InterviewerId } from '@/data/interviewers';
import { VOICE_CLIPS } from '@/data/voiceClips';

/**
 * The interviewer's voice. Each character has pre-recorded neural voice clips for
 * every question and line, by a native speaker of the language (see
 * scripts/generate_voices.py). Text without a clip falls back to the device's own
 * text-to-speech, tuned a little per character.
 */
export type VoiceLang = 'tr' | 'en';

const LOCALE: Record<VoiceLang, string> = { tr: 'tr-TR', en: 'en-US' };
const DEVICE_TONE: Record<InterviewerId, { rate: number; pitch: number }> = {
  ik: { rate: 0.95, pitch: 1.05 },
  uzman: { rate: 0.95, pitch: 0.95 },
  yonetici: { rate: 1.05, pitch: 0.88 },
};
const voiceCache: Partial<Record<VoiceLang, string | null>> = {};

/** Best available device voice for the language, preferring enhanced quality. */
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
/** Called when the current clip ends. */
let clipEnded: (() => void) | undefined;
/** Bumped on every speak/stop, so an interrupted sequence doesn't continue. */
let run = 0;

function playClip(source: number, onEnd: () => void) {
  if (!player) {
    player = createAudioPlayer(source);
    player.addListener('playbackStatusUpdate', (status) => {
      if (status.didJustFinish) {
        const end = clipEnded;
        clipEnded = undefined;
        end?.();
      }
    });
  } else {
    player.replace(source);
  }
  clipEnded = onEnd;
  player.seekTo(0).catch(() => {});
  player.play();
}

async function speakDevice(text: string, lang: VoiceLang, who: InterviewerId, onEnd: () => void) {
  const voice = await voiceFor(lang);
  Speech.speak(text, { language: LOCALE[lang], voice, ...DEVICE_TONE[who], onDone: onEnd, onStopped: onEnd, onError: onEnd });
}

/**
 * Speaks one text or several in a row (e.g. a short reaction, then the next question),
 * interrupting anything already playing. `onDone` runs when it ends or is interrupted.
 */
export async function speak(
  texts: string | string[],
  lang: VoiceLang = 'tr',
  opts: { interviewer?: InterviewerId; onDone?: () => void } = {},
) {
  stopSpeaking();
  const id = run;
  const who = opts.interviewer ?? DEFAULT_INTERVIEWER;
  const queue = (Array.isArray(texts) ? texts : [texts]).filter(Boolean);
  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    if (doneRef === done) doneRef = undefined;
    opts.onDone?.();
  };
  doneRef = done;

  const next = (i: number) => {
    if (id !== run) return;
    if (i >= queue.length) return done();
    const clip = VOICE_CLIPS[who]?.[queue[i]];
    if (clip !== undefined) {
      try {
        playClip(clip, () => next(i + 1));
        return;
      } catch {
        // fall through to the device voice
      }
    }
    speakDevice(queue[i], lang, who, () => next(i + 1)).catch(() => next(i + 1));
  };
  next(0);
}

/** onDone of the sequence in progress, so stopping reports it as ended. */
let doneRef: (() => void) | undefined;

export function stopSpeaking() {
  run++;
  clipEnded = undefined;
  player?.pause();
  Speech.stop().catch(() => {});
  const done = doneRef;
  doneRef = undefined;
  done?.();
}
