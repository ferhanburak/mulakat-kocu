import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bar, Button, Card, FadeIn, Ionicons, T, colors, goBack, shadow, tap, type IconName, themedStyles } from '@/components/ui';
import { INTERVIEWERS } from '@/data/interviewers';
import { findTrack } from '@/data/professions';
import { GoogleButton } from '@/components/AuthForm';
import { GUEST_INTERVIEWS } from '@/lib/access';
import { ACHIEVEMENTS } from '@/lib/achievements';
import { locale, pick, setLang, useLang, useT, type Lang } from '@/lib/i18n';
import { setThemePref, useTheme, type ThemePref } from '@/lib/theme';
import { AuthError, EMAIL_AUTH, deleteAccount } from '@/lib/auth';
import { goalLabel, stageLabel } from '@/lib/profileOptions';
import { enableReminders, remindersSupported } from '@/lib/reminders';
import { levelOf, useStore } from '@/lib/store';

const HOURS = [9, 12, 18, 20, 22];
const THEMES: { id: ThemePref; icon: IconName; label: { tr: string; en: string } }[] = [
  { id: 'system', icon: 'phone-portrait', label: { tr: 'Sistem', en: 'System' } },
  { id: 'light', icon: 'sunny', label: { tr: 'Açık', en: 'Light' } },
  { id: 'dark', icon: 'moon', label: { tr: 'Koyu', en: 'Dark' } },
];
const LANGS: { id: Lang; label: string; flag: string }[] = [
  { id: 'tr', label: 'Türkçe', flag: '🇹🇷' },
  { id: 'en', label: 'English', flag: '🇬🇧' },
];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const store = useStore();
  const t = useT();
  const lang = useLang();
  const theme = useTheme();
  const { xp, streak, stats, unlocked, reminder, bestByUnit, setReminder, voice, setVoice, session, profile, signOut, interviewer, setInterviewer } =
    store;
  const account = session?.mode === 'user' ? session.account : null;
  const target = profile ? findTrack(profile.trackId) : undefined;
  const [permError, setPermError] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const removeAccount = async () => {
    if (deleting) return;
    setDeleting(true);
    setDeleteError(null);
    try {
      await deleteAccount();
      await signOut({ forget: true });
    } catch (e) {
      setDeleteError(e instanceof AuthError ? e.message : t('Hesap silinemedi, tekrar dene.', "Couldn't delete the account, please try again."));
      setDeleting(false);
    }
  };
  const level = levelOf(xp);
  const snap = { stats, xp, bestByUnit };
  const unlockedCount = ACHIEVEMENTS.filter((a) => unlocked[a.id]).length;
  // Unlocked first, then by how close the rest are.
  const sorted = [...ACHIEVEMENTS].sort((a, b) => {
    const ua = unlocked[a.id] ? 1 : 0;
    const ub = unlocked[b.id] ? 1 : 0;
    if (ua !== ub) return ub - ua;
    const [ca, ta] = a.progress(snap);
    const [cb, tb] = b.progress(snap);
    return cb / tb - ca / ta;
  });

  const toggleReminder = async (on: boolean) => {
    tap();
    setPermError(false);
    if (!on) return setReminder({ enabled: false });
    const ok = await enableReminders();
    if (ok) setReminder({ enabled: true });
    else setPermError(true);
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bg }} contentContainerStyle={{ paddingBottom: 40 }}>
      <LinearGradient colors={[colors.primary, colors.primary2]} style={[styles.hero, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={() => goBack('/')} hitSlop={12} style={[styles.back, { top: insets.top + 8 }]}>
          <Ionicons name="chevron-back" size={24} color="#fff" />
        </Pressable>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={colors.primary} />
          <View style={styles.levelBubble}>
            <T w="black" size={13} color="#fff">
              {level}
            </T>
          </View>
        </View>
        <T w="black" size={22} color="#fff" style={{ marginTop: 10 }}>
          {account?.name ?? t('Misafir', 'Guest')}
        </T>
        <T w="semibold" size={13} color="rgba(255,255,255,0.85)">
          {account ? account.email : t('Üye olmadan deniyorsun', 'Trying without an account')} · {t('Seviye', 'Level')} {level} · {xp} XP
        </T>
        <View style={{ alignSelf: 'stretch', marginTop: 12 }}>
          <Bar value={xp % 100} color="#fff" height={8} />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.statsGrid}>
          <StatBox icon="flame" color={colors.streak} value={streak} label={t('Güncel seri', 'Current streak')} />
          <StatBox icon="podium" color="#E0A100" value={stats.maxStreak} label={t('En uzun seri', 'Longest streak')} />
          <StatBox icon="mic" color={colors.primary} value={stats.interviews} label={t('Mülakat', 'Interviews')} />
          <StatBox icon="flash" color="#F5A524" value={stats.quizzes} label={t('Hızlı pratik', 'Quick practice')} />
          <StatBox icon="ribbon" color={colors.success} value={stats.bestInterview} label={t('En yüksek puan', 'Top score')} />
          <StatBox icon="compass" color="#2F7FE0" value={stats.professions.length} label={t('Meslek', 'Professions')} />
        </View>
        <Pressable
          onPress={() => {
            tap();
            router.push('/ilerleme');
          }}
          style={({ pressed }) => [styles.progressBtn, { opacity: pressed ? 0.85 : 1 }]}
        >
          <Ionicons name="trending-up" size={20} color={colors.primary} />
          <View style={{ flex: 1 }}>
            <T w="black" size={15}>
              {t('Gelişimini gör', 'See your progress')}
            </T>
            <T w="semibold" size={12} color={colors.muted}>
              {t('Puan grafiği ve en zayıf kategorin', 'Score chart and your weakest category')}
            </T>
          </View>
          <Ionicons name="chevron-forward" size={18} color={colors.faint} />
        </Pressable>

        <View style={styles.achHead}>
          <T w="black" size={18}>
            {t('Hedefin', 'Your goal')}
          </T>
          <Pressable
            onPress={() => {
              tap();
              router.push('/profil-kurulum?edit=1');
            }}
            hitSlop={8}
            style={styles.editBtn}
          >
            <Ionicons name="create" size={15} color={colors.primary} />
            <T w="black" size={13} color={colors.primary}>
              {t('Düzenle', 'Edit')}
            </T>
          </Pressable>
        </View>
        <Card style={{ paddingVertical: 6 }}>
          <InfoRow icon="briefcase" color={target?.profession.color ?? colors.primary} label={t('Alan', 'Field')} value={target ? `${target.profession.name} · ${target.track.name}` : '—'} />
          <InfoRow icon="podium" color="#2F7FE0" label={t('Kariyer', 'Career')} value={profile ? stageLabel(profile.stage) : '—'} divider />
          <InfoRow icon="flame" color={colors.streak} label={t('Günlük hedef', 'Daily goal')} value={profile ? goalLabel(profile.dailyGoal) : '—'} divider />
        </Card>

        <T w="black" size={18} style={styles.section}>
          {t('Dil, Tema & Mülakatçı', 'Language, Theme & Interviewer')}
        </T>
        <Card>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: '#2F7FE0' + '1A' }]}>
              <Ionicons name="language" size={20} color="#2F7FE0" />
            </View>
            <View style={{ flex: 1 }}>
              <T w="black" size={15}>
                {t('Uygulama dili', 'App language')}
              </T>
              <T w="semibold" size={12} color={colors.muted}>
                {t('Ekranlar, sorular ve mülakatçının sesi bu dilde olur.', 'Screens, questions and the interviewer’s voice use this language.')}
              </T>
            </View>
          </View>
          <View style={styles.hours}>
            {LANGS.map((l) => {
              const on = lang === l.id;
              return (
                <Pressable
                  key={l.id}
                  onPress={() => {
                    tap();
                    setLang(l.id);
                  }}
                  style={[styles.langPill, on && { backgroundColor: '#2F7FE0', borderColor: '#2F7FE0' }]}
                >
                  <T w="black" size={14} color={on ? '#fff' : colors.muted}>
                    {l.flag} {l.label}
                  </T>
                </Pressable>
              );
            })}
          </View>
          <View style={[styles.row, styles.rowDivider]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.primary + '1A' }]}>
              <Ionicons name={theme.scheme === 'dark' ? 'moon' : 'sunny'} size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <T w="black" size={15}>
                {t('Tema', 'Theme')}
              </T>
              <T w="semibold" size={12} color={colors.muted}>
                {t('Sistem, telefonunun açık/koyu ayarını izler.', "System follows your phone's light/dark setting.")}
              </T>
            </View>
          </View>
          <View style={styles.hours}>
            {THEMES.map((th) => {
              const on = theme.pref === th.id;
              return (
                <Pressable
                  key={th.id}
                  onPress={() => {
                    tap();
                    setThemePref(th.id);
                  }}
                  style={[styles.langPill, styles.themePill, on && { backgroundColor: colors.primary, borderColor: colors.primary }]}
                >
                  <Ionicons name={th.icon} size={15} color={on ? '#fff' : colors.muted} />
                  <T w="black" size={13} color={on ? '#fff' : colors.muted}>
                    {pick(th.label, lang)}
                  </T>
                </Pressable>
              );
            })}
          </View>
          <View style={[styles.row, styles.rowDivider]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.success + '1A' }]}>
              <Ionicons name="people" size={20} color={colors.success} />
            </View>
            <View style={{ flex: 1 }}>
              <T w="black" size={15}>
                {t('Mülakatçın', 'Your interviewer')}
              </T>
              <T w="semibold" size={12} color={colors.muted}>
                {pick(INTERVIEWERS.find((i) => i.id === interviewer)?.style ?? INTERVIEWERS[0].style, lang)}
              </T>
            </View>
          </View>
          <View style={styles.hours}>
            {INTERVIEWERS.map((i) => {
              const on = interviewer === i.id;
              return (
                <Pressable
                  key={i.id}
                  onPress={() => {
                    tap();
                    setInterviewer(i.id);
                  }}
                  style={[styles.langPill, on && { backgroundColor: i.color, borderColor: i.color }]}
                >
                  <T w="black" size={13} color={on ? '#fff' : colors.muted} numberOfLines={1}>
                    {pick(i.name, lang)}
                  </T>
                  <T w="bold" size={10} color={on ? 'rgba(255,255,255,0.85)' : colors.faint} numberOfLines={1}>
                    {pick(i.role, lang)}
                  </T>
                </Pressable>
              );
            })}
          </View>
        </Card>

        <T w="black" size={18} style={styles.section}>
          {t('Bildirimler & Ses', 'Notifications & Sound')}
        </T>
        <Card>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: colors.streak + '1A' }]}>
              <Ionicons name={reminder.enabled ? 'notifications' : 'notifications-off'} size={20} color={colors.streak} />
            </View>
            <View style={{ flex: 1 }}>
              <T w="black" size={15}>
                {t('Günlük seri hatırlatıcısı', 'Daily streak reminder')}
              </T>
              <T w="semibold" size={12} color={colors.muted}>
                {t('O gün pratik yapmadıysan seçtiğin saatte hatırlatır.', 'Reminds you at the chosen time if you haven’t practised that day.')}
              </T>
            </View>
            <Switch
              value={reminder.enabled}
              onValueChange={toggleReminder}
              disabled={!remindersSupported}
              trackColor={{ true: colors.streak, false: colors.border }}
              thumbColor="#fff"
            />
          </View>
          {reminder.enabled && (
            <View style={styles.hours}>
              {HOURS.map((h) => {
                const on = reminder.hour === h;
                return (
                  <Pressable
                    key={h}
                    onPress={() => {
                      tap();
                      setReminder({ hour: h });
                    }}
                    style={[styles.hour, on && { backgroundColor: colors.streak, borderColor: colors.streak }]}
                  >
                    <T w="black" size={13} color={on ? '#fff' : colors.muted}>
                      {String(h).padStart(2, '0')}:00
                    </T>
                  </Pressable>
                );
              })}
            </View>
          )}
          {!remindersSupported && (
            <T w="semibold" size={12} color={colors.muted} style={styles.note}>
              {t('Bildirimler telefonda çalışır; web önizlemesinde kapalıdır.', 'Notifications work on the phone; they are off in the web preview.')}
            </T>
          )}
          {permError && (
            <T w="bold" size={12} color={colors.danger} style={styles.note}>
              {t('Bildirim izni verilmedi. Telefon ayarlarından izin verebilirsin.', 'Notification permission was denied. You can allow it in your phone settings.')}
            </T>
          )}
          <View style={[styles.row, styles.rowDivider]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.primary + '1A' }]}>
              <Ionicons name={voice ? 'volume-high' : 'volume-mute'} size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <T w="black" size={15}>
                {t('Sesli sorular', 'Spoken questions')}
              </T>
              <T w="semibold" size={12} color={colors.muted}>
                {t('Mülakatçı soruları sesli okur. iPhone’da sessiz mod kapalı olmalı.', 'The interviewer reads questions aloud. On iPhone, silent mode must be off.')}
              </T>
            </View>
            <Switch
              value={voice}
              onValueChange={(on) => {
                tap();
                setVoice(on);
              }}
              trackColor={{ true: colors.primary, false: colors.border }}
              thumbColor="#fff"
            />
          </View>
        </Card>

        <View style={styles.achHead}>
          <T w="black" size={18}>
            {t('Başarımlar', 'Badges')}
          </T>
          <T w="black" size={14} color={colors.primary}>
            {unlockedCount}/{ACHIEVEMENTS.length}
          </T>
        </View>
        <View style={styles.achGrid}>
          {sorted.map((a, i) => {
            const done = !!unlocked[a.id];
            const [cur, target] = a.progress(snap);
            return (
              <FadeIn key={a.id} delay={i * 30} style={styles.achWrap}>
                <View style={[styles.ach, !done && { opacity: 0.85 }]}>
                  <View
                    style={[
                      styles.achBadge,
                      done
                        ? { backgroundColor: a.color, borderBottomColor: 'rgba(0,0,0,0.22)' }
                        : { backgroundColor: colors.track, borderBottomColor: colors.trackStrong },
                    ]}
                  >
                    <Ionicons name={(done ? a.icon : 'lock-closed') as IconName} size={24} color={done ? '#fff' : colors.locked} />
                  </View>
                  <T w="black" size={12} style={{ textAlign: 'center', marginTop: 8, minHeight: 32, lineHeight: 16 }} numberOfLines={2}>
                    {pick(a.title)}
                  </T>
                  <T w="semibold" size={11} color={colors.muted} style={{ textAlign: 'center', minHeight: 28 }} numberOfLines={2}>
                    {pick(a.desc)}
                  </T>
                  {!done && target > 1 && (
                    <View style={{ alignSelf: 'stretch', marginTop: 6 }}>
                      <Bar value={(Math.min(cur, target) / target) * 100} color={a.color} height={5} />
                    </View>
                  )}
                  {done && (
                    <T w="extrabold" size={10} color={a.color} style={{ marginTop: 6 }}>
                      {new Date(unlocked[a.id]).toLocaleDateString(locale(lang), { day: 'numeric', month: 'short' })}
                    </T>
                  )}
                </View>
              </FadeIn>
            );
          })}
        </View>

        <T w="black" size={18} style={styles.section}>
          {t('Hesap', 'Account')}
        </T>
        {account ? (
          <>
            <Button title={t('ÇIKIŞ YAP', 'SIGN OUT')} icon="log-out" variant="outline" color={colors.danger} onPress={() => signOut()} />
            {confirmDelete ? (
              <Card style={{ marginTop: 14, borderWidth: 2, borderColor: colors.tintRedBorder }}>
                <T w="black" size={15} color={colors.danger}>
                  {t('Hesabın kalıcı olarak silinsin mi?', 'Delete your account for good?')}
                </T>
                <T w="semibold" size={12} color={colors.muted} style={{ marginTop: 4, marginBottom: 14, lineHeight: 17 }}>
                  {t(
                    'Hesabın, raporların, XP’n, serin ve başarımların silinir. Bu işlem geri alınamaz.',
                    'Your account, reports, XP, streak and badges will be deleted. This cannot be undone.',
                  )}
                </T>
                {deleteError && (
                  <T w="bold" size={12} color={colors.danger} style={{ marginBottom: 10 }}>
                    {deleteError}
                  </T>
                )}
                <View style={{ flexDirection: 'row', gap: 10 }}>
                  <Button title={t('VAZGEÇ', 'CANCEL')} variant="outline" color={colors.muted} onPress={() => setConfirmDelete(false)} style={{ flex: 1 }} />
                  <Button
                    title={deleting ? t('SİLİNİYOR…', 'DELETING…') : t('EVET, SİL', 'YES, DELETE')}
                    color={colors.danger}
                    disabled={deleting}
                    onPress={removeAccount}
                    style={{ flex: 1 }}
                  />
                </View>
              </Card>
            ) : (
              <Pressable onPress={() => setConfirmDelete(true)} hitSlop={8} style={{ alignSelf: 'center', marginTop: 16 }}>
                <T w="bold" size={13} color={colors.muted}>
                  {t('Hesabımı sil', 'Delete my account')}
                </T>
              </Pressable>
            )}
          </>
        ) : (
          <Card>
            <T w="black" size={15}>
              {t('Ücretsiz üye ol, ilerlemen korunur', 'Sign up free and keep your progress')}
            </T>
            <T w="semibold" size={12} color={colors.muted} style={{ marginTop: 2, marginBottom: 14 }}>
              {t(
                `Misafir modunda ${Math.max(0, GUEST_INTERVIEWS - stats.interviews)}/${GUEST_INTERVIEWS} mülakat hakkın kaldı. Üye olunca tüm üniteler, Günün Sorusu ve Hata Defteri açılır.`,
                `You have ${Math.max(0, GUEST_INTERVIEWS - stats.interviews)}/${GUEST_INTERVIEWS} guest interviews left. Members get every unit, the Question of the Day and the Mistake Notebook.`,
              )}
            </T>
            {EMAIL_AUTH ? (
              <>
                <Button title={t('KAYIT OL', 'SIGN UP')} icon="person-add" onPress={() => router.push('/kayit')} />
                <Pressable onPress={() => router.push('/giris')} hitSlop={8} style={{ alignSelf: 'center', marginTop: 14 }}>
                  <T w="extrabold" size={14} color={colors.primary}>
                    {t('Zaten hesabım var', 'I already have an account')}
                  </T>
                </Pressable>
              </>
            ) : (
              <GoogleButton />
            )}
          </Card>
        )}
      </View>
    </ScrollView>
  );
}

function InfoRow({ icon, color, label, value, divider }: { icon: IconName; color: string; label: string; value: string; divider?: boolean }) {
  return (
    <View style={[styles.info, divider && { borderTopWidth: 1, borderTopColor: colors.border }]}>
      <View style={[styles.rowIcon, { backgroundColor: color + '1A' }]}>
        <Ionicons name={icon} size={19} color={color} />
      </View>
      <T w="bold" size={13} color={colors.muted} style={{ width: 92 }}>
        {label}
      </T>
      <T w="extrabold" size={14} style={{ flex: 1, textAlign: 'right' }} numberOfLines={2}>
        {value}
      </T>
    </View>
  );
}

function StatBox({ icon, color, value, label }: { icon: IconName; color: string; value: number; label: string }) {
  return (
    <View style={styles.statWrap}>
      <View style={styles.stat}>
        <Ionicons name={icon} size={20} color={color} />
        <T w="black" size={20}>
          {value}
        </T>
        <T w="bold" size={11} color={colors.muted} numberOfLines={1}>
          {label}
        </T>
      </View>
    </View>
  );
}

const styles = themedStyles(() =>
  StyleSheet.create({
  hero: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 22, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  back: { position: 'absolute', left: 14, zIndex: 2 },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginTop: 14 },
  levelBubble: {
    position: 'absolute',
    right: -4,
    bottom: -2,
    backgroundColor: colors.streak,
    borderRadius: 14,
    minWidth: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  body: { paddingHorizontal: 16, marginTop: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  statWrap: { width: '33.33%', padding: 5 },
  stat: { backgroundColor: colors.card, borderRadius: 18, padding: 12, gap: 2, ...shadow(1) },
  section: { marginTop: 22, marginBottom: 10 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  rowDivider: { marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: colors.border },
  rowIcon: { width: 40, height: 40, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  hours: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 14 },
  progressBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 12,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    borderColor: colors.border,
  },
  themePill: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  langPill: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 9,
    paddingHorizontal: 6,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.border,
  },
  hour: { borderWidth: 2, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  note: { marginTop: 10 },
  info: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.primary + '14', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  achHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 10 },
  achGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  achWrap: { width: '33.33%', padding: 5 },
  ach: { backgroundColor: colors.card, borderRadius: 18, padding: 10, alignItems: 'center', ...shadow(1) },
  achBadge: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 4 },
  }),
);
