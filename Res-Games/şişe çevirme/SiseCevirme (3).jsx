import React, { useState, useRef, useEffect } from 'react';
import './SiseCevirme.css';

/*
  ================================================================
  ENTEGRASYON NOTU:
  - rewards backend'in 6 segmentiyle birebir eşleşir (id/label).
  - Kazanan index backend/RNG'den geldiği gibi spin(winningIndex)
    olarak enjekte edilebilir.
  - Akış: [1] Ad/E-posta formu -> [2] Çevir -> [3] Doğruluk/Cesaret
    (sabit) + firma sorusu (havuzdan rastgele) -> [4] Ödül.
  - Görsel: kurumsal açık tema (bkz. SiseCevirme.css) — büyük
    kurumsal marka müşterilerine (Flo, Chakra, Doğuş vb.) uygun,
    nötr ve marka-agnostik bir taban. Marka özel rengi tek bir CSS
    değişkeni (--primary) üzerinden değiştirilebilir.
  ================================================================
*/

const REWARDS = [
  { label: 'Ücretsiz Kargo', cls: 'sc-chip-ship', code: 'KARGOBEDAVA' },
  { label: '%50 İndirim', cls: 'sc-chip-hero', code: 'SISE50' },
  { label: '%10 İndirim', cls: 'sc-chip-amber', code: 'SISE10' },
  { label: '%15 İndirim', cls: 'sc-chip-amber', code: 'SISE15' },
  { label: '%5 İndirim', cls: 'sc-chip-amber-lt', code: 'SISE5' },
  { label: 'Ücretsiz Hediye', cls: 'sc-chip-gift', code: 'HEDIYEBEDAVA' },
];

const COMPANY_QUESTIONS = [
  { text: 'Bizden alışveriş yaptınız mı?', pos: 'Evet', neg: 'Hayır' },
  { text: 'Bizi sosyal medyada takip ediyor musun?', pos: 'Evet', neg: 'Hayır' },
  { text: 'Bu ürünü bir arkadaşına önerir misin?', pos: 'Evet', neg: 'Hayır' },
  { text: 'Kampanyalardan e-posta ile haberdar olmak ister misin?', pos: 'Evet', neg: 'Hayır' },
  { text: 'Bugün ilk kez mi bizi ziyaret ediyorsun?', pos: 'Evet', neg: 'Hayır' },
  { text: 'Bildirimlere izin verir misin?', pos: 'Evet', neg: 'Hayır' },
  { text: 'Sepetinde ürün var mı?', pos: 'Evet', neg: 'Hayır' },
  { text: 'Yeni sezon koleksiyonunu gördün mü?', pos: 'Evet', neg: 'Hayır' },
];

const N = REWARDS.length;

function IconFor({ index }) {
  const common = { fill: 'none', stroke: '#2454E0', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (index) {
    case 0: return (<svg viewBox="0 0 24 24" style={{ stroke: '#3A6FC4' }} {...common}><path d="M3 10l3-6h12l3 6" /><path d="M3 10h18v9a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 19z" /><path d="M9 14a3 3 0 0 0 6 0" /></svg>);
    case 1: return (<svg viewBox="0 0 24 24" style={{ stroke: '#9C7526' }} {...common}><path d="M2 12l9-9h9v9l-9 9z" /><circle cx="15" cy="9" r="1.6" fill="#9C7526" stroke="none" /></svg>);
    case 2: return (<svg viewBox="0 0 24 24" style={{ stroke: '#C4842A' }} {...common}><path d="M2 12l9-9h9v9l-9 9z" /><circle cx="15" cy="9" r="1.6" fill="#C4842A" stroke="none" /></svg>);
    case 3: return (<svg viewBox="0 0 24 24" style={{ stroke: '#C4842A' }} {...common}><path d="M2 12l9-9h9v9l-9 9z" /><circle cx="15" cy="9" r="1.6" fill="#C4842A" stroke="none" /></svg>);
    case 4: return (<svg viewBox="0 0 24 24" style={{ stroke: '#C4842A' }} {...common}><path d="M2 12l9-9h9v9l-9 9z" /><circle cx="15" cy="9" r="1.6" fill="#C4842A" stroke="none" /></svg>);
    case 5: return (<svg viewBox="0 0 24 24" style={{ stroke: '#C23E80' }} {...common}><rect x="3" y="8" width="18" height="13" rx="1.5" /><path d="M3 12h18M12 8v13M8 8c0-2.5 1.8-4 4-4s4 1.5 4 4M8 8c0-2.5-1.8-4-4-4" /></svg>);
    default: return null;
  }
}

export default function SiseCevirme() {
  const [spinning, setSpinning] = useState(false);
  const [winIndex, setWinIndex] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [qStep, setQStep] = useState(0); // 0 = none, 1 = truth/dare, 2 = company
  const [companyQ, setCompanyQ] = useState(COMPANY_QUESTIONS[0]);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const bottleRef = useRef(null);
  const rotationRef = useRef(0);
  const wrapRef = useRef(null);
  const [radius, setRadius] = useState(140);

  useEffect(() => {
    if (wrapRef.current) {
      const w = wrapRef.current.getBoundingClientRect().width;
      setRadius(w * 0.5 - 41);
    }
  }, []);

  function spin() {
    if (spinning) return;
    setSpinning(true);
    const idx = Math.floor(Math.random() * N);
    setWinIndex(idx);
    const segAngle = 360 / N;
    const target = idx * segAngle;
    const full = 5 * 360;
    const next = rotationRef.current + full + (((target - (rotationRef.current % 360)) + 360) % 360);
    rotationRef.current = next;
    setRotation(next);
    setTimeout(() => {
      setSpinning(false);
      setCompanyQ(COMPANY_QUESTIONS[Math.floor(Math.random() * COMPANY_QUESTIONS.length)]);
      setQStep(1);
    }, 4150);
  }

  function answerQuestion() {
    if (qStep === 1) setQStep(2);
    else if (qStep === 2) { setQStep(0); setShowResult(true); launchConfetti(); }
  }

  function launchConfetti() {
    const colors = ['#C99A3D', '#2454E0', '#2F9E63', '#E1483A'];
    for (let i = 0; i < 24; i++) {
      const p = document.createElement('div');
      p.className = 'sc-confetti';
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

  function resetAll() {
    setShowResult(false);
    setSpinning(false);
    setWinIndex(null);
    setCopied(false);
  }

  function copyCode() {
    if (winIndex === null) return;
    const r = REWARDS[winIndex];
    const code = r.code || r.consolationCode;
    if (!code) return;
    if (navigator.clipboard) navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="sc-root">
      <div className="sc-stage">
        <div className="sc-eyebrow">Şansını Dene</div>
        <div className="sc-title">Şişeyi Çevir, Ödülünü Kap</div>

        <div className="sc-wheel-wrap" ref={wrapRef}>
          <div className="sc-ring" />
          <div className="sc-center-plate">
            <svg ref={bottleRef} className="sc-bottle" viewBox="0 0 100 220"
                 style={{ transform: `rotate(${rotation}deg)`, transition: 'transform 4.1s cubic-bezier(.17,.67,.14,1.02)' }}>
              <defs>
                <linearGradient id="glassGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1F9E7A" /><stop offset="45%" stopColor="#5FD6AE" />
                  <stop offset="100%" stopColor="#0E7A5C" />
                </linearGradient>
                <linearGradient id="capGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFE08A" /><stop offset="100%" stopColor="#D89A2E" />
                </linearGradient>
              </defs>
              <rect x="40" y="0" width="20" height="34" rx="4" fill="url(#capGrad)" />
              <rect x="42" y="30" width="16" height="10" fill="#B87D1A" />
              <path d="M34 40 Q34 30 44 30 L56 30 Q66 30 66 40 L70 70 Q78 90 78 120 L78 195 Q78 216 58 216 L42 216 Q22 216 22 195 L22 120 Q22 90 30 70 Z"
                    fill="url(#glassGrad)" stroke="rgba(14,60,45,0.25)" strokeWidth="1" />
              <path d="M30 62 Q26 100 26 150 L26 195 Q26 205 32 208" fill="none" stroke="rgba(255,255,255,0.55)" strokeWidth="4" strokeLinecap="round" />
              <ellipse cx="50" cy="212" rx="26" ry="7" fill="#0E7A5C" opacity="0.4" />
            </svg>
          </div>

          {REWARDS.map((r, i) => (
            <div key={i} className={`sc-chip ${r.cls} ${winIndex === i && !spinning ? 'sc-win' : ''}`}
                 style={{ '--i': i, '--n': N, '--radius': `${radius}px` }}>
              <IconFor index={i} />
              <div className="sc-lbl">{r.label}</div>
            </div>
          ))}
        </div>

        <div className="sc-btn-row">
          <button className="sc-spin-btn" disabled={spinning} onClick={spin}>ÇEVİR</button>
        </div>
      </div>

      <div className={`sc-overlay ${qStep === 1 ? 'sc-show' : ''}`}>
        <div className="sc-card">
          <div className="sc-q-text">Doğruluk mu Cesaret mi?</div>
          <div className="sc-q-row">
            <button className="sc-q-btn sc-pos" onClick={answerQuestion}>Doğruluk</button>
            <button className="sc-q-btn sc-neg" onClick={answerQuestion}>Cesaret</button>
          </div>
        </div>
      </div>

      <div className={`sc-overlay ${qStep === 2 ? 'sc-show' : ''}`}>
        <div className="sc-card">
          <div className="sc-q-text">{companyQ.text}</div>
          <div className="sc-q-row">
            <button className="sc-q-btn sc-pos" onClick={answerQuestion}>{companyQ.pos}</button>
            <button className="sc-q-btn sc-neg" onClick={answerQuestion}>{companyQ.neg}</button>
          </div>
        </div>
      </div>

      <div className={`sc-overlay ${showResult ? 'sc-show' : ''}`}>
        <div className="sc-card">
          {(() => {
            if (winIndex === null) return null;
            const r = REWARDS[winIndex];
            const displayLabel = r.code ? r.label : (r.consolationLabel || r.label);
            const displayCode = r.code || r.consolationCode || null;
            const title = r.code ? 'Tebrikler' : 'Az Kalmıştı!';
            const sub = r.code ? '' : 'Yine de eli boş dönme, sana özel:';
            return (
              <>
                <div className="sc-result-icon-wrap"><IconFor index={r.code ? winIndex : 4} /></div>
                <div className="sc-result-title">{title}</div>
                {sub && <div className="sc-result-sub">{sub}</div>}
                <div className="sc-result-label">{displayLabel}</div>
                {displayCode ? (
                  <>
                    <div className="sc-coupon-box">
                      <div className="sc-coupon-code">KOD: {displayCode}</div>
                    </div>
                    <button className="sc-copy-btn" onClick={copyCode}>{copied ? 'Kopyalandı ✓' : 'KODU KOPYALA'}</button>
                    <button className="sc-skip-link" style={{ marginTop: 10 }} onClick={resetAll}>Devam Et</button>
                  </>
                ) : (
                  <button className="sc-result-close" onClick={resetAll}>Devam Et</button>
                )}
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
