---
id: MLK-MOB-001
title: Repoda gizli anahtar yok
project: mulakat-kocu
line: mobile
type: automated
priority: critical
env: unit
status: passed
---

## Amaç

Repo public. Supabase service_role ya da gizli anahtarlar, imza anahtarları veya .env dosyaları commit'lenirse herkes görür.

## Adımlar

1. Git'te izlenen tüm dosyaları tara.
2. `.env` (`.env.example` hariç), imza anahtarı ve servis hesabı dosyası ara.
3. Metin dosyalarında Supabase gizli anahtarı, service_role JWT, özel anahtar ve API token kalıpları ara.

## Beklenen sonuç

- Hiçbiri bulunmaz. Supabase anon/publishable anahtarı public olduğu için sorun sayılmaz.

## Notlar

Test: `tests/security/secrets.test.ts`.
