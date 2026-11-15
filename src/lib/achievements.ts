import { professions } from '@/data/professions';
import { PASS_SCORE } from './evaluator';
import type { Bi } from './i18n';

export type Stats = {
  interviews: number;
  quizzes: number;
  perfectQuizzes: number;
  bestInterview: number;
  maxStreak: number;
  professions: string[];
  tracks: string[];
  earlyBird: boolean;
  nightOwl: boolean;
  /** Daily questions answered. */
  dailies: number;
  /** Mistake-notebook entries cleared by answering correctly. */
  resolved: number;
};

export const EMPTY_STATS: Stats = {
  interviews: 0,
  quizzes: 0,
  perfectQuizzes: 0,
  bestInterview: 0,
  maxStreak: 0,
  professions: [],
  tracks: [],
  earlyBird: false,
  nightOwl: false,
  dailies: 0,
  resolved: 0,
};

type Snapshot = { stats: Stats; xp: number; bestByUnit: Record<string, number> };

export type Achievement = {
  id: string;
  title: Bi;
  desc: Bi;
  icon: string;
  color: string;
  /** [current, target] so locked badges can show progress. */
  progress: (s: Snapshot) => [number, number];
};

const bestTrackCompletion = (best: Record<string, number>) => {
  let top = 0;
  for (const p of professions)
    for (const t of p.tracks) {
      const done = t.units.filter((u) => (best[u.id] ?? 0) >= PASS_SCORE).length;
      top = Math.max(top, done / t.units.length);
    }
  return top;
};

const STREAK = '#FF7A1A';
const XP = '#5B4BDB';
const GREEN = '#1FB57A';
const GOLD = '#E0A100';
const PINK = '#D9468C';
const BLUE = '#2F7FE0';

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ilk-adim', title: { tr: 'İlk Adım', en: 'First Step' }, desc: { tr: 'İlk pratiğini tamamla', en: 'Finish your first practice' }, icon: 'footsteps', color: GREEN, progress: ({ stats }) => [stats.interviews + stats.quizzes, 1] },
  { id: 'ilk-mulakat', title: { tr: 'Sahneye Çıktın', en: 'On Stage' }, desc: { tr: 'İlk mülakat simülasyonunu bitir', en: 'Finish your first interview simulation' }, icon: 'mic', color: XP, progress: ({ stats }) => [stats.interviews, 1] },
  { id: 'ilk-pratik', title: { tr: 'Isınma Turu', en: 'Warm-Up' }, desc: { tr: 'İlk hızlı pratiğini bitir', en: 'Finish your first quick practice' }, icon: 'flash', color: GOLD, progress: ({ stats }) => [stats.quizzes, 1] },
  { id: 'seri-3', title: { tr: 'Kıvılcım', en: 'Spark' }, desc: { tr: '3 günlük seri yap', en: 'Reach a 3-day streak' }, icon: 'flame', color: STREAK, progress: ({ stats }) => [stats.maxStreak, 3] },
  { id: 'seri-7', title: { tr: 'Alev Alev', en: 'On Fire' }, desc: { tr: '7 günlük seri yap', en: 'Reach a 7-day streak' }, icon: 'flame', color: STREAK, progress: ({ stats }) => [stats.maxStreak, 7] },
  { id: 'seri-30', title: { tr: 'Söndürülemez', en: 'Unstoppable' }, desc: { tr: '30 günlük seri yap', en: 'Reach a 30-day streak' }, icon: 'bonfire', color: '#E0451A', progress: ({ stats }) => [stats.maxStreak, 30] },
  { id: 'kusursuz', title: { tr: 'Kusursuz', en: 'Flawless' }, desc: { tr: 'Bir hızlı pratikte tüm soruları bil', en: 'Get every question right in a quick practice' }, icon: 'sparkles', color: GOLD, progress: ({ stats }) => [stats.perfectQuizzes, 1] },
  { id: 'yuksek-puan', title: { tr: 'İşe Alındın!', en: 'You\'re Hired!' }, desc: { tr: 'Bir mülakattan 85+ puan al', en: 'Score 85+ in an interview' }, icon: 'ribbon', color: GREEN, progress: ({ stats }) => [stats.bestInterview, 85] },
  { id: 'mulakat-5', title: { tr: 'Mülakat Kurdu', en: 'Interview Buff' }, desc: { tr: '5 mülakat simülasyonu bitir', en: 'Finish 5 interview simulations' }, icon: 'chatbubbles', color: XP, progress: ({ stats }) => [stats.interviews, 5] },
  { id: 'mulakat-20', title: { tr: 'Mülakat Ustası', en: 'Interview Master' }, desc: { tr: '20 mülakat simülasyonu bitir', en: 'Finish 20 interview simulations' }, icon: 'medal', color: XP, progress: ({ stats }) => [stats.interviews, 20] },
  { id: 'pratik-10', title: { tr: 'Pratik Makinesi', en: 'Practice Machine' }, desc: { tr: '10 hızlı pratik bitir', en: 'Finish 10 quick practices' }, icon: 'rocket', color: GOLD, progress: ({ stats }) => [stats.quizzes, 10] },
  { id: 'xp-100', title: { tr: 'Yüzlük', en: 'Century' }, desc: { tr: '100 XP topla', en: 'Earn 100 XP' }, icon: 'star', color: XP, progress: ({ xp }) => [xp, 100] },
  { id: 'xp-500', title: { tr: 'Yükselen Yıldız', en: 'Rising Star' }, desc: { tr: '500 XP topla', en: 'Earn 500 XP' }, icon: 'star-half', color: XP, progress: ({ xp }) => [xp, 500] },
  { id: 'xp-1000', title: { tr: 'Efsane', en: 'Legend' }, desc: { tr: '1000 XP topla', en: 'Earn 1000 XP' }, icon: 'trophy', color: GOLD, progress: ({ xp }) => [xp, 1000] },
  { id: 'kasif', title: { tr: 'Kâşif', en: 'Explorer' }, desc: { tr: '3 farklı meslekte pratik yap', en: 'Practise in 3 different professions' }, icon: 'compass', color: BLUE, progress: ({ stats }) => [stats.professions.length, 3] },
  { id: 'cok-yonlu', title: { tr: 'Çok Yönlü', en: 'Versatile' }, desc: { tr: '5 farklı alanda pratik yap', en: 'Practise in 5 different fields' }, icon: 'git-branch', color: BLUE, progress: ({ stats }) => [stats.tracks.length, 5] },
  { id: 'uzman', title: { tr: 'Alan Uzmanı', en: 'Field Expert' }, desc: { tr: 'Bir alanın tüm ünitelerini geç', en: 'Pass every unit in a field' }, icon: 'school', color: GREEN, progress: ({ bestByUnit }) => [Math.round(bestTrackCompletion(bestByUnit) * 100), 100] },
  { id: 'erken-kus', title: { tr: 'Erkenci Kuş', en: 'Early Bird' }, desc: { tr: 'Saat 09:00’dan önce pratik yap', en: 'Practise before 9:00' }, icon: 'sunny', color: GOLD, progress: ({ stats }) => [stats.earlyBird ? 1 : 0, 1] },
  { id: 'gece-kusu', title: { tr: 'Gece Kuşu', en: 'Night Owl' }, desc: { tr: 'Saat 22:00’den sonra pratik yap', en: 'Practise after 22:00' }, icon: 'moon', color: PINK, progress: ({ stats }) => [stats.nightOwl ? 1 : 0, 1] },
  { id: 'gunun-yildizi', title: { tr: 'Günün Yıldızı', en: 'Star of the Day' }, desc: { tr: 'İlk günlük soruyu cevapla', en: 'Answer your first daily question' }, icon: 'today', color: GOLD, progress: ({ stats }) => [stats.dailies, 1] },
  { id: 'disiplin', title: { tr: 'Disiplinli', en: 'Disciplined' }, desc: { tr: '7 günlük soru cevapla', en: 'Answer 7 daily questions' }, icon: 'calendar', color: GOLD, progress: ({ stats }) => [stats.dailies, 7] },
  { id: 'ders-alan', title: { tr: 'Hatasından Ders Alan', en: 'Learns from Mistakes' }, desc: { tr: 'Hata defterinden 5 soruyu temizle', en: 'Clear 5 questions from the mistake notebook' }, icon: 'bandage', color: PINK, progress: ({ stats }) => [stats.resolved, 5] },
];

export const isDone = (a: Achievement, s: Snapshot) => {
  const [cur, target] = a.progress(s);
  return cur >= target;
};
