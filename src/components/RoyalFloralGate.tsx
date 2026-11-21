import { ChevronUp, Sparkles } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralJhoomar, HangingFloralToran } from './OrnamentalMotifs';
import { DecorativeCutout, SwingingLotusGarland } from './RoyalBotanicalDecor';

export type GateState = 'closed' | 'opening' | 'entered';

interface GoldenMoteSpec {
  id: number;
  leftPct: number;
  topPct: number;
  sizePx: number;
  delaySec: number;
  durationSec: number;
}

const GOLDEN_MOTES: GoldenMoteSpec[] = [
  { id: 1, leftPct: 12, topPct: 26, sizePx: 14, delaySec: 0, durationSec: 3.4 },
  { id: 2, leftPct: 22, topPct: 62, sizePx: 18, delaySec: -1.1, durationSec: 4.1 },
  { id: 3, leftPct: 31, topPct: 38, sizePx: 12, delaySec: -2.0, durationSec: 3.3 },
  { id: 4, leftPct: 41, topPct: 72, sizePx: 20, delaySec: -0.5, durationSec: 4.5 },
  { id: 5, leftPct: 50, topPct: 30, sizePx: 16, delaySec: -1.6, durationSec: 3.8 },
  { id: 6, leftPct: 56, topPct: 54, sizePx: 22, delaySec: -0.8, durationSec: 4.2 },
  { id: 7, leftPct: 65, topPct: 22, sizePx: 14, delaySec: -2.3, durationSec: 3.6 },
  { id: 8, leftPct: 73, topPct: 68, sizePx: 17, delaySec: -1.3, durationSec: 4.0 },
  { id: 9, leftPct: 82, topPct: 36, sizePx: 15, delaySec: -0.3, durationSec: 3.7 },
  { id: 10, leftPct: 89, topPct: 58, sizePx: 19, delaySec: -2.1, durationSec: 4.4 },
  { id: 11, leftPct: 18, topPct: 48, sizePx: 11, delaySec: -1.5, durationSec: 3.2 },
  { id: 12, leftPct: 67, topPct: 44, sizePx: 13, delaySec: -0.7, durationSec: 3.5 },
];

export function RoyalFloralGate({
  state,
  onTriggerOpen,
}: {
  state: GateState;
  onTriggerOpen: () => void;
}) {
  const touchStartYRef = useRef<number | null>(null);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (state === 'entered') {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      return;
    }

    // Lock background scroll at the very top while the entrance gate is closed or opening
    // so the visitor always lands cleanly at the Kinjal & Dhananjay countdown hero.
    window.scrollTo(0, 0);
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';

    if (state !== 'closed') {
      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    }

    const fireOnce = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      onTriggerOpen();
    };

    const handleWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) >= 12) {
        e.preventDefault();
        fireOnce();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        touchStartYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null || e.touches.length === 0) return;
      const delta = touchStartYRef.current - e.touches[0].clientY;
      if (delta > 22) {
        e.preventDefault();
        fireOnce();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [state, onTriggerOpen]);

  if (state === 'entered') return null;

  const isOpening = state === 'opening';

  const handleButtonClick = () => {
    if (triggeredRef.current || isOpening) return;
    triggeredRef.current = true;
    onTriggerOpen();
  };

  return (
    <div
      role="region"
      aria-label="Royal Indian Floral Wedding Entrance Gate"
      className={`fixed inset-0 z-50 w-screen h-[100svh] min-h-[100dvh] overflow-hidden select-none touch-none ${
        isOpening ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* Revealed Palace Sanctuary Depth Backdrop + Golden Motes + Light Flash (During Opening) */}
      {isOpening && (
        <div
          aria-hidden="true"
          className="animate-gate-backdrop-fade absolute inset-0 z-10 pointer-events-none overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 90% 75% at 50% 42%, #FFF7E4 0%, #F5E5C3 52%, #E5C890 100%)',
          }}
        >
          <img
            src={weddingConfig.assets.udaipurPalaceArchImage}
            alt=""
            decoding="async"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center opacity-35 mix-blend-multiply"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 44%, rgba(255, 248, 224, 0.72) 0%, rgba(250, 240, 214, 0.45) 48%, rgba(92, 18, 34, 0.14) 100%)',
            }}
          />

          {/* Shimmering Golden Light Particles */}
          <div className="absolute inset-0 motion-reduce:hidden">
            {GOLDEN_MOTES.map((mote) => (
              <span
                key={mote.id}
                className="animate-golden-mote absolute rounded-full"
                style={{
                  left: `${mote.leftPct}%`,
                  top: `${mote.topPct}%`,
                  width: `${mote.sizePx}px`,
                  height: `${mote.sizePx}px`,
                  animationDelay: `${mote.delaySec}s`,
                  animationDuration: `${mote.durationSec}s`,
                  background:
                    'radial-gradient(circle, rgba(255, 252, 232, 0.96) 0%, rgba(246, 209, 118, 0.74) 45%, rgba(223, 186, 102, 0) 75%)',
                }}
              />
            ))}
          </div>

          {/* Cinematic Golden-White Light Flash */}
          <div
            className="animate-gate-golden-flash absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 50% 46%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 242, 198, 0.92) 28%, rgba(223, 186, 102, 0.56) 56%, rgba(250, 245, 235, 0) 82%)',
            }}
          />
        </div>
      )}

      {/* Full-Screen Traditional Indian Floral Wedding Gate Curtain */}
      <div
        className={`relative z-20 w-full h-full bg-[#24080E] overflow-hidden ${
          isOpening ? 'animate-gate-curtain-lift' : ''
        }`}
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
          className="hidden md:block absolute bottom-0 -left-10 lg:left-0 w-56 lg:w-72 h-auto opacity-80 z-10 animate-floral-sway-1"
        />
        <DecorativeCutout
          src={weddingConfig.decor.coconutPalm}
          alt=""
          flipHorizontal
          eager
          className="hidden md:block absolute bottom-0 -right-10 lg:right-0 w-56 lg:w-72 h-auto opacity-80 z-10 animate-floral-sway-2"
        />

        {/* Full-Bleed Custom Floral Wedding Gate Artwork */}
        <img
          src={weddingConfig.assets.royalFloralGateImage}
          alt="Full-screen traditional Indian royal floral wedding gate adorned with pink roses, lotus flowers, jasmine, and marigold garlands"
          decoding="async"
          referrerPolicy="no-referrer"
          className="relative z-10 w-full h-full object-cover object-center md:max-w-[580px] lg:max-w-[660px] md:mx-auto md:shadow-[0_0_90px_rgba(223,186,102,0.35)] block"
        />

        {/* Subtle Top Antique Gold Trim */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#9F7624] via-[#FDE68A] to-[#9F7624] z-30"
        />

        {/* Top Draped Floral Toran */}
        <HangingFloralToran
          tone="lotus"
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[480px] opacity-95 z-30"
        />

        {/* Hanging Floral Garlands with Distinct Natural Swinging Speeds */}
        <SwingingLotusGarland
          timing="a"
          eager
          className="absolute top-0 left-0 sm:left-4 lg:left-16 w-10 sm:w-14 lg:w-18 h-36 sm:h-52 lg:h-64 z-30 opacity-95"
        />
        <SwingingLotusGarland
          timing="d"
          flipHorizontal
          eager
          className="absolute top-0 right-0 sm:right-4 lg:right-16 w-10 sm:w-14 lg:w-18 h-36 sm:h-52 lg:h-64 z-30 opacity-95"
        />
        <SwingingLotusGarland
          timing="c"
          eager
          className="hidden sm:block absolute top-0 left-14 lg:left-32 w-9 lg:w-12 h-32 lg:h-44 z-20 opacity-90"
        />
        <SwingingLotusGarland
          timing="b"
          flipHorizontal
          eager
          className="hidden sm:block absolute top-0 right-14 lg:right-32 w-9 lg:w-12 h-32 lg:h-44 z-20 opacity-90"
        />

        {/* Secondary Marigold Jhoomars with Independent Gentle Sway */}
        <FloralJhoomar
          variant="marigold"
          className="hidden sm:block absolute top-0 left-24 lg:left-44 w-16 lg:w-20 h-40 lg:h-48 opacity-95 z-20 animate-lotus-swing-b"
        />
        <FloralJhoomar
          variant="marigold"
          className="hidden sm:block absolute top-0 right-24 lg:right-44 w-16 lg:w-20 h-40 lg:h-48 opacity-95 z-20 animate-lotus-swing-d"
        />

        {/* Flowers Around the Gate — Varied Elegant Floating & Swaying Motion */}
        <DecorativeCutout
          src={weddingConfig.decor.bougainvilleaBranch}
          alt=""
          eager
          className="absolute -top-2 -left-4 w-32 sm:w-48 lg:w-60 h-auto opacity-95 z-20 animate-floral-sway-1"
        />
        <DecorativeCutout
          src={weddingConfig.decor.bougainvilleaBranch}
          alt=""
          flipHorizontal
          eager
          className="absolute -top-2 -right-4 w-32 sm:w-48 lg:w-60 h-auto opacity-95 z-20 animate-floral-sway-2"
        />

        <DecorativeCutout
          src={weddingConfig.decor.lotusCluster}
          alt=""
          eager
          className="absolute -bottom-3 -left-4 w-24 sm:w-38 lg:w-48 h-auto opacity-95 z-30 animate-floral-float"
        />
        <DecorativeCutout
          src={weddingConfig.decor.lotusCluster}
          alt=""
          flipHorizontal
          eager
          className="absolute -bottom-3 -right-4 w-24 sm:w-38 lg:w-48 h-auto opacity-95 z-30 animate-floral-sway-2"
        />

        {/* Bottom Warm Golden Threshold Shine */}
        <div
          aria-hidden="true"
          className={`absolute inset-x-0 bottom-0 h-40 pointer-events-none z-20 transition-opacity duration-500 ${
            isOpening ? 'opacity-100' : 'opacity-45'
          }`}
          style={{
            background:
              'linear-gradient(to top, rgba(255, 232, 168, 0.72) 0%, rgba(223, 186, 102, 0.28) 55%, transparent 100%)',
          }}
        />

        {/* Prominent Royal Gold & Ivory "TAP TO OPEN" Button (Clear of All Florals) */}
        <div
          className={`fixed bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-50 transition-opacity duration-300 ${
            isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Subtle Golden Glow Halo */}
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
            onClick={handleButtonClick}
            className="relative group inline-flex items-center justify-center gap-3 min-h-[54px] px-8 py-3.5 sm:px-10 sm:py-4 rounded-full border-2 border-[#DFBA66] bg-gradient-to-b from-[#FFFDF7] via-[#FAF0D6] to-[#EED397] text-[#5C1222] shadow-[0_0_32px_rgba(253,230,138,0.6),0_12px_28px_rgba(18,4,8,0.68)] hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap focus:outline-none focus-visible:ring-4 focus-visible:ring-[#FDE68A]"
          >
            {/* Delicate Inner Decorative Hairline Border */}
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
      </div>
    </div>
  );
}
