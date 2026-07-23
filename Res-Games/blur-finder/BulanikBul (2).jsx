import React, { useState } from 'react';
import './BulanikBul.css';

/*
  ================================================================
  BULANIK BUL — Ürün Tahmin Oyunu (RMC Gamification)
  ================================================================
  RMC Gamification Studio kurallarıyla üretildi:
  - Kampanya başlığı + teşvik metni (üstte, her zaman görünür).
  - Ödül = kopyalanabilir kupon kodu (başarı ekranında kopyala butonu).
  - Asset çeşitliliği: Bul Kazan'daki alışveriş ikonlarından FARKLI
    ürün siluetleri (saat, güneş gözlüğü, sneaker, ceket, sırt çantası,
    bileklik) kullanıldı.
  - Asset boyutu = önizlemede render edilen gerçek boyut (bkz. CSS).

  MEKANİK (kişi -> ÜRÜN olarak revize edildi):
  - Bulanık gösterilen bir ÜRÜN görselini tahmin et.
  - Yanlış şıkta "Kalan Hak" azalır, kullanıcı AYNI soruda kalır,
    yanlış şık tekrar seçilemez. Görsel her yanlışta bir kademe netleşir.
  - Hak biterse doğru ürün yeşille işaretlenir.
  - 3 soruluk tur; sorular arası geçiş OTOMATİK; ödül tur sonunda.
  - questions[] backend'den gelen ürün/görsel/şık verisiyle eşleşir;
    productKey alanı gerçek entegrasyonda backend görseliyle değişir.
  ================================================================
*/

const PRODUCT_ICONS = {
  watch: (
    <g fill="none" stroke="#0A7C8A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="66" y="66" width="68" height="68" rx="16" fill="#CDEDF2" />
      <path d="M78 66l6-24h32l6 24M78 134l6 24h32l6-24" />
      <path d="M100 86v16l12 8" />
    </g>
  ),
  sunglasses: (
    <g fill="none" stroke="#0A7C8A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="72" cy="112" r="26" fill="#CDEDF2" />
      <circle cx="128" cy="112" r="26" fill="#CDEDF2" />
      <path d="M98 108q2-8 4 0M46 96l8 8M154 96l-8 8" />
    </g>
  ),
  sneaker: (
    <g fill="none" stroke="#0A7C8A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M44 132c0-14 8-22 14-28l30-26c8-6 12-4 18 4l8 12c8 12 22 12 34 14 10 2 16 8 16 20v6c0 4-4 8-8 8H52c-5 0-8-4-8-8z" fill="#CDEDF2" />
      <path d="M92 82l10 14M108 92l12 12" />
    </g>
  ),
  jacket: (
    <g fill="none" stroke="#0A7C8A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M70 44l30 18 30-18 26 20-16 24v64c0 4-4 8-8 8H68c-4 0-8-4-8-8V88L44 64z" fill="#CDEDF2" />
      <path d="M100 62v96" />
    </g>
  ),
  backpack: (
    <g fill="none" stroke="#0A7C8A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M66 84a34 34 0 0 1 68 0v66a10 10 0 0 1-10 10H76a10 10 0 0 1-10-10z" fill="#CDEDF2" />
      <path d="M84 84v-8a16 16 0 0 1 32 0v8M78 118h44M100 118v22" />
    </g>
  ),
  bracelet: (
    <g fill="none" stroke="#0A7C8A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="100" cy="100" rx="46" ry="34" fill="#CDEDF2" />
      <ellipse cx="100" cy="100" rx="30" ry="20" />
      <circle cx="100" cy="66" r="8" fill="#0A7C8A" stroke="none" />
    </g>
  ),
};

const QUESTIONS = [
  { correct: 'Akıllı Saat', productKey: 'watch', options: ['Akıllı Saat', 'Bileklik', 'Güneş Gözlüğü', 'Sneaker'] },
  { correct: 'Güneş Gözlüğü', productKey: 'sunglasses', options: ['Sırt Çantası', 'Güneş Gözlüğü', 'Ceket', 'Akıllı Saat'] },
  { correct: 'Sneaker', productKey: 'sneaker', options: ['Ceket', 'Sneaker', 'Bileklik', 'Sırt Çantası'] },
];

const MAX_BLUR = 11;
const BLUR_STEPS = 3;
const REWARD_TIERS = [
  { min: 3, label: '%25 İndirim', code: 'BULABILDIN25' },
  { min: 2, label: '%15 İndirim', code: 'KESKINGOZ15' },
  { min: 0, label: '%10 İndirim', code: 'YINEDE10' },
];

function ProductImage({ productKey, blur }) {
  return (
    <svg viewBox="0 0 200 200" style={{ filter: `blur(${blur}px)` }}>
      <defs>
        <linearGradient id="bbBg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EAF6F8" /><stop offset="100%" stopColor="#D3EEF2" />
        </linearGradient>
      </defs>
      <rect width="200" height="200" rx="16" fill="url(#bbBg)" />
      <g transform="translate(100,100) scale(1.25) translate(-100,-100)">
        {PRODUCT_ICONS[productKey]}
      </g>
    </svg>
  );
}

export default function BulanikBul() {
  const [qIndex, setQIndex] = useState(0);
  const [hak, setHak] = useState(3);
  const [wrongNames, setWrongNames] = useState([]);
  const [answered, setAnswered] = useState(false);
  const [toast, setToast] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [pulse, setPulse] = useState(false);
  const [revealName, setRevealName] = useState(null);
  const [copied, setCopied] = useState(false);

  const q = QUESTIONS[qIndex];
  const wrongCount = wrongNames.length;
  const blur = answered ? 0 : Math.max(0, MAX_BLUR - (MAX_BLUR / BLUR_STEPS) * wrongCount);
  const reward = REWARD_TIERS.find(t => correctCount >= t.min) || REWARD_TIERS[REWARD_TIERS.length - 1];

  function launchConfetti() {
    const colors = ['#C99A3D', '#0EA5B7', '#2F9E63', '#1C2233'];
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'bb-confetti';
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

  function goToNextStep() {
    if (qIndex === QUESTIONS.length - 1) {
      setShowResult(true);
      launchConfetti();
    } else {
      setQIndex(qIndex + 1);
      setHak(3); setWrongNames([]); setAnswered(false); setToast(''); setRevealName(null);
    }
  }

  function handleGuess(name) {
    if (answered || wrongNames.includes(name)) return;

    if (name === q.correct) {
      setAnswered(true);
      setCorrectCount(c => c + 1);
      setToast(qIndex === QUESTIONS.length - 1 ? 'Doğru! Ödülün hazırlanıyor...' : 'Doğru! Sonraki ürüne geçiliyor...');
      setTimeout(goToNextStep, 1100);
      return;
    }

    const nextHak = hak - 1;
    setHak(nextHak);
    setWrongNames(prev => [...prev, name]);
    setPulse(true); setTimeout(() => setPulse(false), 350);
    setToast('Yanlış tahmin, tekrar dene!');

    if (nextHak <= 0) {
      setAnswered(true);
      setRevealName(q.correct);
      setToast(`Doğru ürün: ${q.correct} — sonraki ürüne geçiliyor...`);
      setTimeout(goToNextStep, 1600);
    }
  }

  function copyCode() {
    if (navigator.clipboard) navigator.clipboard.writeText(reward.code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  function resetQuiz() {
    setShowResult(false); setQIndex(0); setHak(3); setWrongNames([]);
    setAnswered(false); setToast(''); setCorrectCount(0); setRevealName(null); setCopied(false);
  }

  return (
    <div className="bb-root">
      <div className="bb-stage">
        <div className="bb-campaign">
          <div className="bb-campaign-title">Ürünü Tahmin Et, İndirimi Kap!</div>
          <div className="bb-campaign-sub">Bulanık görseldeki ürünü bil, 3 üründe ne kadar iyisin göster, kuponunu kazan.</div>
        </div>

        <div className="bb-eyebrow-row">
          <div className="bb-step-badge">Ürün {qIndex + 1} / {QUESTIONS.length}</div>
          <div className="bb-step-dots">
            {QUESTIONS.map((_, i) => (
              <div key={i} className={`bb-step-dot ${i < qIndex ? 'bb-done' : ''} ${i === qIndex ? 'bb-active' : ''}`} />
            ))}
          </div>
        </div>

        <div className="bb-badges">
          <div className="bb-badge">❤️ Kalan Hak: <span className={`bb-num ${pulse ? 'bb-pulse' : ''}`}>{hak}</span></div>
        </div>

        <div className="bb-game-row">
          <div className="bb-photo-card"><ProductImage productKey={q.productKey} blur={blur} /></div>
          <div className="bb-options">
            {q.options.map(name => {
              const isWrong = wrongNames.includes(name);
              const isCorrectPicked = answered && name === q.correct && !revealName;
              const isRevealed = revealName === name;
              const cls = [
                'bb-opt',
                isWrong ? 'bb-wrong bb-disabled' : '',
                isCorrectPicked ? 'bb-correct bb-disabled' : '',
                isRevealed ? 'bb-reveal bb-disabled' : '',
                answered && !isCorrectPicked && !isRevealed ? 'bb-disabled' : '',
              ].join(' ');
              return (
                <button key={name} className={cls} onClick={() => handleGuess(name)}>{name}</button>
              );
            })}
          </div>
        </div>

        <div className="bb-toast">{toast}</div>
      </div>

      <div className={`bb-overlay ${showResult ? 'bb-show' : ''}`}>
        <div className="bb-card">
          <button className="bb-card-x" onClick={resetQuiz}>✕</button>
          <div className="bb-icon-wrap">
            <svg viewBox="0 0 24 24" width="26" height="26" fill="#C99A3D" stroke="none">
              <path d="M12 2.5l2.9 6 6.6.7-4.9 4.5 1.3 6.5L12 16.9l-5.9 3.3 1.3-6.5-4.9-4.5 6.6-.7z" />
            </svg>
          </div>
          <div className="bb-card-title">Tebrikler</div>
          <div className="bb-card-count">{QUESTIONS.length} Üründen {correctCount}'ini Bildin</div>
          <div className="bb-card-label">{reward.label} Kazandın!</div>
          <div className="bb-coupon-box"><span className="bb-coupon-code">KOD: {reward.code}</span></div>
          <button className="bb-copy-btn" onClick={copyCode}>{copied ? 'Kopyalandı ✓' : 'KODU KOPYALA'}</button>
          <button className="bb-card-close" onClick={resetQuiz}>Tekrar Oyna</button>
        </div>
      </div>
    </div>
  );
}
