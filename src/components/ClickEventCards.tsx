import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type WheelEvent,
} from 'react';
import {
  getWhatsAppUrl,
  weddingConfig,
  type BilingualEventConfig,
  type EventThemeVariant,
} from '../config/weddingConfig';
import {
  FloralCornerCluster,
  FloralJhoomar,
  HaldiSunflowerMedallion,
  HangingFloralToran,
  LotusDivider,
  SacredGaneshaMedallion,
  SacredKalashMandala,
  SilkRibbonBow,
  StaticPeacockCrest,
} from './OrnamentalMotifs';
import {
  DecorativeCutout,
  StaticPeacockOrnament,
  SwingingLotusGarland,
} from './RoyalBotanicalDecor';

interface RoomStyle {
  roomOverlayGradient: string;
  roomKickerClass: string;
  roomHeadingClass: string;
  jhoomarVariant: 'marigold' | 'lotus' | 'royal-maroon';
  interiorClass: string;
  interiorBorderClass: string;
  kickerClass: string;
  titleClass: string;
  gujaratiClass: string;
  bodyClass: string;
  metaBoxClass: string;
  actionBtnClass: string;
  coverGradient: string;
  coverUndersideGradient: string;
  coverBorderClass: string;
  coverTextClass: string;
  coverSubClass: string;
  ribbonVariant: 'saffron' | 'haldi' | 'gold' | 'maroon';
  dividerTone: 'gold' | 'saffron' | 'ivory' | 'burgundy';
  cornerVariant: 'lotus-rose' | 'marigold-leaf' | 'jasmine-saffron';
  toranTone: 'lotus' | 'marigold';
}

const ROOM_STYLES: Record<EventThemeVariant, RoomStyle> = {
  ganesh: {
    roomOverlayGradient:
      'linear-gradient(180deg, rgba(52, 22, 6, 0.8) 0%, rgba(72, 31, 8, 0.62) 50%, rgba(42, 18, 5, 0.88) 100%)',
    roomKickerClass: 'text-[#FDE68A]',
    roomHeadingClass: 'text-[#FFFDF7]',
    jhoomarVariant: 'marigold',
    interiorClass: 'theme-ganesh text-[#3B1E08]',
    interiorBorderClass: 'border-[#D97706]/80',
    kickerClass: 'text-[#B45309]',
    titleClass: 'text-[#7C2D12]',
    gujaratiClass: 'text-[#9A3412]',
    bodyClass: 'text-[#451A03]/92',
    metaBoxClass: 'border-[#D97706]/45 bg-[#FFFDF7]/80 text-[#451A03]',
    actionBtnClass:
      'border-[#9A3412]/40 bg-[#9A3412] text-[#FFF9EE] hover:bg-[#7C2D12]',
    coverGradient: 'linear-gradient(160deg, #FFF9EE 0%, #FDE5B0 50%, #F5BC5E 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #FBF0D3 0%, #FFF9ED 100%)',
    coverBorderClass: 'border-[#D97706]/85',
    coverTextClass: 'text-[#7C2D12]',
    coverSubClass: 'text-[#9A3412]',
    ribbonVariant: 'saffron',
    dividerTone: 'saffron',
    cornerVariant: 'jasmine-saffron',
    toranTone: 'marigold',
  },
  haldi: {
    roomOverlayGradient:
      'linear-gradient(180deg, rgba(42, 36, 5, 0.78) 0%, rgba(62, 52, 7, 0.58) 50%, rgba(34, 29, 4, 0.86) 100%)',
    roomKickerClass: 'text-[#FEF08A]',
    roomHeadingClass: 'text-[#FEFCE8]',
    jhoomarVariant: 'marigold',
    interiorClass: 'theme-haldi text-[#312E07]',
    interiorBorderClass: 'border-[#CA8A04]/80',
    kickerClass: 'text-[#3F6212]',
    titleClass: 'text-[#854D0E]',
    gujaratiClass: 'text-[#3F6212]',
    bodyClass: 'text-[#3F2E05]/92',
    metaBoxClass: 'border-[#CA8A04]/45 bg-[#FEFDF2]/85 text-[#422006]',
    actionBtnClass:
      'border-[#3F6212]/40 bg-[#3F6212] text-[#FEFCE8] hover:bg-[#365314]',
    coverGradient: 'linear-gradient(155deg, #FEFCE8 0%, #FEF08A 48%, #FACC15 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #FEF3C7 0%, #FEFCE8 100%)',
    coverBorderClass: 'border-[#A16207]/80',
    coverTextClass: 'text-[#422006]',
    coverSubClass: 'text-[#3F6212]',
    ribbonVariant: 'haldi',
    dividerTone: 'saffron',
    cornerVariant: 'marigold-leaf',
    toranTone: 'marigold',
  },
  grahshanti: {
    roomOverlayGradient:
      'linear-gradient(180deg, rgba(22, 42, 32, 0.8) 0%, rgba(34, 58, 44, 0.62) 50%, rgba(18, 34, 26, 0.88) 100%)',
    roomKickerClass: 'text-[#DFBA66]',
    roomHeadingClass: 'text-[#FAF7EE]',
    jhoomarVariant: 'lotus',
    interiorClass: 'theme-grahshanti text-[#273024]',
    interiorBorderClass: 'border-[#8B9D77]/80',
    kickerClass: 'text-[#1E4D3B]',
    titleClass: 'text-[#2B4334]',
    gujaratiClass: 'text-[#7C5318]',
    bodyClass: 'text-[#2C3427]/92',
    metaBoxClass: 'border-[#C49A45]/50 bg-[#FAF7EE]/85 text-[#273024]',
    actionBtnClass:
      'border-[#1E4D3B]/45 bg-[#1E4D3B] text-[#FAF7EE] hover:bg-[#133D38]',
    coverGradient: 'linear-gradient(160deg, #FAF7EE 0%, #E7EEDB 50%, #D9CFAF 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #F0EDE0 0%, #FAF7EE 100%)',
    coverBorderClass: 'border-[#8E7334]/85',
    coverTextClass: 'text-[#1E4D3B]',
    coverSubClass: 'text-[#7C5318]',
    ribbonVariant: 'gold',
    dividerTone: 'gold',
    cornerVariant: 'jasmine-saffron',
    toranTone: 'lotus',
  },
  wedding: {
    roomOverlayGradient:
      'linear-gradient(180deg, rgba(28, 5, 11, 0.84) 0%, rgba(48, 10, 20, 0.66) 50%, rgba(22, 4, 9, 0.9) 100%)',
    roomKickerClass: 'text-[#DFBA66]',
    roomHeadingClass: 'text-[#FAF5EB]',
    jhoomarVariant: 'royal-maroon',
    interiorClass: 'theme-wedding-maroon text-[#FAF5EB]',
    interiorBorderClass: 'border-[#DFBA66]/90',
    kickerClass: 'text-[#DFBA66]',
    titleClass: 'text-[#FAF5EB]',
    gujaratiClass: 'text-[#F7D0D8]',
    bodyClass: 'text-[#F3E9D4]/92',
    metaBoxClass: 'border-[#DFBA66]/50 bg-[#2C0710]/85 text-[#FAF5EB]',
    actionBtnClass:
      'border-[#FAF5EB]/35 bg-[#C49A45] text-[#230910] hover:bg-[#DFBA66]',
    coverGradient: 'linear-gradient(155deg, #6E1326 0%, #4E0C1B 52%, #29060E 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #430A17 0%, #5C1222 100%)',
    coverBorderClass: 'border-[#DFBA66]/90',
    coverTextClass: 'text-[#FAF5EB]',
    coverSubClass: 'text-[#DFBA66]',
    ribbonVariant: 'maroon',
    dividerTone: 'ivory',
    cornerVariant: 'lotus-rose',
    toranTone: 'lotus',
  },
};

function CoverOrnamentCenterpiece({ event }: { event: BilingualEventConfig }) {
  if (event.id === 'ganesh') {
    return (
      <div className="flex flex-col items-center scale-[0.78] sm:scale-100 -my-1 sm:my-0">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <DecorativeCutout
            src={weddingConfig.decor.kalashCoconut}
            alt=""
            className="w-10 sm:w-14 h-auto"
          />
          <SacredGaneshaMedallion className="w-16 h-16 sm:w-22 sm:h-22 drop-shadow" />
        </div>
        <SilkRibbonBow variant="saffron" className="w-24 sm:w-28 h-8 sm:h-10 -mt-1.5" />
      </div>
    );
  }

  if (event.id === 'haldi') {
    return (
      <div className="flex flex-col items-center scale-[0.78] sm:scale-100 -my-1 sm:my-0">
        <div className="flex items-center gap-2">
          <FloralJhoomar variant="marigold" className="w-10 h-16 sm:w-14 sm:h-20 -mt-3" />
          <HaldiSunflowerMedallion className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow" />
          <FloralJhoomar variant="marigold" className="w-10 h-16 sm:w-14 sm:h-20 -mt-3" />
        </div>
        <SilkRibbonBow variant="haldi" className="w-24 sm:w-28 h-8 sm:h-10 -mt-1.5" />
      </div>
    );
  }

  if (event.id === 'grahshanti') {
    return (
      <div className="flex flex-col items-center scale-[0.78] sm:scale-100 -my-1 sm:my-0">
        <div className="w-18 h-18 sm:w-24 sm:h-24 rounded-full border-2 border-[#C49A45]/80 bg-[#FAF7EE]/95 p-1.5 sm:p-2 shadow-inner flex items-center justify-center">
          <DecorativeCutout
            src={weddingConfig.decor.kalashCoconut}
            alt="Traditional sacred Kalash with coconut and mango leaves"
            className="w-13 sm:w-18 h-auto"
          />
        </div>
        <SilkRibbonBow variant="gold" className="w-24 sm:w-28 h-8 sm:h-10 -mt-1.5" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center scale-[0.78] sm:scale-100 -my-1 sm:my-0">
      <div className="px-3.5 py-1 rounded-full border border-[#DFBA66]/75 bg-[#3D0914]/90 mb-1">
        <StaticPeacockCrest tone="ivory" className="w-16 sm:w-20 h-9 sm:h-11" />
      </div>
      <SilkRibbonBow variant="maroon" className="w-28 sm:w-32 h-9 sm:h-11 -mt-1" />
    </div>
  );
}

function EventSlideCard({
  event,
  index,
  isActive,
  isGaneshOpened,
  showGaneshShine,
  slideWidth,
  onSelect,
  onOpenGanesh,
  onJumpToRsvp,
}: {
  event: BilingualEventConfig;
  index: number;
  isActive: boolean;
  isGaneshOpened: boolean;
  showGaneshShine: boolean;
  slideWidth: number;
  onSelect: (idx: number) => void;
  onOpenGanesh: () => void;
  onJumpToRsvp: () => void;
}) {
  const style = ROOM_STYLES[event.id];
  const isGanesh = event.id === 'ganesh';
  const isMainWedding = event.id === 'wedding';
  const isCardOpen = isGanesh ? isActive && isGaneshOpened : isActive;
  const whatsappUrl = getWhatsAppUrl();

  const jumpToVenue = () => {
    const el = document.getElementById('wedding-venue');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div
      role="group"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${weddingConfig.events.length}: ${event.englishName}`}
      style={{ width: `${slideWidth}px` }}
      className={`shrink-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isActive ? 'scale-100 opacity-100 z-20' : 'scale-[0.9] opacity-85 z-10'
      }`}
    >
      <div className="relative perspective-card-stage">
        {isMainWedding && isActive && (
          <StaticPeacockOrnament className="absolute -top-6 right-0 sm:-top-10 sm:-right-5 w-14 sm:w-24 lg:w-26 h-auto z-40 drop-shadow-xl" />
        )}

        <div className="relative preserve-3d">
          {/* LAYER 1: Open Wedding Invitation Book Interior (Ganesh opens after TAP TO OPEN; others open automatically when active) */}
          <article
            aria-hidden={!isCardOpen}
            className={`book-interior-content ${
              isCardOpen ? 'is-visible relative' : 'is-hidden relative pointer-events-none'
            } min-h-[452px] sm:min-h-[470px] rounded-2xl sm:rounded-3xl border-2 ${style.interiorClass} ${
              style.interiorBorderClass
            } shadow-[0_24px_64px_rgba(10,3,5,0.48)] overflow-hidden flex flex-col justify-between`}
          >
            {/* Subtle Left Spine Shading Inside Opened Book */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-4 sm:w-6 bg-gradient-to-r from-black/15 via-black/5 to-transparent z-10"
            />

            {/* Inner Ornamental Frame */}
            <div
              aria-hidden="true"
              className={`pointer-events-none absolute inset-2.5 sm:inset-4 rounded-xl sm:rounded-2xl border ${style.interiorBorderClass} opacity-55 z-10`}
            />
            {isMainWedding && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-4 sm:inset-6 rounded-t-[110px] sm:rounded-t-[160px] rounded-b-xl border border-[#DFBA66]/45 z-10"
              />
            )}

            {/* Corner Florals & Traditional Botanical Accents */}
            <FloralCornerCluster
              variant={style.cornerVariant}
              position="top-left"
              className="absolute top-1 left-1 w-12 h-12 sm:w-22 sm:h-22 opacity-90 z-10"
            />
            <FloralCornerCluster
              variant={style.cornerVariant}
              position="top-right"
              className="absolute top-1 right-1 w-12 h-12 sm:w-22 sm:h-22 opacity-90 z-10"
            />
            <FloralCornerCluster
              variant={style.cornerVariant}
              position="bottom-left"
              className="hidden sm:block absolute bottom-1 left-1 w-20 h-20 opacity-80 z-10"
            />
            <FloralCornerCluster
              variant={style.cornerVariant}
              position="bottom-right"
              className="hidden sm:block absolute bottom-1 right-1 w-20 h-20 opacity-80 z-10"
            />

            <div className="relative z-20 p-4 pt-3 pb-5 sm:p-8 sm:pt-5 sm:pb-7 lg:p-10 flex-1 flex flex-col justify-between">
              {/* Top Draped Toran */}
              <HangingFloralToran
                tone={style.toranTone}
                className="-mt-1 sm:-mt-2 max-w-[175px] sm:max-w-[300px] mx-auto opacity-95 mb-2 sm:mb-3"
              />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 sm:gap-6 lg:gap-8 items-center my-auto">
                {/* Left Ceremony Motif / Artwork Plate */}
                <div className="lg:col-span-5 flex flex-col items-center">
                  <div
                    className={`relative w-full max-w-[196px] sm:max-w-[270px] rounded-xl sm:rounded-2xl overflow-hidden border-2 ${
                      isMainWedding ? 'border-[#DFBA66]' : 'border-[#C49A45]/75'
                    } shadow-md bg-[#FAF5EB]`}
                  >
                    {event.id === 'grahshanti' ? (
                      <div className="relative py-2.5 px-3 sm:py-4 sm:px-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#FAF7EE] to-[#E6ECDC]">
                        <SacredKalashMandala className="w-full max-h-[126px] sm:max-h-[220px] h-auto mx-auto opacity-30 absolute inset-0" />
                        <DecorativeCutout
                          src={weddingConfig.decor.kalashCoconut}
                          alt="Traditional Mangal Kalash with coconut and mango leaves for Grah Shanti Puja"
                          className="relative z-10 w-24 sm:w-44 h-auto drop-shadow-md"
                        />
                      </div>
                    ) : event.id === 'haldi' ? (
                      <div className="relative">
                        {event.artworkSrc && (
                          <img
                            src={event.artworkSrc}
                            alt={event.artworkAlt}
                            loading="lazy"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-[126px] sm:h-[236px] lg:h-[270px] object-cover block"
                          />
                        )}
                        <HaldiSunflowerMedallion className="absolute -bottom-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 drop-shadow" />
                      </div>
                    ) : event.artworkSrc ? (
                      <div className="relative">
                        <img
                          src={event.artworkSrc}
                          alt={event.artworkAlt}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-[126px] sm:h-[236px] lg:h-[270px] object-cover block"
                        />
                        {event.id === 'ganesh' && (
                          <SacredGaneshaMedallion className="absolute -bottom-2 -right-2 w-12 h-12 sm:w-16 sm:h-16 drop-shadow" />
                        )}
                      </div>
                    ) : (
                      <SacredKalashMandala className="w-full max-h-[130px] sm:max-h-[260px] h-auto mx-auto" />
                    )}
                  </div>
                </div>

                {/* Right Bilingual Event Invitation Details */}
                <div className="lg:col-span-7 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <StaticPeacockCrest
                      tone={isMainWedding ? 'ivory' : 'gold'}
                      className="w-8 h-5 hidden sm:block shrink-0"
                    />
                    <p
                      className={`text-[10px] sm:text-xs tracking-[0.2em] uppercase font-semibold ${style.kickerClass}`}
                    >
                      {event.subtitle}
                    </p>
                  </div>

                  <h4
                    className={`text-xl sm:text-3xl lg:text-[2.45rem] font-semibold tracking-[0.04em] uppercase mt-1 leading-tight ${style.titleClass}`}
                  >
                    {event.englishName}
                  </h4>
                  <p
                    lang="gu"
                    className={`font-gujarati text-lg sm:text-2xl font-semibold mt-0.5 ${style.gujaratiClass}`}
                  >
                    {event.gujaratiName}
                  </p>

                  <LotusDivider
                    tone={style.dividerTone}
                    className="my-2 sm:my-3 scale-90 sm:scale-100 lg:justify-start"
                  />

                  {/* Unboxed Hairline Date & Time Stationery Block */}
                  <div
                    className={`rounded-xl border px-3 py-2 sm:px-4 sm:py-2.5 inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-2.5 sm:gap-x-3.5 gap-y-1 ${style.metaBoxClass}`}
                  >
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tabular-nums">
                      <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#C49A45]" />
                      <span>{event.date}</span>
                    </span>
                    <span className="opacity-40" aria-hidden="true">
                      ·
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold tabular-nums">
                      <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#C49A45]" />
                      <span>{event.time}</span>
                    </span>
                  </div>

                  <p
                    className={`mt-2.5 sm:mt-3 text-[13px] sm:text-base leading-relaxed max-w-xl mx-auto lg:mx-0 ${style.bodyClass}`}
                  >
                    {event.description}
                  </p>

                  {/* Venue & Optional Action */}
                  <div className="mt-3 sm:mt-4 pt-2.5 sm:pt-3 border-t border-current/15 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                    <div className="flex items-start justify-center lg:justify-start gap-1.5 text-xs sm:text-sm">
                      <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 shrink-0 text-[#C49A45]" />
                      <span
                        className={
                          isMainWedding ? 'font-semibold text-[#DFBA66]' : 'italic opacity-90'
                        }
                      >
                        {event.venueLabel}
                      </span>
                    </div>

                    {isMainWedding ? (
                      <button
                        type="button"
                        onClick={jumpToVenue}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[44px] ${style.actionBtnClass}`}
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Venue &amp; Directions</span>
                      </button>
                    ) : whatsappUrl ? (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors whitespace-nowrap shrink-0 min-h-[44px] ${style.actionBtnClass}`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>WhatsApp Updates</span>
                      </a>
                    ) : (
                      <button
                        type="button"
                        onClick={onJumpToRsvp}
                        className={`inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full border text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[44px] ${style.actionBtnClass}`}
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        <span>Venue Updates</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* LAYER 2: Cover Page (Special Bottom-to-Top Cover for Ganesh Puja ONLY; Standard Auto-Opening Cover for All Others) */}
          {isGanesh ? (
            <>
              {showGaneshShine && (
                <div
                  aria-hidden="true"
                  className="animate-ganesh-shine pointer-events-none absolute inset-0 z-40 rounded-2xl sm:rounded-3xl"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(253, 230, 138, 0) 0%, rgba(255, 246, 204, 0.82) 45%, rgba(223, 186, 102, 0.36) 78%, rgba(255, 255, 255, 0) 100%)',
                  }}
                />
              )}

              <div
                className={`book-cover-flap-upward preserve-3d absolute inset-0 z-30 ${
                  isCardOpen ? 'is-open' : 'is-closed'
                }`}
              >
                <div
                  onClick={() => {
                    if (isActive) {
                      onOpenGanesh();
                    } else {
                      onSelect(index);
                    }
                  }}
                  aria-hidden={isCardOpen}
                  style={{ background: style.coverGradient }}
                  className={`backface-hidden relative w-full h-full rounded-2xl sm:rounded-3xl border-2 ${style.coverBorderClass} shadow-[0_20px_56px_rgba(10,3,5,0.48)] flex flex-col items-center justify-center px-5 py-6 sm:p-9 text-center cursor-pointer overflow-hidden`}
                >
                  {/* Top Physical Crease Shading Hinting Vertical Upward Opening */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-3 bg-gradient-to-b from-black/15 via-white/25 to-transparent border-b border-[#C49A45]/45"
                  />

                  {/* Traditional Ornamental Double Borders */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-2.5 sm:inset-4 rounded-xl sm:rounded-2xl border border-[#D97706]/65"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-4 sm:inset-6 rounded-lg sm:rounded-xl border border-dashed border-[#C49A45]/55"
                  />

                  {/* Top Marigold Toran & Four Floral Corners */}
                  <HangingFloralToran
                    tone="marigold"
                    className="hidden sm:block absolute top-1 left-1/2 -translate-x-1/2 max-w-[260px] opacity-90"
                  />
                  <FloralCornerCluster
                    variant="jasmine-saffron"
                    position="top-left"
                    className="absolute top-1 left-1 w-12 h-12 sm:w-24 sm:h-24 opacity-95"
                  />
                  <FloralCornerCluster
                    variant="jasmine-saffron"
                    position="top-right"
                    className="absolute top-1 right-1 w-12 h-12 sm:w-24 sm:h-24 opacity-95"
                  />
                  <FloralCornerCluster
                    variant="jasmine-saffron"
                    position="bottom-left"
                    className="absolute bottom-1 left-1 w-11 h-11 sm:w-22 sm:h-22 opacity-90"
                  />
                  <FloralCornerCluster
                    variant="jasmine-saffron"
                    position="bottom-right"
                    className="absolute bottom-1 right-1 w-11 h-11 sm:w-22 sm:h-22 opacity-90"
                  />

                  {/* Subtle Lotus Floral Side Accents */}
                  <DecorativeCutout
                    src={weddingConfig.decor.lotusCluster}
                    alt=""
                    className="hidden sm:block absolute -bottom-2 left-10 w-20 h-auto opacity-80"
                  />
                  <DecorativeCutout
                    src={weddingConfig.decor.kalashCoconut}
                    alt=""
                    className="hidden sm:block absolute bottom-3 right-10 w-14 h-auto opacity-85"
                  />

                  <div className="relative z-10 w-full max-w-md flex flex-col items-center px-3">
                    {/* Framed Traditional Ganesh Puja Artwork + Medallion */}
                    <div className="relative flex items-center justify-center mb-1.5 sm:mb-2.5">
                      <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-t-full rounded-b-xl border-2 border-[#C49A45] shadow-md overflow-hidden bg-[#FFF9EE]">
                        {event.artworkSrc ? (
                          <img
                            src={event.artworkSrc}
                            alt={event.artworkAlt}
                            loading="eager"
                            decoding="async"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover block"
                          />
                        ) : (
                          <SacredGaneshaMedallion className="w-full h-full p-2" />
                        )}
                      </div>
                      <SacredGaneshaMedallion className="absolute -bottom-2 -right-3 w-10 h-10 sm:w-12 sm:h-12 drop-shadow" />
                    </div>

                    <SilkRibbonBow
                      variant="saffron"
                      className="w-24 sm:w-28 h-7 sm:h-9 -mt-1"
                    />

                    {/* Gujarati Auspicious Invocation */}
                    <p
                      lang="gu"
                      className="font-gujarati text-sm sm:text-lg font-semibold text-[#9A3412] mt-1"
                    >
                      {event.coverSealText}
                    </p>

                    <LotusDivider
                      tone="saffron"
                      className="my-1.5 sm:my-2.5 scale-75 sm:scale-100"
                    />

                    <h4 className="text-2xl sm:text-4xl font-semibold tracking-[0.06em] uppercase text-[#7C2D12]">
                      {event.englishName}
                    </h4>
                    <p
                      lang="gu"
                      className="font-gujarati text-lg sm:text-2xl font-semibold text-[#9A3412] mt-0.5"
                    >
                      {event.gujaratiName}
                    </p>

                    <button
                      type="button"
                      tabIndex={isCardOpen ? -1 : 0}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isActive) {
                          onOpenGanesh();
                        } else {
                          onSelect(index);
                        }
                      }}
                      className="mt-4 sm:mt-5 inline-flex items-center justify-center gap-2.5 min-h-[44px] px-6 py-2.5 sm:px-7 sm:py-3 rounded-full border-2 border-[#FDE68A]/85 bg-gradient-to-b from-[#9A3412] to-[#7C2D12] text-[#FFFDF7] text-xs sm:text-sm font-bold tracking-[0.22em] uppercase shadow-[0_8px_24px_rgba(124,45,18,0.38)] hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer whitespace-nowrap"
                    >
                      <Sparkles className="w-4 h-4 text-[#FDE68A] shrink-0" />
                      <span>TAP TO OPEN</span>
                      <ChevronUp className="w-4 h-4 text-[#FDE68A] shrink-0" />
                    </button>
                  </div>
                </div>

                {/* Underside Foil Face Seen While Cover Lifts Upward */}
                <div
                  aria-hidden="true"
                  className="backface-hidden absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-[#D97706]/85 shadow-inner"
                  style={{
                    background: style.coverUndersideGradient,
                    transform: 'rotateX(180deg)',
                  }}
                />
              </div>
            </>
          ) : (
            <div
              className={`book-cover-flap preserve-3d absolute inset-0 z-30 ${
                isCardOpen ? 'is-open' : 'is-closed'
              }`}
            >
              <button
                type="button"
                onClick={() => onSelect(index)}
                tabIndex={isCardOpen ? -1 : 0}
                aria-hidden={isCardOpen}
                aria-label={`Select ${event.englishName} invitation`}
                style={{ background: style.coverGradient }}
                className={`backface-hidden relative w-full h-full rounded-2xl sm:rounded-3xl border-2 ${style.coverBorderClass} shadow-[0_20px_52px_rgba(10,3,5,0.45)] flex flex-col items-center justify-center px-5 py-7 sm:p-10 text-center cursor-pointer overflow-hidden`}
              >
                {/* Left Physical Book Spine Shading */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 left-0 w-3 sm:w-4 bg-gradient-to-r from-black/25 via-white/20 to-transparent border-r border-[#C49A45]/45"
                />

                {/* Inner Gilt Border */}
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-3 sm:inset-4 rounded-xl sm:rounded-2xl border ${style.coverBorderClass} opacity-65`}
                />

                {isMainWedding && (
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-5 sm:inset-7 rounded-t-[120px] sm:rounded-t-[160px] rounded-b-xl border border-[#DFBA66]/55"
                  />
                )}

                {/* Cover Floral Corners */}
                <FloralCornerCluster
                  variant={style.cornerVariant}
                  position="top-left"
                  className="absolute top-1 left-1 w-11 h-11 sm:w-24 sm:h-24 opacity-95"
                />
                <FloralCornerCluster
                  variant={style.cornerVariant}
                  position="top-right"
                  className="absolute top-1 right-1 w-11 h-11 sm:w-24 sm:h-24 opacity-95"
                />
                <FloralCornerCluster
                  variant={style.cornerVariant}
                  position="bottom-left"
                  className="absolute bottom-1 left-1 w-10 h-10 sm:w-22 sm:h-22 opacity-90"
                />
                <FloralCornerCluster
                  variant={style.cornerVariant}
                  position="bottom-right"
                  className="absolute bottom-1 right-1 w-10 h-10 sm:w-22 sm:h-22 opacity-90"
                />

                <div className="relative z-10 w-full max-w-md flex flex-col items-center px-3">
                  <CoverOrnamentCenterpiece event={event} />

                  <p
                    lang="gu"
                    className={`font-gujarati text-sm sm:text-xl font-semibold mt-1 sm:mt-2 ${style.coverSubClass}`}
                  >
                    {event.coverSealText}
                  </p>

                  <LotusDivider
                    tone={style.dividerTone}
                    className="my-1.5 sm:my-3 scale-75 sm:scale-100"
                  />

                  <p
                    className={`text-[11px] sm:text-sm tracking-[0.14em] sm:tracking-[0.22em] uppercase font-semibold tabular-nums ${style.coverSubClass}`}
                  >
                    {event.date} · {event.time}
                  </p>

                  <h4
                    className={`text-xl sm:text-4xl font-semibold tracking-[0.05em] uppercase mt-1.5 sm:mt-2 ${style.coverTextClass}`}
                  >
                    {event.englishName}
                  </h4>
                  <p
                    lang="gu"
                    className={`font-gujarati text-base sm:text-2xl font-semibold mt-0.5 sm:mt-1 ${style.coverSubClass}`}
                  >
                    {event.gujaratiName}
                  </p>

                  <p
                    className={`mt-4 text-[11px] sm:text-xs tracking-[0.22em] uppercase font-semibold opacity-80 ${style.coverSubClass}`}
                  >
                    Swipe or Tap to Unfold
                  </p>
                </div>
              </button>

              {/* Underside Cover Foil Lining Seen Mid-Swing */}
              <div
                aria-hidden="true"
                className={`backface-hidden absolute inset-0 rounded-2xl sm:rounded-3xl border-2 ${style.coverBorderClass} shadow-inner`}
                style={{
                  background: style.coverUndersideGradient,
                  transform: 'rotateY(180deg)',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ClickEventCards({
  events,
  activeIndex,
  onActiveIndexChange,
  onJumpToRsvp,
}: {
  events: readonly BilingualEventConfig[];
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  onJumpToRsvp: () => void;
}) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(() =>
    typeof window !== 'undefined' ? window.innerWidth : 1024
  );
  const [isGaneshOpened, setIsGaneshOpened] = useState(false);
  const [showGaneshShine, setShowGaneshShine] = useState(false);
  const shineTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (shineTimerRef.current !== null) {
        window.clearTimeout(shineTimerRef.current);
      }
    };
  }, []);

  const handleOpenGanesh = useCallback(() => {
    setIsGaneshOpened(true);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReduced) {
      setShowGaneshShine(true);
      if (shineTimerRef.current !== null) {
        window.clearTimeout(shineTimerRef.current);
      }
      shineTimerRef.current = window.setTimeout(() => {
        setShowGaneshShine(false);
      }, 880);
    }
  }, []);

  // Refs for 60fps horizontal swipe/drag without React re-render overhead
  const dragStateRef = useRef<{
    active: boolean;
    mode: 'touch' | 'mouse' | null;
    startX: number;
    startY: number;
    startTime: number;
    dx: number;
    lock: 'pending' | 'horizontal' | 'vertical';
  }>({
    active: false,
    mode: null,
    startX: 0,
    startY: 0,
    startTime: 0,
    dx: 0,
    lock: 'pending',
  });
  const suppressClickRef = useRef(false);
  const wheelCooldownRef = useRef(0);

  // Measure carousel viewport reliably
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const update = () => {
      setViewportWidth(el.clientWidth || window.innerWidth);
    };
    update();

    if (typeof ResizeObserver !== 'undefined') {
      const ro = new ResizeObserver(update);
      ro.observe(el);
      return () => ro.disconnect();
    }
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
  const slideWidth = isMobile
    ? Math.max(264, Math.min(viewportWidth - 54, 348))
    : isTablet
    ? Math.min(viewportWidth - 148, 620)
    : Math.min(viewportWidth - 280, 780);
  const slideGap = isMobile ? 12 : isTablet ? 24 : 32;
  const step = slideWidth + slideGap;
  const baseTranslateX = (viewportWidth - slideWidth) / 2 - activeIndex * step;

  const applyTrackTransform = useCallback(
    (dx: number, immediate: boolean) => {
      const track = trackRef.current;
      if (!track) return;
      track.style.transition = immediate
        ? 'none'
        : 'transform 520ms cubic-bezier(0.22, 1, 0.36, 1)';
      track.style.transform = `translate3d(${baseTranslateX + dx}px, 0, 0)`;
    },
    [baseTranslateX]
  );

  // Keep track synced whenever activeIndex or dimensions change
  useEffect(() => {
    if (!dragStateRef.current.active) {
      applyTrackTransform(0, false);
    }
  }, [applyTrackTransform]);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const clamped = Math.max(0, Math.min(events.length - 1, nextIndex));
      onActiveIndexChange(clamped);
    },
    [events.length, onActiveIndexChange]
  );

  // Touch Swipe Handling with Strict Vertical-Scroll Preservation
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      dragStateRef.current = {
        active: true,
        mode: 'touch',
        startX: t.clientX,
        startY: t.clientY,
        startTime: performance.now(),
        dx: 0,
        lock: 'pending',
      };
    };

    const onTouchMove = (e: TouchEvent) => {
      const st = dragStateRef.current;
      if (!st.active || st.mode !== 'touch' || e.touches.length !== 1) return;

      const t = e.touches[0];
      const dx = t.clientX - st.startX;
      const dy = t.clientY - st.startY;

      if (st.lock === 'pending') {
        if (Math.abs(dy) > 8 && Math.abs(dy) >= Math.abs(dx)) {
          st.lock = 'vertical';
          st.active = false;
          return;
        }
        if (Math.abs(dx) > 8 && Math.abs(dx) > Math.abs(dy) * 1.1) {
          st.lock = 'horizontal';
        }
      }

      if (st.lock === 'horizontal') {
        e.preventDefault();
        let effectiveDx = dx;
        if ((activeIndex === 0 && dx > 0) || (activeIndex === events.length - 1 && dx < 0)) {
          effectiveDx = dx * 0.32;
        }
        st.dx = effectiveDx;
        applyTrackTransform(effectiveDx, true);
      }
    };

    const finishTouch = () => {
      const st = dragStateRef.current;
      if (st.mode !== 'touch') return;

      if (st.lock === 'horizontal') {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 80);

        const dt = performance.now() - st.startTime;
        const threshold = Math.min(48, slideWidth * 0.16);
        const isQuickFlick = Math.abs(st.dx) > 22 && dt < 260;

        if ((st.dx < -threshold || (isQuickFlick && st.dx < 0)) && activeIndex < events.length - 1) {
          goToIndex(activeIndex + 1);
        } else if ((st.dx > threshold || (isQuickFlick && st.dx > 0)) && activeIndex > 0) {
          goToIndex(activeIndex - 1);
        } else {
          applyTrackTransform(0, false);
        }
      }

      st.active = false;
      st.mode = null;
      st.dx = 0;
      st.lock = 'pending';
    };

    viewport.addEventListener('touchstart', onTouchStart, { passive: true });
    viewport.addEventListener('touchmove', onTouchMove, { passive: false });
    viewport.addEventListener('touchend', finishTouch, { passive: true });
    viewport.addEventListener('touchcancel', finishTouch, { passive: true });

    return () => {
      viewport.removeEventListener('touchstart', onTouchStart);
      viewport.removeEventListener('touchmove', onTouchMove);
      viewport.removeEventListener('touchend', finishTouch);
      viewport.removeEventListener('touchcancel', finishTouch);
    };
  }, [activeIndex, applyTrackTransform, events.length, goToIndex, slideWidth]);

  // Desktop Mouse Drag Handling
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const st = dragStateRef.current;
      if (!st.active || st.mode !== 'mouse') return;

      const dx = e.clientX - st.startX;
      if (st.lock === 'pending' && Math.abs(dx) > 6) {
        st.lock = 'horizontal';
      }

      if (st.lock === 'horizontal') {
        let effectiveDx = dx;
        if ((activeIndex === 0 && dx > 0) || (activeIndex === events.length - 1 && dx < 0)) {
          effectiveDx = dx * 0.32;
        }
        st.dx = effectiveDx;
        applyTrackTransform(effectiveDx, true);
      }
    };

    const onMouseUp = () => {
      const st = dragStateRef.current;
      if (!st.active || st.mode !== 'mouse') return;

      if (st.lock === 'horizontal') {
        suppressClickRef.current = true;
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 60);

        const dt = performance.now() - st.startTime;
        const threshold = Math.min(64, slideWidth * 0.14);
        const isQuickFlick = Math.abs(st.dx) > 26 && dt < 280;

        if ((st.dx < -threshold || (isQuickFlick && st.dx < 0)) && activeIndex < events.length - 1) {
          goToIndex(activeIndex + 1);
        } else if ((st.dx > threshold || (isQuickFlick && st.dx > 0)) && activeIndex > 0) {
          goToIndex(activeIndex - 1);
        } else {
          applyTrackTransform(0, false);
        }
      }

      st.active = false;
      st.mode = null;
      st.dx = 0;
      st.lock = 'pending';
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [activeIndex, applyTrackTransform, events.length, goToIndex, slideWidth]);

  const handleMouseDown = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    dragStateRef.current = {
      active: true,
      mode: 'mouse',
      startX: e.clientX,
      startY: e.clientY,
      startTime: performance.now(),
      dx: 0,
      lock: 'pending',
    };
  };

  // Trackpad Two-Finger Horizontal Swipe Support (Never Intercepts Vertical Scroll)
  const handleWheel = (e: WheelEvent<HTMLDivElement>) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY) * 1.25 && Math.abs(e.deltaX) > 20) {
      const now = performance.now();
      if (now < wheelCooldownRef.current) return;
      wheelCooldownRef.current = now + 540;

      if (e.deltaX > 0 && activeIndex < events.length - 1) {
        goToIndex(activeIndex + 1);
      } else if (e.deltaX < 0 && activeIndex > 0) {
        goToIndex(activeIndex - 1);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' && activeIndex < events.length - 1) {
      e.preventDefault();
      goToIndex(activeIndex + 1);
    } else if (e.key === 'ArrowLeft' && activeIndex > 0) {
      e.preventDefault();
      goToIndex(activeIndex - 1);
    }
  };

  const activeEvent = events[activeIndex] ?? events[0];
  const activeStyle = ROOM_STYLES[activeEvent.id];

  return (
    <div
      id="event-carousel-stage"
      role="region"
      aria-roledescription="carousel"
      aria-label="Royal Wedding Ceremony Invitations Slider"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative py-8 sm:py-16 lg:py-20 overflow-hidden border-t border-[#C49A45]/40 focus:outline-none"
    >
      {/* Crossfading Royal Palace Chamber Backdrops Matching the Active Slide */}
      {events.map((ev, idx) => (
        <img
          key={ev.id}
          src={ev.roomBackdropSrc}
          alt={idx === activeIndex ? ev.roomBackdropAlt : ''}
          aria-hidden={idx !== activeIndex}
          loading={idx === 0 ? 'eager' : 'lazy'}
          decoding="async"
          referrerPolicy="no-referrer"
          className={`absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none transition-opacity duration-500 ${
            idx === activeIndex ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Thematic Contrast Scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none transition-all duration-500"
        style={{ background: activeStyle.roomOverlayGradient }}
      />

      {/* Draped Palace Garlands & Swinging Lotus Framing */}
      <HangingFloralToran
        tone={activeStyle.toranTone}
        className="hidden sm:block absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl opacity-90 z-10"
      />
      <SwingingLotusGarland
        timing="a"
        className="block absolute top-0 left-0.5 sm:left-5 lg:left-12 w-7 sm:w-12 lg:w-14 h-20 sm:h-36 lg:h-44 opacity-95 z-10"
      />
      <SwingingLotusGarland
        timing="b"
        flipHorizontal
        className="block absolute top-0 right-0.5 sm:right-5 lg:right-12 w-7 sm:w-12 lg:w-14 h-20 sm:h-36 lg:h-44 opacity-95 z-10"
      />
      <FloralJhoomar
        variant={activeStyle.jhoomarVariant}
        className="hidden md:block absolute top-0 left-20 lg:left-32 w-12 h-32 opacity-90 z-10"
      />
      <FloralJhoomar
        variant={activeStyle.jhoomarVariant}
        className="hidden md:block absolute top-0 right-20 lg:right-32 w-12 h-32 opacity-90 z-10"
      />

      {/* Active Palace Room Header */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mb-5 sm:mb-8">
        <p
          className={`text-[10px] sm:text-sm tracking-[0.24em] uppercase font-semibold transition-colors duration-300 ${activeStyle.roomKickerClass}`}
        >
          {activeEvent.roomTitle} · {activeEvent.date}
        </p>
        <h3
          className={`font-calligraphy text-3xl sm:text-5xl mt-0.5 sm:mt-1 drop-shadow transition-colors duration-300 ${activeStyle.roomHeadingClass}`}
        >
          {activeEvent.englishName}
        </h3>
      </div>

      {/* Horizontal Carousel Viewport + Desktop Flanking Arrows */}
      <div className="relative z-20">
        {/* Desktop Left Navigation Arrow */}
        <button
          type="button"
          onClick={() => goToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous ceremony invitation"
          className="hidden sm:flex items-center justify-center absolute left-3 lg:left-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border-2 border-[#DFBA66]/85 bg-[#26070F]/85 text-[#FAF5EB] shadow-xl hover:bg-[#5C1222] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Desktop Right Navigation Arrow */}
        <button
          type="button"
          onClick={() => goToIndex(activeIndex + 1)}
          disabled={activeIndex === events.length - 1}
          aria-label="Next ceremony invitation"
          className="hidden sm:flex items-center justify-center absolute right-3 lg:right-8 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full border-2 border-[#DFBA66]/85 bg-[#26070F]/85 text-[#FAF5EB] shadow-xl hover:bg-[#5C1222] disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        <div
          ref={viewportRef}
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
          onClickCapture={(e) => {
            if (suppressClickRef.current) {
              e.stopPropagation();
              e.preventDefault();
            }
          }}
          style={{ touchAction: 'pan-y' }}
          className="w-full overflow-hidden select-none cursor-grab active:cursor-grabbing pt-7 pb-3 sm:pt-12 sm:pb-4"
        >
          <div
            ref={trackRef}
            style={{
              gap: `${slideGap}px`,
              transform: `translate3d(${baseTranslateX}px, 0, 0)`,
              willChange: 'transform',
            }}
            className="flex items-center"
          >
            {events.map((event, idx) => (
              <EventSlideCard
                key={event.id}
                event={event}
                index={idx}
                isActive={idx === activeIndex}
                isGaneshOpened={isGaneshOpened}
                showGaneshShine={showGaneshShine}
                slideWidth={slideWidth}
                onSelect={goToIndex}
                onOpenGanesh={handleOpenGanesh}
                onJumpToRsvp={onJumpToRsvp}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Tactile Bottom Carousel Controls (Mobile + Desktop Progress & Arrow Buttons) */}
      <div className="relative z-20 max-w-xl mx-auto px-4 mt-5 sm:mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={() => goToIndex(activeIndex - 1)}
          disabled={activeIndex === 0}
          aria-label="Previous wedding event"
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border border-[#DFBA66]/80 bg-[#26070F]/85 text-[#FAF5EB] hover:bg-[#5C1222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div
          role="tablist"
          aria-label="Choose Wedding Event Slide"
          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1C050A]/75 border border-[#C49A45]/45"
        >
          {events.map((ev, idx) => {
            const selected = idx === activeIndex;
            return (
              <button
                key={ev.id}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-label={`${ev.englishName} (${idx + 1} of ${events.length})`}
                onClick={() => goToIndex(idx)}
                className="min-w-[32px] min-h-[36px] flex items-center justify-center cursor-pointer"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    selected
                      ? 'w-7 bg-[#DFBA66] shadow-[0_0_10px_rgba(223,186,102,0.75)]'
                      : 'w-2.5 bg-[#FAF5EB]/45 hover:bg-[#FAF5EB]/75'
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => goToIndex(activeIndex + 1)}
          disabled={activeIndex === events.length - 1}
          aria-label="Next wedding event"
          className="flex items-center justify-center min-w-[44px] min-h-[44px] rounded-full border border-[#DFBA66]/80 bg-[#26070F]/85 text-[#FAF5EB] hover:bg-[#5C1222] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
