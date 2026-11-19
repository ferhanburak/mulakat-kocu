import { router } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { Bar, FadeIn, GradientIcon, Ionicons, T, colors, shadow, tap, type IconName, themedStyles } from '@/components/ui';
import { allUnits, type Profession } from '@/data/professions';
import { PASS_SCORE } from '@/lib/evaluator';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

/** One profession card: icon, name, field count and progress. Half width in a grid, or `wide`. */
export function ProfessionTile({ p, delay = 0, wide = false }: { p: Profession; delay?: number; wide?: boolean }) {
  const t = useT();
  const { bestByUnit } = useStore();
  const units = allUnits(p);
  const passed = units.filter((u) => (bestByUnit[u.id] ?? 0) >= PASS_SCORE).length;
  return (
    <FadeIn delay={delay} style={wide ? styles.wideWrap : styles.tileWrap}>
      <Pressable
        onPress={() => {
          tap();
          router.push(`/profession/${p.id}`);
        }}
        style={({ pressed }) => [styles.tile, { transform: [{ scale: pressed ? 0.97 : 1 }] }]}
      >
        <GradientIcon icon={p.icon as IconName} color={p.color} size={46} />
        <T w="black" size={15} style={{ marginTop: 12, minHeight: wide ? undefined : 40 }} numberOfLines={2}>
          {p.name}
        </T>
        <T w="semibold" size={12} color={colors.muted} numberOfLines={2} style={{ minHeight: wide ? undefined : 32 }}>
          {p.tagline}
        </T>
        <View style={[styles.trackPill, { backgroundColor: p.color + '14' }]}>
          <Ionicons name="git-branch" size={12} color={p.color} />
          <T w="extrabold" size={11} color={p.color}>
            {p.tracks.length} {t('alan', p.tracks.length > 1 ? 'fields' : 'field')}
          </T>
        </View>
        <View style={styles.tileFoot}>
          <View style={{ flex: 1 }}>
            <Bar value={(passed / units.length) * 100} color={p.color} height={7} />
          </View>
          <T w="extrabold" size={11} color={colors.muted}>
            {passed}/{units.length}
          </T>
        </View>
      </Pressable>
    </FadeIn>
  );
}

export const tileGridStyle = { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 } as const;

const styles = themedStyles(() =>
  StyleSheet.create({
    tileWrap: { width: '50%', padding: 6 },
    wideWrap: { width: '100%', padding: 6 },
    tile: { backgroundColor: colors.card, borderRadius: 22, padding: 16, ...shadow(1) },
    tileFoot: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 10 },
    trackPill: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      alignSelf: 'flex-start',
      borderRadius: 999,
      paddingHorizontal: 8,
      paddingVertical: 3,
      marginTop: 8,
    },
  }),
);
