import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GUEST_INTERVIEWS, type Locked } from '@/lib/access';
import { Button, FadeIn, Ionicons, T, colors, type IconName } from './ui';

const REASONS: Record<Locked, { icon: IconName; title: string; desc: string }> = {
  unit: {
    icon: 'lock-closed',
    title: 'Bu ünite üyelere açık',
    desc: 'Misafir modunda her alanın ilk ünitesini deneyebilirsin. Tüm üniteler için üye ol.',
  },
  interviews: {
    icon: 'mic-off',
    title: `${GUEST_INTERVIEWS} mülakat hakkını kullandın`,
    desc: 'Sınırsız mülakat simülasyonu ve detaylı raporlar için üye ol.',
  },
  daily: {
    icon: 'today',
    title: 'Günün Sorusu üyelere özel',
    desc: 'Her gün yeni bir soruyla serini büyütmek için üye ol.',
  },
  review: {
    icon: 'journal',
    title: 'Hata Defteri tekrarı üyelere özel',
    desc: 'Zorlandığın soruları tekrar edip defterden silmek için üye ol.',
  },
};

const PERKS = ['Tüm meslek ve alanlarda sınırsız pratik', 'Günün Sorusu ve Hata Defteri tekrarı', 'Seri, XP ve başarımların kaybolmaz'];

/** Bottom sheet shown when a guest reaches a limit. Signing up keeps the guest's progress. */
export function SignupPrompt({ reason, onClose }: { reason: Locked | null; onClose: () => void }) {
  const insets = useSafeAreaInsets();
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
              {r.title}
            </T>
            <T w="semibold" size={14} color={colors.muted} style={{ marginTop: 4, textAlign: 'center', lineHeight: 20 }}>
              {r.desc}
            </T>
          </View>
          <View style={styles.perks}>
            <T w="black" size={14} color={colors.primary}>
              Ücretsiz üye ol, ilerlemen korunur
            </T>
            {PERKS.map((p) => (
              <View key={p} style={styles.perk}>
                <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                <T w="bold" size={13} style={{ flex: 1 }}>
                  {p}
                </T>
              </View>
            ))}
          </View>
          <Button title="ÜCRETSİZ ÜYE OL" icon="person-add" onPress={() => go('/kayit')} />
          <View style={styles.links}>
            <Pressable onPress={() => go('/giris')} hitSlop={8}>
              <T w="extrabold" size={14} color={colors.primary}>
                Giriş yap
              </T>
            </Pressable>
            <T w="bold" size={14} color={colors.faint}>
              ·
            </T>
            <Pressable onPress={onClose} hitSlop={8}>
              <T w="extrabold" size={14} color={colors.muted}>
                Şimdi değil
              </T>
            </Pressable>
          </View>
        </FadeIn>
      )}
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(23,21,43,0.45)' },
  sheet: { backgroundColor: colors.bg, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 20, paddingTop: 10 },
  grabber: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: colors.border, marginBottom: 16 },
  icon: { width: 68, height: 68, borderRadius: 22, alignItems: 'center', justifyContent: 'center' },
  perks: { backgroundColor: colors.card, borderRadius: 18, padding: 14, gap: 8, marginTop: 18, marginBottom: 18, borderWidth: 2, borderColor: colors.border },
  perk: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  links: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 16 },
});
