import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable } from 'react-native';
import { AuthScaffold, Field, FormError, type InputRef } from '@/components/AuthForm';
import { Button, T, colors, notify } from '@/components/ui';
import { AuthError, signIn } from '@/lib/auth';
import { useStore } from '@/lib/store';

export default function SignIn() {
  const { signedIn, profile } = useStore();
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
      signedIn(account);
      router.replace(profile ? '/' : '/profil-kurulum');
    } catch (e) {
      notify(false);
      setError(e instanceof AuthError ? e.message : 'Bir şeyler ters gitti, tekrar dene.');
      setBusy(false);
    }
  };

  return (
    <AuthScaffold icon="log-in" title="Tekrar hoş geldin" subtitle="Kaldığın yerden devam etmek için giriş yap.">
      <Field
        label="E-posta"
        icon="mail"
        placeholder="ornek@eposta.com"
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
        label="Şifre"
        icon="lock-closed"
        placeholder="Şifren"
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
      <Button title={busy ? 'GİRİŞ YAPILIYOR…' : 'GİRİŞ YAP'} icon="arrow-forward" onPress={submit} disabled={busy} />
      <Pressable onPress={() => router.replace('/kayit')} hitSlop={8} style={{ alignSelf: 'center', marginTop: 22 }}>
        <T w="bold" size={14} color={colors.muted}>
          Hesabın yok mu?{' '}
          <T w="black" size={14} color={colors.primary}>
            Hesap oluştur
          </T>
        </T>
      </Pressable>
    </AuthScaffold>
  );
}
