import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

/** Local notifications are not available on web. */
export const remindersSupported = Platform.OS !== 'web';

if (remindersSupported) {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

const CHANNEL = 'streak';
const DAYS_AHEAD = 7;

/** Creates the Android channel and asks for permission. Returns whether granted. */
export async function enableReminders(): Promise<boolean> {
  if (!remindersSupported) return false;
  await Notifications.setNotificationChannelAsync(CHANNEL, {
    name: 'Seri hatırlatıcısı',
    // A TypeScript enum re-export the import plugin can't see; tsc checks it.
    // eslint-disable-next-line import/namespace
    importance: Notifications.AndroidImportance.DEFAULT,
  });
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  const req = await Notifications.requestPermissionsAsync();
  return req.granted;
}

const COMEBACK = [
  { title: 'Mülakata hazır mısın? 🎯', body: '3 dakikalık bir hızlı pratikle güne başla.' },
  { title: 'Bugün bir soru, yarın bir teklif 💼', body: 'Kısa bir mülakat simülasyonu seni bekliyor.' },
  { title: 'Seni özledik 👋', body: 'Yeni bir seri başlatmak için tek bir pratik yeter.' },
  { title: 'Rakiplerin çalışıyor 👀', body: 'Bugün bir ünite tamamla, bir adım öne geç.' },
  { title: 'STAR tekniğini unutma ⭐', body: 'Durum, Görev, Aksiyon, Sonuç — hadi bir soruda dene.' },
];

/**
 * Schedules one reminder per day for the next week at `hour`, skipping today
 * if the user already practised. Re-run after every activity so a day with
 * practice never gets a reminder.
 */
export async function scheduleReminders(hour: number, streak: number, practicedToday: boolean) {
  if (!remindersSupported) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
  const now = new Date();
  for (let d = 0; d < DAYS_AHEAD; d++) {
    const at = new Date(now);
    at.setDate(now.getDate() + d);
    at.setHours(hour, 0, 0, 0);
    if (at <= now) continue;
    if (d === 0 && practicedToday) continue;
    // Tomorrow the streak is still alive (if they practised today); after that it is gone.
    const alive = streak > 0 && ((d === 0 && !practicedToday) || (d === 1 && practicedToday));
    const content = alive
      ? { title: `🔥 ${streak} günlük serin tehlikede!`, body: 'Serini korumak için bugün kısa bir pratik yap.' }
      : COMEBACK[(now.getDate() + d) % COMEBACK.length];
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at, channelId: CHANNEL },
    });
  }
}

export async function cancelReminders() {
  if (!remindersSupported) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}
