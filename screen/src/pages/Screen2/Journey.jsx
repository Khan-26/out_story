import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fetchTimeline, fetchMeta } from '../../services/api';
import TimelineItem from './TimelineItem';
import FloatingHearts from '../../components/FloatingHearts';

// Fallback data when API is unavailable
const FALLBACK_EVENTS = [
  { id: 1,  order: 1,  label: 'Lần đầu tiên',  title: 'Khi mình quay về bên nhau',                 subtitle: 'Một câu chuyện mới lại được bắt đầu...',           description: 'Sau một thời gian xa cách, mình trò chuyện và có những buổi đi chơi lại với nhau, và sau cái ngày mình đi ăn Kichi Kichi 🍲🍲 và buổi đi xem phim Tee Yod 👹👹 đó, mình đã chủ động thổ lộ và mình đã lại một lần nữa ở bên nhau', images: [],                                                                                      emoji: '🍲👹', highlight: true,  tags: ['Bắt đầu'] },
  { id: 2,  order: 2,  label: 'Những ngày đầu', title: 'Cà phê, phim, và nhiều hơn nữa',            subtitle: 'Từng ngày một, mình gần nhau hơn',                 description: '[Nội dung sẽ được cập nhật]', images: [],                                                                                      emoji: '☕', highlight: false, tags: ['Hẹn hò'] },
  { id: 3,  order: 3,  label: 'Sinh nhật của em', title: 'Ngày em thổi nến',                        subtitle: 'Anh muốn mỗi sinh nhật em đều có anh',             description: '[Nội dung sẽ được cập nhật]', images: ['anh_sinh_nhat.jpg', 'banh_em_tang.PNG'],                                               emoji: '🎂', highlight: true,  tags: ['Sinh nhật'] },
  { id: 4,  order: 4,  label: 'Mùa xuân đó',    title: 'Tết đầu tiên bên nhau',                    subtitle: 'Pháo hoa, áo dài, và mình',                        description: '[Nội dung sẽ được cập nhật]', images: ['em_va_tet_1.JPG', 'em_va_tet_2.JPG', 'em_va_tet_3.JPG', 'em_va_tet_4.JPG'],            emoji: '🧧', highlight: false, tags: ['Tết'] },
  { id: 5,  order: 5,  label: 'Chuyến đi',      title: 'Đà Lạt — Sương mù và cà phê nóng',         subtitle: 'Lần đầu mình đi xa cùng nhau',                     description: '[Nội dung sẽ được cập nhật]', images: ['anh_dala_1.JPG', 'anh_dalat_2.jpeg', 'anh_da_lat_5.JPG', 'anh_da_lat_6.JPG', 'anh_da_lat_7.JPG'], emoji: '🌿', highlight: true,  tags: ['Du lịch', 'Đà Lạt'] },
  { id: 6,  order: 6,  label: 'Chuyến đi',      title: 'Ba Na Hills — Mình đứng trên mây',          subtitle: 'Cây cầu vàng và trời xanh',                        description: '[Nội dung sẽ được cập nhật]', images: ['ba_na_hill.JPG'],                                                                      emoji: '⛅', highlight: false, tags: ['Du lịch'] },
  { id: 7,  order: 7,  label: 'Biển và nắng',   title: 'Quy Nhơn — Sóng biển và bình yên',         subtitle: 'Những ngày lười biếng bên bờ biển',                description: '[Nội dung sẽ được cập nhật]', images: ['anh_quy_nhon.jpg', 'anh_quy_nhon.PNG'],                                               emoji: '🌊', highlight: true,  tags: ['Du lịch', 'Biển'] },
  { id: 8,  order: 8,  label: 'Biển và nắng',   title: 'Vịnh Hy — Nước trong như pha lê',           subtitle: 'Một vịnh biển mình sẽ nhớ mãi',                   description: '[Nội dung sẽ được cập nhật]', images: ['anh_vinh_hy.JPG'],                                                                     emoji: '⛵', highlight: false, tags: ['Du lịch'] },
  { id: 9,  order: 9,  label: 'Kỷ niệm ❤️',    title: 'Hai năm — vẫn còn thích nhau lắm',         subtitle: 'Mỗi ngày qua là một ngày anh trân trọng',          description: '[Nội dung sẽ được cập nhật]', images: ['anni_concept.PNG'],                                                                    emoji: '💑', highlight: true,  tags: ['Anniversary'] },
  { id: 10, order: 10, label: 'Tương lai ✦',    title: 'Hôm đó mình chụp ảnh concept cưới',        subtitle: 'Và anh biết mình muốn cùng em đi đến cuối',        description: '[Nội dung sẽ được cập nhật]', images: ['concept_cuoi.jpg'],                                                                    emoji: '💍', highlight: true,  tags: ['Đặc biệt'] },
  { id: 11, order: 11, label: 'Hôm nay',        title: 'Vẫn đang viết tiếp câu chuyện này',        subtitle: '900 ngày, và còn nhiều hơn nữa phía trước',        description: '[Nội dung sẽ được cập nhật]', images: ['loi_chuc_cua_em.jpg'],                                                                 emoji: '❤️', highlight: true,  tags: ['Hôm nay'] },
];

export default function Journey() {
  const [events, setEvents] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const progressWidth = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    Promise.all([fetchTimeline(), fetchMeta()])
      .then(([tlRes, metaRes]) => {
        setEvents(tlRes.data);
        setMeta(metaRes.data);
      })
      .catch(() => {
        setEvents(FALLBACK_EVENTS);
        setMeta({
          title: 'Hành Trình 900 Ngày',
          subtitle: 'Câu chuyện tình yêu của chúng mình',
          totalDays: 900,
          endMessage: 'Và câu chuyện vẫn đang tiếp tục...',
        });
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <motion.div
      style={s.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FloatingHearts count={20} dark={false} />

      {/* Scroll progress bar */}
      <div style={s.progressBg}>
        <motion.div style={{ ...s.progressBar, width: progressWidth }} />
      </div>

      {/* Hero header */}
      <div style={s.hero}>
        <motion.div
          style={s.heroInner}
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p style={s.heroLabel}>📖 Hành Trình</p>
          <h1 style={s.heroTitle}>
            {meta?.title || 'Hành Trình 900 Ngày'}
          </h1>
          <p style={s.heroSub}>
            {meta?.subtitle || 'Câu chuyện tình yêu của chúng mình'}
          </p>
          <div style={s.heroStats}>
            <Stat value={events.length} label="Kỷ niệm" />
            <div style={s.statDivider} />
            <Stat value={meta?.totalDays || 900} label="Ngày bên nhau" />
            <div style={s.statDivider} />
            <Stat value={events.filter((e) => e.highlight).length} label="Cột mốc đặc biệt" />
          </div>
        </motion.div>
      </div>

      {/* Timeline */}
      <div style={s.timelineOuter}>
        <div style={s.timelineInner}>
          {/* Vertical line */}
          <div style={s.centerLine} />

          {loading ? (
            <LoadingDots />
          ) : (
            events.map((event, i) => (
              <TimelineItem key={event.id} event={event} index={i} />
            ))
          )}
        </div>
      </div>

      {/* Footer + proceed button */}
      <motion.div
        style={s.footer}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div style={s.footerHeart}>❤️</div>
        <p style={s.footerText}>
          {meta?.endMessage || 'Và câu chuyện vẫn đang tiếp tục...'}
        </p>
        <motion.button
          style={s.endBtn}
          onClick={() => navigate('/ending')}
          whileHover={{ scale: 1.06, boxShadow: '0 12px 40px rgba(192,81,109,0.5)' }}
          whileTap={{ scale: 0.96 }}
        >
          Lời Kết ❤️
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

function Stat({ value, label }) {
  return (
    <div style={s.stat}>
      <span style={s.statVal}>{value}</span>
      <span style={s.statLabel}>{label}</span>
    </div>
  );
}

function LoadingDots() {
  return (
    <div style={{ textAlign: 'center', padding: '80px 0' }}>
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          style={{ display: 'inline-block', fontSize: 28, margin: '0 6px' }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: 0.8, delay: i * 0.15, repeat: Infinity }}
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: 'linear-gradient(180deg, #fff5f8 0%, #fff0f4 50%, #fce8ef 100%)',
    position: 'relative',
    overflowX: 'hidden',
  },
  progressBg: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'rgba(192,81,109,0.15)',
    zIndex: 100,
  },
  progressBar: {
    height: '100%',
    background: 'linear-gradient(90deg, #c0516d, #e8758a, #f9d0d8)',
    borderRadius: '0 2px 2px 0',
    boxShadow: '0 0 10px rgba(192,81,109,0.4)',
  },
  hero: {
    textAlign: 'center',
    padding: '80px 24px 60px',
    background: 'linear-gradient(180deg, rgba(255,240,245,0.9) 0%, transparent 100%)',
    position: 'relative',
    zIndex: 1,
  },
  heroInner: {
    maxWidth: 600,
    margin: '0 auto',
  },
  heroLabel: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 14,
    letterSpacing: 4,
    textTransform: 'uppercase',
    color: '#c0516d',
    marginBottom: 12,
    opacity: 0.9,
  },
  heroTitle: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(44px, 10vw, 68px)',
    color: '#8b2040',
    lineHeight: 1.05,
    marginBottom: 14,
    textShadow: '0 2px 20px rgba(139,32,64,0.15)',
  },
  heroSub: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 18,
    color: '#b06080',
    fontStyle: 'italic',
    marginBottom: 36,
  },
  heroStats: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
    background: 'rgba(255,255,255,0.7)',
    borderRadius: 20,
    padding: '18px 32px',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(192,81,109,0.15)',
    boxShadow: '0 4px 24px rgba(192,81,109,0.08)',
    flexWrap: 'wrap',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '0 28px',
  },
  statVal: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 38,
    color: '#c0516d',
    lineHeight: 1,
    fontWeight: 700,
  },
  statLabel: {
    fontFamily: "'Lato', sans-serif",
    fontSize: 12,
    color: '#b06080',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 40,
    background: 'rgba(192,81,109,0.2)',
  },
  timelineOuter: {
    padding: '20px 0 40px',
  },
  timelineInner: {
    maxWidth: 900,
    margin: '0 auto',
    padding: '0 24px',
    position: 'relative',
  },
  centerLine: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 2,
    background: 'linear-gradient(180deg, transparent, #f9d0d8 5%, #e8b4c0 50%, #f9d0d8 95%, transparent)',
    transform: 'translateX(-50%)',
    zIndex: 0,
  },
  footer: {
    textAlign: 'center',
    padding: '60px 24px 80px',
  },
  footerHeart: {
    fontSize: 52,
    marginBottom: 20,
    animation: 'pulse-glow 2s infinite',
  },
  footerText: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 22,
    color: '#8b2040',
    fontStyle: 'italic',
    marginBottom: 36,
  },
  endBtn: {
    padding: '16px 50px',
    background: 'linear-gradient(135deg, #8b2040, #c0516d)',
    border: 'none',
    borderRadius: 50,
    color: '#fff',
    fontSize: 18,
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    letterSpacing: 1,
    cursor: 'pointer',
    boxShadow: '0 8px 30px rgba(139,32,64,0.35)',
    transition: 'all 0.3s',
  },
};
