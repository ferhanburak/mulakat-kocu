import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { AuthScaffold, Field, FormError } from '@/components/AuthForm';
import { Button, Ionicons, T, colors, notify } from '@/components/ui';
import { AuthError, requestPasswordReset } from '@/lib/auth';
import { useT } from '@/lib/i18n';

export default function ForgotPassword() {
  const t = useT();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      await requestPasswordReset(email);
      notify(true);
      setSent(true);
    } catch (e) {
      notify(false);
      setError(e instanceof AuthError ? e.message : t('Bir şeyler ters gitti, tekrar dene.', 'Something went wrong, please try again.'));
    }
    setBusy(false);
  };

  return (
    <AuthScaffold
      icon="key"
      title={t('Şifreni sıfırla', 'Reset your password')}
      subtitle={t('E-postana bir sıfırlama bağlantısı gönderelim.', "We'll email you a link to reset it.")}
    >
      {sent ? (
        <View style={{ alignItems: 'center', gap: 10, paddingVertical: 8 }}>
          <Ionicons name="mail-open" size={44} color={colors.success} />
          <T w="black" size={17} style={{ textAlign: 'center' }}>
            {t('Bağlantı gönderildi', 'Link sent')}
          </T>
          <T w="semibold" size={14} color={colors.muted} style={{ textAlign: 'center', lineHeight: 20 }}>
            {t(
              `${email.trim()} adresine bir bağlantı gönderdik. Bağlantıya tıklayıp yeni şifreni belirle. Gelmediyse spam klasörüne bak.`,
              `We sent a link to ${email.trim()}. Open it to set a new password. If it doesn't arrive, check your spam folder.`,
            )}
          </T>
          <Button title={t('GİRİŞE DÖN', 'BACK TO SIGN IN')} icon="log-in" onPress={() => router.replace('/giris')} style={{ alignSelf: 'stretch', marginTop: 8 }} />
        </View>
      ) : (
        <>
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
            returnKeyType="send"
            onSubmitEditing={submit}
          />
          <FormError message={error} />
          <Button
            title={busy ? t('GÖNDERİLİYOR…', 'SENDING…') : t('BAĞLANTI GÖNDER', 'SEND LINK')}
            icon="send"
            onPress={submit}
            disabled={busy}
          />
          <Pressable onPress={() => router.replace('/giris')} hitSlop={8} style={{ alignSelf: 'center', marginTop: 22 }}>
            <T w="black" size={14} color={colors.primary}>
              {t('Girişe dön', 'Back to sign in')}
            </T>
          </Pressable>
        </>
      )}
    </AuthScaffold>
  );
}
