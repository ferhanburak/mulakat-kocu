import { q, sharedBehaviouralTexts, type Profession, type Question } from '../build';
import danismanlik from './danismanlik.json';
import diger from './diger.json';
import genel from './genel.json';
import hizmet from './hizmet.json';
import kamu from './kamu.json';
import meta from './meta.json';
import muhendislik from './muhendislik.json';
import sosyal from './sosyal.json';
import ticaret from './ticaret.json';
import yazilim from './yazilim.json';

/**
 * English version of the catalogue. Translations are keyed by unit id
 * (`<trackId>-<n>`) and list that unit's own questions in order; the shared
 * behavioural question appended to most units comes from `genel._shared`.
 */
type RawQ = [text: string, concepts: string[], ideal: string];
type UnitTr = { title?: string; q: RawQ[] };

const UNITS: Record<string, UnitTr> = { ...yazilim, ...genel, ...diger, ...hizmet, ...kamu, ...muhendislik, ...sosyal, ...danismanlik, ...ticaret } as unknown as Record<
  string,
  UnitTr
>;
const META = meta as unknown as { professions: Record<string, [string, string]>; tracks: Record<string, [string, string]> };

/** Tracks that are already English stay as they are in Turkish mode and are hidden in English mode. */
const HIDDEN_IN_EN = new Set(['ingilizce']);

const SHARED_TR = new Map<string, RawQ>();

function sharedFor(text: string): RawQ | undefined {
  if (SHARED_TR.size === 0) {
    // Turkish shared behavioural questions, in the order of build.ts BEHAVIOURAL.
    const shared = (genel as unknown as { _shared: UnitTr })._shared.q;
    [...sharedBehaviouralTexts].slice(0, shared.length).forEach((tr, i) => SHARED_TR.set(tr, shared[i]));
  }
  return SHARED_TR.get(text);
}

function translate(src: Question, raw: RawQ | undefined): Question {
  if (!raw) return src;
  const [text, concepts, ideal] = raw;
  const built = q(src.kind, text, concepts, ideal);
  return { ...built, id: src.id };
}

export function localizeCatalog(tr: Profession[]): Profession[] {
  return tr.map((p) => {
    const [name, tagline] = META.professions[p.id] ?? [p.name, p.tagline];
    return {
      ...p,
      name,
      tagline,
      tracks: p.tracks
        .filter((t) => !HIDDEN_IN_EN.has(t.id))
        .map((t) => {
          const [tName, tTagline] = META.tracks[t.id] ?? [t.name, t.tagline];
          return {
            ...t,
            name: tName,
            tagline: tTagline,
            lang: 'en' as const,
            units: t.units.map((u) => {
              const tr = UNITS[u.id];
              return {
                ...u,
                title: tr?.title ?? u.title,
                questions: u.questions.map((question, i) => {
                  const own = tr?.q[i];
                  const shared = own ? undefined : sharedFor(question.text);
                  const out = translate(question, own ?? shared);
                  if (shared) sharedBehaviouralTexts.add(out.text);
                  return out;
                }),
              };
            }),
          };
        }),
    };
  });
}
