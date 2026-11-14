import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
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
  goBack,
  tap,
  scoreColor,
  type IconName,
} from '@/components/ui';
import { dailyQuestion } from '@/data/professions';
import { evaluateSession } from '@/lib/evaluator';
import { dayKey, useStore } from '@/lib/store';
import { speak, stopSpeaking } from '@/lib/voice';

const GOLD = '#F5A524';
const MIN_WORDS = 3;
const dailyXp = (score: number) => 15 + Math.round(score / 5);

export default function DailyScreen() {
  const insets = useSafeAreaInsets();
  const { daily, addDailyResult } = useStore();
  const today = dayKey(new Date());
  const ref = dailyQuestion(today);
  const done = daily?.day === today ? daily : null;
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  useEffect(() => () => stopSpeaking(), []);
  const words = draft.trim().split(/\s+/).filter(Boolean).length;
  const dateLabel = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', weekday: 'long' });

  const submit = async () => {
    if (words < MIN_WORDS || busy) return;
    setBusy(true);
    const report = await evaluateSession(ref.profession.id, ref.unit.id, [{ question: ref.question, answer: draft.trim() }]);
    addDailyResult(
      { questionId: ref.question.id, feedback: report.answers[0], overall: report.overall, xp: dailyXp(report.overall) },
      ref.unit.id,
    );
    setBusy(false);
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
        <LinearGradient colors={['#FFB547', '#F07A1A']} style={[styles.hero, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={() => goBack('/')} hitSlop={12} style={styles.back}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <View style={styles.heroIcon}>
            <Ionicons name="today" size={30} color={GOLD} />
          </View>
          <T w="black" size={24} color="#fff" style={{ marginTop: 10 }}>
            Günün Sorusu
          </T>
          <T w="semibold" size={13} color="rgba(255,255,255,0.9)">
            {dateLabel} · herkese aynı soru
          </T>
        </LinearGradient>

        <View style={styles.body}>
          <FadeIn>
            <Card>
              <View style={styles.tags}>
                <Chip icon={ref.track.icon as IconName} label={ref.track.name} color={ref.profession.color} bg={ref.profession.color + '18'} />
                <Chip icon="podium" label={ref.unit.level} color={colors.muted} bg={colors.bg} />
                <Pressable
                  onPress={() => {
                    tap();
                    if (speaking) {
                      stopSpeaking();
                      setSpeaking(false);
                    } else {
                      setSpeaking(true);
                      speak(ref.question.text, ref.track.lang ?? 'tr', { onDone: () => setSpeaking(false) });
                    }
                  }}
                  hitSlop={8}
                  style={styles.listen}
                >
                  <Ionicons name={speaking ? 'stop-circle' : 'volume-medium'} size={15} color={speaking ? GOLD : colors.muted} />
                  <T w="extrabold" size={11} color={speaking ? GOLD : colors.muted}>
                    {speaking ? 'Durdur' : 'Dinle'}
                  </T>
                </Pressable>
              </View>
              <T w="black" size={18} style={{ lineHeight: 25, marginTop: 12 }}>
                {ref.question.text}
              </T>
              {!done && (
                <T w="semibold" size={12} color={colors.muted} style={{ marginTop: 8 }}>
                  Cevapla, anında geri bildirim ve +{dailyXp(0)}–{dailyXp(100)} XP kazan.
                </T>
              )}
            </Card>
          </FadeIn>

          {done ? (
            <DailyResultView result={done} trackId={ref.track.id} />
          ) : (
            <FadeIn delay={100}>
              <Card style={{ marginTop: 14 }}>
                <TextInput
                  value={draft}
                  onChangeText={setDraft}
                  placeholder="Cevabını yaz…"
                  placeholderTextColor={colors.faint}
                  multiline
                  style={styles.input}
                />
                <View style={styles.meterRow}>
                  <View style={{ flex: 1 }}>
                    <Bar value={(words / 40) * 100} color={words >= 40 ? colors.success : GOLD} height={5} />
                  </View>
                  <T w="bold" size={12} color={colors.muted}>
                    {words} / 40 kelime
                  </T>
                </View>
                <Button title={busy ? 'DEĞERLENDİRİLİYOR…' : 'GÖNDER'} icon="send" color={GOLD} disabled={words < MIN_WORDS || busy} onPress={submit} style={{ marginTop: 14 }} />
              </Card>
            </FadeIn>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function DailyResultView({
  result,
  trackId,
}: {
  result: { overall: number; xp: number; feedback: { tip: string; covered: string[]; missing: string[]; ideal: string; answer: string } };
  trackId: string;
}) {
  const fb = result.feedback;
  return (
    <>
      <FadeIn delay={80}>
        <Card style={styles.scoreCard}>
          <Ring value={result.overall} size={110} stroke={11} color={scoreColor(result.overall)}>
            <CountUp value={result.overall} style={[styles.score, { color: scoreColor(result.overall) }]} />
          </Ring>
          <View style={{ flex: 1, gap: 6 }}>
            <T w="black" size={18}>
              {result.overall >= 70 ? 'Harika cevap! 🌟' : result.overall >= 50 ? 'İyi deneme 👍' : 'Geliştirilebilir 💪'}
            </T>
            <Chip icon="flash" label={`+${result.xp} XP`} color={colors.primary} bg="#EEEBFF" />
            <T w="semibold" size={12} color={colors.muted}>
              Yarın yeni bir soru seni bekliyor.
            </T>
          </View>
        </Card>
      </FadeIn>
      <FadeIn delay={160}>
        <Card style={{ marginTop: 14, gap: 12 }}>
          <View style={styles.tip}>
            <Ionicons name="bulb" size={18} color={GOLD} />
            <T w="semibold" size={14} style={{ flex: 1, lineHeight: 20 }}>
              {fb.tip}
            </T>
          </View>
          {(fb.covered.length > 0 || fb.missing.length > 0) && (
            <View style={styles.tags}>
              {fb.covered.map((c) => (
                <Chip key={c} icon="checkmark-circle" label={c} color={colors.success} bg="#E6F8F0" />
              ))}
              {fb.missing.map((c) => (
                <Chip key={c} icon="close-circle" label={c} color={colors.danger} bg="#FDECEC" />
              ))}
            </View>
          )}
          <View style={styles.box}>
            <T w="black" size={11} color={colors.muted} style={styles.boxLabel}>
              SENİN CEVABIN
            </T>
            <T w="semibold" size={13} style={{ lineHeight: 19 }}>
              {fb.answer}
            </T>
          </View>
          <View style={[styles.box, { backgroundColor: '#E8F8F1' }]}>
            <T w="black" size={11} color={colors.success} style={styles.boxLabel}>
              ÖRNEK GÜÇLÜ CEVAP
            </T>
            <T w="semibold" size={13} style={{ lineHeight: 19 }}>
              {fb.ideal}
            </T>
          </View>
        </Card>
      </FadeIn>
      <View style={{ gap: 12, marginTop: 16 }}>
        <Button title="BU ALANDA PRATİK YAP" icon="map" color={colors.primary} onPress={() => router.push(`/track/${trackId}`)} />
        <Button title="ANA SAYFA" variant="outline" color={colors.muted} onPress={() => goBack('/')} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 24, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  back: { alignSelf: 'flex-start', width: 36, height: 36, justifyContent: 'center', marginLeft: -6 },
  heroIcon: { width: 64, height: 64, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  body: { paddingHorizontal: 16, marginTop: 16 },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, alignItems: 'center' },
  listen: { flexDirection: 'row', alignItems: 'center', gap: 4, marginLeft: 'auto', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8, backgroundColor: colors.bg },
  input: {
    minHeight: 120,
    maxHeight: 220,
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.text,
    backgroundColor: colors.bg,
    borderRadius: 16,
    padding: 14,
    textAlignVertical: 'top',
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
  },
  meterRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10 },
  scoreCard: { flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 14 },
  score: { fontFamily: fonts.black, fontSize: 34 },
  tip: { flexDirection: 'row', gap: 8, backgroundColor: '#FFF9EC', borderRadius: 12, padding: 12 },
  box: { backgroundColor: colors.bg, borderRadius: 14, padding: 12 },
  boxLabel: { letterSpacing: 0.8, marginBottom: 4 },
});
