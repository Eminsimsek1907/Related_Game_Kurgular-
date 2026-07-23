import React, { useState, useRef, useEffect } from 'react';
import './Emoji.css';

/*
  ================================================================
  EMOJİ İLE ŞARKI BUL — RMC Gamification
  ================================================================
  - Ekranda emoji dizisi çıkar, kullanıcı şarkı adını yazar.
  - 5 soru. Doğru cevap sayısı arttıkça indirim büyür (herkes kazanır).
  - Cevap karşılaştırması aksan/boşluk/büyük-küçük duyarsız,
    her soru için birden fazla kabul edilen yazım desteklenir.
  - Ödül = kopyalanabilir kupon. Mail/opt-in formu yok.
  ================================================================
*/

const QUESTIONS = [
  { emojis: ['🐑', '🐑', '💔'], song: 'Kuzu Kuzu', artist: 'Tarkan',
    answers: ['kuzu kuzu', 'tarkan kuzu kuzu'] },
  { emojis: ['🌹', '💗', '🌸'], song: 'Gülpembe', artist: 'Barış Manço',
    answers: ['gulpembe', 'baris manco gulpembe'] },
  { emojis: ['🔥', '🎸', '💥'], song: 'Her Şeyi Yak', artist: 'Duman',
    answers: ['her seyi yak', 'duman her seyi yak', 'herseyi yak'] },
];

const TIERS = [
  { need: 3, label: '%25 İndirim', code: 'SARKI25' },
  { need: 2, label: '%20 İndirim', code: 'SARKI20' },
  { need: 1, label: '%15 İndirim', code: 'SARKI15' },
  { need: 0, label: '%10 İndirim', code: 'SARKI10' },
];
const rewardFor = (s) => TIERS.find(t => s >= t.need);

const norm = (s) => s.toLocaleLowerCase('tr')
  .replace(/ı/g, 'i').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's')
  .replace(/ö/g, 'o').replace(/ç/g, 'c').replace(/[^a-z0-9]/g, '');

export default function Emoji() {
  const [phase, setPhase] = useState('intro');   // intro | play | end
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [val, setVal] = useState('');
  const [feed, setFeed] = useState(null);        // {ok, text}
  const [hint, setHint] = useState(false);
  const [copied, setCopied] = useState(false);
  const timers = useRef([]);
  const inputRef = useRef(null);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const q = QUESTIONS[idx];

  function start() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setPhase('play'); setIdx(0); setScore(0); setVal(''); setFeed(null); setHint(false); setCopied(false);
    timers.current.push(setTimeout(() => inputRef.current && inputRef.current.focus(), 60));
  }

  function next(correct) {
    setFeed({ ok: correct, text: correct ? `DOĞRU! ${q.artist} — ${q.song} 🎉` : `Doğrusu: ${q.artist} — ${q.song}` });
    if (correct) setScore(s => s + 1);
    timers.current.push(setTimeout(() => {
      setFeed(null); setVal(''); setHint(false);
      if (idx + 1 >= QUESTIONS.length) setPhase('end');
      else { setIdx(i => i + 1); timers.current.push(setTimeout(() => inputRef.current && inputRef.current.focus(), 40)); }
    }, 1100));
  }

  function guess() {
    if (feed) return;
    const g = norm(val);
    if (!g) return;
    const song = norm(q.song);
    const ok = norm(q.song) === g
      || norm(q.artist + q.song) === g
      || q.answers.some(a => norm(a) === g)
      || (song.length >= 5 && g.includes(song));       // şarkı adını yazmak yeterli
    next(ok);
  }
  function skip() { if (!feed) next(false); }
  function onKey(e) { if (e.key === 'Enter') guess(); }

  const reward = rewardFor(score);
  function copyCode() {
    if (navigator.clipboard) navigator.clipboard.writeText(reward.code).catch(() => {});
    setCopied(true); timers.current.push(setTimeout(() => setCopied(false), 1800));
  }
  function reset() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setPhase('intro'); setIdx(0); setScore(0); setVal(''); setFeed(null); setCopied(false);
  }

  return (
    <div className="em-root">
      <div className="em-wrap">

        <div className="em-campaign">
          <div className="em-title">Şarkıyı Bul, İndirimini Kap!</div>
          <div className="em-pill">🎵 <b>%25'e varan kupon</b></div>
        </div>

        <div className="em-panel">
          {phase === 'intro' && (
            <div className="em-card">
              <div className="em-emoji">🎶</div>
              <div className="em-card-title">Şarkıyı Bul, İndirimini Kap!</div>
              <div className="em-tiers">
                <div className="em-tier"><b>1 doğru</b><span>%15 indirim</span></div>
                <div className="em-tier"><b>2 doğru</b><span>%20 indirim</span></div>
                <div className="em-tier hot"><b>3 doğru</b><span>%25 indirim</span></div>
              </div>
              <button className="em-btn" onClick={start}>Oyuna Başla</button>
            </div>
          )}

          {phase === 'play' && (
            <div className="em-game">
              <div className="em-hud">
                <span className="em-step">Soru {idx + 1}/{QUESTIONS.length}</span>
                <span className="em-score">Doğru: <b>{score}</b></span>
              </div>
              <div className="em-dots">
                {QUESTIONS.map((_, i) => <i key={i} className={'em-dot' + (i < idx ? ' done' : i === idx ? ' on' : '')} />)}
              </div>

              <div className="em-stage">
                {q.emojis.map((e, i) => <span key={i} className="em-big" style={{ animationDelay: (i * 90) + 'ms' }}>{e}</span>)}
              </div>

              {hint && <div className="em-hint">İpucu: {q.artist} · {q.song.length} harf · "{q.song[0]}" ile başlıyor</div>}

              <input ref={inputRef} className="em-input" value={val} disabled={!!feed}
                     onChange={e => setVal(e.target.value)} onKeyDown={onKey}
                     placeholder="Şarkı adını yazın..." />

              <button className="em-btn" onClick={guess} disabled={!!feed}>Tahmin Et</button>
              <div className="em-sub">
                <button className="em-link" onClick={() => setHint(true)} disabled={hint || !!feed}>İpucu ver</button>
                <button className="em-link" onClick={skip} disabled={!!feed}>Bilmiyorum, geç</button>
              </div>

              {feed && <div className={'em-feed' + (feed.ok ? ' ok' : ' no')}>{feed.text}</div>}
            </div>
          )}

          {phase === 'end' && (
            <div className="em-card">
              <button className="em-x" onClick={reset}>✕</button>
              <div className="em-emoji">{score >= 4 ? '🏆' : '🎉'}</div>
              <div className="em-card-title win">TEBRİKLER!</div>
              <p className="em-card-body"><b>{score}/{QUESTIONS.length}</b> doğru bildin ve <b>{reward.label}</b> kuponu kazandın!</p>
              <div className="em-coupon" onClick={copyCode}>
                <span className="em-code">{reward.code}</span>
                <span className="em-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
              </div>
              <div className="em-fine">⏳ Bugüne özel — kupon 24 saat geçerli.</div>
              <button className="em-btn" onClick={reset}>Kuponu Kullan, Alışverişe Başla</button>
              <button className="em-replay" onClick={start}>Tekrar oyna</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
