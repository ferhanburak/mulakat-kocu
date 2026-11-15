import { router } from 'expo-router';
import { useRef, useState } from 'react';
import { Pressable, View } from 'react-native';
import { AuthScaffold, Field, FormError, type InputRef } from '@/components/AuthForm';
import { Button, Ionicons, T, colors, notify } from '@/components/ui';
import { AuthError, MIN_PASSWORD, signUp } from '@/lib/auth';
import { useStore } from '@/lib/store';

export default function SignUp() {
  const { signedIn, profile, session } = useStore();
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
      signedIn(account);
      router.replace(profile ? '/' : '/profil-kurulum');
    } catch (e) {
      notify(false);
      setError(e instanceof AuthError ? e.message : 'Bir şeyler ters gitti, tekrar dene.');
      setBusy(false);
    }
  };

  return (
    <AuthScaffold
      icon="person-add"
      title="Hesap oluştur"
      subtitle={fromGuest ? 'Üye ol, şimdiye kadarki ilerlemen korunur.' : 'Ücretsiz üye ol, ilerlemen hep seninle kalsın.'}
    >
      <Field
        label="Adın"
        icon="person"
        placeholder="Örn. Ayşe Yılmaz"
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
        placeholder={`En az ${MIN_PASSWORD} karakter`}
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
      <Button title={busy ? 'OLUŞTURULUYOR…' : 'HESAP OLUŞTUR'} icon="checkmark" onPress={submit} disabled={busy} />
      <View style={{ flexDirection: 'row', gap: 8, alignItems: 'flex-start', marginTop: 16 }}>
        <Ionicons name="phone-portrait" size={15} color={colors.muted} style={{ marginTop: 1 }} />
        <T w="semibold" size={12} color={colors.muted} style={{ flex: 1 }}>
          Hesabın şimdilik bu cihazda saklanır. Şifren açık hâliyle hiçbir yerde tutulmaz.
        </T>
      </View>
      <Pressable onPress={() => router.replace('/giris')} hitSlop={8} style={{ alignSelf: 'center', marginTop: 22 }}>
        <T w="bold" size={14} color={colors.muted}>
          Zaten hesabın var mı?{' '}
          <T w="black" size={14} color={colors.primary}>
            Giriş yap
          </T>
        </T>
      </Pressable>
    </AuthScaffold>
  );
}
