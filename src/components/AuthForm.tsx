import { AuthError, resendConfirmation, signInWithGoogle } from '@/lib/auth';
import { useStore } from '@/lib/store';
import { tt, useT } from '@/lib/i18n';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState, type ComponentRef, type ReactNode, type Ref } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, FadeIn, Ionicons, T, colors, notify, resetTo, fonts, goBack, shadow, type IconName, themedStyles } from './ui';

/** Gradient header + keyboard-safe scrolling body shared by the sign-up and sign-in screens. */
export function AuthScaffold({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} keyboardShouldPersistTaps="handled">
        <LinearGradient
          colors={[colors.primary, colors.primary2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 8 }]}
        >
          <Pressable onPress={() => goBack('/hosgeldin')} hitSlop={12} style={[styles.back, { top: insets.top + 8 }]}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <View style={styles.heroIcon}>
            <Ionicons name={icon} size={30} color={colors.primary} />
          </View>
          <T w="black" size={24} color="#fff" style={{ marginTop: 10 }}>
            {title}
          </T>
          <T w="semibold" size={13} color="rgba(255,255,255,0.88)" style={{ textAlign: 'center' }}>
            {subtitle}
          </T>
        </LinearGradient>
        <FadeIn style={styles.body}>{children}</FadeIn>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export type InputRef = ComponentRef<typeof TextInput>;
type FieldProps = TextInputProps & { label: string; icon: IconName; secret?: boolean; ref?: Ref<InputRef> };

/** Labelled input with an icon; `secret` adds a show/hide toggle for passwords. */
export function Field({ label, icon, secret, style, ref, ...rest }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  return (
    <View style={{ marginBottom: 14 }}>
      <T w="extrabold" size={13} color={colors.muted} style={{ marginBottom: 6, marginLeft: 4 }}>
        {label}
      </T>
      <View style={[styles.field, focused && { borderColor: colors.primary }]}>
        <Ionicons name={icon} size={19} color={focused ? colors.primary : colors.faint} />
        <TextInput
          ref={ref}
          placeholderTextColor={colors.faint}
          secureTextEntry={secret && hidden}
          autoCorrect={false}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[styles.input, style]}
        />
        {secret && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={hidden ? tt('Şifreyi göster', 'Show password') : tt('Şifreyi gizle', 'Hide password')}
          >
            <Ionicons name={hidden ? 'eye' : 'eye-off'} size={20} color={colors.muted} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <View style={styles.error}>
      <Ionicons name="alert-circle" size={18} color={colors.danger} />
      <T w="bold" size={13} color={colors.danger} style={{ flex: 1 }}>
        {message}
      </T>
    </View>
  );
}

/** "Continue with Google": signs in or creates the account, then routes like the email forms. */
export function GoogleButton() {
  const t = useT();
  const { signedIn } = useStore();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const go = async () => {
    if (busy) return;
    setBusy(true);
    setError(null);
    try {
      const account = await signInWithGoogle();
      // null: the user closed the Google window, or the web page is on its way to Google.
      if (!account) {
        setBusy(false);
        return;
      }
      notify(true);
      const hasProfile = await signedIn(account);
      resetTo(hasProfile ? '/' : '/profil-kurulum');
    } catch (e) {
      notify(false);
      setError(e instanceof AuthError ? e.message : t('Google ile giriş yapılamadı, tekrar dene.', "Couldn't sign in with Google, please try again."));
      setBusy(false);
    }
  };

  return (
    <View>
      <Button
        title={busy ? t('BEKLENİYOR…', 'WAITING…') : t('GOOGLE İLE DEVAM ET', 'CONTINUE WITH GOOGLE')}
        icon="logo-google"
        variant="outline"
        color={colors.text}
        onPress={go}
        disabled={busy}
      />
      {error && (
        <View style={{ marginTop: 12 }}>
          <FormError message={error} />
        </View>
      )}
    </View>
  );
}

/** "or" line between the email form and the Google button. */
export function OrDivider() {
  const t = useT();
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 16 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
      <T w="bold" size={12} color={colors.faint}>
        {t('veya', 'or')}
      </T>
      <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
    </View>
  );
}

const RESEND_WAIT = 60;

/**
 * Shown after sign-up while the account waits for email confirmation. Offers to send
 * the email again, with a short wait in between (Supabase rate-limits these).
 */
export function CheckInbox({ email, onSignIn }: { email: string; onSignIn: () => void }) {
  const t = useT();
  const [wait, setWait] = useState(RESEND_WAIT);
  const [busy, setBusy] = useState(false);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);

  useEffect(() => {
    if (wait <= 0) return;
    const id = setTimeout(() => setWait((w) => w - 1), 1000);
    return () => clearTimeout(id);
  }, [wait]);

  const resend = async () => {
    if (busy || wait > 0) return;
    setBusy(true);
    setNote(null);
    try {
      await resendConfirmation(email);
      setNote({ ok: true, text: t('E-postayı tekrar gönderdik.', 'We sent the email again.') });
      setWait(RESEND_WAIT);
    } catch (e) {
      setNote({ ok: false, text: e instanceof AuthError ? e.message : t('Gönderilemedi, tekrar dene.', "Couldn't send it, please try again.") });
    }
    setBusy(false);
  };

  const resendTitle = wait > 0 ? t(`TEKRAR GÖNDER (${wait})`, `RESEND (${wait})`) : busy ? t('GÖNDERİLİYOR…', 'SENDING…') : t('TEKRAR GÖNDER', 'RESEND EMAIL');

  return (
    <View style={{ alignItems: 'center', gap: 10, paddingVertical: 8 }}>
      <Ionicons name="mail-unread" size={44} color={colors.primary} />
      <T w="black" size={17} style={{ textAlign: 'center' }}>
        {t('E-postanı onayla', 'Confirm your email')}
      </T>
      <T w="semibold" size={14} color={colors.muted} style={{ textAlign: 'center', lineHeight: 20 }}>
        {t(
          `${email} adresine bir onay bağlantısı gönderdik. Bağlantıya tıklayınca hesabın açılır. Gelmediyse spam klasörüne bak.`,
          `We sent a confirmation link to ${email}. Open it to activate your account. If it doesn't arrive, check your spam folder.`,
        )}
      </T>
      {note && (
        <T w="bold" size={13} color={note.ok ? colors.success : colors.danger} style={{ textAlign: 'center' }}>
          {note.text}
        </T>
      )}
      <Button title={resendTitle} icon="refresh" variant="outline" onPress={resend} disabled={busy || wait > 0} style={{ alignSelf: 'stretch', marginTop: 8 }} />
      <Button title={t('GİRİŞ YAP', 'SIGN IN')} icon="log-in" onPress={onSignIn} style={{ alignSelf: 'stretch' }} />
    </View>
  );
}

const styles = themedStyles(() =>
  StyleSheet.create({
  hero: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 26, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  back: { position: 'absolute', left: 14, zIndex: 2 },
  heroIcon: { width: 64, height: 64, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginTop: 18, ...shadow(1) },
  body: { paddingHorizontal: 20, paddingTop: 24 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 13,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: colors.tintRed,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  }),
);
