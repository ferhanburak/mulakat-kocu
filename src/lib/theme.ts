import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSyncExternalStore } from 'react';
import { Appearance } from 'react-native';

/**
 * Light / dark palettes. `colors` is one object whose values are swapped in place
 * when the theme changes, and `themedStyles` builds a style sheet per theme, so
 * screens keep writing `colors.text` and `styles.card` as before.
 */
const LIGHT = {
  bg: '#F7F6FB',
  card: '#FFFFFF',
  text: '#17152B',
  muted: '#7A7690',
  faint: '#B5B1C8',
  border: '#ECEAF4',
  primary: '#5B4BDB',
  primary2: '#8B5CF6',
  success: '#1FB57A',
  warn: '#F5A524',
  danger: '#EF5A5A',
  streak: '#FF7A1A',
  xp: '#5B4BDB',
  shadow: '#2A1F7A',
  /** Neutral fills: progress tracks, locked nodes, disabled buttons. */
  track: '#ECEAF4',
  trackStrong: '#DAD7E6',
  trackEdge: '#C4C0D4',
  locked: '#B3AFC4',
  /** Soft tinted surfaces and the text that sits on them. */
  tintOrange: '#FFF3E0',
  tintOrangeBorder: '#FFE0B3',
  onOrange: '#8A4B00',
  tintRed: '#FDECEC',
  tintRedBorder: '#F9C4C4',
  onRed: '#B42323',
  tintGreen: '#E6F8F0',
  onGreen: '#0E7A50',
  tintPurple: '#EEEBFF',
  tintPurpleBorder: '#D9D3FF',
};

export type Palette = typeof LIGHT;

const DARK: Palette = {
  bg: '#121120',
  card: '#1E1C30',
  text: '#F1EFFA',
  muted: '#A6A2BE',
  faint: '#6E6A88',
  border: '#2E2B45',
  primary: '#7B6CF0',
  primary2: '#9B6CF8',
  success: '#2BC98A',
  warn: '#F5B23D',
  danger: '#F06B6B',
  streak: '#FF8A33',
  xp: '#8E82F2',
  shadow: '#000000',
  track: '#2E2B45',
  trackStrong: '#3A3654',
  trackEdge: '#2A2740',
  locked: '#5E5A78',
  tintOrange: '#33261A',
  tintOrangeBorder: '#5A3F1C',
  onOrange: '#FFC777',
  tintRed: '#36202A',
  tintRedBorder: '#5C2B36',
  onRed: '#FF9C9C',
  tintGreen: '#16332A',
  onGreen: '#7BE0B5',
  tintPurple: '#272247',
  tintPurpleBorder: '#3B3470',
};

export type Scheme = 'light' | 'dark';
export type ThemePref = 'system' | Scheme;

const KEY = 'mulakat-kocu/theme';
export const colors: Palette = { ...LIGHT };

let pref: ThemePref = 'system';
let scheme: Scheme = 'light';
let snapshot = 'system|light';
const listeners = new Set<() => void>();

function apply() {
  const next: Scheme = pref === 'system' ? (Appearance.getColorScheme() === 'dark' ? 'dark' : 'light') : pref;
  scheme = next;
  Object.assign(colors, next === 'dark' ? DARK : LIGHT);
  snapshot = `${pref}|${scheme}`;
  listeners.forEach((f) => f());
}
apply();
Appearance.addChangeListener(() => {
  if (pref === 'system') apply();
});

export const getScheme = () => scheme;
export const getThemePref = () => pref;

export function setThemePref(p: ThemePref) {
  pref = p;
  AsyncStorage.setItem(KEY, p).catch(() => {});
  apply();
}

/** Restores the saved choice; call before the first render. */
export async function loadThemePref() {
  try {
    const saved = await AsyncStorage.getItem(KEY);
    if (saved === 'system' || saved === 'light' || saved === 'dark') {
      pref = saved;
      apply();
    }
  } catch {}
}

const subscribe = (f: () => void) => {
  listeners.add(f);
  return () => listeners.delete(f);
};

/** Re-renders on theme change; returns the active scheme and the user's preference. */
export function useTheme(): { scheme: Scheme; pref: ThemePref } {
  const snap = useSyncExternalStore(subscribe, () => snapshot, () => snapshot);
  const [p, s] = snap.split('|') as [ThemePref, Scheme];
  return { scheme: s, pref: p };
}

/** A style sheet that is rebuilt (once, then cached) for each theme. */
export function themedStyles<T extends object>(make: () => T): T {
  const cache: Partial<Record<Scheme, T>> = {};
  return new Proxy({} as T, {
    get: (_, key) => ((cache[scheme] ??= make()) as Record<string | symbol, unknown>)[key],
  });
}
