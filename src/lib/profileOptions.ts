import type { IconName } from '@/components/ui';
import type { CareerStage, UserProfile } from './store';

export const STAGES: { id: CareerStage; label: string; desc: string; icon: IconName }[] = [
  { id: 'ogrenci', label: 'Öğrenci', desc: 'Staj veya ilk iş için hazırlanıyorum', icon: 'school' },
  { id: 'yeni-mezun', label: 'Yeni mezun', desc: 'İlk tam zamanlı işimi arıyorum', icon: 'ribbon' },
  { id: 'junior', label: 'Junior', desc: '0–2 yıl deneyim', icon: 'leaf' },
  { id: 'mid', label: 'Mid', desc: '2–5 yıl deneyim', icon: 'trending-up' },
  { id: 'senior', label: 'Senior', desc: '5+ yıl deneyim, liderlik', icon: 'diamond' },
];

export const GOALS: { id: UserProfile['dailyGoal']; label: string; desc: string; icon: IconName }[] = [
  { id: 1, label: 'Rahat', desc: 'Günde 1 pratik · ~5 dk', icon: 'cafe' },
  { id: 2, label: 'Düzenli', desc: 'Günde 2 pratik · ~15 dk', icon: 'walk' },
  { id: 3, label: 'Yoğun', desc: 'Günde 3 pratik · ~25 dk', icon: 'rocket' },
];

export const stageLabel = (id: CareerStage) => STAGES.find((s) => s.id === id)?.label ?? id;
export const goalLabel = (n: UserProfile['dailyGoal']) => `Günde ${n} pratik`;
