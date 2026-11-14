import { useEffect, useRef } from 'react';
import { Animated, Easing, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '@/lib/store';
import { Ionicons, T, colors, notify, shade, shadow, type IconName } from './ui';

/** Celebratory banner that slides in from the top for unlocked achievements and level-ups. */
export function AchievementToast() {
  const insets = useSafeAreaInsets();
  const { toast, dismissToast } = useStore();
  const y = useRef(new Animated.Value(-160)).current;
  const native = Platform.OS !== 'web';

  useEffect(() => {
    if (!toast) return;
    notify(true);
    y.setValue(-160);
    Animated.spring(y, { toValue: 0, useNativeDriver: native, friction: 7 }).start();
    const t = setTimeout(hide, 3400);
    return () => clearTimeout(t);
  }, [toast?.key]); // eslint-disable-line react-hooks/exhaustive-deps

  function hide() {
    Animated.timing(y, { toValue: -160, duration: 220, easing: Easing.in(Easing.quad), useNativeDriver: native }).start(() =>
      dismissToast(),
    );
  }

  if (!toast) return null;
  return (
    <Animated.View pointerEvents="box-none" style={[styles.wrap, { top: insets.top + 8, transform: [{ translateY: y }] }]}>
      <Pressable onPress={hide} style={[styles.card, { borderColor: shade(toast.color, 0.55) }]}>
        <View style={[styles.badge, { backgroundColor: toast.color, borderColor: shade(toast.color, -0.25) }]}>
          <Ionicons name={toast.icon as IconName} size={26} color="#fff" />
        </View>
        <View style={{ flex: 1 }}>
          <T w="black" size={11} color={toast.color} style={{ letterSpacing: 1 }}>
            {toast.label} 🎉
          </T>
          <T w="black" size={17}>
            {toast.title}
          </T>
          <T w="semibold" size={12} color={colors.muted}>
            {toast.desc}
          </T>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', left: 12, right: 12, zIndex: 100 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 2,
    padding: 12,
    ...shadow(2),
  },
  badge: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 4 },
});
