# Kalp Vurma (`hv-`) — Asset Listesi (@1x şeffaf PNG)

**Kural:** PNG boyutu = ekranda render edilen gerçek boyut. @3x/retina yok, upscale yok.
Dış parıltı/gölge PNG'ye gömülmedi — CSS'te kalıyor, PNG temiz sprite.

**Ölçekleme modeli:** sabit dünya **900×640** + tek `scale(k)` (PC k≈0.96, mobil k≈0.40).
Bu yüzden PNG = **dünya boyutu**, her sprite **tek dosya** — mobil varyantı gerekmez.
Ölçüldü: PC ve mobilde tüm sprite kutuları birebir aynı (kalp 64×64, yay 88×88, ok 44×8).

---

## Dosyalar — 4 adet

| Dosya | Boyut (dünya) | Not |
|---|---|---|
| `kalp.png` | 64×64 | Hedef kalp (+1; 3 seride ×2, 5 seride ×3). Oyunda `rotate(±6°)` ile salınır — **salınım PNG'ye gömülü değil** |
| `kalp-kirik.png` | 64×64 | Kırık kalp (−2, seriyi sıfırlar). Aynı kutu, aynı salınım |
| `kalp-yay.png` | 88×88 | Yay — asset **dinlenme açısında: yukarı bakar** (emoji 60px, −45° gömülü) |
| `kalp-ok.png` | 44×8 | Ok — kendi kutusunda **ucu sağa** bakar |

### Yayın dönüşü koda ait, asset'e değil
Yay **artık kendi kendine süpürmüyor** — yönü oyuncu belirliyor. Kod, 88×88'lik sprite'ın üzerine şunları uygular:
- `rotate(nişan açısı)` — parmağın/imlecin olduğu yöne döner (`atan2(dx, −dy)`), **±80° ile sınırlı** (yay yere doğrultulamaz).
- `.hv-bow.draw` — nişan alırken altın parıltı + `scale(1.08)`. **Bu parıltı CSS'te kalır, PNG'ye gömülmez.**

### Okun yönü
`.hv-arrow i` elemanının kendi kutusu 44×8 ve ok ucu sağa bakar; kod bu elemana `rotate(-90deg)` uygulayıp dinlenme yönünü **yukarı** çevirir, dış kap `.hv-arrow` ise **uçuş açısını** biner. Sprite'ı değiştirirken bu iki katmanı bozma — PNG'yi sağa bakar hâlde ver.

## Asset gerektirmeyenler (CSS)
Gökyüzü gradyanı, alt zemin bandı, puan/süre HUD'ı, "+1 / −2" pop yazıları, seri rozeti, okun parıltısı ve yayın gerilme efekti.

---

## Sahne yerleşimi (dünya koordinatı)
- Yay: **(450, 596)** — alt-orta, sabit konum; sadece açısı döner.
- Kalpler **soldan ve sağdan** girer, yalnızca **y 90–400** bandında yatay süzülür (yayın dibi bilinçli olarak boş bırakıldı), hafif sinüs salınımıyla dalgalanır, karşı kenardan çıkınca silinir.
- Doğma aralığı 330ms, %20 ihtimalle kırık kalp. Süre 10 saniye.
- Ok hızı 15 birim/kare (düz uçuş, yerçekimi yok), isabet yarıçapı 34 birim.

## Kupon kademesi
| Puan | Kupon |
|---|---|
| 14+ | KALP25 |
| 9+ | KALP20 |
| 5+ | KALP15 |
| altı | KALP10 |
