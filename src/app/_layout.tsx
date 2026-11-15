import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  useFonts,
} from '@expo-google-fonts/nunito';
import { Stack, router, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AchievementToast } from '@/components/AchievementToast';
import { colors, fonts, resetTo } from '@/components/ui';
import { StoreProvider, useStore } from '@/lib/store';

SplashScreen.preventAutoHideAsync().catch(() => {});

/** Screens reachable without a session. */
const PUBLIC = ['hosgeldin', 'kayit', 'giris'];

/**
 * Sends visitors without a session to the welcome screen and new users to profile
 * setup. Keeps the splash screen up until saved state has loaded, so nothing flashes.
 */
function AuthGate() {
  const { ready, session, profile } = useStore();
  const segments = useSegments();
  const first = segments[0] as string | undefined;

  useEffect(() => {
    if (!ready) return;
    SplashScreen.hideAsync().catch(() => {});
    const onPublic = !!first && PUBLIC.includes(first);
    if (!session) {
      if (onPublic) return;
      // Signing out drops the whole history, so "back" can't return into the app.
      resetTo('/hosgeldin');
    } else if (!profile && !onPublic && first !== 'profil-kurulum') {
      // Sign-up/sign-in screens route on their own after success.
      router.replace('/profil-kurulum');
    }
  }, [ready, session, profile, first]);

  return null;
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  if (!loaded && !error) return null;

  return (
    <StoreProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.bg },
          headerShadowVisible: false,
          headerTitleStyle: { fontFamily: fonts.black, color: colors.text },
          headerTintColor: colors.text,
          contentStyle: { backgroundColor: colors.bg },
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="hosgeldin" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="kayit" options={{ headerShown: false }} />
        <Stack.Screen name="giris" options={{ headerShown: false }} />
        <Stack.Screen name="profil-kurulum" options={{ headerShown: false }} />
        <Stack.Screen name="profession/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="track/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="session/[unitId]" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="quiz/[unitId]" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="profil" options={{ headerShown: false }} />
        <Stack.Screen name="gunluk" options={{ headerShown: false }} />
        <Stack.Screen name="hatalar" options={{ headerShown: false }} />
        <Stack.Screen name="report/[id]" options={{ headerShown: false, gestureEnabled: false, animation: 'fade' }} />
      </Stack>
      <AuthGate />
      <AchievementToast />
    </StoreProvider>
  );
}
