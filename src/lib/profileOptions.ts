import type { IconName } from '@/components/ui';
import { pick, tt, type Bi } from './i18n';
import type { CareerStage, UserProfile } from './store';

export const STAGES: { id: CareerStage; label: Bi; desc: Bi; icon: IconName }[] = [
  { id: 'ogrenci', label: { tr: 'Öğrenci', en: 'Student' }, desc: { tr: 'Staj veya ilk iş için hazırlanıyorum', en: 'Preparing for an internship or first job' }, icon: 'school' },
  { id: 'yeni-mezun', label: { tr: 'Yeni mezun', en: 'New graduate' }, desc: { tr: 'İlk tam zamanlı işimi arıyorum', en: 'Looking for my first full-time job' }, icon: 'ribbon' },
  { id: 'junior', label: { tr: 'Junior', en: 'Junior' }, desc: { tr: '0–2 yıl deneyim', en: '0–2 years of experience' }, icon: 'leaf' },
  { id: 'mid', label: { tr: 'Mid', en: 'Mid' }, desc: { tr: '2–5 yıl deneyim', en: '2–5 years of experience' }, icon: 'trending-up' },
  { id: 'senior', label: { tr: 'Senior', en: 'Senior' }, desc: { tr: '5+ yıl deneyim, liderlik', en: '5+ years of experience, leadership' }, icon: 'diamond' },
];

export const GOALS: { id: UserProfile['dailyGoal']; label: Bi; desc: Bi; icon: IconName }[] = [
  { id: 1, label: { tr: 'Rahat', en: 'Relaxed' }, desc: { tr: 'Günde 1 pratik · ~5 dk', en: '1 practice a day · ~5 min' }, icon: 'cafe' },
  { id: 2, label: { tr: 'Düzenli', en: 'Steady' }, desc: { tr: 'Günde 2 pratik · ~15 dk', en: '2 practices a day · ~15 min' }, icon: 'walk' },
  { id: 3, label: { tr: 'Yoğun', en: 'Intense' }, desc: { tr: 'Günde 3 pratik · ~25 dk', en: '3 practices a day · ~25 min' }, icon: 'rocket' },
];

export const stageLabel = (id: CareerStage) => {
  const s = STAGES.find((x) => x.id === id);
  return s ? pick(s.label) : id;
};
export const goalLabel = (n: UserProfile['dailyGoal']) => tt(`Günde ${n} pratik`, `${n} practice${n > 1 ? 's' : ''} a day`);
