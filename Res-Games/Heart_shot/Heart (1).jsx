import React, { useState, useRef, useEffect } from 'react';
import './Heart.css';

/*
  ================================================================
  KALP VURMA — RMC Gamification  (REVİZE 2)
  ================================================================
  - HAREKETLİ SİSTEM: alttaki yay sürekli sağa-sola SÜPÜRÜR.
    Ekrana dokunduğun an ok, yayın o anki açısında fırlar.
  - GÖSTERGE YOK: nişan çizgisi / nişan halkası / imleç yok.
    Zamanlama oyunu — yay doğru açıya gelince bas.
  - Ok gerçek mermi gibi uçar (hız + yerçekimi yok, düz uçuş).
  - Sadece kalpler vurulur. 💔 kırık kalp −2 puan.
  - TAM EKRAN: sabit dünya 900x640 + tek scale(k) => MOBİL = PC.
  ================================================================
*/

const W = 900, H = 640;
const BOW = { x: 450, y: 596 };        // yay (dünya)
const GAME_MS = 10000;
const SPAWN_MS = 330;
const SKY_TOP = 90, SKY_BOT = 400;   // kalpler sadece bu bantta uçar (yay dibi boş)
const ARROW_V = 15;                    // ok hızı (birim/kare)
const HIT_R = 34;
const AIM_MAX = 80;                    // yay yere doğrultulamaz (±80°, 0 = yukarı)

const TIERS = [
  { need: 14, label: '%25 İndirim', code: 'KALP25' },
  { need: 9,  label: '%20 İndirim', code: 'KALP20' },
  { need: 5,  label: '%15 İndirim', code: 'KALP15' },
  { need: 0,  label: '%10 İndirim', code: 'KALP10' },
];
const rewardFor = (n) => TIERS.find(t => n >= t.need);
const nextTier = (n) => [...TIERS].reverse().find(t => t.need > n) || null;

export default function Heart() {
  const [phase, setPhase] = useState('intro');   // intro | play | end
  const [scale, setScale] = useState(1);
  const [hearts, setHearts] = useState([]);      // {id,x,y,vx,vy,bad,born}
  const [arrows, setArrows] = useState([]);      // {id,x,y,vx,vy,deg}
  const [pops, setPops] = useState([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [timeLeft, setTime] = useState(GAME_MS);
  const [bowDeg, setBowDeg] = useState(0);
  const [copied, setCopied] = useState(false);
  const [aiming, setAiming] = useState(false);

  const skyRef = useRef(null);
  const raf = useRef(null);
  const timers = useRef([]);
  const heartsRef = useRef([]);
  const arrowsRef = useRef([]);
  const scoreRef = useRef(0);
  const comboRef = useRef(0);
  const idRef = useRef(1);
  const startRef = useRef(0);
  const bowRef = useRef(0);

  useEffect(() => () => {
    cancelAnimationFrame(raf.current);
    timers.current.forEach(t => { clearTimeout(t); clearInterval(t); });
  }, []);

  useEffect(() => {
    const m = () => { const el = skyRef.current; if (!el) return; setScale(el.getBoundingClientRect().width / W); };
    m(); window.addEventListener('resize', m); return () => window.removeEventListener('resize', m);
  }, [phase]);

  function start() {
    cancelAnimationFrame(raf.current);
    timers.current.forEach(t => { clearTimeout(t); clearInterval(t); }); timers.current = [];
    heartsRef.current = []; arrowsRef.current = [];
    scoreRef.current = 0; comboRef.current = 0;
    setHearts([]); setArrows([]); setPops([]); setScore(0); setCombo(0);
    setTime(GAME_MS); setCopied(false);
    bowRef.current = 0; setBowDeg(0); setAiming(false);
    setPhase('play');
    startRef.current = Date.now();
    raf.current = requestAnimationFrame(loop);

    const sp = setInterval(() => {
      const bad = Math.random() < 0.20;
      const fromLeft = Math.random() < 0.5;
      const y = SKY_TOP + Math.random() * (SKY_BOT - SKY_TOP);   // ÜST BÖLGE — yayın dibinden çıkmaz
      heartsRef.current = [...heartsRef.current, {
        id: idRef.current++,
        x: fromLeft ? -50 : W + 50,
        y, bad,
        vx: (fromLeft ? 1 : -1) * (1.15 + Math.random() * 1.0),  // yatay süzülüş
        vy: 0,
        ph: Math.random() * 6.28,
        y0: y,
        born: Date.now(),
      }];
      setHearts(heartsRef.current);
    }, SPAWN_MS);
    timers.current.push(sp);

    const tk = setInterval(() => {
      const left = Math.max(0, GAME_MS - (Date.now() - startRef.current));
      setTime(left);
      if (left <= 0) { clearInterval(tk); finish(); }
    }, 100);
    timers.current.push(tk);
  }

  function finish() {
    cancelAnimationFrame(raf.current);
    timers.current.forEach(t => { clearTimeout(t); clearInterval(t); }); timers.current = [];
    timers.current.push(setTimeout(() => setPhase('end'), 400));
  }

  function loop() {
    const now = Date.now();

    // kalpler yanlardan girip yatay süzülür + hafif salınır
    heartsRef.current = heartsRef.current
      .map(h => ({
        ...h,
        x: h.x + h.vx,
        y: h.y0 + Math.sin((now - h.born) / 480 + h.ph) * 26,
      }))
      .filter(h => h.x > -90 && h.x < W + 90);

    // oklar uçar
    const live = [];
    for (const a of arrowsRef.current) {
      const nx = a.x + a.vx, ny = a.y + a.vy;
      const hit = heartsRef.current.find(h => Math.hypot(h.x - nx, h.y - ny) < HIT_R);
      if (hit) { resolve(hit); continue; }                 // ok kalbe saplandı
      if (nx < -40 || nx > W + 40 || ny < -40) continue;   // ekrandan çıktı
      live.push({ ...a, x: nx, y: ny });
    }
    arrowsRef.current = live;

    setHearts(heartsRef.current);
    setArrows(arrowsRef.current);
    raf.current = requestAnimationFrame(loop);
  }

  function resolve(h) {
    heartsRef.current = heartsRef.current.filter(x => x !== h);
    if (h.bad) {
      scoreRef.current = Math.max(0, scoreRef.current - 2);
      comboRef.current = 0;
      addPop(h.x, h.y, '−2', true);
    } else {
      comboRef.current += 1;
      const mult = comboRef.current >= 5 ? 3 : comboRef.current >= 3 ? 2 : 1;
      scoreRef.current += mult;
      addPop(h.x, h.y, '+' + mult, false);
    }
    setScore(scoreRef.current);
    setCombo(comboRef.current);
  }

  function addPop(x, y, txt, bad) {
    const id = idRef.current++;
    setPops(p => [...p, { id, x, y, txt, bad }]);
    timers.current.push(setTimeout(() => setPops(p => p.filter(q => q.id !== id)), 650));
  }

  function toWorld(e) {
    const r = skyRef.current.getBoundingClientRect();
    const k = r.width / W;
    return { x: (e.clientX - r.left) / k, y: (e.clientY - r.top) / k };
  }

  // imleç/parmak nereye bakıyorsa yay oraya döner
  function aimAt(e) {
    if (phase !== 'play') return;
    const w = toWorld(e);
    const dx = w.x - BOW.x, dy = w.y - BOW.y;
    let deg = (Math.atan2(dx, -dy) * 180) / Math.PI;      // 0 = yukarı, + = saat yönü
    deg = Math.max(-AIM_MAX, Math.min(AIM_MAX, deg));
    bowRef.current = deg;
    setBowDeg(deg);
  }

  function onAimDown(e) {
    if (phase !== 'play') return;
    e.preventDefault();
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    setAiming(true);
    aimAt(e);
  }
  function onAimMove(e) {
    if (phase !== 'play') return;
    aimAt(e);                                            // PC'de hover, mobilde sürükleme
  }
  function onAimUp(e) {
    if (phase !== 'play') return;
    e.preventDefault();
    aimAt(e);
    setAiming(false);
    shoot();                                             // bırakınca ok fırlar
  }

  function shoot() {
    if (phase !== 'play') return;
    const deg = bowRef.current;
    const rad = ((deg - 90) * Math.PI) / 180;             // -90 = yukarı
    arrowsRef.current = [...arrowsRef.current, {
      id: idRef.current++,
      x: BOW.x + Math.cos(rad) * 40,
      y: BOW.y + Math.sin(rad) * 40,
      vx: Math.cos(rad) * ARROW_V,
      vy: Math.sin(rad) * ARROW_V,
      deg,
    }];
    setArrows(arrowsRef.current);
  }

  useEffect(() => {
    const el = skyRef.current; if (!el || phase !== 'play') return;
    const stop = (ev) => ev.preventDefault();
    el.addEventListener('touchstart', stop, { passive: false });
    el.addEventListener('touchmove', stop, { passive: false });
    return () => { el.removeEventListener('touchstart', stop); el.removeEventListener('touchmove', stop); };
  }, [phase]);

  const secs = (timeLeft / 1000).toFixed(1);
  const reward = rewardFor(score);
  const nt = nextTier(score);

  function copyCode() {
    if (navigator.clipboard) navigator.clipboard.writeText(reward.code).catch(() => {});
    setCopied(true); timers.current.push(setTimeout(() => setCopied(false), 1800));
  }
  function reset() {
    cancelAnimationFrame(raf.current);
    timers.current.forEach(t => { clearTimeout(t); clearInterval(t); }); timers.current = [];
    setPhase('intro'); setScore(0); scoreRef.current = 0; setCombo(0); comboRef.current = 0;
    setHearts([]); heartsRef.current = []; setArrows([]); arrowsRef.current = []; setPops([]);
    setTime(GAME_MS); setCopied(false);
  }

  return (
    <div className="hv-root">
      <div className="hv-wrap">

        <div className="hv-campaign">
          <div className="hv-title">Kalpleri Vur, İndirimini Kap!</div>
          <div className="hv-pill">🏹 <b>%25'e varan kupon</b></div>
        </div>

        <div className="hv-box">
          <div className="hv-area" ref={skyRef}
               onPointerDown={onAimDown} onPointerMove={onAimMove}
               onPointerUp={onAimUp} onPointerCancel={() => setAiming(false)}>
            <div className="hv-stage" style={{ width: W, height: H, transform: `scale(${scale})` }}>

              {hearts.map(h => (
                <div key={h.id} className={'hv-heart' + (h.bad ? ' bad' : '')} style={{ left: h.x - 32, top: h.y - 32 }}>
                  {h.bad ? '💔' : '❤️'}
                </div>
              ))}

              {arrows.map(a => (
                <div key={a.id} className="hv-arrow" style={{ left: a.x - 22, top: a.y - 4, transform: `rotate(${a.deg}deg)` }}>
                  <i />
                </div>
              ))}

              {pops.map(p => (
                <div key={p.id} className={'hv-pop' + (p.bad ? ' bad' : '')} style={{ left: p.x - 34, top: p.y - 20 }}>{p.txt}</div>
              ))}

              {/* YAY — sürekli süpürür, gösterge yok */}
              <div className={'hv-bow' + (aiming ? ' draw' : '')} style={{ left: BOW.x - 44, top: BOW.y - 44, transform: `rotate(${bowDeg}deg)` }}>
                <div className="hv-bowimg">🏹</div>
              </div>
              <div className="hv-base" />
            </div>

            <div className="hv-hud">
              <div className="hv-stat"><b>{score}</b><span>PUAN</span></div>
              {combo >= 3 && <div className="hv-combo">🔥 {combo >= 5 ? '×3' : '×2'} SERİ</div>}
              <div className={'hv-time' + (timeLeft <= 3000 ? ' low' : '')}>⏱ {secs}s</div>
            </div>

            {phase === 'play' && nt && (
              <div className="hv-nudge">Bir üst ödüle <b>{nt.need - score}</b> puan → <b>{nt.label}</b></div>
            )}
          </div>

          {phase === 'intro' && (
            <div className="hv-overlay">
              <div className="hv-modal">
                <div className="hv-emoji">🏹</div>
                <div className="hv-modal-title">Kalpleri Vur, İndirimini Kap!</div>
                <p className="hv-modal-body"><b>10 saniyen var.</b> Yayı istediğin kalbe doğrult ve bırak — ok o yöne fırlasın. <b>💔 kırık kalbi vurma</b>; <b>%25'e varan</b> kupon seni bekliyor.</p>
                <div className="hv-tiers">
                  <div className="hv-tier"><b>5 puan</b><span>%15</span></div>
                  <div className="hv-tier"><b>9 puan</b><span>%20</span></div>
                  <div className="hv-tier hot"><b>14 puan</b><span>%25</span></div>
                </div>
                <button className="hv-btn" onClick={start}>Oyuna Başla</button>
              </div>
            </div>
          )}

          {phase === 'end' && (
            <div className="hv-overlay">
              <div className="hv-modal">
                <button className="hv-x" onClick={reset}>✕</button>
                <div className="hv-emoji">{score >= 14 ? '🏆' : '🎉'}</div>
                <div className="hv-modal-title win">TEBRİKLER!</div>
                <p className="hv-modal-body"><b>{score}</b> puan topladın ve <b>{reward.label}</b> kuponu kazandın!</p>
                <div className="hv-coupon" onClick={copyCode}>
                  <span className="hv-code">{reward.code}</span>
                  <span className="hv-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
                </div>
                <div className="hv-fine">⏳ Bugüne özel — kupon 24 saat geçerli.</div>
                <button className="hv-btn" onClick={reset}>Kuponu Kullan, Alışverişe Başla</button>
                <button className="hv-replay" onClick={start}>Tekrar oyna</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
