import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card, Chip, FadeIn, Ionicons, T, colors, goBack, tap, type IconName } from '@/components/ui';
import { SignupPrompt } from '@/components/SignupPrompt';
import { findQuestion } from '@/data/professions';
import { useAccess, type Locked } from '@/lib/access';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

const RED = '#EF5A5A';

export default function MistakeNotebook() {
  const insets = useSafeAreaInsets();
  const { mistakes, stats } = useStore();
  const t = useT();
  const [open, setOpen] = useState<string | null>(null);
  const [locked, setLocked] = useState<Locked | null>(null);
  const { canReview } = useAccess();
  const entries = Object.entries(mistakes)
    .map(([id, m]) => ({ id, m, ref: findQuestion(id) }))
    .filter((e) => e.ref)
    .sort((a, b) => b.m.misses - a.m.misses || b.m.at.localeCompare(a.m.at));

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        <LinearGradient colors={['#FF7B7B', '#D93F3F']} style={[styles.hero, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={() => goBack('/')} hitSlop={12} style={styles.back}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <View style={styles.heroIcon}>
            <Ionicons name="journal" size={30} color={RED} />
          </View>
          <T w="black" size={24} color="#fff" style={{ marginTop: 10 }}>
            {t('Hata Defteri', 'Mistake Notebook')}
          </T>
          <T w="semibold" size={13} color="rgba(255,255,255,0.9)" style={{ textAlign: 'center' }}>
            {t('Zorlandığın sorular burada. Doğru yaptıkça defterden silinir.', 'Questions you struggled with live here. They leave as you get them right.')}
          </T>
          <View style={styles.heroStats}>
            <Chip icon="alert-circle" label={t(`${entries.length} soru`, `${entries.length} questions`)} color={RED} bg="#fff" />
            <Chip icon="checkmark-done" label={t(`${stats.resolved} temizlendi`, `${stats.resolved} cleared`)} color={colors.success} bg="#fff" />
          </View>
        </LinearGradient>

        <View style={styles.body}>
          {entries.length === 0 ? (
            <FadeIn>
              <Card style={styles.empty}>
                <T size={44}>🎉</T>
                <T w="black" size={18} style={{ marginTop: 8 }}>
                  {t('Defterin tertemiz!', 'Your notebook is spotless!')}
                </T>
                <T w="semibold" size={13} color={colors.muted} style={{ textAlign: 'center', marginTop: 4 }}>
                  {t(
                    'Mülakatta 60’ın altında kalan veya pratikte yanlış yaptığın sorular buraya eklenir.',
                    'Questions you score under 60 on in an interview, or get wrong in practice, are added here.',
                  )}
                </T>
              </Card>
            </FadeIn>
          ) : (
            entries.map(({ id, m, ref }, i) => {
              const isOpen = open === id;
              return (
                <FadeIn key={id} delay={i * 40}>
                  <Pressable onPress={() => { tap(); setOpen(isOpen ? null : id); }}>
                    <Card style={{ marginBottom: 12, padding: 16 }}>
                      <View style={styles.row}>
                        <Chip
                          icon={ref!.track.icon as IconName}
                          label={ref!.track.name}
                          color={ref!.profession.color}
                          bg={ref!.profession.color + '18'}
                        />
                        <View style={styles.misses}>
                          <T w="black" size={12} color={RED}>
                            {m.misses}×
                          </T>
                        </View>
                      </View>
                      <T w="extrabold" size={15} style={{ marginTop: 10, lineHeight: 21 }}>
                        {ref!.question.text}
                      </T>
                      {m.concepts.length > 0 && (
                        <View style={styles.tags}>
                          {m.concepts.map((c) => (
                            <Chip key={c} icon="close-circle" label={c} color={RED} bg="#FDECEC" />
                          ))}
                        </View>
                      )}
                      <T w="bold" size={12} color={colors.primary} style={{ marginTop: 10 }}>
                        {isOpen ? t('Gizle ▲', 'Hide ▲') : t('Örnek güçlü cevabı gör ▼', 'See an example strong answer ▼')}
                      </T>
                      {isOpen && (
                        <View style={styles.ideal}>
                          <T w="semibold" size={13} style={{ lineHeight: 19 }}>
                            {ref!.question.ideal}
                          </T>
                        </View>
                      )}
                    </Card>
                  </Pressable>
                </FadeIn>
              );
            })
          )}
        </View>
      </ScrollView>

      {entries.length > 0 && (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
          <Button
            title={t(`TEKRAR ET (${Math.min(entries.length, 8)} SORU)`, `REVIEW (${Math.min(entries.length, 8)} QUESTIONS)`)}
            icon={canReview ? 'refresh' : 'lock-closed'}
            color={RED}
            onPress={() => (canReview ? router.push('/quiz/review') : setLocked('review'))}
          />
        </View>
      )}
      <SignupPrompt reason={locked} onClose={() => setLocked(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingHorizontal: 24, paddingBottom: 22, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  back: { alignSelf: 'flex-start', width: 36, height: 36, justifyContent: 'center', marginLeft: -10 },
  heroIcon: { width: 64, height: 64, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  heroStats: { flexDirection: 'row', gap: 8, marginTop: 14 },
  body: { paddingHorizontal: 16, marginTop: 16 },
  empty: { alignItems: 'center', paddingVertical: 28 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  misses: { backgroundColor: '#FDECEC', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10 },
  ideal: { backgroundColor: '#E8F8F1', borderRadius: 14, padding: 12, marginTop: 10 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'rgba(247,246,251,0.96)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
