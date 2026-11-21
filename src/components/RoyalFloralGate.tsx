import { useEffect, useRef, type ReactNode } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralJhoomar, HangingFloralToran } from './OrnamentalMotifs';
import { DecorativeCutout, SwingingLotusGarland } from './RoyalBotanicalDecor';

interface GoldenMoteSpec {
  id: number;
  leftPct: number;
  topPct: number;
  sizePx: number;
  delaySec: number;
  durationSec: number;
}

const GOLDEN_MOTES: GoldenMoteSpec[] = [
  { id: 1, leftPct: 12, topPct: 24, sizePx: 14, delaySec: 0, durationSec: 3.8 },
  { id: 2, leftPct: 22, topPct: 62, sizePx: 18, delaySec: -1.2, durationSec: 4.4 },
  { id: 3, leftPct: 31, topPct: 38, sizePx: 11, delaySec: -2.1, durationSec: 3.6 },
  { id: 4, leftPct: 41, topPct: 74, sizePx: 20, delaySec: -0.6, durationSec: 4.9 },
  { id: 5, leftPct: 49, topPct: 28, sizePx: 16, delaySec: -1.8, durationSec: 4.1 },
  { id: 6, leftPct: 54, topPct: 52, sizePx: 22, delaySec: -0.9, durationSec: 4.5 },
  { id: 7, leftPct: 63, topPct: 22, sizePx: 13, delaySec: -2.6, durationSec: 3.9 },
  { id: 8, leftPct: 71, topPct: 68, sizePx: 17, delaySec: -1.4, durationSec: 4.3 },
  { id: 9, leftPct: 80, topPct: 35, sizePx: 15, delaySec: -0.3, durationSec: 4.0 },
  { id: 10, leftPct: 88, topPct: 58, sizePx: 19, delaySec: -2.4, durationSec: 4.7 },
  { id: 11, leftPct: 18, topPct: 46, sizePx: 10, delaySec: -1.7, durationSec: 3.5 },
  { id: 12, leftPct: 66, topPct: 44, sizePx: 12, delaySec: -0.8, durationSec: 3.7 },
  { id: 13, leftPct: 37, topPct: 18, sizePx: 15, delaySec: -2.0, durationSec: 4.2 },
  { id: 14, leftPct: 76, topPct: 82, sizePx: 14, delaySec: -1.1, durationSec: 4.6 },
];

const clamp01 = (v: number): number => (v < 0 ? 0 : v > 1 ? 1 : v);

const smoothstep = (edge0: number, edge1: number, x: number): number => {
  if (edge1 === edge0) return x >= edge1 ? 1 : 0;
  const t = clamp01((x - edge0) / (edge1 - edge0));
  return t * t * (3 - 2 * t);
};

export function RoyalFloralGate({ children }: { children: ReactNode }) {
  const runwayRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const gateCurtainRef = useRef<HTMLDivElement | null>(null);
  const gateGlowRef = useRef<HTMLDivElement | null>(null);
  const sanctuaryRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const flashRef = useRef<HTMLDivElement | null>(null);
  const heroLayerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let rafId = 0;
    let scheduled = false;

    const applyProgress = () => {
      scheduled = false;
      const runway = runwayRef.current;
      const sticky = stickyRef.current;
      if (!runway || !sticky) return;

      const travelPx = Math.max(1, runway.offsetHeight - sticky.offsetHeight);
      const elapsed = -runway.getBoundingClientRect().top;
      const p = clamp01(elapsed / travelPx);

      // Keep gate stage stacked above floating petals & sticky header while closing/opening,
      // and yield stacking order back once the hero is revealed.
      sticky.style.zIndex = p < 0.92 ? '35' : '10';

      // PHASE 1 & 2: Slow, smooth upward floral gate opening
      const gateMove = smoothstep(0.0, 0.78, p);
      const gateOpacity = 1 - smoothstep(0.64, 0.82, p);

      if (gateCurtainRef.current) {
        const translateY = -gateMove * 108;
        const gateScale = prefersReducedMotion ? 1 : 1 + gateMove * 0.05;
        gateCurtainRef.current.style.transform = `translate3d(0, ${translateY.toFixed(3)}%, 0) scale(${gateScale.toFixed(4)})`;
        gateCurtainRef.current.style.opacity = gateOpacity.toFixed(4);
      }

      if (gateGlowRef.current) {
        const glowOpacity = smoothstep(0.03, 0.35, p) * (1 - smoothstep(0.62, 0.82, p));
        gateGlowRef.current.style.opacity = glowOpacity.toFixed(4);
      }

      // PHASE 3: Royal wedding world depth & golden light particles behind gate
      if (sanctuaryRef.current) {
        const bgOpacity =
          smoothstep(0.06, 0.48, p) * (1 - smoothstep(0.82, 0.99, p));
        const bgScale = prefersReducedMotion ? 1 : 1.08 - smoothstep(0.06, 0.94, p) * 0.08;
        sanctuaryRef.current.style.opacity = bgOpacity.toFixed(4);
        sanctuaryRef.current.style.transform = `scale(${bgScale.toFixed(4)})`;
      }

      if (particlesRef.current) {
        if (prefersReducedMotion) {
          particlesRef.current.style.opacity = '0';
        } else {
          const particlesOpacity = smoothstep(0.14, 0.46, p) * (1 - smoothstep(0.76, 0.96, p));
          const particlesScale = 0.86 + smoothstep(0.14, 0.94, p) * 0.26;
          const shiftY = (0.5 - p) * 32;
          particlesRef.current.style.opacity = particlesOpacity.toFixed(4);
          particlesRef.current.style.transform = `translate3d(0, ${shiftY.toFixed(2)}px, 0) scale(${particlesScale.toFixed(4)})`;
        }
      }

      // PHASE 4: Brief golden-white cinematic light flash at the gate climax (peak at p ~ 0.78)
      if (flashRef.current) {
        const flashCurve = smoothstep(0.62, 0.78, p) * (1 - smoothstep(0.78, 0.94, p));
        const maxFlash = prefersReducedMotion ? 0.25 : 0.94;
        const flashOpacity = flashCurve * maxFlash;
        const flashScale = prefersReducedMotion ? 1 : 0.72 + smoothstep(0.62, 0.94, p) * 0.62;
        flashRef.current.style.opacity = flashOpacity.toFixed(4);
        flashRef.current.style.transform = `scale(${flashScale.toFixed(4)})`;
      }

      // PHASE 5: Main Wedding Invitation Hero smooth reveal & zoom into view
      if (heroLayerRef.current) {
        const heroReveal = smoothstep(0.60, 0.97, p);
        const heroScale = prefersReducedMotion ? 1 : 0.86 + heroReveal * 0.14;
        const heroOffsetY = prefersReducedMotion ? 0 : (1 - heroReveal) * 24;
        heroLayerRef.current.style.opacity = heroReveal.toFixed(4);
        heroLayerRef.current.style.transform = `translate3d(0, ${heroOffsetY.toFixed(2)}px, 0) scale(${heroScale.toFixed(4)})`;
        heroLayerRef.current.style.pointerEvents = p >= 0.84 ? 'auto' : 'none';
      }
    };

    const scheduleUpdate = () => {
      if (scheduled) return;
      scheduled = true;
      rafId = window.requestAnimationFrame(applyProgress);
    };

    // Paint initial frame immediately
    applyProgress();

    window.addEventListener('scroll', scheduleUpdate, { passive: true });
    window.addEventListener('resize', scheduleUpdate, { passive: true });

    return () => {
      window.removeEventListener('scroll', scheduleUpdate);
      window.removeEventListener('resize', scheduleUpdate);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <section
      ref={runwayRef}
      aria-label="Royal Indian Floral Wedding Entrance Sequence"
      className="relative bg-[#FAF5EB] overflow-x-clip pb-[190svh]"
    >
      {/* Target anchor positioned at exact scroll completion (p = 1.0, gate open) */}
      <div
        id="royal-invitation"
        aria-hidden="true"
        className="absolute left-0 top-[190svh] w-px h-px pointer-events-none"
      />

      {/* Sticky Viewport Stage Holding Both Gate Sequence and Revealed Hero */}
      <div
        ref={stickyRef}
        className="sticky top-0 min-h-[100svh] w-full overflow-x-clip flex flex-col justify-center"
      >
        {/* Phase 2-3 Sanctuary Royal Courtyard Depth World Behind Rising Gate */}
        <div
          ref={sanctuaryRef}
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[100svh] min-h-[100dvh] z-0 overflow-hidden will-change-transform"
          style={{
            opacity: 0,
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
                'radial-gradient(circle at 50% 44%, rgba(255, 248, 224, 0.72) 0%, rgba(250, 240, 214, 0.45) 48%, rgba(92, 18, 34, 0.16) 100%)',
            }}
          />
        </div>

        {/* Phase 5 Main Wedding Invitation Hero (Gradually Zooms In After Gate Clears) */}
        <div
          ref={heroLayerRef}
          className="relative z-10 w-full will-change-transform"
          style={{ opacity: 0, transform: 'translate3d(0, 24px, 0) scale(0.86)' }}
        >
          {children}
        </div>

        {/* Full-Screen Viewport Portal Layer Stack (Kept Mounted for Reversible Scroll) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-0 inset-x-0 h-[100svh] min-h-[100dvh] overflow-hidden z-40"
        >
          {/* Phase 3: Floating Golden Light Particles */}
          <div
            ref={particlesRef}
            className="absolute inset-0 z-10 will-change-transform motion-reduce:hidden"
            style={{ opacity: 0 }}
          >
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
                    'radial-gradient(circle, rgba(255, 252, 232, 0.95) 0%, rgba(246, 209, 118, 0.72) 45%, rgba(223, 186, 102, 0) 75%)',
                }}
              />
            ))}
          </div>

          {/* Phase 4: Brief Golden-White Cinematic Light Flash & Glow Reveal */}
          <div
            ref={flashRef}
            className="absolute inset-0 z-20 will-change-transform"
            style={{
              opacity: 0,
              background:
                'radial-gradient(circle at 50% 46%, rgba(255, 255, 255, 0.98) 0%, rgba(255, 242, 198, 0.9) 26%, rgba(223, 186, 102, 0.56) 54%, rgba(250, 245, 235, 0) 80%)',
            }}
          />

          {/* Phase 1 & 2: Full-Screen Traditional Indian Floral Wedding Gate Curtain */}
          <div
            ref={gateCurtainRef}
            className="relative z-30 w-full h-full bg-[#24080E] overflow-hidden will-change-transform"
            style={{ transform: 'translate3d(0, 0%, 0) scale(1)', opacity: 1 }}
          >
            {/* Atmospheric Palace Backdrop on Desktop Flanking the Carved Gate */}
            <div
              className="hidden md:block absolute inset-0"
              style={{
                background:
                  'radial-gradient(circle at 50% 48%, #4F141D 0%, #2B0910 55%, #160408 100%)',
              }}
            />

            {/* Desktop Side Royal Coconut Palms */}
            <DecorativeCutout
              src={weddingConfig.decor.coconutPalm}
              alt=""
              className="hidden md:block absolute bottom-0 -left-10 lg:left-0 w-56 lg:w-72 h-auto opacity-75 z-10"
            />
            <DecorativeCutout
              src={weddingConfig.decor.coconutPalm}
              alt=""
              flipHorizontal
              className="hidden md:block absolute bottom-0 -right-10 lg:right-0 w-56 lg:w-72 h-auto opacity-75 z-10"
            />

            {/* Full-Bleed Custom Floral Wedding Gate Artwork (Zero Borders, Zero Text, Zero Popups) */}
            <img
              src={weddingConfig.assets.royalFloralGateImage}
              alt="Full-screen traditional Indian royal floral wedding gate adorned with pink roses, lotus flowers, jasmine, and marigold garlands"
              decoding="async"
              referrerPolicy="no-referrer"
              className="relative z-10 w-full h-full object-cover object-center md:max-w-[580px] lg:max-w-[660px] md:mx-auto md:shadow-[0_0_90px_rgba(223,186,102,0.35)] block"
            />

            {/* Subtle Top Antique Gold Trim */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#9F7624] via-[#FDE68A] to-[#9F7624] z-30" />

            {/* Top Draped Floral Toran & Side Swinging Hanging Lotus Garlands */}
            <HangingFloralToran
              tone="lotus"
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[320px] sm:w-[480px] opacity-95 z-30"
            />
            <SwingingLotusGarland
              timing="a"
              className="absolute top-0 left-0 sm:left-4 lg:left-16 w-10 sm:w-14 lg:w-18 h-36 sm:h-52 lg:h-64 z-30 opacity-95"
            />
            <SwingingLotusGarland
              timing="b"
              flipHorizontal
              className="absolute top-0 right-0 sm:right-4 lg:right-16 w-10 sm:w-14 lg:w-18 h-36 sm:h-52 lg:h-64 z-30 opacity-95"
            />

            {/* Secondary Marigold Jhoomars Flanking Both Sides */}
            <FloralJhoomar
              variant="marigold"
              className="hidden sm:block absolute top-0 left-20 lg:left-40 w-16 lg:w-20 h-40 lg:h-48 opacity-95 z-20"
            />
            <FloralJhoomar
              variant="marigold"
              className="hidden sm:block absolute top-0 right-20 lg:right-40 w-16 lg:w-20 h-40 lg:h-48 opacity-95 z-20"
            />

            {/* Draping Pink Bougainvillea Branches on Top Left & Right Corners */}
            <DecorativeCutout
              src={weddingConfig.decor.bougainvilleaBranch}
              alt=""
              className="absolute -top-2 -left-4 w-32 sm:w-48 lg:w-60 h-auto opacity-95 z-20"
            />
            <DecorativeCutout
              src={weddingConfig.decor.bougainvilleaBranch}
              alt=""
              flipHorizontal
              className="absolute -top-2 -right-4 w-32 sm:w-48 lg:w-60 h-auto opacity-95 z-20"
            />

            {/* Pink Lotus & Green Botanical Leaf Clusters Anchoring Bottom Left & Right */}
            <DecorativeCutout
              src={weddingConfig.decor.lotusCluster}
              alt=""
              className="absolute -bottom-3 -left-3 w-28 sm:w-40 lg:w-48 h-auto opacity-95 z-30"
            />
            <DecorativeCutout
              src={weddingConfig.decor.lotusCluster}
              alt=""
              flipHorizontal
              className="absolute -bottom-3 -right-3 w-28 sm:w-40 lg:w-48 h-auto opacity-95 z-30"
            />

            {/* Bottom Warm Golden Threshold Shine Intensifying as Gate Climbs */}
            <div
              ref={gateGlowRef}
              className="absolute inset-x-0 bottom-0 h-36 z-30"
              style={{
                opacity: 0,
                background:
                  'linear-gradient(to top, rgba(255, 236, 175, 0.85) 0%, rgba(223, 186, 102, 0.35) 55%, transparent 100%)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
