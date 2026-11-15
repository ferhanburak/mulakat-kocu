import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { findUnit } from '@/data/professions';
import { ACHIEVEMENTS, EMPTY_STATS, isDone, type Stats } from './achievements';
import { PASS_SCORE, type AnswerFeedback, type Report } from './evaluator';
import type { Account } from './auth';
import { cancelReminders, scheduleReminders } from './reminders';

type Progress = {
  xp: number;
  streak: number;
  lastDay: string | null;
  /** Best open-ended interview score per unit (drives unlocking). */
  bestByUnit: Record<string, number>;
  /** Best quick-practice result per unit, as a percentage. */
  bestQuizByUnit: Record<string, number>;
  /** Completed activities (interviews + quizzes) per day key. */
  days: Record<string, number>;
  reports: Report[];
  stats: Stats;
  /** Achievement id -> ISO date it was unlocked. */
  unlocked: Record<string, string>;
  reminder: { enabled: boolean; hour: number };
  /** Mistake notebook: question id -> how often it was missed and which concepts. */
  mistakes: Record<string, Mistake>;
  /** Today's (or the latest) daily question result, kept to show it again. */
  daily: DailyResult | null;
  /** Interviewer reads questions aloud. */
  voice: boolean;
  /** Who is using the app: a signed-in account, a guest trial, or nobody yet (welcome screen). */
  session: Session;
  /** What the user is preparing for; drives the personalised home. */
  profile: UserProfile | null;
};

export type Session = { mode: 'user'; account: Account } | { mode: 'guest'; since: string } | null;
export type CareerStage = 'ogrenci' | 'yeni-mezun' | 'junior' | 'mid' | 'senior';
export type UserProfile = { professionId: string; trackId: string; stage: CareerStage; dailyGoal: 1 | 2 | 3 };

export type Mistake = { misses: number; concepts: string[]; at: string };
export type DailyResult = { day: string; questionId: string; feedback: AnswerFeedback; overall: number; xp: number };

/** Score at/above which an answered question counts as fixed in the notebook. */
const FIX_SCORE = 70;
/** Score below which an interview answer is written into the notebook. */
const MISS_SCORE = 60;

function noteMiss(m: Record<string, Mistake>, questionId: string, concepts: string[]): Record<string, Mistake> {
  const prev = m[questionId];
  return {
    ...m,
    [questionId]: {
      misses: (prev?.misses ?? 0) + 1,
      concepts: [...new Set([...(prev?.concepts ?? []), ...concepts])],
      at: new Date().toISOString(),
    },
  };
}

/** A correct answer takes one miss off; returns whether the entry was cleared. */
function noteHit(m: Record<string, Mistake>, questionId: string): [Record<string, Mistake>, boolean] {
  const prev = m[questionId];
  if (!prev) return [m, false];
  const { [questionId]: _, ...rest } = m;
  if (prev.misses <= 1) return [rest, true];
  return [{ ...m, [questionId]: { ...prev, misses: prev.misses - 1 } }, false];
}

/** Apply open-ended answer feedback (interview or daily) to the notebook. */
function applyAnswers(s: Progress, answers: AnswerFeedback[]): Progress {
  let mistakes = s.mistakes;
  let resolved = 0;
  for (const a of answers) {
    if (a.score < MISS_SCORE) mistakes = noteMiss(mistakes, a.questionId, a.missing);
    else if (a.score >= FIX_SCORE) {
      const [next, cleared] = noteHit(mistakes, a.questionId);
      mistakes = next;
      if (cleared) resolved++;
    }
  }
  return { ...s, mistakes, stats: { ...s.stats, resolved: s.stats.resolved + resolved } };
}

export type Toast = { key: string; title: string; desc: string; icon: string; color: string; label: string };

const EMPTY: Progress = {
  xp: 0,
  streak: 0,
  lastDay: null,
  bestByUnit: {},
  bestQuizByUnit: {},
  days: {},
  reports: [],
  stats: EMPTY_STATS,
  unlocked: {},
  reminder: { enabled: false, hour: 20 },
  mistakes: {},
  daily: null,
  voice: true,
  session: null,
  profile: null,
};
const KEY = 'mulakat-kocu/progress/v2';

export const dayKey = (d: Date) => `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
export const levelOf = (xp: number) => Math.floor(xp / 100) + 1;
export const quizXp = (correct: number) => 5 + correct * 3;

const addUnique = (arr: string[], v: string | undefined) => (v && !arr.includes(v) ? [...arr, v] : arr);

/** Shared bookkeeping for any finished activity: XP, streak, day log and stats. */
function logActivity(s: Progress, xp: number, unitId?: string): Progress {
  const now = new Date();
  const today = dayKey(now);
  const yesterday = dayKey(new Date(Date.now() - 86_400_000));
  const streak = s.lastDay === today ? s.streak : s.lastDay === yesterday ? s.streak + 1 : 1;
  const f = unitId ? findUnit(unitId) : undefined;
  const h = now.getHours();
  return {
    ...s,
    xp: s.xp + xp,
    streak,
    lastDay: today,
    days: { ...s.days, [today]: (s.days[today] ?? 0) + 1 },
    stats: {
      ...s.stats,
      maxStreak: Math.max(s.stats.maxStreak, streak),
      professions: addUnique(s.stats.professions, f?.profession.id),
      tracks: addUnique(s.stats.tracks, f?.track.id),
      earlyBird: s.stats.earlyBird || h < 9,
      nightOwl: s.stats.nightOwl || h >= 22,
    },
  };
}

type Ctx = Progress & {
  ready: boolean;
  toast: Toast | undefined;
  dismissToast: () => void;
  addReport: (r: Report) => void;
  addQuizResult: (unitId: string, correct: number, total: number) => void;
  addDailyResult: (d: Omit<DailyResult, 'day'>, unitId: string) => void;
  recordQuizAnswer: (questionId: string, ok: boolean) => void;
  addReviewResult: (correct: number) => void;
  setReminder: (r: Partial<Progress['reminder']>) => void;
  setVoice: (on: boolean) => void;
  startGuest: () => void;
  signedIn: (account: Account) => void;
  signOut: () => void;
  saveProfile: (p: UserProfile) => void;
  renameAccount: (name: string) => void;
  getReport: (id: string) => Report | undefined;
  isUnlocked: (unitIds: string[], index: number) => boolean;
  reset: () => void;
};

const StoreContext = createContext<Ctx | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<Progress>(EMPTY);
  const [ready, setReady] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const level = useRef<number | null>(null);

  useEffect(() => {
    AsyncStorage.getItem(KEY)
      .then((raw) => {
        if (!raw) return;
        const saved = JSON.parse(raw);
        setState({ ...EMPTY, ...saved, stats: { ...EMPTY_STATS, ...saved.stats }, reminder: { ...EMPTY.reminder, ...saved.reminder } });
      })
      .catch(() => {})
      .finally(() => setReady(true));
  }, []);

  useEffect(() => {
    if (ready) AsyncStorage.setItem(KEY, JSON.stringify(state)).catch(() => {});
  }, [state, ready]);

  // Unlock achievements and announce level-ups whenever progress changes.
  useEffect(() => {
    if (!ready) return;
    const snap = { stats: state.stats, xp: state.xp, bestByUnit: state.bestByUnit };
    const fresh = ACHIEVEMENTS.filter((a) => !state.unlocked[a.id] && isDone(a, snap));
    const lvl = levelOf(state.xp);
    const leveledUp = level.current !== null && lvl > level.current;
    level.current = lvl;
    if (fresh.length === 0 && !leveledUp) return;
    const now = new Date().toISOString();
    if (fresh.length) {
      // Unlocks are derived from progress but stored with their date, so they are written back once.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setState((s) => ({ ...s, unlocked: { ...s.unlocked, ...Object.fromEntries(fresh.map((a) => [a.id, now])) } }));
    }
    setToasts((t) => [
      ...t,
      ...(leveledUp
        ? [{ key: `lvl-${lvl}`, label: 'SEVİYE ATLADIN', title: `Seviye ${lvl}!`, desc: 'Böyle devam, bir sonraki seviyeye 100 XP.', icon: 'arrow-up-circle', color: '#5B4BDB' }]
        : []),
      ...fresh.map((a) => ({ key: a.id, label: 'BAŞARIM AÇILDI', title: a.title, desc: a.desc, icon: a.icon, color: a.color })),
    ]);
  }, [ready, state.stats, state.xp, state.bestByUnit, state.unlocked]);

  // Keep the daily reminders in sync with today's activity and settings.
  useEffect(() => {
    if (!ready) return;
    const practicedToday = state.lastDay === dayKey(new Date());
    const task = state.reminder.enabled
      ? scheduleReminders(state.reminder.hour, state.streak, practicedToday)
      : cancelReminders();
    task.catch(() => {});
  }, [ready, state.reminder.enabled, state.reminder.hour, state.lastDay, state.streak]);

  const addReport = useCallback((r: Report) => {
    setState((s) => {
      const next = applyAnswers(logActivity(s, r.xp, r.unitId), r.answers);
      return {
        ...next,
        bestByUnit: { ...s.bestByUnit, [r.unitId]: Math.max(s.bestByUnit[r.unitId] ?? 0, r.overall) },
        reports: [r, ...s.reports].slice(0, 50),
        stats: { ...next.stats, interviews: s.stats.interviews + 1, bestInterview: Math.max(s.stats.bestInterview, r.overall) },
      };
    });
  }, []);

  const addDailyResult = useCallback((d: Omit<DailyResult, 'day'>, unitId: string) => {
    setState((s) => {
      const today = dayKey(new Date());
      if (s.daily?.day === today) return s; // once per day
      const next = applyAnswers(logActivity(s, d.xp, unitId), [d.feedback]);
      return { ...next, daily: { ...d, day: today }, stats: { ...next.stats, dailies: next.stats.dailies + 1 } };
    });
  }, []);

  /** Per-item bookkeeping for quick practice: wrong answers go into the notebook. */
  const recordQuizAnswer = useCallback((questionId: string, ok: boolean) => {
    setState((s) => {
      if (!ok) return { ...s, mistakes: noteMiss(s.mistakes, questionId, []) };
      const [mistakes, cleared] = noteHit(s.mistakes, questionId);
      if (mistakes === s.mistakes) return s;
      return { ...s, mistakes, stats: { ...s.stats, resolved: s.stats.resolved + (cleared ? 1 : 0) } };
    });
  }, []);

  const addReviewResult = useCallback((correct: number) => {
    setState((s) => {
      const next = logActivity(s, quizXp(correct));
      return { ...next, stats: { ...next.stats, quizzes: s.stats.quizzes + 1 } };
    });
  }, []);

  const addQuizResult = useCallback((unitId: string, correct: number, total: number) => {
    setState((s) => {
      const pct = Math.round((correct / Math.max(1, total)) * 100);
      const next = logActivity(s, quizXp(correct), unitId);
      return {
        ...next,
        bestQuizByUnit: { ...s.bestQuizByUnit, [unitId]: Math.max(s.bestQuizByUnit[unitId] ?? 0, pct) },
        stats: { ...next.stats, quizzes: s.stats.quizzes + 1, perfectQuizzes: s.stats.perfectQuizzes + (pct === 100 ? 1 : 0) },
      };
    });
  }, []);

  const setReminder = useCallback((r: Partial<Progress['reminder']>) => {
    setState((s) => ({ ...s, reminder: { ...s.reminder, ...r } }));
  }, []);

  const setVoice = useCallback((on: boolean) => setState((s) => ({ ...s, voice: on })), []);

  // Session and profile. Guest progress is kept when the guest signs up, so nothing is lost.
  const startGuest = useCallback(() => setState((s) => ({ ...s, session: { mode: 'guest', since: new Date().toISOString() } })), []);
  const signedIn = useCallback((account: Account) => setState((s) => ({ ...s, session: { mode: 'user', account } })), []);
  const signOut = useCallback(() => setState((s) => ({ ...s, session: null })), []);
  const saveProfile = useCallback((profile: UserProfile) => setState((s) => ({ ...s, profile })), []);
  const renameAccount = useCallback(
    (name: string) =>
      setState((s) => (s.session?.mode === 'user' ? { ...s, session: { mode: 'user', account: { ...s.session.account, name } } } : s)),
    [],
  );

  const dismissToast = useCallback(() => setToasts((t) => t.slice(1)), []);

  const value = useMemo<Ctx>(
    () => ({
      ...state,
      ready,
      toast: toasts[0],
      dismissToast,
      addReport,
      addQuizResult,
      addDailyResult,
      recordQuizAnswer,
      addReviewResult,
      setReminder,
      setVoice,
      startGuest,
      signedIn,
      signOut,
      saveProfile,
      renameAccount,
      getReport: (id) => state.reports.find((r) => r.id === id),
      isUnlocked: (unitIds, index) => index === 0 || (state.bestByUnit[unitIds[index - 1]] ?? 0) >= PASS_SCORE,
      reset: () => setState(EMPTY),
    }),
    [state, ready, toasts, dismissToast, addReport, addQuizResult, addDailyResult, recordQuizAnswer, addReviewResult, setReminder, setVoice, startGuest, signedIn, signOut, saveProfile, renameAccount],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error('useStore must be used inside StoreProvider');
  return ctx;
}
