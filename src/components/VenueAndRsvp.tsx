import { Check, Copy, ExternalLink, MapPin, MessageCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { getGoogleMapsUrl, getWhatsAppUrl, weddingConfig } from '../config/weddingConfig';
import { FloralCornerCluster, LotusDivider } from './OrnamentalMotifs';
import { PalaceArchitectureBg } from './PalaceArchitectureBg';
import {
  DecorativeCutout,
  StaticPeacockOrnament,
  SwingingLotusGarland,
} from './RoyalBotanicalDecor';

export function VenueAndRsvp() {
  const [copied, setCopied] = useState(false);
  const mapsUrl = getGoogleMapsUrl();
  const whatsappUrl = getWhatsAppUrl();

  const handleCopyInvite = async () => {
    const summary = `${weddingConfig.couple.displayUpper}\n${weddingConfig.invitation.message}\n${weddingConfig.invitation.date} (${weddingConfig.invitation.time})\n${weddingConfig.invitation.venueFull}\n${weddingConfig.invitation.receptionNote}`;
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      // Ignore clipboard rejection
    }
  };

  return (
    <>
      {/* WEDDING VENUE PRESENTATION WITH GARDEN TERRACE & PALACE ARCH */}
      <section
        id="wedding-venue"
        aria-label="Wedding Venue in Udaipur"
        className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF5EB] text-[#2B1418] overflow-hidden"
      >
        <PalaceArchitectureBg variant="haveli-arches" tone="ivory" />
        <DecorativeCutout
          src={weddingConfig.decor.bougainvilleaBranch}
          alt=""
          className="absolute -top-3 -left-4 w-28 sm:w-44 h-auto opacity-85 z-10"
        />
        <DecorativeCutout
          src={weddingConfig.decor.coconutPalm}
          alt=""
          flipHorizontal
          className="hidden lg:block absolute bottom-2 right-2 w-40 h-auto opacity-75 z-10"
        />

        <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex justify-center relative"
          >
            <div className="relative w-full max-w-[440px]">
              {/* Static Royal Peacock Sitting on the Upper Arch Balcony Edge */}
              <StaticPeacockOrnament className="absolute -top-10 -right-2 sm:-top-12 sm:-right-7 w-20 sm:w-28 h-auto z-30 drop-shadow-xl" />

              <div className="relative rounded-t-[220px] rounded-b-2xl overflow-hidden border-2 border-[#C49A45]/80 shadow-[0_25px_70px_rgba(92,18,34,0.16)] bg-[#F3E9D4]">
                <img
                  src={weddingConfig.assets.udaipurPalaceArchImage}
                  alt="Golden carved Rajasthani palace garden terrace arch overlooking hillside palace domes and flowering courtyard"
                  referrerPolicy="no-referrer"
                  className="w-full h-[440px] sm:h-[520px] object-cover block"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              <DecorativeCutout
                src={weddingConfig.decor.lotusCluster}
                alt=""
                className="absolute -bottom-5 -left-4 w-28 sm:w-36 h-auto z-20 drop-shadow-md"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 text-center lg:text-left"
          >
            <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#9F7624] font-semibold">
              THE WEDDING CELEBRATION VENUE
            </p>
            <h2 className="font-calligraphy text-5xl sm:text-6xl text-[#7A1B2E] mt-2">
              {weddingConfig.invitation.venueName}
            </h2>
            <p className="text-xl sm:text-2xl font-medium text-[#133D38] mt-1">
              {weddingConfig.invitation.venueLocation}
            </p>

            <LotusDivider tone="gold" className="my-7 lg:justify-start" />

            <div className="space-y-2 text-lg sm:text-xl text-[#2B1418]">
              <p className="font-semibold tracking-wide text-[#5C1222]">
                {weddingConfig.invitation.date}
              </p>
              <p className="text-[#9F7624] font-semibold tracking-wider tabular-nums">
                {weddingConfig.invitation.time}
              </p>
              <p className="italic text-[#2B1418]/80 pt-1">
                {weddingConfig.invitation.receptionNote}
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#7A1B2E] text-[#FAF5EB] text-sm font-semibold tracking-wider uppercase hover:bg-[#5C1222] transition-colors shadow-md min-h-[44px]"
              >
                <MapPin className="w-4 h-4 text-[#DFBA66]" />
                <span>Directions on Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>

              <button
                type="button"
                onClick={handleCopyInvite}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-[#C49A45]/70 text-[#5C1222] text-sm font-semibold tracking-wide hover:bg-[#F3E9D4] transition-colors cursor-pointer min-h-[44px]"
              >
                {copied ? <Check className="w-4 h-4 text-[#1E4D3B]" /> : <Copy className="w-4 h-4 text-[#9F7624]" />}
                <span>{copied ? 'Details Copied' : 'Copy Invitation Details'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHATSAPP RSVP & EVENT UPDATES */}
      <section
        id="rsvp"
        aria-label="RSVP and WhatsApp Wedding Updates"
        className="relative py-20 sm:py-24 px-4 sm:px-8 velvet-burgundy text-[#FAF5EB] overflow-hidden"
      >
        <PalaceArchitectureBg variant="palace-colonnade" tone="dark" />
        <FloralCornerCluster
          variant="lotus-rose"
          position="top-left"
          className="absolute top-2 left-2 w-24 h-24 sm:w-28 sm:h-28 opacity-70"
        />
        <FloralCornerCluster
          variant="lotus-rose"
          position="bottom-right"
          className="absolute bottom-2 right-2 w-24 h-24 sm:w-28 sm:h-28 opacity-70"
        />

        <SwingingLotusGarland
          timing="c"
          className="hidden sm:block absolute top-0 left-8 lg:left-16 w-12 h-36 opacity-85 z-10"
        />
        <SwingingLotusGarland
          timing="a"
          flipHorizontal
          className="hidden sm:block absolute top-0 right-8 lg:right-16 w-12 h-36 opacity-85 z-10"
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#DFBA66] font-semibold">
            RSVP &amp; Family Updates
          </p>
          <h2 className="font-calligraphy text-4xl sm:text-6xl text-[#FAF5EB] mt-3 leading-tight">
            {weddingConfig.rsvp.headline}
          </h2>

          <LotusDivider tone="ivory" className="my-6" />

          <p className="text-lg sm:text-xl text-[#F3E9D4]/90 max-w-xl mx-auto leading-relaxed">
            {weddingConfig.rsvp.subtext}
          </p>

          <div className="mt-9 flex flex-col items-center gap-3">
            {whatsappUrl ? (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#C49A45] text-[#230910] text-sm sm:text-base font-semibold tracking-wider uppercase hover:bg-[#DFBA66] transition-colors shadow-xl min-h-[48px]"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Connect on WhatsApp</span>
              </a>
            ) : (
              <div className="inline-flex flex-col items-center gap-2">
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#FAF5EB]/10 text-[#FAF5EB]/65 border border-[#C49A45]/35 text-sm sm:text-base font-medium tracking-wide cursor-not-allowed min-h-[48px]"
                >
                  <MessageCircle className="w-5 h-5 text-[#DFBA66]/70" />
                  <span>WhatsApp Concierge Coming Soon</span>
                </button>
                <p className="text-xs sm:text-sm text-[#F3E9D4]/75">
                  The family WhatsApp contact number will be activated once finalized in configuration.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
