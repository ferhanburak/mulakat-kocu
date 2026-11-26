---
id: MLK-MOB-004
title: Cevaplar doğru değerlendiriliyor
project: mulakat-kocu
line: mobile
type: automated
priority: high
env: unit
status: passed
---

## Amaç

Koçun asıl işi: verilen cevaptaki kavramları bulup eksikleri söylemek. Türkçe ve İngilizce.

## Adımlar

1. Tam bir cevap, eksik cevap ve örnek cevaplarla değerlendirmeyi çalıştır.

## Beklenen sonuç

- Tam cevapta eksik kavram çıkmaz; eksik cevapta doğru kavramlar eksik görünür; örnek cevaplar kendi kavramlarını karşılar.

## Notlar

Test: `src/lib/__tests__/evaluator.test.ts`, `answers.test.ts`.
