import React, { useState, useRef, useEffect } from 'react';
import './Combo.css';

/*
  ================================================================
  KOMBİNİ BUL — Alışveriş Wordle · RMC Gamification
  ================================================================
  (Kalp Sıralama'nın yerine geçer — mekanik WORDLE.)

  - Gizli bir KOMBİN var: 5 alışveriş ikonundan 4'ü, sıralı, tekrarsız.
  - Kullanıcı 4 slotu doldurup TAHMİN ET'e basar.
  - Wordle geri bildirimi:
      YEŞİL  = doğru ürün, doğru yerde
      SARI   = ürün kombinde var ama başka sırada
      GRİ    = bu ürün kombinde yok
  - 6 hak. Ne kadar erken bilirsen kupon o kadar büyük.
  - Ödül = kopyalanabilir kupon. Mail/opt-in formu yok.
  ================================================================
*/

const LEN = 5;
const TRIES = 6;

// 6 ürün, 5 slot, tekrarsız → 720 olasılık. Her turda TAM 1 ürün kombinde yok (gri).
const SHOP = [
  { id: 'sneaker',  e: '👟', n: 'Sneaker',  c: '#3A8FDC' },
  { id: 'canta',    e: '👜', n: 'Çanta',    c: '#E23A5E' },
  { id: 'saat',     e: '⌚', n: 'Saat',     c: '#F2C94C' },
  { id: 'kulaklik', e: '🎧', n: 'Kulaklık', c: '#9B6BFF' },
  { id: 'ruj',      e: '💄', n: 'Ruj',      c: '#4FC27C' },
  { id: 'gozluk',   e: '🕶️', n: 'Gözlük',   c: '#F2884A' },
];

const TIERS = [
  { max: 2, label: '%25 İndirim', code: 'KOMBIN25' },
  { max: 4, label: '%20 İndirim', code: 'KOMBIN20' },
  { max: 6, label: '%15 İndirim', code: 'KOMBIN15' },
];
const LOSE = { label: '%10 İndirim', code: 'KOMBIN10' };

function secretCombo() {
  const pool = [...SHOP];
  const out = [];
  for (let i = 0; i < LEN; i++) {
    const j = Math.floor(Math.random() * pool.length);
    out.push(pool.splice(j, 1)[0].id);
  }
  return out;
}

// WORDLE mantığı: önce yeşilleri işaretle, kalanlardan sarıları eşle
function grade(guess, secret) {
  const res = Array(LEN).fill('gri');
  const left = {};
  secret.forEach((s, i) => {
    if (guess[i] === s) res[i] = 'yesil';
    else left[s] = (left[s] || 0) + 1;
  });
  guess.forEach((g, i) => {
    if (res[i] === 'yesil') return;
    if (left[g] > 0) { res[i] = 'sari'; left[g] -= 1; }
  });
  return res;
}

export default function Combo() {
  const [phase, setPhase] = useState('intro');   // intro | play | end
  const [secret, setSecret] = useState(secretCombo);
  const [rows, setRows] = useState([]);          // [{guess:[], res:[]}]
  const [cur, setCur] = useState([]);            // aktif satır
  const [won, setWon] = useState(false);
  const [shake, setShake] = useState(false);
  const [copied, setCopied] = useState(false);
  const [note, setNote] = useState(null);

  const timers = useRef([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function start() {
    setSecret(secretCombo());
    setRows([]); setCur([]); setWon(false); setCopied(false); setNote(null);
    setPhase('play');
  }

  function put(id) {
    if (phase !== 'play' || cur.length >= LEN) return;
    setCur(c => [...c, id]);
  }
  function del() {
    if (phase !== 'play' || !cur.length) return;
    setCur(c => c.slice(0, -1));
  }

  function submit() {
    if (phase !== 'play' || cur.length !== LEN) return;
    // aynı ürün iki kez seçilmiş mi? (kombin tekrarsız)
    if (new Set(cur).size !== LEN) {
      setShake(true);
      setNote('Aynı ürünü iki kez koyamazsın');
      timers.current.push(setTimeout(() => setShake(false), 450));
      timers.current.push(setTimeout(() => setNote(null), 1600));
      return;
    }
    const res = grade(cur, secret);
    const next = [...rows, { guess: cur, res }];
    setRows(next);
    setCur([]);

    if (res.every(r => r === 'yesil')) {
      setWon(true);
      timers.current.push(setTimeout(() => setPhase('end'), 1000));
    } else if (next.length >= TRIES) {
      setWon(false);
      timers.current.push(setTimeout(() => setPhase('end'), 1100));
    }
  }

  function copyCode(code) {
    try {
      navigator.clipboard.writeText(code);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = code; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    timers.current.push(setTimeout(() => setCopied(false), 1800));
  }

  function reset() {
    setPhase('intro'); setRows([]); setCur([]); setWon(false); setCopied(false);
  }

  const icon = (id) => SHOP.find(s => s.id === id);
  const reward = won ? (TIERS.find(t => rows.length <= t.max) || TIERS[2]) : LOSE;

  // ürün ipucu durumu (klavye rengi)
  const known = {};
  rows.forEach(r => r.guess.forEach((g, i) => {
    const st = r.res[i];
    const rank = { gri: 1, sari: 2, yesil: 3 };
    if (!known[g] || rank[st] > rank[known[g]]) known[g] = st;
  }));

  const board = Array.from({ length: TRIES }, (_, i) => {
    if (i < rows.length) return rows[i];
    if (i === rows.length && phase === 'play') return { guess: cur, res: null, active: true };
    return { guess: [], res: null };
  });

  return (
    <div className="cb-root">
      <div className="cb-wrap">

        <div className="cb-campaign">
          <div className="cb-title">Kombini Bul, İndirimini Kap!</div>
          <div className="cb-pill">🛍️ <b>%25'e varan kupon</b></div>
        </div>

        <div className="cb-box">
          <div className="cb-glow" />
          <div className="cb-inner">

          <div className="cb-hud">
            <div className="cb-tries">
              HAK <b>{TRIES - rows.length}</b><em>/{TRIES}</em>
            </div>
            <div className="cb-legend">
              <span><i className="yesil" />Yerinde</span>
              <span><i className="sari" />Var, yeri yanlış</span>
              <span><i className="gri" />Yok</span>
            </div>
          </div>

          {/* ---- TAHTA */}
          <div className="cb-board">
            {board.map((row, ri) => (
              <div key={ri}
                   className={'cb-row' + (row.active ? ' active' : '') + (row.active && shake ? ' shake' : '')}>
                {Array.from({ length: LEN }, (_, ci) => {
                  const id = row.guess[ci];
                  const st = row.res ? row.res[ci] : null;
                  const ic = id ? icon(id) : null;
                  return (
                    <div key={ci}
                         className={'cb-cell' + (st ? ' ' + st : '') + (id && !st ? ' filled' : '')}
                         style={st ? { animationDelay: (ci * 120) + 'ms' } : undefined}>
                      {ic && <span>{ic.e}</span>}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {note && <div className="cb-note">{note}</div>}

          {/* ---- ÜRÜN KLAVYESİ */}
          <div className="cb-keys">
            {SHOP.map(s => (
              <button key={s.id}
                      className={'cb-key' + (known[s.id] ? ' ' + known[s.id] : '')}
                      onClick={() => put(s.id)}
                      disabled={phase !== 'play' || cur.length >= LEN}>
                <b>{s.e}</b>
                <em>{s.n}</em>
              </button>
            ))}
          </div>

          <div className="cb-actions">
            <button className="cb-del" onClick={del}
                    disabled={phase !== 'play' || !cur.length}>⌫ Sil</button>
            <button className="cb-go" onClick={submit}
                    disabled={phase !== 'play' || cur.length !== LEN}>TAHMİN ET</button>
          </div>
          </div>

          {phase === 'intro' && (
            <div className="cb-overlay">
              <div className="cb-modal">
                <div className="cb-emoji">🛍️</div>
                <div className="cb-modal-title">Kombini Bul!</div>
                <p className="cb-modal-body">
                  Gizli bir <b>5 ürünlük kombin</b> var. Tahminini yap, her denemeden sonra ipucu al:
                </p>
                <div className="cb-rules">
                  <div className="cb-rule"><i className="yesil" /><span><b>Yeşil</b> — ürün doğru, yeri de doğru</span></div>
                  <div className="cb-rule"><i className="sari" /><span><b>Sarı</b> — ürün kombinde var, ama başka sırada</span></div>
                  <div className="cb-rule"><i className="gri" /><span><b>Gri</b> — bu ürün kombinde yok</span></div>
                </div>
                <p className="cb-modal-body sm">
                  <b>6 hakkın</b> var. 6 üründen 5'i kombinde — biri fazla. Her ürün bir kez kullanılır.
                  Ne kadar erken bilirsen indirimin o kadar büyür.
                </p>
                <div className="cb-tiers">
                  <div className="cb-tier hot"><b>1–2</b><span>%25</span></div>
                  <div className="cb-tier"><b>3–4</b><span>%20</span></div>
                  <div className="cb-tier"><b>5–6</b><span>%15</span></div>
                </div>
                <button className="cb-btn" onClick={start}>Oyunu Başlat</button>
              </div>
            </div>
          )}

          {phase === 'end' && (
            <div className="cb-overlay">
              <div className="cb-modal">
                <button className="cb-x" onClick={reset}>✕</button>
                <div className="cb-emoji">{won ? (rows.length <= 2 ? '🏆' : '🎉') : '🛍️'}</div>
                <div className={'cb-modal-title' + (won ? ' win' : '')}>
                  {won ? 'KOMBİNİ BULDUN!' : 'HAKLARIN BİTTİ'}
                </div>
                <p className="cb-modal-body">
                  {won
                    ? <><b>{rows.length}. denemede</b> bildin — <b>{reward.label}</b> kuponu senin!</>
                    : <>Kombin buydu. Yine de <b>{reward.label}</b> kuponunu bırakıyoruz.</>}
                </p>
                <div className="cb-reveal">
                  {secret.map((id, i) => (
                    <div key={i} className="cb-cell yesil static">
                      <span>{icon(id).e}</span>
                    </div>
                  ))}
                </div>
                <div className="cb-coupon" onClick={() => copyCode(reward.code)}>
                  <span className="cb-code">{reward.code}</span>
                  <span className="cb-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
                </div>
                <div className="cb-fine">⏳ Bugüne özel — kupon 24 saat geçerli.</div>
                <button className="cb-btn" onClick={reset}>Kuponu Kullan, Alışverişe Başla</button>
                <button className="cb-replay" onClick={start}>Yeni kombin dene</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
