import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Animated, Easing, Modal, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import { SignupPrompt } from '@/components/SignupPrompt';
import { Bar, FadeIn, Ionicons, T, colors, goBack, shade, shadow, tap, type IconName } from '@/components/ui';
import { INTERVIEWERS } from '@/data/interviewers';
import { findTrack, type Unit } from '@/data/professions';
import { GUEST_INTERVIEWS, useAccess, type Locked } from '@/lib/access';
import { PASS_SCORE } from '@/lib/evaluator';
import { pick, upper, useLang, useT } from '@/lib/i18n';
import { useStore } from '@/lib/store';

const ROW = 200;
const TOP = 90;
const OFFSETS = [0, 72, 0, -72];
const stars = (best: number) => (best >= 85 ? 3 : best >= 70 ? 2 : best >= PASS_SCORE ? 1 : 0);

export default function TrackScreen() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const found = findTrack(id);
  const { bestByUnit, bestQuizByUnit, isUnlocked } = useStore();
  const [width, setWidth] = useState(0);
  const [sheet, setSheet] = useState<string | null>(null);
  const [locked, setLocked] = useState<Locked | null>(null);
  const access = useAccess();
  const t = useT();
  if (!found) return <T style={{ padding: 20 }}>{t('Alan bulunamadı.', 'Field not found.')}</T>;
  const { profession, track } = found;
  const p = {
    color: profession.color,
    icon: track.icon,
    name: track.name,
    tagline: `${profession.name} · ${track.tagline}`,
    units: track.units,
  };

  const ids = p.units.map((u) => u.id);
  const passedCount = p.units.filter((u) => (bestByUnit[u.id] ?? 0) >= PASS_SCORE).length;
  const currentIdx = p.units.findIndex((u, i) => isUnlocked(ids, i) && (bestByUnit[u.id] ?? 0) < PASS_SCORE);
  const allDone = passedCount === p.units.length;

  const nodes = [...p.units.map((u) => u.id), 'trophy'];
  const center = (i: number) => ({ x: width / 2 + OFFSETS[i % OFFSETS.length], y: TOP + i * ROW });
  const height = TOP + (nodes.length - 1) * ROW + 110;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <LinearGradient
        colors={[shade(p.color, 0.1), shade(p.color, -0.15)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 8 }]}
      >
        <Pressable onPress={() => goBack(`/profession/${profession.id}`)} hitSlop={12} style={styles.back}>
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
              {p.tagline}
            </T>
          </View>
        </View>
        <View style={styles.headProgress}>
          <View style={{ flex: 1 }}>
            <Bar value={(passedCount / p.units.length) * 100} color="#fff" height={8} />
          </View>
          <T w="black" size={13} color="#fff">
            {passedCount}/{p.units.length} {t('ünite', 'units')}
          </T>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={{ height }} onLayout={(e) => setWidth(e.nativeEvent.layout.width)}>
          {width > 0 && (
            <>
              <Svg width={width} height={height} style={StyleSheet.absoluteFill}>
                {nodes.slice(1).map((_, i) => {
                  const a = center(i);
                  const b = center(i + 1);
                  const my = (a.y + b.y) / 2;
                  const done = (bestByUnit[nodes[i]] ?? 0) >= PASS_SCORE;
                  return (
                    <Path
                      key={i}
                      d={`M ${a.x} ${a.y} C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`}
                      stroke={done ? p.color : '#DCD9E8'}
                      strokeWidth={7}
                      strokeLinecap="round"
                      strokeDasharray="1 14"
                      fill="none"
                    />
                  );
                })}
              </Svg>

              {p.units.map((u, i) => {
                const best = bestByUnit[u.id];
                const unlocked = isUnlocked(ids, i);
                const guestLocked = !access.canOpenUnit(u.id);
                const passed = (best ?? 0) >= PASS_SCORE;
                const current = i === currentIdx;
                const size = current ? 86 : 74;
                const c = center(i);
                const fill = passed ? colors.success : unlocked ? p.color : '#E2DFEC';
                return (
                  <View key={u.id} style={[styles.nodeWrap, { left: c.x - 80, top: c.y - size / 2 }]}>
                    {current && <StartBubble color={p.color} />}
                    {current && <Pulse size={size} color={p.color} />}
                    <Pressable
                      disabled={!unlocked}
                      onPress={() => {
                        tap();
                        if (guestLocked) setLocked('unit');
                        else setSheet(u.id);
                      }}
                    >
                      {({ pressed }) => (
                        <View
                          style={[
                            styles.nodeEdge,
                            {
                              width: size,
                              height: size + 6,
                              borderRadius: size / 2,
                              backgroundColor: shade(fill, -0.22),
                              paddingBottom: pressed ? 2 : 6,
                              marginTop: pressed ? 4 : 0,
                            },
                          ]}
                        >
                          <View style={[styles.node, { width: size, height: size, borderRadius: size / 2, backgroundColor: fill }]}>
                            <Ionicons
                              name={passed ? 'checkmark' : unlocked && !guestLocked ? 'mic' : 'lock-closed'}
                              size={size * 0.42}
                              color={unlocked || passed ? '#fff' : '#B3AFC4'}
                            />
                          </View>
                        </View>
                      )}
                    </Pressable>
                    <View style={styles.label}>
                      {passed && (
                        <View style={styles.stars}>
                          {[1, 2, 3].map((s) => (
                            <Ionicons key={s} name="star" size={15} color={s <= stars(best ?? 0) ? '#FFC53D' : '#E2DFEC'} />
                          ))}
                          <T w="black" size={12} color={colors.muted} style={{ marginLeft: 4 }}>
                            {best}
                          </T>
                        </View>
                      )}
                      <T w="black" size={15} color={unlocked ? colors.text : colors.faint}>
                        {u.title}
                      </T>
                      <T w="bold" size={12} color={colors.muted}>
                        {u.level} · {u.questions.length} {t('soru', 'questions')}
                      </T>
                    </View>
                  </View>
                );
              })}

              {(() => {
                const c = center(p.units.length);
                return (
                  <View style={[styles.nodeWrap, { left: c.x - 80, top: c.y - 40 }]}>
                    <View style={[styles.trophy, allDone && { backgroundColor: '#FFC53D', borderColor: '#E0A100' }]}>
                      <Ionicons name="trophy" size={36} color={allDone ? '#fff' : '#C9C5D8'} />
                    </View>
                    <T w="black" size={15} style={{ marginTop: 8 }} color={allDone ? colors.text : colors.faint}>
                      {allDone ? t('Uzman rozeti kazanıldı!', 'Expert badge earned!') : t('Uzman rozeti', 'Expert badge')}
                    </T>
                  </View>
                );
              })()}
            </>
          )}
        </View>
      </ScrollView>
      <ModeSheet
        unit={p.units.find((u) => u.id === sheet)}
        color={p.color}
        best={sheet ? bestByUnit[sheet] : undefined}
        bestQuiz={sheet ? bestQuizByUnit[sheet] : undefined}
        onClose={() => setSheet(null)}
        interviewsLeft={access.interviewsLeft}
        onLocked={(reason) => {
          setSheet(null);
          // iOS can't present a modal while another one is still closing.
          setTimeout(() => setLocked(reason), Platform.OS === 'ios' ? 400 : 0);
        }}
      />
      <SignupPrompt reason={locked} onClose={() => setLocked(null)} />
    </View>
  );
}

function Pulse({ size, color }: { size: number; color: string }) {
  const a = useState(() => new Animated.Value(0))[0];
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(a, { toValue: 1, duration: 1600, easing: Easing.out(Easing.quad), useNativeDriver: Platform.OS !== 'web' }),
    );
    loop.start();
    return () => loop.stop();
  }, [a]);
  return (
    <Animated.View
      pointerEvents="none"
      style={{
        position: 'absolute',
        top: 0,
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity: a.interpolate({ inputRange: [0, 1], outputRange: [0.35, 0] }),
        transform: [{ scale: a.interpolate({ inputRange: [0, 1], outputRange: [1, 1.55] }) }],
      }}
    />
  );
}

function StartBubble({ color }: { color: string }) {
  const t = useT();
  const a = useState(() => new Animated.Value(0))[0];
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(a, { toValue: 1, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: Platform.OS !== 'web' }),
        Animated.timing(a, { toValue: 0, duration: 700, easing: Easing.inOut(Easing.quad), useNativeDriver: Platform.OS !== 'web' }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [a]);
  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.bubble, { transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }] }]}
    >
      <T w="black" size={13} color={color} style={{ letterSpacing: 1 }}>
        {t('BAŞLA', 'START')}
      </T>
      <View style={styles.bubbleTip} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 18, paddingBottom: 20, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  back: { width: 36, height: 36, justifyContent: 'center', marginLeft: -6 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: 4 },
  headIcon: { width: 56, height: 56, borderRadius: 18, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  headProgress: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 18 },
  nodeWrap: { position: 'absolute', width: 160, alignItems: 'center' },
  nodeEdge: { ...shadow(1) },
  node: { alignItems: 'center', justifyContent: 'center' },
  label: {
    alignItems: 'center',
    marginTop: 6,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: colors.bg,
  },
  stars: { flexDirection: 'row', gap: 2, marginBottom: 2 },
  trophy: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#EFEDF6',
    borderWidth: 3,
    borderColor: '#E2DFEC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bubble: {
    position: 'absolute',
    top: -46,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    zIndex: 2,
  },
  bubbleTip: {
    position: 'absolute',
    bottom: -7,
    width: 12,
    height: 12,
    backgroundColor: '#fff',
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: colors.border,
    transform: [{ rotate: '45deg' }],
  },
});

function ModeSheet({
  unit,
  color,
  best,
  bestQuiz,
  onClose,
  interviewsLeft,
  onLocked,
}: {
  unit: Unit | undefined;
  color: string;
  best: number | undefined;
  bestQuiz: number | undefined;
  onClose: () => void;
  interviewsLeft: number;
  onLocked: (reason: Locked) => void;
}) {
  const insets = useSafeAreaInsets();
  const t = useT();
  const lang = useLang();
  const { interviewer, setInterviewer } = useStore();
  const go = (path: '/session' | '/quiz') => {
    if (!unit) return;
    tap();
    onClose();
    router.push(`${path}/${unit.id}`);
  };
  return (
    <Modal visible={!!unit} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={sheetStyles.backdrop} onPress={onClose} />
      {unit && (
        <FadeIn style={[sheetStyles.sheet, { paddingBottom: insets.bottom + 20 }]}>
          <View style={sheetStyles.grabber} />
          <T w="black" size={12} color={colors.muted} style={{ letterSpacing: 1 }}>
            {upper(unit.level)} · {unit.questions.length} {t('SORU', 'QUESTIONS')}
          </T>
          <T w="black" size={22} style={{ marginTop: 2, marginBottom: 16 }}>
            {unit.title}
          </T>
          <T w="black" size={12} color={colors.muted} style={{ letterSpacing: 1, marginBottom: 8 }}>
            {t('MÜLAKATÇIN', 'YOUR INTERVIEWER')}
          </T>
          <View style={sheetStyles.people}>
            {INTERVIEWERS.map((i) => {
              const on = i.id === interviewer;
              return (
                <Pressable
                  key={i.id}
                  onPress={() => {
                    tap();
                    setInterviewer(i.id);
                  }}
                  style={[sheetStyles.person, on && { borderColor: i.color, backgroundColor: i.color + '12' }]}
                >
                  <View style={[sheetStyles.personIcon, { backgroundColor: on ? i.color : i.color + '1F' }]}>
                    <Ionicons name={i.icon as IconName} size={20} color={on ? '#fff' : i.color} />
                  </View>
                  <T w="black" size={13} numberOfLines={1}>
                    {pick(i.name, lang)}
                  </T>
                  <T w="bold" size={10} color={colors.muted} numberOfLines={1}>
                    {pick(i.role, lang)}
                  </T>
                </Pressable>
              );
            })}
          </View>
          <T w="semibold" size={12} color={colors.muted} style={{ marginBottom: 14 }}>
            {pick(INTERVIEWERS.find((i) => i.id === interviewer)?.style ?? INTERVIEWERS[0].style, lang)}
          </T>
          <ModeCard
            icon="mic"
            color={color}
            title={t('Mülakat Simülasyonu', 'Interview Simulation')}
            desc={t(
              'Açık uçlu cevapla, güçlü ve zayıf yanlarını gösteren detaylı rapor al.',
              'Answer open-ended questions and get a detailed report on your strengths and weaknesses.',
            )}
            meta={
              Number.isFinite(interviewsLeft)
                ? t(`Misafir hakkı: ${interviewsLeft}/${GUEST_INTERVIEWS} mülakat`, `Guest interviews left: ${interviewsLeft}/${GUEST_INTERVIEWS}`)
                : best !== undefined
                  ? t(`En iyi: ${best}/100`, `Best: ${best}/100`)
                  : t('~10 dk · Üniteyi geçmek için', '~10 min · Passes the unit')
            }
            primary
            onPress={() => (interviewsLeft <= 0 ? onLocked('interviews') : go('/session'))}
          />
          <ModeCard
            icon="flash"
            color="#F5A524"
            title={t('Hızlı Pratik', 'Quick Practice')}
            desc={t('Çoktan seçmeli ve sıralama sorularıyla konuyu hızlıca tekrar et.', 'Review the topic quickly with multiple-choice and ordering questions.')}
            meta={bestQuiz !== undefined ? t(`En iyi: %${bestQuiz}`, `Best: ${bestQuiz}%`) : t('~3 dk · XP kazandırır', '~3 min · Earns XP')}
            onPress={() => go('/quiz')}
          />
        </FadeIn>
      )}
    </Modal>
  );
}

function ModeCard({
  icon,
  color,
  title,
  desc,
  meta,
  primary,
  onPress,
}: {
  icon: IconName;
  color: string;
  title: string;
  desc: string;
  meta: string;
  primary?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          style={[
            sheetStyles.card,
            {
              borderColor: primary ? color : colors.border,
              backgroundColor: primary ? color + '0F' : colors.card,
              borderBottomWidth: pressed ? 2 : 5,
              marginTop: pressed ? 3 : 0,
            },
          ]}
        >
          <View style={[sheetStyles.cardIcon, { backgroundColor: color }]}>
            <Ionicons name={icon} size={24} color="#fff" />
          </View>
          <View style={{ flex: 1 }}>
            <T w="black" size={16}>
              {title}
            </T>
            <T w="semibold" size={13} color={colors.muted} style={{ lineHeight: 18, marginTop: 2 }}>
              {desc}
            </T>
            <T w="extrabold" size={12} color={primary ? color : '#B5791A'} style={{ marginTop: 6 }}>
              {meta}
            </T>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.faint} />
        </View>
      )}
    </Pressable>
  );
}

const sheetStyles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(23,21,43,0.45)' },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 10,
    gap: 0,
  },
  grabber: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: colors.border, marginBottom: 14 },
  people: { flexDirection: 'row', gap: 8, marginBottom: 8 },
  person: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  personIcon: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    borderWidth: 2,
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },
  cardIcon: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
});
