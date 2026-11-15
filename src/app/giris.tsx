import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { AuthScaffold, Field, FormError, type InputRef } from '@/components/AuthForm';
import { Button, resetTo, T, colors, notify } from '@/components/ui';
import { AuthError, resendConfirmation, signIn } from '@/lib/auth';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

export default function SignIn() {
  const { signedIn } = useStore();
  const t = useT();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [unconfirmed, setUnconfirmed] = useState(false);
  const [resent, setResent] = useState(false);
  const passRef = useRef<InputRef>(null);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    setUnconfirmed(false);
    try {
      const account = await signIn({ email, password });
      notify(true);
      const hasProfile = await signedIn(account);
      resetTo(hasProfile ? '/' : '/profil-kurulum');
    } catch (e) {
      notify(false);
      setError(e instanceof AuthError ? e.message : t('Bir şeyler ters gitti, tekrar dene.', 'Something went wrong, please try again.'));
      setUnconfirmed(e instanceof AuthError && e.code === 'email_not_confirmed');
      setResent(false);
      setBusy(false);
    }
  };

  const resend = async () => {
    try {
      await resendConfirmation(email);
      setResent(true);
      setError(null);
    } catch (e) {
      setError(e instanceof AuthError ? e.message : t('Gönderilemedi, tekrar dene.', "Couldn't send it, please try again."));
    }
  };

  return (
    <AuthScaffold
      icon="log-in"
      title={t('Tekrar hoş geldin', 'Welcome back')}
      subtitle={t('Kaldığın yerden devam etmek için giriş yap.', 'Sign in to pick up where you left off.')}
    >
      <Field
        label={t('E-posta', 'Email')}
        icon="mail"
        placeholder={t('ornek@eposta.com', 'you@example.com')}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        autoComplete="email"
        textContentType="emailAddress"
        returnKeyType="next"
        onSubmitEditing={() => passRef.current?.focus()}
      />
      <Field
        ref={passRef}
        label={t('Şifre', 'Password')}
        icon="lock-closed"
        placeholder={t('Şifren', 'Your password')}
        value={password}
        onChangeText={setPassword}
        secret
        autoCapitalize="none"
        autoComplete="current-password"
        textContentType="password"
        returnKeyType="go"
        onSubmitEditing={submit}
      />
      <Pressable onPress={() => router.push('/sifre-sifirla')} hitSlop={8} style={{ alignSelf: 'flex-end', marginTop: -4, marginBottom: 10 }}>
        <T w="extrabold" size={13} color={colors.primary}>
          {t('Şifremi unuttum', 'Forgot password?')}
        </T>
      </Pressable>
      <FormError message={error} />
      {unconfirmed && (
        <Pressable onPress={resend} disabled={resent} hitSlop={8} style={{ alignSelf: 'center', marginTop: -4, marginBottom: 14 }}>
          <T w="extrabold" size={13} color={resent ? colors.success : colors.primary}>
            {resent ? t('Onay e-postası tekrar gönderildi.', 'Confirmation email sent again.') : t('Onay e-postasını tekrar gönder', 'Resend confirmation email')}
          </T>
        </Pressable>
      )}
      <Button title={busy ? t('GİRİŞ YAPILIYOR…', 'SIGNING IN…') : t('GİRİŞ YAP', 'SIGN IN')} icon="arrow-forward" onPress={submit} disabled={busy} />
      <Pressable onPress={() => router.replace('/kayit')} hitSlop={8} style={{ alignSelf: 'center', marginTop: 22 }}>
        <T w="bold" size={14} color={colors.muted}>
          {t('Hesabın yok mu?', "Don't have an account?")}{' '}
          <T w="black" size={14} color={colors.primary}>
            {t('Hesap oluştur', 'Create one')}
          </T>
        </T>
      </Pressable>
    </AuthScaffold>
  );
}
