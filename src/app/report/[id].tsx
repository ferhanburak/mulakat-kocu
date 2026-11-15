import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bar,
  Button,
  Card,
  Chip,
  CountUp,
  FadeIn,
  Ionicons,
  Ring,
  T,
  colors,
  fonts,
  notify,
  scoreColor,
  shade,
  type IconName,
  themedStyles,
} from '@/components/ui';
import { findUnit } from '@/data/professions';
import { PASS_SCORE, categoryLabel, type CategoryKey } from '@/lib/evaluator';
import { useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

const CAT_ICON: Record<CategoryKey, IconName> = {
  icerik: 'school',
  yapi: 'git-network',
  netlik: 'chatbubble-ellipses',
  somutluk: 'stats-chart',
};

export default function ReportScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getReport, ready, streak } = useStore();
  const t = useT();
  const r = getReport(id);
  const [open, setOpen] = useState<string | null>(null);
  const passed = (r?.overall ?? 0) >= PASS_SCORE;

  useEffect(() => {
    if (r) notify(passed);
  }, [r?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!r) return <T style={{ padding: 20 }}>{ready ? t('Rapor bulunamadı.', 'Report not found.') : t('Yükleniyor…', 'Loading…')}</T>;
  const f = findUnit(r.unitId);
  const accent = passed ? colors.success : colors.warn;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 130 }}>
        <LinearGradient
          colors={passed ? ['#22C389', '#139A66'] : ['#FFB547', '#F08A24']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 48 }]}
        >
          <Pressable onPress={() => router.dismissTo('/')} hitSlop={12} style={[styles.close, { top: insets.top + 12 }]}>
            <Ionicons name="close" size={26} color="rgba(255,255,255,0.9)" />
          </Pressable>
          <FadeIn style={{ alignItems: 'center' }}>
            <View style={styles.ringBg}>
              <Ring value={r.overall} size={150} stroke={13} color="#fff" track="rgba(255,255,255,0.25)">
                <CountUp value={r.overall} style={styles.ringScore} />
                <T w="extrabold" size={12} color="rgba(255,255,255,0.85)" style={{ marginTop: -6 }}>
                  / 100
                </T>
              </Ring>
            </View>
            <T w="black" size={24} color="#fff" style={{ marginTop: 14 }}>
              {passed ? t('Ünite geçildi! 🎉', 'Unit passed! 🎉') : t('Az kaldı! 💪', 'Almost there! 💪')}
            </T>
            <T w="semibold" size={14} color="rgba(255,255,255,0.9)">
              {f?.track.name} · {f?.unit.title}
            </T>
            <View style={styles.chips}>
              <Chip icon="flash" label={`+${r.xp} XP`} color="#5B4BDB" bg="#fff" />
              <Chip icon="flame" label={t(`${streak} gün seri`, `${streak}-day streak`)} color={colors.streak} bg="#fff" />
              {!passed && <Chip icon="lock-open" label={t(`Geçmek için ${PASS_SCORE}`, `${PASS_SCORE} to pass`)} color="#B5621A" bg="#fff" />}
            </View>
          </FadeIn>
        </LinearGradient>

        <View style={styles.body}>
          <FadeIn delay={150}>
            <Card>
              <T w="black" size={17} style={{ marginBottom: 14 }}>
                {t('Kategori puanları', 'Category scores')}
              </T>
              {(Object.keys(r.categories) as CategoryKey[]).map((k, i) => (
                <View key={k} style={styles.catRow}>
                  <View style={[styles.catIcon, { backgroundColor: scoreColor(r.categories[k]) + '1A' }]}>
                    <Ionicons name={CAT_ICON[k]} size={18} color={scoreColor(r.categories[k])} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <View style={styles.catHead}>
                      <T w="extrabold" size={14}>
                        {categoryLabel(k)}
                      </T>
                      <T w="black" size={14} color={scoreColor(r.categories[k])}>
                        {r.categories[k]}
                      </T>
                    </View>
                    <Bar value={r.categories[k]} height={9} delay={300 + i * 120} />
                  </View>
                </View>
              ))}
            </Card>
          </FadeIn>

          <FadeIn delay={250}>
            <ListCard title={t('Güçlü yanların', 'Your strengths')} icon="thumbs-up" color={colors.success} items={r.strengths} />
          </FadeIn>
          <FadeIn delay={320}>
            <ListCard title={t('Geliştirmen gerekenler', 'What to improve')} icon="trending-up" color={colors.danger} items={r.weaknesses} />
          </FadeIn>

          <FadeIn delay={380}>
            <View style={styles.focus}>
              <View style={styles.focusIcon}>
                <Ionicons name="locate" size={22} color="#fff" />
              </View>
              <T w="bold" size={14} color={colors.onOrange} style={{ flex: 1, lineHeight: 20 }}>
                {r.nextFocus}
              </T>
            </View>
          </FadeIn>

          <T w="black" size={18} style={{ marginTop: 26, marginBottom: 12 }}>
            {t('Soru soru geri bildirim', 'Feedback by question')}
          </T>
          {r.answers.map((a, i) => {
            const isOpen = open === a.questionId;
            return (
              <Card key={a.questionId} style={{ marginBottom: 12, padding: 16 }}>
                <Pressable onPress={() => setOpen(isOpen ? null : a.questionId)}>
                  <View style={styles.qHead}>
                    <View style={[styles.qNum, { backgroundColor: scoreColor(a.score) }]}>
                      <T w="black" size={14} color="#fff">
                        {a.score}
                      </T>
                    </View>
                    <T w="extrabold" size={14} style={{ flex: 1, lineHeight: 20 }}>
                      {i + 1}. {a.question}
                    </T>
                    <Ionicons name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color={colors.faint} />
                  </View>
                  <View style={styles.tip}>
                    <Ionicons name="bulb" size={16} color={colors.warn} />
                    <T w="semibold" size={13} style={{ flex: 1, lineHeight: 19 }}>
                      {a.tip}
                    </T>
                  </View>
                </Pressable>
                {isOpen && (
                  <FadeIn style={{ marginTop: 12, gap: 10 }}>
                    {(a.covered.length > 0 || a.missing.length > 0) && (
                      <View style={styles.tags}>
                        {a.covered.map((c) => (
                          <Chip key={c} icon="checkmark-circle" label={c} color={colors.success} bg={colors.tintGreen} />
                        ))}
                        {a.missing.map((c) => (
                          <Chip key={c} icon="close-circle" label={c} color={colors.danger} bg={colors.tintRed} />
                        ))}
                      </View>
                    )}
                    <View style={styles.answerBox}>
                      <T w="black" size={11} color={colors.muted} style={styles.boxLabel}>
                        {t('SENİN CEVABIN', 'YOUR ANSWER')}
                      </T>
                      <T w="semibold" size={13} style={{ lineHeight: 19 }}>
                        {a.answer}
                      </T>
                    </View>
                    <View style={[styles.answerBox, { backgroundColor: colors.tintGreen }]}>
                      <T w="black" size={11} color={colors.success} style={styles.boxLabel}>
                        {t('ÖRNEK GÜÇLÜ CEVAP', 'EXAMPLE STRONG ANSWER')}
                      </T>
                      <T w="semibold" size={13} style={{ lineHeight: 19 }}>
                        {a.ideal}
                      </T>
                    </View>
                  </FadeIn>
                )}
              </Card>
            );
          })}
        </View>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
        <Button
          title={t('TEKRAR', 'RETRY')}
          icon="refresh"
          variant="outline"
          color={f?.profession.color ?? colors.primary}
          onPress={() => router.replace(`/session/${r.unitId}`)}
          style={{ flex: 1 }}
        />
        <Button
          title={t('DEVAM', 'CONTINUE')}
          icon="arrow-forward"
          color={accent === colors.success ? colors.success : f?.profession.color ?? colors.primary}
          onPress={() => (f ? router.dismissTo(`/track/${f.track.id}`) : router.dismissTo('/'))}
          style={{ flex: 1.4 }}
        />
      </View>
    </View>
  );
}

function ListCard({ title, icon, color, items }: { title: string; icon: IconName; color: string; items: string[] }) {
  return (
    <Card style={{ marginTop: 14 }}>
      <View style={styles.listHead}>
        <View style={[styles.listIcon, { backgroundColor: color + '1A' }]}>
          <Ionicons name={icon} size={18} color={color} />
        </View>
        <T w="black" size={17}>
          {title}
        </T>
      </View>
      {items.map((s) => (
        <View key={s} style={styles.li}>
          <View style={[styles.liDot, { backgroundColor: color }]} />
          <T w="semibold" size={14} style={{ flex: 1, lineHeight: 21 }}>
            {s}
          </T>
        </View>
      ))}
    </Card>
  );
}

const styles = themedStyles(() =>
  StyleSheet.create({
  hero: { alignItems: 'center', paddingBottom: 30, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  close: { position: 'absolute', left: 16, zIndex: 2 },
  ringBg: { padding: 8, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.12)' },
  ringScore: { fontFamily: fonts.black, fontSize: 46, color: '#fff' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginTop: 14, paddingHorizontal: 16 },
  body: { paddingHorizontal: 16, marginTop: 18 },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 14 },
  catIcon: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  catHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  listHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 10 },
  listIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  li: { flexDirection: 'row', gap: 10, alignItems: 'flex-start', marginTop: 6 },
  liDot: { width: 7, height: 7, borderRadius: 4, marginTop: 8 },
  focus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 14,
    backgroundColor: colors.tintOrange,
    borderRadius: 20,
    padding: 16,
    borderWidth: 2,
    borderColor: colors.tintOrangeBorder,
  },
  focusIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: shade('#FFB547', -0.1),
    alignItems: 'center',
    justifyContent: 'center',
  },
  qHead: { flexDirection: 'row', alignItems: 'flex-start', gap: 10 },
  qNum: { minWidth: 38, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
  tip: { flexDirection: 'row', gap: 8, marginTop: 10, backgroundColor: colors.tintOrange, borderRadius: 12, padding: 10 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  answerBox: { backgroundColor: colors.bg, borderRadius: 14, padding: 12 },
  boxLabel: { letterSpacing: 0.8, marginBottom: 4 },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: 'rgba(247,246,251,0.96)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  }),
);
