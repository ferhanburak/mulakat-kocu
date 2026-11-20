import { findInterviewer } from '@/data/interviewers';
import { professions, type Question } from '@/data/professions';
import { answerSignals } from '@/lib/evaluator';
import { setLang } from '@/lib/i18n';
import { reactionTo } from '@/lib/reactions';
import answersTr from './fixtures/answers.tr.json';

jest.mock('@react-native-async-storage/async-storage', () =>
  // jest.mock factories run before imports, so the mock has to be required here.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

/**
 * Practice answers written to train the rule-based evaluator: for each question, several
 * correct answers in different wordings, incomplete ones, and wrong or off-topic ones.
 * Every answer must land in its group:
 * - good: covers at least 3/4 of the key points, with no wrong claim;
 * - partial: covers some key points but under 3/4, with no wrong claim;
 * - wrong: under half of the key points once wrong claims are counted, and the interviewer
 *   reacts with a weak-answer line.
 * When an answer lands in the wrong group, fix the question's stems or traps, not the answer.
 */
type Groups = { good?: string[]; partial?: string[]; wrong?: string[] };

function questionsByText(): Map<string, Question> {
  const map = new Map<string, Question>();
  for (const p of professions) for (const t of p.tracks) for (const u of t.units) for (const q of u.questions) map.set(q.text, q);
  return map;
}

describe('practice answers (Turkish)', () => {
  beforeAll(() => setLang('tr'));

  it('land in their expected group', () => {
    const byText = questionsByText();
    const elif = findInterviewer('ik');
    const problems: string[] = [];
    for (const [text, groups] of Object.entries(answersTr as Record<string, Groups>)) {
      const q = byText.get(text);
      if (!q) {
        problems.push(`question not found: ${text}`);
        continue;
      }
      const check = (group: keyof Groups, answer: string, ok: (s: ReturnType<typeof answerSignals>) => boolean) => {
        const s = answerSignals(q, answer, 'tr');
        if (ok(s)) return;
        problems.push(
          `[${group}] ${text.slice(0, 40)}… | "${answer.slice(0, 60)}…" | content ${s.content.toFixed(2)}` +
            ` | covered: ${s.covered.join(', ') || '-'} | missing: ${s.missing.join(', ') || '-'} | mistakes: ${s.mistakes.join(', ') || '-'}`,
        );
      };
      for (const a of groups.good ?? []) check('good', a, (s) => s.content >= 0.75 && s.mistakes.length === 0);
      for (const a of groups.partial ?? []) check('partial', a, (s) => s.covered.length > 0 && s.content < 0.75 && s.mistakes.length === 0);
      for (const a of groups.wrong ?? [])
        check('wrong', a, (s) => s.content < 0.5 && elif.ackWeak.tr.includes(reactionTo(elif, q, a, 'tr', 0)[0]));
    }
    expect(problems).toEqual([]);
  });
});
