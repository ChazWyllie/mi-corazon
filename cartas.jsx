// CartasScene — swipeable archive of monthly love letters
// Plus upcoming-month placeholders with countdown teasers.

function daysUntil(dateStr) {
  // dateStr like "May 4, 2026"
  const target = new Date(dateStr);
  const now = new Date();
  const ms = target - now;
  if (ms <= 0) return 0;
  return Math.ceil(ms / (1000 * 60 * 60 * 24));
}

function LetterCard({ letter }) {
  const [showSpanish, setShowSpanish] = React.useState(false);
  const body = showSpanish && letter.spanish ? letter.spanish : letter.body;
  const salutation = showSpanish && letter.spanish ? null : letter.salutation;

  return (
    <div style={{
      background: 'linear-gradient(180deg, #F8EFDC 0%, #EFE3C8 100%)',
      borderRadius: 3,
      padding: '24px 22px 28px',
      width: '100%',
      boxShadow: '0 20px 50px rgba(0,0,0,0.55), 0 0 0 1px #C9A875',
      position: 'relative',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#3A1A08',
      animation: 'letterOpen 0.7s ease-out',
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        boxShadow: 'inset 0 0 30px rgba(139,69,19,0.22)',
        pointerEvents: 'none', borderRadius: 3,
      }} />

      {/* Date header */}
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{
          fontFamily: "'Pinyon Script', cursive",
          fontSize: 36,
          color: '#8B0000',
          lineHeight: 0.9,
        }}>{letter.monthLabel}</div>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 11,
          color: '#8B4000',
          letterSpacing: 3,
          textTransform: 'uppercase',
          opacity: 0.75,
          marginTop: 4,
        }}>· {letter.date} ·</div>
      </div>

      {/* Decorative divider */}
      <div style={{
        textAlign: 'center', color: '#8B0000', opacity: 0.5,
        fontSize: 12, letterSpacing: 6, marginBottom: 10,
      }}>♥</div>

      {/* Title */}
      {letter.title && (
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 22,
          color: '#5C0010',
          textAlign: 'center',
          lineHeight: 1.2,
          marginBottom: 14,
          textWrap: 'pretty',
        }}>{letter.title}</div>
      )}

      {salutation && (
        <div style={{
          fontFamily: "'Pinyon Script', cursive",
          fontSize: 28,
          color: '#8B0000',
          marginBottom: 8,
          lineHeight: 1,
        }}>{salutation}</div>
      )}

      {body.map((p, i) => (
        <p key={i} style={{
          fontSize: 14.5,
          lineHeight: 1.65,
          fontStyle: 'italic',
          margin: '8px 0',
          textWrap: 'pretty',
        }}>{p}</p>
      ))}

      <div style={{
        fontFamily: "'Pinyon Script', cursive",
        fontSize: 24,
        color: '#8B0000',
        textAlign: 'right',
        marginTop: 14,
        lineHeight: 1,
      }}>tuyo, siempre</div>

      {letter.spanish && (
        <button onClick={() => setShowSpanish(s => !s)} style={{
          marginTop: 14,
          width: '100%',
          background: 'rgba(139,0,0,0.06)',
          border: '1px solid rgba(139,0,0,0.3)',
          borderRadius: 2,
          padding: '8px 12px',
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 12,
          letterSpacing: 3,
          textTransform: 'uppercase',
          color: '#8B0000',
          cursor: 'pointer',
        }}>
          {showSpanish ? '· read in english ·' : '· léelo en español ·'}
        </button>
      )}
    </div>
  );
}

function UpcomingCard({ item }) {
  const days = daysUntil(item.date);
  return (
    <div style={{
      background: 'linear-gradient(180deg, rgba(244,232,216,0.06) 0%, rgba(244,232,216,0.02) 100%)',
      border: '1px dashed rgba(232,201,160,0.5)',
      borderRadius: 3,
      padding: '32px 22px',
      width: '100%',
      textAlign: 'center',
      animation: 'sceneFadeIn 0.6s ease-out',
      position: 'relative',
    }}>
      {/* sealed look */}
      <div style={{
        position: 'absolute', top: -18, left: '50%',
        transform: 'translateX(-50%)',
        width: 40, height: 40, borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 30%, #E63946, #8B0000 60%, #3A0008)',
        boxShadow: '0 4px 10px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,255,255,0.2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#E8C9A0',
        fontFamily: "'Pinyon Script', cursive",
        fontSize: 22,
        animation: 'floatSlow 4s ease-in-out infinite',
      }}>J</div>

      <div style={{
        fontFamily: "'Pinyon Script', cursive",
        fontSize: 38,
        color: '#FFB0B8',
        lineHeight: 0.9,
        marginTop: 14,
        textShadow: '0 0 16px rgba(200,16,46,0.3)',
      }}>{item.monthLabel}</div>

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 12,
        color: '#E8C9A0',
        letterSpacing: 3,
        textTransform: 'uppercase',
        opacity: 0.75,
        marginTop: 4,
      }}>· {item.date} ·</div>

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 18,
        color: '#F4E8D8',
        marginTop: 22,
        opacity: 0.9,
      }}>{item.tease}</div>

      {days > 0 && (
        <div style={{
          marginTop: 18,
          padding: '10px 14px',
          background: 'rgba(20,4,8,0.4)',
          border: '1px solid rgba(232,201,160,0.25)',
          borderRadius: 2,
          display: 'inline-block',
        }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 11,
            color: '#E8C9A0',
            letterSpacing: 2,
            textTransform: 'uppercase',
            opacity: 0.7,
          }}>en</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 28,
            color: '#F4E8D8',
            fontWeight: 500,
            lineHeight: 1,
            marginTop: 2,
          }}>{days}</div>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 11,
            color: '#E8C9A0',
            letterSpacing: 2,
            textTransform: 'uppercase',
            opacity: 0.7,
            marginTop: 2,
          }}>{days === 1 ? 'día' : 'días'}</div>
        </div>
      )}

      <div style={{
        marginTop: 18,
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 13,
        color: 'rgba(244,232,216,0.55)',
        textWrap: 'pretty',
      }}>una carta te espera<br/>· coming soon ·</div>
    </div>
  );
}

function CartasScene() {
  const ALL_CARDS = React.useMemo(() => [
    ...LETTERS.map(l => ({ kind: 'letter', data: l })),
    ...UPCOMING.map(u => ({ kind: 'upcoming', data: u })),
  ], []);
  const [idx, setIdx] = React.useState(0);
  const trackRef = React.useRef(null);
  const scrollTimer = React.useRef(null);

  // Snap-track scroll: read scrollLeft on idle, derive idx
  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    if (scrollTimer.current) clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => {
      const w = el.clientWidth;
      if (w === 0) return;
      const next = Math.round(el.scrollLeft / w);
      if (next !== idx) setIdx(next);
    }, 90);
  };

  const goTo = (i) => {
    const next = Math.max(0, Math.min(ALL_CARDS.length - 1, i));
    const el = trackRef.current;
    if (!el) { setIdx(next); return; }
    el.scrollTo({ left: next * el.clientWidth, behavior: 'smooth' });
  };

  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      padding: 'calc(env(safe-area-inset-top, 0px) + 92px) 16px calc(env(safe-area-inset-bottom, 0px) + 4px)',
      animation: 'sceneFadeIn 0.8s ease-out',
      overflow: 'hidden',
    }}>
      <style>{`.cartas-track::-webkit-scrollbar{display:none}.cartas-card::-webkit-scrollbar{display:none}`}</style>

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 12,
        color: '#E8C9A0',
        letterSpacing: 4,
        textTransform: 'uppercase',
        opacity: 0.8,
        marginBottom: 4,
      }}>· cartas para ti ·</div>

      {/* Horizontal snap-scroll track. Each card is a vertically-scrollable column. */}
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="cartas-track"
        style={{
          flex: 1, width: '100%', maxWidth: 380,
          display: 'flex', flexDirection: 'row',
          overflowX: 'auto', overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          scrollBehavior: 'smooth',
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
        }}>
        {ALL_CARDS.map((c, i) => (
          <div
            key={i}
            className="cartas-card"
            style={{
              minWidth: '100%', width: '100%',
              scrollSnapAlign: 'center',
              scrollSnapStop: 'always',
              overflowY: 'auto',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              paddingBottom: 8,
            }}>
            {c.kind === 'letter'
              ? <LetterCard letter={c.data} />
              : <UpcomingCard item={c.data} />
            }
          </div>
        ))}
      </div>

      {/* Pagination footer + progress bar */}
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 6, marginTop: 8, width: '100%', maxWidth: 380,
      }}>
        <div style={{
          width: '70%', height: 1.5,
          background: 'rgba(232,201,160,0.14)',
          borderRadius: 1,
          overflow: 'hidden',
        }}>
          <div style={{
            width: `${((idx + 1) / ALL_CARDS.length) * 100}%`,
            height: '100%',
            background: 'linear-gradient(90deg, rgba(232,201,160,0.3), #E8C9A0)',
            transition: 'width 0.35s ease-out',
            borderRadius: 1,
          }} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: 12,
        }}>
          <button onClick={() => goTo(idx - 1)}
            disabled={idx === 0}
            style={{ ...cartasBtn, opacity: idx === 0 ? 0.3 : 1 }}>‹</button>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 12,
            color: '#E8C9A0',
            letterSpacing: 2,
            opacity: 0.8,
            minWidth: 60, textAlign: 'center',
          }}>
            {idx + 1} / {ALL_CARDS.length}
          </div>
          <button onClick={() => goTo(idx + 1)}
            disabled={idx === ALL_CARDS.length - 1}
            style={{ ...cartasBtn, opacity: idx === ALL_CARDS.length - 1 ? 0.3 : 1 }}>›</button>
        </div>
      </div>
    </div>
  );
}

const cartasBtn = {
  width: 32, height: 32, borderRadius: '50%',
  background: 'rgba(232,201,160,0.08)',
  border: '1px solid rgba(232,201,160,0.4)',
  color: '#E8C9A0',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 20,
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 0, lineHeight: 1,
};

Object.assign(window, { CartasScene, LetterCard, UpcomingCard });
