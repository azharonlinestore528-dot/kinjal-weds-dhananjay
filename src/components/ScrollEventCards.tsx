import { Calendar, Clock, MapPin, MessageCircle } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import {
  getWhatsAppUrl,
  type BilingualEventConfig,
  type EventThemeVariant,
} from '../config/weddingConfig';
import type { FloralIntensity } from './FloatingFloralLayer';
import {
  FloralCornerCluster,
  HangingFloralToran,
  LotusDivider,
  SacredKalashMandala,
  StaticPeacockCrest,
} from './OrnamentalMotifs';

interface ThemePalette {
  interiorClass: string;
  coverGradient: string;
  coverUndersideGradient: string;
  borderClass: string;
  kickerClass: string;
  titleClass: string;
  gujaratiClass: string;
  bodyClass: string;
  metaBoxClass: string;
  coverTextClass: string;
  coverSubClass: string;
  coverBorderClass: string;
  dividerTone: 'gold' | 'saffron' | 'ivory' | 'burgundy';
  cornerVariant: 'lotus-rose' | 'marigold-leaf' | 'jasmine-saffron';
  toranTone: 'lotus' | 'marigold';
}

const THEME_PALETTES: Record<EventThemeVariant, ThemePalette> = {
  ganesh: {
    interiorClass: 'theme-ganesh text-[#3B1E08]',
    coverGradient: 'linear-gradient(160deg, #FFF7E4 0%, #FDE5B0 48%, #F6C574 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #FBF0D3 0%, #FFF9ED 100%)',
    borderClass: 'border-[#D97706]/60',
    kickerClass: 'text-[#B45309]',
    titleClass: 'text-[#7C2D12]',
    gujaratiClass: 'text-[#9A3412]',
    bodyClass: 'text-[#451A03]/90',
    metaBoxClass: 'bg-[#FFFDF7]/90 border-[#D97706]/45 text-[#451A03]',
    coverTextClass: 'text-[#7C2D12]',
    coverSubClass: 'text-[#9A3412]',
    coverBorderClass: 'border-[#D97706]/70',
    dividerTone: 'saffron',
    cornerVariant: 'jasmine-saffron',
    toranTone: 'marigold',
  },
  haldi: {
    interiorClass: 'theme-haldi text-[#312E07]',
    coverGradient: 'linear-gradient(160deg, #FEFCE8 0%, #FDE047 52%, #F59E0B 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #FEF3C7 0%, #FEFCE8 100%)',
    borderClass: 'border-[#CA8A04]/65',
    kickerClass: 'text-[#3F6212]',
    titleClass: 'text-[#854D0E]',
    gujaratiClass: 'text-[#3F6212]',
    bodyClass: 'text-[#3F2E05]/90',
    metaBoxClass: 'bg-[#FEFDF2]/90 border-[#CA8A04]/45 text-[#422006]',
    coverTextClass: 'text-[#422006]',
    coverSubClass: 'text-[#3F6212]',
    coverBorderClass: 'border-[#CA8A04]/75',
    dividerTone: 'saffron',
    cornerVariant: 'marigold-leaf',
    toranTone: 'marigold',
  },
  grahshanti: {
    interiorClass: 'theme-grahshanti text-[#2E1E0F]',
    coverGradient: 'linear-gradient(160deg, #FBF6EA 0%, #EFE1C1 52%, #DFC389 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #F4E9CF 0%, #FAF5EB 100%)',
    borderClass: 'border-[#C49A45]/70',
    kickerClass: 'text-[#9F7624]',
    titleClass: 'text-[#5C1222]',
    gujaratiClass: 'text-[#92400E]',
    bodyClass: 'text-[#2B1418]/90',
    metaBoxClass: 'bg-[#FAF5EB]/95 border-[#C49A45]/50 text-[#2B1418]',
    coverTextClass: 'text-[#5C1222]',
    coverSubClass: 'text-[#9F7624]',
    coverBorderClass: 'border-[#C49A45]/80',
    dividerTone: 'gold',
    cornerVariant: 'jasmine-saffron',
    toranTone: 'lotus',
  },
  wedding: {
    interiorClass: 'theme-wedding-maroon text-[#FAF5EB]',
    coverGradient: 'linear-gradient(155deg, #6E1326 0%, #4E0C1B 50%, #2C060F 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #430A17 0%, #5C1222 100%)',
    borderClass: 'border-[#DFBA66]/80',
    kickerClass: 'text-[#DFBA66]',
    titleClass: 'text-[#FAF5EB]',
    gujaratiClass: 'text-[#F7D0D8]',
    bodyClass: 'text-[#F3E9D4]/92',
    metaBoxClass: 'bg-[#2C0710]/90 border-[#C49A45]/60 text-[#FAF5EB]',
    coverTextClass: 'text-[#FAF5EB]',
    coverSubClass: 'text-[#DFBA66]',
    coverBorderClass: 'border-[#DFBA66]/85',
    dividerTone: 'ivory',
    cornerVariant: 'lotus-rose',
    toranTone: 'lotus',
  },
};

function clamp01(val: number): number {
  return Math.max(0, Math.min(1, val));
}

function easeOutCubic(t: number): number {
  const u = 1 - clamp01(t);
  return 1 - u * u * u;
}

function easeInOutCubic(t: number): number {
  const x = clamp01(t);
  return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function ScrollUnfoldingEventCard({
  event,
  index,
  onJumpToRsvp,
  onActiveStateChange,
}: {
  event: BilingualEventConfig;
  index: number;
  onJumpToRsvp: () => void;
  onActiveStateChange?: (eventId: EventThemeVariant, intensity: FloralIntensity | null) => void;
}) {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const theme = THEME_PALETTES[event.id];
  const isMainWedding = event.id === 'wedding';
  const whatsappUrl = getWhatsAppUrl();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const handleMq = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener('change', handleMq);

    const updateProgress = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const maxScroll = Math.max(1, el.offsetHeight - window.innerHeight);
      const scrolled = Math.min(maxScroll, Math.max(0, -rect.top));
      const p = clamp01(scrolled / maxScroll);
      setProgress(p);

      if (rect.bottom > 80 && rect.top < window.innerHeight * 0.85) {
        if (isMainWedding && p > 0.16 && p < 0.88) {
          onActiveStateChange?.(event.id, 'climax');
        } else if (p > 0.16 && p < 0.65) {
          onActiveStateChange?.(event.id, 'elevated');
        } else {
          onActiveStateChange?.(event.id, null);
        }
      } else {
        onActiveStateChange?.(event.id, null);
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

    return () => {
      mq.removeEventListener('change', handleMq);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [event.id, isMainWedding, onActiveStateChange]);

  // If reduced motion is preferred, show open card immediately in flow
  const effectiveProgress = reducedMotion ? 0.65 : progress;

  // Stage 1 (0.00 -> 0.18): Rise upward & forward into center stage
  const enterT = easeOutCubic(effectiveProgress / 0.18);
  // Stage 2 (0.18 -> 0.56): Top-hinged front flap folds vertically upward & forward toward viewer
  const openT = easeInOutCubic((effectiveProgress - 0.18) / 0.38);
  // Stage 3 (0.56 -> 0.80): Serene open reading plateau
  // Stage 4 (0.80 -> 1.00): Open card glides smoothly upward and fades out
  const exitT = easeInOutCubic((effectiveProgress - 0.8) / 0.2);

  const stageOpacity =
    effectiveProgress < 0.18
      ? enterT
      : effectiveProgress > 0.8
      ? Math.max(0, 1 - exitT * 1.08)
      : 1;

  const assemblyTranslateY = (1 - enterT) * 72 - exitT * 96;
  const assemblyScale = 0.88 + enterT * 0.12 - exitT * 0.06;
  const assemblyTiltX = (1 - enterT) * 8 - exitT * 6;

  // Strict vertical top-hinged upward/forward 3D rotation (+rotateX swings bottom edge UP and TOWARD viewer)
  const flapRotateX = openT * 150;
  const flapLiftOpacity = openT > 0.72 ? Math.max(0, 1 - (openT - 0.72) / 0.24) : 1;

  // Blooming floral frame & gradual interior details reveal
  const floralsT = easeOutCubic((effectiveProgress - 0.22) / 0.32);
  const detailsT = easeOutCubic((effectiveProgress - 0.28) / 0.3);

  return (
    <div
      id={`event-card-${event.id}`}
      ref={sectionRef}
      className={reducedMotion ? 'py-10 px-3 sm:px-6' : 'relative w-full h-[225vh] sm:h-[235vh]'}
    >
      <div
        className={
          reducedMotion
            ? 'max-w-5xl mx-auto'
            : 'sticky top-0 h-[100svh] w-full flex items-center justify-center px-3 sm:px-6 overflow-hidden'
        }
      >
        <div
          className="perspective-card-stage w-full max-w-4xl mx-auto"
          style={
            reducedMotion
              ? undefined
              : {
                  opacity: stageOpacity,
                  transform: `translate3d(0, ${assemblyTranslateY}px, 0) scale(${assemblyScale}) rotateX(${assemblyTiltX}deg)`,
                  willChange: 'transform, opacity',
                  pointerEvents: stageOpacity > 0.25 ? 'auto' : 'none',
                }
          }
        >
          {/* Relative Container Holding Both Interior Card & Hinged Top-Opening Cover */}
          <div className="relative preserve-3d">
            {/* Climax Golden Halo for Main Wedding Card */}
            {isMainWedding && (
              <div
                aria-hidden="true"
                className="absolute -inset-6 rounded-[2rem] pointer-events-none"
                style={{
                  opacity: 0.25 + openT * 0.65,
                  background:
                    'radial-gradient(ellipse at 50% 45%, rgba(223, 186, 102, 0.34) 0%, rgba(122, 27, 46, 0.22) 55%, transparent 78%)',
                }}
              />
            )}

            {/* Revealed Open Invitation Interior */}
            <article
              className={`relative rounded-3xl border-2 ${theme.interiorClass} ${theme.borderClass} shadow-[0_28px_72px_rgba(14,5,8,0.34)] overflow-hidden`}
            >
              {/* Blooming Floral Decorations appearing as invitation opens */}
              <div
                style={{
                  opacity: floralsT,
                  transform: `scale(${0.75 + floralsT * 0.25})`,
                }}
                className="transition-none"
              >
                <FloralCornerCluster
                  variant={theme.cornerVariant}
                  position="top-left"
                  className="absolute top-0 left-0 w-16 h-16 sm:w-28 sm:h-28 z-10"
                />
                <FloralCornerCluster
                  variant={theme.cornerVariant}
                  position="top-right"
                  className="absolute top-0 right-0 w-16 h-16 sm:w-28 sm:h-28 z-10"
                />
                <FloralCornerCluster
                  variant={theme.cornerVariant}
                  position="bottom-left"
                  className="hidden sm:block absolute bottom-0 left-0 w-24 h-24 z-10"
                />
                <FloralCornerCluster
                  variant={theme.cornerVariant}
                  position="bottom-right"
                  className="hidden sm:block absolute bottom-0 right-0 w-24 h-24 z-10"
                />
              </div>

              <div
                className="relative z-10 p-5 sm:p-8 lg:p-10"
                style={{
                  opacity: 0.15 + detailsT * 0.85,
                  transform: `translate3d(0, ${(1 - detailsT) * 20}px, 0)`,
                }}
              >
                <HangingFloralToran
                  tone={theme.toranTone}
                  className="mb-2 sm:mb-4 -mt-3 max-w-xs sm:max-w-md opacity-90"
                />

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-9 items-center ${
                    index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* Artwork Plate */}
                  <div className="lg:col-span-5 flex justify-center">
                    <div
                      className={`relative w-full max-w-[240px] sm:max-w-[290px] lg:max-w-[320px] rounded-2xl overflow-hidden border-2 ${
                        isMainWedding ? 'border-[#DFBA66]' : 'border-[#C49A45]/75'
                      } shadow-xl bg-[#FAF5EB]`}
                    >
                      {event.artworkSrc ? (
                        <img
                          src={event.artworkSrc}
                          alt={event.artworkAlt}
                          referrerPolicy="no-referrer"
                          className="w-full h-[155px] sm:h-[210px] lg:h-[360px] object-cover block"
                        />
                      ) : (
                        <SacredKalashMandala className="w-full max-h-[165px] sm:max-h-[220px] lg:max-h-[360px] h-auto mx-auto" />
                      )}
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="lg:col-span-7 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2.5">
                      <StaticPeacockCrest
                        tone={isMainWedding ? 'ivory' : 'gold'}
                        className="w-10 h-6 hidden sm:block shrink-0"
                      />
                      <p
                        className={`text-[11px] sm:text-xs tracking-[0.24em] uppercase font-semibold ${theme.kickerClass}`}
                      >
                        {event.subtitle}
                      </p>
                    </div>

                    <h3
                      className={`text-2xl sm:text-4xl lg:text-[2.65rem] font-semibold tracking-[0.05em] uppercase mt-1.5 leading-tight ${theme.titleClass}`}
                    >
                      {event.englishName}
                    </h3>
                    <p
                      lang="gu"
                      className={`font-gujarati text-xl sm:text-2xl font-semibold mt-0.5 ${theme.gujaratiClass}`}
                    >
                      {event.gujaratiName}
                    </p>

                    <LotusDivider tone={theme.dividerTone} className="my-3 sm:my-4 lg:justify-start" />

                    {/* Date & Time Bar */}
                    <div
                      className={`rounded-2xl border px-4 py-2.5 sm:px-5 sm:py-3.5 inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 ${theme.metaBoxClass}`}
                    >
                      <div className="flex items-center gap-2 text-sm sm:text-base font-semibold tabular-nums">
                        <Calendar className="w-4 h-4 shrink-0 text-[#C49A45]" />
                        <span>{event.date}</span>
                      </div>
                      <span className="opacity-40" aria-hidden="true">
                        ·
                      </span>
                      <div className="flex items-center gap-2 text-sm sm:text-base font-semibold tabular-nums">
                        <Clock className="w-4 h-4 shrink-0 text-[#C49A45]" />
                        <span>{event.time}</span>
                      </div>
                    </div>

                    <p
                      className={`mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${theme.bodyClass}`}
                    >
                      {event.description}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-current/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start justify-center lg:justify-start gap-2 text-xs sm:text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#C49A45]" />
                        <span
                          className={
                            isMainWedding ? 'font-semibold text-[#DFBA66]' : 'italic opacity-85'
                          }
                        >
                          {event.venueLabel}
                        </span>
                      </div>

                      {!event.isVenueConfirmed && (
                        whatsappUrl ? (
                          <a
                            href={whatsappUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-current/35 text-xs font-semibold tracking-wider uppercase hover:bg-black/5 transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Updates</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={onJumpToRsvp}
                            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-current/35 text-xs font-semibold tracking-wider uppercase hover:bg-black/5 transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px]"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Venue Updates</span>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Vertically Top-Hinged Unfolding Front Cover (Strictly Upward & Forward rotateX, Zero Horizontal Flip) */}
            {!reducedMotion && flapLiftOpacity > 0.01 && (
              <div
                aria-hidden="true"
                className="preserve-3d absolute inset-0 z-20 pointer-events-none"
                style={{
                  transformOrigin: 'top center',
                  transform: `rotateX(${flapRotateX}deg) translateZ(${Math.sin((openT * Math.PI) / 2) * 18}px)`,
                  opacity: flapLiftOpacity,
                  willChange: 'transform, opacity',
                }}
              >
                {/* Exterior Decorative Closed Invitation Cover */}
                <div
                  className={`backface-hidden absolute inset-0 rounded-3xl border-2 ${theme.coverBorderClass} shadow-[0_24px_60px_rgba(0,0,0,0.4)] flex flex-col items-center justify-center p-6 sm:p-10 text-center overflow-hidden`}
                  style={{ background: theme.coverGradient }}
                >
                  <div
                    className={`absolute inset-3 sm:inset-4 rounded-2xl border ${theme.coverBorderClass} opacity-65 pointer-events-none`}
                  />

                  <FloralCornerCluster
                    variant={theme.cornerVariant}
                    position="top-left"
                    className="absolute top-2 left-2 w-20 h-20 sm:w-28 sm:h-28 opacity-90"
                  />
                  <FloralCornerCluster
                    variant={theme.cornerVariant}
                    position="top-right"
                    className="absolute top-2 right-2 w-20 h-20 sm:w-28 sm:h-28 opacity-90"
                  />
                  <FloralCornerCluster
                    variant={theme.cornerVariant}
                    position="bottom-left"
                    className="absolute bottom-2 left-2 w-20 h-20 sm:w-28 sm:h-28 opacity-85"
                  />
                  <FloralCornerCluster
                    variant={theme.cornerVariant}
                    position="bottom-right"
                    className="absolute bottom-2 right-2 w-20 h-20 sm:w-28 sm:h-28 opacity-85"
                  />

                  <div className="relative z-10 max-w-md flex flex-col items-center">
                    <StaticPeacockCrest
                      tone={isMainWedding ? 'ivory' : 'gold'}
                      className="w-20 h-12 sm:w-24 sm:h-14 mb-2"
                    />
                    <p
                      lang="gu"
                      className={`font-gujarati text-lg sm:text-xl font-semibold ${theme.coverSubClass}`}
                    >
                      {event.coverSealText}
                    </p>

                    <LotusDivider tone={theme.dividerTone} className="my-3 sm:my-4" />

                    <p
                      className={`text-xs tracking-[0.26em] uppercase font-semibold ${theme.coverSubClass}`}
                    >
                      {event.date} · {event.time}
                    </p>
                    <h3
                      className={`text-3xl sm:text-5xl font-semibold tracking-[0.06em] uppercase mt-2 ${theme.coverTextClass}`}
                    >
                      {event.englishName}
                    </h3>
                    <p
                      lang="gu"
                      className={`font-gujarati text-xl sm:text-2xl font-semibold mt-1 ${theme.coverSubClass}`}
                    >
                      {event.gujaratiName}
                    </p>

                    <div className="mt-6 pt-4 border-t border-current/20 w-48">
                      <p
                        className={`text-xs sm:text-sm tracking-[0.16em] uppercase font-medium ${theme.coverTextClass} opacity-80`}
                      >
                        {event.coverPrompt}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Inner Gold-Lined Parchment Underside Visible Briefly While Flap Swings Upward */}
                <div
                  className={`backface-hidden absolute inset-0 rounded-3xl border-2 ${theme.coverBorderClass} shadow-inner`}
                  style={{
                    background: theme.coverUndersideGradient,
                    transform: 'rotateX(180deg)',
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ScrollEventCards({
  events,
  onJumpToRsvp,
  onFloralStateChange,
}: {
  events: readonly BilingualEventConfig[];
  onJumpToRsvp: () => void;
  onFloralStateChange?: (intensity: FloralIntensity) => void;
}) {
  const activeMapRef = useRef<Partial<Record<EventThemeVariant, FloralIntensity | null>>>({});

  const handleEventStateChange = (
    eventId: EventThemeVariant,
    intensity: FloralIntensity | null
  ) => {
    activeMapRef.current[eventId] = intensity;
    const values = Object.values(activeMapRef.current);
    if (values.includes('climax')) {
      onFloralStateChange?.('climax');
    } else if (values.includes('elevated')) {
      onFloralStateChange?.('elevated');
    } else {
      onFloralStateChange?.('ambient');
    }
  };

  return (
    <div className="relative">
      {events.map((event, index) => (
        <ScrollUnfoldingEventCard
          key={event.id}
          event={event}
          index={index}
          onJumpToRsvp={onJumpToRsvp}
          onActiveStateChange={handleEventStateChange}
        />
      ))}
    </div>
  );
}
