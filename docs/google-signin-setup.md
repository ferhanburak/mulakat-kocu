# Google ile giriş kurulumu

Uygulama tarafı hazır: karşılama, giriş ve kayıt ekranlarında "Google ile devam et" düğmesi var. Uygulamada Google sayfası uygulama içi tarayıcıda açılır, web'de sayfa Google'a gidip `/giris-tamam` ekranına döner. İlk kez giren kullanıcı için hesap otomatik açılır.

Aşağıdaki adımlar panelde yapılır.

## 1. Google Cloud projesi

1. https://console.cloud.google.com → üstten proje seçici → **New project** → ad: `Prova` → **Create**.
2. Sol menü → **Google Auth Platform** (eski adı "OAuth consent screen") → **Get started**:
   - App name: `Prova`
   - User support email: kendi Gmail'in
   - Audience: **External**
   - Contact email: kendi Gmail'in → **Create**.
3. **Data Access** → varsayılan kapsamlar yeterli (`email`, `profile`, `openid`).

## 2. OAuth istemcisi

1. **Google Auth Platform → Clients → Create client**.
2. Application type: **Web application**, ad: `Supabase`.
3. **Authorized redirect URIs** → **Add URI**:
   `https://ydlflphagncloqgecgbl.supabase.co/auth/v1/callback`
4. **Create**. Çıkan **Client ID** ve **Client secret**'ı kopyala. Hiçbir dosyaya ya da repoya yazma.

## 3. Supabase'e bağla

Supabase → **Authentication → Sign In / Providers → Google**:

- **Enable Sign in with Google** açık
- **Client IDs**: Client ID
- **Client Secret (for OAuth)**: Client secret
- **Save**

Redirect URLs listesi (`mulakatkocu://**`, `http://localhost:8081/**`, `exp://**`) Google dönüşünü de kapsar.

## 4. Yayından önce

- **Google Auth Platform → Audience → Publish app**. Test modundayken sadece "Test users" listesindeki hesaplar girebilir.
- Uygulama logosu ve gizlilik politikası bağlantısı istenebilir. Gizlilik politikası taslağı `docs/legal/` klasöründe.

## Deneme

1. Çıkış yap, karşılama ekranında **Google ile devam et**.
2. Google hesabını seç: yeni hesapsa profil kurulumuna, eskiyse ana sayfaya gitmeli.
3. Profil sayfasında adın Google'daki adınla görünmeli.
