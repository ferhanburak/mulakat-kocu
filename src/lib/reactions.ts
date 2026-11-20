import { lineFor, type Interviewer, type InterviewerId } from '@/data/interviewers';
import type { Question } from '@/data/professions';
import { answerSignals } from './evaluator';
import type { Lang } from './i18n';

/**
 * The interviewer's live reactions, based on a quick read of each answer with the
 * same rules as the report: which key points it covered and how strong it is.
 */

const fill = (template: string, point: string) => template.replace('{x}', point);

/** What the interviewer says after an answer, as lines spoken one after another. */
export function reactionTo(i: Interviewer, q: Question, answer: string, lang: Lang, seed: number): string[] {
  const s = answerSignals(q, answer, lang);
  // Judged mostly on content: how many of the key points the answer covered.
  const hit = s.covered.length / Math.max(1, s.covered.length + s.missing.length);
  if (hit >= 0.75 && s.words >= 25) {
    const line = lineFor(i.ackGood[lang], seed);
    const point = s.covered.length ? s.covered[seed % s.covered.length] : undefined;
    return point ? [line, fill(i.praise[lang], point)] : [line];
  }
  if (hit < 0.34 || s.words < 12) return [lineFor(i.ackWeak[lang], seed)];
  return [lineFor(i.ack[lang], seed)];
}

const REASONING: Record<Lang, RegExp> = {
  tr: /çünkü|bu yüzden|bu nedenle|bu sebeple|sebebi|nedeni|amacıyla|için|böylece|dolayı/,
  en: /because|since|so that|the reason|therefore|which is why|that's why|in order to|to avoid|so we|as a result/,
};

/**
 * Which follow-up a character asks, if any:
 * - `topic`: the answer misses most key points, so ask about one of them;
 * - `own`: the character's own question (Elif: an example, Kerem: why, Murat: a one-line summary);
 * - `expand`: short but already concrete, so ask for more detail instead of an example;
 * - `result`: a behavioural answer that never says how it turned out.
 * Nothing is asked for that the answer already gives.
 */
export type ProbeKind = 'topic' | 'own' | 'expand' | 'result';

export function probeKind(id: InterviewerId, q: Question, answer: string, lang: Lang): ProbeKind | null {
  const s = answerSignals(q, answer, lang);
  const total = s.covered.length + s.missing.length;
  const hit = s.covered.length / Math.max(1, total);
  const offTopic = s.missing.length > 0 && hit < 0.5;
  // Short, abstract and only partly on point: worth asking for something concrete.
  const vague = s.words < 30 && !s.concrete && hit < 0.75;
  const short = s.words < 30;
  const noResult = q.kind === 'davranissal' && !s.result;
  const reasoned = REASONING[lang].test(answer.toLocaleLowerCase(lang === 'en' ? 'en-US' : 'tr-TR'));

  switch (id) {
    case 'ik': // warm: help the candidate open up
      if (offTopic) return 'topic';
      if (noResult) return 'result';
      if (short) return s.concrete ? 'expand' : 'own';
      return null;
    case 'uzman': // technical: wants the reasoning behind it
      if (offTopic) return 'topic';
      if (!reasoned) return 'own';
      if (noResult) return 'result';
      if (vague) return 'expand';
      return null;
    case 'yonetici': // tough: wants it short, concrete and with an outcome
      if (s.words > 90) return 'own';
      if (offTopic) return 'topic';
      if (noResult) return 'result';
      if (vague) return 'expand';
      return null;
  }
}

/** The one follow-up asked before moving on to the next question, or null. */
export function followUpFor(i: Interviewer, q: Question, answer: string, lang: Lang): string | null {
  const kind = probeKind(i.id, q, answer, lang);
  if (kind === 'topic') return fill(i.probeTopic[lang], answerSignals(q, answer, lang).missing[0]);
  if (kind === 'own') return i.probe[lang];
  if (kind === 'expand') return i.probeExpand[lang];
  if (kind === 'result') return i.probeResult[lang];
  return null;
}
