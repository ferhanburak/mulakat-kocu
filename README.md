# Mülakat Koçu

Duolingo tarzı, oyunlaştırılmış bir mülakat pratiği uygulaması. Kullanıcı bir meslek ve alan seçer, Junior → Senior beceri yolunda ilerler, açık uçlu mülakat simülasyonları ve hızlı pratiklerle kendini geliştirir; her mülakattan sonra güçlü ve zayıf yanlarını gösteren bir rapor alır.

Expo (React Native) ile yazıldı; aynı kod iOS, Android ve web'de çalışır.

## Özellikler

- **17 meslek + Mülakat Türleri:** yazılım, veri, ürün, mühendislikler, pazarlama, satış, bankacılık, finans, İK, havacılık & turizm, eğitim, sağlık, psikoloji, hukuk; ayrıca Genel/İK, İngilizce, Maaş Pazarlığı ve Yeni Mezun mülakatları
- **Mülakat simülasyonu:** sohbet arayüzü, soruları sesli okuyan mülakatçı, STAR ipuçları
- **Rapor:** içerik, yapı, netlik ve somutluk puanları; soru bazında eksik kavramlar ve örnek güçlü cevap
- **Hızlı Pratik:** soru bankasından otomatik üretilen çoktan seçmeli ve sıralama soruları
- **Günün Sorusu** ve **Hata Defteri** (eksik kavramlara yönelik tekrar)
- **Oyunlaştırma:** XP, seviye, günlük seri, 22 başarım, seri hatırlatıcı bildirimleri

## Çalıştırma

```bash
npm install
npx expo start
```

Terminaldeki QR kodu telefondaki **Expo Go** uygulamasıyla okut. Web önizlemesi için `npx expo start --web`.

## Proje yapısı

```
src/
  app/            Ekranlar (Expo Router)
  components/     Tasarım sistemi ve ortak bileşenler
  data/catalog/   Meslekler, alanlar ve sorular
  lib/            Değerlendirici, pratik üretici, kayıt, başarımlar, bildirimler, ses
```

## Değerlendirme hakkında

Cevaplar şu an kural tabanlı ve çevrimdışı puanlanıyor (anahtar kavramlar, STAR yapısı, netlik, somutluk). `src/lib/evaluator.ts` aynı rapor yapısını döndüren bir yapay zekâ değerlendiricisiyle değiştirilebilecek şekilde tasarlandı.
