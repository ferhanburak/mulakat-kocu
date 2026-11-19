import { useLinkingURL } from 'expo-linking';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Platform, View } from 'react-native';
import { AuthScaffold } from '@/components/AuthForm';
import { Button, Ionicons, T, colors, notify, resetTo } from '@/components/ui';
import { currentAccount, sessionFromEmailLink } from '@/lib/auth';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

/**
 * Where Supabase links come back to: the sign-up confirmation email, and Google
 * sign-in on the web. Signs the account in and moves on.
 */
export default function SignInLanding() {
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
    <AuthScaffold icon="log-in" title={t('Giriş yapılıyor', 'Signing you in')} subtitle={t('Bir saniye, hesabını açıyoruz…', 'One moment, opening your account…')}>
      {status === 'checking' ? (
        <ActivityIndicator color={colors.primary} style={{ marginVertical: 24 }} />
      ) : (
        <View style={{ alignItems: 'center', gap: 10 }}>
          <Ionicons name="alert-circle" size={44} color={colors.danger} />
          <T w="semibold" size={14} color={colors.muted} style={{ textAlign: 'center', lineHeight: 20 }}>
            {t(
              'Giriş tamamlanamadı ya da bağlantının süresi dolmuş. Tekrar giriş yapmayı dene; e-postan onaylanmadıysa yeni bir onay e-postası isteyebilirsin.',
              "We couldn't finish signing you in, or the link has expired. Try signing in again; if your email isn't confirmed yet, you can ask for a new confirmation email.",
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
