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
};

export const INTERVIEWERS = data as Interviewer[];

export const DEFAULT_INTERVIEWER: InterviewerId = 'ik';

export const findInterviewer = (id: string | undefined) => INTERVIEWERS.find((i) => i.id === id) ?? INTERVIEWERS[0];

/** Picks one of a character's lines, stable for a given seed (so re-renders don't change it). */
export const lineFor = (lines: string[], seed: number) => lines[Math.abs(seed) % lines.length];

/** Every line a character can say in a language. */
export const interviewerLines = (i: Interviewer, lang: Lang) => [...i.intro[lang], ...i.ack[lang], i.outro[lang]];
