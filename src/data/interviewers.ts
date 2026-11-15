import type { Bi, Lang } from '@/lib/i18n';
import data from './interviewers.json';

/**
 * Interviewer characters (data in interviewers.json, which scripts/generate_voices.py
 * also reads). Each one has a native-speaker voice per language, a tone and its own
 * short lines between questions. Questions and scoring are the same for all of them.
 */
export type InterviewerId = 'ik' | 'uzman' | 'yonetici';

export type Interviewer = {
  id: InterviewerId;
  name: Bi;
  role: Bi;
  style: Bi;
  icon: string;
  color: string;
  voice: Bi<{ name: string; rate: string; pitch: string }>;
  /** Spoken before the first question. */
  intro: Bi<string[]>;
  /** Said after an answer, before the next question. */
  ack: Bi<string[]>;
  /** Said after the last answer. */
  outro: Bi;
  /** Follow-up asked once per question when the answer misses what this character cares about. */
  probe: Bi;
  /** One-line verdict on the report, by score band. */
  verdict: Record<'high' | 'mid' | 'low', Bi>;
};

export const INTERVIEWERS = data as Interviewer[];

export const DEFAULT_INTERVIEWER: InterviewerId = 'ik';

export const findInterviewer = (id: string | undefined) => INTERVIEWERS.find((i) => i.id === id) ?? INTERVIEWERS[0];

/** Picks one of a character's lines, stable for a given seed (so re-renders don't change it). */
export const lineFor = (lines: string[], seed: number) => lines[Math.abs(seed) % lines.length];

/** Every line a character can say in a language. */
export const interviewerLines = (i: Interviewer, lang: Lang) => [...i.intro[lang], ...i.ack[lang], i.outro[lang], i.probe[lang]];

const REASONING: Record<Lang, RegExp> = {
  tr: /çünkü|bu yüzden|bu nedenle|bu sebeple|sebebi|nedeni|amacıyla|için|böylece|dolayı/,
  en: /because|since|so that|the reason|therefore|which is why|that's why|in order to|to avoid|so we|as a result/,
};
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;

/**
 * Whether this character follows up on an answer before moving on:
 * Elif asks for an example when the answer is short, Kerem asks "why?" when
 * there is no reasoning, Murat asks for a one-line summary when it runs long.
 */
export function needsProbe(id: InterviewerId, answer: string, lang: Lang): boolean {
  const text = answer.toLocaleLowerCase(lang === 'en' ? 'en-US' : 'tr-TR');
  if (id === 'ik') return words(answer) < 30;
  if (id === 'uzman') return !REASONING[lang].test(text);
  return words(answer) > 90;
}

export const verdictFor = (i: Interviewer, overall: number) => i.verdict[overall >= 75 ? 'high' : overall >= 60 ? 'mid' : 'low'];
