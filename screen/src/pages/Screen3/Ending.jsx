import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { getImageUrl } from '../../services/api';

const TOTAL_DAYS = 900;
const FINAL_IMAGE = 'loi_chuc_cua_em.jpg';

const HEART_RAIN_COUNT = 35;
const RAIN_HEARTS = Array.from({ length: HEART_RAIN_COUNT }, (_, i) => ({
  id: i,
  left: Math.random() * 100,
  size: 14 + Math.random() * 26,
  duration: 4 + Math.random() * 7,
  delay: Math.random() * 6,
  drift: (Math.random() - 0.5) * 60,
  emoji: ['❤️', '💕', '🌸', '💖', '💝', '🌹'][i % 6],
}));

export default function Ending() {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState(0); // 0→title 1→counter 2→message 3→image 4→final
  const navigate = useNavigate();
  const counterRef = useRef(null);

  // Sequential reveal
  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 600),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3600),
      setTimeout(() => setPhase(4), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Count-up animation for day counter
  useEffect(() => {
    if (phase < 1) return;
    const duration = 1800;
    const start = performance.now();
    const frame = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * TOTAL_DAYS));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [phase]);

  return (
    <motion.div
      style={s.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
    >
      {/* Heart rain background */}
      <HeartRain />

      <div style={s.content}>
        {/* Title */}
        <AnimatePresence>
          <motion.div
            style={s.topLabel}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span style={s.heartIcon}>❤️</span>
            <p style={s.labelText}>Ending</p>
          </motion.div>
        </AnimatePresence>

        {/* Day counter */}
        <AnimatePresence>
          {phase >= 1 && (
            <motion.div
              style={s.counterWrap}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, type: 'spring', stiffness: 150 }}
            >
              <p style={s.counterLabel}>Chúng mình đã bên nhau được</p>
              <div style={s.counter}>
                <motion.span
                  ref={counterRef}
                  style={s.counterNum}
                  key={count}
                >
                  {count.toLocaleString()}
                </motion.span>
                <span style={s.counterUnit}>ngày</span>
              </div>
              <p style={s.counterSub}>và mỗi ngày đều quý giá hơn ngày trước</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main message */}
        <AnimatePresence>
          {phase >= 2 && (
            <motion.div
              style={s.messageBlock}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
            >
              <h1 style={s.mainTitle}>Em là tất cả của anh</h1>
              <p style={s.poem}>
                Cảm ơn em đã là người đã bước vào cuộc đời anh,
                <br />
                đã cùng anh vượt qua bao ngày tháng,
                <br />
                đã cho anh thấy rằng tình yêu thật sự tồn tại.
                <br />
                <br />
                Dù thế giới có thay đổi ra sao,
                <br />
                anh vẫn muốn được bên cạnh em — mãi mãi.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final image */}
        <AnimatePresence>
          {phase >= 3 && (
            <motion.div
              style={s.imageWrap}
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.9, type: 'spring', stiffness: 120 }}
            >
              <img
                src={getImageUrl(FINAL_IMAGE)}
                alt="Lời chúc của em"
                style={s.finalImg}
              />
              <div style={s.imgOverlay} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Final declaration */}
        <AnimatePresence>
          {phase >= 4 && (
            <motion.div
              style={s.declaration}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: 'easeOut' }}
            >
              <motion.h2
                style={s.declTitle}
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              >
                Anh yêu em mãi mãi ❤️
              </motion.h2>
              <p style={s.declSub}>— Hành trình 900 ngày, và còn nhiều hơn nữa —</p>

              <div style={s.btnRow}>
                <motion.button
                  style={s.backBtn}
                  onClick={() => navigate('/journey')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  ← Xem lại hành trình
                </motion.button>
                <motion.button
                  style={s.replayBtn}
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  🎁 Xem lại từ đầu
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function HeartRain() {
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {RAIN_HEARTS.map((h) => (
        <motion.span
          key={h.id}
          style={{
            position: 'absolute',
            top: -80,
            left: `${h.left}%`,
            fontSize: h.size,
            opacity: 0,
            userSelect: 'none',
          }}
          animate={{
            y: [0, window.innerHeight + 100],
            x: [0, h.drift],
            opacity: [0, 0.5, 0.4, 0],
            rotate: [0, h.drift * 2],
          }}
          transition={{
            duration: h.duration,
            delay: h.delay,
            repeat: Infinity,
            repeatDelay: Math.random() * 2,
            ease: 'linear',
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #1a0a0f 0%, #2d1520 40%, #3d1530 70%, #1a0a0f 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 44,
    padding: '60px 24px 80px',
    maxWidth: 620,
    width: '100%',
    textAlign: 'center',
  },
  topLabel: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
  },
  heartIcon: {
    fontSize: 52,
    filter: 'drop-shadow(0 0 20px rgba(192,81,109,0.8))',
  },
  labelText: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 13,
    letterSpacing: 6,
    textTransform: 'uppercase',
    color: '#f9d0d8',
    opacity: 0.7,
  },
  counterWrap: {
    background: 'rgba(255,255,255,0.06)',
    border: '1px solid rgba(249,208,216,0.2)',
    borderRadius: 24,
    padding: '32px 48px',
    backdropFilter: 'blur(12px)',
  },
  counterLabel: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 16,
    color: '#e8b4c0',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  counter: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 10,
  },
  counterNum: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(72px, 15vw, 110px)',
    color: '#f9d0d8',
    lineHeight: 1,
    textShadow: '0 0 40px rgba(249,208,216,0.4)',
    fontWeight: 700,
  },
  counterUnit: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 28,
    color: '#e8b4c0',
    fontStyle: 'italic',
  },
  counterSub: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 14,
    color: '#c090a0',
    letterSpacing: 0.5,
  },
  messageBlock: {},
  mainTitle: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(40px, 10vw, 60px)',
    color: '#f9d0d8',
    marginBottom: 24,
    textShadow: '0 2px 30px rgba(249,208,216,0.3)',
    lineHeight: 1.1,
  },
  poem: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 17,
    color: '#d090a0',
    lineHeight: 2,
    fontStyle: 'italic',
  },
  imageWrap: {
    position: 'relative',
    borderRadius: 20,
    overflow: 'hidden',
    boxShadow: '0 30px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(249,208,216,0.2)',
    maxWidth: 380,
    width: '100%',
  },
  finalImg: {
    width: '100%',
    display: 'block',
    objectFit: 'cover',
    aspectRatio: '4/3',
  },
  imgOverlay: {
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(to top, rgba(26,10,15,0.6) 0%, transparent 60%)',
  },
  declaration: {},
  declTitle: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(34px, 8vw, 52px)',
    color: '#f9d0d8',
    marginBottom: 14,
    textShadow: '0 0 40px rgba(249,208,216,0.5)',
  },
  declSub: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 15,
    color: '#c090a0',
    fontStyle: 'italic',
    marginBottom: 40,
    letterSpacing: 0.5,
  },
  btnRow: {
    display: 'flex',
    gap: 16,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  backBtn: {
    padding: '13px 28px',
    background: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(249,208,216,0.3)',
    borderRadius: 50,
    color: '#f9d0d8',
    fontSize: 15,
    fontFamily: "'Lato', sans-serif",
    cursor: 'pointer',
    backdropFilter: 'blur(8px)',
    transition: 'all 0.3s',
  },
  replayBtn: {
    padding: '13px 32px',
    background: 'linear-gradient(135deg, #c0516d, #e8758a)',
    border: 'none',
    borderRadius: 50,
    color: '#fff',
    fontSize: 15,
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    cursor: 'pointer',
    boxShadow: '0 6px 24px rgba(192,81,109,0.4)',
    transition: 'all 0.3s',
  },
};
