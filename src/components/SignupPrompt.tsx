import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GUEST_INTERVIEWS, type Locked } from '@/lib/access';
import { EMAIL_AUTH } from '@/lib/auth';
import { pick, useLang, useT, type Bi } from '@/lib/i18n';
import { GoogleButton } from './AuthForm';
import { Button, FadeIn, Ionicons, T, colors, type IconName, themedStyles } from './ui';

const REASONS: Record<Locked, { icon: IconName; title: Bi; desc: Bi }> = {
  unit: {
    icon: 'lock-closed',
    title: { tr: 'Bu ünite üyelere açık', en: 'This unit is for members' },
    desc: {
      tr: 'Misafir modunda her alanın ilk ünitesini deneyebilirsin. Tüm üniteler için üye ol.',
      en: 'As a guest you can try the first unit of each field. Sign up for every unit.',
    },
  },
  interviews: {
    icon: 'mic-off',
    title: { tr: `${GUEST_INTERVIEWS} mülakat hakkını kullandın`, en: `You've used your ${GUEST_INTERVIEWS} guest interviews` },
    desc: { tr: 'Sınırsız mülakat simülasyonu ve detaylı raporlar için üye ol.', en: 'Sign up for unlimited interview simulations and detailed reports.' },
  },
  daily: {
    icon: 'today',
    title: { tr: 'Günün Sorusu üyelere özel', en: 'Question of the Day is for members' },
    desc: { tr: 'Her gün yeni bir soruyla serini büyütmek için üye ol.', en: 'Sign up to grow your streak with a new question every day.' },
  },
  review: {
    icon: 'journal',
    title: { tr: 'Hata Defteri tekrarı üyelere özel', en: 'Notebook review is for members' },
    desc: { tr: 'Zorlandığın soruları tekrar edip defterden silmek için üye ol.', en: 'Sign up to review the questions you struggled with and clear them.' },
  },
};

const PERKS: Bi[] = [
  { tr: 'Tüm meslek ve alanlarda sınırsız pratik', en: 'Unlimited practice in every profession and field' },
  { tr: 'Günün Sorusu ve Hata Defteri tekrarı', en: 'Question of the Day and Mistake Notebook review' },
  { tr: 'Seri, XP ve başarımların kaybolmaz', en: 'Your streak, XP and badges are never lost' },
];

/** Bottom sheet shown when a guest reaches a limit. Signing up keeps the guest's progress. */
export function SignupPrompt({ reason, onClose }: { reason: Locked | null; onClose: () => void }) {
  const insets = useSafeAreaInsets();
  const t = useT();
  const lang = useLang();
  const r = reason ? REASONS[reason] : null;
  const go = (path: '/kayit' | '/giris') => {
    onClose();
    router.push(path);
  };
  return (
    <Modal visible={!!r} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose} />
      {r && (
        <FadeIn style={[styles.sheet, { paddingBottom: insets.bottom + 20 }]}>
          <View style={styles.grabber} />
          <View style={{ alignItems: 'center' }}>
            <LinearGradient colors={[colors.primary, colors.primary2]} style={styles.icon}>
              <Ionicons name={r.icon} size={30} color="#fff" />
            </LinearGradient>
            <T w="black" size={21} style={{ marginTop: 12, textAlign: 'center' }}>
              {pick(r.title, lang)}
            </T>
            <T w="semibold" size={14} color={colors.muted} style={{ marginTop: 4, textAlign: 'center', lineHeight: 20 }}>
              {pick(r.desc, lang)}
            </T>
          </View>
          <View style={styles.perks}>
            <T w="black" size={14} color={colors.primary}>
              {t('Ücretsiz üye ol, ilerlemen korunur', 'Sign up free and keep your progress')}
            </T>
            {PERKS.map((p) => (
              <View key={p.en} style={styles.perk}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                <T w="bold" size={13} style={{ flex: 1 }}>
                  {pick(p, lang)}
                </T>
              </View>
            ))}
          </View>
          {EMAIL_AUTH ? (
            <Button title={t('ÜCRETSİZ ÜYE OL', 'SIGN UP FREE')} icon="person-add" onPress={() => go('/kayit')} />
          ) : (
            <GoogleButton />
          )}
          <View style={styles.links}>
            {EMAIL_AUTH && (
              <>
                <Pressable onPress={() => go('/giris')} hitSlop={8}>
                  <T w="extrabold" size={14} color={colors.primary}>
                    {t('Giriş yap', 'Sign in')}
                  </T>
                </Pressable>
                <T w="bold" size={14} color={colors.faint}>
                  ·
                </T>
              </>
            )}
            <Pressable onPress={onClose} hitSlop={8}>
              <T w="extrabold" size={14} color={colors.muted}>
                {t('Şimdi değil', 'Not now')}
              </T>
            </Pressable>
          </View>
        </FadeIn>
      )}
    </Modal>
  );
}

const styles = themedStyles(() =>
  StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(23,21,43,0.45)' },
  sheet: { backgroundColor: colors.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 20, paddingTop: 10 },
  grabber: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: colors.border, marginBottom: 16 },
  icon: { width: 68, height: 68, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  perks: { backgroundColor: colors.card, borderRadius: 18, padding: 14, gap: 8, marginTop: 18, marginBottom: 18, borderWidth: 2, borderColor: colors.border },
  perk: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  links: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 16 },
  }),
);
