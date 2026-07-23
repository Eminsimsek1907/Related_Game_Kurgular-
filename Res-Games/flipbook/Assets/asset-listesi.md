# Sayfa / Katalog (`pf-`) — Asset Listesi (@1x şeffaf PNG)

**Kural:** PNG boyutu = ekranda render edilen gerçek boyut. @3x/retina yok, upscale yok.
Dış parıltı/gölge PNG'ye gömülmedi — CSS'te kalıyor, PNG temiz sprite.

**Ölçekleme modeli:** Sayfa **yüzde tabanlı** (sabit dünya + `scale` yok). Kitap PC'de iki sayfalık açılım, mobilde tek sayfa → boyutu değişen sprite'larda **iki dosya**, değişmeyenlerde tek dosya.

**Katalog:** 8 sayfa — Kapak → Tarihçe → Yaz Koleksiyonu → Koleksiyondan → Mail Bülteni → Marka Anketi → Sosyal Medya → Kazı Kazan.
Marka kurgusaldır (**MARINA POLO CLUB, EST. 1978**); gerçek markaya geçerken metinler ve ikonlar birlikte değiştirilmeli.

---

## Dosyalar — 25 adet

### 1. Kapak — 1 dosya
| Dosya | Boyut |
|---|---|
| `sayfa-arma.png` | 38×38 (PC = mobil) |

### 2. Yaz Koleksiyonu sayfası — 7 dosya
| Dosya | PC | Mobil |
|---|---|---|
| `sayfa-yelken.png` | 72×72 | `sayfa-yelken-mobil.png` 54×54 |
| `sayfa-renk-{lacivert,kum-beji,yelken-beyazi,kirmizi,yesil}.png` | 24×24 | aynı (5 dosya) |

### 3. Koleksiyondan (ürünler) — 8 dosya
| Dosya | PC | Mobil |
|---|---|---|
| `sayfa-urun-{polo,keten-sort,deck-ayakkabi,gozluk}.png` | 34×34 | `-mobil.png` 28×28 |

### 4. Mail Bülteni — 3 dosya
| Dosya | Boyut |
|---|---|
| `sayfa-bulten-{yeni-urun,indirim,stil-rehberi}.png` | 24×24 (PC = mobil) |

### 5. Sosyal Medya — 4 dosya
| Dosya | Boyut |
|---|---|
| `sayfa-sosyal-{instagram,youtube,tiktok,linkedin}.png` | 22×22 (PC = mobil) |

### 6. Kazı Kazan kaplaması — 2 dosya
| Dosya | PC | Mobil |
|---|---|---|
| `sayfa-kazi-kaplama.png` | 280×120 | `-mobil.png` 240×104 |

Altın kaplama **canvas'a çizilip kazınıyor**: fırça `destination-out` ile siliyor, %55 kazınınca kupon açılıyor.
Fırçanın alfası **1 olmalı** — 1'den küçükse piksel alfası hiç sıfıra inmez ve kazınan yüzde takılır.

## Asset gerektirmeyenler (CSS)
Kitap gövdesi ve altın çerçeve, kağıt dokusu, sayfa çevirme (iki yüzlü dönen yaprak + kıvrılma gölgesi), omurga gölgesi, sayfa köşesi, tarihçe zaman çizelgesi, fiyat satırları, mail kutucuğu, anket seçenekleri, kupon kutusu ve CTA.

---

## Kupon
Katalog gezilir, son sayfadaki kazı kazan kazınır → **KATALOG25** (%25).
