import { findInterviewer } from '@/data/interviewers';
import { findUnit } from '@/data/professions';
import { setLang } from '@/lib/i18n';
import { followUpFor, probeKind, reactionTo } from '@/lib/reactions';

jest.mock('@react-native-async-storage/async-storage', () =>
  // jest.mock factories run before imports, so the mock has to be required here.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const COMPLETE =
  'REST, kaynakları URL ile tanımlayan durumsuz (stateless) bir mimaridir. HTTP metodlarıyla çalışır. ' +
  'GET veri okur ve idempotenttir; POST yeni kaynak oluşturur, tekrar gönderilirse yeni kayıt oluşabilir.';

describe('interviewer reactions', () => {
  beforeAll(() => setLang('tr'));
  const q = () => findUnit('backend-1')!.unit.questions[0];
  const elif = findInterviewer('ik');

  it('praises a complete answer and names a point it covered', () => {
    const lines = reactionTo(elif, q(), COMPLETE, 'tr', 0);
    expect(elif.ackGood.tr).toContain(lines[0]);
    expect(lines[1]).toMatch(/^Özellikle şu kısım çok iyiydi: .+\.$/);
  });

  it('reacts to a weak answer with a weak line', () => {
    const lines = reactionTo(elif, q(), 'Bilmiyorum açıkçası.', 'tr', 0);
    expect(lines).toHaveLength(1);
    expect(elif.ackWeak.tr).toContain(lines[0]);
  });

  it('asks about a missed key point', () => {
    const probe = followUpFor(elif, q(), 'GET okur POST yazar, ikisi de istek gönderir.', 'tr');
    expect(probe).toMatch(/^Peki şu konuya da değinir misin: .+\?$/);
    expect(probe).not.toContain('{x}');
  });

  it('does not follow up on a complete answer', () => {
    expect(followUpFor(findInterviewer('yonetici'), q(), COMPLETE, 'tr')).toBeNull();
  });
});

describe('interviewer reactions in English', () => {
  beforeAll(() => setLang('en'));
  afterAll(() => setLang('tr'));

  it('matches English stems that drop a final e (cache -> caching)', () => {
    const q = findUnit('backend-1')!.unit.questions[1];
    const answer =
      'First I look at the execution plan with EXPLAIN. If it does a full table scan, I add an index. ' +
      'I also fix N+1 queries and add caching for hot reads, which took the query from 2 seconds to 80 ms.';
    const lines = reactionTo(findInterviewer('uzman'), q, answer, 'en', 0);
    expect(findInterviewer('uzman').ackGood.en).toContain(lines[0]);
    expect(lines[1]).toMatch(/^It was important that you mentioned this: .+\.$/);
  });
});

describe('follow-up questions', () => {
  beforeAll(() => setLang('tr'));
  const rest = () => findUnit('backend-1')!.unit.questions[0];
  const behavioural = () => findUnit('backend-1')!.unit.questions.find((x) => x.kind === 'davranissal')!;
  // Covers the key points of the REST question in few words, with no example or number.
  const SHORT_COMPLETE = 'REST durumsuz, HTTP kaynaklarıyla çalışır; GET okur, POST oluşturur, GET idempotenttir.';

  it('Elif asks for an example only when there is none', () => {
    expect(probeKind('ik', rest(), SHORT_COMPLETE, 'tr')).toBe('own');
    expect(probeKind('ik', rest(), `${SHORT_COMPLETE} Örneğin sipariş listesi GET ile gelir.`, 'tr')).toBe('expand');
  });

  it('Elif does not follow up on a full, concrete answer', () => {
    expect(probeKind('ik', rest(), COMPLETE + ' Örneğin bir projede 3 servisi böyle tasarladık.', 'tr')).toBeNull();
  });

  it('Kerem asks why only when there is no reasoning', () => {
    expect(probeKind('uzman', rest(), COMPLETE, 'tr')).toBe('own');
    expect(probeKind('uzman', rest(), `${COMPLETE} Bunu tercih ederim çünkü önbelleklemeyi kolaylaştırır.`, 'tr')).toBeNull();
  });

  it('Murat asks for a summary when it runs long', () => {
    expect(probeKind('yonetici', rest(), `${COMPLETE} `.repeat(4), 'tr')).toBe('own');
  });

  it('asks how a behavioural story ended when it never says', () => {
    const story =
      'Bir projede ekip arkadaşımla kapsam konusunda anlaşamadık. Onu dinledim, bakış açısını anlamaya çalıştım ' +
      've bir toplantı önerdim; iki seçeneği birlikte konuştuk ve maliyetlerini masaya koyduk.';
    expect(probeKind('ik', behavioural(), story, 'tr')).toBe('result');
    expect(probeKind('ik', behavioural(), `${story} Sonuç olarak anlaştık ve işi zamanında teslim ettik.`, 'tr')).toBeNull();
  });

  it('never leaves the {x} placeholder in a question', () => {
    for (const id of ['ik', 'uzman', 'yonetici'] as const) {
      const text = followUpFor(findInterviewer(id), rest(), 'Bilmiyorum, iki uygulama konuşur.', 'tr');
      expect(text).toBeTruthy();
      expect(text).not.toContain('{x}');
    }
  });
});
