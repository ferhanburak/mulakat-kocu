import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';

/**
 * Local, on-device account layer. It keeps the same shape a real backend
 * (e.g. Supabase auth) would have, so the screens don't change when it is
 * replaced. Passwords are never stored, only a salted SHA-256 hash.
 *
 * Limitation: accounts live on this device only; there is no recovery or sync.
 */
export type Account = { id: string; name: string; email: string; createdAt: string };

type StoredUser = Account & { salt: string; hash: string };

const USERS_KEY = 'mulakat-kocu/users/v1';

export class AuthError extends Error {}

const normEmail = (e: string) => e.trim().toLocaleLowerCase('en-US');
export const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
export const MIN_PASSWORD = 6;

async function loadUsers(): Promise<Record<string, StoredUser>> {
  try {
    const raw = await AsyncStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

const hashPassword = (salt: string, password: string) =>
  Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, `${salt}:${password}`);

export async function signUp(input: { name: string; email: string; password: string }): Promise<Account> {
  const name = input.name.trim();
  const email = normEmail(input.email);
  if (name.length < 2) throw new AuthError('Lütfen adını yaz.');
  if (!isValidEmail(email)) throw new AuthError('Geçerli bir e-posta adresi gir.');
  if (input.password.length < MIN_PASSWORD) throw new AuthError(`Şifre en az ${MIN_PASSWORD} karakter olmalı.`);
  const users = await loadUsers();
  if (users[email]) throw new AuthError('Bu e-posta ile zaten bir hesap var. Giriş yapmayı dene.');
  const salt = Crypto.randomUUID();
  const account: Account = { id: Crypto.randomUUID(), name, email, createdAt: new Date().toISOString() };
  users[email] = { ...account, salt, hash: await hashPassword(salt, input.password) };
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  return account;
}

export async function signIn(input: { email: string; password: string }): Promise<Account> {
  const email = normEmail(input.email);
  if (!isValidEmail(email)) throw new AuthError('Geçerli bir e-posta adresi gir.');
  const users = await loadUsers();
  const user = users[email];
  // Same message for unknown email and wrong password, so accounts can't be probed.
  if (!user || (await hashPassword(user.salt, input.password)) !== user.hash) {
    throw new AuthError('E-posta veya şifre hatalı.');
  }
  const { salt: _s, hash: _h, ...account } = user;
  return account;
}

/** Keeps the stored name in sync when the user edits their profile. */
export async function updateName(email: string, name: string) {
  const users = await loadUsers();
  const key = normEmail(email);
  if (!users[key]) return;
  users[key] = { ...users[key], name: name.trim() };
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}
