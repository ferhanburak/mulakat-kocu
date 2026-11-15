# Yol Haritası

Mülakat Koçu'nun bugüne kadar gelişi ve önümüzdeki adımlar. Her faz bir öncekinin üzerine kurulur; fazlar içindeki maddeler önem sırasına göredir.

Durum işaretleri: ✅ tamamlandı · 🚧 yapılıyor · 🔜 sıradaki · 💡 fikir aşamasında

---

## Faz 0 — Temel (✅ tamamlandı)

- ✅ Expo (React Native) mobil uygulama iskeleti, Expo Router
- ✅ Tasarım sistemi: Nunito yazı tipi, ikonlar, animasyonlar, 3D butonlar, titreşim
- ✅ Soru bankası modeli: meslek → alan → ünite → soru (kavram rubriği + örnek güçlü cevap)
- ✅ 17 meslek, 60 alan, 131 ünite, 183 soru + meslekten bağımsız Mülakat Türleri
- ✅ Açık uçlu mülakat simülasyonu ve kural tabanlı değerlendirme (içerik, yapı, netlik, somutluk)
- ✅ Detaylı rapor: güçlü / zayıf yanlar, soru bazında eksik kavramlar, örnek cevap
- ✅ Hızlı Pratik: otomatik üretilen çoktan seçmeli ve sıralama soruları
- ✅ Oyunlaştırma: XP, seviye, günlük seri, 22 başarım, kutlama bildirimleri
- ✅ Günün Sorusu, Hata Defteri (eksik kavramlara yönelik tekrar)
- ✅ Seri hatırlatıcı bildirimleri, mülakatçının soruları sesli okuması

## Faz 1 — Hesap ve kişiselleştirme (🚧 yapılıyor)

- ✅ Hoş geldin ekranı, kayıt ve giriş (Supabase Auth)
- ✅ Profil: ad, hedef meslek ve alan, seviye, günlük hedef; sonradan düzenlenebilir
- ✅ Misafir deneme modu: her alanın ilk ünitesi, 3 mülakat hakkı, kayıtla ilerlemenin korunması
- ✅ Kişiselleşmiş ana sayfa: "Senin alanın" kartı, hedef alandan devam, isimle selamlama, günlük hedef halkası
- 🔜 İlerleme grafiği: zaman içinde puan gelişimi, en zayıf kategori
- ✅ Dil seçeneği: Türkçe ve İngilizce (arayüz, tüm sorular, değerlendirme kavramları, örnek cevaplar, geri bildirimler)
- 🔜 Karanlık mod

## Faz 2 — Pratik çeşitliliği (🔜 sıradaki)

- ✅ Mülakatçı karakterleri: Elif/Emily (sıcak İK uzmanı), Kerem/Daniel (detaycı alan uzmanı), Murat/Richard (sert departman müdürü); her birinin açılış, geçiş ve kapanış cümleleri ve her dil için ana dili olan sesi var
- 🔜 Süreli mod: cevap başına 2 dakika
- 🔜 Yeni pratik tipleri: "zayıf cevaptaki hatayı bul", kavram–tanım eşleştirme, "iki cevaptan hangisi daha iyi?"
- 🔜 Eksik Senior üniteler (yeni mesleklerin çoğunda)
- 🔜 Yeni meslekler: Danışmanlık (vaka mülakatı), Mimarlık & Tasarım, Kamu sözlü mülakatları, Dış Ticaret & Lojistik
- 🔜 Yeni alanlar: Yapay Zekâ/ML, Oyun Geliştirme, Bulut Mimarlığı
- 💡 Sektör uzmanlarıyla içerik doğrulaması (özellikle hukuk ve sağlık)

## Faz 3 — Sunucu ve gerçek hesaplar (🚧 yapılıyor)

- ✅ Supabase ile gerçek kimlik doğrulama (`src/lib/auth.ts`), satır bazlı güvenlikli `profiles` tablosu (`supabase/migrations/`)
- ✅ İlerlemenin bulutta saklanması ve cihazlar arası eşitleme; misafir ilerlemesi kayıtta buluta taşınır, çevrimdışı değişiklikler sonra gönderilir
- 🔜 E-posta doğrulama (yayından önce açılacak), şifre sıfırlama, Google / Apple ile giriş
- 💡 Haftalık lig ve arkadaş sıralaması
- 💡 İçerik yönetimi: soruları uygulama güncellemesi olmadan yayınlama

## Faz 4 — Yapay zekâ

- 🔜 Claude ile değerlendirme: aynı rapor yapısı, anlamı anlayan puanlama (`src/lib/evaluator.ts` arayüzü korunur)
- 🔜 Takip soruları soran, cevaba göre ilerleyen mülakatçı
- 🔜 Maliyet kontrolü: önbellekli rubrik, kullanıcı başı günlük limit, harcama tavanı
- 💡 CV'ye ve ilana göre kişiselleştirilmiş mülakat

## Faz 5 — Sesli mülakat

- ✅ Soruların cihaz sesiyle okunması (ilk adım)
- ✅ Doğal yapay zekâ sesi: tüm sorular ana dili Türkçe / İngilizce olan seslerle önceden seslendirildi, uygulamayla birlikte gelir (`scripts/generate_voices.py`)
- 🔜 Konuşarak cevap verme ve yazıya çevirme (development build gerekir)
- 🔜 Konuşma analizi: hız, duraksama, dolgu kelimeler
- 💡 Yapay zekâ ile doğal, gerçek zamanlı sesli mülakat (premium)

## Faz 6 — Yayın ve gelir

- 🔜 Telefonda kapsamlı test (bildirimler, ses, titreşim, klavye)
- 🔜 Mülakatçı seslerini resmî Azure Speech anahtarıyla yeniden üretmek (şu anki klipler ücretsiz Edge servisiyle üretildi)
- 🔜 Uygulama ikonu, açılış ekranı, mağaza görselleri
- 🔜 EAS Build ile App Store ve Google Play yayını
- 🔜 Freemium model: ücretsiz günlük hak, premium'da sınırsız yapay zekâ raporu ve sesli mülakat
- 💡 Kurumsal / üniversite kariyer merkezi paketleri

---

## Teknik notlar

- **Değerlendirici** (`src/lib/evaluator.ts`) ve **giriş katmanı** (`src/lib/auth.ts`) değiştirilebilir arayüzler olarak tasarlandı; yapay zekâ ve sunucu geldiğinde ekranlar değişmeden kalır.
- Yapay zekâ anahtarı uygulamanın içine konmaz; araya kullanıcı başı limit uygulayan küçük bir sunucu fonksiyonu girer.
