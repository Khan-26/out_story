import { useMemo } from 'react';
import { motion } from 'framer-motion';

const EMOJIS = ['❤️', '🐟', '♪', '📖', '🌸', '🌏', '📸', '☁', '恩'];
const isCJK  = (str) => str.length === 1 && str.charCodeAt(0) > 0x2E7F;

export default function FloatingHearts({ count = 28, dark = true }) {
  const items = useMemo(() => {
    const mob = window.innerWidth < 480;
    const result = [];

    for (let i = 0; i < count; i++) {
      const emoji      = EMOJIS[i % EMOJIS.length];
      const cjk        = isCJK(emoji);
      const bubbleSize = 36 + Math.random() * 38;
      const baseLeft   = Math.random() * 94;
      const baseDur    = 6 + Math.random() * 7;
      const baseDelay  = Math.random() * 4;
      const baseRepeat = Math.random() * 1.5;
      const driftX     = (Math.random() - 0.5) * 130;

      // ── bong bóng emoji chính ──
      result.push({
        kind: 'main',
        id:   `m${i}`,
        emoji, cjk, bubbleSize,
        emojiSize:   cjk ? bubbleSize * 0.44 : bubbleSize * 0.50,
        left:        baseLeft,
        duration:    baseDur,
        delay:       baseDelay,
        repeatDelay: baseRepeat,
        driftKeys:   [0, driftX * 0.25, driftX * 0.6, driftX * 0.4, driftX],
      });

      // ── 1 mini bubble on mobile, 1-3 on desktop ──
      const miniCount = mob ? 1 : 1 + Math.floor(Math.random() * 3);
      for (let j = 0; j < miniCount; j++) {
        const sz      = 6 + Math.random() * 10;   // 6-16 px
        const minDrift = (Math.random() - 0.5) * 70;
        result.push({
          kind: 'mini',
          id:   `s${i}_${j}`,
          bubbleSize:  sz,
          // lệch trái/phải ±5% so với bong bóng chính
          left:        Math.max(0, Math.min(98, baseLeft + (Math.random() - 0.5) * 5)),
          duration:    baseDur * (0.65 + Math.random() * 0.55),
          delay:       baseDelay + Math.random() * 1.2,
          repeatDelay: baseRepeat + Math.random() * 0.6,
          driftKeys:   [0, minDrift * 0.3, minDrift * 0.7, minDrift * 0.5, minDrift],
        });
      }
    }

    return result;
  }, [count]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 0 }}>
      {items.map((b) =>
        b.kind === 'main' ? (
          /* ── Bong bóng emoji ── */
          <motion.div
            key={b.id}
            style={{
              position: 'absolute',
              bottom: -(b.bubbleSize + 20),
              left: `${b.left}%`,
              width:  b.bubbleSize,
              height: b.bubbleSize,
              borderRadius: '50%',
              background: [
                'radial-gradient(circle at 33% 28%,',
                '  rgba(255,255,255,0.28) 0%,',
                '  rgba(190,235,255,0.08) 38%,',
                '  transparent 62%)',
              ].join(''),
              border: `1px solid rgba(${dark ? '160,220,255' : '200,230,255'},0.28)`,
              boxShadow: [
                `0 0 8px rgba(100,195,255,${dark ? 0.10 : 0.07})`,
                `inset 0 -3px 8px rgba(0,0,0,0.08)`,
                `inset 0 ${b.bubbleSize * 0.35}px ${b.bubbleSize * 0.18}px rgba(255,255,255,0.06)`,
              ].join(', '),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
            animate={{
              y:       [0, -(window.innerHeight + b.bubbleSize + 60)],
              x:       b.driftKeys,
              opacity: [0, dark ? 0.72 : 0.55, dark ? 0.65 : 0.5, dark ? 0.45 : 0.3, 0],
              scale:   [0.65, 0.95, 1.02, 1.06, 0.92],
            }}
            transition={{
              duration: b.duration, delay: b.delay,
              times: [0, 0.2, 0.5, 0.75, 1],
              repeat: Infinity, repeatDelay: b.repeatDelay, ease: 'linear',
            }}
          >
            <span style={{
              fontSize:   b.emojiSize,
              fontWeight: b.cjk ? 900 : 'normal',
              color:      b.cjk ? '#7ec8ff' : 'inherit',
              lineHeight: 1, userSelect: 'none',
              filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.25))',
            }}>
              {b.emoji}
            </span>
          </motion.div>
        ) : (
          /* ── Bong bóng nhỏ theo kèm ── */
          <motion.div
            key={b.id}
            style={{
              position: 'absolute',
              bottom: -(b.bubbleSize + 10),
              left: `${b.left}%`,
              width:  b.bubbleSize,
              height: b.bubbleSize,
              borderRadius: '50%',
              background: [
                'radial-gradient(circle at 38% 32%,',
                '  rgba(255,255,255,0.32) 0%,',
                '  rgba(200,240,255,0.06) 42%,',
                '  transparent 65%)',
              ].join(''),
              border: `1px solid rgba(${dark ? '170,225,255' : '210,235,255'},0.22)`,
              boxShadow: `0 0 4px rgba(100,195,255,${dark ? 0.08 : 0.05})`,
            }}
            animate={{
              y:       [0, -(window.innerHeight + b.bubbleSize + 40)],
              x:       b.driftKeys,
              opacity: [0, dark ? 0.60 : 0.42, dark ? 0.50 : 0.35, dark ? 0.30 : 0.2, 0],
              scale:   [0.55, 0.88, 0.98, 1.04, 0.85],
            }}
            transition={{
              duration: b.duration, delay: b.delay,
              times: [0, 0.2, 0.5, 0.75, 1],
              repeat: Infinity, repeatDelay: b.repeatDelay, ease: 'linear',
            }}
          />
        )
      )}
    </div>
  );
}
