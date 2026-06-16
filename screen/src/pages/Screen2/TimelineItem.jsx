import { useState } from 'react';
import { motion } from 'framer-motion';
import { getImageUrl } from '../../services/api';

export default function TimelineItem({ event, index }) {
  const isLeft = index % 2 === 0;
  const [lightbox, setLightbox] = useState(null);

  return (
    <>
      <motion.div
        style={s.wrapper(isLeft)}
        initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.05 }}
      >
        {/* Label badge on the timeline line */}
        <div style={s.connector(isLeft)}>
          <div style={s.dot(event.highlight)} />
          <div style={s.labelBadge(event.highlight)}>
            <span style={s.labelText}>{event.label}</span>
          </div>
        </div>

        {/* Card */}
        <div style={s.card(event.highlight)}>
          {/* Card header */}
          <div style={s.cardHeader}>
            <span style={s.emoji}>{event.emoji}</span>
            <div>
              <h3 style={s.cardTitle}>{event.title}</h3>
              {event.subtitle && (
                <p style={s.cardSubtitle}>{event.subtitle}</p>
              )}
            </div>
          </div>

          {/* Tags */}
          {event.tags?.length > 0 && (
            <div style={s.tags}>
              {event.tags.map((tag) => (
                <span key={tag} style={s.tag}>{tag}</span>
              ))}
            </div>
          )}

          {/* Description */}
          <p style={s.desc}>{event.description}</p>

          {/* Photo gallery */}
          {event.images?.length > 0 && (
            <div style={s.gallery(event.images.length)}>
              {event.images.map((img, i) => (
                <motion.div
                  key={img}
                  style={s.imgWrap}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setLightbox(img)}
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`${event.title} ${i + 1}`}
                    style={s.img}
                    loading="lazy"
                  />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          style={s.lightbox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setLightbox(null)}
        >
          <motion.img
            src={getImageUrl(lightbox)}
            alt="preview"
            style={s.lightboxImg}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
            onClick={(e) => e.stopPropagation()}
          />
          <button style={s.lightboxClose} onClick={() => setLightbox(null)}>
            ✕
          </button>
        </motion.div>
      )}
    </>
  );
}

const CARD_BG   = '#fff5f8';
const CARD_HL   = '#fff0f3';
const BORDER    = 'rgba(192,81,109,0.15)';
const BORDER_HL = 'rgba(192,81,109,0.35)';

const s = {
  wrapper: (isLeft) => ({
    display: 'flex',
    flexDirection: isLeft ? 'row' : 'row-reverse',
    alignItems: 'flex-start',
    gap: 0,
    position: 'relative',
    width: '100%',
  }),
  connector: (isLeft) => ({
    display: 'flex',
    flexDirection: isLeft ? 'row' : 'row-reverse',
    alignItems: 'center',
    gap: 12,
    flexShrink: 0,
    paddingTop: 20,
  }),
  dot: (highlight) => ({
    width: highlight ? 20 : 14,
    height: highlight ? 20 : 14,
    borderRadius: '50%',
    background: highlight
      ? 'linear-gradient(135deg, #c0516d, #e8758a)'
      : '#f9d0d8',
    border: `3px solid ${highlight ? '#c0516d' : '#e8b4c0'}`,
    boxShadow: highlight ? '0 0 12px rgba(192,81,109,0.5)' : 'none',
    flexShrink: 0,
    zIndex: 2,
  }),
  labelBadge: (highlight) => ({
    background: highlight
      ? 'linear-gradient(135deg, #8b2040, #c0516d)'
      : 'linear-gradient(135deg, #c0516d, #e8758a)',
    borderRadius: 20,
    padding: '6px 16px',
    maxWidth: 120,
    boxShadow: highlight ? '0 4px 14px rgba(139,32,64,0.35)' : 'none',
  }),
  labelText: {
    color: '#fff',
    fontSize: 13,
    fontFamily: "'Dancing Script', cursive",
    fontWeight: 600,
    letterSpacing: 0.4,
    whiteSpace: 'nowrap',
  },
  card: (highlight) => ({
    flex: 1,
    background: highlight ? CARD_HL : CARD_BG,
    borderRadius: 18,
    padding: '22px 26px',
    border: `1.5px solid ${highlight ? BORDER_HL : BORDER}`,
    boxShadow: highlight
      ? '0 8px 40px rgba(192,81,109,0.12), 0 2px 8px rgba(0,0,0,0.06)'
      : '0 4px 20px rgba(0,0,0,0.06)',
    margin: '10px 16px',
    transition: 'box-shadow 0.3s',
  }),
  cardHeader: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 14,
    marginBottom: 12,
  },
  emoji: {
    fontSize: 36,
    lineHeight: 1,
    flexShrink: 0,
  },
  cardTitle: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(22px, 5vw, 30px)',
    color: '#8b2040',
    lineHeight: 1.15,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: "'Playfair Display', serif",
    fontSize: 14,
    fontStyle: 'italic',
    color: '#b06080',
  },
  tags: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 14,
  },
  tag: {
    padding: '3px 12px',
    borderRadius: 20,
    background: 'rgba(192,81,109,0.1)',
    color: '#c0516d',
    fontSize: 12,
    fontFamily: "'Lato', sans-serif",
    fontWeight: 700,
    letterSpacing: 0.5,
  },
  desc: {
    color: '#6b3040',
    fontSize: 15,
    lineHeight: 1.8,
    marginBottom: 18,
    fontFamily: "'Lato', sans-serif",
  },
  gallery: (count) => ({
    display: 'grid',
    gridTemplateColumns: count === 1 ? '1fr' : count === 2 ? '1fr 1fr' : 'repeat(3, 1fr)',
    gap: 8,
  }),
  imgWrap: {
    borderRadius: 12,
    overflow: 'hidden',
    cursor: 'pointer',
    aspectRatio: '4/3',
    background: '#f0d8e0',
  },
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.4s ease',
  },
  lightbox: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(20, 5, 10, 0.92)',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  lightboxImg: {
    maxWidth: '90vw',
    maxHeight: '88vh',
    borderRadius: 16,
    boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
    cursor: 'default',
    objectFit: 'contain',
  },
  lightboxClose: {
    position: 'absolute',
    top: 20,
    right: 24,
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    color: '#fff',
    fontSize: 20,
    width: 44,
    height: 44,
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(6px)',
  },
};
