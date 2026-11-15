import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, FadeIn, Ionicons, T, colors, shadow, tap, type IconName } from '@/components/ui';
import { useStore } from '@/lib/store';

const FEATURES: { icon: IconName; color: string; text: string }[] = [
  { icon: 'mic', color: '#FFE066', text: '17 meslekte gerçekçi mülakat simülasyonu' },
  { icon: 'analytics', color: '#9EF0C9', text: 'Her cevaba detaylı rapor ve örnek güçlü cevap' },
  { icon: 'flame', color: '#FFB547', text: 'Günlük seri, XP ve başarımlarla düzenli pratik' },
];

export default function Welcome() {
  const insets = useSafeAreaInsets();
  const { startGuest } = useStore();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ flexGrow: 1, paddingBottom: insets.bottom + 24 }}>
      <LinearGradient
        colors={[colors.primary, colors.primary2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 40 }]}
      >
        <FadeIn style={{ alignItems: 'center' }}>
          <View style={styles.logo}>
            <Ionicons name="chatbubbles" size={44} color={colors.primary} />
          </View>
          <T w="black" size={32} color="#fff" style={{ marginTop: 16 }}>
            Mülakat Koçu
          </T>
          <T w="semibold" size={15} color="rgba(255,255,255,0.88)" style={{ textAlign: 'center', marginTop: 4 }}>
            Her gün birkaç dakikayla mülakata hazır ol.
          </T>
        </FadeIn>
        <View style={styles.features}>
          {FEATURES.map((f, i) => (
            <FadeIn key={f.text} delay={120 + i * 80} style={styles.feature}>
              <View style={styles.featureIcon}>
                <Ionicons name={f.icon} size={18} color={f.color} />
              </View>
              <T w="bold" size={14} color="#fff" style={{ flex: 1 }}>
                {f.text}
              </T>
            </FadeIn>
          ))}
        </View>
      </LinearGradient>

      <FadeIn delay={360} style={styles.actions}>
        <Button title="HESAP OLUŞTUR" icon="person-add" onPress={() => router.push('/kayit')} />
        <Button title="GİRİŞ YAP" variant="outline" icon="log-in" onPress={() => router.push('/giris')} style={{ marginTop: 12 }} />
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
            Misafir olarak dene
          </T>
          <Ionicons name="arrow-forward" size={16} color={colors.primary} />
        </Pressable>
        <T w="semibold" size={12} color={colors.muted} style={{ textAlign: 'center', marginTop: 6 }}>
          Misafir modunda 3 mülakat hakkın var. Sonra üye olursan ilerlemen korunur.
        </T>
      </FadeIn>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: 24, paddingBottom: 36, borderBottomLeftRadius: 36, borderBottomRightRadius: 36 },
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
});
