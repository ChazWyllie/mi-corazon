// Mi Corazón — main app component

const SCENES = ['welcome', 'cartas', 'memories', 'garden', 'finale'];
const SCENE_LABELS = {
  welcome: 'inicio',
  cartas: 'cartas',
  memories: 'recuerdos',
  garden: 'jardín',
  finale: 'siempre',
};

function MiCorazonApp() {
  const [sceneIdx, setSceneIdx] = React.useState(0);
  const [entered, setEntered] = React.useState(false);
  const scene = SCENES[sceneIdx];

  // Always start at the welcome screen on each visit; do not restore "entered"
  // from localStorage. The welcome ritual is part of the gift.

  const enter = () => {
    setEntered(true);
    setSceneIdx(1);
  };

  const goTo = (i) => setSceneIdx(Math.max(0, Math.min(SCENES.length - 1, i)));

  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      background: VELVET_BG,
      overflow: 'hidden',
      fontFamily: "'Cormorant Garamond', serif",
      color: '#F4E8D8',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        boxShadow: 'inset 0 0 120px rgba(0,0,0,0.7)',
        zIndex: 4,
      }} />
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        opacity: 0.08, mixBlendMode: 'overlay',
        background: `repeating-radial-gradient(circle at 20% 30%, rgba(200,16,46,0.4) 0%, transparent 40%),
                     repeating-radial-gradient(circle at 80% 70%, rgba(200,16,46,0.3) 0%, transparent 50%)`,
        zIndex: 4,
      }} />

      <PetalLayer count={14} frontLayer={false} />

      {scene === 'welcome' && <WelcomeScene onEnter={enter} />}
      {scene === 'cartas' && <CartasScene />}
      {scene === 'memories' && <MemoriesScene />}
      {scene === 'garden' && <HeartGardenScene />}
      {scene === 'finale' && <FinaleScene />}

      {entered && <PetalLayer count={8} frontLayer={true} />}

      {entered && scene !== 'welcome' && (
        <div style={{
          position: 'absolute',
          top: 'calc(env(safe-area-inset-top, 0px) + 14px)',
          left: 0, right: 0, zIndex: 20,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '0 12px',
        }}>
          <div style={{
            display: 'flex', gap: 8,
            background: 'rgba(20,4,8,0.7)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(232,201,160,0.3)',
            borderRadius: 999,
            padding: '5px 8px',
          }}>
            {SCENES.slice(1).map((s, i) => (
              <button key={s} onClick={() => goTo(i + 1)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px 8px',
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 11,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                color: s === scene ? '#F4E8D8' : 'rgba(232,201,160,0.55)',
                borderBottom: s === scene ? '1px solid #E8C9A0' : '1px solid transparent',
                transition: 'all 0.3s',
              }}>
                {SCENE_LABELS[s]}
              </button>
            ))}
          </div>
        </div>
      )}

      {entered && scene !== 'welcome' && scene !== 'cartas' && (
        <div style={{
          position: 'absolute',
          bottom: 'calc(env(safe-area-inset-bottom, 0px) + 24px)',
          left: 0, right: 0, zIndex: 20,
          display: 'flex', justifyContent: 'space-between',
          padding: '0 18px', pointerEvents: 'none',
        }}>
          <button onClick={() => goTo(sceneIdx - 1)}
            disabled={sceneIdx <= 1}
            style={{ ...arrowBtn, opacity: sceneIdx <= 1 ? 0.3 : 1, pointerEvents: 'auto' }}>‹</button>
          <button onClick={() => goTo(sceneIdx + 1)}
            disabled={sceneIdx >= SCENES.length - 1}
            style={{ ...arrowBtn, opacity: sceneIdx >= SCENES.length - 1 ? 0.3 : 1, pointerEvents: 'auto' }}>›</button>
        </div>
      )}
    </div>
  );
}

const arrowBtn = {
  width: 40, height: 40, borderRadius: '50%',
  background: 'rgba(20,4,8,0.7)',
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  border: '1px solid rgba(232,201,160,0.5)',
  color: '#E8C9A0',
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 24,
  cursor: 'pointer',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: 0, lineHeight: 1,
  boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
};

Object.assign(window, { MiCorazonApp });
