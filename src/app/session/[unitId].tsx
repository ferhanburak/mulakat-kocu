import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useRef, useState, type ComponentRef } from 'react';
import {
  ActivityIndicator,
  Animated,
  Easing,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bar, FadeIn, GradientIcon, Ionicons, T, colors, fonts, goBack, shade, shadow, tap, type IconName, themedStyles } from '@/components/ui';
import { SignupPrompt } from '@/components/SignupPrompt';
import { findInterviewer, lineFor, needsProbe } from '@/data/interviewers';
import { findUnit, type QuestionKind } from '@/data/professions';
import { useAccess } from '@/lib/access';
import { evaluateSession } from '@/lib/evaluator';
import { sessionQuestions } from '@/lib/interview';
import { pick, upper, useLang, useT, type Bi } from '@/lib/i18n';
import { speak, stopSpeaking } from '@/lib/voice';
import { useStore } from '@/lib/store';

const KIND: Record<QuestionKind, { label: Bi; icon: IconName; color: string }> = {
  teknik: { label: { tr: 'Teknik', en: 'Technical' }, icon: 'construct', color: '#2F7FE0' },
  davranissal: { label: { tr: 'Davranışsal', en: 'Behavioural' }, icon: 'people', color: '#D9437A' },
  vaka: { label: { tr: 'Vaka', en: 'Case' }, icon: 'bulb', color: '#E0761B' },
};
const STAR_STEPS: Bi<string[]> = { tr: ['Durum', 'Görev', 'Aksiyon', 'Sonuç'], en: ['Situation', 'Task', 'Action', 'Result'] };
const TARGET_WORDS = 40;

export default function SessionScreen() {
  const insets = useSafeAreaInsets();
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  const found = findUnit(unitId);
  const { addReport, voice, setVoice, interviewer: interviewerId } = useStore();
  const t = useT();
  const interviewer = findInterviewer(interviewerId);
  const lang = found?.track.lang ?? 'tr';
  const access = useAccess();
  // Checked once on entry, so finishing the guest's last allowed interview doesn't block its report.
  const [block] = useState(() => access.interviewBlock(unitId));
  const [shownCount, setShownCount] = useState(0); // questions revealed so far
  const [typing, setTyping] = useState(true);
  const [answers, setAnswers] = useState<string[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [ending, setEnding] = useState(false);
  const appLang = useLang();
  // The character's question set for this unit (in the app language).
  const questions = useMemo(() => sessionQuestions(unitId, interviewer.id), [unitId, interviewer.id, appLang]); // eslint-disable-line react-hooks/exhaustive-deps
  /** Follow-ups by question index: first answer, the interviewer's question, and the reply. */
  const [followUps, setFollowUps] = useState<Record<number, { first: string; reply?: string }>>({});
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);

  const say = (bubbleId: string, text: string | string[]) => {
    setSpeakingId(bubbleId);
    speak(text, lang, { interviewer: interviewer.id, onDone: () => setSpeakingId((id) => (id === bubbleId ? null : id)) });
  };
  const intro = interviewer.intro[lang][0];
  const ackFor = (i: number) => lineFor(interviewer.ack[lang], i - 1);

  // Read each newly revealed question aloud; stop talking when leaving the screen.
  useEffect(() => {
    if (!voice || shownCount === 0) return;
    const q = questions[shownCount - 1];
    // The interviewer opens (or reacts to the last answer) and then asks the question.
    const lead = shownCount === 1 ? intro : ackFor(shownCount - 1);
    // Starts speech (an external system); its state update only marks which bubble is playing.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (q) say(q.id, [lead, q.text]);
  }, [shownCount]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => () => stopSpeaking(), []);

  // Reveal the next question after a short "typing" pause.
  useEffect(() => {
    if (!found || busy) return;
    if (shownCount > answers.length) return;
    if (shownCount >= questions.length) return;
    // The typing indicator is a timed animation step, so it is driven from this timer effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTyping(true);
    const t = setTimeout(() => {
      setTyping(false);
      setShownCount((n) => n + 1);
    }, shownCount === 0 ? 1100 : 900);
    return () => clearTimeout(t);
  }, [answers.length, shownCount, found, busy, questions.length]);

  useEffect(() => {
    const t = setTimeout(() => scroll.current?.scrollToEnd({ animated: true }), 60);
    return () => clearTimeout(t);
  }, [shownCount, answers.length, typing, followUps]);

  if (!found) return <T style={{ padding: 20 }}>{t('Ünite bulunamadı.', 'Unit not found.')}</T>;
  if (block)
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <SignupPrompt reason={block} onClose={() => goBack(`/track/${found.track.id}`)} />
      </View>
    );
  const { profession, track, unit } = found;
  const total = questions.length;
  const words = draft.trim().split(/\s+/).filter(Boolean).length;
  const waitingForAnswer = shownCount > answers.length;
  const currentQ = questions[shownCount - 1];
  const current = answers.length;
  const probing = followUps[current] !== undefined && followUps[current].reply === undefined;
  const canSend = waitingForAnswer && words >= 3;

  const submit = async () => {
    if (!canSend) return;
    tap();
    stopSpeaking();
    setSpeakingId(null);
    const text = draft.trim();
    setDraft('');
    // First answer to a question: the character may follow up once before moving on.
    if (!probing && !followUps[current] && needsProbe(interviewer.id, text, lang)) {
      setFollowUps((f) => ({ ...f, [current]: { first: text } }));
      if (voice) say(`probe-${current}`, interviewer.probe[lang]);
      return;
    }
    const full = probing ? `${followUps[current].first} ${text}` : text;
    if (probing) setFollowUps((f) => ({ ...f, [current]: { ...f[current], reply: text } }));
    const next = [...answers, full];
    setAnswers(next);
    if (next.length < total) return;
    // The interviewer closes the interview before the evaluation screen.
    setEnding(true);
    if (voice) say('outro', interviewer.outro[lang]);
    await new Promise((r) => setTimeout(r, 2200));
    setBusy(true);
    const [report] = await Promise.all([
      evaluateSession(
        profession.id,
        unit.id,
        questions.map((q, i) => ({ question: q, answer: next[i] })),
        interviewer.id,
      ),
      new Promise((r) => setTimeout(r, 1200)),
    ]);
    addReport(report);
    router.replace(`/report/${report.id}`);
  };

  if (busy) {
    return (
      <LinearGradient colors={[profession.color, colors.primary2]} style={styles.busy}>
        <FadeIn style={{ alignItems: 'center' }}>
          <View style={styles.busyIcon}>
            <Ionicons name="analytics" size={44} color={profession.color} />
          </View>
          <T w="black" size={22} color="#fff" style={{ marginTop: 22 }}>
            {t('Cevapların değerlendiriliyor', 'Evaluating your answers')}
          </T>
          <T w="semibold" size={14} color="rgba(255,255,255,0.85)" style={{ marginTop: 6, textAlign: 'center' }}>
            {t('İçerik, yapı, netlik ve somutluk puanlanıyor…', 'Scoring content, structure, clarity and concreteness…')}
          </T>
          <ActivityIndicator color="#fff" style={{ marginTop: 24 }} />
        </FadeIn>
      </LinearGradient>
    );
  }

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={[styles.top, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => goBack(`/track/${track.id}`)} hitSlop={12}>
          <Ionicons name="close" size={28} color={colors.faint} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Bar value={(answers.length / total) * 100} color={profession.color} height={14} />
        </View>
        <T w="black" size={14} color={colors.muted}>
          {Math.min(answers.length + 1, total)}/{total}
        </T>
        <Pressable
          onPress={() => {
            tap();
            if (voice) {
              stopSpeaking();
              setSpeakingId(null);
            }
            setVoice(!voice);
          }}
          hitSlop={10}
          style={[styles.voiceBtn, voice && { backgroundColor: profession.color + '1A', borderColor: profession.color + '55' }]}
        >
          <Ionicons name={voice ? 'volume-high' : 'volume-mute'} size={18} color={voice ? profession.color : colors.faint} />
        </Pressable>
      </View>

      <ScrollView ref={scroll} contentContainerStyle={styles.chat} keyboardShouldPersistTaps="handled">
        <FadeIn style={styles.interviewer}>
          <GradientIcon icon={interviewer.icon as IconName} color={interviewer.color} size={52} radius={26} />
          <View style={{ flex: 1 }}>
            <T w="black" size={16}>
              {pick(interviewer.name, lang)} · {pick(interviewer.role, lang)}
            </T>
            <T w="semibold" size={13} color={colors.muted} numberOfLines={1}>
              {track.name} · {unit.title} · {unit.level} · {total} {t('soru', 'questions')}
            </T>
          </View>
        </FadeIn>

        <Bubble who="ai">{intro}</Bubble>

        {questions.slice(0, shownCount).map((q, i) => (
          <View key={q.id}>
            {i > 0 && <Bubble who="ai">{ackFor(i)}</Bubble>}
            <Bubble
              who="ai"
              kind={q.kind}
              speaking={speakingId === q.id}
              onListen={() => {
                tap();
                if (speakingId === q.id) {
                  stopSpeaking();
                  setSpeakingId(null);
                } else say(q.id, q.text);
              }}
            >
              {q.text}
            </Bubble>
            {followUps[i] ? (
              <>
                <Bubble who="me">{followUps[i].first}</Bubble>
                <Bubble who="ai">{interviewer.probe[lang]}</Bubble>
                {followUps[i].reply !== undefined && <Bubble who="me">{followUps[i].reply}</Bubble>}
              </>
            ) : (
              answers[i] !== undefined && <Bubble who="me">{answers[i]}</Bubble>
            )}
          </View>
        ))}
        {ending && <Bubble who="ai">{interviewer.outro[lang]}</Bubble>}
        {typing && <Typing />}
      </ScrollView>

      <View style={[styles.composer, { paddingBottom: insets.bottom + 12 }]}>
        {currentQ?.kind === 'davranissal' && waitingForAnswer && (
          <View style={styles.starRow}>
            <Ionicons name="sparkles" size={14} color={KIND.davranissal.color} />
            {STAR_STEPS[lang].map((s, i) => (
              <T key={s} w="extrabold" size={12} color={colors.muted}>
                {s}
                {i < STAR_STEPS[lang].length - 1 ? '  →' : ''}
              </T>
            ))}
          </View>
        )}
        <View style={styles.inputRow}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            editable={waitingForAnswer}
            placeholder={
              waitingForAnswer
                ? t('Cevabını yaz…', 'Type your answer…')
                : t(`${interviewer.name.tr} yazıyor…`, `${interviewer.name.en} is typing…`)
            }
            placeholderTextColor={colors.faint}
            multiline
            style={styles.input}
          />
          <Pressable onPress={submit} disabled={!canSend}>
            {({ pressed }) => (
              <View
                style={[
                  styles.send,
                  {
                    backgroundColor: canSend ? profession.color : colors.track,
                    borderBottomColor: canSend ? shade(profession.color, -0.28) : colors.trackStrong,
                    borderBottomWidth: pressed ? 1 : 4,
                    marginTop: pressed ? 3 : 0,
                  },
                ]}
              >
                <Ionicons name={answers.length + 1 === total ? 'checkmark' : 'arrow-up'} size={24} color="#fff" />
              </View>
            )}
          </Pressable>
        </View>
        <View style={styles.meterRow}>
          <View style={{ flex: 1 }}>
            <Bar value={(words / TARGET_WORDS) * 100} color={words >= TARGET_WORDS ? colors.success : colors.warn} height={5} />
          </View>
          <T w="bold" size={12} color={words >= TARGET_WORDS ? colors.success : colors.muted}>
            {words} / {TARGET_WORDS} {t('kelime', 'words')}
          </T>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function Bubble({
  who,
  kind,
  speaking,
  onListen,
  children,
}: {
  who: 'ai' | 'me';
  kind?: QuestionKind;
  speaking?: boolean;
  onListen?: () => void;
  children: React.ReactNode;
}) {
  const me = who === 'me';
  const t = useT();
  const k = kind ? KIND[kind] : undefined;
  return (
    <FadeIn style={[styles.bubbleRow, { justifyContent: me ? 'flex-end' : 'flex-start' }]}>
      <View style={[styles.bubble, me ? styles.bubbleMe : styles.bubbleAi, speaking && styles.bubbleSpeaking]}>
        {k && (
          <View style={styles.kindRow}>
            <View style={[styles.kind, { backgroundColor: k.color + '18' }]}>
              <Ionicons name={k.icon} size={12} color={k.color} />
              <T w="black" size={11} color={k.color} style={{ letterSpacing: 0.6 }}>
                {upper(pick(k.label))}
              </T>
            </View>
            {onListen && (
              <Pressable onPress={onListen} hitSlop={10} style={styles.listen}>
                {speaking ? <SoundWave /> : <Ionicons name="volume-medium" size={15} color={colors.muted} />}
                <T w="extrabold" size={11} color={speaking ? colors.primary : colors.muted}>
                  {speaking ? t('Durdur', 'Stop') : t('Dinle', 'Listen')}
                </T>
              </Pressable>
            )}
          </View>
        )}
        <T w={k ? 'bold' : 'semibold'} size={k ? 16 : 15} color={me ? '#fff' : colors.text} style={{ lineHeight: k ? 23 : 21 }}>
          {children}
        </T>
      </View>
    </FadeIn>
  );
}

/** Three bouncing bars shown while the interviewer is speaking. */
function SoundWave() {
  const a = useState(() => new Animated.Value(0))[0];
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(a, { toValue: 1, duration: 700, easing: Easing.linear, useNativeDriver: Platform.OS !== 'web' }),
    );
    loop.start();
    return () => loop.stop();
  }, [a]);
  return (
    <View style={styles.wave}>
      {[0, 1, 2].map((i) => (
        <Animated.View
          key={i}
          style={[
            styles.waveBar,
            {
              transform: [
                {
                  scaleY: a.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: i === 1 ? [1, 0.4, 1] : [0.4, 1, 0.4],
                  }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

function Typing() {
  const a = useState(() => new Animated.Value(0))[0];
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(a, { toValue: 3, duration: 900, easing: Easing.linear, useNativeDriver: Platform.OS !== 'web' }),
    );
    loop.start();
    return () => loop.stop();
  }, [a]);
  return (
    <View style={[styles.bubble, styles.bubbleAi, styles.typing]}>
      {[0, 1, 2].map((i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            {
              opacity: a.interpolate({ inputRange: [i, i + 0.5, i + 1], outputRange: [0.3, 1, 0.3], extrapolate: 'clamp' }),
              transform: [
                {
                  translateY: a.interpolate({ inputRange: [i, i + 0.5, i + 1], outputRange: [0, -4, 0], extrapolate: 'clamp' }),
                },
              ],
            },
          ]}
        />
      ))}
    </View>
  );
}

const styles = themedStyles(() =>
  StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 18, paddingBottom: 12 },
  chat: { padding: 16, paddingBottom: 24 },
  interviewer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 14,
    marginBottom: 18,
    ...shadow(1),
  },
  bubbleRow: { flexDirection: 'row', marginBottom: 12 },
  bubble: { maxWidth: '86%', borderRadius: 20, paddingHorizontal: 15, paddingVertical: 12 },
  bubbleAi: { backgroundColor: colors.card, borderTopLeftRadius: 6, ...shadow(1) },
  bubbleMe: { backgroundColor: colors.primary, borderTopRightRadius: 6 },
  kindRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 },
  listen: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8, backgroundColor: colors.bg },
  bubbleSpeaking: { borderWidth: 2, borderColor: colors.primary + '55' },
  wave: { flexDirection: 'row', alignItems: 'center', gap: 2, height: 14 },
  waveBar: { width: 3, height: 14, borderRadius: 2, backgroundColor: colors.primary },
  voiceBtn: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: colors.border },
  kind: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    alignSelf: 'flex-start',
    borderRadius: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
  },
  typing: { flexDirection: 'row', gap: 5, alignSelf: 'flex-start', paddingVertical: 16, marginBottom: 12 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.faint },
  composer: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 14,
    paddingTop: 12,
    ...shadow(2),
  },
  starRow: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 4, marginBottom: 8, flexWrap: 'wrap' },
  inputRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  input: {
    flex: 1,
    minHeight: 52,
    maxHeight: 150,
    fontSize: 15,
    fontFamily: fonts.semibold,
    color: colors.text,
    backgroundColor: colors.bg,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingTop: 14,
    paddingBottom: 14,
    textAlignVertical: 'top',
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
  },
  send: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  meterRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 10, paddingHorizontal: 4 },
  busy: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  busyIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  }),
);
