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
  /** Said after a strong answer. */
  ackGood: Bi<string[]>;
  /** Said after a weak answer. */
  ackWeak: Bi<string[]>;
  /** Said after the last answer. */
  outro: Bi;
  /**
   * This character's own follow-up: Elif asks for an example, Kerem asks why, Murat asks
   * for a one-line summary. At most one follow-up is asked per question (see lib/reactions).
   */
  probe: Bi;
  /** Follow-up when the answer is short but already concrete: tell me more. */
  probeExpand: Bi;
  /** Follow-up when a behavioural answer never says how it turned out. */
  probeResult: Bi;
  /** Follow-up when the answer makes a known wrong claim: push back without giving it away. */
  probeDoubt: Bi;
  /** Follow-up naming a key point the answer missed; `{x}` is the point. */
  probeTopic: Bi;
  /** Added after a strong answer, naming one point it covered; `{x}` is the point. */
  praise: Bi;
  /** One-line verdict on the report, by score band. */
  verdict: Record<'high' | 'mid' | 'low', Bi>;
};

export const INTERVIEWERS = data as Interviewer[];

export const DEFAULT_INTERVIEWER: InterviewerId = 'ik';

export const findInterviewer = (id: string | undefined) => INTERVIEWERS.find((i) => i.id === id) ?? INTERVIEWERS[0];

/** Picks one of a character's lines, stable for a given seed (so re-renders don't change it). */
export const lineFor = (lines: string[], seed: number) => lines[Math.abs(seed) % lines.length];

/** Every line a character can say in a language. */
export const interviewerLines = (i: Interviewer, lang: Lang) => [
  ...i.intro[lang],
  ...i.ack[lang],
  ...i.ackGood[lang],
  ...i.ackWeak[lang],
  i.outro[lang],
  i.probe[lang],
  i.probeExpand[lang],
  i.probeResult[lang],
  i.probeDoubt[lang],
];

export const verdictFor = (i: Interviewer, overall: number) => i.verdict[overall >= 75 ? 'high' : overall >= 60 ? 'mid' : 'low'];
