import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfessionTile, tileGridStyle } from '@/components/ProfessionTile';
import { Ionicons, T, colors, goBack, themedStyles } from '@/components/ui';
import { findTrack, professions } from '@/data/professions';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

/** Every profession, with the user's own one first. */
export default function AllProfessions() {
  const insets = useSafeAreaInsets();
  const t = useT();
  const { profile } = useStore();
  const mineId = profile ? findTrack(profile.trackId)?.profession.id : undefined;
  const careers = professions.filter((p) => !p.general).sort((a, b) => Number(b.id === mineId) - Number(a.id === mineId));

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingTop: insets.top + 8, paddingHorizontal: 16, paddingBottom: 40 }}>
      <View style={styles.header}>
        <Pressable onPress={() => goBack('/')} hitSlop={12} style={styles.back}>
          <Ionicons name="chevron-back" size={24} color={colors.text} />
        </Pressable>
        <T w="black" size={22}>
          {t('Tüm meslekler', 'All professions')}
        </T>
      </View>
      <View style={tileGridStyle}>
        {careers.map((p, i) => (
          <ProfessionTile key={p.id} p={p} delay={i * 40} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = themedStyles(() =>
  StyleSheet.create({
    header: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 },
    back: { width: 36, height: 36, justifyContent: 'center', marginLeft: -8 },
  }),
);
