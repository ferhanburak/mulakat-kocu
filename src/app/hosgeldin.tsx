import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoogleButton } from '@/components/AuthForm';
import { Button, FadeIn, Ionicons, T, colors, shadow, tap, type IconName, themedStyles } from '@/components/ui';
import { EMAIL_AUTH } from '@/lib/auth';
import { pick, setLang, useLang, useT, type Bi } from '@/lib/i18n';
import { useStore } from '@/lib/store';

const FEATURES: { icon: IconName; color: string; text: Bi }[] = [
  { icon: 'mic', color: '#FFE066', text: { tr: '21 meslekte gerçekçi mülakat simülasyonu', en: 'Realistic interview simulations in 21 professions' } },
  { icon: 'people', color: '#9EF0C9', text: { tr: 'Farklı karakterde mülakatçılar, doğal seslerle', en: 'Interviewers with different personalities and natural voices' } },
  { icon: 'analytics', color: '#FFB547', text: { tr: 'Her cevaba detaylı rapor ve örnek güçlü cevap', en: 'A detailed report and an example strong answer for every reply' } },
];

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const { startGuest } = useStore();
  const t = useT();
  const lang = useLang();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 24 }}>
      <LinearGradient
        colors={[colors.primary, colors.primary2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 40 }]}
      >
        <Pressable
          onPress={() => {
            tap();
            setLang(lang === 'tr' ? 'en' : 'tr');
          }}
          hitSlop={8}
          style={[styles.langBtn, { top: insets.top + 12 }]}
        >
          <Ionicons name="language" size={16} color="#fff" />
          <T w="black" size={13} color="#fff">
            {lang === 'tr' ? 'EN' : 'TR'}
          </T>
        </Pressable>
        <FadeIn style={{ alignItems: 'center' }}>
          <View style={styles.logo}>
            <Ionicons name="chatbubbles" size={44} color={colors.primary} />
          </View>
          <T w="black" size={32} color="#fff" style={{ marginTop: 16 }}>
            Prova
          </T>
          <T w="extrabold" size={16} color="#fff">
            {t('Mülakat Koçu', 'Interview Coach')}
          </T>
          <T w="semibold" size={15} color="rgba(255,255,255,0.88)" style={{ textAlign: 'center', marginTop: 4 }}>
            {t('Her gün birkaç dakikayla mülakata hazır ol.', 'Get interview-ready with a few minutes a day.')}
          </T>
        </FadeIn>
        <View style={styles.features}>
          {FEATURES.map((f, i) => (
            <FadeIn key={f.icon} delay={120 + i * 80} style={styles.feature}>
              <View style={styles.featureIcon}>
                <Ionicons name={f.icon} size={18} color={f.color} />
              </View>
              <T w="bold" size={14} color="#fff" style={{ flex: 1 }}>
                {pick(f.text, lang)}
              </T>
            </FadeIn>
          ))}
        </View>
      </LinearGradient>

      <FadeIn delay={360} style={styles.actions}>
        <GoogleButton />
        {EMAIL_AUTH && (
          <>
            <Button title={t('E-POSTAYLA ÜYE OL', 'SIGN UP WITH EMAIL')} icon="mail" onPress={() => router.push('/kayit')} style={{ marginTop: 12 }} />
            <Button title={t('GİRİŞ YAP', 'SIGN IN')} variant="outline" icon="log-in" onPress={() => router.push('/giris')} style={{ marginTop: 12 }} />
          </>
        )}
        <Pressable
          onPress={() => {
            tap();
            startGuest();
            router.replace('/profil-kurulum');
          }}
          hitSlop={8}
          style={({ pressed }) => [styles.guest, { opacity: pressed ? 0.6 : 1 }]}
        >
          <T w="extrabold" size={15} color={colors.primary}>
            {t('Misafir olarak dene', 'Try as a guest')}
          </T>
          <Ionicons name="arrow-forward" size={16} color={colors.primary} />
        </Pressable>
        <T w="semibold" size={12} color={colors.muted} style={{ textAlign: 'center', marginTop: 6 }}>
          {t('Misafir modunda 3 mülakat hakkın var. Sonra üye olursan ilerlemen korunur.', 'Guests get 3 interviews. Sign up later and your progress is kept.')}
        </T>
      </FadeIn>
    </ScrollView>
  );
}

const styles = themedStyles(() =>
  StyleSheet.create({
  hero: { paddingHorizontal: 24, paddingBottom: 36, borderBottomLeftRadius: 36, borderBottomRightRadius: 36 },
  langBtn: {
    position: 'absolute',
    right: 16,
    zIndex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  logo: {
    width: 92,
    height: 92,
    borderRadius: 30,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ rotate: '-6deg' }],
    ...shadow(2),
  },
  features: { marginTop: 28, gap: 10 },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  featureIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    backgroundColor: 'rgba(255,255,255,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions: { paddingHorizontal: 20, paddingTop: 28 },
  guest: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 20, paddingVertical: 6 },
  }),
);
