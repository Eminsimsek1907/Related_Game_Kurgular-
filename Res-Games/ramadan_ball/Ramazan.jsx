import React, { useState, useRef, useEffect } from 'react';
import './Ramazan.css';

/*
  ================================================================
  RAMAZAN TOPU — RMC Gamification  (REVİZE 2)
  ================================================================
  - TAM EKRAN: sabit dünya 1400x760 + tek scale(k) => MOBİL = PC.
  - HEDEFLER SABİT DEĞİL: iftar yemekleri ve bombalar sürekli
    DOĞAR (fade-in) → süzülür → KAYBOLUR (fade-out). Aynı anda
    en fazla 5 hedef havada durur.
  - YAVAŞ + UZUN MENZİL: G .22 / KDIV 11 / AIR .997 → ekranın en uzak
    köşesi (1360,250) bile 96–250px çekişle vurulur (tarandı).
  - Yemek +1, bomba −1. 6 atış hakkı.
  - Sahne: iftar akşamı. Cami yok. Ödül = kopyalanabilir kupon.
  ================================================================
*/

const W = 1400, H = 760;
const GROUND = 570;
const PIVOT = { x: 236, y: 543 };        // namlu dönme merkezi (dünya)
const START = { x: 339, y: 511 };        // namlu ağzı — gülle buradan çıkar
const BALL_R = 24;
const G = 0.22, AIR = 0.997, KDIV = 11, MAXPULL = 260;   // top %27 yavaş, menzil korundu
const HIT_R = 46;
const SHOTS = 6;

// hedef doğma alanı (tamamı ulaşılabilir — tarandı)
const ZONE = { x0: 640, x1: 1330, y0: 140, y1: 470 };
const SPAWN_MS = 850;
const MAX_LIVE = 5;
const LIFE_MIN = 3400, LIFE_MAX = 5200;
const FADE = 550;

const ART = {
  corba: (
    <svg viewBox="0 0 72 72" width="72" height="72"> <defs> <linearGradient id="rzCb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="55%" stopColor="#E3E8EE"/><stop offset="100%" stopColor="#AEB8C4"/></linearGradient> <linearGradient id="rzCs" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#F0A93C"/><stop offset="100%" stopColor="#D07A1E"/></linearGradient> </defs> <g opacity="0.5" fill="none" stroke="#FFF3D6" strokeWidth="2.6" strokeLinecap="round"> <path d="M27 20 C23 15, 31 13, 27 8"/><path d="M36 18 C32 12, 40 10, 36 5"/><path d="M45 20 C41 15, 49 13, 45 8"/></g> <ellipse cx="36" cy="40" rx="27" ry="7" fill="#C6511E"/> <path d="M9 40 C9 38, 63 38, 63 40 C63 54, 52 62, 36 62 C20 62, 9 54, 9 40 Z" fill="url(#rzCb)" stroke="#8C97A5" strokeWidth="1.6"/> <ellipse cx="36" cy="40" rx="25" ry="6.2" fill="url(#rzCs)"/> <ellipse cx="28" cy="39" rx="3.2" ry="1.6" fill="#E8583A"/><ellipse cx="43" cy="41" rx="2.6" ry="1.3" fill="#E8583A"/> <ellipse cx="36" cy="38" rx="2" ry="1" fill="#F7D08A"/> <path d="M13 46 C18 52, 54 52, 59 46" fill="none" stroke="#FFFFFF" strokeWidth="2" opacity="0.55"/> <ellipse cx="36" cy="64" rx="16" ry="3.4" fill="#96A2AF"/></svg>
  ),
  pide: (
    <svg viewBox="0 0 72 72" width="72" height="72"> <defs><radialGradient id="rzPd" cx="42%" cy="36%"><stop offset="0%" stopColor="#F6D9A0"/><stop offset="62%" stopColor="#DFAE63"/><stop offset="100%" stopColor="#B9822F"/></radialGradient></defs> <circle cx="36" cy="37" r="29" fill="#9C6B24"/> <circle cx="36" cy="35" r="29" fill="url(#rzPd)" stroke="#A97427" strokeWidth="1.4"/> <circle cx="36" cy="35" r="21" fill="none" stroke="#B98431" strokeWidth="2.6" opacity="0.75"/> <g stroke="#B07A2A" strokeWidth="2.2" strokeLinecap="round" opacity="0.8"> <path d="M25 24 L47 46"/><path d="M36 20 L36 50"/><path d="M47 24 L25 46"/></g> <g fill="#FBF0DA"><circle cx="22" cy="28" r="1.5"/><circle cx="50" cy="30" r="1.5"/><circle cx="30" cy="49" r="1.5"/> <circle cx="45" cy="47" r="1.5"/><circle cx="36" cy="15" r="1.5"/><circle cx="17" cy="40" r="1.5"/><circle cx="55" cy="41" r="1.5"/></g></svg>
  ),
  hurma: (
    <svg viewBox="0 0 72 72" width="72" height="72"> <defs> <linearGradient id="rzHd" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#A9642F"/><stop offset="52%" stopColor="#7A3F17"/><stop offset="100%" stopColor="#4E250C"/></linearGradient> <linearGradient id="rzHp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#C9D2DB"/></linearGradient> </defs> <ellipse cx="36" cy="52" rx="28" ry="8" fill="url(#rzHp)" stroke="#93A0AC" strokeWidth="1.4"/> <ellipse cx="36" cy="50" rx="22" ry="5.4" fill="#E7ECF1"/> <g stroke="#3A1B08" strokeWidth="1.2"> <ellipse cx="22" cy="41" rx="9" ry="12" fill="url(#rzHd)" transform="rotate(-16 22 41)"/> <ellipse cx="36" cy="37" rx="9" ry="12.5" fill="url(#rzHd)"/> <ellipse cx="50" cy="41" rx="9" ry="12" fill="url(#rzHd)" transform="rotate(16 50 41)"/></g> <g fill="#C98A50" opacity="0.6"> <ellipse cx="20" cy="36" rx="2.6" ry="4" transform="rotate(-16 20 36)"/> <ellipse cx="34" cy="31" rx="2.6" ry="4.2"/><ellipse cx="48" cy="36" rx="2.6" ry="4" transform="rotate(16 48 36)"/></g> <g fill="#5C7A3A"><ellipse cx="36" cy="24" rx="3.4" ry="1.7"/><rect x="35" y="21" width="2" height="4" rx="1"/></g></svg>
  ),
  kebap: (
    <svg viewBox="0 0 72 72" width="72" height="72"> <defs> <linearGradient id="rzKm" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#A9552E"/><stop offset="55%" stopColor="#7C3618"/><stop offset="100%" stopColor="#54200C"/></linearGradient> <linearGradient id="rzKs" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stopColor="#E8EDF2"/><stop offset="50%" stopColor="#AEB8C4"/><stop offset="100%" stopColor="#7E8894"/></linearGradient> </defs> <rect x="6" y="33" width="60" height="5" rx="2.5" fill="url(#rzKs)" transform="rotate(-14 36 36)"/> <polygon points="4,42 12,37 12,44" fill="#94A0AC" transform="rotate(-14 36 36)"/> <g stroke="#3E1608" strokeWidth="1.3"> <rect x="14" y="30" width="13" height="15" rx="4.5" fill="url(#rzKm)" transform="rotate(-14 20 37)"/> <rect x="44" y="24" width="13" height="15" rx="4.5" fill="url(#rzKm)" transform="rotate(-14 50 31)"/> <rect x="29" y="27" width="13" height="15" rx="4.5" fill="url(#rzKm)" transform="rotate(-14 35 34)"/></g> <g fill="#C97C4E" opacity="0.5"> <rect x="17" y="33" width="7" height="2" rx="1" transform="rotate(-14 20 34)"/> <rect x="32" y="30" width="7" height="2" rx="1" transform="rotate(-14 35 31)"/> <rect x="47" y="27" width="7" height="2" rx="1" transform="rotate(-14 50 28)"/></g> <g stroke="#2E5E30" strokeWidth="1.2"> <rect x="24" y="30" width="7" height="12" rx="3" fill="#4E9C4A" transform="rotate(-14 27 36)"/> <rect x="39" y="24" width="7" height="12" rx="3" fill="#4E9C4A" transform="rotate(-14 42 30)"/></g> <ellipse cx="36" cy="60" rx="18" ry="3.4" fill="#2A1508" opacity="0.35"/></svg>
  ),
  zeytin: (
    <svg viewBox="0 0 72 72" width="72" height="72"> <defs><linearGradient id="rzZp" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="100%" stopColor="#C9D2DB"/></linearGradient></defs> <ellipse cx="36" cy="46" rx="30" ry="12" fill="url(#rzZp)" stroke="#93A0AC" strokeWidth="1.5"/> <ellipse cx="36" cy="44" rx="24" ry="8.6" fill="#EDF1F5"/> <g stroke="#C9BE9A" strokeWidth="1.2"> <rect x="16" y="30" width="15" height="13" rx="2" fill="#FDFBF2"/> <rect x="20" y="26" width="15" height="13" rx="2" fill="#FFFFFF"/></g> <g fill="#E8E2CB" opacity="0.9"><circle cx="25" cy="31" r="1.4"/><circle cx="30" cy="35" r="1.2"/></g> <g stroke="#1F3D1B" strokeWidth="1.1"> <ellipse cx="44" cy="38" rx="6" ry="7.6" fill="#4A6B22"/> <ellipse cx="54" cy="42" rx="5.4" ry="6.8" fill="#2E2418"/> <ellipse cx="48" cy="47" rx="5.4" ry="6.8" fill="#6E8C2E"/></g> <g fill="#C0392B"><ellipse cx="44" cy="35" rx="1.8" ry="2.2"/></g> <path d="M40 22 C46 18, 54 20, 56 26" fill="none" stroke="#5C7A3A" strokeWidth="1.6"/> <ellipse cx="47" cy="21" rx="4.4" ry="2.2" fill="#6E9440" transform="rotate(-18 47 21)"/></svg>
  ),
  tatli: (
    <svg viewBox="0 0 72 72" width="72" height="72"> <defs> <linearGradient id="rzTb" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFFFFF"/><stop offset="60%" stopColor="#E6ECF2"/><stop offset="100%" stopColor="#B4BEC9"/></linearGradient> <linearGradient id="rzTc" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#FFF9EC"/><stop offset="100%" stopColor="#F0E0BE"/></linearGradient> </defs> <path d="M11 34 C11 32, 61 32, 61 34 C61 50, 51 60, 36 60 C21 60, 11 50, 11 34 Z" fill="url(#rzTb)" stroke="#8C97A5" strokeWidth="1.6"/> <ellipse cx="36" cy="34" rx="25" ry="6" fill="url(#rzTc)"/> <path d="M13 40 C20 47, 52 47, 59 40 C57 51, 48 58, 36 58 C24 58, 15 51, 13 40 Z" fill="#FFFDF6" opacity="0.55"/> <g fill="#D6255C"><circle cx="27" cy="33" r="2.4"/><circle cx="36" cy="31" r="2.6"/><circle cx="45" cy="34" r="2.3"/><circle cx="32" cy="36" r="2"/><circle cx="41" cy="36" r="2"/></g> <g fill="#FF6F91" opacity="0.7"><circle cx="26" cy="32" r="0.9"/><circle cx="35" cy="30" r="0.9"/><circle cx="44" cy="33" r="0.9"/></g> <g fill="#3E7B2E"><ellipse cx="50" cy="30" rx="3" ry="1.5" transform="rotate(-20 50 30)"/></g> <ellipse cx="36" cy="62" rx="17" ry="3.4" fill="#96A2AF"/></svg>
  ),
  bomba: (
    <svg viewBox="0 0 72 72" width="72" height="72"> <defs> <radialGradient id="rzBb" cx="36%" cy="32%"><stop offset="0%" stopColor="#6B7785"/><stop offset="46%" stopColor="#333C46"/><stop offset="100%" stopColor="#12181D"/></radialGradient> <radialGradient id="rzBs" cx="50%" cy="50%"><stop offset="0%" stopColor="#FFF6D0"/><stop offset="45%" stopColor="#FFC24A"/><stop offset="100%" stopColor="#F2681E"/></radialGradient> </defs> <circle cx="34" cy="44" r="23" fill="url(#rzBb)"/> <ellipse cx="26" cy="35" rx="6" ry="4" fill="#8B96A3" opacity="0.45" transform="rotate(-28 26 35)"/> <rect x="40" y="16" width="9" height="9" rx="2" fill="#4E5B67" stroke="#0E1319" strokeWidth="1.4" transform="rotate(28 44 20)"/> <path d="M48 17 C56 12, 54 6, 60 5" fill="none" stroke="#8A6A3C" strokeWidth="3" strokeLinecap="round"/> <circle cx="61" cy="5" r="6" fill="url(#rzBs)"/> <g stroke="#FFD98A" strokeWidth="1.6" strokeLinecap="round"> <path d="M61 -3 L61 -6"/><path d="M68 5 L71 5"/><path d="M66 0 L69 -3"/><path d="M66 10 L69 13"/></g></svg>
  ),
};

const FOODS = [
  { k: 'corba', n: 'Çorba' }, { k: 'pide', n: 'Pide' }, { k: 'hurma', n: 'Hurma' },
  { k: 'kebap', n: 'Kebap' }, { k: 'zeytin', n: 'Kahvaltılık' }, { k: 'tatli', n: 'Tatlı' },
];

const TIERS = [
  { need: 5, label: '%25 İndirim', code: 'RAMAZAN25' },
  { need: 4, label: '%20 İndirim', code: 'RAMAZAN20' },
  { need: 2, label: '%15 İndirim', code: 'RAMAZAN15' },
  { need: 0, label: '%10 İndirim', code: 'RAMAZAN10' },
];
const rewardFor = (n) => TIERS.find(t => n >= t.need);

const STARS = Array.from({ length: 42 }, (_, i) => ({
  x: (i * 163) % 1360 + 20, y: (i * 71) % 280 + 16, s: 1 + (i % 3), d: (i % 7) * 0.4,
}));
const ROOFS = [
  { x: 0, w: 150, h: 78 }, { x: 148, w: 112, h: 52 }, { x: 256, w: 168, h: 96 },
  { x: 420, w: 124, h: 60 }, { x: 540, w: 158, h: 86 }, { x: 694, w: 116, h: 54 },
  { x: 806, w: 180, h: 104 }, { x: 982, w: 132, h: 66 }, { x: 1110, w: 158, h: 88 },
  { x: 1264, w: 140, h: 60 },
];
const SPOKES = [0, 30, 60, 90, 120, 150];
const SPOKES_S = [0, 45, 90, 135];

export default function Ramazan() {
  const [phase, setPhase] = useState('intro');
  const [scale, setScale] = useState(1);
  const [ball, setBall] = useState({ ...START });
  const [flying, setFlying] = useState(false);
  const [pull, setPull] = useState(null);
  const [shots, setShots] = useState(SHOTS);
  const [targets, setTargets] = useState([]);
  const [foodHit, setFoodHit] = useState(0);
  const [bombHit, setBombHit] = useState(0);
  const [boom, setBoom] = useState(null);
  const [toast, setToast] = useState(null);
  const [, setTick] = useState(0);
  const [copied, setCopied] = useState(false);

  const arenaRef = useRef(null);
  const raf = useRef(null);
  const spawnRaf = useRef(null);
  const timers = useRef([]);
  const vel = useRef({ x: 0, y: 0 });
  const pos = useRef({ ...START });
  const flyRef = useRef(false);
  const dragRef = useRef(false);
  const pullRef = useRef(null);
  const shotsRef = useRef(SHOTS);
  const tgRef = useRef([]);
  const foodRef = useRef(0);
  const bombRef = useRef(0);
  const idRef = useRef(1);
  const lastSpawn = useRef(0);
  const playing = useRef(false);

  useEffect(() => () => {
    cancelAnimationFrame(raf.current); cancelAnimationFrame(spawnRaf.current);
    timers.current.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const m = () => { const el = arenaRef.current; if (!el) return; setScale(el.getBoundingClientRect().width / W); };
    m(); window.addEventListener('resize', m); return () => window.removeEventListener('resize', m);
  }, [phase]);

  // ---- HEDEF DÖNGÜSÜ: doğ → süzül → kaybol
  function makeTarget() {
    const bomb = Math.random() < 0.34;
    const f = FOODS[Math.floor(Math.random() * FOODS.length)];
    return {
      id: idRef.current++,
      bomb,
      k: bomb ? 'bomba' : f.k,
      n: bomb ? '−1' : f.n,
      x: ZONE.x0 + Math.random() * (ZONE.x1 - ZONE.x0),
      y: ZONE.y0 + Math.random() * (ZONE.y1 - ZONE.y0),
      vx: (Math.random() - 0.5) * 0.34,
      vy: (Math.random() - 0.5) * 0.24,
      born: Date.now(),
      life: LIFE_MIN + Math.random() * (LIFE_MAX - LIFE_MIN),
      ph: Math.random() * 6.28,
    };
  }

  function targetLoop() {
    if (!playing.current) return;
    const now = Date.now();

    if (now - lastSpawn.current > SPAWN_MS && tgRef.current.length < MAX_LIVE) {
      lastSpawn.current = now;
      tgRef.current = [...tgRef.current, makeTarget()];
    }

    tgRef.current = tgRef.current
      .map(t => ({
        ...t,
        x: t.x + t.vx,
        y: t.y + t.vy + Math.sin((now - t.born) / 420 + t.ph) * 0.16,
      }))
      .filter(t => now - t.born < t.life && t.x > 560 && t.x < W - 40);

    setTargets(tgRef.current.map(t => {
      const age = now - t.born;
      const op = age < FADE ? age / FADE
        : age > t.life - FADE ? Math.max(0, (t.life - age) / FADE) : 1;
      return { ...t, op };
    }));

    spawnRaf.current = requestAnimationFrame(targetLoop);
  }

  function start() {
    cancelAnimationFrame(raf.current); cancelAnimationFrame(spawnRaf.current);
    timers.current.forEach(clearTimeout); timers.current = [];
    pos.current = { ...START }; vel.current = { x: 0, y: 0 };
    flyRef.current = false; dragRef.current = false; pullRef.current = null;
    shotsRef.current = SHOTS; foodRef.current = 0; bombRef.current = 0;
    tgRef.current = []; lastSpawn.current = 0; playing.current = true;
    setBall({ ...START }); setFlying(false); setPull(null); setShots(SHOTS);
    setTargets([]); setFoodHit(0); setBombHit(0); setBoom(null); setToast(null); setCopied(false);
    setPhase('play');
    spawnRaf.current = requestAnimationFrame(targetLoop);
  }

  function toWorld(e) {
    const r = arenaRef.current.getBoundingClientRect();
    return { x: (e.clientX - r.left) / scale, y: (e.clientY - r.top) / scale };
  }

  function onDown(e) {
    if (phase !== 'play' || flyRef.current || shotsRef.current <= 0) return;
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {}
    dragRef.current = true;
    pullRef.current = { dx: 0, dy: 0 };
    setPull({ dx: 0, dy: 0 });
  }
  function onMove(e) {
    if (!dragRef.current) return;
    const w = toWorld(e);
    let dx = START.x - w.x, dy = START.y - w.y;
    const len = Math.hypot(dx, dy);
    if (len > MAXPULL) { dx = (dx / len) * MAXPULL; dy = (dy / len) * MAXPULL; }
    pullRef.current = { dx, dy };
    setPull({ dx, dy });
  }
  function onUp() {
    if (!dragRef.current) return;
    dragRef.current = false;
    const p = pullRef.current;
    pullRef.current = null;
    setPull(null);
    if (!p || Math.hypot(p.dx, p.dy) < 26) return;
    fire(p);
  }

  function fire(p) {
    flyRef.current = true; setFlying(true);
    vel.current = { x: p.dx / KDIV, y: p.dy / KDIV };
    pos.current = { ...START };
    shotsRef.current -= 1; setShots(shotsRef.current);
    raf.current = requestAnimationFrame(step);
  }

  function step() {
    vel.current.y += G;
    vel.current.x *= AIR; vel.current.y *= AIR;
    pos.current.x += vel.current.x;
    pos.current.y += vel.current.y;
    setBall({ ...pos.current });

    for (const t of tgRef.current) {
      if (Math.hypot(pos.current.x - t.x, pos.current.y - t.y) < HIT_R + BALL_R * 0.4) {
        tgRef.current = tgRef.current.filter(q => q.id !== t.id);
        if (t.bomb) {
          bombRef.current += 1; setBombHit(bombRef.current);
          setToast('💥 BOMBA! · −1');
        } else {
          foodRef.current += 1; setFoodHit(foodRef.current);
          setToast(`🍽️ ${t.n} · +1`);
        }
        setBoom({ x: t.x, y: t.y, bad: t.bomb });
        timers.current.push(setTimeout(() => setToast(null), 1000));
        timers.current.push(setTimeout(() => setBoom(null), 520));
        return endShot();
      }
    }

    if (pos.current.y > GROUND - BALL_R * 0.5 || pos.current.x > W + 80 || pos.current.x < -80) return endShot();
    raf.current = requestAnimationFrame(step);
  }

  function endShot() {
    cancelAnimationFrame(raf.current);
    flyRef.current = false;
    timers.current.push(setTimeout(() => {
      pos.current = { ...START }; vel.current = { x: 0, y: 0 };
      setBall({ ...START }); setFlying(false);
      if (shotsRef.current <= 0) {
        playing.current = false;
        cancelAnimationFrame(spawnRaf.current);
        timers.current.push(setTimeout(() => setPhase('end'), 450));
      }
    }, 520));
  }

  useEffect(() => {
    const el = arenaRef.current; if (!el || phase !== 'play') return;
    const stop = (e) => e.preventDefault();
    el.addEventListener('touchstart', stop, { passive: false });
    el.addEventListener('touchmove', stop, { passive: false });
    return () => { el.removeEventListener('touchstart', stop); el.removeEventListener('touchmove', stop); };
  }, [phase]);

  const aim = pull && Math.hypot(pull.dx, pull.dy) > 8 ? Math.atan2(pull.dy, pull.dx) : -0.30;
  const aimDeg = (aim * 180) / Math.PI;

  const preview = [];
  if (pull && Math.hypot(pull.dx, pull.dy) > 26) {
    let vx = pull.dx / KDIV, vy = pull.dy / KDIV, x = START.x, y = START.y;
    for (let i = 0; i < 90; i++) {
      vy += G; vx *= AIR; vy *= AIR; x += vx; y += vy;
      if (y > GROUND || x > W) break;
      if (i % 5 === 0) preview.push({ x, y });
    }
  }

  const score = Math.max(0, foodHit - bombHit);
  const reward = rewardFor(score);
  const power = pull ? Math.min(100, Math.round((Math.hypot(pull.dx, pull.dy) / MAXPULL) * 100)) : 0;

  function copyCode() {
    if (navigator.clipboard) navigator.clipboard.writeText(reward.code).catch(() => {});
    setCopied(true); timers.current.push(setTimeout(() => setCopied(false), 1800));
  }
  function reset() {
    cancelAnimationFrame(raf.current); cancelAnimationFrame(spawnRaf.current);
    timers.current.forEach(clearTimeout); timers.current = [];
    playing.current = false;
    setPhase('intro'); setShots(SHOTS); shotsRef.current = SHOTS;
    setFoodHit(0); setBombHit(0); foodRef.current = 0; bombRef.current = 0;
    setTargets([]); tgRef.current = [];
    setBall({ ...START }); setFlying(false); setPull(null); setCopied(false); setToast(null); setBoom(null);
  }

  return (
    <div className="rz-root">
      <div className="rz-wrap">

        <div className="rz-campaign">
          <div className="rz-title">Topu Ateşle, İftarını Kap!</div>
          <div className="rz-pill">🌙 <b>%25'e varan kupon</b></div>
        </div>

        <div className="rz-box">
          <div className="rz-arena" ref={arenaRef}
               onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
            <div className="rz-stage" style={{ width: W, height: H, transform: `scale(${scale})` }}>

              <div className="rz-sky" />
              <div className="rz-dusk" />
              {STARS.map((s, i) => (
                <i key={i} className="rz-star" style={{ left: s.x, top: s.y, width: s.s, height: s.s, animationDelay: s.d + 's' }} />
              ))}

              <svg className="rz-moon" viewBox="0 0 100 100" width="120" height="120">
                <defs>
                  <radialGradient id="rzMoon" cx="38%" cy="34%">
                    <stop offset="0%" stopColor="#FFF6DC" /><stop offset="60%" stopColor="#FFD97A" />
                    <stop offset="100%" stopColor="#EFB645" />
                  </radialGradient>
                  <mask id="rzCut">
                    <rect x="0" y="0" width="100" height="100" fill="#fff" />
                    <circle cx="62" cy="40" r="38" fill="#000" />
                  </mask>
                </defs>
                <circle cx="48" cy="50" r="42" fill="url(#rzMoon)" mask="url(#rzCut)" />
              </svg>

              <div className="rz-roofs">
                {ROOFS.map((r, i) => (
                  <div key={i} className="rz-roof" style={{ left: r.x, width: r.w, height: r.h }}>
                    <i style={{ left: '24%' }} /><i style={{ left: '60%' }} />
                  </div>
                ))}
              </div>

              <div className="rz-ground" style={{ top: GROUND }}>
                <div className="rz-rim" />
                <div className="rz-soil" />
              </div>

              {/* HEDEFLER — doğar, süzülür, kaybolur */}
              {targets.map(t => (
                <div key={t.id} className={'rz-target' + (t.bomb ? ' bomb' : ' food')}
                     style={{ left: t.x - 44, top: t.y - 44, opacity: t.op }}>
                  <span className="rz-art">{ART[t.k]}</span>
                  <em>{t.n}</em>
                </div>
              ))}

              {/* TOP ARABASI — 1.35x, namlu nişan yönüne döner */}
              <svg className="rz-cannon" viewBox="0 0 1400 760" width={W} height={H}>
                <defs>
                  <linearGradient id="rzBarrel" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#788594" /><stop offset="35%" stopColor="#3C4954" />
                    <stop offset="72%" stopColor="#222B33" /><stop offset="100%" stopColor="#12181D" />
                  </linearGradient>
                  <linearGradient id="rzWood" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#A9713C" /><stop offset="55%" stopColor="#7E4E24" />
                    <stop offset="100%" stopColor="#5A3617" />
                  </linearGradient>
                </defs>

                <g transform="translate(-28.6, -67.3) scale(1.35)">
                  <polygon points="126,470 248,446 252,464 138,482" fill="url(#rzWood)" stroke="#3E2410" strokeWidth="2.5" />
                  <polygon points="176,454 238,443 241,455 181,466" fill="#B07C46" opacity="0.55" />

                  <g>
                    <circle cx="150" cy="468" r="17" fill="#8B5A2B" stroke="#3E2410" strokeWidth="3" />
                    {SPOKES_S.map(a => (
                      <line key={a} x1={150 - 14 * Math.cos(a * Math.PI / 180)} y1={468 - 14 * Math.sin(a * Math.PI / 180)}
                            x2={150 + 14 * Math.cos(a * Math.PI / 180)} y2={468 + 14 * Math.sin(a * Math.PI / 180)}
                            stroke="#5A3617" strokeWidth="2.5" />
                    ))}
                    <circle cx="150" cy="468" r="5.5" fill="#3E2410" />
                  </g>

                  <g transform={`rotate(${aimDeg} 196 452)`}>
                    <rect x="182" y="437" width="90" height="30" rx="9" fill="url(#rzBarrel)" stroke="#0E1319" strokeWidth="2" />
                    <rect x="264" y="434" width="12" height="36" rx="4" fill="#4E5B67" stroke="#0E1319" strokeWidth="2" />
                    <rect x="212" y="440" width="46" height="6" rx="3" fill="#9AA7B4" opacity="0.45" />
                    <circle cx="184" cy="452" r="13" fill="#33404B" stroke="#0E1319" strokeWidth="2" />
                    <circle cx="172" cy="452" r="6" fill="#222C35" stroke="#0E1319" strokeWidth="1.5" />
                  </g>

                  <g>
                    <circle cx="214" cy="452" r="26" fill="#8B5A2B" stroke="#3E2410" strokeWidth="4" />
                    <circle cx="214" cy="452" r="19" fill="none" stroke="#5A3617" strokeWidth="2" />
                    {SPOKES.map(a => (
                      <line key={a} x1={214 - 22 * Math.cos(a * Math.PI / 180)} y1={452 - 22 * Math.sin(a * Math.PI / 180)}
                            x2={214 + 22 * Math.cos(a * Math.PI / 180)} y2={452 + 22 * Math.sin(a * Math.PI / 180)}
                            stroke="#5A3617" strokeWidth="3" />
                    ))}
                    <circle cx="214" cy="452" r="7" fill="#3E2410" />
                  </g>
                </g>

                {preview.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r="4" fill="#FFD98A" opacity={Math.max(0.08, 0.75 - i * 0.04)} />
                ))}
                {pull && Math.hypot(pull.dx, pull.dy) > 8 && (
                  <line x1={START.x} y1={START.y} x2={START.x - pull.dx} y2={START.y - pull.dy}
                        stroke="#FFD98A" strokeWidth="3" strokeDasharray="8 6" opacity="0.6" />
                )}
              </svg>

              <div className="rz-ball" style={{ left: ball.x - BALL_R, top: ball.y - BALL_R, width: BALL_R * 2, height: BALL_R * 2 }} />

              {boom && <div className={'rz-boom' + (boom.bad ? ' bad' : '')} style={{ left: boom.x - 50, top: boom.y - 50 }}>{boom.bad ? '💥' : '✨'}</div>}
            </div>

            <div className="rz-hud">
              <div className="rz-stat"><b className={shots <= 1 ? 'low' : ''}>{shots}</b><span>ATIŞ</span></div>
              <div className="rz-score">
                🍲 <b>{foodHit}</b>
                {bombHit > 0 && <i> · 💣 −{bombHit}</i>}
              </div>
              <div className="rz-power">{pull ? `Güç %${power}` : 'Nişan al'}</div>
            </div>

            {toast && <div className={'rz-toast' + (toast.includes('BOMBA') ? ' bad' : '')}>{toast}</div>}

            {phase === 'play' && !flying && shots === SHOTS && !pull && <div className="rz-drag">⟵ topu geri çek</div>}
            {phase === 'play' && !flying && <div className="rz-hint">Topu geri çek ve bırak · yemekler kaybolmadan vur</div>}
          </div>

          {phase === 'intro' && (
            <div className="rz-overlay">
              <div className="rz-modal">
                <div className="rz-emoji">🌙</div>
                <div className="rz-modal-title">Topu Ateşle, İftarını Kap!</div>
                <p className="rz-modal-body">İftar yemekleri havada belirip <b>kayboluyor</b>. Ramazan topunu geri çek, bırak ve kaybolmadan vur. Bombalara çarpma — <b>%25'e varan</b> kupon seni bekliyor.</p>
                <div className="rz-tiers">
                  <div className="rz-tier"><b>2 yemek</b><span>%15</span></div>
                  <div className="rz-tier"><b>4 yemek</b><span>%20</span></div>
                  <div className="rz-tier hot"><b>5 yemek</b><span>%25</span></div>
                </div>
                <button className="rz-btn" onClick={start}>Oyuna Başla</button>
              </div>
            </div>
          )}

          {phase === 'end' && (
            <div className="rz-overlay">
              <div className="rz-modal">
                <button className="rz-x" onClick={reset}>✕</button>
                <div className="rz-emoji">{score >= 5 ? '🏆' : '🎉'}</div>
                <div className="rz-modal-title win">TEBRİKLER!</div>
                <p className="rz-modal-body">
                  <b>{foodHit}</b> iftar yemeği vurdun{bombHit > 0 ? <>, <b>{bombHit}</b> bombaya çarptın</> : null} ve <b>{reward.label}</b> kuponu kazandın!
                </p>
                <div className="rz-coupon" onClick={copyCode}>
                  <span className="rz-code">{reward.code}</span>
                  <span className="rz-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
                </div>
                <div className="rz-fine">⏳ Bugüne özel — kupon 24 saat geçerli.</div>
                <button className="rz-btn" onClick={reset}>Kuponu Kullan, Alışverişe Başla</button>
                <button className="rz-replay" onClick={start}>Tekrar oyna</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
