import { ChevronUp, Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralJhoomar, HangingFloralToran } from './OrnamentalMotifs';
import { DecorativeCutout, SwingingLotusGarland } from './RoyalBotanicalDecor';

const LANTERN_SPARKLES = [
  { id: 1, x: -56, y: -12, size: 10, delay: '0s' },
  { id: 2, x: 58, y: -8, size: 9, delay: '-0.8s' },
  { id: 3, x: -34, y: 36, size: 11, delay: '-1.5s' },
  { id: 4, x: 38, y: 38, size: 10, delay: '-0.4s' },
  { id: 5, x: -72, y: 22, size: 8, delay: '-2.1s' },
  { id: 6, x: 74, y: 24, size: 8, delay: '-1.2s' },
  { id: 7, x: 0, y: -44, size: 11, delay: '-1.8s' },
];

function GateSideJasmineMarigoldStrand({
  side,
  className = '',
}: {
  side: 'left' | 'right';
  className?: string;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 88 320"
      fill="none"
      className={`pointer-events-none select-none ${
        side === 'right' ? '-scale-x-100' : ''
      } ${className}`}
    >
      {/* Green Botanical Trailing Vine */}
      <path
        d="M24 0 C32 70 12 135 28 210 C38 255 20 290 26 312"
        stroke="#3B623E"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      />
      {/* Fresh Green Leaves along the Vine */}
      {[34, 88, 146, 204, 260].map((ly, i) => (
        <g
          key={ly}
          transform={`translate(${i % 2 === 0 ? 18 : 34}, ${ly}) rotate(${
            i % 2 === 0 ? -28 : 28
          })`}
        >
          <path
            d="M0 0 C8 -8 18 -6 20 2 C12 8 4 6 0 0 Z"
            fill={i % 2 === 0 ? '#4F7750' : '#3F6212'}
          />
        </g>
      ))}
      {/* Hanging Jasmine Garlands (White Mogra Buds) */}
      <path d="M46 0 V188" stroke="#FAF5EB" strokeWidth="1.5" strokeOpacity="0.85" />
      {[20, 42, 64, 86, 108, 130, 152, 174].map((y, idx) => (
        <g key={y} transform={`translate(46, ${y})`}>
          <circle
            cx="0"
            cy="0"
            r={idx % 3 === 0 ? 6.5 : 4.5}
            fill="#FFFDF7"
            stroke="#DFBA66"
            strokeWidth="0.8"
          />
          {idx % 3 === 0 && <circle cx="0" cy="0" r="2.2" fill="#F59E0B" />}
        </g>
      ))}
      {/* Golden Bell Tip */}
      <path d="M40 188 L52 188 L56 198 L36 198 Z" fill="#C49A45" />
      <circle cx="46" cy="201" r="3" fill="#F59E0B" />

      {/* Orange & Yellow Marigold + Pink/White Rose Clusters */}
      {[
        { x: 24, y: 24, r: 13, fill: '#F59E0B', ring: '#FBBF24' },
        { x: 20, y: 66, r: 12, fill: '#F47296', ring: '#FBCFE8' },
        { x: 30, y: 112, r: 14, fill: '#FBBF24', ring: '#F59E0B' },
        { x: 20, y: 158, r: 12, fill: '#FFFDF7', ring: '#F7D0D8' },
        { x: 26, y: 212, r: 13, fill: '#E8839B', ring: '#FAF5EB' },
        { x: 24, y: 262, r: 11, fill: '#F59E0B', ring: '#FDE68A' },
      ].map((f, idx) => (
        <g key={idx} transform={`translate(${f.x}, ${f.y})`}>
          <circle cx="0" cy="0" r={f.r} fill={f.fill} stroke="#C49A45" strokeWidth="0.9" />
          <circle cx="0" cy="0" r={f.r * 0.62} fill={f.ring} fillOpacity="0.82" />
          <circle cx="0" cy="0" r="3" fill="#B45309" />
        </g>
      ))}
    </svg>
  );
}

function GateUpperFloralCanopy({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 920 120"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Arching Botanical Leaf Vines */}
      <path
        d="M16 14 Q230 62 460 18 Q690 62 904 14"
        stroke="#3B623E"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M40 6 Q250 48 460 10 Q670 48 880 6"
        stroke="#4F7750"
        strokeWidth="2.5"
        fill="none"
      />
      {/* Jasmine Festoons */}
      <path
        d="M120 26 Q230 78 340 28"
        stroke="#FFFDF7"
        strokeWidth="2.5"
        strokeDasharray="4 5"
        fill="none"
      />
      <path
        d="M580 28 Q690 78 800 26"
        stroke="#FFFDF7"
        strokeWidth="2.5"
        strokeDasharray="4 5"
        fill="none"
      />

      {/* Alternating Pink Roses, White Roses, Pink Lotuses, Orange/Yellow Marigolds & Green Leaves */}
      {[
        { x: 70, y: 22, kind: 'marigold-orange' },
        { x: 122, y: 30, kind: 'rose-pink' },
        { x: 175, y: 36, kind: 'rose-white' },
        { x: 228, y: 40, kind: 'marigold-yellow' },
        { x: 282, y: 36, kind: 'lotus-pink' },
        { x: 336, y: 30, kind: 'rose-white' },
        { x: 392, y: 24, kind: 'marigold-orange' },
        { x: 528, y: 24, kind: 'marigold-orange' },
        { x: 584, y: 30, kind: 'rose-white' },
        { x: 638, y: 36, kind: 'lotus-pink' },
        { x: 692, y: 40, kind: 'marigold-yellow' },
        { x: 745, y: 36, kind: 'rose-white' },
        { x: 798, y: 30, kind: 'rose-pink' },
        { x: 850, y: 22, kind: 'marigold-orange' },
      ].map((b) => {
        const primary =
          b.kind === 'marigold-orange'
            ? '#F59E0B'
            : b.kind === 'marigold-yellow'
            ? '#FACC15'
            : b.kind === 'rose-white'
            ? '#FFFBF2'
            : '#F47296';
        const inner =
          b.kind === 'marigold-orange'
            ? '#FBBF24'
            : b.kind === 'marigold-yellow'
            ? '#F59E0B'
            : b.kind === 'rose-white'
            ? '#F7D0D8'
            : '#FBCFE8';
        return (
          <g key={b.x} transform={`translate(${b.x}, ${b.y})`}>
            <path d="M-16 -4 C-12 -14 -4 -14 -2 -4 Z" fill="#4F7750" />
            <path d="M16 -4 C12 -14 4 -14 2 -4 Z" fill="#3B623E" />
            <circle cx="0" cy="0" r="12.5" fill={primary} stroke="#C49A45" strokeWidth="0.9" />
            <circle cx="0" cy="0" r="7.2" fill={inner} />
            <circle cx="0" cy="0" r="2.6" fill="#C49A45" />
          </g>
        );
      })}
    </svg>
  );
}

export function RoyalFloralGate() {
  const [isOpeningBurst, setIsOpeningBurst] = useState(false);
  const resetTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
    };
  }, []);

  const handleTapToOpen = () => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      setIsOpeningBurst(true);
      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }
      resetTimerRef.current = window.setTimeout(() => {
        setIsOpeningBurst(false);
      }, 920);
    }

    const invitationEl = document.getElementById('royal-invitation');
    if (invitationEl) {
      invitationEl.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section
      id="wedding-gate"
      aria-label="Royal Indian Floral Wedding Entrance Gate"
      className="relative z-30 w-full h-[100svh] min-h-[100dvh] bg-[#24080E] overflow-hidden select-none"
    >
      {/* Atmospheric Palace Backdrop on Desktop Flanking the Carved Gate */}
      <div
        aria-hidden="true"
        className="hidden md:block absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 48%, #4F141D 0%, #2B0910 55%, #160408 100%)',
        }}
      />

      {/* Desktop Side Royal Coconut Palms with Natural Gentle Sway */}
      <DecorativeCutout
        src={weddingConfig.decor.coconutPalm}
        alt=""
        eager
        className="hidden md:block absolute bottom-0 -left-10 lg:left-0 w-56 lg:w-72 h-auto opacity-85 z-10 animate-floral-sway-1"
      />
      <DecorativeCutout
        src={weddingConfig.decor.coconutPalm}
        alt=""
        flipHorizontal
        eager
        className="hidden md:block absolute bottom-0 -right-10 lg:right-0 w-56 lg:w-72 h-auto opacity-85 z-10 animate-floral-sway-2"
      />

      {/* Full-Bleed Custom Floral Wedding Gate Artwork */}
      <img
        src={weddingConfig.assets.royalFloralGateImage}
        alt="Full-screen traditional Indian royal floral wedding gate adorned with pink roses, lotus flowers, jasmine, and marigold garlands"
        decoding="async"
        referrerPolicy="no-referrer"
        className="relative z-10 w-full h-full object-cover object-center md:max-w-[580px] lg:max-w-[660px] md:mx-auto md:shadow-[0_0_90px_rgba(223,186,102,0.35)] block"
      />

      {/* TOP-CENTER GATE DECORATIVE LIGHT — Warm Golden Glow, Gentle Shimmer & Sparkles */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[6%] sm:top-[7%] left-1/2 -translate-x-1/2 z-30 flex items-center justify-center"
      >
        <div
          className="animate-lantern-glow w-40 h-40 sm:w-56 sm:h-56 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(255, 246, 206, 0.82) 0%, rgba(253, 224, 132, 0.45) 36%, rgba(223, 186, 102, 0.14) 64%, rgba(223, 186, 102, 0) 82%)',
          }}
        />
        <div
          className="animate-lantern-glow absolute w-16 h-16 sm:w-22 sm:h-22 rounded-full"
          style={{
            animationDelay: '-1.5s',
            background:
              'radial-gradient(circle, rgba(255, 255, 245, 0.9) 0%, rgba(253, 230, 138, 0.45) 55%, transparent 80%)',
          }}
        />
        {LANTERN_SPARKLES.map((sp) => (
          <span
            key={sp.id}
            className="absolute"
            style={{ transform: `translate(${sp.x}px, ${sp.y}px)` }}
          >
            <svg
              width={sp.size}
              height={sp.size}
              viewBox="0 0 16 16"
              fill="none"
              className="animate-sparkle-twinkle block"
              style={{ animationDelay: sp.delay }}
            >
              <path
                d="M8 0 L9.8 6.2 L16 8 L9.8 9.8 L8 16 L6.2 9.8 L0 8 L6.2 6.2 Z"
                fill="#FFF8DF"
              />
            </svg>
          </span>
        ))}
      </div>

      {/* Subtle Top Antique Gold Trim */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#9F7624] via-[#FDE68A] to-[#9F7624] z-30"
      />

      {/* Upper Floral Archway Canopy */}
      <GateUpperFloralCanopy className="absolute top-0 left-1/2 -translate-x-1/2 w-[112%] sm:w-[760px] lg:w-[920px] z-30 opacity-95 animate-floral-float" />

      {/* Central Draped Lotus Toran */}
      <HangingFloralToran
        tone="lotus"
        className="absolute top-2 left-1/2 -translate-x-1/2 w-[310px] sm:w-[480px] opacity-95 z-30"
      />

      {/* Hanging Jasmine & Marigold Garlands Along Left & Right Gate Sides */}
      <GateSideJasmineMarigoldStrand
        side="left"
        className="absolute top-12 sm:top-16 left-0 sm:left-3 lg:left-14 w-14 sm:w-20 lg:w-24 h-auto opacity-95 z-20 animate-lotus-swing-b"
      />
      <GateSideJasmineMarigoldStrand
        side="right"
        className="absolute top-12 sm:top-16 right-0 sm:right-3 lg:right-14 w-14 sm:w-20 lg:w-24 h-auto opacity-95 z-20 animate-lotus-swing-d"
      />

      {/* Hanging Lotus Garlands with Distinct Natural Swinging Speeds */}
      <SwingingLotusGarland
        timing="a"
        eager
        className="absolute top-0 left-1 sm:left-6 lg:left-20 w-10 sm:w-14 lg:w-18 h-36 sm:h-52 lg:h-64 z-30 opacity-95"
      />
      <SwingingLotusGarland
        timing="d"
        flipHorizontal
        eager
        className="absolute top-0 right-1 sm:right-6 lg:right-20 w-10 sm:w-14 lg:w-18 h-36 sm:h-52 lg:h-64 z-30 opacity-95"
      />
      <SwingingLotusGarland
        timing="c"
        eager
        className="hidden sm:block absolute top-0 left-20 lg:left-40 w-10 lg:w-13 h-36 lg:h-48 z-20 opacity-90"
      />
      <SwingingLotusGarland
        timing="b"
        flipHorizontal
        eager
        className="hidden sm:block absolute top-0 right-20 lg:right-40 w-10 lg:w-13 h-36 lg:h-48 z-20 opacity-90"
      />

      {/* Marigold Jhoomars Flanking Both Upper Sides */}
      <FloralJhoomar
        variant="marigold"
        className="hidden sm:block absolute top-0 left-32 lg:left-56 w-16 lg:w-20 h-40 lg:h-48 opacity-95 z-20 animate-lotus-swing-b"
      />
      <FloralJhoomar
        variant="marigold"
        className="hidden sm:block absolute top-0 right-32 lg:right-56 w-16 lg:w-20 h-40 lg:h-48 opacity-95 z-20 animate-lotus-swing-a"
      />

      {/* Flowers & Leaves Around the Gate — Varied Floating & Swaying Motion */}
      <DecorativeCutout
        src={weddingConfig.decor.bougainvilleaBranch}
        alt=""
        eager
        className="absolute -top-2 -left-4 w-36 sm:w-52 lg:w-64 h-auto opacity-95 z-20 animate-floral-sway-1"
      />
      <DecorativeCutout
        src={weddingConfig.decor.bougainvilleaBranch}
        alt=""
        flipHorizontal
        eager
        className="absolute -top-2 -right-4 w-36 sm:w-52 lg:w-64 h-auto opacity-95 z-20 animate-floral-sway-2"
      />

      <DecorativeCutout
        src={weddingConfig.decor.bougainvilleaBranch}
        alt=""
        eager
        className="hidden sm:block absolute top-1/3 -left-10 w-36 lg:w-44 h-auto opacity-85 z-20 -rotate-12 animate-floral-float"
      />
      <DecorativeCutout
        src={weddingConfig.decor.bougainvilleaBranch}
        alt=""
        flipHorizontal
        eager
        className="hidden sm:block absolute top-1/3 -right-10 w-36 lg:w-44 h-auto opacity-85 z-20 rotate-12 animate-floral-sway-1"
      />

      <DecorativeCutout
        src={weddingConfig.decor.lotusCluster}
        alt=""
        eager
        className="absolute -bottom-3 -left-4 w-28 sm:w-44 lg:w-52 h-auto opacity-95 z-30 animate-floral-float"
      />
      <DecorativeCutout
        src={weddingConfig.decor.lotusCluster}
        alt=""
        flipHorizontal
        eager
        className="absolute -bottom-3 -right-4 w-28 sm:w-44 lg:w-52 h-auto opacity-95 z-30 animate-floral-sway-2"
      />

      {/* Repeatable Golden-White Shine Burst on TAP TO OPEN */}
      {isOpeningBurst && (
        <div
          aria-hidden="true"
          className="animate-gate-golden-flash pointer-events-none absolute inset-0 z-40"
          style={{
            background:
              'radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.94) 0%, rgba(255, 242, 198, 0.85) 28%, rgba(223, 186, 102, 0.48) 56%, rgba(250, 245, 235, 0) 82%)',
          }}
        />
      )}

      {/* Bottom Warm Golden Threshold Shine */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none z-20 opacity-50"
        style={{
          background:
            'linear-gradient(to top, rgba(255, 232, 168, 0.72) 0%, rgba(223, 186, 102, 0.28) 55%, transparent 100%)',
        }}
      />

      {/* Prominent Royal Gold & Ivory "TAP TO OPEN" Button Anchored Inside Gate */}
      <div className="absolute bottom-7 sm:bottom-11 left-1/2 -translate-x-1/2 z-50">
        <span
          aria-hidden="true"
          className="animate-tap-halo pointer-events-none absolute -inset-2 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(253, 230, 138, 0.55) 0%, rgba(223, 186, 102, 0.2) 55%, transparent 80%)',
          }}
        />

        <button
          type="button"
          onClick={handleTapToOpen}
          className="relative group inline-flex items-center justify-center gap-3 min-h-[52px] px-8 py-3.5 sm:px-10 sm:py-4 rounded-full border-2 border-[#DFBA66] bg-gradient-to-b from-[#FFFDF7] via-[#FAF0D6] to-[#EED397] text-[#5C1222] shadow-[0_0_32px_rgba(253,230,138,0.6),0_12px_28px_rgba(18,4,8,0.68)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FDE68A]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-1 rounded-full border border-[#9F7624]/55"
          />
          <Sparkles className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-[#9F7624] shrink-0" />
          <span className="relative z-10 text-sm sm:text-base font-bold tracking-[0.26em] uppercase">
            TAP TO OPEN
          </span>
          <ChevronUp className="relative z-10 w-4 h-4 sm:w-5 sm:h-5 text-[#7A1B2E] transition-transform duration-300 group-hover:-translate-y-0.5 shrink-0" />
        </button>
      </div>
    </section>
  );
}
