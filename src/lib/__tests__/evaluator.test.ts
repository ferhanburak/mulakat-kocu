import { findInterviewer, verdictFor } from '@/data/interviewers';
import { findUnit, professions } from '@/data/professions';
import { evaluateSession } from '@/lib/evaluator';
import { setLang } from '@/lib/i18n';
import { sessionQuestions } from '@/lib/interview';

jest.mock('@react-native-async-storage/async-storage', () =>
  // jest.mock factories run before imports, so the mock has to be required here.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

/** Evaluates a single answer to question `index` of a unit. */
async function score(unitId: string, index: number, answer: string) {
  const found = findUnit(unitId)!;
  const report = await evaluateSession(found.profession.id, unitId, [{ question: found.unit.questions[index], answer }]);
  return { report, fb: report.answers[0] };
}

describe('MLK-MOB-004 Turkish answers', () => {
  beforeAll(() => setLang('tr'));

  it('credits every concept of a complete answer', async () => {
    const { fb } = await score(
      'backend-1',
      0,
      'REST, kaynakları URL ile tanımlayan durumsuz (stateless) bir mimaridir. HTTP metodlarıyla çalışır. ' +
        'GET veri okur ve idempotenttir; POST yeni kaynak oluşturur, tekrar gönderilirse yeni kayıt oluşabilir.',
    );
    expect(fb.missing).toEqual([]);
    expect(fb.score).toBeGreaterThanOrEqual(60);
  });

  it('flags a very short answer', async () => {
    const { fb, report } = await score('backend-1', 0, 'GET okur POST yazar.');
    expect(fb.tip).toMatch(/çok kısa/);
    expect(report.categories.netlik).toBeLessThan(60);
  });

  it('matches Turkish keywords with suffixes', async () => {
    const { fb } = await score('backend-1', 1, 'Önce explain ile ölçerim, sonra eksik indeksleri eklerim ve sık okunan veriyi önbelleğe alırım.');
    expect(fb.covered).toEqual(expect.arrayContaining(['Ölçüm', 'İndeks', 'Önbellek']));
  });
});

describe('MLK-MOB-004 English answers', () => {
  beforeAll(() => setLang('en'));
  afterAll(() => setLang('tr'));

  it('recognises STAR phrases that start with a capital "I"', async () => {
    // Regression: Turkish lowercasing turned "I" into a dotless "ı", so none of these matched.
    const found = findUnit('backend-1')!;
    const behavioural = found.unit.questions.length - 1;
    const { report } = await score(
      'backend-1',
      behavioural,
      'In my last project my teammate and I disagreed about the scope of a feature. My goal was to ship on time. ' +
        'I suggested a short meeting, I listened to his concerns and we compared both options by cost. ' +
        'As a result we agreed on a smaller first version and delivered on time.',
    );
    expect(report.categories.yapi).toBeGreaterThanOrEqual(75);
  });

  it('only matches keywords at the start of a word', async () => {
    const { fb } = await score('backend-1', 0, 'We set a target for the team and reviewed the plan together with the stakeholders every week.');
    expect(fb.covered).not.toContain('GET reads');
  });

  it('counts English filler words', async () => {
    const { report } = await score(
      'backend-1',
      0,
      'Um, so basically REST is like, you know, a stateless style over HTTP where GET reads a resource and POST creates one, ' +
        'and GET is idempotent so repeating it is safe, basically.',
    );
    // um, basically, like, you know, basically
    expect(report.weaknesses.join(' ')).toMatch(/5 filler words/);
  });

  it('writes feedback in English', async () => {
    const { report } = await score('backend-1', 0, 'Short.');
    expect(report.nextFocus).toMatch(/^Next focus:/);
    expect(report.answers[0].tip).toMatch(/too short/);
  });
});

describe('MLK-MOB-005 English catalogue', () => {
  beforeAll(() => setLang('en'));
  afterAll(() => setLang('tr'));

  it('has no Turkish question left untranslated', () => {
    const turkish = /[çğıöşüÇĞİÖŞÜ]/;
    const leftovers = professions.flatMap((p) => p.tracks.flatMap((t) => t.units.flatMap((u) => u.questions)))
      .filter((q) => turkish.test(q.text))
      .map((q) => q.id);
    expect(leftovers).toEqual([]);
  });

  it('keeps the same ids as the Turkish catalogue', () => {
    expect(findUnit('backend-1')?.unit.questions.map((q) => q.id)).toEqual(['backend-1-0', 'backend-1-1', 'backend-1-2']);
  });
});

describe('MLK-MOB-007 interviewer characters', () => {
  beforeAll(() => setLang('tr'));

  it('give each character its own question set', () => {
    const own = findUnit('backend-1')!.unit.questions;
    const ik = sessionQuestions('backend-1', 'ik');
    const uzman = sessionQuestions('backend-1', 'uzman');
    const yonetici = sessionQuestions('backend-1', 'yonetici');
    expect(ik).toHaveLength(own.length + 1); // an extra behavioural question
    expect(uzman.map((q) => q.id)).toContain('backend-2-0'); // deeper question from the next unit
    expect(yonetici.map((q) => q.id)).toContain('backend-3-0'); // from the most senior unit
    expect(uzman.every((q) => q.kind !== 'davranissal')).toBe(true);
  });

  it('pick a verdict by score band', () => {
    const murat = findInterviewer('yonetici');
    expect(verdictFor(murat, 80).tr).toBe(murat.verdict.high.tr);
    expect(verdictFor(murat, 65).tr).toBe(murat.verdict.mid.tr);
    expect(verdictFor(murat, 40).tr).toBe(murat.verdict.low.tr);
  });

  it('put the verdict on the report', async () => {
    const found = findUnit('backend-1')!;
    const report = await evaluateSession(found.profession.id, 'backend-1', [{ question: found.unit.questions[0], answer: 'GET okur.' }], 'yonetici');
    expect(report.interviewerId).toBe('yonetici');
    expect(report.verdict).toBe(findInterviewer('yonetici').verdict.low.tr);
  });
});
