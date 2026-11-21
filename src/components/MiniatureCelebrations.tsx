import { Calendar, Clock, MapPin, MessageCircle, Utensils } from 'lucide-react';
import { motion } from 'motion/react';
import {
  getWhatsAppUrl,
  weddingConfig,
  type BilingualEventConfig,
  type EventThemeVariant,
} from '../config/weddingConfig';
import {
  FloralCornerCluster,
  HangingFloralToran,
  LotusDivider,
  MiniatureMusiciansIllustration,
  RoyalElephantIllustration,
  SacredKalashMandala,
} from './OrnamentalMotifs';

const THEME_STYLES: Record<
  EventThemeVariant,
  {
    wrapper: string;
    border: string;
    kicker: string;
    title: string;
    gujarati: string;
    body: string;
    metaBox: string;
    dividerTone: 'gold' | 'saffron' | 'ivory' | 'burgundy';
    cornerVariant: 'lotus-rose' | 'marigold-leaf' | 'jasmine-saffron';
    toranTone: 'lotus' | 'marigold';
  }
> = {
  ganesh: {
    wrapper: 'theme-ganesh text-[#3B1E08]',
    border: 'border-[#D97706]/55',
    kicker: 'text-[#B45309]',
    title: 'text-[#7C2D12]',
    gujarati: 'text-[#9A3412]',
    body: 'text-[#451A03]/85',
    metaBox: 'bg-[#FFFDF7]/85 border-[#D97706]/40 text-[#451A03]',
    dividerTone: 'saffron',
    cornerVariant: 'jasmine-saffron',
    toranTone: 'marigold',
  },
  haldi: {
    wrapper: 'theme-haldi text-[#312E07]',
    border: 'border-[#CA8A04]/60',
    kicker: 'text-[#3F6212]',
    title: 'text-[#854D0E]',
    gujarati: 'text-[#3F6212]',
    body: 'text-[#3F2E05]/90',
    metaBox: 'bg-[#FEFDF2]/85 border-[#CA8A04]/45 text-[#422006]',
    dividerTone: 'saffron',
    cornerVariant: 'marigold-leaf',
    toranTone: 'marigold',
  },
  grahshanti: {
    wrapper: 'theme-grahshanti text-[#2E1E0F]',
    border: 'border-[#C49A45]/65',
    kicker: 'text-[#9F7624]',
    title: 'text-[#5C1222]',
    gujarati: 'text-[#92400E]',
    body: 'text-[#2B1418]/85',
    metaBox: 'bg-[#FAF5EB]/90 border-[#C49A45]/45 text-[#2B1418]',
    dividerTone: 'gold',
    cornerVariant: 'jasmine-saffron',
    toranTone: 'lotus',
  },
  wedding: {
    wrapper: 'theme-wedding-maroon text-[#FAF5EB]',
    border: 'border-[#C49A45]/75',
    kicker: 'text-[#DFBA66]',
    title: 'text-[#FAF5EB]',
    gujarati: 'text-[#F7D0D8]',
    body: 'text-[#F3E9D4]/90',
    metaBox: 'bg-[#2C0710]/85 border-[#C49A45]/55 text-[#FAF5EB]',
    dividerTone: 'ivory',
    cornerVariant: 'lotus-rose',
    toranTone: 'lotus',
  },
};

function BilingualEventCard({
  event,
  index,
  onJumpToRsvp,
}: {
  event: BilingualEventConfig;
  index: number;
  onJumpToRsvp: () => void;
}) {
  const theme = THEME_STYLES[event.id];
  const isMainWedding = event.id === 'wedding';
  const whatsappUrl = getWhatsAppUrl();

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl border-2 ${theme.wrapper} ${theme.border} shadow-[0_22px_60px_rgba(24,8,12,0.14)] overflow-hidden`}
    >
      {/* Distinct Floral Corner Decorations */}
      <FloralCornerCluster
        variant={theme.cornerVariant}
        position="top-left"
        className="absolute top-0 left-0 w-20 h-20 sm:w-28 sm:h-28 opacity-90 z-10"
      />
      <FloralCornerCluster
        variant={theme.cornerVariant}
        position="top-right"
        className="absolute top-0 right-0 w-20 h-20 sm:w-28 sm:h-28 opacity-90 z-10"
      />
      <FloralCornerCluster
        variant={theme.cornerVariant}
        position="bottom-left"
        className="hidden sm:block absolute bottom-0 left-0 w-20 h-20 opacity-75 z-10"
      />
      <FloralCornerCluster
        variant={theme.cornerVariant}
        position="bottom-right"
        className="hidden sm:block absolute bottom-0 right-0 w-20 h-20 opacity-75 z-10"
      />

      <div className="relative z-10 p-6 sm:p-10 lg:p-12">
        <HangingFloralToran tone={theme.toranTone} className="mb-4 -mt-3 max-w-md opacity-90" />

        <div
          className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
            index % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          {/* Visual Artwork Plate */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              className={`relative w-full max-w-[330px] rounded-2xl overflow-hidden border-2 ${
                isMainWedding ? 'border-[#DFBA66]' : 'border-[#C49A45]/70'
              } shadow-xl bg-[#FAF5EB]`}
            >
              {event.artworkSrc ? (
                <img
                  src={event.artworkSrc}
                  alt={event.artworkAlt}
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[410px] object-cover"
                  loading="lazy"
                />
              ) : (
                <SacredKalashMandala className="w-full h-auto" />
              )}
            </div>
          </div>

          {/* Bilingual Ceremony Information */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <p className={`text-xs sm:text-sm tracking-[0.26em] uppercase font-semibold ${theme.kicker}`}>
              {event.subtitle}
            </p>

            <h3
              className={`text-3xl sm:text-5xl font-semibold tracking-[0.06em] uppercase mt-2 ${theme.title}`}
            >
              {event.englishName}
            </h3>
            <p
              lang="gu"
              className={`font-gujarati text-2xl sm:text-3xl font-semibold mt-1.5 ${theme.gujarati}`}
            >
              {event.gujaratiName}
            </p>

            <LotusDivider
              tone={theme.dividerTone}
              className="my-5 lg:justify-start"
            />

            {/* Date & Time Block */}
            <div
              className={`rounded-2xl border px-5 py-4 inline-flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 ${theme.metaBox}`}
            >
              <div className="flex items-center justify-center sm:justify-start gap-2 text-base sm:text-lg font-semibold tabular-nums">
                <Calendar className="w-4 h-4 shrink-0 text-[#C49A45]" />
                <span>{event.date}</span>
              </div>
              <span className="hidden sm:inline opacity-40" aria-hidden="true">
                ·
              </span>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-base sm:text-lg font-semibold tabular-nums">
                <Clock className="w-4 h-4 shrink-0 text-[#C49A45]" />
                <span>{event.time}</span>
              </div>
            </div>

            <p className={`mt-5 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 ${theme.body}`}>
              {event.description}
            </p>

            {/* Venue Status (Verified only for Main Wedding; Configurable for Pre-Wedding) */}
            <div className="mt-6 pt-5 border-t border-current/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start justify-center lg:justify-start gap-2.5 text-sm sm:text-base">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-[#C49A45]" />
                <span className={isMainWedding ? 'font-semibold text-[#DFBA66]' : 'italic opacity-85'}>
                  {event.venueLabel}
                </span>
              </div>

              {!event.isVenueConfirmed && (
                whatsappUrl ? (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-current/30 text-xs font-semibold tracking-wider uppercase hover:bg-black/5 transition-colors whitespace-nowrap shrink-0 min-h-[40px]"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>WhatsApp Updates</span>
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={onJumpToRsvp}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full border border-current/30 text-xs font-semibold tracking-wider uppercase hover:bg-black/5 transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px]"
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
    </motion.article>
  );
}

export function MiniatureCelebrations({
  onJumpToRsvp,
}: {
  onJumpToRsvp: () => void;
}) {
  return (
    <section
      id="celebrations"
      aria-label="Wedding Celebrations Schedule"
      className="relative py-20 sm:py-28 px-4 sm:px-8 emerald-courtyard text-[#FAF5EB] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#5C1222] via-[#C49A45] to-[#5C1222] opacity-90"
      />

      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#DFBA66] font-semibold">
            15 – 17 February 2027 · Shubh Vivah Chronicles
          </p>
          <h2 className="font-calligraphy text-5xl sm:text-6xl text-[#FAF5EB] mt-2">
            Wedding Celebrations
          </h2>
          <p lang="gu" className="font-gujarati text-xl text-[#F7D0D8] mt-1">
            શુભ પ્રસંગોની પત્રિકા
          </p>
          <LotusDivider tone="ivory" className="my-5" />
          <p className="text-base sm:text-lg text-[#F3E9D4]/85 leading-relaxed">
            Four sacred rituals bathed in saffron, haldi marigold, lotus cream, and royal maroon —
            uniting two families in joy and tradition.
          </p>
        </div>

        {/* All Four Bilingual Event Cards with Distinct Visual Themes */}
        <div className="mt-12 space-y-10 sm:space-y-12">
          {weddingConfig.events.map((event, index) => (
            <BilingualEventCard
              key={event.id}
              event={event}
              index={index}
              onJumpToRsvp={onJumpToRsvp}
            />
          ))}
        </div>

        {/* Dedicated Wedding Day Lunch Card (17 February 2027, Timing Configurable) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mt-10 relative rounded-3xl border-2 border-[#C49A45]/75 paper-texture text-[#2B1418] p-6 sm:p-9 shadow-xl overflow-hidden"
        >
          <FloralCornerCluster
            variant="marigold-leaf"
            position="top-left"
            className="absolute top-0 left-0 w-20 h-20 opacity-85"
          />
          <FloralCornerCluster
            variant="lotus-rose"
            position="top-right"
            className="absolute top-0 right-0 w-20 h-20 opacity-85"
          />

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#7A1B2E]/10 border border-[#C49A45]/60 text-[#7A1B2E] mb-3">
              <Utensils className="w-5 h-5" />
            </div>

            <p className="text-xs tracking-[0.28em] uppercase text-[#9F7624] font-semibold">
              {weddingConfig.lunch.date} · Royal Feast
            </p>
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-[0.08em] uppercase text-[#5C1222] mt-1">
              {weddingConfig.lunch.englishName}
            </h3>
            <p lang="gu" className="font-gujarati text-xl sm:text-2xl font-semibold text-[#7A1B2E] mt-1">
              {weddingConfig.lunch.gujaratiName}
            </p>

            <LotusDivider tone="gold" className="my-4" />

            <p className="text-base sm:text-lg font-semibold text-[#133D38]">
              {weddingConfig.lunch.confirmedTime || weddingConfig.lunch.unconfirmedTimeNotice}
            </p>
            <p className="text-sm sm:text-base italic text-[#2B1418]/80 mt-1.5">
              {weddingConfig.lunch.venueNote}
            </p>
          </div>
        </motion.div>

        {/* Animated Royal Elephants & Miniature Wedding Procession Panorama */}
        <div className="mt-14 rounded-2xl border border-[#C49A45]/55 bg-[#0A221E] overflow-hidden shadow-2xl">
          <div className="px-6 pt-8 pb-4 text-center">
            <p className="text-xs tracking-[0.28em] uppercase text-[#DFBA66] font-semibold">
              Royal Baraat &amp; Courtyard Musicians
            </p>
            <h3 className="font-calligraphy text-4xl sm:text-5xl text-[#FAF5EB] mt-1">
              The Royal Procession
            </h3>
          </div>

          <div className="relative px-4 sm:px-8 pb-6 pt-2 overflow-hidden">
            <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 animate-procession-march">
              <div className="w-44 sm:w-52 shrink-0">
                <RoyalElephantIllustration facing="right" withHowdah={false} className="w-full h-auto" />
              </div>

              <div className="w-52 sm:w-60 shrink-0">
                <MiniatureMusiciansIllustration className="w-full h-auto" />
              </div>

              <div className="w-48 sm:w-56 shrink-0">
                <RoyalElephantIllustration facing="right" withHowdah={true} className="w-full h-auto" />
              </div>
            </div>

            <div
              aria-hidden="true"
              className="mt-2 h-4 w-full rounded-full bg-gradient-to-r from-[#5C1222] via-[#C49A45] to-[#5C1222] border-y border-[#DFBA66]/60"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
