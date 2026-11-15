import { sharedBehaviouralTexts } from '@/data/build';
import { allUnits, findQuestion, type Profession, type Question, type Unit } from '@/data/professions';
import { locale, tt } from './i18n';

const isShared = (x: Question) => sharedBehaviouralTexts.has(x.text);

/**
 * Quick-practice items generated from the open-ended question bank, so every
 * unit gets a multiple-choice / ordering mode without hand-written content.
 * Every item carries the id of the question it came from, for the mistake notebook.
 */
export type ChoiceItem = {
  type: 'choice';
  mode: 'match' | 'concept';
  questionId: string;
  prompt: string;
  question: string;
  options: string[];
  answer: number;
  explain: string;
};

export type OrderItem = {
  type: 'order';
  questionId: string;
  prompt: string;
  question: string;
  /** Sentences in the correct order. */
  parts: string[];
  /** Indices into `parts`, shuffled for display. */
  shuffled: number[];
};

export type QuizItem = ChoiceItem | OrderItem;

// Concept labels too generic to make a fair "which concept matters?" item.
// Also process-step verbs (DMAIC: Tanımla, Ölç, Analiz et, İyileştir, Kontrol et) that fit almost any question.
const GENERIC =
  /örnek|ölçüm|^test$|sonuç|rapor|iletişim|hipotez|metrik|araçlar|^tanımla$|^ölç$|^analiz et$|^iyileştir$|^kontrol et$|example|measure|^testing$|result|report|communicat|hypothes|metric|tools|^define$|^analy[sz]e$|^improve$|^control$/i;

const shuffle = <T,>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
const pick = <T,>(arr: T[], n: number) => shuffle(arr).slice(0, n);

export const sentences = (text: string) =>
  (text.match(/[^.!?]+[.!?]+/g) ?? [text]).map((s) => s.trim()).filter((s) => s.length > 0);

function matchItem(q: Question, pool: Question[]): ChoiceItem | null {
  const others = pool.filter((x) => x.text !== q.text && !isShared(x));
  if (others.length < 2) return null;
  const options = shuffle([q.ideal, ...pick(others, 2).map((x) => x.ideal)]);
  return {
    type: 'choice',
    mode: 'match',
    questionId: q.id,
    prompt: tt('Bu soruya en uygun cevabı seç', 'Pick the best answer to this question'),
    question: q.text,
    options,
    answer: options.indexOf(q.ideal),
    explain: tt(
      'Doğru cevap, sorunun istediği kavramları sırayla ve somut şekilde ele alıyor.',
      'The correct answer covers the concepts the question asks for, in order and concretely.',
    ),
  };
}

/** `prefer` steers the correct option towards concepts the user previously missed. */
function conceptItem(q: Question, pool: Question[], prefer: string[] = []): ChoiceItem | null {
  const own = q.concepts.filter((c) => !GENERIC.test(c.label));
  if (own.length === 0) return null;
  const ownLabels = new Set(q.concepts.map((c) => c.label.toLocaleLowerCase(locale())));
  const foreign = [
    ...new Set(
      pool
        .filter((x) => x.text !== q.text && !isShared(x))
        .flatMap((x) => x.concepts.map((c) => c.label))
        .filter((l) => !GENERIC.test(l) && !ownLabels.has(l.toLocaleLowerCase(locale()))),
    ),
  ];
  if (foreign.length < 3) return null;
  const preferred = own.filter((c) => prefer.includes(c.label));
  const correct = pick(preferred.length ? preferred : own, 1)[0].label;
  const options = shuffle([correct, ...pick(foreign, 3)]);
  return {
    type: 'choice',
    mode: 'concept',
    questionId: q.id,
    prompt: tt('Güçlü bir cevap hangisine mutlaka değinmeli?', 'Which of these must a strong answer cover?'),
    question: q.text,
    options,
    answer: options.indexOf(correct),
    explain: tt('Bu soruda beklenen kavramlar: ', 'Concepts expected in this question: ') + `${q.concepts.map((c) => c.label).join(', ')}.`,
  };
}

function orderItem(q: Question): OrderItem | null {
  const parts = sentences(q.ideal);
  if (parts.length < 3 || parts.length > 5) return null;
  let shuffled = shuffle(parts.map((_, i) => i));
  if (shuffled.every((v, i) => v === i)) shuffled = [...shuffled.slice(1), shuffled[0]];
  return {
    type: 'order',
    questionId: q.id,
    prompt: tt('Cevabın parçalarını doğru sıraya diz', 'Put the parts of the answer in the right order'),
    question: q.text,
    parts,
    shuffled,
  };
}

/**
 * Distractor pools for a unit. Concept distractors come from the profession's
 * other tracks (labels from the same track are often relevant too), and all
 * options share the track's language so the odd-language one can't give it away.
 */
function poolsFor(unit: Unit, profession: Profession) {
  const ownTrack = profession.tracks.find((t) => t.units.some((u) => u.id === unit.id));
  const lang = ownTrack?.lang ?? 'tr';
  const sameLang = profession.tracks.filter((t) => (t.lang ?? 'tr') === lang);
  const ownQuestions = ownTrack ? ownTrack.units.flatMap((u) => u.questions) : [];
  const otherTracks = sameLang.filter((t) => t !== ownTrack).flatMap((t) => t.units.flatMap((u) => u.questions));
  const langPool = sameLang.flatMap((t) => t.units.flatMap((u) => u.questions));
  const pool = langPool.length >= 3 ? langPool : allUnits(profession).flatMap((u) => u.questions);
  const conceptPool = otherTracks.length >= 3 ? otherTracks : ownQuestions.length >= 3 ? ownQuestions : pool;
  return { pool, conceptPool };
}

export function generateQuiz(unit: Unit, profession: Profession): QuizItem[] {
  const { pool, conceptPool } = poolsFor(unit, profession);
  const items: QuizItem[] = [];
  for (const q of unit.questions) {
    if (isShared(q)) {
      const o = orderItem(q) ?? conceptItem(q, conceptPool);
      if (o) items.push(o);
      continue;
    }
    const m = matchItem(q, pool);
    if (m) items.push(m);
    const second = orderItem(q) ?? conceptItem(q, conceptPool);
    if (second) items.push(second);
  }
  return items;
}

/**
 * Review quiz for the mistake notebook: one item per missed question, aimed at
 * the concepts that were missing; topped up with a second item when the list is short.
 */
export function generateReviewQuiz(mistakes: { questionId: string; concepts: string[] }[], max = 8): QuizItem[] {
  const items: QuizItem[] = [];
  const chosen = mistakes.slice(0, max);
  for (const m of chosen) {
    const ref = findQuestion(m.questionId);
    if (!ref) continue;
    const { pool, conceptPool } = poolsFor(ref.unit, ref.profession);
    const q = ref.question;
    const first = (m.concepts.length ? conceptItem(q, conceptPool, m.concepts) : null) ?? matchItem(q, pool) ?? orderItem(q);
    if (first) items.push(first);
    if (chosen.length <= 3) {
      const extra = first?.type === 'order' ? matchItem(q, pool) : orderItem(q) ?? matchItem(q, pool);
      if (extra && extra !== first) items.push(extra);
    }
  }
  return shuffle(items);
}
