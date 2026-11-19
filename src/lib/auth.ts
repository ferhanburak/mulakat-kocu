import type { AuthError as SupabaseAuthError, User } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';
import { getLang, onLangChange, tt } from './i18n';
import { supabase } from './supabase';

/**
 * Account layer backed by Supabase Auth. Screens only use these functions,
 * so the backend can change without touching them.
 */
export type Account = { id: string; name: string; email: string; createdAt: string };

export class AuthError extends Error {
  constructor(
    message: string,
    /** Set for errors a screen reacts to, e.g. offering to resend the confirmation email. */
    readonly code?: 'email_not_confirmed',
  ) {
    super(message);
  }
}

/** Where links in auth emails return to: the app (scheme URL) or, on the web, this site. */
const linkTo = (path: string) => Linking.createURL(path);

const normEmail = (e: string) => e.trim().toLocaleLowerCase('en-US');
export const isValidEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e.trim());
export const MIN_PASSWORD = 6;

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
    throw new AuthError(
      tt('E-posta adresin henüz onaylanmadı. Gelen kutundaki bağlantıya tıkla.', "Your email isn't confirmed yet. Click the link in your inbox."),
      'email_not_confirmed',
    );
  if (code === 'weak_password') throw new AuthError(passwordMsg());
  if (code === 'over_request_rate_limit' || code === 'over_email_send_rate_limit')
    throw new AuthError(tt('Çok fazla deneme yapıldı. Biraz bekleyip tekrar dene.', 'Too many attempts. Wait a moment and try again.'));
  if (e.name === 'AuthRetryableFetchError' || e.status === 0)
    throw new AuthError(tt('Sunucuya bağlanılamadı. İnternet bağlantını kontrol et.', "Couldn't reach the server. Check your internet connection."));
  throw new AuthError(tt('Bir şeyler ters gitti, tekrar dene.', 'Something went wrong, please try again.'));
}

/** Either signed in right away, or waiting for the user to click the confirmation link. */
export type SignUpResult = { account: Account } | { confirmEmail: string };

export async function signUp(input: { name: string; email: string; password: string }): Promise<SignUpResult> {
  const name = input.name.trim();
  const email = normEmail(input.email);
  if (name.length < 2) throw new AuthError(tt('Lütfen adını yaz.', 'Please enter your name.'));
  if (!isValidEmail(email)) throw new AuthError(emailMsg());
  if (input.password.length < MIN_PASSWORD) throw new AuthError(passwordMsg());
  const { data, error } = await supabase.auth.signUp({
    email,
    password: input.password,
    // `lang` picks the language of the emails (see supabase/templates).
    options: { data: { name, lang: getLang() }, emailRedirectTo: linkTo('/giris-tamam') },
  });
  if (error) fail(error);
  // With email confirmation on, there is no session until the address is confirmed.
  if (!data.session || !data.user) return { confirmEmail: email };
  return { account: toAccount(data.user) };
}

/** Sends the sign-up confirmation email again. */
export async function resendConfirmation(rawEmail: string) {
  const email = normEmail(rawEmail);
  if (!isValidEmail(email)) throw new AuthError(emailMsg());
  const { error } = await supabase.auth.resend({ type: 'signup', email, options: { emailRedirectTo: linkTo('/giris-tamam') } });
  if (error) fail(error);
}

export async function signIn(input: { email: string; password: string }): Promise<Account> {
  const email = normEmail(input.email);
  if (!isValidEmail(email)) throw new AuthError(emailMsg());
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: input.password });
  if (error) fail(error);
  syncLang(data.user);
  return toAccount(data.user);
}

/** Stores the app language on the account, for the language of auth emails. */
function syncLang(user: User) {
  if (user.user_metadata?.lang !== getLang()) supabase.auth.updateUser({ data: { lang: getLang() } }).catch(() => {});
}

/**
 * Signs in (or signs up) with Google through Supabase. On the web the page goes to
 * Google and comes back to /giris-tamam, so this never returns there. In the app it
 * opens an in-app browser and returns the account, or null if the user closed it.
 */
export async function signInWithGoogle(): Promise<Account | null> {
  const redirectTo = linkTo('/giris-tamam');
  if (Platform.OS === 'web') {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo } });
    if (error) fail(error);
    return null;
  }
  const { data, error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo, skipBrowserRedirect: true } });
  if (error) fail(error);
  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo);
  if (result.type !== 'success') return null;
  if (!(await sessionFromEmailLink(result.url))) throw new AuthError(tt('Google ile giriş yapılamadı, tekrar dene.', "Couldn't sign in with Google, please try again."));
  const { data: u } = await supabase.auth.getUser();
  if (!u.user) throw new AuthError(tt('Google ile giriş yapılamadı, tekrar dene.', "Couldn't sign in with Google, please try again."));
  syncLang(u.user);
  return toAccount(u.user);
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

/** Sends a password reset email whose link opens the app's new-password screen. */
export async function requestPasswordReset(rawEmail: string) {
  const email = normEmail(rawEmail);
  if (!isValidEmail(email)) throw new AuthError(emailMsg());
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: linkTo('/sifre-yenile') });
  if (error) fail(error);
}

/**
 * Signs in with the one-time session carried by a link back from Supabase (password
 * reset, sign-up confirmation or Google): tokens in the URL fragment, or a `code` with the PKCE flow.
 * Returns whether it worked.
 */
export async function sessionFromEmailLink(url: string): Promise<boolean> {
  const params = new URLSearchParams(url.split('#')[1] ?? url.split('?')[1] ?? '');
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  const code = params.get('code') ?? new URLSearchParams(url.split('?')[1]?.split('#')[0] ?? '').get('code');
  if (access_token && refresh_token) {
    const { error } = await supabase.auth.setSession({ access_token, refresh_token });
    return !error;
  }
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    return !error;
  }
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export async function setNewPassword(password: string): Promise<Account> {
  if (password.length < MIN_PASSWORD) throw new AuthError(passwordMsg());
  const { data, error } = await supabase.auth.updateUser({ password });
  if (error) fail(error);
  return toAccount(data.user);
}

/** Permanently deletes the signed-in account and its cloud progress (see supabase/migrations). */
export async function deleteAccount() {
  const { error } = await supabase.rpc('delete_my_account');
  if (error) throw new AuthError(tt('Hesap silinemedi, tekrar dene.', "Couldn't delete the account, please try again."));
  await supabase.auth.signOut().catch(() => {});
}

/**
 * Keeps the account's email language in step with the app language, so reset and
 * other emails arrive in the language the user is using now.
 */
onLangChange(async (lang) => {
  try {
    const { data } = await supabase.auth.getSession();
    const user = data.session?.user;
    if (user && user.user_metadata?.lang !== lang) await supabase.auth.updateUser({ data: { lang } });
  } catch {}
});
