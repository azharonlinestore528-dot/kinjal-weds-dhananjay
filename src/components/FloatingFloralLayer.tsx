import { useEffect, useRef } from 'react';

interface Petal {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  depth: number;
  rotation: number;
  rotSpeed: number;
  flutterPhase: number;
  flutterSpeed: number;
  kind: 'rose-curled' | 'rose-velvet' | 'lotus' | 'marigold';
  alpha: number;
  fillA: string;
  fillB: string;
  momentOnly: boolean;
}

const ROSE_TONES: Array<[string, string]> = [
  ['#F49BB1', '#DC6481'],
  ['#E87895', '#B93C5A'],
  ['#F8B8C7', '#E37A96'],
  ['#D24D6A', '#8E2039'],
];

const LOTUS_TONES: Array<[string, string]> = [
  ['#FAD0DC', '#E8839B'],
  ['#F7B2C6', '#D46382'],
];

const MARIGOLD_TONES: Array<[string, string]> = [
  ['#FBBF24', '#D97706'],
  ['#F59E0B', '#B45309'],
];

export function FloatingFloralLayer({
  boostDensity = false,
}: {
  boostDensity?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const boostRef = useRef(boostDensity);

  useEffect(() => {
    boostRef.current = boostDensity;
  }, [boostDensity]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

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
    window.addEventListener('resize', resize);

    const isMobile = width < 768;
    const baseCount = isMobile ? 28 : 44;
    const burstExtra = isMobile ? 16 : 26;
    const totalPool = baseCount + burstExtra;

    const makePetal = (startRandomY: boolean, momentOnly: boolean): Petal => {
      const roll = Math.random();
      const kind: Petal['kind'] =
        roll < 0.44
          ? 'rose-curled'
          : roll < 0.72
          ? 'rose-velvet'
          : roll < 0.9
          ? 'lotus'
          : 'marigold';

      const depth = 0.6 + Math.random() * 0.75; // foreground vs distant depth
      const baseSize = kind === 'lotus' ? 11 + Math.random() * 6 : 8 + Math.random() * 6;
      const tonePair =
        kind === 'lotus'
          ? LOTUS_TONES[Math.floor(Math.random() * LOTUS_TONES.length)]
          : kind === 'marigold'
          ? MARIGOLD_TONES[Math.floor(Math.random() * MARIGOLD_TONES.length)]
          : ROSE_TONES[Math.floor(Math.random() * ROSE_TONES.length)];

      return {
        x: Math.random() * width,
        y: startRandomY ? Math.random() * height : -28 - Math.random() * 75,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (0.55 + Math.random() * 0.7) * depth,
        size: baseSize * depth,
        depth,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.022,
        flutterPhase: Math.random() * Math.PI * 2,
        flutterSpeed: 0.016 + Math.random() * 0.022,
        kind,
        alpha: Math.min(0.88, 0.45 + depth * 0.32),
        fillA: tonePair[0],
        fillB: tonePair[1],
        momentOnly,
      };
    };

    const petals: Petal[] = Array.from({ length: totalPool }, (_, idx) =>
      makePetal(true, idx >= baseCount)
    );

    let lastScrollY = window.scrollY;
    let scrollDraft = 0;
    const onScroll = () => {
      const curr = window.scrollY;
      scrollDraft = Math.max(-10, Math.min(10, (curr - lastScrollY) * 0.12));
      lastScrollY = curr;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let animId = 0;

    const drawCurledRosePetal = (p: Petal) => {
      const s = p.size;
      const grad = ctx.createLinearGradient(-s, -s, s, s);
      grad.addColorStop(0, p.fillA);
      grad.addColorStop(1, p.fillB);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.95, -s * 0.72, s * 1.05, s * 0.45, s * 0.15, s * 0.95);
      ctx.quadraticCurveTo(0, s * 0.65, -s * 0.25, s * 0.92);
      ctx.bezierCurveTo(-s * 1.05, s * 0.48, -s * 0.85, -s * 0.65, 0, -s);
      ctx.fill();

      // Delicate highlight edge
      ctx.strokeStyle = 'rgba(255, 245, 240, 0.35)';
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    const drawLotusPetal = (p: Petal) => {
      const s = p.size;
      const grad = ctx.createLinearGradient(0, -s * 1.2, 0, s);
      grad.addColorStop(0, p.fillA);
      grad.addColorStop(1, p.fillB);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.2);
      ctx.bezierCurveTo(s * 0.78, -s * 0.35, s * 0.62, s * 0.55, 0, s * 0.9);
      ctx.bezierCurveTo(-s * 0.62, s * 0.55, -s * 0.78, -s * 0.35, 0, -s * 1.2);
      ctx.fill();

      // Subtle central vein
      ctx.strokeStyle = 'rgba(255, 232, 180, 0.45)';
      ctx.lineWidth = 0.7;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.65);
      ctx.lineTo(0, -s * 0.8);
      ctx.stroke();
    };

    const drawMarigoldPetal = (p: Petal) => {
      const s = p.size * 0.85;
      ctx.fillStyle = p.fillA;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.45, s * 0.95, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p.fillB;
      ctx.beginPath();
      ctx.ellipse(0, s * 0.25, s * 0.28, s * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      scrollDraft *= 0.88;

      const activeLimit = boostRef.current ? totalPool : baseCount;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.flutterPhase += p.flutterSpeed;
        p.x += p.vx + Math.sin(p.flutterPhase) * (0.55 * p.depth);
        p.y += p.vy + scrollDraft * 0.22;
        p.rotation += p.rotSpeed + Math.cos(p.flutterPhase) * 0.008;

        if (p.y > height + 36) {
          petals[i] = makePetal(false, p.momentOnly);
        } else if (p.y < -95) {
          p.y = height + 18;
        }
        if (p.x > width + 36) p.x = -24;
        if (p.x < -36) p.x = width + 24;

        if (i >= activeLimit) continue;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        // Organic 3D flutter tilt
        ctx.scale(
          0.78 + Math.cos(p.flutterPhase * 1.1) * 0.25,
          0.68 + Math.sin(p.flutterPhase * 1.45) * 0.32
        );
        ctx.globalAlpha = p.alpha;
        if (p.depth > 1.05) {
          ctx.shadowColor = 'rgba(43, 20, 24, 0.16)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetY = 3;
        }

        if (p.kind === 'lotus') drawLotusPetal(p);
        else if (p.kind === 'marigold') drawMarigoldPetal(p);
        else drawCurledRosePetal(p);

        ctx.restore();
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-30 pointer-events-none"
    />
  );
}
