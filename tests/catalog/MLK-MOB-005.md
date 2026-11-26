---
id: MLK-MOB-005
title: Soru kataloğu tutarlı
project: mulakat-kocu
line: mobile
type: automated
priority: medium
env: unit
status: passed
---

## Amaç

Meslek, seviye ve soru kimlikleri karışırsa ilerleme kaydı bozulur.

## Adımlar

1. TR ve EN kataloğu tara.

## Beklenen sonuç

- Birim ve soru kimlikleri benzersiz; her yolun Senior birimi var ve seviyeler sıralı; örnek cevaplar kendi kavramlarını içeriyor.

## Notlar

Test: `src/lib/__tests__/catalog.test.ts`, `evaluator.test.ts`.
