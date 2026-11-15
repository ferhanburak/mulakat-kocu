import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useSyncExternalStore } from 'react';

/**
 * App language (interface and question content). Kept per device, outside the
 * synced progress, and readable from plain modules (catalog, evaluator) as well
 * as from components through `useLang` / `useT`.
 */
export type Lang = 'tr' | 'en';
export type Bi<T = string> = { tr: T; en: T };

const KEY = 'mulakat-kocu/lang';

function detect(): Lang {
  try {
    return Intl.DateTimeFormat().resolvedOptions().locale.toLowerCase().startsWith('tr') ? 'tr' : 'en';
  } catch {
    return 'tr';
  }
}

let current: Lang = detect();
const listeners = new Set<() => void>();
const changeHooks: ((lang: Lang) => void)[] = [];

function emit() {
  changeHooks.forEach((f) => f(current));
  listeners.forEach((f) => f());
}

export const getLang = () => current;

export function setLang(lang: Lang) {
  if (lang === current) return;
  current = lang;
  AsyncStorage.setItem(KEY, lang).catch(() => {});
  emit();
}

/** Restores the saved choice; call once before the first render that shows text. */
export async function loadLang() {
  try {
    const saved = await AsyncStorage.getItem(KEY);
    if ((saved === 'tr' || saved === 'en') && saved !== current) {
      current = saved;
      emit();
    }
  } catch {}
}

/** Lets data modules (e.g. the catalog) switch content before components re-render. */
export function onLangChange(f: (lang: Lang) => void) {
  changeHooks.push(f);
  f(current);
}

const subscribe = (f: () => void) => {
  listeners.add(f);
  return () => listeners.delete(f);
};

export function useLang(): Lang {
  return useSyncExternalStore(subscribe, getLang, getLang);
}

/** `t('Türkçe', 'English')` picks the text for the current language. */
export function useT() {
  const lang = useLang();
  return useCallback((tr: string, en: string) => (lang === 'en' ? en : tr), [lang]);
}

/** Same as `useT` for code outside components. */
export const tt = (tr: string, en: string) => (current === 'en' ? en : tr);
export const pick = <T>(v: Bi<T>, lang: Lang = current): T => v[lang];
export const locale = (lang: Lang = current) => (lang === 'en' ? 'en-US' : 'tr-TR');
export const upper = (s: string, lang: Lang = current) => s.toLocaleUpperCase(locale(lang));
