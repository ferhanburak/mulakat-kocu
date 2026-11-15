import type { AuthError as SupabaseAuthError, User } from '@supabase/supabase-js';
import { tt } from './i18n';
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

const confirmMsg = () =>
  tt(
    'Hesabın oluşturuldu. E-postana gelen bağlantıyla adresini onayla, sonra giriş yap.',
    'Your account was created. Confirm your address with the link we emailed you, then sign in.',
  );

export const toAccount = (u: User): Account => ({
  id: u.id,
  email: u.email ?? '',
  name: (u.user_metadata?.name as string | undefined) ?? '',
  createdAt: u.created_at,
});

const passwordMsg = () => tt(`Şifre en az ${MIN_PASSWORD} karakter olmalı.`, `Password must be at least ${MIN_PASSWORD} characters.`);
const emailMsg = () => tt('Geçerli bir e-posta adresi gir.', 'Enter a valid email address.');

/** Turns Supabase errors into messages for the forms, in the app language. */
function fail(e: SupabaseAuthError): never {
  const code = e.code ?? '';
  if (code === 'user_already_exists' || code === 'email_exists')
    throw new AuthError(tt('Bu e-posta ile zaten bir hesap var. Giriş yapmayı dene.', 'An account with this email already exists. Try signing in.'));
  if (code === 'invalid_credentials') throw new AuthError(tt('E-posta veya şifre hatalı.', 'Incorrect email or password.'));
  if (code === 'email_not_confirmed')
    throw new AuthError(tt('E-posta adresin henüz onaylanmadı. Gelen kutundaki bağlantıya tıkla.', "Your email isn't confirmed yet. Click the link in your inbox."));
  if (code === 'weak_password') throw new AuthError(passwordMsg());
  if (code === 'over_request_rate_limit' || code === 'over_email_send_rate_limit')
    throw new AuthError(tt('Çok fazla deneme yapıldı. Biraz bekleyip tekrar dene.', 'Too many attempts. Wait a moment and try again.'));
  if (e.name === 'AuthRetryableFetchError' || e.status === 0)
    throw new AuthError(tt('Sunucuya bağlanılamadı. İnternet bağlantını kontrol et.', "Couldn't reach the server. Check your internet connection."));
  throw new AuthError(tt('Bir şeyler ters gitti, tekrar dene.', 'Something went wrong, please try again.'));
}

export async function signUp(input: { name: string; email: string; password: string }): Promise<Account> {
  const name = input.name.trim();
  const email = normEmail(input.email);
  if (name.length < 2) throw new AuthError(tt('Lütfen adını yaz.', 'Please enter your name.'));
  if (!isValidEmail(email)) throw new AuthError(emailMsg());
  if (input.password.length < MIN_PASSWORD) throw new AuthError(passwordMsg());
  const { data, error } = await supabase.auth.signUp({ email, password: input.password, options: { data: { name } } });
  if (error) fail(error);
  // With email confirmation on, there is no session until the address is confirmed.
  if (!data.session || !data.user) throw new AuthError(confirmMsg());
  return toAccount(data.user);
}

export async function signIn(input: { email: string; password: string }): Promise<Account> {
  const email = normEmail(input.email);
  if (!isValidEmail(email)) throw new AuthError(emailMsg());
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
