import React, { useState, useRef, useEffect } from 'react';
import './Perfume.css';

/*
  ================================================================
  PARFÜMÜNÜ TASARLA — RMC Gamification
  ================================================================
  AKIŞ: Cinsiyet → Üst Nota → Orta Nota → Alt Nota → Koku Grubu →
        Yoğunluk → Kalıcılık & Yayılım (Sillage) → ANALİZ → Öneri + Kupon
  - Ödül = kopyalanabilir kupon. Mail/opt-in formu yok.
  - Marka KURGUSAL (ATELIER RD) — gerçek SKU'lara geçerken isimler değişir.
  ================================================================
*/

const HOUSE = 'ATELIER RD';

const GENDERS = [
  { id: 'k', n: 'Kadın', e: '👗', d: 'Kadın koleksiyonu' },
  { id: 'e', n: 'Erkek', e: '👔', d: 'Erkek koleksiyonu' },
];

const NOTES = {
  ust: {
    k: [
      { id: 'bergamot', n: 'Bergamot', f: 'Narenciye', d: 'Işıltılı, temiz, canlı — güne taze başlayan.', c: '#F2C94C' },
      { id: 'mandalina', n: 'Mandalina', f: 'Narenciye', d: 'Tatlı-ekşi, neşeli, genç bir açılış.', c: '#F2994A' },
      { id: 'frezya', n: 'Frezya', f: 'Çiçeksi', d: 'Hafif, pudramsı, zarif bir ilk izlenim.', c: '#F2A0C0' },
      { id: 'armut', n: 'Armut', f: 'Gurme', d: 'Sulu, yumuşak, modern ve iştah açıcı.', c: '#BFD96B' },
      { id: 'pembe-biber', n: 'Pembe Biber', f: 'Amber', d: 'Kıvılcımlı, hafif acı, iddialı.', c: '#F2557E' },
    ],
    e: [
      { id: 'greyfurt', n: 'Greyfurt', f: 'Narenciye', d: 'Buruk, keskin, sportif — uyandıran.', c: '#F2994A' },
      { id: 'bergamot', n: 'Bergamot', f: 'Narenciye', d: 'Temiz, klasik, her yere yakışan.', c: '#F2C94C' },
      { id: 'lavanta', n: 'Lavanta', f: 'Odunsu', d: 'Sakin, aromatik — kendinden emin.', c: '#9B6BFF' },
      { id: 'nane', n: 'Nane', f: 'Narenciye', d: 'Serin, ferah, soğukkanlı.', c: '#4FC27C' },
      { id: 'karabiber', n: 'Karabiber', f: 'Deri', d: 'Sıcak, sert, dikkat çeken bir giriş.', c: '#5D4037' },
    ],
  },
  orta: {
    k: [
      { id: 'gul', n: 'Gül', f: 'Çiçeksi', d: 'Klasik, kadınsı, zamansız bir kalp.', c: '#E23A5E' },
      { id: 'yasemin', n: 'Yasemin', f: 'Çiçeksi', d: 'Yoğun, baş döndürücü, akşam çiçeği.', c: '#F7F3E8' },
      { id: 'sumbul', n: 'Sümbül', f: 'Odunsu', d: 'Yeşil-çiçeksi, ferah, bahar sabahı.', c: '#8FBF6B' },
      { id: 'kakule', n: 'Kakule', f: 'Amber', d: 'Egzotik, tatlı-baharatlı, çekici.', c: '#C98A47' },
      { id: 'sardunya', n: 'Sardunya', f: 'Çiçeksi', d: 'Çiçeksi ama yeşil, ferah bir denge.', c: '#EB5757' },
    ],
    e: [
      { id: 'vetiver', n: 'Vetiver', f: 'Odunsu', d: 'Topraksı, köksü, maskülen bir derinlik.', c: '#6E8C2E' },
      { id: 'karabiber', n: 'Karabiber', f: 'Deri', d: 'Sıcak, baharatlı, keskin bir karakter.', c: '#5D4037' },
      { id: 'kakule', n: 'Kakule', f: 'Amber', d: 'Egzotik, hafif tatlı-baharatlı.', c: '#C98A47' },
      { id: 'adacayi', n: 'Adaçayı', f: 'Odunsu', d: 'Bitkisel, modern berber tazeliği.', c: '#4E9C4A' },
      { id: 'sardunya', n: 'Sardunya', f: 'Çiçeksi', d: 'Yeşil çiçeksi, ferah ve maskülen.', c: '#EB5757' },
    ],
  },
  alt: {
    k: [
      { id: 'misk', n: 'Misk', f: 'Amber', d: 'Pudramsı, tenimsi, sarmalayan sıcaklık.', c: '#D9C7A3' },
      { id: 'vanilya', n: 'Vanilya', f: 'Gurme', d: 'Tatlı, yumuşak, bağımlılık yapan.', c: '#EBD9A8' },
      { id: 'amber', n: 'Amber', f: 'Amber', d: 'Reçineli, akşam davetine yakışan.', c: '#E8A33D' },
      { id: 'sandal', n: 'Sandal Ağacı', f: 'Odunsu', d: 'Kremsi odun, sakin bir asalet.', c: '#B08968' },
      { id: 'paculi', n: 'Paçuli', f: 'Odunsu', d: 'Topraksı, koyu, gizemli bir iz.', c: '#6B4A2C' },
    ],
    e: [
      { id: 'sedir', n: 'Sedir', f: 'Odunsu', d: 'Kuru odun, kalem talaşı, sakin asalet.', c: '#8B5A2B' },
      { id: 'deri', n: 'Deri', f: 'Deri', d: 'Ham deri, is, cesur bir imza.', c: '#4E342E' },
      { id: 'amber', n: 'Amber', f: 'Amber', d: 'Reçineli, sıcak, akşam kokusu.', c: '#E8A33D' },
      { id: 'tonka', n: 'Tonka', f: 'Gurme', d: 'Vanilya-badem, tatlımsı, sarıcı.', c: '#A1887F' },
      { id: 'misk', n: 'Misk', f: 'Amber', d: 'Pudramsı, tenimsi, temiz bir iz.', c: '#D9C7A3' },
    ],
  },
};

const FAMILY = [
  { id: 'ferah', n: 'Ferah & Narenciye', f: 'Narenciye', d: 'Temizlik, enerji, gündüz.', e: '🍋' },
  { id: 'ciceksi', n: 'Çiçeksi', f: 'Çiçeksi', d: 'Zarafet, romantizm, denge.', e: '🌸' },
  { id: 'odunsu', n: 'Odunsu & Topraksı', f: 'Odunsu', d: 'Derinlik, sakinlik, güven.', e: '🌿' },
  { id: 'oryantal', n: 'Oryantal & Amber', f: 'Amber', d: 'Sıcaklık, gizem, akşam.', e: '🔥' },
  { id: 'gurme', n: 'Gurme & Tatlı', f: 'Gurme', d: 'Şımartıcı, yakın, bağımlılık yapan.', e: '🍯' },
];

const INTENSITY = [
  { id: 'edt', n: 'Eau de Toilette', d: 'Hafif ve ferah. Gündüz, ofis, spor.', pct: '%8–12 esans', e: '💧' },
  { id: 'edp', n: 'Eau de Parfum', d: 'Dengeli ve dolu. Her yere, her saate.', pct: '%15–20 esans', e: '💎' },
  { id: 'extrait', n: 'Extrait de Parfum', d: 'Yoğun ve derin. Gece, davet, imza.', pct: '%20–30 esans', e: '👑' },
];

const SILLAGE = [
  { id: 'yakin', n: 'Yakın & Kişisel', d: 'Sadece yaklaşanlar duysun. Ten kokusu gibi.', e: '🤍' },
  { id: 'dengeli', n: 'Dengeli İz', d: 'Bir kol mesafesi. Fark edilir ama bunaltmaz.', e: '🌬️' },
  { id: 'guclu', n: 'Güçlü & Kalıcı', d: 'Odaya sen girmeden kokun girsin.', e: '💥' },
];

const SCENTS = [
  { id: 'lumen', n: 'LUMEN No.5', fam: 'Narenciye', g: 'k', tag: 'Narenciye · Ferah',
    pers: 'Taze, hızlı, hafif. Enerjin senden önce giriyor içeri.',
    e: '💧', c1: '#1E6FB8', c2: '#7FD0F5', near: ['AQUA No.8', 'CITRON No.2', 'BREEZE No.1'] },
  { id: 'fleur', n: 'FLEUR No.9', fam: 'Çiçeksi', g: 'k', tag: 'Çiçeksi · Zarif',
    pers: 'Zarif ve dengeli. Klasiği modern taşıyorsun.',
    e: '🌸', c1: '#8E2A55', c2: '#F2A0C0', near: ['ROSE No.1', 'JARDIN No.4', 'BLANCHE'] },
  { id: 'silva', n: 'SILVA No.2', fam: 'Odunsu', g: 'k', tag: 'Odunsu · Sakin',
    pers: 'Sakin ama iz bırakan. Bağırmadan fark ediliyorsun.',
    e: '🌿', c1: '#3E5B2E', c2: '#8FAF62', near: ['ROOT No.9', 'ATLAS No.4', 'TERRE No.7'] },
  { id: 'ambre', n: 'AMBRE No.3', fam: 'Amber', g: 'k', tag: 'Amber · Sıcak',
    pers: 'Sıcak, sarmalayan, akşam insanı. Yakın durmak isteniyor.',
    e: '🔥', c1: '#7A4A12', c2: '#F0B455', near: ['ORIENT No.7', 'ROYAL', 'VELVET No.2'] },
  { id: 'sucre', n: 'SUCRE No.6', fam: 'Gurme', g: 'k', tag: 'Gurme · Tatlı',
    pers: 'Şımartıcı ve yakın. Kokun bir davet gibi.',
    e: '🍯', c1: '#8A4A2E', c2: '#E8B07A', near: ['VANILLE No.4', 'CARAMEL', 'GOURMAND No.1'] },

  { id: 'aqua', n: 'AQUA No.8', fam: 'Narenciye', g: 'e', tag: 'Narenciye · Sportif',
    pers: 'Temiz, dinamik, güne hazır. Sade ama net.',
    e: '💧', c1: '#12456E', c2: '#5FB0DC', near: ['LUMEN No.5', 'MARINE No.3', 'CITRON No.2'] },
  { id: 'terre', n: 'TERRE No.7', fam: 'Odunsu', g: 'e', tag: 'Odunsu · Topraksı',
    pers: 'Sakin ama iz bırakan. Bağırmadan fark ediliyorsun.',
    e: '🌿', c1: '#3E5B2E', c2: '#8FAF62', near: ['SILVA No.2', 'ROOT No.9', 'ATLAS No.4'] },
  { id: 'noir', n: 'NOIR No.1', fam: 'Deri', g: 'e', tag: 'Deri · Baharatlı',
    pers: 'Girdiğin odanın ısısını değiştiriyorsun. Cesur ve net.',
    e: '🖤', c1: '#3A1F1B', c2: '#B0553E', near: ['CUIR No.6', 'EMBER No.3', 'NOIR INTENSE'] },
  { id: 'orient', n: 'ORIENT No.7', fam: 'Amber', g: 'e', tag: 'Amber · Oryantal',
    pers: 'Sıcak, derin, akşam adamı. Kokun hikâye anlatıyor.',
    e: '🔥', c1: '#6B3A0E', c2: '#E8A33D', near: ['AMBRE No.3', 'ROYAL', 'SPICE No.5'] },
  { id: 'tonka', n: 'TONKA No.4', fam: 'Gurme', g: 'e', tag: 'Gurme · Sıcak',
    pers: 'Yumuşak ve sarıcı. Sert değil, yakın.',
    e: '🍯', c1: '#5C3A1E', c2: '#C9976B', near: ['SUCRE No.6', 'VANILLE No.4', 'AMBRE No.3'] },
];

const CODE = 'PARFUM25';

const LINES = [
  'Notaların ayrıştırılıyor…',
  'Koku ailesi eşleştiriliyor…',
  'Yoğunluk ve sillage hesaplanıyor…',
  'Koleksiyondaki en yakın parfüm bulunuyor…',
];

export default function Perfume() {
  const [phase, setPhase] = useState('intro');   // intro | gender | q | analiz | end
  const [gender, setGender] = useState(null);
  const [step, setStep] = useState(0);
  const [ans, setAns] = useState({});
  const [copied, setCopied] = useState(false);
  const [prog, setProg] = useState(0);
  const [line, setLine] = useState(0);

  const timers = useRef([]);
  const iv = useRef(null);
  useEffect(() => () => { timers.current.forEach(clearTimeout); clearInterval(iv.current); }, []);

  const Q = gender ? [
    { key: 'ust', tag: 'ÜST NOTA', h: 'İlk İzlenim',
      s: 'Şişeyi açtığın an burnuna çarpan, ilk 15 dakikada seni tanıtan koku.', opts: NOTES.ust[gender], kind: 'note' },
    { key: 'orta', tag: 'ORTA NOTA', h: 'Kalp',
      s: 'Parfümün asıl karakteri. Üst nota uçtuktan sonra saatlerce seninle kalan.', opts: NOTES.orta[gender], kind: 'note' },
    { key: 'alt', tag: 'ALT NOTA', h: 'İz',
      s: 'Sen gittikten sonra odada kalan. Parfümün hafızası.', opts: NOTES.alt[gender], kind: 'note' },
    { key: 'aile', tag: 'KOKU GRUBU', h: 'Ruhunuzun kokusu hangi grupta?',
      s: 'Notaları bir kenara bırak — hangi dünyada yaşamak istersin?', opts: FAMILY, kind: 'icon' },
    { key: 'yogunluk', tag: 'YOĞUNLUK', h: 'Yoğunluk Tercihiniz',
      s: 'Esans oranı parfümün gücünü, kalıcılığını ve fiyatını belirler.', opts: INTENSITY, kind: 'plain' },
    { key: 'sillage', tag: 'SILLAGE', h: 'Kalıcılık & Yayılım',
      s: 'Arkanda ne kadar iz bırakmak istersin?', opts: SILLAGE, kind: 'plain' },
  ] : [];

  function pick(id) { setAns(a => ({ ...a, [Q[step].key]: id })); }

  function next() {
    if (!ans[Q[step].key]) return;
    if (step < Q.length - 1) { setStep(step + 1); return; }
    runAnaliz();
  }
  function back() {
    if (step > 0) setStep(step - 1);
    else { setPhase('gender'); setStep(0); }
  }

  function runAnaliz() {
    setPhase('analiz'); setProg(0); setLine(0);
    [[500, 1], [1050, 2], [1600, 3]].forEach(([t, l]) =>
      timers.current.push(setTimeout(() => setLine(l), t)));
    let p = 0;
    clearInterval(iv.current);
    iv.current = setInterval(() => {
      p = Math.min(100, p + 3 + Math.random() * 5);
      setProg(Math.round(p));
      if (p >= 100) clearInterval(iv.current);
    }, 70);
    timers.current.push(setTimeout(() => {
      clearInterval(iv.current); setProg(100); setPhase('end');
    }, 2400));
  }

  function match() {
    const pool = SCENTS.filter(s => s.g === gender);
    const famPick = FAMILY.find(f => f.id === ans.aile)?.f;
    const noteFams = ['ust', 'orta', 'alt']
      .map(k => NOTES[k][gender].find(o => o.id === ans[k])?.f)
      .filter(Boolean);
    let best = pool[0], score = -1;
    pool.forEach(s => {
      let sc = 0;
      if (s.fam === famPick) sc += 3;
      noteFams.forEach(f => { if (f === s.fam) sc += 1; });
      if (sc > score) { score = sc; best = s; }
    });
    return best;
  }

  function copyCode() {
    try {
      navigator.clipboard.writeText(CODE);
    } catch (_) {
      const ta = document.createElement('textarea');
      ta.value = CODE; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    }
    setCopied(true);
    timers.current.push(setTimeout(() => setCopied(false), 1800));
  }

  function reset() { setPhase('intro'); setGender(null); setStep(0); setAns({}); setCopied(false); }
  function again() { setStep(0); setAns({}); setCopied(false); setPhase('gender'); }

  const scent = phase === 'end' ? match() : null;
  const S = Q[step];
  const pct = Math.round((Object.keys(ans).length / 6) * 100);
  const chips = ['ust', 'orta', 'alt'].map(k =>
    gender ? NOTES[k][gender].find(o => o.id === ans[k]) : null);

  return (
    <div className="pr-root">
      <div className="pr-wrap">

        <div className="pr-campaign">
          <div className="pr-title">Parfümünü Tasarla, İmzanı Bul!</div>
          <div className="pr-pill">🧴 <b>%25 kupon</b></div>
        </div>

        <div className="pr-box">

          {phase === 'intro' && (
            <div className="pr-intro">
              <div className="pr-house">{HOUSE}</div>
              <div className="pr-flask">
                <svg width="120" height="150" viewBox="0 0 120 150">
                  <defs>
                    <linearGradient id="prG" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F7E6B8" /><stop offset="100%" stopColor="#C9A227" />
                    </linearGradient>
                  </defs>
                  <rect x="48" y="6" width="24" height="18" rx="4" fill="#2B2116" />
                  <rect x="52" y="22" width="16" height="12" fill="#6B5A3A" />
                  <path d="M22 42 C22 34, 34 32, 60 32 C86 32, 98 34, 98 42 L98 130 C98 140, 92 144, 60 144 C28 144, 22 140, 22 130 Z"
                        fill="url(#prG)" stroke="#8A6A1E" strokeWidth="2" />
                  <rect x="34" y="66" width="52" height="42" rx="4" fill="#FFFDF2" opacity="0.82" />
                  <text x="60" y="84" textAnchor="middle" fontSize="9" fontWeight="800" fill="#8A6A1E">ATELIER</text>
                  <text x="60" y="98" textAnchor="middle" fontSize="12" fontWeight="800" fill="#3A2E12">RD</text>
                  <ellipse cx="38" cy="60" rx="6" ry="16" fill="#fff" opacity="0.32" />
                </svg>
              </div>
              <div className="pr-intro-title">6 soru, tek imza.</div>
              <p className="pr-intro-body">
                Notalarını, koku grubunu, yoğunluğunu ve bırakmak istediğin izi seç.
                Koleksiyonu senin için tarayalım.
              </p>
              <button className="pr-btn" onClick={() => setPhase('gender')}>Parfümümü Tasarla</button>
              <div className="pr-note">⏱ 6 soru · yaklaşık 1 dakika</div>
            </div>
          )}

          {phase === 'gender' && (
            <div className="pr-gender">
              <div className="pr-head">
                <div className="pr-tag">BAŞLANGIÇ</div>
                <div className="pr-h1">Hangi koleksiyon?</div>
                <div className="pr-sub">Notaları ve önerileri buna göre seçeceğiz.</div>
              </div>
              <div className="pr-g-row">
                {GENDERS.map(g => (
                  <button key={g.id} className="pr-g-card"
                          onClick={() => { setGender(g.id); setAns({}); setStep(0); setPhase('q'); }}>
                    <span className="pr-g-e">{g.e}</span>
                    <b>{g.n}</b>
                    <em>{g.d}</em>
                  </button>
                ))}
              </div>
            </div>
          )}

          {phase === 'q' && S && (
            <div className="pr-pick">
              <div className="pr-progress">
                <div className="pr-bar"><i style={{ width: pct + '%' }} /></div>
                <div className="pr-dots">
                  {Q.map((q, i) => (
                    <span key={q.key} className={'pr-dot' + (i === step ? ' on' : '') + (ans[q.key] ? ' done' : '')}>
                      {i + 1}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pr-head">
                <div className="pr-tag">{S.tag}</div>
                <div className="pr-h1">{S.h}</div>
                <div className="pr-sub">{S.s}</div>
              </div>

              <div className={'pr-grid' + (S.kind === 'plain' ? ' one' : '')}>
                {S.opts.map(o => (
                  <button key={o.id}
                          className={'pr-card' + (ans[S.key] === o.id ? ' on' : '')}
                          onClick={() => pick(o.id)}>
                    {S.kind === 'note'
                      ? <i className="pr-swatch" style={{ background: o.c }} />
                      : <i className="pr-icon">{o.e}</i>}
                    <div className="pr-card-in">
                      <div className="pr-n">{o.n}</div>
                      <div className="pr-d">{o.d}</div>
                    </div>
                    {S.kind === 'note' && <span className="pr-fam">{o.f}</span>}
                    {o.pct && <span className="pr-fam">{o.pct}</span>}
                    {ans[S.key] === o.id && <span className="pr-tick">✓</span>}
                  </button>
                ))}
              </div>

              <div className="pr-nav">
                <button className="pr-back" onClick={back}>← Geri</button>
                <div className="pr-chips">
                  {chips.map((p, i) => (
                    p ? <span key={i} className="pr-chip" style={{ borderColor: p.c }}>
                          <i style={{ background: p.c }} />{p.n}
                        </span>
                      : <span key={i} className="pr-chip empty">{['ÜST', 'ORTA', 'ALT'][i]}</span>
                  ))}
                </div>
                <button className="pr-next" onClick={next} disabled={!ans[S.key]}>
                  {step < Q.length - 1 ? 'İleri →' : 'Analiz Et'}
                </button>
              </div>
            </div>
          )}

          {phase === 'analiz' && (
            <div className="pr-analiz">
              <div className="pr-radar">
                <span className="pr-radar-e">🧪</span>
                <i /><i /><i />
              </div>
              <div className="pr-analiz-h">Parfümün analiz ediliyor…</div>
              <div className="pr-analiz-lines">
                {LINES.map((l, i) => (
                  <div key={i} className={'pr-line' + (i <= line ? ' on' : '')}>
                    <span>{i < line ? '✓' : '•'}</span> {l}
                  </div>
                ))}
              </div>
              <div className="pr-abar"><i style={{ width: prog + '%' }} /></div>
              <div className="pr-apct">{prog}%</div>
            </div>
          )}

          {phase === 'end' && scent && (
            <div className="pr-end">
              <div className="pr-result" style={{ background: `linear-gradient(160deg, ${scent.c1}, ${scent.c2})` }}>
                <div className="pr-res-e">{scent.e}</div>
                <div className="pr-res-lab">SİZİN PARFÜMÜNÜZ</div>
                <div className="pr-res-n">{scent.n}</div>
                <div className="pr-res-tag">{scent.tag}</div>
                <div className="pr-formula">
                  {chips.map((p, i) => (
                    <span key={i}>{p ? p.n : ''}{i < 2 && <em>×</em>}</span>
                  ))}
                </div>
              </div>

              <div className="pr-spec">
                <div className="pr-spec-c">
                  <b>{FAMILY.find(f => f.id === ans.aile)?.e}</b>
                  <span>KOKU GRUBU</span>
                  <em>{FAMILY.find(f => f.id === ans.aile)?.n}</em>
                </div>
                <div className="pr-spec-c">
                  <b>{INTENSITY.find(f => f.id === ans.yogunluk)?.e}</b>
                  <span>YOĞUNLUK</span>
                  <em>{INTENSITY.find(f => f.id === ans.yogunluk)?.n}</em>
                </div>
                <div className="pr-spec-c">
                  <b>{SILLAGE.find(f => f.id === ans.sillage)?.e}</b>
                  <span>SILLAGE</span>
                  <em>{SILLAGE.find(f => f.id === ans.sillage)?.n}</em>
                </div>
              </div>

              <div className="pr-pers">
                <b>Kokun seni şöyle anlatıyor:</b> {scent.pers}
              </div>

              <div className="pr-near">
                <div className="pr-near-h">Bunu sevdiysen, bunlara da bak</div>
                <div className="pr-near-row">
                  {scent.near.map(n => (
                    <div key={n} className="pr-near-c">
                      <i style={{ background: `linear-gradient(160deg, ${scent.c1}, ${scent.c2})` }} />
                      <span>{n}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pr-coupon" onClick={copyCode}>
                <span className="pr-code">{CODE}</span>
                <span className="pr-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
              </div>
              <div className="pr-fine">⏳ Tüm {HOUSE} koleksiyonunda geçerli — kupon 24 saat geçerli.</div>

              <button className="pr-btn" onClick={reset}>Kuponu Kullan, {scent.n} İncele</button>
              <button className="pr-replay" onClick={again}>Testi tekrar çöz</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
