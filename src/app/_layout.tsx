import {
  Nunito_400Regular,
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
  Nunito_900Black,
  useFonts,
} from '@expo-google-fonts/nunito';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AchievementToast } from '@/components/AchievementToast';
import { colors, fonts } from '@/components/ui';
import { StoreProvider } from '@/lib/store';

SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
    Nunito_900Black,
  });

  useEffect(() => {
    if (loaded || error) SplashScreen.hideAsync().catch(() => {});
  }, [loaded, error]);

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
        <Stack.Screen name="profession/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="track/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="session/[unitId]" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="quiz/[unitId]" options={{ headerShown: false, gestureEnabled: false }} />
        <Stack.Screen name="profil" options={{ headerShown: false }} />
        <Stack.Screen name="gunluk" options={{ headerShown: false }} />
        <Stack.Screen name="hatalar" options={{ headerShown: false }} />
        <Stack.Screen name="report/[id]" options={{ headerShown: false, gestureEnabled: false, animation: 'fade' }} />
      </Stack>
      <AchievementToast />
    </StoreProvider>
  );
}
