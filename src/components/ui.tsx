import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, type Href } from 'expo-router';
import { useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import {
  Animated,
  Easing,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export type IconName = ComponentProps<typeof Ionicons>['name'];
export { Ionicons };

export const colors = {
  bg: '#F7F6FB',
  card: '#FFFFFF',
  text: '#17152B',
  muted: '#7A7690',
  faint: '#B5B1C8',
  border: '#ECEAF4',
  primary: '#5B4BDB',
  primary2: '#8B5CF6',
  success: '#1FB57A',
  warn: '#F5A524',
  danger: '#EF5A5A',
  streak: '#FF7A1A',
  xp: '#5B4BDB',
};

export const fonts = {
  regular: 'Nunito_400Regular',
  semibold: 'Nunito_600SemiBold',
  bold: 'Nunito_700Bold',
  extrabold: 'Nunito_800ExtraBold',
  black: 'Nunito_900Black',
};

export const scoreColor = (n: number) => (n >= 70 ? colors.success : n >= 55 ? colors.warn : colors.danger);

/** Darken (amt < 0) or lighten (amt > 0) a #RRGGBB colour. */
export function shade(hex: string, amt: number) {
  const n = parseInt(hex.slice(1), 16);
  const ch = (v: number) => Math.max(0, Math.min(255, Math.round(v + (amt < 0 ? v * amt : (255 - v) * amt))));
  const r = ch((n >> 16) & 255);
  const g = ch((n >> 8) & 255);
  const b = ch(n & 255);
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`;
}

export const shadow = (level: 1 | 2 = 1): ViewStyle => ({
  shadowColor: '#2A1F7A',
  shadowOpacity: level === 1 ? 0.06 : 0.12,
  shadowRadius: level === 1 ? 10 : 18,
  shadowOffset: { width: 0, height: level === 1 ? 4 : 8 },
  elevation: level === 1 ? 2 : 5,
});

/** Go back when there is history (e.g. after a deep link or reload there is none). */
export const goBack = (fallback: Href = '/') => {
  if (router.canGoBack()) router.back();
  else router.replace(fallback);
};

export const tap = (style: Haptics.ImpactFeedbackStyle = Haptics.ImpactFeedbackStyle.Light) => {
  if (Platform.OS !== 'web') Haptics.impactAsync(style).catch(() => {});
};
export const notify = (ok: boolean) => {
  if (Platform.OS !== 'web')
    Haptics.notificationAsync(ok ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning).catch(() => {});
};

type Weight = keyof typeof fonts;
export function T({
  w = 'semibold',
  size = 15,
  color = colors.text,
  style,
  ...rest
}: TextProps & { w?: Weight; size?: number; color?: string; style?: StyleProp<TextStyle> }) {
  return <Text {...rest} style={[{ fontFamily: fonts[w], fontSize: size, color }, style]} />;
}

export function Button({
  title,
  onPress,
  color = colors.primary,
  variant = 'solid',
  icon,
  disabled,
  style,
}: {
  title: string;
  onPress: () => void;
  color?: string;
  variant?: 'solid' | 'outline';
  icon?: IconName;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  const solid = variant === 'solid';
  const base = disabled ? '#DAD7E6' : solid ? color : '#fff';
  const edge = disabled ? '#C4C0D4' : solid ? shade(color, -0.28) : colors.border;
  const fg = disabled ? '#fff' : solid ? '#fff' : color;
  return (
    <Pressable
      disabled={disabled}
      onPress={() => {
        tap();
        onPress();
      }}
      style={style}
    >
      {({ pressed }) => (
        <View style={[styles.btnEdge, { backgroundColor: edge, paddingBottom: pressed ? 1 : 4, marginTop: pressed ? 3 : 0 }]}>
          <View style={[styles.btn, { backgroundColor: base, borderColor: solid ? base : colors.border }]}>
            {icon && <Ionicons name={icon} size={18} color={fg} />}
            <T w="black" size={15} color={fg} style={{ letterSpacing: 0.8 }}>
              {title}
            </T>
          </View>
        </View>
      )}
    </Pressable>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function GradientIcon({
  icon,
  color,
  size = 48,
  radius = 14,
}: {
  icon: IconName;
  color: string;
  size?: number;
  radius?: number;
}) {
  return (
    <LinearGradient
      colors={[shade(color, 0.25), color]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{ width: size, height: size, borderRadius: radius, alignItems: 'center', justifyContent: 'center' }}
    >
      <Ionicons name={icon} size={size * 0.5} color="#fff" />
    </LinearGradient>
  );
}

export function Bar({ value, color, height = 10, delay = 0 }: { value: number; color?: string; height?: number; delay?: number }) {
  const anim = useState(() => new Animated.Value(0))[0];
  useEffect(() => {
    Animated.timing(anim, {
      toValue: Math.max(0, Math.min(100, value)),
      duration: 700,
      delay,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [value, delay, anim]);
  const width = anim.interpolate({ inputRange: [0, 100], outputRange: ['0%', '100%'] });
  return (
    <View style={[styles.barTrack, { height, borderRadius: height / 2 }]}>
      <Animated.View style={{ width, height: '100%', borderRadius: height / 2, backgroundColor: color ?? scoreColor(value) }}>
        <View style={[styles.barShine, { borderRadius: height / 2 }]} />
      </Animated.View>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export function Ring({
  value,
  size = 140,
  stroke = 12,
  color,
  track = colors.border,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color: string;
  track?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const anim = useState(() => new Animated.Value(0))[0];
  useEffect(() => {
    Animated.timing(anim, { toValue: value, duration: 1100, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [value, anim]);
  const offset = anim.interpolate({ inputRange: [0, 100], outputRange: [circ, 0] });
  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={StyleSheet.absoluteFill}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${circ} ${circ}`}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {children}
    </View>
  );
}

/** Counts from 0 up to `value` on mount. */
export function CountUp({ value, style }: { value: number; style?: StyleProp<TextStyle> }) {
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const anim = new Animated.Value(0);
    const id = anim.addListener(({ value: v }) => setShown(Math.round(v)));
    Animated.timing(anim, { toValue: value, duration: 1100, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    return () => anim.removeListener(id);
  }, [value]);
  return <Text style={style}>{shown}</Text>;
}

/** Fades and slides its children in on mount. */
export function FadeIn({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: StyleProp<ViewStyle> }) {
  const a = useState(() => new Animated.Value(0))[0];
  useEffect(() => {
    Animated.timing(a, { toValue: 1, duration: 380, delay, easing: Easing.out(Easing.cubic), useNativeDriver: Platform.OS !== 'web' }).start();
  }, [a, delay]);
  return (
    <Animated.View
      style={[style, { opacity: a, transform: [{ translateY: a.interpolate({ inputRange: [0, 1], outputRange: [14, 0] }) }] }]}
    >
      {children}
    </Animated.View>
  );
}

export function Chip({ icon, label, color, bg }: { icon?: IconName; label: string; color: string; bg: string }) {
  return (
    <View style={[styles.chip, { backgroundColor: bg }]}>
      {icon && <Ionicons name={icon} size={14} color={color} />}
      <T w="extrabold" size={13} color={color}>
        {label}
      </T>
    </View>
  );
}

const styles = StyleSheet.create({
  btnEdge: { borderRadius: 18 },
  btn: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  barTrack: { backgroundColor: colors.border, overflow: 'hidden' },
  barShine: { position: 'absolute', top: 2, left: 6, right: 6, height: 3, backgroundColor: 'rgba(255,255,255,0.35)' },
  card: {
    backgroundColor: colors.card,
    borderRadius: 22,
    padding: 18,
    ...shadow(1),
  },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, paddingHorizontal: 10, paddingVertical: 5, borderRadius: 999 },
});
