# Bulanık Bul — PNG Asset Paketi (şeffaf arka plan)

RMC Gamification Studio kurallarıyla revize edildi. Boyutlar önizlemedeki
gerçek render boyutuyla birebir aynıdır. Ürün görselleri, kart büyütmesi ve
1.25x içerik ölçeğiyle güncellenmiştir (oyundaki netleşme mekaniğiyle aynı).

## Ürün görselleri (178x178 — önizlemedeki gerçek kart boyutu)
Oyunda bulanıklaştırılıp kademeli netleşen ürünler:
- urun-watch.png      → Akıllı saat
- urun-sunglasses.png → Güneş gözlüğü
- urun-sneaker.png    → Sneaker
- urun-jacket.png     → Ceket
- urun-backpack.png   → Sırt çantası
- urun-bracelet.png   → Bileklik

## Sonuç ekranı
- icon-yildiz.png     → 52x52 — altın ödül yıldızı

## Tema
--primary-2: #0A7C8A (turkuaz vurgu — bu oyuna özgü). Ürün kartı açık turkuaz
gradyan (#EAF6F8 → #D3EEF2), ürün çizimleri turkuaz stroke + açık dolgu.
Not: Oyunda ürünler SVG ile çizilir; bu PNG'ler entegrasyon/tasarım
referansıdır. Bulanıklık CSS blur ile uygulanır (asset net halidir).

## Mekanik
Kullanıcı bulanık ürünü tahmin eder; her yanlışta görsel biraz daha netleşir.
Herkes kazanır: 3 doğru → %25 (BULABILDIN25), 2 → %15 (KESKINGOZ15),
0 → %10 (YINEDE10). Ödül kopyalanabilir kupon kodu olarak sunulur.
