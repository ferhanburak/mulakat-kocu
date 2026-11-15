import { sharedBehaviouralTexts } from '@/data/build';
import type { InterviewerId } from '@/data/interviewers';
import { findUnit, professions, type Question } from '@/data/professions';

const isShared = (q: Question) => sharedBehaviouralTexts.has(q.text);

/**
 * The questions an interviewer asks for a unit. Every character asks the unit's
 * own questions; around them:
 * - Elif (HR) keeps the behavioural question and adds a second one,
 * - Kerem (domain expert) drops it and digs deeper with a question from the next unit,
 * - Murat (department head) drops it and tests you with a question from the track's most senior unit.
 * Choices are deterministic, so a unit always gives the same interview with the same character.
 */
export function sessionQuestions(unitId: string, who: InterviewerId): Question[] {
  const found = findUnit(unitId);
  if (!found) return [];
  const { track, unit } = found;
  const own = unit.questions.filter((q) => !isShared(q));
  const shared = unit.questions.filter(isShared);
  const index = track.units.findIndex((u) => u.id === unit.id);
  const ownTexts = new Set(unit.questions.map((q) => q.text));
  const firstFrom = (unitIdx: number) =>
    track.units[unitIdx]?.questions.find((q) => !isShared(q) && !ownTexts.has(q.text));

  if (who === 'ik') {
    if (shared.length === 0) return unit.questions; // tracks without the shared question are already behavioural
    const lang = track.lang ?? 'tr';
    const pool = new Map<string, Question>();
    for (const p of professions)
      for (const t of p.tracks)
        if ((t.lang ?? 'tr') === lang)
          for (const u of t.units) for (const q of u.questions) if (isShared(q) && !ownTexts.has(q.text)) pool.set(q.text, q);
    const extras = [...pool.values()];
    const extra = extras.length ? extras[index % extras.length] : undefined;
    return [...own, ...shared, ...(extra ? [extra] : [])];
  }

  if (who === 'uzman') {
    const deeper = firstFrom(index + 1) ?? firstFrom(index - 1);
    return [...own, ...(deeper ? [deeper] : shared)];
  }

  const last = track.units.length - 1;
  const senior = index < last ? firstFrom(last) : firstFrom(index - 1);
  return [...own, ...(senior ? [senior] : shared)];
}
