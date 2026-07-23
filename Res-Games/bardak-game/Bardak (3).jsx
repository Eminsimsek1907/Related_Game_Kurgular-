import React, { useState, useRef } from 'react';
import './Bardak.css';

/*
  ================================================================
  ENTEGRASYON NOTU:
  - Klasik 3 bardak mekaniği: ödülün altında olduğu bardak round
    başında kısaca kaldırılıp gösterilir ("peek"), sonra bardaklar
    karıştırılır, kullanıcı bir bardak seçer.
  - prizeCupId round başında rastgele seçilir (backend'den de
    enjekte edilebilir). Karıştırma tamamen görsel/rastgele; hangi
    slotta hangi cup'ın olduğu `order` dizisiyle takip edilir.
  - SLOT_X: 3 sabit slot pozisyonu (px). Bardaklar `left` değeri
    CSS transition ile animasyonlu değişir — bu "karıştırma" hissini
    verir. Gerçek entegrasyonda round sayısı/karıştırma adedi
    (SHUFFLE_COUNT) kolayca parametrize edilebilir.
  - Görsel: kurumsal açık tema (bkz. Bardak.css), mobil-oyun
    plastiği değil, sade/mat "kağıt-seramik" bardak — büyük kurumsal
    marka müşterileri için tasarlandı (bkz. önceki onaylı bardak
    tasarımı).
  ================================================================
*/

/*
  ================================================================
  BARDAK / HEDİYEYİ BULUN — 4 Bardak Oyunu (RMC Gamification)
  ================================================================
  RMC Gamification Studio kurallarıyla revize edildi:
  - Kampanya başlığı + teşvik metni (üstte, büyük vurgu bloğu).
  - Ödül = kopyalanabilir kupon kodu (kopyala butonu + "Kopyalandı").
  - Herkes kazanır: doğru bardağı bulan büyük ödül, yanlış seçende
    teselli kuponu; kimse boş dönmez.
  - Asset çeşitliliği: bardak/ödül rozeti kendine özgü; diğer
    oyunların ürün ikonlarıyla çakışmıyor.
  - Asset boyutu = önizlemedeki gerçek render boyutu.

  MEKANİK: Ödülün altında olduğu bardak round başında kısaca gösterilir
  ("peek"), bardaklar karıştırılır, kullanıcı bir bardak seçer.
  ================================================================
*/

const N_CUPS = 4;
const SLOT_X = [4, 78, 152, 226];
const SHUFFLE_COUNT = 8;
const WIN_REWARD = { label: '%50 İndirim', code: 'BARDAK50' };
const CONSOLATION_REWARDS = [
  { label: '%15 İndirim', code: 'TEKRARBUL15' },
  { label: 'Ücretsiz Kargo', code: 'KARGOBEDAVA' },
  { label: '%5 İndirim', code: 'TEKRAR5' },
];

export default function Bardak() {
  const [phase, setPhase] = useState('intro'); // intro | countdown | peek | shuffling | choosing | revealed
  const [countdownNum, setCountdownNum] = useState(3);
  const [order, setOrder] = useState([0, 1, 2, 3]); // order[slotIndex] = cupId
  const [prizeCupId, setPrizeCupId] = useState(0);
  const [liftedCupId, setLiftedCupId] = useState(null);
  const [chosenCupId, setChosenCupId] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [won, setWon] = useState(false);
  const [copied, setCopied] = useState(false);
  const [consolation, setConsolation] = useState(CONSOLATION_REWARDS[0]);
  const shuffleTimer = useRef(null);

  function slotIndexOfCup(cupId) {
    return order.indexOf(cupId);
  }

  function launchConfetti() {
    const colors = ['#C99A3D', '#5B4FE0', '#2F9E63', '#1C2233'];
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'bk-confetti';
      p.style.left = (45 + Math.random() * 10) + 'vw';
      p.style.background = colors[i % colors.length];
      document.body.appendChild(p);
      const dx = (Math.random() - 0.5) * 260;
      const dur = 1000 + Math.random() * 600;
      p.animate(
        [{ transform: 'translate(0,0)', opacity: 1 }, { transform: `translate(${dx}px, 92vh) rotate(480deg)`, opacity: 0 }],
        { duration: dur, easing: 'cubic-bezier(.25,.46,.45,.94)' }
      );
      setTimeout(() => p.remove(), dur + 50);
    }
  }

  function startRound() {
    const prize = Math.floor(Math.random() * N_CUPS);
    setPrizeCupId(prize);
    setOrder(Array.from({ length: N_CUPS }, (_, i) => i));
    setChosenCupId(null);
    setWon(false);
    setLiftedCupId(null);

    setPhase('countdown');
    setCountdownNum(3);
    runCountdown(prize, 3);
  }

  function runCountdown(prize, n) {
    if (n === 0) {
      beginPeek(prize);
      return;
    }
    setCountdownNum(n);
    setTimeout(() => runCountdown(prize, n - 1), 700);
  }

  function beginPeek(prize) {
    setPhase('peek');
    setLiftedCupId(prize);

    setTimeout(() => {
      setLiftedCupId(null);
      setTimeout(() => runShuffle(prize), 350);
    }, 1100);
  }

  function runShuffle(prize) {
    setPhase('shuffling');
    let currentOrder = Array.from({ length: N_CUPS }, (_, i) => i);
    let step = 0;

    function doSwap() {
      if (step >= SHUFFLE_COUNT) {
        setPhase('choosing');
        return;
      }
      const a = Math.floor(Math.random() * N_CUPS);
      let b = Math.floor(Math.random() * N_CUPS);
      while (b === a) b = Math.floor(Math.random() * N_CUPS);
      const next = [...currentOrder];
      [next[a], next[b]] = [next[b], next[a]];
      currentOrder = next;
      setOrder(next);
      step++;
      shuffleTimer.current = setTimeout(doSwap, 520);
    }
    doSwap();
  }

  function handleChoose(cupId) {
    if (phase !== 'choosing') return;
    setChosenCupId(cupId);
    setLiftedCupId(cupId);
    const isWin = cupId === prizeCupId;
    setWon(isWin);
    if (!isWin) setConsolation(CONSOLATION_REWARDS[Math.floor(Math.random() * CONSOLATION_REWARDS.length)]);
    setPhase('revealed');

    setTimeout(() => {
      if (!isWin) setLiftedCupId(prizeCupId); // doğru bardağı da göster
      setTimeout(() => {
        setShowResult(true);
        launchConfetti(); // herkes kazanıyor, herkese kutlama
      }, isWin ? 0 : 500);
    }, 500);
  }

  function copyCode() {
    const code = won ? WIN_REWARD.code : consolation.code;
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function resetAll() {
    setShowResult(false);
    setPhase('intro');
    setLiftedCupId(null);
    setCopied(false);
  }

  return (
    <div className="bk-root">
      <div className="bk-stage">
        <div className="bk-campaign">
          <div className="bk-ribbon">✦ Şansını Dene, Kazan! ✦</div>
          <div className="bk-hero-offer">Doğru Bardağı Bul<br /><span className="bk-hero-big">%50 İNDİRİM</span></div>
          <div className="bk-campaign-sub">Ödülün altındaki bardağı takip et, doğru seç, indirim kuponunu anında kap!</div>
        </div>

        {phase === 'intro' && (
          <>
            <div className="bk-reward-preview">
              <div className="bk-rp-value">{WIN_REWARD.label.split(' ')[0]}</div>
              <div className="bk-rp-label">{WIN_REWARD.label.split(' ').slice(1).join(' ')}</div>
            </div>
            <div><button className="bk-start-btn" onClick={startRound}>BAŞLA</button></div>
          </>
        )}

        {phase === 'countdown' && (
          <div className="bk-countdown">
            <div key={countdownNum} className="bk-countdown-num">{countdownNum}</div>
          </div>
        )}

        {['peek', 'shuffling', 'choosing', 'revealed'].includes(phase) && (
          <>
            <div className="bk-arena">
              {SLOT_X.map((x, i) => <div key={i} className="bk-slot-shadow" style={{ left: x - 1 }} />)}

              {/* Ödül rozeti bardaktan BAĞIMSIZ, yerde sabit — bardak kalkınca altından "çıkıyor" */}
              <div className={`bk-prize-badge ${liftedCupId === prizeCupId ? 'bk-show' : ''}`}
                   style={{ left: SLOT_X[slotIndexOfCup(prizeCupId)] + 36 }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#FFFFFF" stroke="none">
                  <path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5L12 16.9l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.7z" />
                </svg>
                <span>%50</span>
              </div>

              {Array.from({ length: N_CUPS }, (_, i) => i).map(cupId => {
                const slot = slotIndexOfCup(cupId);
                const lifted = liftedCupId === cupId;
                const isPrize = cupId === prizeCupId;
                return (
                  <div key={cupId}
                       className={`bk-cup ${lifted ? 'bk-lifted' : ''} ${phase === 'choosing' ? 'bk-clickable' : ''}`}
                       style={{ left: SLOT_X[slot] }}
                       onClick={() => handleChoose(cupId)}>
                    <div className="bk-cup-body" />
                    <div className="bk-cup-rim" />
                  </div>
                );
              })}
            </div>
            <div className="bk-hint">
              {phase === 'peek' && 'Ödülün yerini iyi izle...'}
              {phase === 'shuffling' && 'Karıştırılıyor...'}
              {phase === 'choosing' && 'Bir bardak seç!'}
              {phase === 'revealed' && (won ? 'Doğru bildin!' : 'Az kalmıştı! Yine de bir ödülün var.')}
            </div>
          </>
        )}
      </div>

      <div className={`bk-overlay ${showResult ? 'bk-show' : ''}`}>
        <div className="bk-card">
          <button className="bk-card-x" onClick={resetAll}>✕</button>
          <div className="bk-icon-wrap bk-win">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="#C99A3D" stroke="none">
              <path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5L12 16.9l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.7z" />
            </svg>
          </div>
          <div className="bk-card-title">{won ? 'Tebrikler' : 'Az Kalmıştı!'}</div>
          <div className="bk-card-sub">{won ? 'Doğru bardağı buldun!' : 'Yine de eli boş dönme, sana özel:'}</div>
          <div className="bk-card-label">{won ? WIN_REWARD.label : consolation.label} Kazandın!</div>
          <div className="bk-coupon-box"><span className="bk-coupon-code">KOD: {won ? WIN_REWARD.code : consolation.code}</span></div>
          <button className="bk-copy-btn" onClick={copyCode}>{copied ? 'Kopyalandı ✓' : 'KODU KOPYALA'}</button>
          <button className="bk-card-close" onClick={resetAll}>{won ? 'Devam Et' : 'Tekrar Dene'}</button>
        </div>
      </div>
    </div>
  );
}
