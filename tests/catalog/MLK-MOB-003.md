---
id: MLK-MOB-003
title: Hesap silme yalnızca kendi hesabını siliyor
project: mulakat-kocu
line: mobile
type: automated
priority: critical
env: ci-supabase
status: passed
---

## Amaç

Mağazalar uygulama içi hesap silme istiyor. `delete_my_account` başka birinin hesabını silmemeli, oturumsuz çalışmamalı.

## Adımlar

1. Oturumsuz olarak `delete_my_account()` çağır.
2. A olarak çağır, ardından A ve B'nin auth kayıtlarına bak.

## Beklenen sonuç

- Oturumsuz çağrı reddedilir.
- A'nın hesabı ve profili silinir, B'ninki kalır.

## Notlar

Test: `tests/rls/profiles.test.ts`.
