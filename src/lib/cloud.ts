import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';

/**
 * Cloud copy of a signed-in user's progress (one JSON document per user in `profiles`).
 * A "pending" flag survives app restarts, so changes made offline are uploaded later
 * instead of being overwritten by the older cloud copy.
 */
const PENDING_KEY = 'mulakat-kocu/sync-pending';

export async function pullProgress(userId: string): Promise<Record<string, unknown> | null | undefined> {
  const { data, error } = await supabase.from('profiles').select('progress').eq('id', userId).maybeSingle();
  if (error) return undefined; // unknown (offline or server error), keep local data
  return (data?.progress as Record<string, unknown> | null) ?? null;
}

export const markPending = () => AsyncStorage.setItem(PENDING_KEY, '1').catch(() => {});

export async function pushProgress(userId: string, name: string, progress: unknown): Promise<boolean> {
  const { error } = await supabase
    .from('profiles')
    .upsert({ id: userId, name, progress, updated_at: new Date().toISOString() });
  if (error) return false;
  await AsyncStorage.removeItem(PENDING_KEY).catch(() => {});
  return true;
}

export const hasPendingPush = async () => (await AsyncStorage.getItem(PENDING_KEY).catch(() => null)) === '1';
