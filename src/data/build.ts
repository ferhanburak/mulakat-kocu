export type QuestionKind = 'teknik' | 'davranissal' | 'vaka';
export type Level = 'Junior' | 'Mid' | 'Senior';

export type Question = {
  id: string;
  kind: QuestionKind;
  text: string;
  /** Each concept is hit when any of its stems appears in the answer. */
  concepts: { label: string; stems: string[] }[];
  /**
   * Common wrong claims. Each pattern is a phrase whose parts (split by "...") must appear
   * in order inside one clause, e.g. "get ... oluşturur" for "GET creates data".
   */
  traps?: { label: string; patterns: string[] }[];
  ideal: string;
};

export type Unit = { id: string; title: string; level: Level; questions: Question[] };

export type Track = { id: string; name: string; icon: string; tagline: string; units: Unit[]; lang?: 'tr' | 'en' };

export type Profession = {
  id: string;
  name: string;
  icon: string;
  color: string;
  tagline: string;
  tracks: Track[];
  /** Cross-profession interview types shown in their own home section. */
  general?: boolean;
};

/**
 * Compact question builder. Concepts are written as "Label: stem1, stem2"; traps (wrong
 * claims) as "Label: pattern one; pattern two", where "..." in a pattern is a short gap.
 */
export const q = (kind: QuestionKind, text: string, concepts: string[], ideal: string, traps?: string[]): Question => ({
  id: '',
  kind,
  text,
  ideal,
  concepts: concepts.map((c) => {
    const [label, stems] = c.split(':');
    return { label: label.trim(), stems: stems.split(',').map((s) => s.trim()).filter(Boolean) };
  }),
  ...(traps?.length
    ? {
        traps: traps.map((t) => {
          const at = t.indexOf(':');
          return { label: t.slice(0, at).trim(), patterns: t.slice(at + 1).split(';').map((s) => s.trim()).filter(Boolean) };
        }),
      }
    : {}),
});

/** Behavioural questions shared by every track; one is appended to each unit. */
export const BEHAVIOURAL: Question[] = [
  q(
    'davranissal',
    'Bir ekip arkadaşınla fikir ayrılığı yaşadığın bir durumu ve nasıl çözdüğünü anlatır mısın?',
    ['Durumu tanımlama: proje, ekip, durum', 'Dinleme / empati: dinle, anla, empati, bakış', 'Somut aksiyon: konuştu, toplantı, önerdi, yaptı', 'Sonuç: sonuç, çözül, anlaş, teslim'],
    'Durum: sprint sonunda bir özelliğin kapsamında anlaşamadık. Görev: teslim tarihini kaçırmadan ortak karar almak. Aksiyon: birebir görüşüp iki seçeneğin maliyetini çıkardım, kararı veriye bağladık. Sonuç: zamanında teslim ettik, kalan kısmı sonraki sprintte ekledik.',
  ),
  q(
    'davranissal',
    'Başarısız olduğun bir işi ve bundan ne öğrendiğini anlatır mısın?',
    ['Sorumluluk alma: hata, benim, sorumlu, yanlış', 'Öğrenim: öğren, ders, fark', 'Değişen davranış: artık, sonrasında, değiştir, uygul'],
    'Bir lansmanda test planını kısa tuttum ve canlıda hata çıktı. Sorumluluğu üstlendim, geri alıp düzelttik. O günden beri her sürüm öncesi kontrol listesi kullanıyorum; sonraki 6 sürümde benzer hata yaşanmadı.',
  ),
  q(
    'davranissal',
    'Neden bu pozisyona başvurdun ve kendini 3 yıl sonra nerede görüyorsun?',
    ['Şirket / rol bağlantısı: şirket, rol, pozisyon, ürün', 'Kendi güçlü yönü: deneyim, güçlü, beceri, yetkinlik', 'Gelecek hedefi: yıl, hedef, büyü, liderlik, uzman'],
    'Ürününüzü kullanıcı olarak tanıyorum ve bu rol deneyimimle örtüşüyor. 3 yıl içinde alanımda uzmanlaşıp küçük bir ekibe mentorluk yapmayı hedefliyorum.',
  ),
];

type UnitSpec = [title: string, level: Level, questions: Question[]];

/** Texts of the shared behavioural questions, so the quiz can treat them specially. */
export const sharedBehaviouralTexts = new Set<string>();
const registerShared = (qs: Question[]) => qs.forEach((x) => sharedBehaviouralTexts.add(x.text));
registerShared(BEHAVIOURAL);

/**
 * Builds a track. By default one shared behavioural question is appended to
 * each unit; pass `behavioural: null` to skip it (e.g. for tracks that are all
 * behavioural) or a different set (e.g. English).
 */
export function track(
  id: string,
  name: string,
  icon: string,
  tagline: string,
  units: UnitSpec[],
  opts: { behavioural?: Question[] | null; lang?: 'tr' | 'en' } = {},
): Track {
  const extra = opts.behavioural === undefined ? BEHAVIOURAL : opts.behavioural;
  if (extra) registerShared(extra);
  return {
    id,
    name,
    icon,
    tagline,
    lang: opts.lang ?? 'tr',
    units: units.map(([title, level, qs], i) => {
      const unitId = `${id}-${i + 1}`;
      const all = extra ? [...qs, extra[i % extra.length]] : qs;
      return { id: unitId, title, level, questions: all.map((x, j) => ({ ...x, id: `${unitId}-${j}` })) };
    }),
  };
}
