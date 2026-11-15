import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { AuthScaffold, Field, FormError, type InputRef } from '@/components/AuthForm';
import { Button, resetTo, Ionicons, T, colors, notify } from '@/components/ui';
import { AuthError, MIN_PASSWORD, signUp } from '@/lib/auth';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

export default function SignUp() {
  const { signedIn, session } = useStore();
  const t = useT();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const emailRef = useRef<InputRef>(null);
  const passRef = useRef<InputRef>(null);
  const fromGuest = session?.mode === 'guest';

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const account = await signUp({ name, email, password });
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
      icon="person-add"
      title={t('Hesap oluştur', 'Create account')}
      subtitle={
        fromGuest
          ? t('Üye ol, şimdiye kadarki ilerlemen korunur.', 'Sign up and keep the progress you have made so far.')
          : t('Ücretsiz üye ol, ilerlemen hep seninle kalsın.', 'Sign up free and keep your progress with you.')
      }
    >
      <Field
        label={t('Adın', 'Your name')}
        icon="person"
        placeholder={t('Örn. Ayşe Yılmaz', 'e.g. Jane Smith')}
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
        autoComplete="name"
        textContentType="name"
        returnKeyType="next"
        onSubmitEditing={() => emailRef.current?.focus()}
      />
      <Field
        ref={emailRef}
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
        placeholder={t(`En az ${MIN_PASSWORD} karakter`, `At least ${MIN_PASSWORD} characters`)}
        value={password}
        onChangeText={setPassword}
        secret
        autoCapitalize="none"
        autoComplete="new-password"
        textContentType="newPassword"
        returnKeyType="go"
        onSubmitEditing={submit}
      />
      <FormError message={error} />
      <Button title={busy ? t('OLUŞTURULUYOR…', 'CREATING…') : t('HESAP OLUŞTUR', 'CREATE ACCOUNT')} icon="checkmark" onPress={submit} disabled={busy} />
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginTop: 16 }}>
        <Ionicons name="cloud-done" size={15} color={colors.muted} style={{ marginTop: 1 }} />
        <T w="semibold" size={12} color={colors.muted} style={{ flex: 1 }}>
          {t(
            'İlerlemen hesabında saklanır; telefon değiştirsen de kaldığın yerden devam edersin.',
            'Your progress is saved to your account, so you can continue even on a new phone.',
          )}
        </T>
      </View>
      <Pressable onPress={() => router.replace('/giris')} hitSlop={8} style={{ alignSelf: 'center', marginTop: 22 }}>
        <T w="bold" size={14} color={colors.muted}>
          {t('Zaten hesabın var mı?', 'Already have an account?')}{' '}
          <T w="black" size={14} color={colors.primary}>
            {t('Giriş yap', 'Sign in')}
          </T>
        </T>
      </Pressable>
    </AuthScaffold>
  );
}
