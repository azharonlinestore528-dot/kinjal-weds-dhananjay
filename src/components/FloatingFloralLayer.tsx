import { useEffect, useState } from 'react';

type PetalKind =
  | 'rose-pink'
  | 'rose-red'
  | 'rose-white'
  | 'lotus-pink'
  | 'lily-white'
  | 'marigold';

interface StaticPetalSpec {
  id: number;
  kind: PetalKind;
  leftPct: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
  anim: 'a' | 'b' | 'c';
  desktopOnly?: boolean;
}

// Controlled pool: 18 petals visible on mobile, 28 on desktop; zero JS render loop.
const CONTROLLED_PETALS: StaticPetalSpec[] = [
  { id: 1, kind: 'rose-pink', leftPct: 4, sizePx: 18, durationSec: 12.5, delaySec: -2, anim: 'a' },
  { id: 2, kind: 'lotus-pink', leftPct: 9, sizePx: 23, durationSec: 15.5, delaySec: -7, anim: 'b' },
  { id: 3, kind: 'marigold', leftPct: 14, sizePx: 16, durationSec: 13.5, delaySec: -4, anim: 'c' },
  { id: 4, kind: 'lily-white', leftPct: 19, sizePx: 21, durationSec: 17.2, delaySec: -10, anim: 'b', desktopOnly: true },
  { id: 5, kind: 'rose-red', leftPct: 24, sizePx: 19, durationSec: 14.5, delaySec: -6, anim: 'a' },
  { id: 6, kind: 'rose-white', leftPct: 29, sizePx: 17, durationSec: 18.4, delaySec: -12, anim: 'c' },
  { id: 7, kind: 'marigold', leftPct: 34, sizePx: 18, durationSec: 13.8, delaySec: -3, anim: 'a', desktopOnly: true },
  { id: 8, kind: 'lotus-pink', leftPct: 39, sizePx: 22, durationSec: 16.4, delaySec: -9, anim: 'b' },
  { id: 9, kind: 'rose-pink', leftPct: 44, sizePx: 19, durationSec: 12.9, delaySec: -5, anim: 'c' },
  { id: 10, kind: 'lily-white', leftPct: 49, sizePx: 20, durationSec: 17.5, delaySec: -11, anim: 'b', desktopOnly: true },
  { id: 11, kind: 'rose-red', leftPct: 54, sizePx: 17, durationSec: 15.1, delaySec: -1, anim: 'a' },
  { id: 12, kind: 'rose-white', leftPct: 59, sizePx: 16, durationSec: 14.2, delaySec: -8, anim: 'c' },
  { id: 13, kind: 'marigold', leftPct: 64, sizePx: 15, durationSec: 18.0, delaySec: -14, anim: 'b' },
  { id: 14, kind: 'lotus-pink', leftPct: 69, sizePx: 24, durationSec: 16.2, delaySec: -11, anim: 'a', desktopOnly: true },
  { id: 15, kind: 'rose-red', leftPct: 74, sizePx: 18, durationSec: 14.8, delaySec: -13, anim: 'c' },
  { id: 16, kind: 'rose-pink', leftPct: 79, sizePx: 20, durationSec: 13.4, delaySec: -6, anim: 'a' },
  { id: 17, kind: 'lily-white', leftPct: 84, sizePx: 19, durationSec: 18.8, delaySec: -15, anim: 'b' },
  { id: 18, kind: 'marigold', leftPct: 89, sizePx: 16, durationSec: 15.6, delaySec: -9, anim: 'c' },
  { id: 19, kind: 'rose-white', leftPct: 94, sizePx: 17, durationSec: 14.4, delaySec: -4, anim: 'a' },
  { id: 20, kind: 'lotus-pink', leftPct: 16, sizePx: 20, durationSec: 19.2, delaySec: -16, anim: 'c', desktopOnly: true },
  { id: 21, kind: 'rose-red', leftPct: 32, sizePx: 16, durationSec: 16.8, delaySec: -12, anim: 'b', desktopOnly: true },
  { id: 22, kind: 'marigold', leftPct: 47, sizePx: 19, durationSec: 14.1, delaySec: -7, anim: 'a', desktopOnly: true },
  { id: 23, kind: 'lily-white', leftPct: 61, sizePx: 22, durationSec: 17.9, delaySec: -3, anim: 'c', desktopOnly: true },
  { id: 24, kind: 'rose-pink', leftPct: 76, sizePx: 16, durationSec: 15.9, delaySec: -14, anim: 'b', desktopOnly: true },
  { id: 25, kind: 'rose-white', leftPct: 87, sizePx: 18, durationSec: 18.2, delaySec: -5, anim: 'a', desktopOnly: true },
  { id: 26, kind: 'lotus-pink', leftPct: 26, sizePx: 19, durationSec: 14.7, delaySec: -10, anim: 'a' },
  { id: 27, kind: 'rose-red', leftPct: 71, sizePx: 17, durationSec: 16.5, delaySec: -8, anim: 'b' },
  { id: 28, kind: 'marigold', leftPct: 52, sizePx: 16, durationSec: 13.9, delaySec: -2, anim: 'c' },
];

function PetalSvg({ kind, sizePx }: { kind: PetalKind; sizePx: number }) {
  if (kind === 'lotus-pink') {
    return (
      <svg width={sizePx} height={sizePx * 1.2} viewBox="0 0 24 28" fill="none">
        <path
          d="M12 2C17.5 8 18.5 19.5 12 26C5.5 19.5 6.5 8 12 2Z"
          fill="#F48FB1"
          fillOpacity="0.92"
          stroke="#DB6387"
          strokeWidth="0.7"
        />
        <line x1="12" y1="6" x2="12" y2="23" stroke="#FFF4E6" strokeOpacity="0.65" strokeWidth="0.8" />
      </svg>
    );
  }

  if (kind === 'lily-white') {
    return (
      <svg width={sizePx} height={sizePx * 1.25} viewBox="0 0 22 28" fill="none">
        <path
          d="M11 1C15.5 7 16.5 17 11 26C5.5 17 6.5 7 11 1Z"
          fill="#FFFBF2"
          fillOpacity="0.94"
          stroke="#D6B56A"
          strokeWidth="0.75"
        />
        <line x1="11" y1="5" x2="11" y2="23" stroke="#DFBA66" strokeOpacity="0.6" strokeWidth="0.7" />
      </svg>
    );
  }

  if (kind === 'marigold') {
    return (
      <svg width={sizePx} height={sizePx} viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="7" fill="#F59E0B" fillOpacity="0.92" />
        <path
          d="M12 3 L14.5 8 L20 7 L16.5 12 L20 17 L14.5 16 L12 21 L9.5 16 L4 17 L7.5 12 L4 7 L9.5 8 Z"
          fill="#FBBF24"
          fillOpacity="0.82"
          stroke="#D97706"
          strokeWidth="0.5"
        />
      </svg>
    );
  }

  const fill =
    kind === 'rose-red' ? '#BE123C' : kind === 'rose-white' ? '#FAF3E6' : '#F47296';
  const stroke =
    kind === 'rose-red' ? '#7A1126' : kind === 'rose-white' ? '#D6C4A6' : '#D95A7A';

  return (
    <svg width={sizePx} height={sizePx} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C19 4 22 14 14 21C12 19 10 21 8 20C2 14 5 5 12 2Z"
        fill={fill}
        fillOpacity="0.9"
        stroke={stroke}
        strokeWidth="0.75"
      />
    </svg>
  );
}

export function FloatingFloralLayer() {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleVisibility = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-30 overflow-hidden pointer-events-none select-none motion-reduce:hidden"
    >
      {CONTROLLED_PETALS.map((p) => {
        const animClass =
          p.anim === 'a'
            ? 'animate-petal-a'
            : p.anim === 'b'
            ? 'animate-petal-b'
            : 'animate-petal-c';
        return (
          <div
            key={p.id}
            className={`absolute top-0 ${p.desktopOnly ? 'hidden sm:block' : ''} ${animClass}`}
            style={{
              left: `${p.leftPct}%`,
              animationDuration: `${p.durationSec}s`,
              animationDelay: `${p.delaySec}s`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          >
            <PetalSvg kind={p.kind} sizePx={p.sizePx} />
          </div>
        );
      })}
    </div>
  );
}
