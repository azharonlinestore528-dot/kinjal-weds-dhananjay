import { BookOpen, Calendar, ChevronUp, Clock, MapPin, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import {
  getWhatsAppUrl,
  weddingConfig,
  type BilingualEventConfig,
  type EventThemeVariant,
} from '../config/weddingConfig';
import {
  FloralCornerCluster,
  FloralJhoomar,
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
  closeBtnClass: string;
  coverGradient: string;
  coverUndersideGradient: string;
  coverBorderClass: string;
  coverTextClass: string;
  coverSubClass: string;
  coverCtaClass: string;
  ribbonVariant: 'saffron' | 'haldi' | 'gold' | 'maroon';
  dividerTone: 'gold' | 'saffron' | 'ivory' | 'burgundy';
  cornerVariant: 'lotus-rose' | 'marigold-leaf' | 'jasmine-saffron';
  toranTone: 'lotus' | 'marigold';
  swingTimingLeft: 'a' | 'b' | 'c';
  swingTimingRight: 'a' | 'b' | 'c';
}

const ROOM_STYLES: Record<EventThemeVariant, RoomStyle> = {
  ganesh: {
    roomOverlayGradient:
      'linear-gradient(180deg, rgba(48, 22, 6, 0.78) 0%, rgba(69, 30, 8, 0.6) 50%, rgba(42, 18, 5, 0.85) 100%)',
    roomKickerClass: 'text-[#FDE68A]',
    roomHeadingClass: 'text-[#FFFDF7]',
    jhoomarVariant: 'marigold',
    interiorClass: 'theme-ganesh text-[#3B1E08]',
    interiorBorderClass: 'border-[#D97706]/70',
    kickerClass: 'text-[#B45309]',
    titleClass: 'text-[#7C2D12]',
    gujaratiClass: 'text-[#9A3412]',
    bodyClass: 'text-[#451A03]/90',
    metaBoxClass: 'bg-[#FFFDF7]/95 border-[#D97706]/45 text-[#451A03]',
    closeBtnClass: 'bg-[#FFF7E4] hover:bg-[#FDE5B0] border-[#D97706]/60 text-[#7C2D12]',
    coverGradient: 'linear-gradient(160deg, #FFF9EE 0%, #FDE5B0 48%, #F6C574 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #FBF0D3 0%, #FFF9ED 100%)',
    coverBorderClass: 'border-[#D97706]/80',
    coverTextClass: 'text-[#7C2D12]',
    coverSubClass: 'text-[#9A3412]',
    coverCtaClass: 'bg-[#9A3412] text-[#FFF9EE] border-[#FDE68A]/50',
    ribbonVariant: 'saffron',
    dividerTone: 'saffron',
    cornerVariant: 'jasmine-saffron',
    toranTone: 'marigold',
    swingTimingLeft: 'a',
    swingTimingRight: 'b',
  },
  haldi: {
    roomOverlayGradient:
      'linear-gradient(180deg, rgba(35, 32, 6, 0.76) 0%, rgba(58, 50, 8, 0.56) 50%, rgba(30, 27, 4, 0.84) 100%)',
    roomKickerClass: 'text-[#FEF08A]',
    roomHeadingClass: 'text-[#FEFCE8]',
    jhoomarVariant: 'marigold',
    interiorClass: 'theme-haldi text-[#312E07]',
    interiorBorderClass: 'border-[#CA8A04]/75',
    kickerClass: 'text-[#3F6212]',
    titleClass: 'text-[#854D0E]',
    gujaratiClass: 'text-[#3F6212]',
    bodyClass: 'text-[#3F2E05]/90',
    metaBoxClass: 'bg-[#FEFDF2]/95 border-[#CA8A04]/45 text-[#422006]',
    closeBtnClass: 'bg-[#FEFCE8] hover:bg-[#FEF08A] border-[#CA8A04]/60 text-[#422006]',
    coverGradient: 'linear-gradient(155deg, #FEFCE8 0%, #FEF08A 46%, #FACC15 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #FEF3C7 0%, #FEFCE8 100%)',
    coverBorderClass: 'border-[#A16207]/75',
    coverTextClass: 'text-[#422006]',
    coverSubClass: 'text-[#3F6212]',
    coverCtaClass: 'bg-[#3F6212] text-[#FEFCE8] border-[#FEF08A]/50',
    ribbonVariant: 'haldi',
    dividerTone: 'saffron',
    cornerVariant: 'marigold-leaf',
    toranTone: 'marigold',
    swingTimingLeft: 'b',
    swingTimingRight: 'c',
  },
  grahshanti: {
    roomOverlayGradient:
      'linear-gradient(180deg, rgba(38, 26, 14, 0.78) 0%, rgba(56, 38, 20, 0.6) 50%, rgba(34, 22, 11, 0.85) 100%)',
    roomKickerClass: 'text-[#DFBA66]',
    roomHeadingClass: 'text-[#FAF5EB]',
    jhoomarVariant: 'lotus',
    interiorClass: 'theme-grahshanti text-[#2E1E0F]',
    interiorBorderClass: 'border-[#C49A45]/80',
    kickerClass: 'text-[#9F7624]',
    titleClass: 'text-[#5C1222]',
    gujaratiClass: 'text-[#1E4D3B]',
    bodyClass: 'text-[#2B1418]/90',
    metaBoxClass: 'bg-[#FAF5EB]/95 border-[#C49A45]/50 text-[#2B1418]',
    closeBtnClass: 'bg-[#FAF5EB] hover:bg-[#EFE1C1] border-[#C49A45]/65 text-[#5C1222]',
    coverGradient: 'linear-gradient(160deg, #FBF6EA 0%, #EFE1C1 52%, #DFC389 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #F4E9CF 0%, #FAF5EB 100%)',
    coverBorderClass: 'border-[#9F7624]/80',
    coverTextClass: 'text-[#5C1222]',
    coverSubClass: 'text-[#1E4D3B]',
    coverCtaClass: 'bg-[#1E4D3B] text-[#FAF5EB] border-[#DFBA66]/55',
    ribbonVariant: 'gold',
    dividerTone: 'gold',
    cornerVariant: 'jasmine-saffron',
    toranTone: 'lotus',
    swingTimingLeft: 'c',
    swingTimingRight: 'a',
  },
  wedding: {
    roomOverlayGradient:
      'linear-gradient(180deg, rgba(24, 5, 10, 0.8) 0%, rgba(44, 9, 18, 0.62) 50%, rgba(20, 4, 8, 0.88) 100%)',
    roomKickerClass: 'text-[#DFBA66]',
    roomHeadingClass: 'text-[#FAF5EB]',
    jhoomarVariant: 'royal-maroon',
    interiorClass: 'theme-wedding-maroon text-[#FAF5EB]',
    interiorBorderClass: 'border-[#DFBA66]/85',
    kickerClass: 'text-[#DFBA66]',
    titleClass: 'text-[#FAF5EB]',
    gujaratiClass: 'text-[#F7D0D8]',
    bodyClass: 'text-[#F3E9D4]/92',
    metaBoxClass: 'bg-[#2C0710]/92 border-[#C49A45]/60 text-[#FAF5EB]',
    closeBtnClass: 'bg-[#3D0914] hover:bg-[#5C1222] border-[#DFBA66]/70 text-[#FAF5EB]',
    coverGradient: 'linear-gradient(155deg, #6E1326 0%, #4E0C1B 48%, #1F3F38 100%)',
    coverUndersideGradient: 'linear-gradient(180deg, #430A17 0%, #5C1222 100%)',
    coverBorderClass: 'border-[#DFBA66]/90',
    coverTextClass: 'text-[#FAF5EB]',
    coverSubClass: 'text-[#DFBA66]',
    coverCtaClass: 'bg-[#C49A45] text-[#230910] border-[#FAF5EB]/40',
    ribbonVariant: 'maroon',
    dividerTone: 'ivory',
    cornerVariant: 'lotus-rose',
    toranTone: 'lotus',
    swingTimingLeft: 'a',
    swingTimingRight: 'c',
  },
};

function CoverOrnamentCenterpiece({ event }: { event: BilingualEventConfig }) {
  if (event.id === 'ganesh') {
    return (
      <div className="flex flex-col items-center">
        <div className="flex items-center gap-3">
          <DecorativeCutout
            src={weddingConfig.decor.kalashCoconut}
            alt=""
            className="w-11 sm:w-14 h-auto"
          />
          <SacredGaneshaMedallion className="w-18 h-18 sm:w-22 sm:h-22 drop-shadow" />
        </div>
        <SilkRibbonBow variant="saffron" className="w-28 h-10 -mt-1.5" />
      </div>
    );
  }

  if (event.id === 'haldi') {
    return (
      <div className="flex flex-col items-center">
        <FloralJhoomar variant="marigold" className="w-16 h-24 sm:w-20 sm:h-28 -mt-4" />
        <SilkRibbonBow variant="haldi" className="w-28 h-10 -mt-2" />
      </div>
    );
  }

  if (event.id === 'grahshanti') {
    return (
      <div className="flex flex-col items-center">
        <div className="w-22 h-22 sm:w-26 sm:h-26 rounded-full border-2 border-[#C49A45]/80 bg-[#FAF5EB]/95 p-2 shadow-inner flex items-center justify-center">
          <DecorativeCutout
            src={weddingConfig.decor.kalashCoconut}
            alt="Traditional sacred Kalash with coconut and mango leaves"
            className="w-16 sm:w-20 h-auto"
          />
        </div>
        <SilkRibbonBow variant="gold" className="w-28 h-10 -mt-2" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="px-4 py-1.5 rounded-full border border-[#DFBA66]/70 bg-[#133D38]/85 mb-2">
        <StaticPeacockCrest tone="ivory" className="w-20 h-11" />
      </div>
      <SilkRibbonBow variant="maroon" className="w-32 h-11 -mt-1" />
    </div>
  );
}

function EventChamberBotanicalBorder({ id }: { id: EventThemeVariant }) {
  if (id === 'ganesh') {
    return (
      <>
        <DecorativeCutout
          src={weddingConfig.decor.kalashCoconut}
          alt="Traditional Kalash with coconut and mango leaves"
          className="hidden sm:block absolute bottom-4 left-3 lg:left-8 w-24 lg:w-32 h-auto opacity-95 z-10 drop-shadow-xl"
        />
        <DecorativeCutout
          src={weddingConfig.decor.lotusCluster}
          alt=""
          className="hidden sm:block absolute bottom-2 right-3 lg:right-8 w-28 lg:w-36 h-auto opacity-90 z-10 drop-shadow-xl"
        />
      </>
    );
  }

  if (id === 'haldi') {
    return (
      <>
        <DecorativeCutout
          src={weddingConfig.decor.coconutPalm}
          alt=""
          className="hidden md:block absolute bottom-2 -left-4 lg:left-4 w-36 lg:w-44 h-auto opacity-85 z-10"
        />
        <DecorativeCutout
          src={weddingConfig.decor.bougainvilleaBranch}
          alt=""
          flipHorizontal
          className="hidden sm:block absolute top-8 -right-4 lg:right-0 w-36 lg:w-48 h-auto opacity-85 z-10"
        />
      </>
    );
  }

  if (id === 'grahshanti') {
    return (
      <>
        <DecorativeCutout
          src={weddingConfig.decor.kalashCoconut}
          alt="Traditional Kalash with coconut and mango leaves"
          className="hidden sm:block absolute bottom-4 left-3 lg:left-10 w-24 lg:w-32 h-auto opacity-95 z-10 drop-shadow-xl"
        />
        <DecorativeCutout
          src={weddingConfig.decor.kalashCoconut}
          alt=""
          flipHorizontal
          className="hidden sm:block absolute bottom-4 right-3 lg:right-10 w-24 lg:w-32 h-auto opacity-95 z-10 drop-shadow-xl"
        />
      </>
    );
  }

  return (
    <>
      <DecorativeCutout
        src={weddingConfig.decor.bougainvilleaBranch}
        alt=""
        className="hidden sm:block absolute top-10 -left-4 w-36 lg:w-48 h-auto opacity-85 z-10"
      />
      <DecorativeCutout
        src={weddingConfig.decor.elephantBanana}
        alt="Decorated royal wedding elephant beside banana tree"
        className="hidden lg:block absolute bottom-3 left-4 w-44 h-auto opacity-90 z-10 drop-shadow-xl"
      />
      <DecorativeCutout
        src={weddingConfig.decor.lotusCluster}
        alt=""
        className="hidden lg:block absolute bottom-3 right-6 w-36 h-auto opacity-90 z-10 drop-shadow-xl"
      />
    </>
  );
}

function EventInvitationRoom({
  event,
  index,
  isOpen,
  onToggleOpen,
  onJumpToRsvp,
}: {
  event: BilingualEventConfig;
  index: number;
  isOpen: boolean;
  onToggleOpen: (id: EventThemeVariant, open: boolean) => void;
  onJumpToRsvp: () => void;
}) {
  const style = ROOM_STYLES[event.id];
  const isMainWedding = event.id === 'wedding';
  const whatsappUrl = getWhatsAppUrl();

  return (
    <section
      id={`event-room-${event.id}`}
      aria-label={`${event.englishName} Royal Palace Chamber`}
      className="relative py-20 sm:py-28 px-4 sm:px-8 overflow-hidden border-t border-[#C49A45]/35"
    >
      {/* Unique Royal Palace Architectural Room Backdrop (Lazy-loaded, Zero Blur) */}
      <img
        src={event.roomBackdropSrc}
        alt={event.roomBackdropAlt}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none"
      />

      {/* Contrast Scrim for Crisp Readability */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: style.roomOverlayGradient }}
      />

      {/* Top Draped Garland Toran & Gently Swinging Real Lotus Garlands */}
      <HangingFloralToran
        tone={style.toranTone}
        className="block absolute top-0 left-1/2 -translate-x-1/2 w-[310px] sm:w-full sm:max-w-2xl opacity-90 z-10"
      />
      <SwingingLotusGarland
        timing={style.swingTimingLeft}
        className="block absolute top-0 left-1 sm:left-5 lg:left-12 w-9 sm:w-13 lg:w-16 h-28 sm:h-40 lg:h-48 opacity-95 z-10"
      />
      <SwingingLotusGarland
        timing={style.swingTimingRight}
        flipHorizontal
        className="block absolute top-0 right-1 sm:right-5 lg:right-12 w-9 sm:w-13 lg:w-16 h-28 sm:h-40 lg:h-48 opacity-95 z-10"
      />
      <FloralJhoomar
        variant={style.jhoomarVariant}
        className="hidden md:block absolute top-0 left-24 lg:left-36 w-14 h-36 opacity-90 z-10"
      />
      <FloralJhoomar
        variant={style.jhoomarVariant}
        className="hidden md:block absolute top-0 right-24 lg:right-36 w-14 h-36 opacity-90 z-10"
      />

      {/* Distinct Botanical & Traditional Cutout Props per Ceremony */}
      <EventChamberBotanicalBorder id={event.id} />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Room Chamber Heading */}
        <div className="text-center mb-8 sm:mb-10 pt-4 sm:pt-0">
          <p className={`text-xs sm:text-sm tracking-[0.28em] uppercase font-semibold ${style.roomKickerClass}`}>
            {event.roomTitle} · {event.date}
          </p>
          <h3 className={`font-calligraphy text-4xl sm:text-5xl mt-1.5 drop-shadow ${style.roomHeadingClass}`}>
            {event.englishName}
          </h3>
        </div>

        {/* Interactive Click-to-Open Invitation Book Stage */}
        <div className="relative perspective-card-stage">
          {/* Static Royal Peacock Perched Naturally on the Wedding Ceremony Card Frame (Visible on Mobile & Desktop) */}
          {isMainWedding && (
            <StaticPeacockOrnament className="absolute -top-9 right-0 sm:-top-12 sm:-right-8 w-18 sm:w-28 h-auto z-40 drop-shadow-xl" />
          )}

          {/* Sacred Kalash Sitting Beside Ganesh & Grah Shanti Card Corners on Mobile Too */}
          {(event.id === 'ganesh' || event.id === 'grahshanti') && (
            <DecorativeCutout
              src={weddingConfig.decor.kalashCoconut}
              alt=""
              className="sm:hidden absolute -bottom-5 -right-2 w-16 h-auto z-40 drop-shadow-lg"
            />
          )}

          <div className="relative preserve-3d min-h-[430px] sm:min-h-[460px]">
            {/* Interior Invitation Page (Revealed ONLY on Click/Tap) */}
            <article
              aria-hidden={!isOpen}
              className={`book-interior-content ${
                isOpen ? 'is-visible' : 'is-hidden'
              } relative rounded-3xl border-2 ${style.interiorClass} ${
                style.interiorBorderClass
              } shadow-[0_28px_72px_rgba(12,4,6,0.45)] overflow-hidden`}
            >
              <FloralCornerCluster
                variant={style.cornerVariant}
                position="top-left"
                className="absolute top-0 left-0 w-18 h-18 sm:w-28 sm:h-28 opacity-90 z-10"
              />
              <FloralCornerCluster
                variant={style.cornerVariant}
                position="top-right"
                className="absolute top-0 right-0 w-18 h-18 sm:w-28 sm:h-28 opacity-90 z-10"
              />
              <DecorativeCutout
                src={weddingConfig.decor.lotusCluster}
                alt=""
                className="hidden sm:block absolute -bottom-3 -left-3 w-24 h-auto opacity-85 z-10"
              />
              <DecorativeCutout
                src={weddingConfig.decor.lotusCluster}
                alt=""
                flipHorizontal
                className="hidden sm:block absolute -bottom-3 -right-3 w-24 h-auto opacity-85 z-10"
              />

              <div className="relative z-20 p-5 sm:p-9 lg:p-11">
                {/* Top Row: Toran + Close Control */}
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div className="flex-1 min-w-0">
                    <HangingFloralToran
                      tone={style.toranTone}
                      className="-mt-3 max-w-xs sm:max-w-md opacity-90"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => onToggleOpen(event.id, false)}
                    aria-label={`Close ${event.englishName} invitation`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] ${style.closeBtnClass}`}
                  >
                    <X className="w-3.5 h-3.5" />
                    <span>Close</span>
                  </button>
                </div>

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center ${
                    index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  {/* Event Miniature / Cutout Plate */}
                  <div className="lg:col-span-5 flex flex-col items-center">
                    <div
                      className={`relative w-full max-w-[270px] sm:max-w-[310px] rounded-2xl overflow-hidden border-2 ${
                        isMainWedding ? 'border-[#DFBA66]' : 'border-[#C49A45]/75'
                      } shadow-xl bg-[#FAF5EB]`}
                    >
                      {event.id === 'grahshanti' ? (
                        <div className="relative p-4 flex flex-col items-center justify-center bg-gradient-to-b from-[#FBF6EA] to-[#EFE2C8]">
                          <SacredKalashMandala className="w-full max-h-[260px] h-auto mx-auto opacity-30 absolute inset-0" />
                          <DecorativeCutout
                            src={weddingConfig.decor.kalashCoconut}
                            alt="Traditional Mangal Kalash with coconut and mango leaves for Grah Shanti Puja"
                            className="relative z-10 w-44 sm:w-52 h-auto py-3 drop-shadow-md"
                          />
                        </div>
                      ) : event.artworkSrc ? (
                        <img
                          src={event.artworkSrc}
                          alt={event.artworkAlt}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-full h-[220px] sm:h-[310px] lg:h-[340px] object-cover block"
                        />
                      ) : (
                        <SacredKalashMandala className="w-full max-h-[300px] lg:max-h-[340px] h-auto mx-auto" />
                      )}
                    </div>
                  </div>

                  {/* Full Bilingual Event Details */}
                  <div className="lg:col-span-7 text-center lg:text-left">
                    <div className="flex items-center justify-center lg:justify-start gap-2.5">
                      <StaticPeacockCrest
                        tone={isMainWedding ? 'ivory' : 'gold'}
                        className="w-10 h-6 hidden sm:block shrink-0"
                      />
                      <p
                        className={`text-xs tracking-[0.24em] uppercase font-semibold ${style.kickerClass}`}
                      >
                        {event.subtitle}
                      </p>
                    </div>

                    <h4
                      className={`text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-[0.05em] uppercase mt-1.5 leading-tight ${style.titleClass}`}
                    >
                      {event.englishName}
                    </h4>
                    <p
                      lang="gu"
                      className={`font-gujarati text-2xl sm:text-3xl font-semibold mt-1 ${style.gujaratiClass}`}
                    >
                      {event.gujaratiName}
                    </p>

                    <LotusDivider tone={style.dividerTone} className="my-4 lg:justify-start" />

                    <div
                      className={`rounded-2xl border px-4 py-3 sm:px-5 sm:py-3.5 inline-flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 ${style.metaBoxClass}`}
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
                      className={`mt-4 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${style.bodyClass}`}
                    >
                      {event.description}
                    </p>

                    <div className="mt-5 pt-4 border-t border-current/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-start justify-center lg:justify-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-[#C49A45]" />
                        <span
                          className={
                            isMainWedding ? 'font-semibold text-[#DFBA66]' : 'italic opacity-85'
                          }
                        >
                          {event.venueLabel}
                        </span>
                      </div>

                      {!event.isVenueConfirmed &&
                        (whatsappUrl ? (
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
                        ))}
                    </div>

                    <div className="mt-5 flex justify-center lg:justify-start">
                      <button
                        type="button"
                        onClick={() => onToggleOpen(event.id, false)}
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[44px] ${style.closeBtnClass}`}
                      >
                        <ChevronUp className="w-4 h-4" />
                        <span>Fold Invitation Cover</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </article>

            {/* Vertically Top-Hinged Closed Front Cover (Strictly Upward & Forward rotateX, Zero Auto-Open) */}
            <div
              className={`book-cover-flap preserve-3d absolute inset-0 z-30 ${
                isOpen ? 'is-open' : 'is-closed'
              }`}
            >
              <button
                type="button"
                onClick={() => onToggleOpen(event.id, true)}
                aria-expanded={isOpen}
                aria-label={`${event.englishName} invitation — ${event.coverPrompt}`}
                style={{ background: style.coverGradient }}
                className={`backface-hidden absolute inset-0 w-full h-full rounded-3xl border-2 ${style.coverBorderClass} shadow-[0_28px_72px_rgba(10,3,5,0.5)] hover:brightness-[1.03] active:scale-[0.995] transition-all flex flex-col items-center justify-center p-6 sm:p-10 text-center cursor-pointer overflow-hidden`}
              >
                <div
                  className={`absolute inset-3 sm:inset-4 rounded-2xl border ${style.coverBorderClass} opacity-65 pointer-events-none`}
                />

                {isMainWedding && (
                  <div
                    aria-hidden="true"
                    className="absolute inset-6 sm:inset-8 rounded-t-[180px] rounded-b-xl border border-[#DFBA66]/55 pointer-events-none"
                  />
                )}

                <FloralCornerCluster
                  variant={style.cornerVariant}
                  position="top-left"
                  className="absolute top-1.5 left-1.5 w-20 h-20 sm:w-28 sm:h-28 opacity-95"
                />
                <FloralCornerCluster
                  variant={style.cornerVariant}
                  position="top-right"
                  className="absolute top-1.5 right-1.5 w-20 h-20 sm:w-28 sm:h-28 opacity-95"
                />
                <FloralCornerCluster
                  variant={style.cornerVariant}
                  position="bottom-left"
                  className="absolute bottom-1.5 left-1.5 w-20 h-20 sm:w-28 sm:h-28 opacity-90"
                />
                <FloralCornerCluster
                  variant={style.cornerVariant}
                  position="bottom-right"
                  className="absolute bottom-1.5 right-1.5 w-20 h-20 sm:w-28 sm:h-28 opacity-90"
                />

                <div className="relative z-10 max-w-md flex flex-col items-center">
                  <CoverOrnamentCenterpiece event={event} />

                  <p
                    lang="gu"
                    className={`font-gujarati text-lg sm:text-xl font-semibold mt-2 ${style.coverSubClass}`}
                  >
                    {event.coverSealText}
                  </p>

                  <LotusDivider tone={style.dividerTone} className="my-3 sm:my-4" />

                  <p
                    className={`text-xs sm:text-sm tracking-[0.24em] uppercase font-semibold tabular-nums ${style.coverSubClass}`}
                  >
                    {event.date} · {event.time}
                  </p>

                  <h4
                    className={`text-3xl sm:text-5xl font-semibold tracking-[0.06em] uppercase mt-2 ${style.coverTextClass}`}
                  >
                    {event.englishName}
                  </h4>
                  <p
                    lang="gu"
                    className={`font-gujarati text-xl sm:text-2xl font-semibold mt-1 ${style.coverSubClass}`}
                  >
                    {event.gujaratiName}
                  </p>

                  <span
                    className={`mt-6 inline-flex items-center gap-2.5 px-6 py-3 rounded-full border text-xs sm:text-sm font-semibold tracking-[0.22em] uppercase shadow-lg min-h-[44px] ${style.coverCtaClass}`}
                  >
                    <BookOpen className="w-4 h-4 shrink-0" />
                    <span>{event.coverPrompt}</span>
                  </span>
                </div>
              </button>

              <div
                aria-hidden="true"
                className={`backface-hidden absolute inset-0 rounded-3xl border-2 ${style.coverBorderClass} shadow-inner`}
                style={{
                  background: style.coverUndersideGradient,
                  transform: 'rotateX(180deg)',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ClickEventCards({
  events,
  onJumpToRsvp,
}: {
  events: readonly BilingualEventConfig[];
  onJumpToRsvp: () => void;
}) {
  const [openMap, setOpenMap] = useState<Record<EventThemeVariant, boolean>>({
    ganesh: false,
    haldi: false,
    grahshanti: false,
    wedding: false,
  });

  const handleToggleOpen = (id: EventThemeVariant, open: boolean) => {
    setOpenMap((prev) => ({ ...prev, [id]: open }));
  };

  return (
    <div>
      {events.map((event, index) => (
        <EventInvitationRoom
          key={event.id}
          event={event}
          index={index}
          isOpen={openMap[event.id]}
          onToggleOpen={handleToggleOpen}
          onJumpToRsvp={onJumpToRsvp}
        />
      ))}
    </div>
  );
}
