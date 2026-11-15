import { finans, ik, pazarlama, satis, urun, veri } from './catalog/diger';
import { genel } from './catalog/genel';
import { bankacilik, havacilik } from './catalog/hizmet';
import { egitim, saglik } from './catalog/kamu';
import { elektrik, endustri, insaat, makine } from './catalog/muhendislik';
import { hukuk, psikoloji } from './catalog/sosyal';
import { yazilim } from './catalog/yazilim';
import { onLangChange, type Lang } from '@/lib/i18n';
import { sharedBehaviouralTexts, type Profession, type Question, type Track, type Unit } from './build';
import { localizeCatalog } from './en';

export type { Level, Profession, Question, QuestionKind, Track, Unit } from './build';

const TR_CATALOG: Profession[] = [
  genel,
  yazilim,
  veri,
  urun,
  endustri,
  elektrik,
  makine,
  insaat,
  pazarlama,
  satis,
  bankacilik,
  finans,
  ik,
  havacilik,
  egitim,
  saglik,
  psikoloji,
  hukuk,
];

const catalogs: Partial<Record<Lang, Profession[]>> = { tr: TR_CATALOG };
const catalogFor = (lang: Lang) => (catalogs[lang] ??= localizeCatalog(TR_CATALOG));

/**
 * The catalogue in the current app language. Same ids in every language, so saved
 * progress keeps working when the language changes. Swapped in place on change.
 */
export const professions: Profession[] = [...TR_CATALOG];

export const findProfession = (id: string) => professions.find((p) => p.id === id);

export function findTrack(trackId: string): { profession: Profession; track: Track } | undefined {
  for (const profession of professions) {
    const track = profession.tracks.find((t) => t.id === trackId);
    if (track) return { profession, track };
  }
  return undefined;
}

export function findUnit(unitId: string): { profession: Profession; track: Track; unit: Unit } | undefined {
  for (const profession of professions) {
    for (const track of profession.tracks) {
      const unit = track.units.find((u) => u.id === unitId);
      if (unit) return { profession, track, unit };
    }
  }
  return undefined;
}

export const allUnits = (p: Profession) => p.tracks.flatMap((t) => t.units);

export type QuestionRef = { profession: Profession; track: Track; unit: Unit; question: Question };

const questionIndex = new Map<string, QuestionRef>();
/** Pool for the daily question: every profession-specific question, skipping the behavioural ones that repeat across units. */
let dailyPool: QuestionRef[] = [];

function rebuildIndex() {
  questionIndex.clear();
  for (const profession of professions)
    for (const track of profession.tracks)
      for (const unit of track.units)
        for (const question of unit.questions) questionIndex.set(question.id, { profession, track, unit, question });
  dailyPool = [...questionIndex.values()].filter((r) => !sharedBehaviouralTexts.has(r.question.text));
}

onLangChange((lang) => {
  professions.splice(0, professions.length, ...catalogFor(lang));
  rebuildIndex();
});

export const findQuestion = (questionId: string) => questionIndex.get(questionId);

/** Same question for everyone on a given day (FNV-1a hash of the date key). */
export function dailyQuestion(day: string): QuestionRef {
  let h = 2166136261;
  for (let i = 0; i < day.length; i++) h = Math.imul(h ^ day.charCodeAt(i), 16777619);
  return dailyPool[(h >>> 0) % dailyPool.length];
}
