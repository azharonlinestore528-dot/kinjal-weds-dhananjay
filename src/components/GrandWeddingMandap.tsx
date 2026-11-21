import { motion } from 'motion/react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralJhoomar, LotusDivider } from './OrnamentalMotifs';
import {
  DecorativeCutout,
  StaticPeacockOrnament,
  SwingingLotusGarland,
} from './RoyalBotanicalDecor';

export function GrandWeddingMandap() {
  return (
    <section
      id="grand-mandap"
      aria-label="Grand Final Wedding Mandap Celebration"
      className="relative py-20 sm:py-28 px-4 sm:px-8 theme-wedding-maroon text-[#FAF5EB] overflow-hidden border-t-2 border-[#C49A45]/60"
    >
      {/* Emerald Garden Horizon Glow at Bottom */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-56 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(19, 61, 56, 0.72) 0%, rgba(19, 61, 56, 0.25) 55%, transparent 100%)',
        }}
      />

      {/* Lush Outer Bougainvillea Branches Draping from Top Corners */}
      <DecorativeCutout
        src={weddingConfig.decor.bougainvilleaBranch}
        alt=""
        className="absolute -top-2 -left-4 w-32 sm:w-52 lg:w-64 h-auto opacity-85 z-10"
      />
      <DecorativeCutout
        src={weddingConfig.decor.bougainvilleaBranch}
        alt=""
        flipHorizontal
        className="absolute -top-2 -right-4 w-32 sm:w-52 lg:w-64 h-auto opacity-85 z-10"
      />

      {/* Tall Coconut Palm Garden Silhouettes on Left & Right Outer Borders */}
      <DecorativeCutout
        src={weddingConfig.decor.coconutPalm}
        alt=""
        className="hidden md:block absolute bottom-8 -left-6 lg:left-2 w-44 lg:w-60 h-auto opacity-80 z-10"
      />
      <DecorativeCutout
        src={weddingConfig.decor.coconutPalm}
        alt=""
        flipHorizontal
        className="hidden md:block absolute bottom-8 -right-6 lg:right-2 w-44 lg:w-60 h-auto opacity-80 z-10"
      />

      {/* Swinging Hanging Lotus Flower Garlands Across Top Eaves */}
      <SwingingLotusGarland
        timing="a"
        className="absolute top-0 left-3 sm:left-14 lg:left-24 w-10 sm:w-14 lg:w-16 h-32 sm:h-48 lg:h-56 z-10 opacity-95"
      />
      <SwingingLotusGarland
        timing="b"
        flipHorizontal
        className="absolute top-0 right-3 sm:right-14 lg:right-24 w-10 sm:w-14 lg:w-16 h-32 sm:h-48 lg:h-56 z-10 opacity-95"
      />
      <FloralJhoomar
        variant="royal-maroon"
        className="hidden sm:block absolute top-0 left-1/4 w-14 h-36 opacity-90 z-10"
      />
      <FloralJhoomar
        variant="marigold"
        className="hidden sm:block absolute top-0 right-1/4 w-14 h-36 opacity-90 z-10"
      />

      <div className="relative z-20 max-w-6xl mx-auto">
        {/* Section Title Banner (Clear of Hanging Garlands) */}
        <div className="text-center max-w-3xl mx-auto pt-8 sm:pt-4 mb-10 sm:mb-14">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#DFBA66] font-semibold">
            Grand Final Celebration · Shubh Vivah Mandap
          </p>
          <h2 className="font-calligraphy text-5xl sm:text-6xl lg:text-7xl text-[#FAF5EB] mt-2 drop-shadow">
            The Royal Wedding Mandap
          </h2>
          <p lang="gu" className="font-gujarati text-2xl sm:text-3xl text-[#F7D0D8] mt-1 font-semibold">
            શુભ લગ્ન મંડપ સમારોહ
          </p>
          <LotusDivider tone="ivory" className="my-5" />
          <p className="text-base sm:text-xl italic text-[#F3E9D4]/90 leading-relaxed">
            Beneath cascading marigolds, blooming pink lotuses, and sacred palace arches, Kinjal
            &amp; Dhananjay unite in seven eternal vows.
          </p>
        </div>

        {/* Central Mandap Stage with Unobstructed Bride & Groom Focal Painting + Border Framing */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Static Royal Peacock Perched Naturally on the Upper Right Arch Frame Border */}
          <StaticPeacockOrnament className="absolute -top-10 -right-2 sm:-top-14 sm:-right-8 w-20 sm:w-32 lg:w-36 h-auto z-30 drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]" />

          {/* Mirrored Static Peacock Accent on Upper Left Border (Desktop) */}
          <StaticPeacockOrnament
            flipHorizontal
            className="hidden sm:block absolute -top-12 -left-8 w-28 lg:w-32 h-auto z-30 drop-shadow-[0_12px_18px_rgba(0,0,0,0.45)]"
          />

          {/* Main Unobstructed Mandap Frame */}
          <div className="relative rounded-t-[180px] sm:rounded-t-[260px] rounded-b-3xl border-[3px] border-[#DFBA66]/85 bg-gradient-to-b from-[#3A0915] via-[#26050D] to-[#133D38] p-3 sm:p-6 shadow-[0_32px_90px_rgba(0,0,0,0.6)]">
            <div className="relative rounded-t-[168px] sm:rounded-t-[246px] rounded-b-2xl border border-[#C49A45]/60 overflow-hidden bg-[#29060F] px-2 pt-3 pb-2 sm:px-5 sm:pt-5 sm:pb-4">
              {/* Swinging Mini Lotus Garlands Only at Far Arch Top Corners (Never Over Couple) */}
              <SwingingLotusGarland
                timing="c"
                className="hidden sm:block absolute top-0 left-3 w-10 lg:w-12 h-28 lg:h-36 z-20 opacity-90"
              />
              <SwingingLotusGarland
                timing="a"
                flipHorizontal
                className="hidden sm:block absolute top-0 right-3 w-10 lg:w-12 h-28 lg:h-36 z-20 opacity-90"
              />

              {/* Central Wedding Mandap Artwork (Bride & Groom Seated Together — Clean, Uncovered) */}
              <div className="relative z-10 mx-auto max-w-2xl">
                <img
                  src={weddingConfig.assets.maroonLotusDiyaImage}
                  alt="Royal Indian wedding mandap decorated with pink lotus flowers, marigold garlands, banana trees, and brass diyas with bride and groom seated together"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[640px] object-contain mx-auto rounded-xl shadow-2xl block"
                />
              </div>

              {/* Event Metadata Strip Directly Below Mandap Centerpiece */}
              <div className="relative z-20 mt-6 mb-2 text-center px-3">
                <p className="font-calligraphy text-3xl sm:text-4xl text-[#DFBA66]">
                  {weddingConfig.couple.displayCalligraphy}
                </p>
                <div className="mt-3 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-2xl border border-[#C49A45]/60 bg-[#1B050A]/85 px-5 py-3 text-xs sm:text-sm tracking-wider uppercase text-[#FAF5EB]">
                  <span className="inline-flex items-center gap-1.5 font-semibold tabular-nums">
                    <Calendar className="w-4 h-4 text-[#DFBA66]" />
                    {weddingConfig.invitation.date}
                  </span>
                  <span aria-hidden="true" className="text-[#DFBA66]/60">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold tabular-nums">
                    <Clock className="w-4 h-4 text-[#DFBA66]" />
                    {weddingConfig.invitation.time}
                  </span>
                  <span aria-hidden="true" className="text-[#DFBA66]/60 hidden sm:inline">
                    ·
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[#F3E9D4]/90">
                    <MapPin className="w-4 h-4 text-[#DFBA66] shrink-0" />
                    {weddingConfig.invitation.venueFull}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Lower Courtyard Royal Elephants, Banana Trees, Kalash & Lotus Beds Flanking Border */}
          <div className="relative z-30 -mt-5 sm:-mt-8 flex items-end justify-between gap-2 px-1 sm:px-6 pointer-events-none">
            <div className="flex items-end gap-1 sm:gap-2">
              <DecorativeCutout
                src={weddingConfig.decor.elephantBanana}
                alt="Traditional decorated royal wedding elephant beside banana tree and lotus flowers"
                className="w-28 sm:w-44 lg:w-52 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]"
              />
              <DecorativeCutout
                src={weddingConfig.decor.kalashCoconut}
                alt="Traditional sacred Kalash with coconut and mango leaves"
                className="hidden sm:block w-16 lg:w-20 h-auto -ml-4 drop-shadow-lg"
              />
            </div>

            <DecorativeCutout
              src={weddingConfig.decor.lotusCluster}
              alt="Blooming pink and white lotus flowers with green lotus leaves"
              className="w-20 sm:w-32 lg:w-40 h-auto -mb-2 drop-shadow-lg"
            />

            <div className="flex items-end gap-1 sm:gap-2">
              <DecorativeCutout
                src={weddingConfig.decor.kalashCoconut}
                alt="Traditional sacred Kalash with coconut and mango leaves"
                className="hidden sm:block w-16 lg:w-20 h-auto -mr-4 drop-shadow-lg"
              />
              <DecorativeCutout
                src={weddingConfig.decor.elephantBanana}
                alt="Traditional decorated royal wedding elephant beside banana tree and lotus flowers"
                flipHorizontal
                className="w-28 sm:w-44 lg:w-52 h-auto drop-shadow-[0_12px_20px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
