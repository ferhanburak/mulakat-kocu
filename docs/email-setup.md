# E-posta kurulumu (Supabase + Resend)

Uygulama tarafı hazır: kayıt olunca "E-postanı onayla" ekranı çıkıyor (tekrar gönderme düğmesiyle), onay bağlantısı `/giris-tamam` ekranını açıp kullanıcıyı içeri alıyor, girişte "onaylanmadı" hatası alan kullanıcıya yeniden gönderme bağlantısı gösteriliyor. E-postaların dili kullanıcının `lang` bilgisine göre seçiliyor; uygulama bunu kayıtta, girişte ve dil değiştiğinde güncelliyor.

Aşağıdaki adımlar panelde yapılır.

## 1. Resend hesabı ve alan adı

1. https://resend.com adresinde hesap aç.
2. **Domains → Add domain** ile kendi alan adını ekle. Resend'in verdiği DNS kayıtlarını (SPF, DKIM) alan adı sağlayıcına gir ve "Verified" olmasını bekle.
   - Alan adı olmadan Resend yalnızca senin adresine gönderir. Gerçek kullanıcılar için alan adı şart.
3. **API Keys → Create API key** (yetki: "Sending access"). Anahtarı kopyala, hiçbir dosyaya ya da repoya yazma.

## 2. Supabase'e SMTP'yi bağla

Supabase → **Authentication → Emails → SMTP Settings** → "Enable custom SMTP":

| Alan | Değer |
| --- | --- |
| Sender email | `no-reply@<alan-adın>` |
| Sender name | `Mülakat Koçu` (isim kesinleşince değiştir) |
| Host | `smtp.resend.com` |
| Port | `465` |
| Username | `resend` |
| Password | Resend API anahtarı |

## 3. Şablonlar

Supabase → **Authentication → Emails → Templates**:

| Şablon | Konu (Subject) | İçerik |
| --- | --- | --- |
| Confirm signup | `Mülakat Koçu: e-postanı onayla · Confirm your email` | `supabase/templates/confirmation.html` |
| Reset password | `Mülakat Koçu: şifre sıfırlama · Reset your password` | `supabase/templates/recovery.html` |

Dosyanın tamamını (baştaki yorum dahil) "Message body" alanına yapıştır.

## 4. E-posta onayını aç

Supabase → **Authentication → Sign In / Providers → Email** → **Confirm email** açık.

## 5. Yönlendirme adresleri

Supabase → **Authentication → URL Configuration → Redirect URLs** listesine ekle:

- `mulakatkocu://**` (yüklü uygulama)
- `http://localhost:8081/**` (web'de geliştirme)
- `exp://**` (Expo Go ile denerken; yayında silinebilir)

Bunlar `/giris-tamam` ve `/sifre-yenile` bağlantılarının ikisini de kapsar.

## 6. Gönderim sınırı

Özel SMTP açılınca Supabase saatlik e-posta sınırını düşük bir değerle başlatır. **Authentication → Rate Limits** bölümünden ihtiyaca göre yükselt.

## Deneme

1. Uygulamada yeni bir adresle kayıt ol: "E-postanı onayla" ekranı görünmeli.
2. Gelen e-posta uygulama dilinde olmalı; düğme uygulamayı açıp profil kurulumuna götürmeli.
3. Onaylamadan giriş yapmayı dene: hata altında "Onay e-postasını tekrar gönder" çıkmalı.
4. Şifremi unuttum'u dene: sıfırlama e-postası da aynı dilde gelmeli.
