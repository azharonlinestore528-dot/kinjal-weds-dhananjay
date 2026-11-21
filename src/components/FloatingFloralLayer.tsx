import { useEffect, useRef } from 'react';

export type FloralIntensity = 'ambient' | 'elevated' | 'climax';

type PetalSpecies =
  | 'rose-pink'
  | 'rose-red'
  | 'rose-white'
  | 'lotus-pink'
  | 'lotus-white'
  | 'lily'
  | 'marigold'
  | 'floral-flake';

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
  windBias: number;
  kind: PetalSpecies;
  alpha: number;
  fillA: string;
  fillB: string;
  tier: 0 | 1 | 2;
}

const PINK_ROSE_TONES: Array<[string, string]> = [
  ['#F7A8BA', '#DF6B88'],
  ['#F48EA8', '#C6476A'],
  ['#FAD0DA', '#E987A1'],
];

const RED_ROSE_TONES: Array<[string, string]> = [
  ['#C82D4B', '#7B1126'],
  ['#B91C3B', '#680E20'],
];

const WHITE_ROSE_TONES: Array<[string, string]> = [
  ['#FFFDF8', '#EDE2CF'],
  ['#FDF6EC', '#E7D8C2'],
];

const PINK_LOTUS_TONES: Array<[string, string]> = [
  ['#FAD4DF', '#E8839B'],
  ['#F7B4C7', '#D65F81'],
];

const WHITE_LOTUS_TONES: Array<[string, string]> = [
  ['#FFFDF9', '#F4DCE3'],
  ['#FAF4EC', '#EFE1D6'],
];

const LILY_TONES: Array<[string, string]> = [
  ['#FFF9EE', '#F1D08D'],
  ['#FDF2F4', '#E5B2A8'],
];

const MARIGOLD_TONES: Array<[string, string]> = [
  ['#FBBF24', '#D97706'],
  ['#F59E0B', '#B45309'],
  ['#FACC15', '#EA580C'],
];

const FLAKE_TONES: Array<[string, string]> = [
  ['#F7D0D8', '#E8839B'],
  ['#FDE68A', '#F59E0B'],
  ['#FFFBF2', '#DFBA66'],
];

function pickSpecies(): PetalSpecies {
  const roll = Math.random();
  if (roll < 0.22) return 'rose-pink';
  if (roll < 0.36) return 'rose-red';
  if (roll < 0.46) return 'rose-white';
  if (roll < 0.62) return 'lotus-pink';
  if (roll < 0.71) return 'lotus-white';
  if (roll < 0.81) return 'lily';
  if (roll < 0.93) return 'marigold';
  return 'floral-flake';
}

function getTonePair(kind: PetalSpecies): [string, string] {
  const pick = (arr: Array<[string, string]>) => arr[Math.floor(Math.random() * arr.length)];
  switch (kind) {
    case 'rose-pink':
      return pick(PINK_ROSE_TONES);
    case 'rose-red':
      return pick(RED_ROSE_TONES);
    case 'rose-white':
      return pick(WHITE_ROSE_TONES);
    case 'lotus-pink':
      return pick(PINK_LOTUS_TONES);
    case 'lotus-white':
      return pick(WHITE_LOTUS_TONES);
    case 'lily':
      return pick(LILY_TONES);
    case 'marigold':
      return pick(MARIGOLD_TONES);
    case 'floral-flake':
      return pick(FLAKE_TONES);
  }
}

export function FloatingFloralLayer({
  intensity = 'ambient',
}: {
  intensity?: FloralIntensity;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const intensityRef = useRef<FloralIntensity>(intensity);

  useEffect(() => {
    intensityRef.current = intensity;
  }, [intensity]);

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
    const ambientCount = isMobile ? 24 : 38;
    const elevatedCount = isMobile ? 38 : 60;
    const climaxCount = isMobile ? 50 : 78;

    const makePetal = (startRandomY: boolean, tier: 0 | 1 | 2): Petal => {
      const kind = pickSpecies();
      const depth = 0.58 + Math.random() * 0.8;
      const baseSize =
        kind === 'lotus-pink' || kind === 'lotus-white'
          ? 10.5 + Math.random() * 5.5
          : kind === 'lily'
          ? 11 + Math.random() * 5
          : kind === 'floral-flake'
          ? 4.2 + Math.random() * 3.2
          : 8 + Math.random() * 5.5;
      const tonePair = getTonePair(kind);

      return {
        x: Math.random() * width,
        y: startRandomY ? Math.random() * height : -28 - Math.random() * 90,
        vx: (Math.random() - 0.5) * 0.36,
        vy: (0.48 + Math.random() * 0.72) * depth,
        size: baseSize * depth,
        depth,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.02,
        flutterPhase: Math.random() * Math.PI * 2,
        flutterSpeed: 0.015 + Math.random() * 0.024,
        windBias: (Math.random() - 0.5) * 0.28,
        kind,
        alpha: Math.min(0.84, 0.36 + depth * 0.32),
        fillA: tonePair[0],
        fillB: tonePair[1],
        tier,
      };
    };

    const petals: Petal[] = Array.from({ length: climaxCount }, (_, idx) => {
      const tier: 0 | 1 | 2 = idx < ambientCount ? 0 : idx < elevatedCount ? 1 : 2;
      return makePetal(true, tier);
    });

    let lastScrollY = window.scrollY;
    let scrollDraft = 0;
    const onScroll = () => {
      const curr = window.scrollY;
      scrollDraft = Math.max(-10, Math.min(10, (curr - lastScrollY) * 0.1));
      lastScrollY = curr;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    let breezeTime = 0;
    let animId = 0;

    const drawRosePetal = (p: Petal) => {
      const s = p.size;
      const grad = ctx.createLinearGradient(-s, -s, s, s);
      grad.addColorStop(0, p.fillA);
      grad.addColorStop(1, p.fillB);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -s);
      ctx.bezierCurveTo(s * 0.96, -s * 0.72, s * 1.04, s * 0.44, s * 0.14, s * 0.96);
      ctx.quadraticCurveTo(0, s * 0.64, -s * 0.24, s * 0.92);
      ctx.bezierCurveTo(-s * 1.04, s * 0.48, -s * 0.86, -s * 0.65, 0, -s);
      ctx.fill();

      ctx.strokeStyle =
        p.kind === 'rose-white' ? 'rgba(196, 154, 69, 0.28)' : 'rgba(255, 246, 240, 0.32)';
      ctx.lineWidth = 0.6;
      ctx.stroke();
    };

    const drawLotusPetal = (p: Petal) => {
      const s = p.size;
      const grad = ctx.createLinearGradient(0, -s * 1.25, 0, s);
      grad.addColorStop(0, p.fillA);
      grad.addColorStop(1, p.fillB);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.25);
      ctx.bezierCurveTo(s * 0.76, -s * 0.32, s * 0.62, s * 0.56, 0, s * 0.92);
      ctx.bezierCurveTo(-s * 0.62, s * 0.56, -s * 0.76, -s * 0.32, 0, -s * 1.25);
      ctx.fill();

      ctx.strokeStyle =
        p.kind === 'lotus-white' ? 'rgba(232, 131, 155, 0.42)' : 'rgba(255, 232, 180, 0.42)';
      ctx.lineWidth = 0.65;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.65);
      ctx.lineTo(0, -s * 0.85);
      ctx.stroke();
    };

    const drawLilyPetal = (p: Petal) => {
      const s = p.size;
      const grad = ctx.createLinearGradient(0, -s * 1.35, 0, s * 0.85);
      grad.addColorStop(0, p.fillA);
      grad.addColorStop(1, p.fillB);

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.moveTo(0, -s * 1.35);
      ctx.bezierCurveTo(s * 0.42, -s * 0.55, s * 0.48, s * 0.35, 0, s * 0.85);
      ctx.bezierCurveTo(-s * 0.48, s * 0.35, -s * 0.42, -s * 0.55, 0, -s * 1.35);
      ctx.fill();

      ctx.strokeStyle = 'rgba(217, 119, 6, 0.35)';
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(0, s * 0.55);
      ctx.lineTo(0, -s * 0.95);
      ctx.stroke();
    };

    const drawMarigoldPetal = (p: Petal) => {
      const s = p.size * 0.86;
      ctx.fillStyle = p.fillA;
      ctx.beginPath();
      ctx.ellipse(0, 0, s * 0.46, s * 0.96, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = p.fillB;
      ctx.beginPath();
      ctx.ellipse(0, s * 0.24, s * 0.28, s * 0.48, 0, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawFloralFlake = (p: Petal) => {
      const s = p.size;
      ctx.fillStyle = p.fillA;
      for (let k = 0; k < 4; k++) {
        ctx.save();
        ctx.rotate((k * Math.PI) / 2);
        ctx.beginPath();
        ctx.ellipse(0, -s * 0.55, s * 0.32, s * 0.55, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.fillStyle = p.fillB;
      ctx.beginPath();
      ctx.arc(0, 0, s * 0.28, 0, Math.PI * 2);
      ctx.fill();
    };

    const tick = () => {
      ctx.clearRect(0, 0, width, height);
      scrollDraft *= 0.88;
      breezeTime += 0.012;
      const globalBreeze = Math.sin(breezeTime) * 0.25;

      const mode = intensityRef.current;
      const activeLimit =
        mode === 'climax' ? climaxCount : mode === 'elevated' ? elevatedCount : ambientCount;

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.flutterPhase += p.flutterSpeed;
        p.x += p.vx + p.windBias + globalBreeze * p.depth + Math.sin(p.flutterPhase) * (0.55 * p.depth);
        p.y += p.vy + scrollDraft * 0.2;
        p.rotation += p.rotSpeed + Math.cos(p.flutterPhase) * 0.008;

        if (p.y > height + 36) {
          petals[i] = makePetal(false, p.tier);
        } else if (p.y < -105) {
          p.y = height + 18;
        }
        if (p.x > width + 36) p.x = -24;
        if (p.x < -36) p.x = width + 24;

        if (i >= activeLimit) continue;

        // Soften opacity slightly in central reading zone so text always stays ultra-legible
        const centerDist = Math.abs(p.x - width * 0.5) / Math.max(1, width * 0.5);
        const legibilityFactor = 0.64 + Math.min(1, centerDist) * 0.36;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.scale(
          0.76 + Math.cos(p.flutterPhase * 1.1) * 0.26,
          0.66 + Math.sin(p.flutterPhase * 1.45) * 0.34
        );
        ctx.globalAlpha = p.alpha * legibilityFactor;

        if (p.depth > 1.08) {
          ctx.shadowColor = 'rgba(43, 20, 24, 0.14)';
          ctx.shadowBlur = 4;
          ctx.shadowOffsetY = 2;
        }

        if (p.kind === 'lotus-pink' || p.kind === 'lotus-white') {
          drawLotusPetal(p);
        } else if (p.kind === 'lily') {
          drawLilyPetal(p);
        } else if (p.kind === 'marigold') {
          drawMarigoldPetal(p);
        } else if (p.kind === 'floral-flake') {
          drawFloralFlake(p);
        } else {
          drawRosePetal(p);
        }

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
