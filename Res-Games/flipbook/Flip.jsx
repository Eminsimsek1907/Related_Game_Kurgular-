import React, { useState, useRef, useEffect } from 'react';
import './Flip.css';

/*
  ================================================================
  DİJİTAL MARKA KATALOĞU — RMC Gamification  (REVİZE 2)
  ================================================================
  - AMAÇ: markayı tanıtmak. Favori/puan/kademe YOK, nudge YOK.
  - Sayfalar: Kapak → Tarihçe → Yaz Koleksiyonu → Koleksiyondan →
    Mail Bülteni → Marka Anketi (3 soru) → Sosyal Medya → KAZI KAZAN.
  - Kupon TEK SAYFADA "kazı kazan" ile açılır (canvas kazıma).
  - Marka: MARINA POLO CLUB (kurgusal örnek — gerçek markayla değişir).
  - Mail/opt-in formu yok: bülten sayfası bülteni TANITIR, kayıt akışı
    RMC tarafında tetiklenir.
  - PC: çift sayfa açılım. Mobil: tek tek 8 sayfa.
  ================================================================
*/

const BRAND = 'MARINA POLO CLUB';
const EST = 'EST. 1978';
const NPAGES = 8;

const COUPON = { code: 'KATALOG25', label: '%25 İndirim' };

const PRODUCTS = [
  { e: '👕', n: 'Piqué Polo',      p: '1.290 TL', o: '1.890 TL', d: 32 },
  { e: '🩳', n: 'Keten Şort',      p: '890 TL',   o: '1.290 TL', d: 31 },
  { e: '👟', n: 'Deck Ayakkabı',   p: '2.190 TL', o: '2.990 TL', d: 26 },
  { e: '🕶️', n: 'Marina Gözlük',  p: '1.890 TL', o: '2.590 TL', d: 27 },
];

const SURVEY = [
  { q: 'Yeni sezonda en çok hangisini beklersin?', a: ['Polo & Tişört', 'Dış Giyim', 'Ayakkabı', 'Aksesuar'] },
  { q: 'Alışverişini genelde nereden yaparsın?',   a: ['Mağaza', 'Web sitesi', 'Mobil uygulama'] },
  { q: 'Bizden en çok ne duymak istersin?',        a: ['İndirimler', 'Yeni ürünler', 'Stil önerileri'] },
];

const SOCIAL = [
  { i: '📸', n: 'Instagram', h: '@marinapoloclub', f: '284B takipçi' },
  { i: '🎬', n: 'YouTube',   h: 'Marina Polo Club', f: '46B abone' },
  { i: '🎵', n: 'TikTok',    h: '@marinapolo',      f: '118B takipçi' },
  { i: '💼', n: 'LinkedIn',  h: 'Marina Polo Club', f: '12B takipçi' },
];

export default function Flip() {
  const [idx, setIdx] = useState(0);
  const [flipping, setFlip] = useState(0);
  const [narrow, setNarrow] = useState(false);
  const [answers, setAnswers] = useState({});     // {soruIndex: seçenekIndex}
  const [scratched, setScratched] = useState(0);  // 0-100
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [end, setEnd] = useState(false);
  const [mail, setMail] = useState('');           // MAİL BÜLTENİ — açık talep üzerine eklendi
  const [subbed, setSubbed] = useState(false);
  const [mailErr, setMailErr] = useState('');

  const timers = useRef([]);
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const moves = useRef(0);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 760px)');
    const on = () => setNarrow(mq.matches);
    on();
    if (mq.addEventListener) mq.addEventListener('change', on); else mq.addListener(on);
    return () => { if (mq.removeEventListener) mq.removeEventListener('change', on); else mq.removeListener(on); };
  }, []);

  const step = narrow ? 1 : 2;
  const maxIdx = narrow ? NPAGES - 1 : NPAGES - 2;
  const steps = narrow ? NPAGES : NPAGES / 2;

  function go(dir) {
    if (flipping) return;
    const nx = idx + dir * step;
    if (nx < 0 || nx > maxIdx) return;
    setFlip(dir);
    timers.current.push(setTimeout(() => { setIdx(nx); setFlip(0); }, 720));
  }

  function answer(qi, ai) { setAnswers(a => ({ ...a, [qi]: ai })); }

  function subscribe() {
    const v = mail.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) { setMailErr('Geçerli bir e-posta gir'); return; }
    setMailErr(''); setSubbed(true);
    // ÜRETİM: kayıt RMC Campaign/Euromessage tarafında tetiklenecek
  }
  const answered = Object.keys(answers).length;

  // ---- KAZI KAZAN (canvas) ----
  const scratchPageVisible = narrow ? idx === 7 : idx + 1 === 7;

  useEffect(() => {
    if (!scratchPageVisible || revealed) return;
    const cv = canvasRef.current; if (!cv) return;
    const r = cv.getBoundingClientRect();
    cv.width = Math.max(1, Math.round(r.width));
    cv.height = Math.max(1, Math.round(r.height));
    const ctx = cv.getContext('2d');
    const g = ctx.createLinearGradient(0, 0, cv.width, cv.height);
    g.addColorStop(0, '#C9A227'); g.addColorStop(0.5, '#E8CF7A'); g.addColorStop(1, '#B08D1C');
    ctx.fillStyle = g; ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = 'rgba(255,255,255,0.35)';
    ctx.font = 'bold 15px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('KAZI  KAZAN', cv.width / 2, cv.height / 2 + 5);
    setScratched(0);
  }, [scratchPageVisible, revealed, idx, narrow]);

  function scratchAt(e) {
    const cv = canvasRef.current; if (!cv || revealed) return;
    const r = cv.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width) * cv.width;
    const y = ((e.clientY - r.top) / r.height) * cv.height;
    const ctx = cv.getContext('2d');
    // fırça TAM OPAK olmalı: yarı saydam fırça destination-out ile alfayı sıfırlamaz
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'rgba(0,0,0,1)';
    ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    // her karede getImageData pahalı — 5 harekette bir ölç
    moves.current += 1;
    if (moves.current % 5 !== 0) return;

    const img = ctx.getImageData(0, 0, cv.width, cv.height).data;
    let clear = 0, total = 0;
    for (let i = 3; i < img.length; i += 4 * 24) { total++; if (img[i] < 32) clear++; }
    const pct = Math.round((clear / total) * 100);
    setScratched(pct);
    if (pct > 46) setRevealed(true);
  }
  function onScratchDown(e) { e.preventDefault(); drawing.current = true; moves.current = 4; try { e.currentTarget.setPointerCapture(e.pointerId); } catch (_) {} scratchAt(e); }
  function onScratchMove(e) { if (!drawing.current) return; e.preventDefault(); scratchAt(e); }
  function onScratchUp() { drawing.current = false; }

  function copyCode() {
    if (navigator.clipboard) navigator.clipboard.writeText(COUPON.code).catch(() => {});
    setCopied(true); timers.current.push(setTimeout(() => setCopied(false), 1800));
  }
  function reset() {
    timers.current.forEach(clearTimeout); timers.current = [];
    setIdx(0); setFlip(0); setAnswers({}); setScratched(0); setRevealed(false); setCopied(false); setEnd(false);
  }

  const pages = [
    // 0 — KAPAK
    <div className="pf-cover" key="c">
      <div className="pf-crest">⚓</div>
      <div className="pf-brand">{BRAND}</div>
      <div className="pf-est">{EST}</div>
      <div className="pf-line" />
      <div className="pf-season">YAZ<br />KOLEKSİYONU</div>
      <div className="pf-cover-note">Denizden ilham alan yeni sezon</div>
    </div>,

    // 1 — TARİHÇE
    <div className="pf-page-in" key="h">
      <div className="pf-kicker">01 · TARİHÇE</div>
      <h2 className="pf-h2">Rüzgârla Başlayan Hikâye</h2>
      <p className="pf-p">1978'de küçük bir marina atölyesinde, denizcilerin dayanıklı ve rahat kıyafet ihtiyacından doğduk. İlk ürünümüz tuzlu suya dayanıklı piqué polo tişörttü.</p>
      <div className="pf-time">
        <div className="pf-tl"><b>1978</b><span>Marina'da ilk atölye</span></div>
        <div className="pf-tl"><b>1994</b><span>İlk yelken koleksiyonu</span></div>
        <div className="pf-tl"><b>2012</b><span>40 ülkede mağaza</span></div>
        <div className="pf-tl"><b>2026</b><span>Yaz koleksiyonu: Regatta</span></div>
      </div>
      <div className="pf-quote">"Kumaş denizi tanır, biz kumaşı."</div>
    </div>,

    // 2 — YAZ KOLEKSİYONU
    <div className="pf-page-in" key="s">
      <div className="pf-kicker">02 · YAZ KOLEKSİYONU</div>
      <h2 className="pf-h2">Regatta '26</h2>
      <p className="pf-p">Lacivert, kum beji ve yelken beyazı. Nefes alan pamuk, tuzlu suya dayanıklı dikiş, güneşte solmayan renk.</p>
      <div className="pf-hero">⛵</div>
      <div className="pf-swatches">
        <i style={{ background: '#12324A' }} /><i style={{ background: '#D9C7A3' }} />
        <i style={{ background: '#FFFFFF' }} /><i style={{ background: '#B03A3A' }} />
        <i style={{ background: '#3A7D5C' }} />
      </div>
      <div className="pf-cap">5 renk · 24 parça · sınırlı üretim</div>
    </div>,

    // 3 — KOLEKSİYONDAN (sadece tanıtım)
    <div className="pf-page-in" key="p1">
      <div className="pf-kicker">03 · KOLEKSİYONDAN</div>
      <h2 className="pf-h2">Sezonun Parçaları</h2>
      <div className="pf-prods">
        {PRODUCTS.map(pr => (
          <div key={pr.n} className="pf-prod">
            <div className="pf-pe">{pr.e}</div>
            <div className="pf-pi">
              <b>{pr.n}</b>
              <div className="pf-price"><s>{pr.o}</s><em>{pr.p}</em><i>%{pr.d}</i></div>
            </div>
          </div>
        ))}
      </div>
    </div>,

    // 4 — MAİL BÜLTENİ
    <div className="pf-page-in" key="n">
      <div className="pf-kicker">04 · MAİL BÜLTENİ</div>
      <h2 className="pf-h2">Marina Postası</h2>
      <p className="pf-p">Her cuma sabahı kutuna düşen tek bir mail: yeni ürünler, stil önerileri ve sadece bültene özel indirimler.</p>
      <div className="pf-news">
        <div className="pf-nrow"><span>🆕</span><div><b>Yeni ürünler</b><em>Mağazadan önce bültende</em></div></div>
        <div className="pf-nrow"><span>🏷️</span><div><b>Bültene özel indirim</b><em>Sadece abonelere</em></div></div>
        <div className="pf-nrow"><span>🧭</span><div><b>Stil rehberi</b><em>Sezonun kombinleri</em></div></div>
      </div>

      {subbed ? (
        <div className="pf-subok">✓ Kaydın alındı — ilk bülten cuma sabahı kutunda.</div>
      ) : (
        <>
          <div className="pf-sub">
            <input
              className={'pf-mail' + (mailErr ? ' err' : '')}
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="ornek@mail.com"
              value={mail}
              onChange={(e) => { setMail(e.target.value); if (mailErr) setMailErr(''); }}
              onKeyDown={(e) => { if (e.key === 'Enter') subscribe(); }}
            />
            <button className="pf-subbtn" onClick={subscribe}>Bültene Katıl</button>
          </div>
          {mailErr && <div className="pf-mailerr">{mailErr}</div>}
        </>
      )}
      <div className="pf-cap">Haftada 1 mail · istediğin an çık</div>
    </div>,

    // 5 — MARKA ANKETİ (3 soru)
    <div className="pf-page-in" key="q">
      <div className="pf-kicker">05 · MARKA ANKETİ</div>
      <h2 className="pf-h2">3 Soruda Sen</h2>
      <div className="pf-survey">
        {SURVEY.map((s, qi) => (
          <div key={qi} className="pf-q">
            <div className="pf-qt"><b>{qi + 1}.</b> {s.q}</div>
            <div className="pf-opts">
              {s.a.map((opt, ai) => (
                <button key={ai} className={'pf-opt' + (answers[qi] === ai ? ' on' : '')} onClick={() => answer(qi, ai)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="pf-cap">{answered === 3 ? '✓ Teşekkürler, cevapların bize yol gösteriyor.' : `${answered}/3 soru yanıtlandı`}</div>
    </div>,

    // 6 — SOSYAL MEDYA
    <div className="pf-page-in" key="so">
      <div className="pf-kicker">06 · SOSYAL MEDYA</div>
      <h2 className="pf-h2">Bizi Takip Et</h2>
      <p className="pf-p">Kulis görüntüleri, yeni sezon çekimleri ve sadece takipçilere özel sürprizler.</p>
      <div className="pf-social">
        {SOCIAL.map(s => (
          <div key={s.n} className="pf-so">
            <span>{s.i}</span>
            <div><b>{s.n}</b><em>{s.h}</em></div>
            <i>{s.f}</i>
          </div>
        ))}
      </div>
      <div className="pf-tag">#MarinaPoloClub</div>
    </div>,

    // 7 — KAZI KAZAN
    <div className="pf-page-in last" key="e">
      <div className="pf-kicker">07 · SANA ÖZEL</div>
      <h2 className="pf-h2">Kazı Kazan</h2>
      <p className="pf-p">Katalog okuruna özel kuponu <b>kazıyarak</b> ortaya çıkar.</p>

      <div className="pf-scratch">
        <div className="pf-under">
          <div className="pf-big">{COUPON.label}</div>
          <div className="pf-usub">kupon kodun aşağıda</div>
        </div>
        {!revealed && (
          <canvas ref={canvasRef} className="pf-canvas"
                  onPointerDown={onScratchDown} onPointerMove={onScratchMove}
                  onPointerUp={onScratchUp} onPointerCancel={onScratchUp} />
        )}
      </div>

      {revealed ? (
        <>
          <div className="pf-coupon" onClick={copyCode}>
            <span className="pf-code">{COUPON.code}</span>
            <span className="pf-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
          </div>
          <button className="pf-cta" onClick={() => setEnd(true)}>Kuponu Kullan, Alışverişe Başla</button>
        </>
      ) : (
        <div className="pf-cap">👆 Parmağınla kazı ({scratched}%)</div>
      )}
    </div>,
  ];


  return (
    <div className="pf-root">
      <div className="pf-wrap">

        <div className="pf-campaign">
          <div className="pf-title">Kataloğu Karıştır, Kuponu Kazan!</div>
        </div>

        <div className="pf-box">
          <div className="pf-book">
            <div className="pf-spine" />

            {/* STATİK ZEMİN — çevrilen yaprağın altında kalan sayfalar */}
            {!narrow && (() => {
              const li = flipping === -1 ? idx - 2 : idx;
              return (
                <div className="pf-half left">
                  <div className="pf-paper">{pages[li]}</div>
                  <div className="pf-folio">{li + 1}</div>
                </div>
              );
            })()}

            {(() => {
              const ri = narrow
                ? (flipping === 1 ? idx + 1 : idx)
                : (flipping === 1 ? idx + 3 : idx + 1);
              return (
                <div className="pf-half right">
                  <div className="pf-paper">{pages[ri]}</div>
                  <div className="pf-folio">{ri + 1}</div>
                  <div className="pf-curl" onClick={() => go(1)} />
                </div>
              );
            })()}

            {/* ÇEVRİLEN YAPRAK — ön yüz + arka yüz, omurga etrafında döner */}
            {flipping !== 0 && (() => {
              let front, back, cls;
              if (narrow) {
                cls = flipping === 1 ? 'pf-leaf m fwd' : 'pf-leaf m bwd';
                front = flipping === 1 ? pages[idx] : pages[idx - 1];
                back = null;                                  // mobilde tek sayfa → arka yüz boş kağıt
              } else if (flipping === 1) {
                cls = 'pf-leaf fwd';
                front = pages[idx + 1];                       // sağdaki sayfa kalkar
                back = pages[idx + 2];                        // arkası sola oturur
              } else {
                cls = 'pf-leaf bwd';
                front = pages[idx];                           // soldaki sayfa kalkar
                back = pages[idx - 1];                        // arkası sağa oturur
              }
              return (
                <div className={cls}>
                  <div className="pf-face front">
                    <div className="pf-paper">{front}</div>
                    <i className="pf-sh" />
                  </div>
                  <div className="pf-face back">
                    <div className="pf-paper">{back}</div>
                    <i className="pf-sh" />
                  </div>
                </div>
              );
            })()}
          </div>

          <div className="pf-bar">
            <button className="pf-nav" onClick={() => go(-1)} disabled={idx === 0 || !!flipping}>← Geri</button>
            <div className="pf-dots">
              {Array.from({ length: steps }, (_, i) => <i key={i} className={i === Math.floor(idx / step) ? 'on' : ''} />)}
            </div>
            <button className="pf-nav go" onClick={() => go(1)} disabled={idx >= maxIdx || !!flipping}>
              Sayfayı Çevir →
            </button>
          </div>

          {end && (
            <div className="pf-overlay">
              <div className="pf-modal">
                <button className="pf-x" onClick={reset}>✕</button>
                <div className="pf-emoji">🎉</div>
                <div className="pf-modal-title win">KUPONUN HAZIR!</div>
                <p className="pf-modal-body">{BRAND} kataloğunu okuduğun için teşekkürler — <b>{COUPON.label}</b> kuponun aşağıda:</p>
                <div className="pf-coupon" onClick={copyCode}>
                  <span className="pf-code">{COUPON.code}</span>
                  <span className="pf-copy">{copied ? 'Kopyalandı ✓' : 'Kodu Kopyala'}</span>
                </div>
                <div className="pf-fine">⏳ Bugüne özel — kupon 24 saat geçerli.</div>
                <button className="pf-btn" onClick={reset}>Kuponu Kullan, Alışverişe Başla</button>
                <button className="pf-replay" onClick={reset}>Kataloğu tekrar oku</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
