import type { AuthError as SupabaseAuthError, User } from '@supabase/supabase-js';
import { supabase } from './supabase';

/**
 * Account layer backed by Supabase Auth. Screens only use these functions,
 * so the backend can change without touching them.
 */
export type Account = { id: string; name: string; email: string; createdAt: string };

export class AuthError extends Error {}

const normEmail = (e: string) => e.trim().toLocaleLowerCase('en-US');
export const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
export const MIN_PASSWORD = 6;

const CONFIRM_MSG = 'Hesabın oluşturuldu. E-postana gelen bağlantıyla adresini onayla, sonra giriş yap.';

export const toAccount = (u: User): Account => ({
  id: u.id,
  email: u.email ?? '',
  name: (u.user_metadata?.name as string | undefined) ?? '',
  createdAt: u.created_at,
});

/** Turns Supabase errors into Turkish messages for the forms. */
function fail(e: SupabaseAuthError): never {
  const code = e.code ?? '';
  if (code === 'user_already_exists' || code === 'email_exists') throw new AuthError('Bu e-posta ile zaten bir hesap var. Giriş yapmayı dene.');
  if (code === 'invalid_credentials') throw new AuthError('E-posta veya şifre hatalı.');
  if (code === 'email_not_confirmed') throw new AuthError('E-posta adresin henüz onaylanmadı. Gelen kutundaki bağlantıya tıkla.');
  if (code === 'weak_password') throw new AuthError(`Şifre en az ${MIN_PASSWORD} karakter olmalı.`);
  if (code === 'over_request_rate_limit' || code === 'over_email_send_rate_limit') throw new AuthError('Çok fazla deneme yapıldı. Biraz bekleyip tekrar dene.');
  if (e.name === 'AuthRetryableFetchError' || e.status === 0) throw new AuthError('Sunucuya bağlanılamadı. İnternet bağlantını kontrol et.');
  throw new AuthError('Bir şeyler ters gitti, tekrar dene.');
}

export async function signUp(input: { name: string; email: string; password: string }): Promise<Account> {
  const name = input.name.trim();
  const email = normEmail(input.email);
  if (name.length < 2) throw new AuthError('Lütfen adını yaz.');
  if (!isValidEmail(email)) throw new AuthError('Geçerli bir e-posta adresi gir.');
  if (input.password.length < MIN_PASSWORD) throw new AuthError(`Şifre en az ${MIN_PASSWORD} karakter olmalı.`);
  const { data, error } = await supabase.auth.signUp({ email, password: input.password, options: { data: { name } } });
  if (error) fail(error);
  // With email confirmation on, there is no session until the address is confirmed.
  if (!data.session || !data.user) throw new AuthError(CONFIRM_MSG);
  return toAccount(data.user);
}

export async function signIn(input: { email: string; password: string }): Promise<Account> {
  const email = normEmail(input.email);
  if (!isValidEmail(email)) throw new AuthError('Geçerli bir e-posta adresi gir.');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: input.password });
  if (error) fail(error);
  return toAccount(data.user);
}

export async function signOutAccount() {
  await supabase.auth.signOut();
}

/** The account of the stored Supabase session, or null when signed out or expired. */
export async function currentAccount(): Promise<Account | null> {
  const { data } = await supabase.auth.getSession();
  return data.session ? toAccount(data.session.user) : null;
}

/** Keeps the stored name in sync when the user edits their profile. */
export async function updateName(name: string) {
  const { data, error } = await supabase.auth.updateUser({ data: { name: name.trim() } });
  if (error) return;
  await supabase.from('profiles').update({ name: name.trim() }).eq('id', data.user.id);
}
