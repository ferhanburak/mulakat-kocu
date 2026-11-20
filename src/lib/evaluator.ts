import { findInterviewer, verdictFor } from '@/data/interviewers';
import { findUnit, type Question } from '@/data/professions';
import { pick, tt, type Bi } from './i18n';

/**
 * Offline, rule-based evaluator. It produces the same Report shape an LLM
 * evaluator would, so `evaluateSession` can later be swapped for a call to a
 * backend that asks Claude to grade against the same rubric.
 */

export type CategoryKey = 'icerik' | 'yapi' | 'netlik' | 'somutluk';

const CATEGORY_LABELS: Record<CategoryKey, Bi> = {
  icerik: { tr: 'İçerik / Bilgi', en: 'Content / Knowledge' },
  yapi: { tr: 'Yapı', en: 'Structure' },
  netlik: { tr: 'Netlik', en: 'Clarity' },
  somutluk: { tr: 'Somutluk', en: 'Concreteness' },
};
export const categoryLabel = (k: CategoryKey) => pick(CATEGORY_LABELS[k]);

export type AnswerFeedback = {
  questionId: string;
  question: string;
  answer: string;
  score: number;
  covered: string[];
  missing: string[];
  tip: string;
  ideal: string;
};

export type Report = {
  id: string;
  unitId: string;
  professionId: string;
  createdAt: string;
  overall: number;
  categories: Record<CategoryKey, number>;
  strengths: string[];
  weaknesses: string[];
  nextFocus: string;
  answers: AnswerFeedback[];
  xp: number;
  /** Who ran the interview, and their one-line verdict. */
  interviewerId?: string;
  verdict?: string;
  /** Answered against the clock (timed mode). */
  timed?: boolean;
};

export type AnswerLang = 'tr' | 'en';

/** Language-specific signals. Phrases are matched from the start of a word. */
const RULES: Record<
  AnswerLang,
  {
    locale: string;
    fillers: string[];
    fillerPhrases: string[];
    structure: string[];
    star: { durum: string[]; gorev: string[]; aksiyon: (string | RegExp)[]; sonuc: string[] };
    example: RegExp;
  }
> = {
  tr: {
    locale: 'tr-TR',
    fillers: ['yani', 'işte', 'şey', 'aslında', 'falan', 'filan', 'hani', 'açıkçası', 'ıı', 'ee'],
    fillerPhrases: ['ne bileyim', 'nasıl desem'],
    structure: ['önce', 'öncelikle', 'ilk olarak', 'sonra', 'ardından', 'ikinci', 'son olarak', 'sonuç olarak', 'çünkü', 'bu yüzden', 'bu nedenle', 'özetle', 'kısacası'],
    star: {
      durum: ['durum', 'projede', 'çalışırken', 'şirkette', 'bir gün', 'geçen', 'önceki', 'ekibimde', 'bir keresinde'],
      gorev: ['görev', 'amacım', 'hedef', 'sorumluluğum', 'gerekiyordu', 'benden beklenen', 'rolüm'],
      aksiyon: ['yaptım', 'ettim', 'kurdum', 'önerdim', 'konuştum', 'başlattım', 'hazırladım', 'çözdüm', 'düzenledim', 'analiz ettim', 'yönettim', 'geliştirdim', 'aldım', 'verdim', 'üstlendim'],
      sonuc: ['sonuç', 'sonunda', 'başardık', 'arttı', 'azaldı', 'tamamladık', 'öğrendim', '%', 'teslim ettik', 'kazandık', 'düştü', 'yükseldi'],
    },
    example: /örneğin|mesela|bir keresinde|geçen yıl|projede|önceki işimde|bir projede/,
  },
  en: {
    locale: 'en-US',
    fillers: ['um', 'uh', 'erm', 'like', 'basically', 'actually', 'literally', 'honestly'],
    fillerPhrases: ['you know', 'kind of', 'sort of', 'i mean'],
    structure: ['first', 'firstly', 'second', 'secondly', 'third', 'then', 'next', 'after that', 'finally', 'lastly', 'because', 'therefore', 'as a result', "that's why", 'that is why', 'so that', 'to sum up', 'in short', 'overall', 'for this reason'],
    star: {
      durum: ['when i was', 'in my last', 'in my previous', 'at my previous', 'at my last', 'last year', 'once', 'we were', 'our team', 'the project', 'situation', 'at the time'],
      gorev: ['my task', 'my goal', 'my role', 'i was responsible', 'i had to', 'i needed to', 'the goal was', 'we needed to', 'objective', 'responsib'],
      aksiyon: [/\bi (?:\w+ed|built|set up|led|wrote|met|spoke|took|made|ran|chose|drove|brought|sought|began|found|gave|held|kept|broke|put)\b/, 'we decided', 'i decided'],
      sonuc: ['as a result', 'in the end', 'which led to', 'resulted in', 'we delivered', 'i learned', 'increased', 'reduced', 'improved', 'saved', 'cut ', 'grew', 'percent', '%', 'on time'],
    },
    example: /for example|for instance|such as|e\.g\.|in my last|in my previous|at my previous|last year|\bonce\b|when i was/,
  },
};

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** True when `stem` starts a word in `text` (so "get" doesn't match "target"). */
const startsWord = (text: string, stem: string) =>
  new RegExp(`(^|[^a-z0-9çğıöşüâîû])${escapeRe(stem)}`).test(text);
/**
 * Turkish softens a final p/ç/t/k before a vowel suffix (önbellek → önbelleğe, kitap → kitabı),
 * so for longer Turkish stems the last letter is allowed to change. English drops a final e
 * before -ing/-ed (cache → caching, measure → measuring), so it may be left out there.
 */
const variants = (stem: string, locale: string) =>
  stem.length >= 5 && !stem.includes(' ') && (locale === 'tr-TR' ? /[pçtk]$/ : /e$/).test(stem) ? [stem, stem.slice(0, -1)] : [stem];
/**
 * Turkish lower-cases a capital I to dotless ı, so acronyms written in capitals (KPI, API,
 * CI) would never match their stems. Dotted and dotless i are treated the same for matching.
 */
const fold = (s: string, locale: string) => (locale === 'tr-TR' ? s.replace(/ı/g, 'i') : s);
const hasAny = (text: string, stems: (string | RegExp)[], locale: string) => {
  const folded = fold(text, locale);
  return stems.some((s) =>
    typeof s === 'string'
      ? variants(fold(s.toLocaleLowerCase(locale), locale), locale).some((v) => startsWord(folded, v))
      : s.test(text),
  );
};
/** Whether `text` mentions a concept, matched the same way answers are scored. */
export function mentions(text: string, stems: string[], lang: AnswerLang): boolean {
  const locale = RULES[lang].locale;
  return hasAny(text.toLocaleLowerCase(locale), stems, locale);
}

/** Replaces every word that starts with one of the stems with a blank, e.g. for "fill in the concept" items. */
export function blankOut(text: string, stems: string[], lang: AnswerLang): string {
  const locale = RULES[lang].locale;
  const all = stems.flatMap((st) => variants(fold(st.toLocaleLowerCase(locale), locale), locale)).sort((x, y) => y.length - x.length);
  if (all.length === 0) return text;
  const re = new RegExp(`(^|[^a-z0-9çğıöşüâîû])(${all.map(escapeRe).join('|')})[a-z0-9çğıöşüâîû'’-]*`, 'g');
  // Lower-casing keeps the length (tr-TR maps İ to i), so indices line up with the original.
  const lower = fold(text.toLocaleLowerCase(locale), locale);
  let out = '';
  let last = 0;
  for (const m of lower.matchAll(re)) {
    const start = m.index + m[1].length;
    out += text.slice(last, start) + '____';
    last = m.index + m[0].length;
  }
  return out + text.slice(last);
}

const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function scoreAnswer(q: Question, raw: string, lang: AnswerLang) {
  const R = RULES[lang];
  const text = raw.toLocaleLowerCase(R.locale);
  const words = text.split(/\s+/).filter(Boolean);
  const wc = words.length;

  const covered = q.concepts.filter((cn) => hasAny(text, cn.stems, R.locale)).map((cn) => cn.label);
  const missing = q.concepts.filter((cn) => !hasAny(text, cn.stems, R.locale)).map((cn) => cn.label);
  const icerik = clamp((covered.length / Math.max(1, q.concepts.length)) * 100);

  let yapi: number;
  if (q.kind === 'davranissal') {
    const parts = Object.values(R.star).filter((stems) => hasAny(text, stems, R.locale)).length;
    yapi = clamp((parts / 4) * 100);
  } else {
    const markers = R.structure.filter((m) => startsWord(text, m)).length;
    yapi = clamp(30 + markers * 25);
  }

  const fillerCount =
    words.filter((w) => R.fillers.includes(w.replace(/[.,!?;:]/g, ''))).length +
    R.fillerPhrases.reduce((n, p) => n + (text.split(p).length - 1), 0);
  const sentences = raw.split(/[.!?]+/).map((s) => s.trim()).filter(Boolean);
  const avgSentence = wc / Math.max(1, sentences.length);
  let netlik = 100;
  if (wc < 25) netlik -= 45;
  else if (wc < 45) netlik -= 20;
  if (wc > 220) netlik -= 25;
  if (avgSentence > 32) netlik -= 20;
  netlik -= Math.min(40, fillerCount * 10);
  netlik = clamp(netlik);

  const numbers = (raw.match(/\d+/g) || []).length;
  const example = R.example.test(text);
  const somutluk = clamp(20 + Math.min(3, numbers) * 20 + (example ? 30 : 0));

  const score = clamp(icerik * 0.45 + yapi * 0.2 + netlik * 0.2 + somutluk * 0.15);

  let tip: string;
  const gaps = missing.slice(0, 2).join(', ');
  if (wc < 25) tip = tt('Cevap çok kısa. Düşünceni 3–5 cümlede, gerekçesiyle anlat.', 'The answer is too short. Explain your thinking in 3–5 sentences, with your reasoning.');
  else if (missing.length > 0) tip = tt(`Şunlara değinseydin daha güçlü olurdu: ${gaps}.`, `It would be stronger if you had covered: ${gaps}.`);
  else if (q.kind === 'davranissal' && yapi < 75)
    tip = tt('Durum → Görev → Aksiyon → Sonuç sırasını belirgin kur, sonucu rakamla bitir.', 'Make the Situation → Task → Action → Result order clear, and end with a number.');
  else if (somutluk < 60) tip = tt('Bir rakam veya gerçek bir örnek ekle; somutluk ikna ediciliği artırır.', 'Add a number or a real example; being concrete makes you more convincing.');
  else if (fillerCount > 1)
    tip = lang === 'en' ? `Cut down on filler words (${fillerCount} like “um/like/basically”).` : `Dolgu kelimeleri azalt (${fillerCount} adet “yani/işte/şey”).`;
  else tip = tt('Güçlü bir cevap. Daha kısa ve vurucu bir açılış cümlesiyle bir üst seviyeye çıkar.', 'A strong answer. A shorter, punchier opening sentence would take it to the next level.');

  const result = hasAny(text, R.star.sonuc, R.locale);
  return { score, covered, missing, tip, cats: { icerik, yapi, netlik, somutluk }, fillerCount, wc, numbers, example, result };
}

/** Quick read of one answer (same rules as the report), for the interviewer's live reactions. */
export function answerSignals(q: Question, answer: string, lang: AnswerLang) {
  const r = scoreAnswer(q, answer, lang);
  return {
    score: r.score,
    covered: r.covered,
    missing: r.missing,
    words: r.wc,
    /** Gives an example or a number. */
    concrete: r.example || r.numbers > 0,
    /** Says how things turned out (the R of STAR). */
    result: r.result,
  };
}

export async function evaluateSession(
  professionId: string,
  unitId: string,
  items: { question: Question; answer: string }[],
  interviewerId?: string,
  opts: { timed?: boolean; bonusXp?: number } = {},
): Promise<Report> {
  const lang: AnswerLang = findUnit(unitId)?.track.lang === 'en' ? 'en' : 'tr';
  const scored = items.map((it) => ({ it, r: scoreAnswer(it.question, it.answer, lang) }));
  const n = Math.max(1, scored.length);
  const avg = (k: CategoryKey) => clamp(scored.reduce((s, x) => s + x.r.cats[k], 0) / n);
  const categories: Record<CategoryKey, number> = {
    icerik: avg('icerik'),
    yapi: avg('yapi'),
    netlik: avg('netlik'),
    somutluk: avg('somutluk'),
  };
  const overall = clamp(scored.reduce((s, x) => s + x.r.score, 0) / n);

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const say = {
    icerik: [
      tt('Konuya hâkimsin, temel kavramlara değindin.', 'You know the subject and covered the key concepts.'),
      tt('Bazı temel kavramları atladın; cevaplar yüzeysel kaldı.', 'You skipped some key concepts; the answers stayed shallow.'),
    ],
    yapi: [
      tt('Cevapların düzenli ve takip edilmesi kolay.', 'Your answers are well organized and easy to follow.'),
      tt('Cevaplarda net bir yapı yok; STAR veya “önce/sonra” akışı kullan.', 'Your answers lack a clear structure; use STAR or a “first/then” flow.'),
    ],
    netlik: [
      tt('Açık ve öz konuşuyorsun.', 'You speak clearly and concisely.'),
      tt('Cevaplar ya çok kısa ya çok dağınık; uzunluğu ve cümleleri dengele.', 'Answers are either too short or too scattered; balance length and sentences.'),
    ],
    somutluk: [
      tt('Örnek ve rakamlarla ikna edicisin.', 'You are convincing with examples and numbers.'),
      tt('Rakam ve gerçek örnek eksik; iddialarını kanıtla.', 'Numbers and real examples are missing; back up your claims.'),
    ],
  };
  (Object.keys(categories) as CategoryKey[]).forEach((k) => {
    if (categories[k] >= 70) strengths.push(say[k][0]);
    else if (categories[k] < 55) weaknesses.push(say[k][1]);
  });
  const totalFillers = scored.reduce((s, x) => s + x.r.fillerCount, 0);
  if (totalFillers >= 3)
    weaknesses.push(tt(`Toplam ${totalFillers} dolgu kelime kullandın (“yani”, “işte”...).`, `You used ${totalFillers} filler words in total (“um”, “like”...).`));
  if (strengths.length === 0) strengths.push(tt('Tüm soruları cevaplayarak seansı tamamladın, devam!', 'You answered every question and finished the session, keep going!'));
  if (weaknesses.length === 0) weaknesses.push(tt('Belirgin bir eksik yok; bir üst seviyeyi dene.', 'No clear gaps; try the next level.'));

  const weakest = (Object.keys(categories) as CategoryKey[]).sort((a, b) => categories[a] - categories[b])[0];
  const nextFocus = tt('Sonraki odak: ', 'Next focus: ') + `${categoryLabel(weakest)}. ${say[weakest][1]}`;

  return {
    id: `${Date.now()}`,
    unitId,
    professionId,
    createdAt: new Date().toISOString(),
    overall,
    categories,
    strengths,
    weaknesses,
    nextFocus,
    xp: 10 + Math.round(overall / 5) + (opts.timed ? (opts.bonusXp ?? 0) : 0),
    interviewerId,
    timed: opts.timed || undefined,
    verdict: interviewerId ? verdictFor(findInterviewer(interviewerId), overall)[lang] : undefined,
    answers: scored.map(({ it, r }) => ({
      questionId: it.question.id,
      question: it.question.text,
      answer: it.answer,
      score: r.score,
      covered: r.covered,
      missing: r.missing,
      tip: r.tip,
      ideal: it.question.ideal,
    })),
  };
}

export const PASS_SCORE = 60;
