import { sharedBehaviouralTexts } from '@/data/build';
import { allUnits, findQuestion, type Profession, type Question, type Unit } from '@/data/professions';
import { blankOut, mentions, type AnswerLang } from './evaluator';
import { getLang, locale, tt } from './i18n';

const isShared = (x: Question) => sharedBehaviouralTexts.has(x.text);

/**
 * Quick-practice items generated from the open-ended question bank, so every
 * unit gets a multiple-choice / ordering mode without hand-written content.
 * Every item carries the id of the question it came from, for the mistake notebook.
 */
export type ChoiceItem = {
  type: 'choice';
  /**
   * match: pick the right answer to the question · concept: pick a concept it must cover ·
   * flaw: spot what a weak answer leaves out · better: pick the stronger of two answers.
   */
  mode: 'match' | 'concept' | 'flaw' | 'better';
  /** The answer being judged, for `flaw` items. */
  answerText?: string;
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

/** Match each concept with the sentence that explains it (the concept's words blanked out). */
export type PairsItem = {
  type: 'pairs';
  questionId: string;
  prompt: string;
  question: string;
  /** Concept labels; explanation `i` was built for concept `i`. */
  concepts: string[];
  explanations: string[];
  /** Concepts each explanation fits (by index); usually just its own. */
  accepts: number[][];
  /** Display order of the explanations (indices into `explanations`). */
  shuffled: number[];
};

export type QuizItem = ChoiceItem | OrderItem | PairsItem;

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
  let ownIndex = -1;
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
    // One answer-quality item per question, alternating between the two kinds.
    ownIndex++;
    const third = ownIndex % 2 === 0 ? (flawItem(q) ?? betterItem(q)) : (betterItem(q) ?? flawItem(q));
    if (third) items.push(third);
  }
  // One matching item for the unit, from the sentences of all its own questions.
  const pairs = pairsItem(unit.questions.filter((q) => !isShared(q)));
  if (pairs) items.push(pairs);
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
    const first =
      (m.concepts.length ? (flawItem(q, m.concepts) ?? conceptItem(q, conceptPool, m.concepts)) : null) ??
      matchItem(q, pool) ??
      orderItem(q);
    if (first) items.push(first);
    if (chosen.length <= 3) {
      const extra = first?.type === 'order' ? matchItem(q, pool) : orderItem(q) ?? matchItem(q, pool);
      if (extra && extra !== first) items.push(extra);
    }
  }
  return shuffle(items);
}

// --- Answer-quality items -------------------------------------------------------------

/** Vague sentences a weak answer uses in place of the substance. */
const VAGUE: Record<AnswerLang, string[]> = {
  tr: [
    'Bu konuda genel olarak deneyimliyim.',
    'Duruma göre en uygun yolu seçerim.',
    'Bunu daha önce de birçok kez yaptım.',
    'Önemli olan işin doğru yapılmasıdır.',
    'Gerekirse araştırıp en iyisini bulurum.',
  ],
  en: [
    "I'm generally experienced with this.",
    'I pick the best approach depending on the situation.',
    "I've done this many times before.",
    'What matters is doing the job right.',
    "If needed, I'd look into it and find the best way.",
  ],
};

const qLang = (): AnswerLang => (getLang() === 'en' ? 'en' : 'tr');

/**
 * A weaker version of the ideal answer: the sentences covering `targets` are swapped
 * for vague ones, so it stays about as long and only the substance is missing.
 * Returns null when that would leave too little of the answer, or the concept still shows up.
 */
function weaken(q: Question, targets: Question['concepts'], lang: AnswerLang) {
  const parts = sentences(q.ideal);
  const hit = parts.map((p) => targets.some((c) => mentions(p, c.stems, lang)));
  const kept = hit.filter((h) => !h).length;
  if (kept < 2 || kept === parts.length) return null;
  const vague = shuffle(VAGUE[lang]);
  let v = 0;
  const out: string[] = [];
  parts.forEach((p, i) => {
    if (!hit[i]) out.push(p);
    else if (i === 0 || !hit[i - 1]) out.push(vague[v++ % vague.length]);
  });
  const text = out.join(' ');
  if (targets.some((c) => mentions(text, c.stems, lang))) return null;
  const covered = q.concepts.filter((c) => mentions(text, c.stems, lang));
  return { text, covered };
}

/** "What is this answer missing?": the options are the left-out concept and ones it does cover. */
function flawItem(q: Question, prefer: string[] = []): ChoiceItem | null {
  const lang = qLang();
  const candidates = shuffle(q.concepts.filter((c) => !GENERIC.test(c.label)));
  candidates.sort((a, b) => Number(prefer.includes(b.label)) - Number(prefer.includes(a.label)));
  for (const target of candidates) {
    const weak = weaken(q, [target], lang);
    if (!weak) continue;
    const others = weak.covered.filter((c) => c.label !== target.label);
    if (others.length < 2) continue;
    const options = shuffle([target.label, ...pick(others, 3).map((c) => c.label)]);
    return {
      type: 'choice',
      mode: 'flaw',
      questionId: q.id,
      prompt: tt('Bu cevapta ne eksik?', 'What is this answer missing?'),
      question: q.text,
      answerText: weak.text,
      options,
      answer: options.indexOf(target.label),
      explain: tt(
        `Cevap “${target.label}” konusunu atlayıp genel bir cümleyle geçiştiriyor. Diğer seçenekler cevapta zaten var.`,
        `The answer skips “${target.label}” and glosses over it with a vague sentence. The other options are already in it.`,
      ),
    };
  }
  return null;
}

/** "Which answer is stronger?": the ideal answer against a version that dodges up to two concepts. */
function betterItem(q: Question): ChoiceItem | null {
  const lang = qLang();
  const own = shuffle(q.concepts.filter((c) => !GENERIC.test(c.label)));
  for (let i = 0; i < own.length; i++) {
    const targets = own.slice(i, i + 2);
    const weak = weaken(q, targets, lang);
    if (!weak) continue;
    const options = shuffle([q.ideal, weak.text]);
    const names = targets.map((c) => `“${c.label}”`);
    return {
      type: 'choice',
      mode: 'better',
      questionId: q.id,
      prompt: tt('Hangi cevap daha güçlü?', 'Which answer is stronger?'),
      question: q.text,
      options,
      answer: options.indexOf(q.ideal),
      explain: tt(
        `Zayıf cevap ${names.join(' ve ')} yerine genel cümleler kuruyor; iddialarını hiçbir şeyle desteklemiyor.`,
        `The weaker answer uses vague sentences instead of ${names.join(' and ')}, so nothing backs up its claims.`,
      ),
    };
  }
  return null;
}

/**
 * Whether every concept still unmatched can get its own explanation, given which
 * explanation accepts which concepts (a sentence can explain two concepts at once).
 */
export function canComplete(accepts: number[][], paired: Record<number, number>, conceptCount: number): boolean {
  const usedE = new Set(Object.values(paired));
  const todo = [...Array(conceptCount).keys()].filter((c) => paired[c] === undefined);
  const free = accepts.map((_, e) => e).filter((e) => !usedE.has(e));
  const go = (i: number, taken: Set<number>): boolean =>
    i === todo.length ||
    free.some((e) => !taken.has(e) && accepts[e].includes(todo[i]) && go(i + 1, new Set([...taken, e])));
  return go(0, new Set());
}

/**
 * Concept ↔ explanation matching from the ideal answer. Each explanation is a sentence
 * with the concept's words blanked out; one that covers two concepts accepts either,
 * as long as the rest can still be matched.
 */
function pairsItem(qs: Question[]): PairsItem | null {
  const lang = qLang();
  const rows = qs
    .flatMap((q) => {
      const own = q.concepts.filter((c) => !GENERIC.test(c.label));
      return sentences(q.ideal).map((sentence) => ({ q, sentence, hits: own.filter((c) => mentions(sentence, c.stems, lang)) }));
    })
    .filter((r) => r.hits.length >= 1 && r.hits.length <= 2)
    .map((r) => {
      // The label's own words are blanked too, so it can't be matched just by spotting them.
      const labelStems = r.hits.flatMap((c) =>
        c.label
          .split(/[\s/()-]+/)
          .filter((w) => w.length >= 4 || /^[A-Z0-9]{2,}$/.test(w))
          // Acronyms (SPI, I2C) are blanked whole; longer words by their stem, to catch suffixes.
          .map((w) => (w.length >= 4 ? w.slice(0, Math.max(4, w.length - 2)) : w)),
      );
      const text = blankOut(r.sentence, [...r.hits.flatMap((c) => c.stems), ...labelStems], lang).replace(/____(?:\s+____)+/g, '____');
      const blanks = text.split('____').length - 1;
      const kept = text.replace(/____/g, ' ').split(/\s+/).filter((w) => w.length > 1).length;
      return { ...r, text, ok: blanks >= 1 && blanks <= 3 && kept >= 5 };
    })
    .filter((r) => r.ok)
    // Sentences about a single concept make the clearest explanations.
    .sort((a, b) => a.hits.length - b.hits.length);
  // Pick sentences one by one while each can still be given a concept of its own.
  const chosen: typeof rows = [];
  const labels: string[] = [];
  for (const r of rows) {
    if (chosen.length === 4) break;
    const fresh = r.hits.find((c) => !labels.includes(c.label));
    if (!fresh) continue;
    chosen.push(r);
    labels.push(fresh.label);
  }
  if (chosen.length < 3) return null;
  const from = [...new Set(chosen.map((r) => r.q))];
  const accepts = chosen.map((r) => r.hits.map((c) => labels.indexOf(c.label)).filter((i) => i >= 0));
  let shuffled = shuffle(chosen.map((_, i) => i));
  if (shuffled.every((v, i) => v === i)) shuffled = [...shuffled.slice(1), shuffled[0]];
  return {
    type: 'pairs',
    questionId: from[0].id,
    prompt: tt('Kavramları açıklamalarıyla eşleştir', 'Match each concept with its explanation'),
    // Sentences from several questions have no single question to show.
    question: from.length === 1 ? from[0].text : '',
    concepts: labels,
    explanations: chosen.map((r) => r.text),
    accepts,
    shuffled,
  };
}
