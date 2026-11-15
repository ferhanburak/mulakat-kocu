import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bar, FadeIn, GradientIcon, Ionicons, T, colors, goBack, shade, shadow, tap, type IconName, themedStyles } from '@/components/ui';
import { allUnits, findProfession } from '@/data/professions';
import { useT } from '@/lib/i18n';
import { PASS_SCORE } from '@/lib/evaluator';
import { useStore } from '@/lib/store';

const LEVEL_COLOR = { Junior: '#1FB57A', Mid: '#F5A524', Senior: '#EF5A5A' } as const;

export default function ProfessionScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const p = findProfession(id);
  const { bestByUnit } = useStore();
  const tx = useT();
  if (!p) return <T style={{ padding: 20 }}>{tx('Meslek bulunamadı.', 'Profession not found.')}</T>;

  const passed = (unitId: string) => (bestByUnit[unitId] ?? 0) >= PASS_SCORE;
  const units = allUnits(p);
  const totalPassed = units.filter((u) => passed(u.id)).length;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <LinearGradient
        colors={[shade(p.color, 0.1), shade(p.color, -0.15)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 8 }]}
      >
        <Pressable onPress={() => goBack('/')} hitSlop={12} style={styles.back}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <View style={styles.headRow}>
          <View style={styles.headIcon}>
            <Ionicons name={p.icon as IconName} size={30} color={p.color} />
          </View>
          <View style={{ flex: 1 }}>
            <T w="black" size={22} color="#fff">
              {p.name}
            </T>
            <T w="semibold" size={13} color="rgba(255,255,255,0.85)">
              {p.tracks.length} {tx('alan', 'fields')} · {units.length} {tx('ünite', 'units')}
            </T>
          </View>
        </View>
        <View style={styles.headProgress}>
          <View style={{ flex: 1 }}>
            <Bar value={(totalPassed / units.length) * 100} color="#fff" height={8} />
          </View>
          <T w="black" size={13} color="#fff">
            {totalPassed}/{units.length} {tx('ünite', 'units')}
          </T>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.list}>
        <T w="black" size={18} style={{ marginBottom: 4 }}>
          Alanını seç
        </T>
        <T w="semibold" size={13} color={colors.muted} style={{ marginBottom: 14 }}>
          {tx('Her alanın kendi Junior → Senior yolu var.', 'Each field has its own Junior → Senior path.')}
        </T>
        {p.tracks.map((t, i) => {
          const done = t.units.filter((u) => passed(u.id)).length;
          const levels = [...new Set(t.units.map((u) => u.level))];
          const started = t.units.some((u) => bestByUnit[u.id] !== undefined);
          return (
            <FadeIn key={t.id} delay={i * 50}>
              <Pressable
                onPress={() => {
                  tap();
                  router.push(`/track/${t.id}`);
                }}
                style={({ pressed }) => [styles.card, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}
              >
                <GradientIcon icon={t.icon as IconName} color={p.color} size={50} radius={15} />
                <View style={{ flex: 1, gap: 2 }}>
                  <View style={styles.titleRow}>
                    <T w="black" size={16} style={{ flexShrink: 1 }}>
                      {t.name}
                    </T>
                    {done === t.units.length ? (
                      <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                    ) : started ? (
                      <View style={[styles.badge, { backgroundColor: p.color + '1A' }]}>
                        <T w="black" size={10} color={p.color}>
                          {tx('DEVAM', 'CONTINUE')}
                        </T>
                      </View>
                    ) : null}
                  </View>
                  <T w="semibold" size={12} color={colors.muted} numberOfLines={1}>
                    {t.tagline}
                  </T>
                  <View style={styles.levels}>
                    {levels.map((l) => (
                      <View key={l} style={[styles.level, { borderColor: LEVEL_COLOR[l] + '55' }]}>
                        <View style={[styles.levelDot, { backgroundColor: LEVEL_COLOR[l] }]} />
                        <T w="bold" size={11} color={colors.muted}>
                          {l}
                        </T>
                      </View>
                    ))}
                  </View>
                  <View style={styles.progressRow}>
                    <View style={{ flex: 1 }}>
                      <Bar value={(done / t.units.length) * 100} color={p.color} height={6} />
                    </View>
                    <T w="extrabold" size={11} color={colors.muted}>
                      {done}/{t.units.length}
                    </T>
                  </View>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.faint} />
              </Pressable>
            </FadeIn>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = themedStyles(() =>
  StyleSheet.create({
  header: { paddingHorizontal: 18, paddingBottom: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  back: { width: 36, height: 36, justifyContent: 'center', marginLeft: -6 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 4 },
  headIcon: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  headProgress: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18 },
  list: { padding: 16, paddingBottom: 40 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 14,
    marginBottom: 12,
    ...shadow(1),
  },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  badge: { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  levels: { flexDirection: 'row', gap: 6, marginTop: 6 },
  level: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderRadius: 999, paddingHorizontal: 7, paddingVertical: 2 },
  levelDot: { width: 6, height: 6, borderRadius: 3 },
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  }),
);
