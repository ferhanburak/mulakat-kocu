import { professions } from '@/data/professions';
import { mentions } from '@/lib/evaluator';
import { setLang } from '@/lib/i18n';
import { canComplete, generateQuiz, type QuizItem } from '@/lib/quiz';

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const allItems = () =>
  professions.flatMap((p) => p.tracks.flatMap((t) => t.units.flatMap((u) => generateQuiz(u, p).map((item) => ({ item, p, u })))));

const countBy = (items: QuizItem[]) => {
  const c: Record<string, number> = {};
  for (const it of items) {
    const k = it.type === 'choice' ? it.mode : it.type;
    c[k] = (c[k] ?? 0) + 1;
  }
  return c;
};

describe.each(['tr', 'en'] as const)('MLK-MOB-006 quick practice (%s)', (lang) => {
  beforeAll(() => setLang(lang));

  it('generates every new practice type across the catalogue', () => {
    const counts = countBy(allItems().map((x) => x.item));
    if (process.env.QUIZ_STATS) console.log(lang, counts);
    expect(counts.flaw).toBeGreaterThan(20);
    expect(counts.better).toBeGreaterThan(20);
    expect(counts.pairs).toBeGreaterThan(10);
  });

  it('builds fair "what is missing?" items', () => {
    for (const { item, p, u } of allItems()) {
      if (item.type !== 'choice' || item.mode !== 'flaw') continue;
      const q = u.questions.find((x) => x.id === item.questionId)!;
      const byLabel = new Map(q.concepts.map((c) => [c.label, c]));
      // The right option is absent from the shown answer; every other option is in it.
      item.options.forEach((label, i) => {
        const present = mentions(item.answerText!, byLabel.get(label)!.stems, lang);
        expect({ id: q.id, label, present }).toEqual({ id: q.id, label, present: i !== item.answer });
      });
      expect(p).toBeDefined();
    }
  });

  it('builds "which is stronger?" items with the ideal answer as the right option', () => {
    for (const { item, u } of allItems()) {
      if (item.type !== 'choice' || item.mode !== 'better') continue;
      const q = u.questions.find((x) => x.id === item.questionId)!;
      expect(item.options).toHaveLength(2);
      expect(item.options[item.answer]).toBe(q.ideal);
      expect(item.options[1 - item.answer]).not.toBe(q.ideal);
    }
  });

  it('builds matching items with distinct concepts and blanked explanations', () => {
    for (const { item } of allItems()) {
      if (item.type !== 'pairs') continue;
      expect(new Set(item.concepts).size).toBe(item.concepts.length);
      expect(item.explanations).toHaveLength(item.concepts.length);
      expect([...item.shuffled].sort()).toEqual(item.concepts.map((_, i) => i));
      // Explanation i was picked for concept i, so the intended matching is always possible.
      item.accepts.forEach((a, i) => expect(a).toContain(i));
      expect(canComplete(item.accepts, {}, item.concepts.length)).toBe(true);
      for (const e of item.explanations) expect(e).toContain('____');
      if (process.env.QUIZ_STATS && Math.random() < 0.04) console.log(item.concepts, item.explanations);
    }
  });
});
