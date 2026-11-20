import { lineFor, needsProbe, type Interviewer } from '@/data/interviewers';
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

/**
 * The one follow-up asked before moving on, or null. When the answer misses most key
 * points the interviewer asks about one of them; otherwise each character probes in
 * its own way (see `needsProbe`).
 */
export function followUpFor(i: Interviewer, q: Question, answer: string, lang: Lang): string | null {
  const s = answerSignals(q, answer, lang);
  const total = s.covered.length + s.missing.length;
  if (s.missing.length > 0 && s.covered.length / Math.max(1, total) < 0.5) return fill(i.probeTopic[lang], s.missing[0]);
  return needsProbe(i.id, answer, lang) ? i.probe[lang] : null;
}
