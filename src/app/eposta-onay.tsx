import { useLinkingURL } from 'expo-linking';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { AuthScaffold } from '@/components/AuthForm';
import { Button, Ionicons, T, colors, notify, resetTo } from '@/components/ui';
import { currentAccount, sessionFromEmailLink } from '@/lib/auth';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

/** Opened from the sign-up confirmation email; signs the new account in. */
export default function ConfirmEmail() {
  const t = useT();
  const { signedIn } = useStore();
  const linkUrl = useLinkingURL();
  const [status, setStatus] = useState<'checking' | 'invalid'>('checking');

  useEffect(() => {
    // On the web the tokens are in the address bar's #fragment.
    const url = Platform.OS === 'web' && typeof window !== 'undefined' ? window.location.href : linkUrl;
    let cancelled = false;
    (async () => {
      const ok = await sessionFromEmailLink(url ?? '').catch(() => false);
      const account = ok ? await currentAccount() : null;
      if (cancelled) return;
      if (!account) {
        setStatus('invalid');
        return;
      }
      notify(true);
      const hasProfile = await signedIn(account);
      resetTo(hasProfile ? '/' : '/profil-kurulum');
    })();
    return () => {
      cancelled = true;
    };
  }, [linkUrl, signedIn]);

  return (
    <AuthScaffold icon="mail-open" title={t('E-posta onayı', 'Email confirmation')} subtitle={t('Hesabını açıyoruz…', 'Activating your account…')}>
      {status === 'checking' ? (
        <ActivityIndicator color={colors.primary} style={{ marginVertical: 24 }} />
      ) : (
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Ionicons name="alert-circle" size={44} color={colors.danger} />
          <T w="semibold" size={14} color={colors.muted} style={{ textAlign: 'center', lineHeight: 20 }}>
            {t(
              'Bu bağlantı geçersiz ya da süresi dolmuş. Giriş yapmayı dene; adresin onaylanmadıysa yeni bir onay e-postası isteyebilirsin.',
              "This link is invalid or has expired. Try signing in; if your address isn't confirmed yet, you can ask for a new confirmation email.",
            )}
          </T>
          <Button
            title={t('GİRİŞ YAP', 'SIGN IN')}
            icon="log-in"
            onPress={() => router.replace('/giris')}
            style={{ alignSelf: 'stretch', marginTop: 8 }}
          />
        </View>
      )}
    </AuthScaffold>
  );
}
