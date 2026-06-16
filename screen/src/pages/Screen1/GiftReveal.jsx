import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  motion, AnimatePresence,
  useMotionValue, useAnimation, useMotionValueEvent,
} from 'framer-motion';
import FloatingHearts from '../../components/FloatingHearts';

// ✏️ ĐỔI thành ngày & tháng sinh nhật thực tế
const CORRECT_DAY   = 24;
const CORRECT_MONTH = 11;

/* ── Blue palette ─────────────────────────────────────────── */
const B = {
  primary:  '#4a8fe8',
  bright:   '#6aaeff',
  pale:     '#c8e0ff',
  glow:     'rgba(74,143,232,0.28)',
  glowMd:   'rgba(74,143,232,0.12)',
  dimNum:   'rgba(100,170,255,0.13)',
  band:     'rgba(74,143,232,0.09)',
  bandBdr:  'rgba(74,143,232,0.38)',
  fadeNav:  (a) => `rgba(3,8,22,${a})`,
  correct:  '#4ade80',
  wrong:    '#f87171',
};

const VISIBLE = 3;

/* ── Drum — nhận kích thước qua prop ─────────────────────── */
function Drum({ value, min, max, onChange, label, itemH, drumW }) {
  const count  = max - min + 1;
  const offset = Math.floor(VISIBLE / 2) * itemH;
  const getY   = (v) => -((v - min) * itemH) + offset;

  const yMV  = useMotionValue(getY(value));
  const anim = useAnimation();
  const [liveVal, setLiveVal] = useState(value);
  const sfxRef       = useRef(null);
  const mountedRef   = useRef(false);

  useEffect(() => {
    sfxRef.current = new Audio('/music/effect/soundEffect_Conbination_lock.mp3');
    sfxRef.current.volume = 0.55;
    return () => { sfxRef.current = null; };
  }, []);

  // Phát sound mỗi khi liveVal thay đổi (bỏ qua lần render đầu)
  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return; }
    if (sfxRef.current) {
      sfxRef.current.currentTime = 0;
      sfxRef.current.play().catch(() => {});
    }
  }, [liveVal]);

  useMotionValueEvent(yMV, 'change', (latest) => {
    const idx = Math.round((-latest + offset) / itemH);
    const v   = Math.max(0, Math.min(count - 1, idx)) + min;
    setLiveVal((prev) => (prev !== v ? v : prev));
  });

  useEffect(() => {
    anim.start({ y: getY(value), transition: { type: 'spring', stiffness: 360, damping: 30 } });
  }, [value]);

  const handleDragEnd = () => {
    const idx  = Math.round((-yMV.get() + offset) / itemH);
    const newV = Math.max(0, Math.min(count - 1, idx)) + min;
    anim.start({ y: getY(newV), transition: { type: 'spring', stiffness: 360, damping: 30 } });
    onChange(newV);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <p style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
        color: B.primary, opacity: 0.8, margin: 0,
      }}>{label}</p>

      <div style={{
        width: drumW, height: VISIBLE * itemH,
        overflow: 'hidden', position: 'relative',
        borderRadius: 14,
        background: 'rgba(8,18,45,0.7)',
        border: '1px solid rgba(74,143,232,0.18)',
        cursor: 'grab',
        boxShadow: 'inset 0 2px 12px rgba(0,0,0,0.4)',
      }}>
        <div style={{
          position: 'absolute', left: 0, right: 0, top: 0,
          height: itemH * 0.85, zIndex: 3, pointerEvents: 'none',
          background: `linear-gradient(to bottom, ${B.fadeNav(1)} 10%, ${B.fadeNav(0)})`,
        }} />
        <div style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          height: itemH * 0.85, zIndex: 3, pointerEvents: 'none',
          background: `linear-gradient(to top, ${B.fadeNav(1)} 10%, ${B.fadeNav(0)})`,
        }} />
        <div style={{
          position: 'absolute',
          top: Math.floor(VISIBLE / 2) * itemH, left: 5, right: 5, height: itemH,
          background: B.band,
          borderTop: `1px solid ${B.bandBdr}`,
          borderBottom: `1px solid ${B.bandBdr}`,
          borderRadius: 8,
          zIndex: 2, pointerEvents: 'none',
          boxShadow: `0 0 16px ${B.glowMd}`,
        }} />

        <motion.div
          drag="y"
          dragConstraints={{ top: getY(max), bottom: getY(min) }}
          dragElastic={0.04}
          dragMomentum={false}
          onDragEnd={handleDragEnd}
          animate={anim}
          style={{ y: yMV, touchAction: 'none' }}
        >
          {Array.from({ length: count }, (_, i) => i + min).map((n) => {
            const sel = n === liveVal;
            return (
              <div key={n} style={{
                height: itemH,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Dancing Script', cursive",
                fontWeight: 700,
                fontSize: sel ? Math.round(itemH * 0.82) : Math.round(itemH * 0.40),
                color: sel ? B.bright : B.dimNum,
                textShadow: sel ? `0 0 20px ${B.glow}` : 'none',
                transition: 'font-size 0.13s, color 0.13s, text-shadow 0.13s',
                userSelect: 'none', pointerEvents: 'none',
              }}>
                {String(n).padStart(2, '0')}
              </div>
            );
          })}
        </motion.div>
      </div>

      <p style={{
        fontFamily: "'Lato', sans-serif",
        fontSize: 9, color: B.primary, opacity: 0.45, letterSpacing: 1, margin: 0,
      }}>↕ vuốt</p>
    </div>
  );
}

/* ── Sparkles ─────────────────────────────────────────────── */
const SPARKLES = Array.from({ length: 18 }, (_, i) => {
  const a = (i / 18) * Math.PI * 2;
  const r = 90 + Math.random() * 70;
  return { id: i, x: Math.cos(a) * r, y: Math.sin(a) * r, icon: ['✨','💖','⭐','🌸','💫'][i % 5] };
});

/* ── Ocean background ─────────────────────────────────────── */
const LIGHT_RAYS = Array.from({ length: 7 }, (_, i) => ({
  id: i,
  left:    5 + i * 14,
  angle:   -10 + i * 3.5,
  width:   55 + (i % 3) * 30,
  opBase:  0.032 + (i % 4) * 0.012,
  dur:     3.5 + i * 0.55,
  delay:   i * 0.38,
}));
const OCEAN_PARTICLES = Array.from({ length: 32 }, (_, i) => ({
  id: i,
  left:   Math.random() * 100,
  top:    Math.random() * 100,
  size:   0.7 + Math.random() * 2.0,
  dur:    5 + Math.random() * 7,
  delay:  Math.random() * 6,
  driftY: (Math.random() - 0.5) * 28,
  driftX: (Math.random() - 0.5) * 18,
}));

function OceanBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
      {LIGHT_RAYS.map((r) => (
        <motion.div
          key={r.id}
          style={{
            position: 'absolute', top: 0, left: `${r.left}%`,
            width: r.width, height: '72%',
            background: 'linear-gradient(to bottom, rgba(80,205,255,0.13), rgba(40,150,210,0.04), transparent)',
            transform: `rotate(${r.angle}deg)`,
            transformOrigin: 'top center',
          }}
          animate={{ opacity: [r.opBase * 0.4, r.opBase, r.opBase * 0.6, r.opBase * 0.9, r.opBase * 0.4] }}
          transition={{ duration: r.dur, delay: r.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {OCEAN_PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute', left: `${p.left}%`, top: `${p.top}%`,
            width: p.size, height: p.size, borderRadius: '50%',
            background: 'rgba(140,225,255,0.45)',
          }}
          animate={{
            opacity: [0, 0.55, 0.3, 0.55, 0],
            y: [0, p.driftY, 0, -p.driftY, 0],
            x: [0, p.driftX, 0, -p.driftX, 0],
          }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ── Main ─────────────────────────────────────────────────── */
export default function GiftReveal() {
  const [day,     setDay]     = useState(1);
  const [month,   setMonth]   = useState(1);
  const [phase,   setPhase]   = useState('lock');
  const [isWrong, setIsWrong] = useState(false);
  const navigate = useNavigate();

  // Responsive sizing — đọc 1 lần khi mount
  const mob = window.innerWidth < 480;
  const sz = {
    itemH:        mob ? 50 : 66,
    drumW:        mob ? 74 : 96,
    drumsGap:     mob ? 6  : 10,
    lockPad:      mob ? '16px 18px 14px' : '30px 40px 26px',
    lockGap:      mob ? 14 : 20,
    lockRadius:   mob ? 22 : 28,
    lockIconSz:   mob ? 32 : 42,
    sepFont:      mob ? 28 : 40,
    prevPad:      mob ? '5px 16px' : '8px 28px',
    prevNumFont:  mob ? 24 : 32,
    prevSlashFont:mob ? 14 : 20,
    btnPad:       mob ? '11px 30px' : '14px 48px',
    btnFont:      mob ? 14 : 17,
    hintFont:     mob ? 13 : 15,
    wrongFont:    mob ? 16 : 20,
    centerPad:    mob ? '28px 12px' : '60px 24px',
  };

  const handleUnlock = () => {
    if (day === CORRECT_DAY && month === CORRECT_MONTH) {
      new Audio('/music/effect/soundEffect_OpenPop.mp3').play().catch(() => {});
      setPhase('unlocking');
      setTimeout(() => setPhase('gift'), 1400);
    } else {
      new Audio('/music/effect/soundEffect_Wrong.mp3').play().catch(() => {});
      setIsWrong(true);
      setTimeout(() => setIsWrong(false), 700);
    }
  };

  const handleGiftClick = () => {
    if (phase !== 'gift') return;
    new Audio('/music/effect/soundEffect_MagicOpenGift.mp3').play().catch(() => {});
    setPhase('opening');
    setTimeout(() => setPhase('revealed'), 1100);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={s.page}>
      <OceanBackground />
      <FloatingHearts count={22} dark />

      <div style={{ ...s.center, padding: sz.centerPad }}>

        {/* ══ LOCK ══ */}
        <AnimatePresence>
          {(phase === 'lock' || phase === 'wrong' || phase === 'unlocking') && (
            <motion.div
              key="lock"
              style={s.lockSection}
              exit={{ y: -120, opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.5, ease: 'easeIn' }}
            >
              <motion.p
                style={{ ...s.topHint, fontSize: sz.hintFont }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.4, repeat: Infinity }}
              >
                Nhập ngày sinh nhật để mở quà 🎁
              </motion.p>

              <motion.div
                style={{
                  ...s.lockBoxBase,
                  padding:      sz.lockPad,
                  gap:          sz.lockGap,
                  borderRadius: sz.lockRadius,
                  border: `2px solid ${isWrong ? B.wrong : phase === 'unlocking' ? B.correct : B.primary}`,
                  boxShadow: isWrong
                    ? '0 0 40px rgba(248,113,113,0.25)'
                    : phase === 'unlocking'
                    ? '0 0 50px rgba(74,222,128,0.2)'
                    : `0 0 50px ${B.glow}, inset 0 1px 0 rgba(100,170,255,0.08)`,
                }}
                animate={
                  isWrong
                    ? { x: [0, -13, 13, -9, 9, -4, 4, 0] }
                    : phase === 'unlocking'
                    ? { scale: [1, 1.05, 0.97, 1.02, 1] }
                    : {}
                }
                transition={{ duration: 0.42 }}
              >
                <motion.span
                  style={{ fontSize: sz.lockIconSz, lineHeight: 1 }}
                  animate={phase === 'unlocking' ? { rotate: [0, -15, 15, 0], scale: [1, 1.3, 1] } : {}}
                  transition={{ duration: 0.5 }}
                >
                  {phase === 'unlocking' ? '🔓' : '🔐'}
                </motion.span>

                <div style={{ ...s.drumsRow, gap: sz.drumsGap }}>
                  <Drum value={day}   min={1} max={31} onChange={setDay}   label="Ngày"  itemH={sz.itemH} drumW={sz.drumW} />
                  <div style={s.sepWrap}>
                    <span style={{ ...s.sep, fontSize: sz.sepFont }}>/</span>
                  </div>
                  <Drum value={month} min={1} max={12} onChange={setMonth} label="Tháng" itemH={sz.itemH} drumW={sz.drumW} />
                </div>

                <div style={{ ...s.preview, padding: sz.prevPad }}>
                  <span style={{ ...s.previewNum(day === CORRECT_DAY && phase !== 'lock' ? false : true), fontSize: sz.prevNumFont }}>
                    {String(day).padStart(2, '0')}
                  </span>
                  <span style={{ ...s.previewSlash, fontSize: sz.prevSlashFont }}>/</span>
                  <span style={{ ...s.previewNum(month === CORRECT_MONTH && phase !== 'lock' ? false : true), fontSize: sz.prevNumFont }}>
                    {String(month).padStart(2, '0')}
                  </span>
                </div>
              </motion.div>

              <AnimatePresence>
                {isWrong && (
                  <motion.p
                    style={{ ...s.wrongMsg, fontSize: sz.wrongFont }}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    Sai rồi, thử lại nhé 😢
                  </motion.p>
                )}
              </AnimatePresence>

              <motion.button
                style={{ ...s.unlockBtn, padding: sz.btnPad, fontSize: sz.btnFont }}
                onClick={handleUnlock}
                whileHover={{ scale: 1.06, boxShadow: `0 0 36px ${B.glow}` }}
                whileTap={{ scale: 0.93 }}
              >
                🗝️&nbsp; Mở Khóa
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ══ GIFT ══ */}
        <AnimatePresence>
          {(phase === 'gift' || phase === 'opening' || phase === 'revealed') && (
            <motion.div
              key="gift"
              style={s.giftSection}
              initial={{ opacity: 0, y: 70, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.65, type: 'spring', stiffness: 130 }}
            >
              {phase === 'gift' && (
                <motion.p style={s.topHint} animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}>
                  Chạm vào để mở quà 🎁
                </motion.p>
              )}

              <motion.div
                style={s.giftWrap}
                onClick={handleGiftClick}
                whileHover={phase === 'gift' ? { scale: 1.06, rotate: 2 } : {}}
                whileTap={phase === 'gift' ? { scale: 0.96 } : {}}
              >
                <motion.div
                  style={s.lid}
                  animate={phase !== 'gift' ? { y: -160, rotate: -25, opacity: 0, scale: 0.6 } : { y: 0, rotate: 0, opacity: 1, scale: 1 }}
                  transition={{ duration: 0.65, ease: [0.68, -0.55, 0.265, 1.55] }}
                >
                  <span style={s.bow}>🎀</span>
                  <div style={s.lidRibbon} />
                </motion.div>

                <div style={s.body}>
                  <div style={s.bodyRibbonH} />
                  <div style={s.bodyRibbonV} />
                  <AnimatePresence>
                    {phase !== 'gift' && (
                      <motion.div style={s.glow} initial={{ scale: 0, opacity: 0 }} animate={{ scale: [0, 1.4, 1], opacity: [0, 0.9, 0.7] }} transition={{ duration: 0.6, delay: 0.2 }} />
                    )}
                  </AnimatePresence>
                </div>

                {phase === 'opening' && SPARKLES.map((sp, i) => (
                  <motion.span
                    key={sp.id}
                    style={{ position: 'absolute', top: '40%', left: '50%', fontSize: 20, zIndex: 10, pointerEvents: 'none' }}
                    initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                    animate={{ x: sp.x, y: sp.y, scale: [0, 1.2, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 0.7, delay: i * 0.025, ease: 'easeOut' }}
                  >{sp.icon}</motion.span>
                ))}
              </motion.div>

              <AnimatePresence>
                {phase === 'revealed' && (
                  <motion.div style={s.message} initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                    <h1 style={s.title}>Dành Cho Em ❤️</h1>
                    <p style={s.subtitle}>Hành trình 900 ngày của chúng mình...</p>
                    <p style={s.desc}>Từng kỷ niệm, từng nụ cười, từng khoảnh khắc đẹp nhất — anh đã ghi lại tất cả nơi đây, dành riêng cho em.</p>
                    <motion.button
                      style={s.nextBtn}
                      onClick={() => {
                        const sfx = new Audio('/music/effect/soundEffect_OkiGo.mp3');
                        const goNext = () => navigate('/journey');
                        sfx.addEventListener('ended', goNext);
                        sfx.play().catch(goNext);
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Oke goooooooooooo
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

/* ── Styles ──────────────────────────────────────────────── */
const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #0e3a5c 0%, #082640 28%, #041828 62%, #010c14 100%)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  },
  center: {
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28,
    zIndex: 2, width: '100%', maxWidth: 480,
  },

  lockSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 },
  topHint: {
    fontFamily: "'Lato', sans-serif", color: B.pale,
    letterSpacing: 0.5, textAlign: 'center', opacity: 0.85, margin: 0,
  },
  lockBoxBase: {
    background: 'linear-gradient(160deg, rgba(6,14,34,0.97) 0%, rgba(10,22,50,0.97) 100%)',
    backdropFilter: 'blur(20px)',
    transition: 'border-color 0.4s, box-shadow 0.4s',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
    width: 'auto',
  },
  drumsRow: { display: 'flex', alignItems: 'center' },
  sepWrap:  { display: 'flex', alignItems: 'center' },
  sep: {
    fontFamily: "'Dancing Script', cursive", fontWeight: 700,
    color: B.primary, lineHeight: 1, opacity: 0.6,
  },

  preview: {
    display: 'flex', alignItems: 'center', gap: 8,
    background: 'rgba(74,143,232,0.06)',
    border: '1px solid rgba(74,143,232,0.2)',
    borderRadius: 40, marginTop: 4,
  },
  previewNum: (dim) => ({
    fontFamily: "'Dancing Script', cursive",
    fontWeight: 700,
    color: dim ? 'rgba(100,160,255,0.35)' : B.bright,
    transition: 'color 0.3s', lineHeight: 1,
  }),
  previewSlash: {
    fontFamily: "'Lato', sans-serif",
    color: B.primary, opacity: 0.4, lineHeight: 1,
  },

  wrongMsg: {
    fontFamily: "'Dancing Script', cursive",
    color: B.wrong, textShadow: '0 0 16px rgba(248,113,113,0.5)',
    textAlign: 'center', margin: 0,
  },
  unlockBtn: {
    background: `linear-gradient(135deg, #1a4a9e, ${B.primary})`,
    border: 'none', borderRadius: 50,
    color: '#fff', fontFamily: "'Lato', sans-serif", fontWeight: 700,
    letterSpacing: 1, cursor: 'pointer',
    boxShadow: `0 6px 28px ${B.glow}`,
    transition: 'all 0.3s',
  },

  giftSection: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, width: '100%' },
  giftWrap:   { position: 'relative', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', userSelect: 'none' },
  lid:        { width: 190, height: 52, background: 'linear-gradient(135deg, #d43a58, #b02040)', borderRadius: '10px 10px 4px 4px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', boxShadow: '0 6px 25px rgba(192,40,64,0.55)', zIndex: 2 },
  bow:        { fontSize: 40, position: 'absolute', top: -28, lineHeight: 1, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' },
  lidRibbon:  { position: 'absolute', inset: 0, width: 22, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #ffcc00, #e6a800)', borderRadius: 2 },
  body:       { width: 190, height: 170, background: 'linear-gradient(160deg, #c0283f, #8a1228)', borderRadius: '4px 4px 14px 14px', position: 'relative', boxShadow: '0 24px 60px rgba(176,20,56,0.45)', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  bodyRibbonH:{ position: 'absolute', height: 22, top: '50%', transform: 'translateY(-50%)', left: 0, right: 0, background: 'linear-gradient(180deg, #ffcc00, #e6a800)', zIndex: 1 },
  bodyRibbonV:{ position: 'absolute', width: 22, left: '50%', transform: 'translateX(-50%)', top: 0, bottom: 0, background: 'linear-gradient(90deg, #ffcc00, #e6a800)', zIndex: 1 },
  glow:       { position: 'absolute', width: 120, height: 120, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,240,160,0.95) 0%, rgba(255,200,80,0.6) 50%, transparent 70%)', zIndex: 2 },
  message:    { textAlign: 'center', width: '100%' },
  title:      { fontFamily: "'Dancing Script', cursive", fontSize: 'clamp(42px,10vw,62px)', color: '#f9d0d8', marginBottom: 14, textShadow: '0 2px 30px rgba(249,208,216,0.4)', lineHeight: 1.1 },
  subtitle:   { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(17px,4vw,22px)', color: '#e8b4c0', marginBottom: 18, fontStyle: 'italic' },
  desc:       { color: '#c090a0', fontSize: 16, lineHeight: 1.85, marginBottom: 36 },
  nextBtn:    { display: 'inline-block', padding: '16px 44px', background: 'linear-gradient(135deg, #c0516d, #e8758a)', border: 'none', borderRadius: 50, color: '#fff', fontSize: 17, fontFamily: "'Lato', sans-serif", fontWeight: 700, letterSpacing: 1, cursor: 'pointer', boxShadow: '0 8px 30px rgba(192,81,109,0.45)' },
};
