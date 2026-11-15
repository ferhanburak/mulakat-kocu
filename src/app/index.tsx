import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bar,
  Card,
  FadeIn,
  GradientIcon,
  Ionicons,
  Ring,
  T,
  colors,
  scoreColor,
  shadow,
  tap,
  type IconName,
} from '@/components/ui';
import { SignupPrompt } from '@/components/SignupPrompt';
import { allUnits, dailyQuestion, findTrack, findUnit, professions } from '@/data/professions';
import { GUEST_INTERVIEWS, useAccess, type Locked } from '@/lib/access';
import { PASS_SCORE } from '@/lib/evaluator';
import { locale, useLang, useT } from '@/lib/i18n';
import { remindersSupported } from '@/lib/reminders';
import { dayKey, useStore } from '@/lib/store';

const DAYS = { tr: ['Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt', 'Paz'], en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] };
const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString();

export default function Home() {
  const insets = useSafeAreaInsets();
  const t = useT();
  const lang = useLang();
  const general = professions.find((p) => p.general);
  const careers = professions.filter((p) => !p.general);
  const { xp, streak, bestByUnit, reports, isUnlocked, days, unlocked, reminder, daily, mistakes, session, profile } = useStore();
  const firstName = session?.mode === 'user' ? session.account.name.split(/\s+/)[0] : null;
  const goal = profile?.dailyGoal ?? 1;
  const mine = profile ? findTrack(profile.trackId) : undefined;
  const dailyRef = dailyQuestion(dayKey(new Date()));
  const dailyDone = daily?.day === dayKey(new Date());
  const mistakeCount = Object.keys(mistakes).length;
  const level = Math.floor(xp / 100) + 1;
  const access = useAccess();
  const [locked, setLocked] = useState<Locked | null>(null);

  // Week strip (Mon..Sun) marking days with at least one interview or quiz.
  const now = new Date();
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  const week = DAYS[lang].map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { label, done: (days[dayKey(d)] ?? 0) > 0, today: sameDay(d, now) };
  });
  const todayCount = days[dayKey(now)] ?? 0;
  const goalDone = todayCount >= goal;

  // "Continue" target: next open unit in the most recently practised track, else the user's own track.
  const last = reports[0] ? findUnit(reports[0].unitId) : mine;
  const lastProf = last?.profession ?? careers[0];
  const lastTrack = last?.track ?? lastProf.tracks[0];
  const minePassed = mine ? mine.track.units.filter((u) => (bestByUnit[u.id] ?? 0) >= PASS_SCORE).length : 0;
  const ids = lastTrack.units.map((u) => u.id);
  const nextIdx = lastTrack.units.findIndex((u, i) => isUnlocked(ids, i) && (bestByUnit[u.id] ?? 0) < PASS_SCORE);
  const nextUnit = lastTrack.units[nextIdx === -1 ? lastTrack.units.length - 1 : nextIdx];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient
        colors={[colors.primary, colors.primary2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.hero, { paddingTop: insets.top + 18 }]}
      >
        <View style={styles.heroTop}>
          <View>
            <T w="bold" size={14} color="rgba(255,255,255,0.8)">
              {firstName ? t(`Merhaba ${firstName} 👋`, `Hi ${firstName} 👋`) : t('Merhaba 👋', 'Hi 👋')}
            </T>
            <T w="black" size={26} color="#fff">
              {t('Mülakat Koçu', 'Interview Coach')}
            </T>
          </View>
          <Pressable
            onPress={() => {
              tap();
              router.push('/profil');
            }}
            style={({ pressed }) => [styles.levelBadge, { opacity: pressed ? 0.8 : 1 }]}
          >
            <Ionicons name="person-circle" size={30} color="#fff" />
            <View>
              <T w="black" size={10} color="rgba(255,255,255,0.8)">
                {t('SEVİYE', 'LEVEL')}
              </T>
              <T w="black" size={18} color="#fff" style={{ marginTop: -3 }}>
                {level}
              </T>
            </View>
          </Pressable>
        </View>
        <View style={styles.statsRow}>
          <Stat icon="flame" color="#FFB547" value={`${streak}`} label={t('gün seri', 'day streak')} />
          <Stat icon="flash" color="#FFE066" value={`${xp}`} label={t('toplam XP', 'total XP')} />
          <Stat icon="trophy" color="#9EF0C9" value={`${Object.keys(unlocked).length}`} label={t('başarım', 'badges')} />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <FadeIn>
          <Card style={styles.goalCard}>
            <Ring value={Math.min(100, (todayCount / goal) * 100)} size={74} stroke={9} color={colors.streak} track="#FFE8D6">
              {goalDone || goal === 1 ? (
                <Ionicons name={goalDone ? 'checkmark' : 'flame'} size={28} color={colors.streak} />
              ) : (
                <T w="black" size={17} color={colors.streak}>
                  {todayCount}/{goal}
                </T>
              )}
            </Ring>
            <View style={{ flex: 1 }}>
              <T w="black" size={17}>
                {goalDone ? t('Günlük hedef tamam!', 'Daily goal done!') : t(`Günlük hedef: ${goal} pratik`, `Daily goal: ${goal} practice${goal > 1 ? 's' : ''}`)}
              </T>
              <View style={styles.weekRow}>
                {week.map((d) => (
                  <View key={d.label} style={styles.dayCol}>
                    <View
                      style={[
                        styles.dayDot,
                        d.done && { backgroundColor: colors.streak, borderColor: colors.streak },
                        d.today && !d.done && { borderColor: colors.streak },
                      ]}
                    >
                      {d.done && <Ionicons name="checkmark" size={11} color="#fff" />}
                    </View>
                    <T w={d.today ? 'black' : 'bold'} size={10} color={d.today ? colors.text : colors.muted}>
                      {d.label}
                    </T>
                  </View>
                ))}
              </View>
            </View>
          </Card>
        </FadeIn>

        {access.guest && (
          <FadeIn delay={20}>
            <Pressable
              onPress={() => {
                tap();
                router.push('/kayit');
              }}
              style={styles.guestBanner}
            >
              <Ionicons name="person-circle" size={22} color={colors.primary} />
              <View style={{ flex: 1 }}>
                <T w="black" size={13} color={colors.primary}>
                  {t('Misafir modu', 'Guest mode')} · {access.interviewsLeft}/{GUEST_INTERVIEWS} {t('mülakat hakkı', 'interviews left')}
                </T>
                <T w="semibold" size={12} color={colors.muted}>
                  {t('Ücretsiz üye ol, ilerlemen korunur', 'Sign up free and keep your progress')}
                </T>
              </View>
              <Ionicons name="chevron-forward" size={18} color={colors.primary} />
            </Pressable>
          </FadeIn>
        )}

        {remindersSupported && !reminder.enabled && (
          <FadeIn delay={40}>
            <Pressable
              onPress={() => {
                tap();
                router.push('/profil');
              }}
              style={styles.reminderCta}
            >
              <Ionicons name="notifications" size={20} color={colors.streak} />
              <T w="extrabold" size={13} color="#8A4B00" style={{ flex: 1 }}>
                {t('Serini kaybetme! Günlük hatırlatıcıyı aç', "Don't lose your streak! Turn on the daily reminder")}
              </T>
              <Ionicons name="chevron-forward" size={18} color="#C98A3A" />
            </Pressable>
          </FadeIn>
        )}

        <FadeIn delay={80}>
          <Pressable
            onPress={() => {
              tap();
              const block = access.interviewBlock(nextUnit.id);
              if (block) setLocked(block);
              else router.push(`/session/${nextUnit.id}`);
            }}
          >
            {({ pressed }) => (
              <LinearGradient
                colors={[lastProf.color, colors.primary2]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.continueCard, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}
              >
                <View style={{ flex: 1 }}>
                  <T w="extrabold" size={12} color="rgba(255,255,255,0.8)" style={{ letterSpacing: 1 }}>
                    {reports.length ? t('KALDIĞIN YERDEN DEVAM', 'PICK UP WHERE YOU LEFT OFF') : t('İLK MÜLAKATINA BAŞLA', 'START YOUR FIRST INTERVIEW')}
                  </T>
                  <T w="black" size={19} color="#fff" style={{ marginTop: 2 }}>
                    {nextUnit.title}
                  </T>
                  <T w="semibold" size={13} color="rgba(255,255,255,0.85)">
                    {lastTrack.name} · {nextUnit.level} · {nextUnit.questions.length} {t('soru', 'questions')}
                  </T>
                </View>
                <View style={styles.playBtn}>
                  <Ionicons name="play" size={22} color={lastProf.color} style={{ marginLeft: 3 }} />
                </View>
              </LinearGradient>
            )}
          </Pressable>
        </FadeIn>

        {mine && (
          <FadeIn delay={95}>
            <Pressable
              onPress={() => {
                tap();
                router.push(`/track/${mine.track.id}`);
              }}
              style={({ pressed }) => [styles.mineCard, { borderColor: mine.profession.color + '40', transform: [{ scale: pressed ? 0.98 : 1 }] }]}
            >
              <GradientIcon icon={mine.track.icon as IconName} color={mine.profession.color} size={50} radius={16} />
              <View style={{ flex: 1 }}>
                <T w="extrabold" size={11} color={mine.profession.color} style={{ letterSpacing: 1 }}>
                  {t('SENİN ALANIN', 'YOUR FIELD')}
                </T>
                <T w="black" size={16} numberOfLines={1}>
                  {mine.track.name}
                </T>
                <T w="semibold" size={12} color={colors.muted} numberOfLines={1}>
                  {mine.profession.name}
                </T>
                <View style={styles.mineFoot}>
                  <View style={{ flex: 1 }}>
                    <Bar value={(minePassed / mine.track.units.length) * 100} color={mine.profession.color} height={7} />
                  </View>
                  <T w="extrabold" size={11} color={colors.muted}>
                    {minePassed}/{mine.track.units.length} {t('ünite', 'units')}
                  </T>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.faint} />
            </Pressable>
          </FadeIn>
        )}

        <FadeIn delay={110} style={styles.miniRow}>
          <Pressable
            onPress={() => {
              tap();
              if (access.canDaily) router.push('/gunluk');
              else setLocked('daily');
            }}
            style={({ pressed }) => [styles.mini, { borderColor: '#FFD7A3', transform: [{ scale: pressed ? 0.97 : 1 }] }]}
          >
            <View style={[styles.miniIcon, { backgroundColor: '#FFF1DC' }]}>
              <Ionicons name={dailyDone ? 'checkmark-circle' : 'today'} size={22} color="#F07A1A" />
            </View>
            <T w="black" size={14} style={{ marginTop: 8 }}>
              {t('Günün Sorusu', 'Question of the Day')}
            </T>
            <T w="semibold" size={11} color={colors.muted} numberOfLines={2} style={{ minHeight: 30 }}>
              {dailyDone
                ? t(`Bugün tamam · ${daily?.overall} puan`, `Done today · ${daily?.overall} points`)
                : access.canDaily
                  ? dailyRef.track.name
                  : t('Üyelere özel', 'Members only')}
            </T>
            {!dailyDone && (
              <View style={[styles.miniBadge, { backgroundColor: '#F07A1A' }]}>
                <T w="black" size={10} color="#fff">
                  {access.canDaily ? '+XP' : '🔒'}
                </T>
              </View>
            )}
          </Pressable>
          <Pressable
            onPress={() => {
              tap();
              router.push('/hatalar');
            }}
            style={({ pressed }) => [styles.mini, { borderColor: '#F9C4C4', transform: [{ scale: pressed ? 0.97 : 1 }] }]}
          >
            <View style={[styles.miniIcon, { backgroundColor: '#FDECEC' }]}>
              <Ionicons name="journal" size={22} color="#EF5A5A" />
            </View>
            <T w="black" size={14} style={{ marginTop: 8 }}>
              {t('Hata Defteri', 'Mistake Notebook')}
            </T>
            <T w="semibold" size={11} color={colors.muted} numberOfLines={2} style={{ minHeight: 30 }}>
              {mistakeCount
                ? t(`${mistakeCount} soru tekrar bekliyor`, `${mistakeCount} question${mistakeCount > 1 ? 's' : ''} to review`)
                : t('Henüz hata yok 🎉', 'No mistakes yet 🎉')}
            </T>
            {mistakeCount > 0 && (
              <View style={[styles.miniBadge, { backgroundColor: '#EF5A5A' }]}>
                <T w="black" size={10} color="#fff">
                  {mistakeCount}
                </T>
              </View>
            )}
          </Pressable>
        </FadeIn>

        {general && (
          <>
            <View style={styles.sectionRow}>
              <T w="black" size={19}>
                {general.name}
              </T>
              <T w="bold" size={12} color={colors.muted}>
                {t('Her meslek için', 'For every profession')}
              </T>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.typesRow}
              style={{ marginHorizontal: -16 }}
            >
              {general.tracks.map((tr, i) => {
                const done = tr.units.filter((u) => (bestByUnit[u.id] ?? 0) >= PASS_SCORE).length;
                return (
                  <FadeIn key={tr.id} delay={100 + i * 50}>
                    <Pressable
                      onPress={() => {
                        tap();
                        router.push(`/track/${tr.id}`);
                      }}
                      style={({ pressed }) => [styles.typeCard, { transform: [{ scale: pressed ? 0.97 : 1 }] }]}
                    >
                      <LinearGradient
                        colors={[general.color, '#14B8A6']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.typeIcon}
                      >
                        <Ionicons name={tr.icon as IconName} size={22} color="#fff" />
                      </LinearGradient>
                      <T w="black" size={14} numberOfLines={2} style={{ marginTop: 10, minHeight: 36 }}>
                        {tr.name}
                      </T>
                      <T w="semibold" size={11} color={colors.muted} numberOfLines={2} style={{ minHeight: 30 }}>
                        {tr.tagline}
                      </T>
                      <View style={{ marginTop: 8 }}>
                        <Bar value={(done / tr.units.length) * 100} color={general.color} height={5} />
                      </View>
                    </Pressable>
                  </FadeIn>
                );
              })}
            </ScrollView>
          </>
        )}

        <T w="black" size={19} style={styles.section}>
          {t('Meslekler', 'Professions')}
        </T>
        <View style={styles.grid}>
          {careers.map((p, i) => {
            const units = allUnits(p);
            const passed = units.filter((u) => (bestByUnit[u.id] ?? 0) >= PASS_SCORE).length;
            return (
              <FadeIn key={p.id} delay={120 + i * 50} style={styles.tileWrap}>
                <Pressable
                  onPress={() => {
                    tap();
                    router.push(`/profession/${p.id}`);
                  }}
                  style={({ pressed }) => [styles.tile, { transform: [{ scale: pressed ? 0.97 : 1 }] }]}
                >
                  <GradientIcon icon={p.icon as IconName} color={p.color} size={46} />
                  <T w="black" size={15} style={{ marginTop: 12, minHeight: 40 }} numberOfLines={2}>
                    {p.name}
                  </T>
                  <T w="semibold" size={12} color={colors.muted} numberOfLines={2} style={{ minHeight: 32 }}>
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
          })}
        </View>

        {reports.length > 0 && (
          <>
            <T w="black" size={19} style={styles.section}>
              {t('Son raporlar', 'Recent reports')}
            </T>
            <Card style={{ paddingVertical: 6 }}>
              {reports.slice(0, 4).map((r, i) => {
                const f = findUnit(r.unitId);
                return (
                  <Pressable
                    key={r.id}
                    onPress={() => router.push(`/report/${r.id}`)}
                    style={[styles.reportRow, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}
                  >
                    {f && <GradientIcon icon={f.track.icon as IconName} color={f.profession.color} size={38} radius={11} />}
                    <View style={{ flex: 1 }}>
                      <T w="extrabold" size={15}>
                        {f?.unit.title}
                      </T>
                      <T w="semibold" size={12} color={colors.muted}>
                        {f?.track.name} · {new Date(r.createdAt).toLocaleDateString(locale(lang), { day: 'numeric', month: 'short' })}
                      </T>
                    </View>
                    <View style={[styles.scorePill, { backgroundColor: scoreColor(r.overall) + '1F' }]}>
                      <T w="black" size={15} color={scoreColor(r.overall)}>
                        {r.overall}
                      </T>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color={colors.faint} />
                  </Pressable>
                );
              })}
            </Card>
          </>
        )}
      </View>
      <SignupPrompt reason={locked} onClose={() => setLocked(null)} />
    </ScrollView>
  );
}

function Stat({ icon, color, value, label }: { icon: IconName; color: string; value: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Ionicons name={icon} size={20} color={color} />
      <View>
        <T w="black" size={17} color="#fff">
          {value}
        </T>
        <T w="bold" size={11} color="rgba(255,255,255,0.75)" style={{ marginTop: -2 }}>
          {label}
        </T>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { paddingHorizontal: 20, paddingBottom: 56, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  heroTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  mineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: 14,
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 14,
    borderWidth: 2,
    ...shadow(1),
  },
  mineFoot: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  guestBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    backgroundColor: '#EEEBFF',
    borderWidth: 2,
    borderColor: '#D9D3FF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  reminderCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 12,
    backgroundColor: '#FFF3E0',
    borderWidth: 2,
    borderColor: '#FFE0B3',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 11,
  },
  levelBadge: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  statsRow: { flexDirection: 'row', gap: 8, marginTop: 20 },
  stat: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  body: { paddingHorizontal: 16, marginTop: -38 },
  goalCard: { flexDirection: 'row', alignItems: 'center', gap: 16, ...shadow(2) },
  weekRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  dayCol: { alignItems: 'center', gap: 4 },
  dayDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: 22,
    padding: 18,
    marginTop: 14,
    ...shadow(2),
  },
  playBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  section: { marginTop: 26, marginBottom: 12 },
  miniRow: { flexDirection: 'row', gap: 12, marginTop: 14 },
  mini: { flex: 1, backgroundColor: colors.card, borderRadius: 20, padding: 14, borderWidth: 2, borderBottomWidth: 5 },
  miniIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  miniBadge: { position: 'absolute', top: 12, right: 12, borderRadius: 999, minWidth: 22, paddingHorizontal: 6, paddingVertical: 2, alignItems: 'center' },
  sectionRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 26, marginBottom: 12 },
  typesRow: { paddingHorizontal: 16, gap: 12, paddingBottom: 6 },
  typeCard: { width: 148, backgroundColor: colors.card, borderRadius: 20, padding: 14, ...shadow(1) },
  typeIcon: { width: 42, height: 42, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  tileWrap: { width: '50%', padding: 6 },
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
  reportRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  scorePill: { borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4 },
});
