import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Bar,
  Button,
  Chip,
  CountUp,
  FadeIn,
  Ionicons,
  Ring,
  T,
  colors,
  fonts,
  goBack,
  notify,
  shade,
  shadow,
  tap,
  type IconName,
  themedStyles,
} from '@/components/ui';
import { SignupPrompt } from '@/components/SignupPrompt';
import { findUnit } from '@/data/professions';
import { useAccess, type Locked } from '@/lib/access';
import { tt, useLang, useT } from '@/lib/i18n';
import { canComplete, generateQuiz, generateReviewQuiz, type ChoiceItem, type OrderItem, type PairsItem } from '@/lib/quiz';
import { quizXp, useStore } from '@/lib/store';

const LETTERS = ['A', 'B', 'C', 'D', 'E'];

const MODE_ICON: Record<ChoiceItem['mode'], IconName> = { match: 'checkmark-done', concept: 'key', flaw: 'search', better: 'podium' };

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const { unitId } = useLocalSearchParams<{ unitId: string }>();
  // "review" is the mistake-notebook quiz; anything else is a unit id.
  const review = unitId === 'review';
  const found = review ? undefined : findUnit(unitId);
  const { addQuizResult, addReviewResult, recordQuizAnswer, mistakes } = useStore();
  const access = useAccess();
  const t = useT();
  const lang = useLang();
  const [block] = useState<Locked | null>(() => (review ? (access.canReview ? null : 'review') : access.canOpenUnit(unitId) ? null : 'unit'));
  const [round, setRound] = useState(0);
  // Keyed on the id (findUnit returns a fresh object each render) and the retry round;
  // a review quiz snapshots the notebook when it starts so answering doesn't reshuffle it.
  const items = useMemo(() => {
    if (unitId === 'review') {
      const list = Object.entries(mistakes)
        .sort((a, b) => b[1].misses - a[1].misses)
        .map(([questionId, m]) => ({ questionId, concepts: m.concepts }));
      return generateReviewQuiz(list);
    }
    const f = findUnit(unitId);
    return f ? generateQuiz(f.unit, f.profession) : [];
  }, [unitId, round, lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const [idx, setIdx] = useState(0);
  const [choice, setChoice] = useState<number | null>(null);
  const [order, setOrder] = useState<number[]>([]);
  /** Pairs items: concept index -> matched explanation index, the selected concept, and wrong tries. */
  const [paired, setPaired] = useState<Record<number, number>>({});
  const [pairSel, setPairSel] = useState<number | null>(null);
  const [pairMisses, setPairMisses] = useState(0);
  const [pairWrong, setPairWrong] = useState<number | null>(null);
  const [checked, setChecked] = useState<null | boolean>(null);
  const [correct, setCorrect] = useState(0);
  const [done, setDone] = useState(false);

  if (!found && !review) return <T style={{ padding: 20 }}>{t('Ünite bulunamadı.', 'Unit not found.')}</T>;
  if (block)
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg }}>
        <SignupPrompt reason={block} onClose={() => goBack(found ? `/track/${found.track.id}` : '/hatalar')} />
      </View>
    );
  const color = found ? found.profession.color : '#EF5A5A';
  const backTo = found ? (`/track/${found.track.id}` as const) : ('/hatalar' as const);
  const subtitle = found ? `${found.track.name} · ${found.unit.title}` : t('Hata Defteri tekrarı', 'Mistake Notebook review');
  const item = items[idx];
  const total = items.length;

  const resetPairs = () => {
    setPaired({});
    setPairSel(null);
    setPairMisses(0);
    setPairWrong(null);
  };

  const restart = () => {
    setRound((r) => r + 1);
    setIdx(0);
    setChoice(null);
    setOrder([]);
    resetPairs();
    setChecked(null);
    setCorrect(0);
    setDone(false);
  };

  if (done) {
    const pct = Math.round((correct / Math.max(1, total)) * 100);
    const good = pct >= 70;
    return (
      <LinearGradient
        colors={good ? ['#22C389', '#139A66'] : [shade(color, 0.1), shade(color, -0.2)]}
        style={[styles.done, { paddingTop: insets.top + 40, paddingBottom: insets.bottom + 24 }]}
      >
        <FadeIn style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
          <T w="black" size={14} color="rgba(255,255,255,0.85)" style={{ letterSpacing: 1.2 }}>
            {review ? t('TEKRAR TAMAMLANDI', 'REVIEW COMPLETE') : t('HIZLI PRATİK TAMAMLANDI', 'QUICK PRACTICE COMPLETE')}
          </T>
          <View style={{ marginTop: 18 }}>
            <Ring value={pct} size={160} stroke={14} color="#fff" track="rgba(255,255,255,0.25)">
              <CountUp value={correct} style={styles.doneScore} />
              <T w="extrabold" size={13} color="rgba(255,255,255,0.85)" style={{ marginTop: -6 }}>
                / {total} {t('doğru', 'correct')}
              </T>
            </Ring>
          </View>
          <T w="black" size={24} color="#fff" style={{ marginTop: 18 }}>
            {pct === 100 ? t('Kusursuz! 🌟', 'Flawless! 🌟') : good ? t('Çok iyi! 🎯', 'Great job! 🎯') : t('Biraz daha pratik 💪', 'A bit more practice 💪')}
          </T>
          <T w="semibold" size={14} color="rgba(255,255,255,0.9)" style={{ textAlign: 'center', marginTop: 4 }}>
            {subtitle}
          </T>
          <View style={{ flexDirection: 'row', gap: 8, marginTop: 14 }}>
            <Chip icon="flash" label={`+${quizXp(correct)} XP`} color={colors.primary} bg="#fff" />
          </View>
          <View style={styles.tipBox}>
            <Ionicons name={review ? 'journal' : 'mic'} size={18} color="#fff" />
            <T w="semibold" size={13} color="#fff" style={{ flex: 1, lineHeight: 19 }}>
              {review
                ? t(
                    `Doğru yaptığın sorular defterden silindi. Defterde ${Object.keys(mistakes).length} soru kaldı.`,
                    `Questions you got right were removed from the notebook. ${Object.keys(mistakes).length} left.`,
                  )
                : t('Üniteyi geçmek için açık uçlu mülakat simülasyonunu tamamla.', 'Complete the open-ended interview simulation to pass the unit.')}
            </T>
          </View>
        </FadeIn>
        <View style={{ gap: 12, alignSelf: 'stretch' }}>
          {found && (
            <Button
              title={t('MÜLAKATA GEÇ', 'GO TO INTERVIEW')}
              icon="mic"
              color={good ? colors.onGreen : shade(color, -0.3)}
              variant="outline"
              onPress={() => router.replace(`/session/${found.unit.id}`)}
            />
          )}
          <View style={{ flexDirection: 'row', gap: 12 }}>
            {(found || Object.keys(mistakes).length > 0) && (
              <Button title={t('TEKRAR', 'AGAIN')} icon="refresh" color={shade(color, -0.3)} onPress={restart} style={{ flex: 1 }} />
            )}
            <Button
              title={review ? t('DEFTERE DÖN', 'BACK TO NOTEBOOK') : t('YOLA DÖN', 'BACK TO PATH')}
              icon={review ? 'journal' : 'map'}
              color={shade(color, -0.3)}
              onPress={() => goBack(backTo)}
              style={{ flex: 1 }}
            />
          </View>
        </View>
      </LinearGradient>
    );
  }

  if (!item)
    return (
      <T style={{ padding: 20 }}>
        {review
          ? t('Hata defterinde tekrar edilecek soru yok. 🎉', 'No questions to review in the notebook. 🎉')
          : t('Bu ünite için pratik sorusu üretilemedi.', "Couldn't create practice questions for this unit.")}
      </T>
    );

  const ready =
    item.type === 'choice'
      ? choice !== null
      : item.type === 'order'
        ? order.length === item.parts.length
        : Object.keys(paired).length === item.concepts.length;

  const check = () => {
    const ok =
      item.type === 'choice'
        ? choice === item.answer
        : item.type === 'order'
          ? order.every((partIdx, pos) => partIdx === pos)
          : pairMisses === 0;
    setChecked(ok);
    if (ok) setCorrect((c) => c + 1);
    recordQuizAnswer(item.questionId, ok);
    notify(ok);
  };

  const next = () => {
    tap();
    if (idx + 1 >= total) {
      if (found) addQuizResult(found.unit.id, correct, total);
      else addReviewResult(correct);
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setChoice(null);
    setOrder([]);
    resetPairs();
    setChecked(null);
  };

  const promptIcon: IconName =
    item.type === 'order'
      ? 'swap-vertical'
      : item.type === 'pairs'
        ? 'git-compare'
        : MODE_ICON[item.mode];

  /** Pairs: tap a concept, then the explanation it belongs to. */
  const tapExplanation = (e: number) => {
    if (item.type !== 'pairs' || pairSel === null || checked !== null) return;
    const next = { ...paired, [pairSel]: e };
    if (item.accepts[e].includes(pairSel) && canComplete(item.accepts, next, item.concepts.length)) {
      tap();
      setPaired(next);
      setPairSel(null);
    } else {
      notify(false);
      setPairMisses((m) => m + 1);
      setPairWrong(e);
      setTimeout(() => setPairWrong((w) => (w === e ? null : w)), 600);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <View style={[styles.top, { paddingTop: insets.top + 10 }]}>
        <Pressable onPress={() => goBack(backTo)} hitSlop={12}>
          <Ionicons name="close" size={28} color={colors.faint} />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Bar value={((idx + (checked !== null ? 1 : 0)) / total) * 100} color={color} height={14} />
        </View>
        <T w="black" size={14} color={colors.muted}>
          {idx + 1}/{total}
        </T>
      </View>

      <ScrollView contentContainerStyle={styles.body} key={`${round}-${idx}`}>
        <FadeIn>
          <View style={styles.promptRow}>
            <Ionicons name={promptIcon} size={18} color={color} />
            <T w="black" size={18} style={{ flex: 1 }}>
              {item.prompt}
            </T>
          </View>
          {item.question !== '' && (
            <View style={[styles.questionCard, { borderLeftColor: color }]}>
              <T w="black" size={11} color={colors.muted} style={{ letterSpacing: 0.8, marginBottom: 4 }}>
                {t('MÜLAKAT SORUSU', 'INTERVIEW QUESTION')}
              </T>
              <T w="bold" size={15} style={{ lineHeight: 22 }}>
                {item.question}
              </T>
            </View>
          )}
          {item.type === 'choice' && item.mode === 'flaw' && item.answerText && (
            <View style={styles.answerCard}>
              <T w="black" size={11} color={colors.muted} style={{ letterSpacing: 0.8, marginBottom: 4 }}>
                {t('ADAYIN CEVABI', "CANDIDATE'S ANSWER")}
              </T>
              <T w="semibold" size={14} style={{ lineHeight: 21 }}>
                {item.answerText}
              </T>
            </View>
          )}
        </FadeIn>

        {item.type === 'pairs' ? (
          <PairsBoard
            item={item}
            paired={paired}
            selected={pairSel}
            wrong={pairWrong}
            color={color}
            onSelect={(c) => {
              tap();
              setPairSel(c);
            }}
            onExplanation={tapExplanation}
          />
        ) : item.type === 'choice' ? (
          <ChoiceList item={item} selected={choice} checked={checked} color={color} onSelect={(i) => { tap(); setChoice(i); }} />
        ) : (
          <OrderBoard
            item={item}
            order={order}
            checked={checked}
            color={color}
            onAdd={(p) => { tap(); setOrder((o) => [...o, p]); }}
            onRemove={(p) => { tap(); setOrder((o) => o.filter((x) => x !== p)); }}
          />
        )}
      </ScrollView>

      {checked === null ? (
        <View style={[styles.footer, { paddingBottom: insets.bottom + 14 }]}>
          <Button title={t('KONTROL ET', 'CHECK')} color={color} disabled={!ready} onPress={check} />
        </View>
      ) : (
        <FadeIn style={[styles.feedback, { backgroundColor: checked ? colors.tintGreen : colors.tintRed, paddingBottom: insets.bottom + 14 }]}>
          <View style={styles.feedbackHead}>
            <View style={[styles.feedbackIcon, { backgroundColor: checked ? colors.success : colors.danger }]}>
              <Ionicons name={checked ? 'checkmark' : 'close'} size={22} color="#fff" />
            </View>
            <T w="black" size={19} color={checked ? colors.onGreen : colors.onRed}>
              {checked ? t('Harika!', 'Great!') : item.type === 'pairs' ? t('Neredeyse!', 'Almost!') : t('Doğru cevap:', 'Correct answer:')}
            </T>
          </View>
          {!checked && (
            <T w="semibold" size={13} color={colors.onRed} style={{ lineHeight: 19, marginBottom: 4 }} numberOfLines={6}>
              {item.type === 'choice'
                ? item.options[item.answer]
                : item.type === 'order'
                  ? item.parts.map((p, i) => `${i + 1}. ${p}`).join('\n')
                  : t(`Eşleştirirken ${pairMisses} yanlış deneme yaptın.`, `You made ${pairMisses} wrong ${pairMisses === 1 ? 'try' : 'tries'} while matching.`)}
            </T>
          )}
          {item.type === 'choice' && (
            <T w="semibold" size={12} color={checked ? colors.onGreen : colors.onRed} style={{ lineHeight: 17 }}>
              {item.explain}
            </T>
          )}
          <Button
            title={idx + 1 >= total ? t('SONUCU GÖR', 'SEE RESULT') : t('DEVAM', 'CONTINUE')}
            color={checked ? colors.success : colors.danger}
            onPress={next}
            style={{ marginTop: 12 }}
          />
        </FadeIn>
      )}
    </View>
  );
}

function ChoiceList({
  item,
  selected,
  checked,
  color,
  onSelect,
}: {
  item: ChoiceItem;
  selected: number | null;
  checked: boolean | null;
  color: string;
  onSelect: (i: number) => void;
}) {
  return (
    <View style={{ gap: 10, marginTop: 16 }}>
      {item.options.map((opt, i) => {
        const isSel = selected === i;
        const reveal = checked !== null;
        const isAnswer = i === item.answer;
        const border = reveal && isAnswer ? colors.success : reveal && isSel ? colors.danger : isSel ? color : colors.border;
        const bg = reveal && isAnswer ? colors.tintGreen : reveal && isSel ? colors.tintRed : isSel ? color + '12' : colors.card;
        return (
          <FadeIn key={i} delay={60 + i * 50}>
            <Pressable disabled={reveal} onPress={() => onSelect(i)}>
              <View style={[styles.option, { borderColor: border, backgroundColor: bg, borderBottomWidth: isSel ? 2 : 4 }]}>
                <View style={[styles.letter, { borderColor: border, backgroundColor: isSel ? border : 'transparent' }]}>
                  <T w="black" size={13} color={isSel ? '#fff' : colors.muted}>
                    {LETTERS[i]}
                  </T>
                </View>
                <T w={item.mode === 'concept' ? 'extrabold' : 'semibold'} size={item.mode === 'concept' ? 15 : 13} style={{ flex: 1, lineHeight: item.mode === 'concept' ? 21 : 19 }}>
                  {opt}
                </T>
              </View>
            </Pressable>
          </FadeIn>
        );
      })}
    </View>
  );
}

function PairsBoard({
  item,
  paired,
  selected,
  wrong,
  color,
  onSelect,
  onExplanation,
}: {
  item: PairsItem;
  paired: Record<number, number>;
  selected: number | null;
  wrong: number | null;
  color: string;
  onSelect: (c: number) => void;
  onExplanation: (e: number) => void;
}) {
  const ownerOf = (e: number) => Object.keys(paired).map(Number).find((c) => paired[c] === e);
  return (
    <View style={{ marginTop: 16 }}>
      <T w="bold" size={12} color={colors.muted} style={{ marginBottom: 8 }}>
        {tt('Önce bir kavram seç, sonra ona ait açıklamaya dokun.', 'Pick a concept, then tap the explanation it belongs to.')}
      </T>
      <View style={styles.chipsWrap}>
        {item.concepts.map((label, c) => {
          const done = paired[c] !== undefined;
          const on = selected === c;
          return (
            <Pressable key={c} disabled={done} onPress={() => onSelect(c)}>
              <View
                style={[
                  styles.conceptChip,
                  done && { borderColor: colors.success, backgroundColor: colors.tintGreen, opacity: 0.6 },
                  on && { borderColor: color, backgroundColor: color },
                ]}
              >
                {done && <Ionicons name="checkmark" size={14} color={colors.onGreen} />}
                <T w="extrabold" size={13} color={on ? '#fff' : done ? colors.onGreen : colors.text}>
                  {label}
                </T>
              </View>
            </Pressable>
          );
        })}
      </View>
      <View style={{ gap: 8, marginTop: 14 }}>
        {item.shuffled.map((e) => {
          const owner = ownerOf(e);
          const done = owner !== undefined;
          const bad = wrong === e;
          return (
            <Pressable key={e} disabled={done || selected === null} onPress={() => onExplanation(e)}>
              {({ pressed }) => (
                <View
                  style={[
                    styles.piece,
                    styles.pieceIdle,
                    { transform: [{ scale: pressed ? 0.98 : 1 }] },
                    selected !== null && !done && { borderColor: color + '88' },
                    done && { borderColor: colors.success, backgroundColor: colors.tintGreen, borderBottomWidth: 2 },
                    bad && { borderColor: colors.danger, backgroundColor: colors.tintRed },
                  ]}
                >
                  <View style={{ flex: 1, gap: 4 }}>
                    {done && (
                      <T w="black" size={11} color={colors.onGreen} style={{ letterSpacing: 0.5 }}>
                        {item.concepts[owner]}
                      </T>
                    )}
                    <T w="semibold" size={13} style={{ lineHeight: 19 }}>
                      {item.explanations[e]}
                    </T>
                  </View>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function OrderBoard({
  item,
  order,
  checked,
  color,
  onAdd,
  onRemove,
}: {
  item: OrderItem;
  order: number[];
  checked: boolean | null;
  color: string;
  onAdd: (p: number) => void;
  onRemove: (p: number) => void;
}) {
  const reveal = checked !== null;
  const remaining = item.shuffled.filter((p) => !order.includes(p));
  return (
    <View style={{ marginTop: 16 }}>
      <View style={[styles.slotArea, order.length === 0 && styles.slotEmpty]}>
        {order.length === 0 && (
          <T w="bold" size={13} color={colors.faint} style={{ textAlign: 'center' }}>
            {tt('Aşağıdaki parçalara sırayla dokun', 'Tap the pieces below in order')}
          </T>
        )}
        {order.map((p, pos) => {
          const right = p === pos;
          const border = reveal ? (right ? colors.success : colors.danger) : color;
          return (
            <Pressable key={p} disabled={reveal} onPress={() => onRemove(p)}>
              <View style={[styles.piece, { borderColor: border, backgroundColor: reveal ? (right ? colors.tintGreen : colors.tintRed) : color + '10' }]}>
                <View style={[styles.num, { backgroundColor: border }]}>
                  <T w="black" size={12} color="#fff">
                    {pos + 1}
                  </T>
                </View>
                <T w="semibold" size={13} style={{ flex: 1, lineHeight: 19 }}>
                  {item.parts[p]}
                </T>
              </View>
            </Pressable>
          );
        })}
      </View>
      <View style={{ gap: 8, marginTop: 14 }}>
        {remaining.map((p) => (
          <Pressable key={p} disabled={reveal} onPress={() => onAdd(p)}>
            {({ pressed }) => (
              <View style={[styles.piece, styles.pieceIdle, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
                <Ionicons name="add-circle" size={20} color={colors.faint} />
                <T w="semibold" size={13} style={{ flex: 1, lineHeight: 19 }}>
                  {item.parts[p]}
                </T>
              </View>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}

const styles = themedStyles(() =>
  StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 18, paddingBottom: 12 },
  body: { padding: 16, paddingBottom: 30 },
  promptRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  questionCard: { backgroundColor: colors.card, borderRadius: 18, padding: 14, borderLeftWidth: 5, ...shadow(1) },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 2,
    borderRadius: 18,
    padding: 14,
  },
  letter: { width: 30, height: 30, borderRadius: 10, borderWidth: 2, alignItems: 'center', justifyContent: 'center' },
  slotArea: { gap: 8, minHeight: 90, justifyContent: 'center' },
  slotEmpty: { borderWidth: 2, borderStyle: 'dashed', borderColor: colors.border, borderRadius: 18, padding: 16 },
  piece: { flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 2, borderRadius: 16, padding: 12 },
  pieceIdle: { backgroundColor: colors.card, borderColor: colors.border, borderBottomWidth: 4 },
  answerCard: {
    marginTop: 10,
    backgroundColor: colors.card,
    borderRadius: 18,
    padding: 14,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.border,
  },
  chipsWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  conceptChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  num: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  footer: {
    paddingHorizontal: 16,
    paddingTop: 12,
    backgroundColor: colors.bg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  feedback: { paddingHorizontal: 16, paddingTop: 16, borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  feedbackHead: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 },
  feedbackIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  done: { flex: 1, alignItems: 'center', paddingHorizontal: 20 },
  doneScore: { fontFamily: fonts.black, fontSize: 52, color: '#fff' },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 22,
    backgroundColor: 'rgba(255,255,255,0.16)',
    borderRadius: 16,
    padding: 12,
    marginHorizontal: 8,
  },
  }),
);
