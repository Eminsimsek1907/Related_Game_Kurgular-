import React, { useState, useRef, useEffect } from 'react';
import './Color.css';

/*
  ================================================================
  RENK KARIŞTIR — RMC Gamification
  ================================================================
  - Hedef renk gösterilir. Kullanıcı boya damlaları ekleyerek karışımı
    hedefe yaklaştırmaya çalışır (canlı karışım önizlemesi).
  - 3 tur. Her turda benzerlik yüzdesi hesaplanır; ortalama indirimi belirler.
  - Ödül = kopyalanabilir kupon. Mail/opt-in formu yok.
  ================================================================
*/

const PAINTS = [
  { id: 'k', name: 'Kırmızı', hex: '#E53935' },
  { id: 's', name: 'Sarı',    hex: '#FDD835' },
  { id: 'm', name: 'Mavi',    hex: '#1E88E5' },
  { id: 'y', name: 'Yeşil',   hex: '#43A047' },
  { id: 'b', name: 'Beyaz',   hex: '#FFFFFF' },
  { id: 'x', name: 'Siyah',   hex: '#212121' },
];

const hex2rgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
const rgb2css = (c) => `rgb(${Math.round(c[0])}, ${Math.round(c[1])}, ${Math.round(c[2])})`;

function mix(drops) {
  let tot = 0; const acc = [0, 0, 0];
  PAINTS.forEach(p => {
    const n = drops[p.id] || 0; if (!n) return;
    const c = hex2rgb(p.hex);
    acc[0] += c[0] * n; acc[1] += c[1] * n; acc[2] += c[2] * n; tot += n;
  });
  if (!tot) return null;
  return [acc[0] / tot, acc[1] / tot, acc[2] / tot];
}
function similarity(a, b) {
  const d = Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
  return Math.max(0, Math.min(100, Math.round(100 - d * 0.45)));
}

// SADECE 2 RENK KARIŞIMI -> kolay ve her zaman %100 ulaşılabilir
const ROUND_MS = 20000;                        // her tur 20 saniye
const ROUNDS = [
  { name: 'Turuncu', emoji: '🍊', recipe: { k: 1, s: 1 }, hint: 'Kırmızı + Sarı', product: 'Turuncu Koleksiyonu' },
  { name: 'Mor',     emoji: '💜', recipe: { k: 1, m: 1 }, hint: 'Kırmızı + Mavi', product: 'Mor Koleksiyonu' },
  { name: 'Pembe',   emoji: '🌸', recipe: { k: 1, b: 2 }, hint: 'Kırmızı + Beyaz', product: 'Pembe Koleksiyonu' },
];

const TIERS = [
  { need: 85, label: '%25 İndirim', code: 'RENK25' },
  { need: 70, label: '%20 İndirim', code: 'RENK20' },
  { need: 50, label: '%15 İndirim', code: 'RENK15' },
  { need: 0,  label: '%10 İndirim', code: 'RENK10' },
];
const rewardFor = (s) => TIERS.find(t => s >= t.need);

export default function Color() {
  const [phase, setPhase] = useState('intro');   // intro | play | end
  const [idx, setIdx] = useState(0);
  const [drops, setDrops] = useState({});
  const [order, setOrder] = useState([]);        // geri al için
  const [scores, setScores] = useState([]);
  const [feed, setFeed] = useState(null);        // {sim, mixCss}
  const [copied, setCopied] = useState(false);
  const [timeLeft, setTimeLeft] = useState(ROUND_MS);
  const timers = useRef([]);
  const feedRef = useRef(null);
  const matchRef = useRef(() => {});
  const roundStart = useRef(0);

  useEffect(() => () => timers.current.forEach(t => { clearTimeout(t); clearInterval(t); }), []);
  useEffect(() => { feedRef.current = feed; });

  // HER TUR 20 SANİYE — süre biterse mevcut karışımla otomatik eşleşir
  useEffect(() => {
    if (phase !== 'play') return;
    roundStart.current = Date.now();
    setTimeLeft(ROUND_MS);
    const iv = setInterval(() => {
      if (feedRef.current) return;                   // sonuç ekranında sayaç durur
      const left = Math.max(0, ROUND_MS - (Date.now() - roundStart.current));
      setTimeLeft(left);
      if (left <= 0) matchRef.current();
    }, 100);
    timers.current.push(iv);
    return () => clearInterval(iv);
  }, [phase, idx]);

  const round = ROUNDS[idx];
  const target = mix(round.recipe);
  const current = mix(drops);
  const total = order.length;

  function start() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setPhase('play'); setIdx(0); setDrops({}); setOrder([]); setScores([]); setFeed(null); feedRef.current = null; setTimeLeft(ROUND_MS); setCopied(false);
  }
  function addDrop(id) {
    if (phase !== 'play' || feed || total >= 14) return;
    setDrops(d => ({ ...d, [id]: (d[id] || 0) + 1 }));
    setOrder(o => [...o, id]);
  }
  function undo() {
    if (feed || !order.length) return;
    const last = order[order.length - 1];
    setOrder(o => o.slice(0, -1));
    setDrops(d => ({ ...d, [last]: Math.max(0, (d[last] || 0) - 1) }));
  }
  function clearAll() { if (feed) return; setDrops({}); setOrder([]); }

  function match() {
    if (feedRef.current) return;
    const sim = current ? similarity(current, target) : 0;
    setFeed({ sim, mixCss: current ? rgb2css(current) : '#EEE' });
    feedRef.current = { sim };
    setScores(s => [...s, sim]);
    timers.current.push(setTimeout(() => {
      setFeed(null); feedRef.current = null; setDrops({}); setOrder([]);
      if (idx + 1 >= ROUNDS.length) setPhase('end');
      else setIdx(i => i + 1);
    }, 1800));
  }
  matchRef.current = match;

  const avg = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
  const reward = rewardFor(avg);
  function copyCode() {
    if (navigator.clipboard) navigator.clipboard.writeText(reward.code).catch(() => {});
    setCopied(true); timers.current.push(setTimeout(() => setCopied(false), 1800));
  }
  function reset() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setPhase('intro'); setIdx(0); setDrops({}); setOrder([]); setScores([]); setFeed(null); feedRef.current = null; setTimeLeft(ROUND_MS); setCopied(false);
  }

  return (
    <div className="cl-root">
      <div className="cl-wrap">

        <div className="cl-campaign">
          <div className="cl-title">Renkleri Karıştır, Kuponu Kap!</div>
          <div className="cl-pill">🎨 renkleri karıştır, kuponu al · <b>%25'e varan kupon</b></div>
        </div>

        <div className="cl-panel">
          {phase === 'intro' && (
            <div className="cl-card">
              <div className="cl-emoji">🎨</div>
              <div className="cl-card-title">Renkleri Karıştır, Kuponu Kap!</div>
              <p className="cl-card-body">İki rengi karıştır, hedefi yakala. Her tur <b>20 saniye</b> — <b>%25'e varan</b> kupon seni bekliyor.</p>
              <div className="cl-tiers">
                <div className="cl-tier"><b>%50 isabet</b><span>%15</span></div>
                <div className="cl-tier"><b>%70 isabet</b><span>%20</span></div>
                <div className="cl-tier hot"><b>%85 isabet</b><span>%25</span></div>
              </div>
              <button className="cl-btn" onClick={start}>Oyuna Başla</button>
            </div>
          )}

          {phase === 'play' && (
            <div className="cl-game">
              <div className="cl-hud">
                <span className="cl-step">Renk {idx + 1}/{ROUNDS.length}</span>
                <div className="cl-dots">
                  {ROUNDS.map((_, i) => <i key={i} className={'cl-dot' + (i < idx ? ' done' : i === idx ? ' on' : '')} />)}
                </div>
                <span className={'cl-time' + (timeLeft <= 5000 ? ' low' : '')}>⏱ {Math.ceil(timeLeft / 1000)}s</span>
              </div>

              <div className="cl-compare">
                <div className="cl-slot">
                  <div className="cl-disc" style={{ background: rgb2css(target) }} />
                  <span className="cl-label">HEDEF · {round.emoji} {round.name}</span>
                  <span className="cl-hintx">{round.hint}</span>
                </div>
                <div className="cl-vs">→</div>
                <div className="cl-slot">
                  <div className={'cl-disc mix' + (current ? '' : ' empty')} style={current ? { background: rgb2css(current) } : undefined}>
                    {!current && <span className="cl-empty">boş</span>}
                  </div>
                  <span className="cl-label">SENİN KARIŞIMIN · {total} damla</span>
                </div>
              </div>

              <div className="cl-paints">
                {PAINTS.map(p => (
                  <button key={p.id} className="cl-paint" onClick={() => addDrop(p.id)} disabled={!!feed || total >= 14}>
                    <i style={{ background: p.hex }} />
                    <span>{p.name}</span>
                    {drops[p.id] > 0 && <b className="cl-count">{drops[p.id]}</b>}
                  </button>
                ))}
              </div>

              <div className="cl-actions">
                <button className="cl-sec" onClick={undo} disabled={!!feed || !order.length}>↩ Geri Al</button>
                <button className="cl-sec" onClick={clearAll} disabled={!!feed || !order.length}>Temizle</button>
                <button className="cl-btn cl-go" onClick={match} disabled={!!feed || !current}>Karıştır ve Eşleştir</button>
              </div>

              {feed && (
                <div className="cl-feed">
                  <div className="cl-feed-row">
                    <div className="cl-mini" style={{ background: rgb2css(target) }} />
                    <div className="cl-mini" style={{ background: feed.mixCss }} />
                  </div>
                  <div className={'cl-sim' + (feed.sim >= 85 ? ' great' : feed.sim >= 60 ? ' ok' : ' bad')}>%{feed.sim} isabet</div>
                  <div className="cl-simbar"><div className="cl-simbar-fill" style={{ width: feed.sim + '%' }} /></div>
                  {feed.sim >= 70 && <div className="cl-suggest">✨ Sana özel: <b>{round.product}</b></div>}
                </div>
              )}
            </div>
          )}

          {phase === 'end' && (
            <div className="cl-card">
              <button className="cl-x" onClick={reset}>✕</button>
              <div className="cl-emoji">{avg >= 85 ? '🏆' : '🎉'}</div>
              <div className="cl-card-title win">TEBRİKLER!</div>
              <p className="cl-card-body">Ortalama <b>%{avg}</b> isabetle <b>{reward.label}</b> kuponu kazandın!</p>
              <div className="cl-coupon" onClick={copyCode}>
                <span className="cl-code">{reward.code}</span>
                <span className="cl-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
              </div>
              <div className="cl-fine">⏳ Bugüne özel — kupon 24 saat geçerli.</div>
              <button className="cl-btn" onClick={reset}>Kuponu Kullan, Alışverişe Başla</button>
              <button className="cl-replay" onClick={start}>Tekrar oyna</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
