import type { Question } from '@/data/professions';

/**
 * Offline, rule-based evaluator. It produces the same Report shape an LLM
 * evaluator would, so `evaluateSession` can later be swapped for a call to a
 * backend that asks Claude to grade against the same rubric.
 */

export type CategoryKey = 'icerik' | 'yapi' | 'netlik' | 'somutluk';

export const categoryLabels: Record<CategoryKey, string> = {
  icerik: 'İçerik / Bilgi',
  yapi: 'Yapı',
  netlik: 'Netlik',
  somutluk: 'Somutluk',
};

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
};

// Turkish + English markers so the English interview track is scored fairly too.
const FILLERS = ['yani', 'işte', 'şey', 'aslında', 'falan', 'filan', 'hani', 'açıkçası', 'um', 'uh', 'erm', 'basically'];
const STRUCTURE_MARKERS = [
  'önce', 'öncelikle', 'ilk olarak', 'sonra', 'ardından', 'ikinci', 'son olarak', 'sonuç olarak', 'çünkü', 'bu yüzden',
  'first', 'then', 'after that', 'finally', 'because', 'as a result', 'that is why', 'secondly',
];
const STAR = {
  durum: ['durum', 'projede', 'çalışırken', 'şirkette', 'bir gün', 'geçen', 'in my last', 'at my', 'once', 'situation', 'project'],
  gorev: ['görev', 'amacım', 'hedef', 'sorumluluğum', 'gerekiyordu', 'my task', 'my goal', 'i had to', 'i needed to', 'responsib'],
  aksiyon: ['yaptım', 'ettim', 'kurdum', 'önerdim', 'konuştum', 'başlattım', 'hazırladım', 'çözdüm', 'i suggested', 'i set up', 'i built', 'i decided', 'i talked', 'i started'],
  sonuc: ['sonuç', 'sonunda', 'başardık', 'arttı', 'azaldı', 'tamamladık', 'öğrendim', '%', 'as a result', 'in the end', 'we delivered', 'i learned', 'increased', 'reduced', 'percent'],
};

const lower = (s: string) => s.toLocaleLowerCase('tr-TR');
const has = (text: string, stems: string[]) => stems.some((s) => text.includes(lower(s)));
const clamp = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

function scoreAnswer(q: Question, raw: string) {
  const text = lower(raw);
  const words = text.split(/\s+/).filter(Boolean);
  const wc = words.length;

  const covered = q.concepts.filter((cn) => has(text, cn.stems)).map((cn) => cn.label);
  const missing = q.concepts.filter((cn) => !has(text, cn.stems)).map((cn) => cn.label);
  const icerik = clamp((covered.length / Math.max(1, q.concepts.length)) * 100);

  let yapi: number;
  if (q.kind === 'davranissal') {
    const parts = Object.values(STAR).filter((stems) => has(text, stems)).length;
    yapi = clamp((parts / 4) * 100);
  } else {
    const markers = STRUCTURE_MARKERS.filter((m) => text.includes(m)).length;
    yapi = clamp(30 + markers * 25);
  }

  const fillerCount = words.filter((w) => FILLERS.includes(w.replace(/[.,!?]/g, ''))).length;
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
  const example = /örneğin|mesela|bir keresinde|geçen yıl|projede|for example|for instance|in my last|last year/.test(text);
  const somutluk = clamp(20 + Math.min(3, numbers) * 20 + (example ? 30 : 0));

  const score = clamp(icerik * 0.45 + yapi * 0.2 + netlik * 0.2 + somutluk * 0.15);

  let tip: string;
  if (wc < 25) tip = 'Cevap çok kısa. Düşünceni 3–5 cümlede, gerekçesiyle anlat.';
  else if (missing.length > 0) tip = `Şunlara değinseydin daha güçlü olurdu: ${missing.slice(0, 2).join(', ')}.`;
  else if (q.kind === 'davranissal' && yapi < 75) tip = 'Durum → Görev → Aksiyon → Sonuç sırasını belirgin kur, sonucu rakamla bitir.';
  else if (somutluk < 60) tip = 'Bir rakam veya gerçek bir örnek ekle; somutluk ikna ediciliği artırır.';
  else if (fillerCount > 1) tip = `Dolgu kelimeleri azalt (${fillerCount} adet “yani/işte/şey”).`;
  else tip = 'Güçlü bir cevap. Daha kısa ve vurucu bir açılış cümlesiyle bir üst seviyeye çıkar.';

  return { score, covered, missing, tip, cats: { icerik, yapi, netlik, somutluk }, fillerCount, wc };
}

export async function evaluateSession(
  professionId: string,
  unitId: string,
  items: { question: Question; answer: string }[],
): Promise<Report> {
  const scored = items.map((it) => ({ it, r: scoreAnswer(it.question, it.answer) }));
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
    icerik: ['Konuya hâkimsin, temel kavramlara değindin.', 'Bazı temel kavramları atladın; cevaplar yüzeysel kaldı.'],
    yapi: ['Cevapların düzenli ve takip edilmesi kolay.', 'Cevaplarda net bir yapı yok; STAR veya “önce/sonra” akışı kullan.'],
    netlik: ['Açık ve öz konuşuyorsun.', 'Cevaplar ya çok kısa ya çok dağınık; uzunluğu ve cümleleri dengele.'],
    somutluk: ['Örnek ve rakamlarla ikna edicisin.', 'Rakam ve gerçek örnek eksik; iddialarını kanıtla.'],
  } as const;
  (Object.keys(categories) as CategoryKey[]).forEach((k) => {
    if (categories[k] >= 70) strengths.push(say[k][0]);
    else if (categories[k] < 55) weaknesses.push(say[k][1]);
  });
  const totalFillers = scored.reduce((s, x) => s + x.r.fillerCount, 0);
  if (totalFillers >= 3) weaknesses.push(`Toplam ${totalFillers} dolgu kelime kullandın (“yani”, “işte”...).`);
  if (strengths.length === 0) strengths.push('Tüm soruları cevaplayarak seansı tamamladın, devam!');
  if (weaknesses.length === 0) weaknesses.push('Belirgin bir eksik yok; bir üst seviyeyi dene.');

  const weakest = (Object.keys(categories) as CategoryKey[]).sort((a, b) => categories[a] - categories[b])[0];
  const nextFocus = `Sonraki odak: ${categoryLabels[weakest]}. ${say[weakest][1]}`;

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
    xp: 10 + Math.round(overall / 5),
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
