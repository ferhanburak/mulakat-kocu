import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Switch, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bar, Button, Card, FadeIn, Ionicons, T, colors, goBack, shadow, tap, type IconName } from '@/components/ui';
import { findTrack } from '@/data/professions';
import { GUEST_INTERVIEWS } from '@/lib/access';
import { ACHIEVEMENTS } from '@/lib/achievements';
import { goalLabel, stageLabel } from '@/lib/profileOptions';
import { enableReminders, remindersSupported } from '@/lib/reminders';
import { levelOf, useStore } from '@/lib/store';

const HOURS = [9, 12, 18, 20, 22];

export default function ProfileScreen() {
  const insets = useSafeAreaInsets();
  const store = useStore();
  const { xp, streak, stats, unlocked, reminder, bestByUnit, setReminder, voice, setVoice, session, profile, signOut } = store;
  const account = session?.mode === 'user' ? session.account : null;
  const target = profile ? findTrack(profile.trackId) : undefined;
  const [permError, setPermError] = useState(false);
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
          {account?.name ?? 'Misafir'}
        </T>
        <T w="semibold" size={13} color="rgba(255,255,255,0.85)">
          {account ? account.email : 'Üye olmadan deniyorsun'} · Seviye {level} · {xp} XP
        </T>
        <View style={{ alignSelf: 'stretch', marginTop: 12 }}>
          <Bar value={xp % 100} color="#fff" height={8} />
        </View>
      </LinearGradient>

      <View style={styles.body}>
        <View style={styles.statsGrid}>
          <StatBox icon="flame" color={colors.streak} value={streak} label="Güncel seri" />
          <StatBox icon="podium" color="#E0A100" value={stats.maxStreak} label="En uzun seri" />
          <StatBox icon="mic" color={colors.primary} value={stats.interviews} label="Mülakat" />
          <StatBox icon="flash" color="#F5A524" value={stats.quizzes} label="Hızlı pratik" />
          <StatBox icon="ribbon" color={colors.success} value={stats.bestInterview} label="En yüksek puan" />
          <StatBox icon="compass" color="#2F7FE0" value={stats.professions.length} label="Meslek" />
        </View>

        <View style={styles.achHead}>
          <T w="black" size={18}>
            Hedefin
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
              Düzenle
            </T>
          </Pressable>
        </View>
        <Card style={{ paddingVertical: 6 }}>
          <InfoRow icon="briefcase" color={target?.profession.color ?? colors.primary} label="Alan" value={target ? `${target.profession.name} · ${target.track.name}` : '—'} />
          <InfoRow icon="podium" color="#2F7FE0" label="Kariyer" value={profile ? stageLabel(profile.stage) : '—'} divider />
          <InfoRow icon="flame" color={colors.streak} label="Günlük hedef" value={profile ? goalLabel(profile.dailyGoal) : '—'} divider />
        </Card>

        <T w="black" size={18} style={styles.section}>
          Bildirimler & Ses
        </T>
        <Card>
          <View style={styles.row}>
            <View style={[styles.rowIcon, { backgroundColor: colors.streak + '1A' }]}>
              <Ionicons name={reminder.enabled ? 'notifications' : 'notifications-off'} size={20} color={colors.streak} />
            </View>
            <View style={{ flex: 1 }}>
              <T w="black" size={15}>
                Günlük seri hatırlatıcısı
              </T>
              <T w="semibold" size={12} color={colors.muted}>
                O gün pratik yapmadıysan seçtiğin saatte hatırlatır.
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
              Bildirimler telefonda çalışır; web önizlemesinde kapalıdır.
            </T>
          )}
          {permError && (
            <T w="bold" size={12} color={colors.danger} style={styles.note}>
              Bildirim izni verilmedi. Telefon ayarlarından izin verebilirsin.
            </T>
          )}
          <View style={[styles.row, styles.rowDivider]}>
            <View style={[styles.rowIcon, { backgroundColor: colors.primary + '1A' }]}>
              <Ionicons name={voice ? 'volume-high' : 'volume-mute'} size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <T w="black" size={15}>
                Sesli sorular
              </T>
              <T w="semibold" size={12} color={colors.muted}>
                Mülakatçı soruları sesli okur. iPhone’da sessiz mod kapalı olmalı.
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
            Başarımlar
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
                        : { backgroundColor: '#ECEAF4', borderBottomColor: '#DAD7E6' },
                    ]}
                  >
                    <Ionicons name={(done ? a.icon : 'lock-closed') as IconName} size={24} color={done ? '#fff' : '#B5B1C8'} />
                  </View>
                  <T w="black" size={12} style={{ textAlign: 'center', marginTop: 8, minHeight: 32, lineHeight: 16 }} numberOfLines={2}>
                    {a.title}
                  </T>
                  <T w="semibold" size={11} color={colors.muted} style={{ textAlign: 'center', minHeight: 28 }} numberOfLines={2}>
                    {a.desc}
                  </T>
                  {!done && target > 1 && (
                    <View style={{ alignSelf: 'stretch', marginTop: 6 }}>
                      <Bar value={(Math.min(cur, target) / target) * 100} color={a.color} height={5} />
                    </View>
                  )}
                  {done && (
                    <T w="extrabold" size={10} color={a.color} style={{ marginTop: 6 }}>
                      {new Date(unlocked[a.id]).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                    </T>
                  )}
                </View>
              </FadeIn>
            );
          })}
        </View>

        <T w="black" size={18} style={styles.section}>
          Hesap
        </T>
        {account ? (
          <Button title="ÇIKIŞ YAP" icon="log-out" variant="outline" color={colors.danger} onPress={signOut} />
        ) : (
          <Card>
            <T w="black" size={15}>
              Ücretsiz üye ol, ilerlemen korunur
            </T>
            <T w="semibold" size={12} color={colors.muted} style={{ marginTop: 2, marginBottom: 14 }}>
              Misafir modunda {Math.max(0, GUEST_INTERVIEWS - stats.interviews)}/{GUEST_INTERVIEWS} mülakat hakkın kaldı. Üye olunca tüm üniteler,
              Günün Sorusu ve Hata Defteri açılır.
            </T>
            <Button title="KAYIT OL" icon="person-add" onPress={() => router.push('/kayit')} />
            <Pressable onPress={() => router.push('/giris')} hitSlop={8} style={{ alignSelf: 'center', marginTop: 14 }}>
              <T w="extrabold" size={14} color={colors.primary}>
                Zaten hesabım var
              </T>
            </Pressable>
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

const styles = StyleSheet.create({
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
  hour: { borderWidth: 2, borderColor: colors.border, borderRadius: 12, paddingHorizontal: 12, paddingVertical: 6 },
  note: { marginTop: 10 },
  info: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  editBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.primary + '14', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  achHead: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, marginBottom: 10 },
  achGrid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -5 },
  achWrap: { width: '33.33%', padding: 5 },
  ach: { backgroundColor: colors.card, borderRadius: 18, padding: 10, alignItems: 'center', ...shadow(1) },
  achBadge: { width: 54, height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 4 },
});
