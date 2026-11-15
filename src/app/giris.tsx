import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { AuthScaffold, Field, FormError, type InputRef } from '@/components/AuthForm';
import { Button, resetTo, T, colors, notify } from '@/components/ui';
import { AuthError, signIn } from '@/lib/auth';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

export default function SignIn() {
  const { signedIn } = useStore();
  const t = useT();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const passRef = useRef<InputRef>(null);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const account = await signIn({ email, password });
      notify(true);
      const hasProfile = await signedIn(account);
      resetTo(hasProfile ? '/' : '/profil-kurulum');
    } catch (e) {
      notify(false);
      setError(e instanceof AuthError ? e.message : t('Bir şeyler ters gitti, tekrar dene.', 'Something went wrong, please try again.'));
      setBusy(false);
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
      <FormError message={error} />
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
