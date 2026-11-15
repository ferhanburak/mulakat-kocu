import { LinearGradient } from 'expo-linear-gradient';
import { useState, type ComponentRef, type ReactNode, type Ref } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeIn, Ionicons, T, colors, fonts, goBack, shadow, type IconName } from './ui';

/** Gradient header + keyboard-safe scrolling body shared by the sign-up and sign-in screens. */
export function AuthScaffold({
  icon,
  title,
  subtitle,
  children,
}: {
  icon: IconName;
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  const insets = useSafeAreaInsets();
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }} keyboardShouldPersistTaps="handled">
        <LinearGradient
          colors={[colors.primary, colors.primary2]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + 8 }]}
        >
          <Pressable onPress={() => goBack('/hosgeldin')} hitSlop={12} style={[styles.back, { top: insets.top + 8 }]}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </Pressable>
          <View style={styles.heroIcon}>
            <Ionicons name={icon} size={30} color={colors.primary} />
          </View>
          <T w="black" size={24} color="#fff" style={{ marginTop: 10 }}>
            {title}
          </T>
          <T w="semibold" size={13} color="rgba(255,255,255,0.88)" style={{ textAlign: 'center' }}>
            {subtitle}
          </T>
        </LinearGradient>
        <FadeIn style={styles.body}>{children}</FadeIn>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export type InputRef = ComponentRef<typeof TextInput>;
type FieldProps = TextInputProps & { label: string; icon: IconName; secret?: boolean; ref?: Ref<InputRef> };

/** Labelled input with an icon; `secret` adds a show/hide toggle for passwords. */
export function Field({ label, icon, secret, style, ref, ...rest }: FieldProps) {
  const [focused, setFocused] = useState(false);
  const [hidden, setHidden] = useState(true);
  return (
    <View style={{ marginBottom: 14 }}>
      <T w="extrabold" size={13} color={colors.muted} style={{ marginBottom: 6, marginLeft: 4 }}>
        {label}
      </T>
      <View style={[styles.field, focused && { borderColor: colors.primary }]}>
        <Ionicons name={icon} size={19} color={focused ? colors.primary : colors.faint} />
        <TextInput
          ref={ref}
          placeholderTextColor={colors.faint}
          secureTextEntry={secret && hidden}
          autoCorrect={false}
          {...rest}
          onFocus={(e) => {
            setFocused(true);
            rest.onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocused(false);
            rest.onBlur?.(e);
          }}
          style={[styles.input, style]}
        />
        {secret && (
          <Pressable
            onPress={() => setHidden((h) => !h)}
            hitSlop={10}
            accessibilityRole="button"
            accessibilityLabel={hidden ? 'Şifreyi göster' : 'Şifreyi gizle'}
          >
            <Ionicons name={hidden ? 'eye' : 'eye-off'} size={20} color={colors.muted} />
          </Pressable>
        )}
      </View>
    </View>
  );
}

export function FormError({ message }: { message: string | null }) {
  if (!message) return null;
  return (
    <View style={styles.error}>
      <Ionicons name="alert-circle" size={18} color={colors.danger} />
      <T w="bold" size={13} color={colors.danger} style={{ flex: 1 }}>
        {message}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { alignItems: 'center', paddingHorizontal: 20, paddingBottom: 26, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  back: { position: 'absolute', left: 14, zIndex: 2 },
  heroIcon: { width: 64, height: 64, borderRadius: 22, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', marginTop: 18, ...shadow(1) },
  body: { paddingHorizontal: 20, paddingTop: 24 },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    fontFamily: fonts.bold,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 13,
    ...(Platform.OS === 'web' ? ({ outlineStyle: 'none' } as object) : {}),
  },
  error: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FDECEC',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
});
