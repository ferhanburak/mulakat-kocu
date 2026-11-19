import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getLang, tt } from './i18n';

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

/**
 * Creates the Android channel. Some Android builds (seen in Expo Go) reject this
 * call; reminders then go to the default channel instead of failing.
 */
async function ensureChannel(): Promise<boolean> {
  if (Platform.OS !== 'android') return false;
  try {
    await Notifications.setNotificationChannelAsync(CHANNEL, {
      name: tt('Seri hatırlatıcısı', 'Streak reminder'),
      // A TypeScript enum re-export the import plugin can't see; tsc checks it.
      // eslint-disable-next-line import/namespace
      importance: Notifications.AndroidImportance.DEFAULT,
    });
    return true;
  } catch {
    return false;
  }
}

/** Creates the Android channel and asks for permission. Returns whether granted. */
export async function enableReminders(): Promise<boolean> {
  if (!remindersSupported) return false;
  try {
    await ensureChannel();
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    const req = await Notifications.requestPermissionsAsync();
    return req.granted;
  } catch {
    return false;
  }
}

const COMEBACK = {
  tr: [
    { title: 'Mülakata hazır mısın? 🎯', body: '3 dakikalık bir hızlı pratikle güne başla.' },
    { title: 'Bugün bir soru, yarın bir teklif 💼', body: 'Kısa bir mülakat simülasyonu seni bekliyor.' },
    { title: 'Seni özledik 👋', body: 'Yeni bir seri başlatmak için tek bir pratik yeter.' },
    { title: 'Rakiplerin çalışıyor 👀', body: 'Bugün bir ünite tamamla, bir adım öne geç.' },
    { title: 'STAR tekniğini unutma ⭐', body: 'Durum, Görev, Aksiyon, Sonuç — hadi bir soruda dene.' },
  ],
  en: [
    { title: 'Ready for your interview? 🎯', body: 'Start the day with a 3-minute quick practice.' },
    { title: 'A question today, an offer tomorrow 💼', body: 'A short interview simulation is waiting for you.' },
    { title: 'We missed you 👋', body: 'One practice is all it takes to start a new streak.' },
    { title: 'Your competition is practising 👀', body: 'Finish a unit today and get a step ahead.' },
    { title: "Don't forget the STAR technique ⭐", body: 'Situation, Task, Action, Result — try it on a question.' },
  ],
};

/**
 * Schedules one reminder per day for the next week at `hour`, skipping today
 * if the user already practised. Re-run after every activity so a day with
 * practice never gets a reminder.
 */
export async function scheduleReminders(hour: number, streak: number, practicedToday: boolean) {
  if (!remindersSupported) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
  const channelId = (await ensureChannel()) ? CHANNEL : undefined;
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
      ? {
          title: tt(`🔥 ${streak} günlük serin tehlikede!`, `🔥 Your ${streak}-day streak is at risk!`),
          body: tt('Serini korumak için bugün kısa bir pratik yap.', 'Do a quick practice today to keep your streak.'),
        }
      : COMEBACK[getLang()][(now.getDate() + d) % COMEBACK[getLang()].length];
    await Notifications.scheduleNotificationAsync({
      content,
      trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: at, channelId },
    });
  }
}

export async function cancelReminders() {
  if (!remindersSupported) return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}
