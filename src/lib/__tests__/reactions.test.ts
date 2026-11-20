import { findInterviewer } from '@/data/interviewers';
import { findUnit } from '@/data/professions';
import { setLang } from '@/lib/i18n';
import { followUpFor, reactionTo } from '@/lib/reactions';

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
