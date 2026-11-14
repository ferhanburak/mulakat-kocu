import { professions } from '@/data/professions';
import { PASS_SCORE } from './evaluator';

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
  title: string;
  desc: string;
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
  { id: 'ilk-adim', title: 'İlk Adım', desc: 'İlk pratiğini tamamla', icon: 'footsteps', color: GREEN, progress: ({ stats }) => [stats.interviews + stats.quizzes, 1] },
  { id: 'ilk-mulakat', title: 'Sahneye Çıktın', desc: 'İlk mülakat simülasyonunu bitir', icon: 'mic', color: XP, progress: ({ stats }) => [stats.interviews, 1] },
  { id: 'ilk-pratik', title: 'Isınma Turu', desc: 'İlk hızlı pratiğini bitir', icon: 'flash', color: GOLD, progress: ({ stats }) => [stats.quizzes, 1] },
  { id: 'seri-3', title: 'Kıvılcım', desc: '3 günlük seri yap', icon: 'flame', color: STREAK, progress: ({ stats }) => [stats.maxStreak, 3] },
  { id: 'seri-7', title: 'Alev Alev', desc: '7 günlük seri yap', icon: 'flame', color: STREAK, progress: ({ stats }) => [stats.maxStreak, 7] },
  { id: 'seri-30', title: 'Söndürülemez', desc: '30 günlük seri yap', icon: 'bonfire', color: '#E0451A', progress: ({ stats }) => [stats.maxStreak, 30] },
  { id: 'kusursuz', title: 'Kusursuz', desc: 'Bir hızlı pratikte tüm soruları bil', icon: 'sparkles', color: GOLD, progress: ({ stats }) => [stats.perfectQuizzes, 1] },
  { id: 'yuksek-puan', title: 'İşe Alındın!', desc: 'Bir mülakattan 85+ puan al', icon: 'ribbon', color: GREEN, progress: ({ stats }) => [stats.bestInterview, 85] },
  { id: 'mulakat-5', title: 'Mülakat Kurdu', desc: '5 mülakat simülasyonu bitir', icon: 'chatbubbles', color: XP, progress: ({ stats }) => [stats.interviews, 5] },
  { id: 'mulakat-20', title: 'Mülakat Ustası', desc: '20 mülakat simülasyonu bitir', icon: 'medal', color: XP, progress: ({ stats }) => [stats.interviews, 20] },
  { id: 'pratik-10', title: 'Pratik Makinesi', desc: '10 hızlı pratik bitir', icon: 'rocket', color: GOLD, progress: ({ stats }) => [stats.quizzes, 10] },
  { id: 'xp-100', title: 'Yüzlük', desc: '100 XP topla', icon: 'star', color: XP, progress: ({ xp }) => [xp, 100] },
  { id: 'xp-500', title: 'Yükselen Yıldız', desc: '500 XP topla', icon: 'star-half', color: XP, progress: ({ xp }) => [xp, 500] },
  { id: 'xp-1000', title: 'Efsane', desc: '1000 XP topla', icon: 'trophy', color: GOLD, progress: ({ xp }) => [xp, 1000] },
  { id: 'kasif', title: 'Kâşif', desc: '3 farklı meslekte pratik yap', icon: 'compass', color: BLUE, progress: ({ stats }) => [stats.professions.length, 3] },
  { id: 'cok-yonlu', title: 'Çok Yönlü', desc: '5 farklı alanda pratik yap', icon: 'git-branch', color: BLUE, progress: ({ stats }) => [stats.tracks.length, 5] },
  { id: 'uzman', title: 'Alan Uzmanı', desc: 'Bir alanın tüm ünitelerini geç', icon: 'school', color: GREEN, progress: ({ bestByUnit }) => [Math.round(bestTrackCompletion(bestByUnit) * 100), 100] },
  { id: 'erken-kus', title: 'Erkenci Kuş', desc: 'Saat 09:00’dan önce pratik yap', icon: 'sunny', color: GOLD, progress: ({ stats }) => [stats.earlyBird ? 1 : 0, 1] },
  { id: 'gece-kusu', title: 'Gece Kuşu', desc: 'Saat 22:00’den sonra pratik yap', icon: 'moon', color: PINK, progress: ({ stats }) => [stats.nightOwl ? 1 : 0, 1] },
  { id: 'gunun-yildizi', title: 'Günün Yıldızı', desc: 'İlk günlük soruyu cevapla', icon: 'today', color: GOLD, progress: ({ stats }) => [stats.dailies, 1] },
  { id: 'disiplin', title: 'Disiplinli', desc: '7 günlük soru cevapla', icon: 'calendar', color: GOLD, progress: ({ stats }) => [stats.dailies, 7] },
  { id: 'ders-alan', title: 'Hatasından Ders Alan', desc: 'Hata defterinden 5 soruyu temizle', icon: 'bandage', color: PINK, progress: ({ stats }) => [stats.resolved, 5] },
];

export const isDone = (a: Achievement, s: Snapshot) => {
  const [cur, target] = a.progress(s);
  return cur >= target;
};
