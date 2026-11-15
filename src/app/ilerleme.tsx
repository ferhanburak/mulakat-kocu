import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Circle, Line, Path, Text as SvgText } from 'react-native-svg';
import { Bar, Button, Card, FadeIn, Ionicons, T, colors, fonts, goBack, scoreColor, shadow, tap, type IconName } from '@/components/ui';
import { findUnit } from '@/data/professions';
import { PASS_SCORE, categoryLabel, type CategoryKey, type Report } from '@/lib/evaluator';
import { locale, useLang, useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

const CATS: CategoryKey[] = ['icerik', 'yapi', 'netlik', 'somutluk'];
const CAT_ICON: Record<CategoryKey, IconName> = { icerik: 'school', yapi: 'git-network', netlik: 'chatbubble-ellipses', somutluk: 'stats-chart' };
/** How many recent interviews the chart and the averages look at. */
const WINDOW = 12;

const avg = (xs: number[]) => (xs.length ? Math.round(xs.reduce((a, b) => a + b, 0) / xs.length) : 0);

export default function ProgressScreen() {
  const insets = useSafeAreaInsets();
  const t = useT();
  const lang = useLang();
  const { reports } = useStore();
  const { width } = useWindowDimensions();
  // Oldest first, last WINDOW interviews.
  const series = [...reports].reverse().slice(-WINDOW);
  const recent = series.slice(-3);
  const earlier = series.slice(-6, -3);
  const trend = earlier.length ? avg(recent.map((r) => r.overall)) - avg(earlier.map((r) => r.overall)) : null;
  const catAvg = Object.fromEntries(CATS.map((k) => [k, avg(series.map((r) => r.categories[k]))])) as Record<CategoryKey, number>;
  const catTrend = Object.fromEntries(
    CATS.map((k) => [k, earlier.length ? avg(recent.map((r) => r.categories[k])) - avg(earlier.map((r) => r.categories[k])) : null]),
  ) as Record<CategoryKey, number | null>;
  const weakest = [...CATS].sort((a, b) => catAvg[a] - catAvg[b])[0];
  const best = Math.max(0, ...reports.map((r) => r.overall));
  const lastUnit = reports[0] ? findUnit(reports[0].unitId) : undefined;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient colors={[colors.primary, colors.primary2]} style={[styles.hero, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => goBack('/profil')} hitSlop={12} style={styles.back}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <View style={styles.heroIcon}>
          <Ionicons name="trending-up" size={30} color={colors.primary} />
        </View>
        <T w="black" size={24} color="#fff" style={{ marginTop: 10 }}>
          {t('Gelişimin', 'Your progress')}
        </T>
        <T w="semibold" size={13} color="rgba(255,255,255,0.9)" style={{ textAlign: 'center' }}>
          {t(
            `Son ${Math.min(WINDOW, Math.max(1, reports.length))} mülakatındaki puanların`,
            `Your scores over your last ${Math.min(WINDOW, Math.max(1, reports.length))} interviews`,
          )}
        </T>
      </LinearGradient>

      <View style={styles.body}>
        {reports.length === 0 ? (
          <FadeIn>
            <Card style={styles.empty}>
              <Ionicons name="analytics" size={44} color={colors.faint} />
              <T w="black" size={18} style={{ marginTop: 8 }}>
                {t('Henüz veri yok', 'No data yet')}
              </T>
              <T w="semibold" size={13} color={colors.muted} style={{ textAlign: 'center', marginTop: 4, marginBottom: 16 }}>
                {t('İlk mülakatını tamamladığında puan gelişimin burada görünür.', 'Finish your first interview and your score history shows up here.')}
              </T>
              <Button title={t('MÜLAKATA BAŞLA', 'START AN INTERVIEW')} icon="mic" onPress={() => goBack('/')} />
            </Card>
          </FadeIn>
        ) : (
          <>
            <View style={styles.stats}>
              <Stat icon="mic" color={colors.primary} value={`${reports.length}`} label={t('Mülakat', 'Interviews')} />
              <Stat icon="ribbon" color={colors.success} value={`${best}`} label={t('En yüksek', 'Best')} />
              <Stat
                icon={trend === null ? 'remove' : trend >= 0 ? 'arrow-up' : 'arrow-down'}
                color={trend === null ? colors.muted : trend >= 0 ? colors.success : colors.danger}
                value={trend === null ? '—' : `${trend > 0 ? '+' : ''}${trend}`}
                label={t('Son 3 mülakat', 'Last 3 interviews')}
              />
            </View>

            <FadeIn>
              <Card style={{ marginTop: 14, paddingHorizontal: 12 }}>
                <T w="black" size={17} style={{ marginLeft: 6 }}>
                  {t('Genel puan', 'Overall score')}
                </T>
                <T w="semibold" size={12} color={colors.muted} style={{ marginLeft: 6, marginBottom: 6 }}>
                  {t(`Kesikli çizgi: geçme puanı (${PASS_SCORE})`, `Dashed line: passing score (${PASS_SCORE})`)}
                </T>
                <ScoreChart reports={series} width={Math.min(width, 640) - 32 - 24} lang={lang} />
              </Card>
            </FadeIn>

            <FadeIn delay={100}>
              <View style={styles.weak}>
                <View style={styles.weakIcon}>
                  <Ionicons name={CAT_ICON[weakest]} size={22} color="#fff" />
                </View>
                <View style={{ flex: 1 }}>
                  <T w="black" size={12} color="#8A4B00" style={{ letterSpacing: 0.8 }}>
                    {t('EN ZAYIF KATEGORİN', 'YOUR WEAKEST CATEGORY')}
                  </T>
                  <T w="black" size={18} color="#7A4300">
                    {categoryLabel(weakest)} · {catAvg[weakest]}
                  </T>
                  <T w="semibold" size={13} color="#7A4300" style={{ marginTop: 2, lineHeight: 19 }}>
                    {TIPS[weakest][lang]}
                  </T>
                </View>
              </View>
            </FadeIn>

            <FadeIn delay={160}>
              <Card style={{ marginTop: 14 }}>
                <T w="black" size={17} style={{ marginBottom: 12 }}>
                  {t('Kategoriler', 'Categories')}
                </T>
                {CATS.map((k, i) => (
                  <View key={k} style={[styles.catRow, i > 0 && { marginTop: 12 }]}>
                    <View style={[styles.catIcon, { backgroundColor: scoreColor(catAvg[k]) + '1F' }]}>
                      <Ionicons name={CAT_ICON[k]} size={18} color={scoreColor(catAvg[k])} />
                    </View>
                    <View style={{ flex: 1 }}>
                      <View style={styles.catHead}>
                        <T w="extrabold" size={14}>
                          {categoryLabel(k)}
                        </T>
                        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                          {catTrend[k] !== null && catTrend[k] !== 0 && (
                            <T w="black" size={12} color={(catTrend[k] ?? 0) > 0 ? colors.success : colors.danger}>
                              {(catTrend[k] ?? 0) > 0 ? '▲' : '▼'} {Math.abs(catTrend[k] ?? 0)}
                            </T>
                          )}
                          <T w="black" size={14} color={scoreColor(catAvg[k])}>
                            {catAvg[k]}
                          </T>
                        </View>
                      </View>
                      <Bar value={catAvg[k]} height={9} delay={200 + i * 100} />
                    </View>
                  </View>
                ))}
              </Card>
            </FadeIn>

            {lastUnit && (
              <Button
                title={t('ZAYIF YANINI ÇALIŞ', 'WORK ON IT')}
                icon="mic"
                style={{ marginTop: 18 }}
                onPress={() => {
                  tap();
                  router.push(`/track/${lastUnit.track.id}`);
                }}
              />
            )}
          </>
        )}
      </View>
    </ScrollView>
  );
}

const TIPS: Record<CategoryKey, { tr: string; en: string }> = {
  icerik: {
    tr: 'Cevaplarında sorunun beklediği temel kavramlar eksik kalıyor. Raporlardaki örnek cevaplara bakıp kavramları not et.',
    en: 'Your answers miss key concepts the question expects. Study the example answers in your reports and note the concepts.',
  },
  yapi: {
    tr: 'Cevaplarını bir akışa oturt: davranışsal sorularda STAR, diğerlerinde "önce / sonra / son olarak".',
    en: 'Give your answers a flow: STAR for behavioural questions, "first / then / finally" for the rest.',
  },
  netlik: {
    tr: 'Cevaplarının uzunluğunu dengele: 3–5 cümle, kısa cümleler ve az dolgu kelime.',
    en: 'Balance your answer length: 3–5 sentences, short sentences and few filler words.',
  },
  somutluk: {
    tr: 'İddialarını rakamlarla ve gerçek örneklerle destekle: "örneğin", "%20", "geçen yıl" gibi.',
    en: 'Back up your claims with numbers and real examples: "for example", "20%", "last year".',
  },
};

function ScoreChart({ reports, width, lang }: { reports: Report[]; width: number; lang: 'tr' | 'en' }) {
  const H = 170;
  const left = 30;
  const right = 12;
  const top = 12;
  const bottom = 26;
  const w = Math.max(120, width);
  const plotW = w - left - right;
  const plotH = H - top - bottom;
  const x = (i: number) => left + (reports.length === 1 ? plotW / 2 : (i / (reports.length - 1)) * plotW);
  const y = (v: number) => top + plotH - (v / 100) * plotH;
  const points = reports.map((r, i) => ({ x: x(i), y: y(r.overall), r }));
  const line = points.map((p, i) => `${i ? 'L' : 'M'} ${p.x} ${p.y}`).join(' ');
  const area = points.length > 1 ? `${line} L ${points[points.length - 1].x} ${top + plotH} L ${points[0].x} ${top + plotH} Z` : '';
  const fmt = (iso: string) => new Date(iso).toLocaleDateString(locale(lang), { day: 'numeric', month: 'short' });
  const labelIdx = reports.length <= 4 ? reports.map((_, i) => i) : [0, Math.floor((reports.length - 1) / 2), reports.length - 1];

  return (
    <Svg width={w} height={H}>
      {[0, 50, 100].map((v) => (
        <Line key={v} x1={left} x2={w - right} y1={y(v)} y2={y(v)} stroke={colors.border} strokeWidth={1} />
      ))}
      {[0, 50, 100].map((v) => (
        <SvgText key={`l${v}`} x={left - 6} y={y(v) + 4} fontSize={10} fontFamily={fonts.bold} fill={colors.muted} textAnchor="end">
          {v}
        </SvgText>
      ))}
      <Line x1={left} x2={w - right} y1={y(PASS_SCORE)} y2={y(PASS_SCORE)} stroke={colors.warn} strokeWidth={1.5} strokeDasharray="5 5" />
      {area ? <Path d={area} fill={colors.primary} fillOpacity={0.1} /> : null}
      {points.length > 1 && <Path d={line} stroke={colors.primary} strokeWidth={3} fill="none" strokeLinejoin="round" strokeLinecap="round" />}
      {points.map((p, i) => (
        <Circle
          key={p.r.id}
          cx={p.x}
          cy={p.y}
          r={i === points.length - 1 ? 6 : 4}
          fill={i === points.length - 1 ? scoreColor(p.r.overall) : colors.card}
          stroke={scoreColor(p.r.overall)}
          strokeWidth={2.5}
        />
      ))}
      {points.length > 0 && (
        <SvgText
          x={Math.min(points[points.length - 1].x, w - right - 4)}
          y={Math.max(points[points.length - 1].y - 11, 10)}
          fontSize={12}
          fontFamily={fonts.black}
          fill={scoreColor(points[points.length - 1].r.overall)}
          textAnchor={points.length > 1 ? 'end' : 'middle'}
        >
          {points[points.length - 1].r.overall}
        </SvgText>
      )}
      {labelIdx.map((i) => (
        <SvgText
          key={`d${i}`}
          x={points[i].x}
          y={H - 6}
          fontSize={10}
          fontFamily={fonts.bold}
          fill={colors.muted}
          textAnchor={i === 0 && reports.length > 1 ? 'start' : i === reports.length - 1 && reports.length > 1 ? 'end' : 'middle'}
        >
          {fmt(points[i].r.createdAt)}
        </SvgText>
      ))}
    </Svg>
  );
}

function Stat({ icon, color, value, label }: { icon: IconName; color: string; value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={20} color={color} />
      <T w="black" size={20} style={{ marginTop: 4 }}>
        {value}
      </T>
      <T w="bold" size={11} color={colors.muted} numberOfLines={1}>
        {label}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingHorizontal: 24, paddingBottom: 22, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  back: { alignSelf: 'flex-start', width: 36, height: 36, justifyContent: 'center', marginLeft: -10 },
  heroIcon: { width: 64, height: 64, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  body: { paddingHorizontal: 16, marginTop: 16 },
  empty: { alignItems: 'center', paddingVertical: 28 },
  stats: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, alignItems: 'center', backgroundColor: colors.card, borderRadius: 18, paddingVertical: 12, paddingHorizontal: 6, ...shadow(1) },
  weak: { flexDirection: 'row', gap: 12, marginTop: 14, backgroundColor: '#FFF3E0', borderRadius: 20, padding: 16, borderWidth: 2, borderColor: '#FFE0B3' },
  weakIcon: { width: 44, height: 44, borderRadius: 14, backgroundColor: '#F5A524', alignItems: 'center', justifyContent: 'center' },
  catRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  catIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  catHead: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
});
