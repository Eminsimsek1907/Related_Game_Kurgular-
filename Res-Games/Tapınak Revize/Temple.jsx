import React, { useState, useRef, useEffect } from 'react';
import './Temple.css';

/*
  ================================================================
  GİZLİ TAPINAK — RMC Gamification
  ================================================================
  - 7x7 taş ızgara; altında 4 hazine gizli. 14 kazma hakkı.
  - Boş taş kazınca komşu 8 karede kaç hazine olduğunu gösterir (ipucu).
  - İpuçlarını kullanarak hazineleri bul; bulduğun hazine indirimi büyütür.
  - Ödül = kopyalanabilir kupon. Mail/opt-in formu yok.
  ================================================================
*/

const N = 7;
const TREASURES = 4;
const DIGS = 14;

const LOOT = ['💎', '👑', '🏺', '🗝️'];

const TIERS = [
  { need: 4, label: '%25 İndirim', code: 'TAPINAK25' },
  { need: 3, label: '%20 İndirim', code: 'TAPINAK20' },
  { need: 2, label: '%15 İndirim', code: 'TAPINAK15' },
  { need: 0, label: '%10 İndirim', code: 'TAPINAK10' },
];
const rewardFor = (n) => TIERS.find(t => n >= t.need);
const nextTier = (n) => [...TIERS].reverse().find(t => t.need > n) || null;

function buildBoard() {
  const cells = Array.from({ length: N * N }, () => ({ t: false, e: null }));
  const spots = [];
  while (spots.length < TREASURES) {
    const i = Math.floor(Math.random() * N * N);
    if (!spots.includes(i)) spots.push(i);
  }
  spots.forEach((i, k) => { cells[i].t = true; cells[i].e = LOOT[k % LOOT.length]; });
  // komşu hazine sayıları
  cells.forEach((c, i) => {
    const x = i % N, y = Math.floor(i / N);
    let n = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      if (!dx && !dy) continue;
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= N || ny >= N) continue;
      if (cells[ny * N + nx].t) n++;
    }
    c.n = n;
  });
  return cells;
}

export default function Temple() {
  const [phase, setPhase] = useState('intro');    // intro | play | end
  const [board, setBoard] = useState(buildBoard);
  const [dug, setDug] = useState([]);             // kazılan index'ler
  const [left, setLeft] = useState(DIGS);
  const [found, setFound] = useState(0);
  const [toast, setToast] = useState(null);
  const [copied, setCopied] = useState(false);
  const timers = useRef([]);
  const foundRef = useRef(0);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function start() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setBoard(buildBoard()); setDug([]); setLeft(DIGS);
    setFound(0); foundRef.current = 0; setToast(null); setCopied(false);
    setPhase('play');
  }

  function dig(i) {
    if (phase !== 'play' || dug.includes(i) || left <= 0) return;
    const c = board[i];
    setDug(d => [...d, i]);
    const nl = left - 1;
    setLeft(nl);
    if (c.t) {
      foundRef.current += 1;
      setFound(foundRef.current);
      setToast(`HAZİNE! ${c.e}`);
      timers.current.push(setTimeout(() => setToast(null), 900));
    }
    if (foundRef.current >= TREASURES) {
      timers.current.push(setTimeout(() => setPhase('end'), 900));
      return;
    }
    if (nl <= 0) timers.current.push(setTimeout(() => setPhase('end'), 800));
  }

  const reward = rewardFor(found);
  const nt = nextTier(found);

  function copyCode() {
    if (navigator.clipboard) navigator.clipboard.writeText(reward.code).catch(() => {});
    setCopied(true); timers.current.push(setTimeout(() => setCopied(false), 1800));
  }
  function reset() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setPhase('intro'); setDug([]); setLeft(DIGS); setFound(0); foundRef.current = 0; setCopied(false); setToast(null);
  }

  return (
    <div className="tp-root">
      <div className="tp-wrap">

        <div className="tp-campaign">
          <div className="tp-title">Tapınağı Kaz, Hazineyi Bul!</div>
          <div className="tp-pill">🏛️ 14 kazma · her hazine indirimini büyütür · <b>%25'e varan kupon</b></div>
        </div>

        <div className="tp-box">
        <div className="tp-panel">
          <div className="tp-torch left">🔥</div>
          <div className="tp-torch right">🔥</div>

          <div className="tp-hud">
            <div className="tp-stat"><span>KAZMA</span><b className={left <= 3 ? 'low' : ''}>{left}</b></div>
            <div className="tp-brand">🏛️ HAZİNE TAPINAĞI</div>
            <div className="tp-stat"><span>HAZİNE</span><b className="gold">{found}/{TREASURES}</b></div>
          </div>

          <div className="tp-board">
            {board.map((c, i) => {
              const isDug = dug.includes(i);
              return (
                <button key={i}
                        className={'tp-cell' + (isDug ? (c.t ? ' loot' : ' empty') : '')}
                        onClick={() => dig(i)}>
                  {isDug
                    ? (c.t ? <span className="tp-loot">{c.e}</span>
                           : <span className={'tp-hint h' + c.n}>{c.n > 0 ? c.n : '·'}</span>)
                    : <span className="tp-stone" />}
                </button>
              );
            })}
            {toast && <div className="tp-toast">{toast}</div>}
          </div>

          {phase === 'play' && (
            <div className="tp-legend">Rakamlar, çevresindeki <b>8 karede</b> kaç hazine olduğunu gösterir</div>
          )}
          {phase === 'play' && nt && (
            <div className="tp-nudge">Bir üst ödüle <b>{nt.need - found}</b> hazine → <b>{nt.label}</b></div>
          )}

        </div>

          {phase === 'intro' && (
            <div className="tp-overlay">
              <div className="tp-modal">
                <div className="tp-emoji">🏛️</div>
                <div className="tp-modal-title">Tapınağı Kaz, Hazineyi Bul!</div>
                <p className="tp-modal-body">Taşların altında <b>4 hazine</b> gizli. Rakam ipuçlarını kullan, 14 kazmayla en çok hazineyi çıkar — <b>%25'e varan</b> kupon seni bekliyor.</p>
                <div className="tp-tiers">
                  <div className="tp-tier"><b>2 hazine</b><span>%15</span></div>
                  <div className="tp-tier"><b>3 hazine</b><span>%20</span></div>
                  <div className="tp-tier hot"><b>4 hazine</b><span>%25</span></div>
                </div>
                <button className="tp-btn" onClick={start}>Oyuna Başla</button>
              </div>
            </div>
          )}

          {phase === 'end' && (
            <div className="tp-overlay">
              <div className="tp-modal">
                <button className="tp-x" onClick={reset}>✕</button>
                <div className="tp-emoji">{found >= 4 ? '🏆' : '🎉'}</div>
                <div className="tp-modal-title win">TEBRİKLER!</div>
                <p className="tp-modal-body"><b>{found}</b> hazine çıkardın ve <b>{reward.label}</b> kuponu kazandın!</p>
                <div className="tp-coupon" onClick={copyCode}>
                  <span className="tp-code">{reward.code}</span>
                  <span className="tp-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
                </div>
                <div className="tp-fine">⏳ Bugüne özel — kupon 24 saat geçerli.</div>
                <button className="tp-btn" onClick={reset}>Kuponu Kullan, Alışverişe Başla</button>
                <button className="tp-replay" onClick={start}>Tekrar oyna</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
