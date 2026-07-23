import React, { useState, useRef, useEffect } from 'react';
import './Advent.css';

/*
  ================================================================
  SEVGİLİLER TAKVİMİ (30 GÜN) — RMC Gamification  (YENİDEN YAZILDI)
  ================================================================
  - Kurgu: Sevgilin sana 30 günlük bir sürpriz takvimi hazırladı.
  - Kullanıcı 30 kapıdan SADECE BİRİNİ seçer.
  - Kapı 3D dönerek açılır; arkasından sevgililer günü mesajı +
    kopyalanabilir indirim kuponu çıkar.
  - Oyun/puan yok. Mail/opt-in formu yok.
  ================================================================
*/

const DAYS = 30;

// Her kapının arkasında bir mesaj + hediye + kupon var (karıştırılır).
const NOTES = [
  { m: 'Sana rastladığım gün, takvimimdeki bütün günler yeniden yazıldı.', g: '💌', pct: 20 },
  { m: 'Kalabalıkların içinde bile önce senin sesini duyuyorum.',           g: '🎵', pct: 25 },
  { m: 'Bazı insanlar sevilir; sen ezberlenirsin.',                          g: '💝', pct: 25 },
  { m: 'Aşk, birine "günaydın" derken sesinin yumuşamasıdır.',              g: '☕', pct: 15 },
  { m: 'Elini tuttuğumda acelesi kalmıyor hiçbir şeyin.',                    g: '🤍', pct: 20 },
  { m: 'Sen bir tesadüf değil, ısrarla aradığım cevaptın.',                  g: '✨', pct: 25 },
  { m: 'Gülüşün, günün bütün fazlalıklarını siliyor.',                       g: '🌷', pct: 15 },
  { m: 'Seni sevmek, evine dönmek gibi bir şey.',                            g: '🏡', pct: 20 },
  { m: 'Adını duyunca hâlâ toparlanıyorum; hâlâ ilk gün gibi.',              g: '💗', pct: 25 },
  { m: 'En sevdiğim mevsim sensin; hangi ay olduğunun önemi yok.',           g: '🌸', pct: 15 },
  { m: 'Sana anlatacaklarım hiç bitmiyor, bu yüzden acele etmiyorum.',       g: '📖', pct: 20 },
  { m: 'Kalbimin yolu tarif istemiyor; oraya çoktan yerleşmişsin.',          g: '🗝️', pct: 25 },
  { m: 'Sen yanımdayken sessizlik bile güzel bir şarkı.',                    g: '🎶', pct: 15 },
  { m: 'Bir ömür değil, seninle geçen bir akşam bile yeter derdim; yalanmış.', g: '🌙', pct: 20 },
  { m: 'Gözlerin, kaybolmayı göze aldığım tek yer.',                         g: '👀', pct: 25 },
  { m: 'Seni düşünmek, en sevdiğim alışkanlığım oldu.',                      g: '💭', pct: 15 },
  { m: 'İyi ki varsın demek az geliyor; iyi ki benimlesin.',                 g: '🤗', pct: 25 },
  { m: 'Aşk büyük sözlerde değil, seninle paylaştığım küçük şeylerde.',      g: '🎁', pct: 20 },
  { m: 'Sana her baktığımda ilk kez görüyormuşum gibi şaşırıyorum.',         g: '💘', pct: 25 },
  { m: 'Sen olunca sıradan bir salı bile kutlanacak bir gün.',              g: '📅', pct: 20 },
  { m: 'Bütün yollar yorucu; ama sana çıkan yol dinlendiriyor.',            g: '🚶', pct: 15 },
  { m: 'Kalbim, seni ezbere biliyor ama her gün yeniden çalışıyor.',        g: '❤️', pct: 25 },
  { m: 'Sen benim en tatlı rutinim, en güzel istisnamsın.',                 g: '🍫', pct: 15 },
  { m: 'Sarıldığında dünyanın gürültüsü kısılıyor.',                        g: '🫂', pct: 20 },
  { m: 'Seninle susmak bile bir sohbet.',                                    g: '🤍', pct: 15 },
  { m: 'Sevgi, birinin eksiğini de sevmektir; ben seni fazlasıyla seviyorum.', g: '💞', pct: 25 },
  { m: 'Yıllar geçsin; ben yine aynı kapıyı çalarım.',                      g: '🚪', pct: 20 },
  { m: 'Sen gülünce içimdeki bütün kışlar bitiyor.',                        g: '🌞', pct: 25 },
  { m: 'Sonsuza kadar diyorlar ya; ben bir gün fazlasını istiyorum.',       g: '♾️', pct: 20 },
  { m: 'Seni seviyorum — ve bu, söyleyeceklerimin sadece ilk cümlesi.',     g: '💐', pct: 25 },
];

const CODE = { 15: 'SEVGILI15', 20: 'SEVGILI20', 25: 'SEVGILI25' };

const shuffle = (arr) => {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
};

export default function Advent() {
  const [phase, setPhase] = useState('play');    // play | end  (intro yok — direkt başlar)
  const [notes, setNotes] = useState(() => shuffle(NOTES));
  const [opened, setOpened] = useState(null);    // seçilen gün (0-29)
  const [copied, setCopied] = useState(false);
  const timers = useRef([]);
  const cardRef = useRef(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  // mobilde sağ panel altta kalıyor -> kapı açılınca kartı görünür yap
  useEffect(() => {
    if (phase === 'end' && cardRef.current && window.innerWidth <= 900) {
      timers.current.push(setTimeout(() => {
        try { cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' }); } catch (_) {}
      }, 700));
    }
  }, [phase]);

  function start() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setNotes(shuffle(NOTES));
    setOpened(null); setCopied(false);
    setPhase('play');
  }
  const reopen = start;

  function openDoor(i) {
    if (phase !== 'play' || opened !== null) return;
    setOpened(i);
    timers.current.push(setTimeout(() => setPhase('end'), 1100));  // kapı dönsün, sonra mesaj gelsin
  }

  const note = opened !== null ? notes[opened] : null;
  const code = note ? CODE[note.pct] : '';

  function copyCode() {
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true); timers.current.push(setTimeout(() => setCopied(false), 1800));
  }
  function reset() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setNotes(shuffle(NOTES));
    setPhase('play'); setOpened(null); setCopied(false);
  }

  return (
    <div className="ad-root">
      <div className="ad-wrap">

        <div className="ad-campaign">
          <div className="ad-title">Advent Calendar</div>
          <div className="ad-pill">💌 <b>%25'e varan kupon</b></div>
        </div>

        <div className="ad-box">
          <div className="ad-stage">

            {/* SOL: TAKVİM */}
            <div className="ad-panel">
              <div className="ad-hearts">
                {Array.from({ length: 14 }, (_, i) => (
                  <i key={i} style={{ left: (i * 7.3 + 2) + '%', animationDelay: (i % 7) * 0.9 + 's',
                                      animationDuration: (7 + (i % 5)) + 's' }}>
                    {['❤️', '💗', '🤍', '💞'][i % 4]}
                  </i>
                ))}
              </div>

              <div className="ad-head">
                <div className="ad-ribbon">ADVENT CALENDAR</div>
                <div className="ad-sub">Her kapının arkasında farklı bir sürpriz var. Hangisi senin günün?</div>
              </div>

              <div className="ad-grid">
                {Array.from({ length: DAYS }, (_, i) => {
                  const isOpen = opened === i;
                  const dim = opened !== null && !isOpen;
                  return (
                    <button key={i} className={'ad-door' + (isOpen ? ' open' : '') + (dim ? ' dim' : '')}
                            onClick={() => openDoor(i)} disabled={opened !== null}>
                      <span className="ad-face ad-front">
                        <b>{i + 1}</b>
                        <i>🎀</i>
                      </span>
                      <span className="ad-face ad-back">
                        <b className="ad-gift">{notes[i].g}</b>
                      </span>
                    </button>
                  );
                })}
              </div>

              {opened === null && (
                <div className="ad-hint">💘 Sadece <b>1 gün</b> seçebilirsin</div>
              )}
            </div>

            {/* SAĞ: SÖZ + KUPON */}
            <div className={'ad-side' + (phase === 'end' && note ? ' on' : '')}>
              {phase === 'end' && note ? (
                <div className="ad-card" ref={cardRef}>
                  <p className="ad-love">"{note.m}"</p>
                  <div className="ad-coupon" onClick={copyCode}>
                    <span className="ad-pct">%{note.pct} İndirim</span>
                    <span className="ad-code">{code}</span>
                    <span className="ad-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
                  </div>
                  <div className="ad-fine">⏳ Bugüne özel — kupon 24 saat geçerli.</div>
                  <button className="ad-btn" onClick={reset}>Kuponu Kullan, Alışverişe Başla</button>
                  <button className="ad-replay" onClick={start}>Başka bir gün seç</button>
                </div>
              ) : (
                <div className="ad-empty">
                  <div className="ad-empty-e">🎁</div>
                  <div className="ad-empty-t">Bir gün seç</div>
                  <div className="ad-empty-s">Seçtiğin günün sözü ve kuponu burada açılacak.</div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
