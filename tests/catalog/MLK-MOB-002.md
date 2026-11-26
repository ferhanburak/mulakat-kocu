---
id: MLK-MOB-002
title: Profil verisi yalnızca sahibine açık (RLS)
project: mulakat-kocu
line: mobile
type: automated
priority: critical
env: ci-supabase
status: passed
---

## Amaç

Her kullanıcının adı ve ilerlemesi `profiles` tablosunda. Başkası okuyamamalı, değiştirememeli.

## Adımlar

1. Yerel Supabase'de iki kullanıcı oluştur (kayıt tetikleyicisi profilleri açar).
2. Kullanıcı A olarak profilleri oku, kendi profilini güncelle.
3. A olarak B'nin profilini güncellemeyi, başka id ile profil eklemeyi, profil silmeyi dene.
4. Oturumsuz (anon) olarak okumayı dene.
5. public şemadaki tüm tablolarda RLS açık mı bak.

## Beklenen sonuç

- A yalnızca kendi satırını görür ve günceller.
- B'nin satırı değişmez; başka id ile ekleme ve doğrudan silme reddedilir.
- Anon hiçbir şeye erişemez.
- RLS kapalı tablo yoktur.

## Notlar

Test: `tests/rls/profiles.test.ts` (CI'da Supabase CLI ile; lokalde Docker yoksa atlanır).
