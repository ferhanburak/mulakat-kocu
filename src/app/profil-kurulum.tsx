import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { useState, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Field } from '@/components/AuthForm';
import { Bar, Button, FadeIn, GradientIcon, Ionicons, T, colors, goBack, shadow, tap, type IconName } from '@/components/ui';
import { findProfession, findTrack, professions } from '@/data/professions';
import { updateName } from '@/lib/auth';
import { GOALS, STAGES } from '@/lib/profileOptions';
import { useStore, type CareerStage, type UserProfile } from '@/lib/store';

const careers = professions.filter((p) => !p.general);

type Step = 'name' | 'profession' | 'track' | 'stage' | 'goal';

const COPY: Record<Step, { title: string; sub: string }> = {
  name: { title: 'Adın', sub: 'Sana nasıl hitap edelim?' },
  profession: { title: 'Hangi alanda mülakata hazırlanıyorsun?', sub: 'Ana sayfan bu seçime göre şekillenir.' },
  track: { title: 'Hangi rol?', sub: 'Pratiklerin bu rolden başlar; diğerlerine her zaman geçebilirsin.' },
  stage: { title: 'Kariyerinde neredesin?', sub: 'Sorularının zorluğunu buna göre öneririz.' },
  goal: { title: 'Günlük hedefin ne olsun?', sub: 'Hedefini tamamladığın her gün serin büyür.' },
};

export default function ProfileSetup() {
  const insets = useSafeAreaInsets();
  const { edit } = useLocalSearchParams<{ edit?: string }>();
  const editing = edit === '1';
  const { profile, session, saveProfile, renameAccount } = useStore();
  const account = session?.mode === 'user' ? session.account : null;
  const start = editing ? profile : null;

  const [name, setName] = useState(account?.name ?? '');
  const [professionId, setProfessionId] = useState<string | null>(start?.professionId ?? null);
  const [trackId, setTrackId] = useState<string | null>(start?.trackId ?? null);
  const [stage, setStage] = useState<CareerStage | null>(start?.stage ?? null);
  const [goal, setGoal] = useState<UserProfile['dailyGoal'] | null>(start?.dailyGoal ?? null);

  const steps: Step[] = [...(editing && account ? (['name'] as const) : []), 'profession', 'track', 'stage', 'goal'];
  const [index, setIndex] = useState(0);
  const step = steps[index];
  const profession = professionId ? findProfession(professionId) : undefined;

  const canContinue =
    step === 'name'
      ? name.trim().length >= 2
      : step === 'profession'
        ? !!professionId
        : step === 'track'
          ? !!trackId && findTrack(trackId)?.profession.id === professionId
          : step === 'stage'
            ? !!stage
            : !!goal;

  const finish = () => {
    if (!professionId || !trackId || !stage || !goal) return;
    saveProfile({ professionId, trackId, stage, dailyGoal: goal });
    const trimmed = name.trim();
    if (account && trimmed.length >= 2 && trimmed !== account.name) {
      renameAccount(trimmed);
      updateName(account.email, trimmed).catch(() => {});
    }
    if (editing) goBack('/profil');
    else router.replace('/');
  };

  const next = () => {
    if (!canContinue) return;
    if (index === steps.length - 1) finish();
    else setIndex(index + 1);
  };

  const back = () => {
    tap();
    if (index > 0) setIndex(index - 1);
    else if (editing) goBack('/profil');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <LinearGradient
        colors={[colors.primary, colors.primary2]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.header, { paddingTop: insets.top + 10 }]}
      >
        <View style={styles.headRow}>
          {index > 0 || editing ? (
            <Pressable onPress={back} hitSlop={12} style={styles.back}>
              <Ionicons name={index === 0 ? 'close' : 'chevron-back'} size={24} color="#fff" />
            </Pressable>
          ) : (
            <View style={styles.back} />
          )}
          <View style={{ flex: 1 }}>
            <Bar value={((index + 1) / steps.length) * 100} color="#fff" height={8} />
          </View>
          <T w="black" size={13} color="#fff">
            {index + 1}/{steps.length}
          </T>
        </View>
        <T w="black" size={23} color="#fff" style={{ marginTop: 18 }}>
          {COPY[step].title}
        </T>
        <T w="semibold" size={13} color="rgba(255,255,255,0.88)" style={{ marginTop: 2 }}>
          {COPY[step].sub}
        </T>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.body} keyboardShouldPersistTaps="handled">
        <FadeIn key={step}>
          {step === 'name' && (
            <Field
              label="Ad soyad"
              icon="person"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoComplete="name"
              returnKeyType="next"
              onSubmitEditing={next}
            />
          )}

          {step === 'profession' && (
            <View style={styles.grid}>
              {careers.map((p) => {
                const on = p.id === professionId;
                return (
                  <View key={p.id} style={styles.tileWrap}>
                    <Pressable
                      onPress={() => {
                        tap();
                        if (p.id !== professionId) setTrackId(p.tracks.length === 1 ? p.tracks[0].id : null);
                        setProfessionId(p.id);
                      }}
                      style={[styles.tile, on && { borderColor: p.color, backgroundColor: p.color + '0F' }]}
                    >
                      <GradientIcon icon={p.icon as IconName} color={p.color} size={40} radius={12} />
                      <T w="black" size={14} numberOfLines={2} style={{ marginTop: 10, minHeight: 36 }}>
                        {p.name}
                      </T>
                      {on && <Check color={p.color} />}
                    </Pressable>
                  </View>
                );
              })}
            </View>
          )}

          {step === 'track' &&
            profession?.tracks.map((t) => (
              <Option
                key={t.id}
                on={t.id === trackId}
                color={profession.color}
                icon={t.icon as IconName}
                title={t.name}
                desc={t.tagline}
                onPress={() => setTrackId(t.id)}
              />
            ))}

          {step === 'stage' &&
            STAGES.map((s) => (
              <Option key={s.id} on={s.id === stage} color={colors.primary} icon={s.icon} title={s.label} desc={s.desc} onPress={() => setStage(s.id)} />
            ))}

          {step === 'goal' &&
            GOALS.map((g) => (
              <Option
                key={g.id}
                on={g.id === goal}
                color={colors.streak}
                icon={g.icon}
                title={g.label}
                desc={g.desc}
                onPress={() => setGoal(g.id)}
                right={
                  <T w="black" size={22} color={g.id === goal ? colors.streak : colors.faint}>
                    {g.id}
                  </T>
                }
              />
            ))}
        </FadeIn>
      </ScrollView>

      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <Button
          title={index === steps.length - 1 ? (editing ? 'KAYDET' : 'BAŞLAYALIM') : 'DEVAM'}
          icon={index === steps.length - 1 ? 'checkmark' : 'arrow-forward'}
          onPress={next}
          disabled={!canContinue}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

function Check({ color }: { color: string }) {
  return (
    <View style={[styles.check, { backgroundColor: color }]}>
      <Ionicons name="checkmark" size={14} color="#fff" />
    </View>
  );
}

function Option({
  on,
  color,
  icon,
  title,
  desc,
  onPress,
  right,
}: {
  on: boolean;
  color: string;
  icon: IconName;
  title: string;
  desc: string;
  onPress: () => void;
  right?: ReactNode;
}) {
  return (
    <Pressable
      onPress={() => {
        tap();
        onPress();
      }}
    >
      {({ pressed }) => (
        <View
          style={[
            styles.option,
            {
              borderColor: on ? color : colors.border,
              backgroundColor: on ? color + '0F' : colors.card,
              borderBottomWidth: pressed ? 2 : 5,
              marginTop: pressed ? 3 : 0,
            },
          ]}
        >
          <View style={[styles.optionIcon, { backgroundColor: on ? color : color + '1A' }]}>
            <Ionicons name={icon} size={22} color={on ? '#fff' : color} />
          </View>
          <View style={{ flex: 1 }}>
            <T w="black" size={16}>
              {title}
            </T>
            <T w="semibold" size={13} color={colors.muted} style={{ marginTop: 1 }}>
              {desc}
            </T>
          </View>
          {right ?? <Ionicons name={on ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={on ? color : colors.faint} />}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { paddingHorizontal: 18, paddingBottom: 22, borderBottomLeftRadius: 28, borderBottomRightRadius: 28 },
  headRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  back: { width: 28, height: 32, justifyContent: 'center' },
  body: { padding: 16, paddingBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', marginHorizontal: -6 },
  tileWrap: { width: '50%', padding: 6 },
  tile: { backgroundColor: colors.card, borderRadius: 20, padding: 14, borderWidth: 2, borderColor: colors.card, ...shadow(1) },
  check: { position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  option: { flexDirection: 'row', alignItems: 'center', gap: 14, borderWidth: 2, borderRadius: 20, padding: 14, marginBottom: 12 },
  optionIcon: { width: 46, height: 46, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingHorizontal: 16, paddingTop: 12, backgroundColor: colors.bg, borderTopWidth: 1, borderTopColor: colors.border },
});
