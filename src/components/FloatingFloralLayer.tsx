import { useEffect, useRef } from 'react';

type FloralKind =
  | 'rose-red'
  | 'rose-pink'
  | 'lotus-pink'
  | 'lily-white'
  | 'marigold'
  | 'yellow-petal'
  | 'green-leaf'
  | 'jasmine-gold';

interface FloralParticle {
  kind: FloralKind;
  x: number;
  y: number;
  vy: number;
  vxDrift: number;
  swayAmp: number;
  swayFreq: number;
  swayPhase: number;
  rotation: number;
  vr: number;
  flutterPhase: number;
  flutterSpeed: number;
  size: number;
  alpha: number;
}

const ALL_KINDS: FloralKind[] = [
  'rose-red',
  'rose-pink',
  'lotus-pink',
  'lily-white',
  'marigold',
  'yellow-petal',
  'green-leaf',
  'rose-pink',
  'lotus-pink',
  'marigold',
  'yellow-petal',
  'green-leaf',
  'jasmine-gold',
];

function createSpriteCache(): Record<FloralKind, HTMLCanvasElement> {
  const spriteSize = 64;
  const center = spriteSize / 2;

  const makeCanvas = (draw: (ctx: CanvasRenderingContext2D) => void): HTMLCanvasElement => {
    const c = document.createElement('canvas');
    c.width = spriteSize;
    c.height = spriteSize;
    const ctx = c.getContext('2d');
    if (ctx) {
      ctx.save();
      ctx.translate(center, center);
      draw(ctx);
      ctx.restore();
    }
    return c;
  };

  return {
    'rose-red': makeCanvas((ctx) => {
      // Multi-petal crimson rose blossom
      for (let i = 0; i < 6; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI) / 3);
        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.bezierCurveTo(14, -18, 22, -4, 8, 12);
        ctx.bezierCurveTo(2, 16, -8, 10, 0, -4);
        ctx.fillStyle = i % 2 === 0 ? '#BE123C' : '#9F1239';
        ctx.fill();
        ctx.strokeStyle = '#7A1126';
        ctx.lineWidth = 0.9;
        ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 5.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FB7185';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#FDE68A';
      ctx.fill();
    }),

    'rose-pink': makeCanvas((ctx) => {
      // Soft rose pink blossom & curled petals
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.moveTo(0, -3);
        ctx.bezierCurveTo(14, -17, 20, -2, 6, 11);
        ctx.bezierCurveTo(0, 14, -8, 8, 0, -3);
        ctx.fillStyle = i % 2 === 0 ? '#F47296' : '#EC5C85';
        ctx.fill();
        ctx.strokeStyle = '#BE436A';
        ctx.lineWidth = 0.85;
        ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 4.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FBCFE8';
      ctx.fill();
    }),

    'lotus-pink': makeCanvas((ctx) => {
      // Pointed lotus petal with central vein
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.bezierCurveTo(14, -10, 14, 12, 0, 22);
      ctx.bezierCurveTo(-14, 12, -14, -10, 0, -22);
      const grad = ctx.createLinearGradient(0, -22, 0, 22);
      grad.addColorStop(0, '#FBCFE8');
      grad.addColorStop(0.55, '#F48FB1');
      grad.addColorStop(1, '#DB6387');
      ctx.fillStyle = grad;
      ctx.fill();
      ctx.strokeStyle = '#C95479';
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(0, 17);
      ctx.strokeStyle = 'rgba(255, 245, 248, 0.72)';
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }),

    'lily-white': makeCanvas((ctx) => {
      // Graceful ivory-white lily petal with gold highlight
      ctx.beginPath();
      ctx.moveTo(0, -23);
      ctx.bezierCurveTo(11, -11, 11, 11, 0, 23);
      ctx.bezierCurveTo(-11, 11, -11, -11, 0, -23);
      ctx.fillStyle = '#FFFDF7';
      ctx.fill();
      ctx.strokeStyle = '#D6B56A';
      ctx.lineWidth = 1.1;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(0, 17);
      ctx.strokeStyle = 'rgba(223, 186, 102, 0.75)';
      ctx.lineWidth = 1.1;
      ctx.stroke();
    }),

    marigold: makeCanvas((ctx) => {
      // Traditional Indian genda (marigold) flower head
      for (let i = 0; i < 10; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 10);
        ctx.beginPath();
        ctx.ellipse(0, -12, 5.5, 9.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? '#F59E0B' : '#FBBF24';
        ctx.fill();
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 0.75;
        ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 7.5, 0, Math.PI * 2);
      ctx.fillStyle = '#D97706';
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = '#FDE68A';
      ctx.fill();
    }),

    'yellow-petal': makeCanvas((ctx) => {
      // Small golden yellow flower petal
      ctx.beginPath();
      ctx.moveTo(0, -17);
      ctx.bezierCurveTo(11, -7, 10, 11, 0, 17);
      ctx.bezierCurveTo(-10, 11, -11, -7, 0, -17);
      ctx.fillStyle = '#FDE047';
      ctx.fill();
      ctx.strokeStyle = '#CA8A04';
      ctx.lineWidth = 0.9;
      ctx.stroke();
    }),

    'green-leaf': makeCanvas((ctx) => {
      // Delicate mango/botanical leaf
      ctx.beginPath();
      ctx.moveTo(0, -22);
      ctx.bezierCurveTo(11, -9, 10, 12, 0, 21);
      ctx.bezierCurveTo(-10, 12, -11, -9, 0, -22);
      ctx.fillStyle = '#4F7750';
      ctx.fill();
      ctx.strokeStyle = '#2F5233';
      ctx.lineWidth = 0.95;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, -16);
      ctx.lineTo(0, 23);
      ctx.strokeStyle = '#A7C99E';
      ctx.lineWidth = 1;
      ctx.stroke();
    }),

    'jasmine-gold': makeCanvas((ctx) => {
      // Occasional decorative 5-petal jasmine / champa blossom with antique gold heart
      for (let i = 0; i < 5; i++) {
        ctx.save();
        ctx.rotate((i * Math.PI * 2) / 5);
        ctx.beginPath();
        ctx.ellipse(0, -11, 4.5, 8.5, 0, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFBEB';
        ctx.fill();
        ctx.strokeStyle = '#DFBA66';
        ctx.lineWidth = 0.9;
        ctx.stroke();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, 4.2, 0, Math.PI * 2);
      ctx.fillStyle = '#D97706';
      ctx.fill();
    }),
  };
}

function createParticle(
  width: number,
  height: number,
  index: number,
  spreadVertically: boolean
): FloralParticle {
  const kind = ALL_KINDS[index % ALL_KINDS.length];
  const isAccent = kind === 'marigold' || kind === 'rose-red' || kind === 'jasmine-gold';
  const size = isAccent
    ? 14 + Math.random() * 9
    : kind === 'yellow-petal'
    ? 10 + Math.random() * 6
    : 12 + Math.random() * 9;

  return {
    kind,
    x: Math.random() * width,
    y: spreadVertically ? Math.random() * (height + 80) - 40 : -30 - Math.random() * 60,
    vy: 26 + Math.random() * 32,
    vxDrift: (Math.random() - 0.5) * 14,
    swayAmp: 12 + Math.random() * 26,
    swayFreq: 0.7 + Math.random() * 1.1,
    swayPhase: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI * 2,
    vr: (Math.random() - 0.5) * 1.4,
    flutterPhase: Math.random() * Math.PI * 2,
    flutterSpeed: 1.4 + Math.random() * 1.8,
    size,
    alpha: 0.52 + Math.random() * 0.28,
  };
}

export function FloatingFloralLayer() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (motionQuery.matches) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const sprites = createSpriteCache();
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetCount = width < 768 ? 52 : 58;
    const particles: FloralParticle[] = Array.from({ length: targetCount }, (_, i) =>
      createParticle(width, height, i, true)
    );

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    let rafId = 0;
    let lastTime = performance.now();
    let elapsed = 0;
    let paused = document.hidden;

    const tick = (now: number) => {
      if (paused || motionQuery.matches) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      elapsed += dt;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.vy * dt;
        p.x += p.vxDrift * dt;
        p.rotation += p.vr * dt;
        p.flutterPhase += p.flutterSpeed * dt;

        const swayX = Math.sin(elapsed * p.swayFreq + p.swayPhase) * p.swayAmp;
        const drawX = p.x + swayX;

        if (p.y > height + 36) {
          p.y = -28 - Math.random() * 35;
          p.x = Math.random() * width;
        }
        if (drawX < -40) p.x += width + 60;
        if (drawX > width + 40) p.x -= width + 60;

        const flutterScaleX = 0.68 + 0.32 * Math.cos(p.flutterPhase);

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.translate(drawX, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(flutterScaleX, 1);
        const half = p.size / 2;
        ctx.drawImage(sprites[p.kind], -half, -half, p.size, p.size);
        ctx.restore();
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const handleVisibility = () => {
      paused = document.hidden;
      if (!paused && !motionQuery.matches) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(tick);
      } else if (paused && rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        if (rafId) window.cancelAnimationFrame(rafId);
        ctx.clearRect(0, 0, width, height);
      } else if (!paused) {
        lastTime = performance.now();
        rafId = window.requestAnimationFrame(tick);
      }
    };

    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    motionQuery.addEventListener('change', handleMotionChange);

    if (!paused) {
      rafId = window.requestAnimationFrame(tick);
    }

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[25] pointer-events-none select-none motion-reduce:hidden"
    />
  );
}
