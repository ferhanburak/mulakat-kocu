import { sharedBehaviouralTexts } from '@/data/build';
import { professions } from '@/data/professions';
import { mentions } from '@/lib/evaluator';
import { setLang } from '@/lib/i18n';

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const tracks = () => professions.flatMap((p) => p.tracks.map((t) => ({ p, t })));

describe.each(['tr', 'en'] as const)('MLK-MOB-005 catalogue (%s)', (lang) => {
  beforeAll(() => setLang(lang));

  it('has unique unit and question ids', () => {
    const units = tracks().flatMap(({ t }) => t.units.map((u) => u.id));
    expect(new Set(units).size).toBe(units.length);
    const qs = tracks().flatMap(({ t }) => t.units.flatMap((u) => u.questions.map((q) => q.id)));
    expect(new Set(qs).size).toBe(qs.length);
  });

  it('gives every track a Senior unit, with levels in order', () => {
    const order = { Junior: 0, Mid: 1, Senior: 2 } as const;
    for (const { t } of tracks()) {
      expect({ track: t.id, senior: t.units.some((u) => u.level === 'Senior') }).toEqual({ track: t.id, senior: true });
      const levels = t.units.map((u) => order[u.level]);
      expect({ track: t.id, levels }).toEqual({ track: t.id, levels: [...levels].sort() });
    }
  });

  it('has model answers that cover their own concepts', () => {
    const gaps: string[] = [];
    for (const { t } of tracks())
      for (const u of t.units)
        for (const q of u.questions) {
          if (sharedBehaviouralTexts.has(q.text)) continue;
          for (const c of q.concepts) if (!mentions(q.ideal, c.stems, t.lang ?? lang)) gaps.push(`${q.id} ${c.label}`);
        }
    if (process.env.CATALOG_GAPS) console.log(gaps.join('\n'));
    expect(gaps).toEqual([]);
  });
});
