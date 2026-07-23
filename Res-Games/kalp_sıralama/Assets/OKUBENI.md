# Kombini Bul (Alışveriş Wordle) — Asset Listesi

Tüm PNG'ler **@1x**, ekranda render edilen gerçek boyutta ve **saydam** zeminde.
Kutu zeminleri (yeşil / sarı / gri), parıltı ve dönme animasyonu CSS'te — PNG'ye gömülmedi.

Oyun **tam ekran** açılıyor. Gizli kombin **5 ürün**, palet **6 ürün** → her turda tam 1 ürün kombinde yok.

## Ürün ikonları — 3 render boyutu

| Ürün | Tahta (58×58) | Klavye (34×34) | Sonuç özeti (44×44) |
|---|---|---|---|
| Sneaker | `kombin-sneaker-tahta.png` | `kombin-sneaker-klavye.png` | `kombin-sneaker-ozet.png` |
| Çanta | `kombin-canta-tahta.png` | `kombin-canta-klavye.png` | `kombin-canta-ozet.png` |
| Saat | `kombin-saat-tahta.png` | `kombin-saat-klavye.png` | `kombin-saat-ozet.png` |
| Kulaklık | `kombin-kulaklik-tahta.png` | `kombin-kulaklik-klavye.png` | `kombin-kulaklik-ozet.png` |
| Ruj | `kombin-ruj-tahta.png` | `kombin-ruj-klavye.png` | `kombin-ruj-ozet.png` |
| Gözlük | `kombin-gozluk-tahta.png` | `kombin-gozluk-klavye.png` | `kombin-gozluk-ozet.png` |

**Kutu içi ürün görselinin gerçek çizim alanı:** tahtada 30 px, klavyede 25 px, özette 23 px.
Mobilde tahta kutusu 56×56'ya, kısa ekranlarda 48×48'e küçülüyor — tahta asset'i master kabul edilip
CSS ile ölçekleniyor, ayrı dosya gerekmiyor.

**Prodüksiyonda:** emoji'ler gerçek ürün fotoğraflarıyla değiştirilmeli. Ürün kadraja ortalanmalı,
kenarlarda nefes payı bırakılmalı; kutu zemini renk aldığında (yeşil/sarı/gri) görselin okunur kalması için
ürün fotoğrafı yüksek kontrastlı ve tercihen tek renk zeminden kesilmiş olmalı.

## Durum çipleri (12×12)
Açıklama satırındaki ("Yerinde / Var, yeri yanlış / Yok") küçük renk kareleri.

| Dosya | Boyut | Anlam |
|---|---|---|
| `kombin-durum-yesil.png` | 12×12 | Ürün doğru, yeri de doğru |
| `kombin-durum-sari.png` | 12×12 | Ürün kombinde var, sırası yanlış |
| `kombin-durum-gri.png` | 12×12 | Ürün kombinde yok |

## Asset olmayan (saf CSS)
Tahta zemini, kutu çerçeveleri, kutuların sırayla dönme (flip) animasyonu, dolan kutunun mavi çerçevesi,
yanlış girişte satırın sarsılması, klavye ürünlerinin ipucu rengine boyanması, üstteki kampanya kurdelesi
ve gradyanlı başlık — hepsi CSS.

## Kupon kademeleri
| Deneme | Kupon |
|---|---|
| 1–2 | KOMBIN25 |
| 3–4 | KOMBIN20 |
| 5–6 | KOMBIN15 |
| Bilemezse | KOMBIN10 |
