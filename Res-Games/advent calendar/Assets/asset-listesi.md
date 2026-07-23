# Advent Calendar (`ad-`) — Asset Listesi (@1x şeffaf PNG)

**Kural:** PNG boyutu = ekranda render edilen gerçek boyut. @3x/retina yok, upscale yok.
Dış parıltı/gölge PNG'ye gömülmedi — CSS'te kalıyor, PNG temiz sprite.

**Ölçekleme modeli:** Advent **yüzde/ızgara tabanlı** (sabit dünya + `scale` yok). Izgara 6 sütun × 5 satır = **30 gün**; hücre PC'de 99×99, mobilde 63×63 → ızgara sprite'larında **iki dosya**.

**Ekran:** tam ekran (1360px), ortadan **tam ikiye** (`1fr 1fr`). Solda takvim, sağda seçilen günün sözü + kuponu.

---

## Dosyalar — 67 adet

### 1. Gün kartı (ızgara) — 4 dosya
| Dosya | PC | Mobil | Not |
|---|---|---|---|
| `advent-gun.png` | 99×99 | `advent-gun-mobil.png` 63×63 | **Kapalı gün** — pembe kart (`#FFD3E0 → #FFA9C4 → #F87CA5`), beyaz kontur, içte üst parlama |
| `advent-gun-acik.png` | 99×99 | `advent-gun-acik-mobil.png` 63×63 | **Açılmış gün** — altın kart (`#FFF6DC → #FFE1A8`), altın kontur |

> Gün **rakamı** (1–30) PNG'ye gömülmedi — CSS'te yazılıyor (PC 16px, mobil 13px, bordo #8A1538). Kartın dış gölgesi ve hover'daki 2px yükselme de CSS'te.
> Açılış animasyonu `rotateY(180deg)` ile iki yüz arasında dönüyor; iki kart ayrı dosya olduğu için tek sprite'a bakılıp çevrilmemeli.

### 2. Kapalı gündeki kurdele — 1 dosya
| Dosya | Boyut | Not |
|---|---|---|
| `advent-kurdele.png` | 10×10 | Rakamın altındaki 🎀. PC ve mobilde aynı — tek dosya |

### 3. Açılan günün hediye ikonu — 58 dosya
| Dosya kalıbı | PC | Mobil |
|---|---|---|
| `advent-hediye-*.png` | 24×24 | `advent-hediye-*-mobil.png` 19×19 |

29 ikon: `mektup`, `nota`, `hediye-kalp`, `kahve`, `beyaz-kalp`, `parilti`, `lale`, `ev`, `kalp`, `cicek`, `kitap`, `anahtar`, `muzik`, `ay`, `gozler`, `dusunce`, `sarilma`, `kutu`, `ok-kalp`, `takvim`, `yuruyus`, `kirmizi-kalp`, `cikolata`, `kucaklasma`, `cift-kalp`, `kapi`, `gunes`, `sonsuz`, `buket`.

> 30 sözün her birinin kendi ikonu var; birkaç söz aynı ikonu paylaşıyor, o yüzden 29 dosya.

### 4. Arka plan kalpleri — 4 dosya
| Dosya | Boyut | Not |
|---|---|---|
| `advent-arkaplan-{kalp,pembe-kalp,beyaz-kalp,cift-kalp}.png` | 13×13 | Panelde aşağıdan yukarı süzülen kalpler (%28 opaklık, 7–11sn'lik yükseliş) |

## Asset gerektirmeyenler (CSS)
Bordo panel gradyanı (`#520B1E → #8A1538`), "ADVENT CALENDAR" altın şeridi, gün rakamları, sağ paneldeki söz kartı, kupon kutusu (kesik çizgili), CTA butonu ve kalplerin süzülme animasyonu.

---

## Kupon
Tek gün seçilir; seçilen günün sözüne bağlı indirim çıkar.

| İndirim | Kod |
|---|---|
| %25 | SEVGILI25 |
| %20 | SEVGILI20 |
| %15 | SEVGILI15 |
