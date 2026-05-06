// HeartGardenScene v2 — rich interactive garden of love
// Features: themed seasons, growing flowers from taps, love messages on tap,
// long-press to bloom big, milestones, ambient firefly particles.

const LOVE_MESSAGES_ES = [
  'te amo', 'mi vida', 'mi amor', 'mi corazón', 'mi todo',
  'eres mía', 'siempre', 'para ti', 'mi sol', 'mi cielo',
  'mi alma', 'mi reina', 'mi luz', 'mi aire', 'mi hogar',
  'te adoro', 'te extraño', 'eres todo', 'mi bendición', 'mi tesoro',
  'mi mundo', 'mi paz', 'mi calma', 'mi fuego', 'mi café',
  'mi razón', 'mi destino', 'mi milagro', 'mi locura', 'mi suerte',
  'mi compañera', 'mi novia', 'mi futuro', 'mi promesa', 'mi canción',
  'eres preciosa', 'eres hermosa', 'mi musa', 'mi poesía', 'mi historia',
  'eres tú', 'solo tú', 'siempre tú', 'tuyo soy', 'tu hombre',
  'mi cumpleañera', 'mi pickleball', 'mi cariño', 'mi mami', 'mi bebé',
];

const GARDEN_THEMES = {
  velvet: {
    label: 'Velvet Night',
    heartCore: '#FF8090', heartMid: '#C8102E', heartDeep: '#5C0010',
    glow: 'rgba(200,16,46,0.5)',
    bg: 'radial-gradient(ellipse 120% 80% at 50% 0%, #4A0812 0%, #2A0408 40%, #1A0508 70%, #0F0206 100%)',
  },
  rose: {
    label: 'Rose Garden',
    heartCore: '#FFB8C8', heartMid: '#E63946', heartDeep: '#7B1028',
    glow: 'rgba(230,57,70,0.55)',
    bg: 'radial-gradient(ellipse 120% 80% at 50% 0%, #6B0E22 0%, #3A0610 50%, #1F0408 100%)',
  },
  sunset: {
    label: 'Sunset',
    heartCore: '#FFD09A', heartMid: '#E85A4F', heartDeep: '#6B1A1A',
    glow: 'rgba(232,90,79,0.55)',
    bg: 'radial-gradient(ellipse 120% 80% at 50% 0%, #C8102E 0%, #6B1A1A 40%, #2A0408 90%)',
  },
  midnight: {
    label: 'Midnight Bloom',
    heartCore: '#F8C0CC', heartMid: '#A02040', heartDeep: '#2A0814',
    glow: 'rgba(160,32,64,0.55)',
    bg: 'radial-gradient(ellipse 120% 80% at 50% 0%, #1A0820 0%, #0F0210 60%, #060006 100%)',
  },
};

function GardenHeart({ heart, theme, onTap, onLongPress }) {
  const pressTimer = React.useRef(null);
  const longPressed = React.useRef(false);

  const start = (e) => {
    longPressed.current = false;
    pressTimer.current = setTimeout(() => {
      longPressed.current = true;
      onLongPress(e, heart);
    }, 500);
  };
  const end = (e) => {
    clearTimeout(pressTimer.current);
    if (!longPressed.current) onTap(e, heart);
  };
  const cancel = () => clearTimeout(pressTimer.current);

  return (
    <div
      onMouseDown={start} onMouseUp={end} onMouseLeave={cancel}
      onTouchStart={start} onTouchEnd={end} onTouchCancel={cancel}
      style={{
        position: 'absolute',
        left: `${heart.left}%`,
        top: `${heart.top}%`,
        animation: `heartBreathe 2.6s ease-in-out ${heart.phase}s infinite`,
        filter: `drop-shadow(0 0 ${8 + heart.size/3}px ${theme.glow})`,
        cursor: 'pointer',
        transform: 'translate(-50%, -50%)',
        WebkitTouchCallout: 'none',
        userSelect: 'none',
      }}>
      <svg width={heart.size} height={heart.size} viewBox="0 0 40 40">
        <defs>
          <radialGradient id={`gh-${heart.id}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor={theme.heartCore} />
            <stop offset="60%" stopColor={theme.heartMid} />
            <stop offset="100%" stopColor={theme.heartDeep} />
          </radialGradient>
        </defs>
        <path d="M20 34 C 8 26, 4 18, 8 12 C 12 7, 18 9, 20 14 C 22 9, 28 7, 32 12 C 36 18, 32 26, 20 34 Z"
              fill={`url(#gh-${heart.id})`} />
      </svg>
    </div>
  );
}

function FloatingMessage({ msg, x, y, big, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, big ? 2400 : 1800);
    return () => clearTimeout(t);
  }, [onDone, big]);
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none', zIndex: 12,
      animation: `floatMsg ${big ? 2.4 : 1.8}s ease-out forwards`,
      fontFamily: "'Pinyon Script', cursive",
      fontSize: big ? 44 : 28,
      color: '#FFD1DC',
      textShadow: '0 0 12px rgba(200,16,46,0.7), 0 2px 6px rgba(0,0,0,0.5)',
      whiteSpace: 'nowrap',
      fontWeight: 400,
    }}>{msg}</div>
  );
}

function GrowingFlower({ x, y, color, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, 6000);
    return () => clearTimeout(t);
  }, [onDone]);
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none', zIndex: 8,
      animation: 'flowerGrow 1s ease-out, flowerFade 1s ease-in 5s forwards',
    }}>
      <svg width="48" height="48" viewBox="0 0 40 40">
        <defs>
          <radialGradient id={`fl-${x}-${y}`} cx="50%" cy="50%">
            <stop offset="0%" stopColor="#FFD97D" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor="#3A0008" />
          </radialGradient>
        </defs>
        {[0, 72, 144, 216, 288].map(rot => (
          <ellipse key={rot} cx="20" cy="10" rx="5" ry="9"
            fill={color} opacity="0.85"
            transform={`rotate(${rot} 20 20)`} />
        ))}
        <circle cx="20" cy="20" r="5" fill={`url(#fl-${x}-${y})`} />
      </svg>
    </div>
  );
}

function Firefly({ delay, left, top, duration }) {
  return (
    <div style={{
      position: 'absolute',
      left: `${left}%`, top: `${top}%`,
      width: 4, height: 4, borderRadius: '50%',
      background: 'radial-gradient(circle, #FFE8B0 0%, rgba(232,201,160,0.6) 50%, transparent 80%)',
      boxShadow: '0 0 8px #FFE8B0, 0 0 16px rgba(232,201,160,0.5)',
      animation: `fireflyDrift ${duration}s ease-in-out ${delay}s infinite`,
      pointerEvents: 'none',
    }} />
  );
}

function HeartGardenScene() {
  const [t, setTweak] = useTweaks(window.__GARDEN_TWEAKS__ || {
    theme: 'velvet',
    heartCount: 18,
    fireflies: true,
    spanish: true,
  });
  const theme = GARDEN_THEMES[t.theme] || GARDEN_THEMES.velvet;

  const [bursts, setBursts] = React.useState([]);
  const [messages, setMessages] = React.useState([]);
  const [flowers, setFlowers] = React.useState([]);
  const [count, setCount] = React.useState(0);
  const [milestone, setMilestone] = React.useState(null);
  const [surprise, setSurprise] = React.useState(null); // { id, kind: 'star'|'butterfly'|'burst' }
  const lastMsgIdx = React.useRef(-1);

  // Soft starlight halo — small twinkling sparkles arranged on a heart silhouette
  // around the photo card. Purely decorative; taps go through to the surface.
  const halo = React.useMemo(() => {
    const arr = [];
    const N = Math.max(28, Math.min(t.heartCount, 60));
    for (let i = 0; i < N; i++) {
      const theta = (i / N) * Math.PI * 2;
      const x = 16 * Math.pow(Math.sin(theta), 3);
      const y = -(13 * Math.cos(theta) - 5 * Math.cos(2 * theta) - 2 * Math.cos(3 * theta) - Math.cos(4 * theta));
      const r = (n) => ((Math.sin(i * 23.7 + n) + 1) / 2);
      arr.push({
        id: i,
        left: 50 + (x / 18) * 46,
        top: 50 + (y / 18) * 42,
        size: 3 + r(3) * 5,
        delay: r(4) * 4,
        phase: (i / N) * 5,
      });
    }
    return arr;
  }, [t.heartCount]);

  const fireflies = React.useMemo(() => {
    const arr = [];
    for (let i = 0; i < 8; i++) {
      arr.push({
        id: i,
        left: 5 + (i * 37) % 90,
        top: 10 + (i * 53) % 80,
        delay: i * 0.8,
        duration: 6 + (i % 4) * 2,
      });
    }
    return arr;
  }, []);

  // Tap anywhere on the garden surface to drop a te amo.
  const MILESTONES = new Set([5, 10, 15, 25, 35, 50, 75, 100, 150, 200, 365]);
  const surfaceTap = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = (e.clientX ?? e.changedTouches?.[0]?.clientX ?? 0) - rect.left;
    const cy = (e.clientY ?? e.changedTouches?.[0]?.clientY ?? 0) - rect.top;
    const id = Math.random();
    setBursts(b => [...b, { id, x: cx, y: cy }]);
    const newCount = count + 1;
    setCount(newCount);

    // Pick a love message that wasn't the last one shown.
    let next = Math.floor(Math.random() * LOVE_MESSAGES_ES.length);
    if (next === lastMsgIdx.current && LOVE_MESSAGES_ES.length > 1) {
      next = (next + 1) % LOVE_MESSAGES_ES.length;
    }
    lastMsgIdx.current = next;
    const msg = LOVE_MESSAGES_ES[next];
    setMessages(m => [...m, { id: id + 0.1, msg, x: cx, y: cy - 20, big: false }]);

    if (MILESTONES.has(newCount)) {
      setMilestone(newCount);
      setTimeout(() => setMilestone(null), 3000);
    }
    // Surprise event roughly every 15 taps (offset so it doesn't overlap milestones)
    if (newCount > 0 && newCount % 15 === 7) {
      const kinds = ['star', 'butterfly', 'burst'];
      const kind = kinds[Math.floor(Math.random() * kinds.length)];
      const sid = Math.random();
      setSurprise({ id: sid, kind });
      setTimeout(() => setSurprise(s => (s && s.id === sid ? null : s)), 2200);
    }
  };

  // Cycle a soft handwritten phrase under the photo every ~4s.
  const PHRASES = [
    'mi vida entera',
    'todo es tuyo',
    'tú y yo, siempre',
    'mi razón',
    'mi cielo',
    'eres mi paz',
    'mi para siempre',
  ];
  const [phraseIdx, setPhraseIdx] = React.useState(0);
  React.useEffect(() => {
    const t = setInterval(() => setPhraseIdx(i => (i + 1) % PHRASES.length), 4200);
    return () => clearInterval(t);
  }, []);

  const removeBurst = (id) => setBursts(b => b.filter(x => x.id !== id));
  const removeMsg = (id) => setMessages(m => m.filter(x => x.id !== id));
  const removeFlower = (id) => setFlowers(f => f.filter(x => x.id !== id));

  const milestoneText =
      milestone === 5 ? 'cinco besos en el aire'
    : milestone === 10 ? 'diez veces te amo'
    : milestone === 15 ? 'quince y contando'
    : milestone === 25 ? 'veinticinco corazones'
    : milestone === 35 ? 'treinta y cinco abrazos'
    : milestone === 50 ? 'eres todo, mi vida'
    : milestone === 75 ? 'setenta y cinco latidos'
    : milestone === 100 ? 'cien razones para amarte'
    : milestone === 150 ? 'eres mi todo, ciento cincuenta veces'
    : milestone === 200 ? 'doscientas razones, un solo corazón'
    : milestone === 365 ? 'un año entero de amor'
    : '';

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: theme.bg,
      transition: 'background 0.8s ease',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      padding: 'calc(env(safe-area-inset-top, 0px) + 90px) 18px calc(env(safe-area-inset-bottom, 0px) + 80px)',
      animation: 'sceneFadeIn 0.8s ease-out',
      overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 12,
        color: '#E8C9A0',
        letterSpacing: 4,
        textTransform: 'uppercase',
        opacity: 0.8,
        marginBottom: 2,
      }}>· {t.spanish ? 'el jardín' : 'the garden'} ·</div>
      <h2 style={{
        fontFamily: "'Pinyon Script', cursive",
        fontSize: 40,
        color: '#FFD1DC',
        margin: '0 0 4px',
        fontWeight: 400,
        textShadow: `0 0 20px ${theme.glow}`,
        textAlign: 'center',
        lineHeight: 1,
      }}>{t.spanish ? 'un corazón de corazones' : 'a heart of hearts'}</h2>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 14,
        color: 'rgba(244,232,216,0.7)',
        marginBottom: 6,
        textAlign: 'center',
        textWrap: 'pretty',
      }}>
        {t.spanish
          ? 'toca cada uno · cada corazón un te amo'
          : 'tap each one · each heart a te amo'}
      </div>

      {/* Garden surface — entire area is tappable */}
      <div data-garden onClick={surfaceTap} style={{
        flex: 1, width: '100%', position: 'relative',
        marginTop: 6, cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
      }}>
        {t.fireflies && fireflies.map(f => <Firefly key={f.id} {...f} />)}

        {/* Surprise events — fire every ~15 taps for serendipity */}
        {surprise && surprise.kind === 'star' && (
          <div key={surprise.id} style={{
            position: 'absolute', top: '12%', left: '-12%',
            width: 90, height: 2,
            background: 'linear-gradient(90deg, transparent, #FFE8B0 40%, #FFD1DC 70%, transparent)',
            boxShadow: '0 0 12px #FFD1DC, 0 0 24px rgba(255,209,220,0.6)',
            transform: 'rotate(-18deg)',
            animation: 'shootingStar 1.5s ease-out forwards',
            pointerEvents: 'none', borderRadius: 2,
          }} />
        )}
        {surprise && surprise.kind === 'butterfly' && (
          <div key={surprise.id} style={{
            position: 'absolute', top: '40%', left: '-10%',
            fontSize: 24, color: theme.heartCore,
            textShadow: `0 0 8px ${theme.glow}`,
            animation: 'butterflyDrift 2.2s ease-in-out forwards',
            pointerEvents: 'none',
          }}>✿</div>
        )}
        {surprise && surprise.kind === 'burst' && (
          <div key={surprise.id} style={{
            position: 'absolute', top: '50%', left: '50%',
            width: 24, height: 24, transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.heartCore} 0%, ${theme.heartMid} 40%, transparent 80%)`,
            boxShadow: `0 0 30px ${theme.glow}, 0 0 60px ${theme.glow}`,
            animation: 'gardenBurst 2s ease-out forwards',
            pointerEvents: 'none',
          }} />
        )}

        {/* Soft starlight halo — heart silhouette of twinkling dots */}
        {halo.map(h => (
          <div key={h.id} style={{
            position: 'absolute',
            left: `${h.left}%`, top: `${h.top}%`,
            width: h.size, height: h.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${theme.heartCore} 0%, ${theme.heartMid} 50%, transparent 90%)`,
            boxShadow: `0 0 ${6 + h.size}px ${theme.glow}`,
            transform: 'translate(-50%, -50%)',
            animation: `haloTwinkle 2.6s ease-in-out ${h.phase}s infinite`,
            pointerEvents: 'none',
          }} />
        ))}

        {/* Photo card — centered, hearts orbit around it */}
        <div style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -50%) rotate(-1.5deg)',
          width: '58%', maxWidth: 200,
          padding: 8,
          background: 'linear-gradient(180deg, #f8ecdc 0%, #efe1cc 100%)',
          border: '1px solid rgba(232,201,160,0.5)',
          boxShadow: `0 12px 40px rgba(0,0,0,0.55), 0 0 30px ${theme.glow}, inset 0 1px 0 rgba(255,255,255,0.6)`,
          zIndex: 5,
          pointerEvents: 'none',
        }}>
          <div style={{
            width: '100%', aspectRatio: '4/5',
            background: `url(photos/jardin-card.jpeg) center/cover no-repeat`,
            boxShadow: 'inset 0 0 30px rgba(0,0,0,0.4)',
          }} />
          <div style={{
            fontFamily: "'Pinyon Script', cursive",
            fontSize: 22,
            color: '#5C0010',
            textAlign: 'center',
            marginTop: 6,
            lineHeight: 1,
          }}>mi amor</div>
        </div>

        {/* Cycling handwritten phrase under the photo */}
        <div style={{
          position: 'absolute',
          left: '50%', bottom: '8%',
          transform: 'translateX(-50%)',
          fontFamily: "'Pinyon Script', cursive",
          fontSize: 28,
          color: '#FFD1DC',
          textShadow: `0 0 12px ${theme.glow}`,
          textAlign: 'center',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          zIndex: 6,
        }}>
          <span key={phraseIdx} style={{
            display: 'inline-block',
            animation: 'phraseFade 4.2s ease-in-out',
          }}>{PHRASES[phraseIdx]}</span>
        </div>

        {bursts.map(b => (
          <SparkleBurst key={b.id} x={b.x} y={b.y} onDone={() => removeBurst(b.id)} />
        ))}

        {messages.map(m => (
          <FloatingMessage key={m.id} {...m} onDone={() => removeMsg(m.id)} />
        ))}

        {/* Milestone banner */}
        {milestone && (
          <div style={{
            position: 'absolute', left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '14px 24px',
            background: 'rgba(20,4,8,0.85)',
            border: `1px solid ${theme.heartMid}`,
            borderRadius: 4,
            boxShadow: `0 0 40px ${theme.glow}, inset 0 0 20px rgba(0,0,0,0.5)`,
            fontFamily: "'Pinyon Script', cursive",
            fontSize: 32,
            color: '#FFD1DC',
            textShadow: `0 0 12px ${theme.glow}`,
            animation: 'milestoneIn 0.5s ease-out',
            pointerEvents: 'none',
            textAlign: 'center',
            zIndex: 14,
            whiteSpace: 'nowrap',
          }}>{milestoneText}</div>
        )}
      </div>

      {/* Counter pill */}
      <div style={{
        marginTop: 6,
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '6px 14px',
        background: 'rgba(20,4,8,0.6)',
        border: '1px solid rgba(232,201,160,0.3)',
        borderRadius: 999,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
      }}>
        <svg width="14" height="14" viewBox="0 0 40 40">
          <path d="M20 34 C 8 26, 4 18, 8 12 C 12 7, 18 9, 20 14 C 22 9, 28 7, 32 12 C 36 18, 32 26, 20 34 Z"
                fill={theme.heartMid} />
        </svg>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 14,
          color: '#F4E8D8',
          letterSpacing: 1.5,
        }}>
          {count === 0
            ? (t.spanish ? 'comienza a tocar' : 'start tapping')
            : `${count} ${count === 1 ? (t.spanish ? 'te amo' : 'i love you') : (t.spanish ? 'te amos' : 'i love yous')}`}
        </div>
      </div>

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label="Theme" />
        <TweakSelect
          label="palette"
          value={t.theme}
          options={Object.entries(GARDEN_THEMES).map(([k, v]) => ({ value: k, label: v.label }))}
          onChange={v => setTweak('theme', v)} />
        <TweakSection label="Density" />
        <TweakSlider
          label="hearts"
          value={t.heartCount}
          min={6} max={40} step={1}
          onChange={v => setTweak('heartCount', v)} />
        <TweakSection label="Ambience" />
        <TweakToggle
          label="fireflies"
          value={t.fireflies}
          onChange={v => setTweak('fireflies', v)} />
        <TweakToggle
          label="spanish"
          value={t.spanish}
          onChange={v => setTweak('spanish', v)} />
      </TweaksPanel>
    </div>
  );
}

Object.assign(window, { HeartGardenScene, GARDEN_THEMES });
