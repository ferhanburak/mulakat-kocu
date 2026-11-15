import { useLinkingURL } from 'expo-linking';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { AuthScaffold, Field, FormError } from '@/components/AuthForm';
import { Button, Ionicons, T, colors, notify, resetTo } from '@/components/ui';
import { AuthError, MIN_PASSWORD, sessionFromEmailLink, setNewPassword } from '@/lib/auth';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

/** Opened from the password reset email; sets a new password and signs in. */
export default function NewPassword() {
  const t = useT();
  const { signedIn } = useStore();
  const linkUrl = useLinkingURL();
  const [status, setStatus] = useState<'checking' | 'ready' | 'invalid'>('checking');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    // On the web the tokens are in the address bar's #fragment.
    const url = Platform.OS === 'web' && typeof window !== 'undefined' ? window.location.href : linkUrl;
    sessionFromEmailLink(url ?? '')
      .then((ok) => setStatus(ok ? 'ready' : 'invalid'))
      .catch(() => setStatus('invalid'));
  }, [linkUrl]);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const account = await setNewPassword(password);
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
      icon="lock-open"
      title={t('Yeni şifre', 'New password')}
      subtitle={t('Hesabın için yeni bir şifre belirle.', 'Choose a new password for your account.')}
    >
      {status === 'checking' && <ActivityIndicator color={colors.primary} style={{ marginVertical: 24 }} />}
      {status === 'invalid' && (
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Ionicons name="alert-circle" size={44} color={colors.danger} />
          <T w="semibold" size={14} color={colors.muted} style={{ textAlign: 'center', lineHeight: 20 }}>
            {t(
              'Bu bağlantı geçersiz ya da süresi dolmuş. Yeni bir sıfırlama bağlantısı iste.',
              'This link is invalid or has expired. Request a new reset link.',
            )}
          </T>
          <Button
            title={t('YENİ BAĞLANTI İSTE', 'REQUEST A NEW LINK')}
            icon="refresh"
            onPress={() => router.replace('/sifre-sifirla')}
            style={{ alignSelf: 'stretch', marginTop: 8 }}
          />
        </View>
      )}
      {status === 'ready' && (
        <>
          <Field
            label={t('Yeni şifre', 'New password')}
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
          <Button
            title={busy ? t('KAYDEDİLİYOR…', 'SAVING…') : t('ŞİFREYİ KAYDET', 'SAVE PASSWORD')}
            icon="checkmark"
            onPress={submit}
            disabled={busy}
          />
        </>
      )}
    </AuthScaffold>
  );
}
