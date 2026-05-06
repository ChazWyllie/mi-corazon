// Scenes for Mi Corazón
// WelcomeScene, LetterScene, MemoriesScene, HeartGardenScene, FinaleScene

const VELVET_BG = `
  radial-gradient(ellipse 120% 80% at 50% 0%, #4A0812 0%, #2A0408 40%, #1A0508 70%, #0F0206 100%),
  radial-gradient(ellipse 60% 40% at 50% 100%, #3A0610 0%, transparent 60%)
`;

// ─────────────────────────────────────────────────────────────
// Welcome Scene
// ─────────────────────────────────────────────────────────────
function WelcomeScene({ onEnter }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '60px 28px 40px',
      animation: 'sceneFadeIn 1.2s ease-out',
    }}>
      {/* Lily top-left & tulip top-right decoration */}
      <div style={{ position: 'absolute', top: 72, left: -20, opacity: 0.85,
        animation: 'floatSlow 6s ease-in-out infinite' }}>
        <BigLily size={90} />
      </div>
      <div style={{ position: 'absolute', top: 90, right: -10, opacity: 0.9,
        animation: 'floatSlow 7s ease-in-out infinite reverse', transform: 'rotate(15deg)' }}>
        <BigTulip size={70} />
      </div>

      {/* Eyebrow */}
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 13,
        color: '#E8C9A0',
        letterSpacing: 4,
        textTransform: 'uppercase',
        opacity: 0.85,
        marginBottom: 18,
        marginTop: 20,
        whiteSpace: 'nowrap',
        animation: 'fadeInUp 1.6s ease-out 0.3s both',
      }}>
        · Para ti ·
      </div>

      {/* Title: Mi Corazón */}
      <div style={{
        position: 'relative',
        animation: 'titleBloom 2s ease-out 0.6s both',
      }}>
        <Flourish width={220} color="#E8C9A0" style={{
          display: 'block', margin: '0 auto 8px', opacity: 0.75,
        }} />
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontWeight: 500,
          color: '#F4E8D8',
          textAlign: 'center',
          margin: 0,
          lineHeight: 1,
          letterSpacing: -1,
          textShadow: `
            0 0 20px rgba(232,201,160,0.35),
            0 0 40px rgba(200,16,46,0.25),
            0 2px 8px rgba(0,0,0,0.5)
          `,
          animation: 'candleFlicker 4s ease-in-out infinite',
        }}>
          <span style={{ display: 'block', fontSize: 44, lineHeight: 0.9 }}>Mi</span>
          <span style={{
            display: 'block',
            fontFamily: "'Pinyon Script', cursive",
            fontStyle: 'normal',
            fontWeight: 400,
            fontSize: 88,
            color: '#FFD1DC',
            lineHeight: 1.1,
            marginTop: 4,
            letterSpacing: 0,
          }}>Corazón</span>
        </h1>
        <Flourish width={220} color="#E8C9A0" style={{
          display: 'block', margin: '8px auto 0', opacity: 0.75, transform: 'scaleY(-1)',
        }} />
      </div>

      {/* Greeting */}
      <div style={{
        textAlign: 'center',
        marginTop: 28,
        animation: 'fadeInUp 1.6s ease-out 1.4s both',
      }}>
        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 24,
          color: '#F4E8D8',
          lineHeight: 1,
        }}>Bienvenida,</div>
        <div style={{
          fontFamily: "'Pinyon Script', cursive",
          fontSize: 48,
          color: '#FFB0B8',
          lineHeight: 1,
          marginTop: 10,
          paddingBottom: 16,
        }}>mi amor</div>
      </div>

      {/* Jenni */}
      <div style={{
        marginTop: 8,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: 12,
        color: '#E8C9A0',
        letterSpacing: 6,
        textTransform: 'uppercase',
        opacity: 0.8,
        whiteSpace: 'nowrap',
        animation: 'fadeInUp 1.6s ease-out 1.8s both',
      }}>
        · Jenni ·
      </div>

      {/* Enter button */}
      <button onClick={onEnter} style={{
        marginTop: 40,
        background: 'linear-gradient(180deg, #C8102E 0%, #8B0000 100%)',
        border: '1px solid #E8C9A0',
        borderRadius: 999,
        padding: '14px 36px',
        color: '#F4E8D8',
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 18,
        letterSpacing: 3,
        textTransform: 'uppercase',
        cursor: 'pointer',
        boxShadow: `
          0 0 0 4px rgba(232,201,160,0.15),
          0 8px 24px rgba(200,16,46,0.4),
          inset 0 1px 0 rgba(255,255,255,0.25)
        `,
        animation: 'pulseGlow 2.4s ease-in-out infinite, fadeInUp 1.6s ease-out 2.2s both',
      }}>
        entra ♥
      </button>

      {/* Footer whisper */}
      <div style={{
        position: 'absolute', bottom: 50,
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 12,
        color: '#E8C9A0',
        opacity: 0.55,
        letterSpacing: 2,
        animation: 'fadeInUp 1.6s ease-out 2.6s both',
      }}>
        hecho con amor · abril 2026
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Letter Scene — a love letter reveal
// ─────────────────────────────────────────────────────────────
function LetterScene() {
  const [opened, setOpened] = React.useState(false);
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '80px 24px 60px',
      animation: 'sceneFadeIn 0.8s ease-out',
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 13,
        color: '#E8C9A0',
        letterSpacing: 5,
        textTransform: 'uppercase',
        opacity: 0.8,
        marginBottom: 14,
      }}>una carta</div>

      {!opened ? (
        <button onClick={() => setOpened(true)} style={{
          background: 'none', border: 'none', cursor: 'pointer',
          padding: 0, position: 'relative',
          animation: 'floatSlow 3s ease-in-out infinite',
        }}>
          {/* envelope */}
          <div style={{
            width: 240, height: 160, position: 'relative',
            background: 'linear-gradient(135deg, #F4E8D8 0%, #E8D4B0 100%)',
            borderRadius: 4,
            boxShadow: '0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px #C9A875',
          }}>
            {/* flap */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(180deg, #E8D4B0 0%, #D4B888 100%)',
              clipPath: 'polygon(0 0, 50% 55%, 100% 0)',
              borderBottom: '1px solid #C9A875',
            }} />
            {/* wax seal */}
            <div style={{
              position: 'absolute', left: '50%', top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 56, height: 56, borderRadius: '50%',
              background: 'radial-gradient(circle at 35% 30%, #E63946, #8B0000 60%, #3A0008)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.2), inset 0 -2px 4px rgba(0,0,0,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#E8C9A0',
              fontFamily: "'Pinyon Script', cursive",
              fontSize: 32,
              textShadow: '0 1px 2px rgba(0,0,0,0.4)',
            }}>J</div>
          </div>
          <div style={{
            marginTop: 20,
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 16,
            color: '#F4E8D8',
            letterSpacing: 2,
          }}>toca para abrir</div>
        </button>
      ) : (
        <div style={{
          background: 'linear-gradient(180deg, #F8EFDC 0%, #EFE3C8 100%)',
          borderRadius: 2,
          padding: '28px 24px',
          width: '100%',
          maxWidth: 320,
          boxShadow: '0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px #C9A875',
          animation: 'letterOpen 1s ease-out',
          position: 'relative',
          fontFamily: "'Cormorant Garamond', serif",
          color: '#3A1A08',
        }}>
          {/* edge darkening */}
          <div style={{
            position: 'absolute', inset: 0,
            boxShadow: 'inset 0 0 30px rgba(139,69,19,0.25)',
            pointerEvents: 'none', borderRadius: 2,
          }} />
          <div style={{ fontFamily: "'Pinyon Script', cursive", fontSize: 32, color: '#8B0000', lineHeight: 1, marginBottom: 6 }}>
            Jenni,
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, fontStyle: 'italic', margin: '8px 0' }}>
            La distancia entre nosotros es solo geografía. Mi corazón está contigo, siempre,
            en cada amanecer, en cada sueño, en cada latido.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, fontStyle: 'italic', margin: '8px 0' }}>
            Te extraño de maneras que las palabras no pueden describir. Extraño tu risa,
            tu voz, la manera en que el mundo se siente más cálido cuando estás cerca.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.6, fontStyle: 'italic', margin: '8px 0' }}>
            Pero cada día que pasa es un día más cerca de ti. Y hasta entonces,
            este pequeño jardín es tuyo, lleno de las flores que te daría si pudiera.
          </p>
          <div style={{
            fontFamily: "'Pinyon Script', cursive", fontSize: 26, color: '#8B0000',
            textAlign: 'right', marginTop: 12, lineHeight: 1,
          }}>
            Tuyo, siempre.
          </div>
          <div style={{ textAlign: 'center', marginTop: 16, color: '#8B0000', opacity: 0.6 }}>♥ ♥ ♥</div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Memories Scene — story cards with photo placeholders
// ─────────────────────────────────────────────────────────────
const MEMORIES = [
  {
    photo: 'photos/01-lanterns.jpeg',
    title: 'La primera vez',
    text: 'que te vi sonreír, supe que mi vida no volvería a ser la misma. Bajo la luna, con linternas en el agua, te pregunté si querías ser mía.',
    tag: 'nuestro comienzo · 10·4·25',
    dateISO: '2025-10-04',
  },
  {
    photo: 'photos/movies-bench.jpeg',
    title: 'Después del cine',
    text: 'sentados en esa banca, compartiendo helado, las luces del cine encendidas detrás de nosotros. Los momentos más simples se sienten como una película contigo.',
    tag: 'noches sencillas',
  },
  {
    photo: 'photos/02-nye-2026.jpeg',
    title: 'Año nuevo',
    text: 'el primer beso del 2026 fue tuyo, y todos los demás también lo serán. Contigo, cada año se siente como un nuevo comienzo.',
    tag: 'noche vieja · 2026',
    dateISO: '2025-12-31',
  },
  {
    photo: 'photos/03-trees.jpeg',
    title: 'Mirando al cielo',
    text: 'entre los árboles altos, miro hacia arriba y pienso en ti. El mismo cielo, los mismos pinos, el mismo amor.',
    tag: 'momentos quietos',
  },
  {
    photo: 'photos/04-pickleball.jpeg',
    title: 'Flores y pickleball',
    text: 'flores en la cancha, tú jugando bajo el cielo azul. Las cosas pequeñas, mi amor, son las que más me llenan el corazón.',
    tag: 'lo que amo de ti',
  },
  {
    photo: 'photos/05-mountain.jpeg',
    title: 'En la cima',
    text: 'subir contigo y descansar en mis brazos al llegar arriba. No hay vista más hermosa que tú a mi lado.',
    tag: 'aventuras juntos',
  },
  {
    photo: 'photos/06-night-kiss.jpeg',
    title: 'Bajo las palmeras',
    text: 'te abrazo en medio de la calle, las palmeras nos cuidan, las luces nos bendicen. Quiero mil noches más así contigo.',
    tag: 'noches contigo',
  },
  {
    photo: 'photos/christmas-tree.jpeg',
    title: 'Nuestra primera navidad',
    text: 'suéteres verdes, luces del árbol, un beso en la sien. Tú haces que cada fiesta se sienta como un hogar.',
    tag: 'navidad · 2025',
  },
  {
    photo: 'photos/yoga-mirror.jpeg',
    title: 'Pilates juntos',
    text: 'tú haciéndome reír en medio del estudio, yo solo queriendo abrazarte. Hasta el ejercicio se siente bonito a tu lado.',
    tag: 'rutinas contigo',
  },
  {
    photo: 'photos/lilies.jpeg',
    title: 'Flores para ti',
    text: 'lirios rosados y rosas blancas, porque mereces todas las flores del mundo. Y aún así, ninguna es tan hermosa como tú.',
    tag: 'pequeños detalles',
  },
];

function MemoriesScene() {
  const [idx, setIdx] = React.useState(0);
  const [hearts, setHearts] = React.useState([]);
  const m = MEMORIES[idx];
  const lastTap = React.useRef(0);
  const startX = React.useRef(null);

  // "hace X días" caption
  const daysAgo = (() => {
    if (!m.dateISO) return null;
    const d = new Date(m.dateISO + 'T00:00:00');
    const now = new Date();
    const ms = now - d;
    const n = Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
    return n;
  })();

  // Double-tap heart-burst
  const onPhotoTap = (e) => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      const rect = e.currentTarget.getBoundingClientRect();
      const cx = (e.clientX ?? e.changedTouches?.[0]?.clientX ?? rect.left + rect.width / 2) - rect.left;
      const cy = (e.clientY ?? e.changedTouches?.[0]?.clientY ?? rect.top + rect.height / 2) - rect.top;
      const id = Math.random();
      setHearts(h => [...h, { id, x: cx, y: cy }]);
      setTimeout(() => setHearts(h => h.filter(x => x.id !== id)), 750);
      lastTap.current = 0;
    } else {
      lastTap.current = now;
    }
  };

  // Swipe to navigate
  const onTouchStart = (e) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (startX.current == null) return;
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 50) {
      if (dx < 0) setIdx((idx + 1) % MEMORIES.length);
      else setIdx((idx - 1 + MEMORIES.length) % MEMORIES.length);
    }
    startX.current = null;
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '90px 24px 60px',
        animation: 'sceneFadeIn 0.8s ease-out',
      }}>
      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 13,
        color: '#E8C9A0',
        letterSpacing: 5,
        textTransform: 'uppercase',
        opacity: 0.8,
        marginBottom: 14,
      }}>recuerdos</div>

      {/* Memory card w/ photo placeholder */}
      <div key={idx} style={{
        width: '100%', maxWidth: 320,
        background: 'linear-gradient(180deg, rgba(244,232,216,0.08) 0%, rgba(244,232,216,0.03) 100%)',
        border: '1px solid rgba(232,201,160,0.35)',
        borderRadius: 3,
        padding: 18,
        animation: 'memoryIn 0.6s ease-out',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
      }}>
        {/* photo frame — double-tap to heart, slow Ken-Burns zoom */}
        <div onClick={onPhotoTap} style={{
          width: '100%', aspectRatio: '4/5',
          border: '1px solid rgba(232,201,160,0.4)',
          position: 'relative',
          marginBottom: 14,
          boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)',
          overflow: 'hidden',
          cursor: 'pointer',
          WebkitTapHighlightColor: 'transparent',
        }}>
          {/* Inner zooming layer (so the frame stays still) */}
          <div style={{
            position: 'absolute', inset: 0,
            background: m.photo ? `url(${m.photo}) center/cover no-repeat` : `linear-gradient(135deg, #2A0608 0%, #3A0810 100%)`,
            animation: 'kenBurns 9s ease-in-out infinite alternate',
          }} />
          {!m.photo && <div style={{
            position: 'relative', zIndex: 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            width: '100%', height: '100%',
            fontFamily: 'ui-monospace, Menlo, monospace',
            fontSize: 10, color: 'rgba(232,201,160,0.6)',
            letterSpacing: 2, textTransform: 'uppercase',
            textAlign: 'center', lineHeight: 1.6,
          }}>[ foto de ]<br/>nosotros</div>}
          {/* corner marks */}
          {[
            { top: 4, left: 4 }, { top: 4, right: 4 },
            { bottom: 4, left: 4 }, { bottom: 4, right: 4 },
          ].map((p, i) => (
            <div key={i} style={{
              position: 'absolute', width: 10, height: 10,
              borderColor: '#E8C9A0',
              borderStyle: 'solid',
              borderWidth: `${p.top !== undefined ? 1 : 0}px ${p.right !== undefined ? 1 : 0}px ${p.bottom !== undefined ? 1 : 0}px ${p.left !== undefined ? 1 : 0}px`,
              ...p,
              opacity: 0.7,
            }} />
          ))}
          {/* Double-tap hearts */}
          {hearts.map(h => (
            <div key={h.id} style={{
              position: 'absolute', left: h.x, top: h.y,
              transform: 'translate(-50%, -50%)',
              fontSize: 64, color: '#FF6B85',
              textShadow: '0 0 20px rgba(255,107,133,0.7), 0 4px 12px rgba(0,0,0,0.4)',
              animation: 'heartTapBurst 750ms ease-out forwards',
              pointerEvents: 'none',
            }}>♥</div>
          ))}
        </div>

        <div style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 11,
          color: '#E8C9A0',
          letterSpacing: 3,
          textTransform: 'uppercase',
          opacity: 0.7,
          marginBottom: 4,
        }}>· {m.tag} ·</div>
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 28,
          color: '#F4E8D8',
          margin: '0 0 8px',
          lineHeight: 1.1,
        }}>{m.title}</h3>
        <p style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontStyle: 'italic',
          fontSize: 16,
          color: 'rgba(244,232,216,0.85)',
          lineHeight: 1.5,
          margin: 0,
        }}>{m.text}</p>
        {daysAgo !== null && (
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 11,
            color: 'rgba(232,201,160,0.6)',
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginTop: 10,
          }}>· hace {daysAgo} {daysAgo === 1 ? 'día' : 'días'} ·</div>
        )}
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', gap: 10, marginTop: 20, alignItems: 'center' }}>
        <button onClick={() => setIdx((idx - 1 + MEMORIES.length) % MEMORIES.length)}
          style={navBtnStyle}>‹</button>
        <div style={{ display: 'flex', gap: 6 }}>
          {MEMORIES.map((_, i) => (
            <div key={i} style={{
              width: 6, height: 6, borderRadius: '50%',
              background: i === idx ? '#E8C9A0' : 'rgba(232,201,160,0.3)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>
        <button onClick={() => setIdx((idx + 1) % MEMORIES.length)}
          style={navBtnStyle}>›</button>
      </div>
    </div>
  );
}

const navBtnStyle = {
  width: 36, height: 36, borderRadius: '50%',
  background: 'rgba(232,201,160,0.08)',
  border: '1px solid rgba(232,201,160,0.4)',
  color: '#E8C9A0',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 22,
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 0, lineHeight: 1,
};

// ─────────────────────────────────────────────────────────────
// Heart Garden — moved to jardin.jsx
// ─────────────────────────────────────────────────────────────
// (Heart garden lives in jardin.jsx now — HeartGardenScene is provided by that module.)

// ─────────────────────────────────────────────────────────────
// Finale — signature
// ─────────────────────────────────────────────────────────────
function FinaleScene() {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '90px 28px 60px',
      animation: 'sceneFadeIn 0.8s ease-out',
      textAlign: 'center',
    }}>
      {/* Ornamental rose centerpiece */}
      <div style={{
        animation: 'floatSlow 5s ease-in-out infinite',
        marginBottom: 8,
      }}>
        <BigRose size={130} />
      </div>

      <Flourish width={240} color="#E8C9A0" style={{ opacity: 0.7, marginBottom: 10 }} />

      <div style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 22,
        color: '#F4E8D8',
        lineHeight: 1.5,
        marginBottom: 16,
        textWrap: 'pretty',
      }}>
        <span style={{ fontFamily: "'Pinyon Script', cursive", fontSize: 38, color: '#FFB0B8', display: 'block', marginBottom: 6, lineHeight: 1 }}>
          siempre
        </span>
        I am the love of your life,<br/>
        as you are the love of mine<br/>
        <span style={{ fontFamily: "'Pinyon Script', cursive", fontSize: 32, color: '#FFB0B8' }}>
          forever and always.
        </span>
      </div>

      <Flourish width={240} color="#E8C9A0" style={{ opacity: 0.7, transform: 'scaleY(-1)' }} />

      <div style={{
        marginTop: 24,
        fontFamily: "'Cormorant Garamond', serif",
        fontStyle: 'italic',
        fontSize: 13,
        color: '#E8C9A0',
        letterSpacing: 5,
        textTransform: 'uppercase',
        opacity: 0.75,
      }}>
        te amo · Jenni · te amo
      </div>
    </div>
  );
}

Object.assign(window, {
  VELVET_BG, WelcomeScene, LetterScene, MemoriesScene, FinaleScene,
});
