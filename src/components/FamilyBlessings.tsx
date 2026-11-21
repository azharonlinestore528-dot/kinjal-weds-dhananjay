import { motion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import { LotusDivider } from './OrnamentalMotifs';
import {
  DecorativeCutout,
  StaticPeacockOrnament,
  SwingingLotusGarland,
} from './RoyalBotanicalDecor';

export function FamilyBlessings() {
  return (
    <section
      id="family-blessings"
      aria-label="Blessings of Our Families"
      className="relative py-20 sm:py-28 px-4 sm:px-8 emerald-courtyard text-[#FAF5EB] overflow-hidden border-t border-[#C49A45]/45"
    >
      {/* Soft Botanical & Gold Radiance */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 35%, rgba(223, 186, 102, 0.16) 0%, transparent 62%)',
        }}
      />

      {/* Swinging Hanging Lotus Garlands on Outer Borders */}
      <SwingingLotusGarland
        timing="b"
        className="absolute top-0 left-2 sm:left-10 lg:left-20 w-10 sm:w-14 h-32 sm:h-48 z-10 opacity-90"
      />
      <SwingingLotusGarland
        timing="a"
        flipHorizontal
        className="absolute top-0 right-2 sm:right-10 lg:right-20 w-10 sm:w-14 h-32 sm:h-48 z-10 opacity-90"
      />

      {/* Outer Bougainvillea Corner Accent */}
      <DecorativeCutout
        src={weddingConfig.decor.bougainvilleaBranch}
        alt=""
        className="hidden md:block absolute -bottom-4 -left-4 w-48 lg:w-56 h-auto opacity-75 rotate-180 z-10"
      />
      <DecorativeCutout
        src={weddingConfig.decor.coconutPalm}
        alt=""
        flipHorizontal
        className="hidden lg:block absolute bottom-0 -right-4 w-44 h-auto opacity-70 z-10"
      />

      <div className="relative z-20 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Static Peacock Resting Naturally on the Upper Right Blessing Frame Border */}
          <StaticPeacockOrnament className="absolute -top-9 right-1 sm:-top-12 sm:-right-6 w-18 sm:w-28 h-auto z-30 drop-shadow-xl" />

          <div className="paper-texture relative rounded-3xl border-2 border-[#C49A45]/80 p-6 sm:p-12 md:p-14 text-[#2B1418] shadow-[0_28px_80px_rgba(6,22,19,0.55)] overflow-hidden">
            {/* Inner Double Gilt Border */}
            <div
              aria-hidden="true"
              className="absolute inset-3 sm:inset-4 rounded-2xl border border-[#C49A45]/55 pointer-events-none"
            />

            {/* Corner Pink Lotus & Green Leaves Clusters */}
            <DecorativeCutout
              src={weddingConfig.decor.lotusCluster}
              alt=""
              className="absolute -bottom-4 -left-4 w-24 sm:w-32 h-auto opacity-90 z-10"
            />
            <DecorativeCutout
              src={weddingConfig.decor.lotusCluster}
              alt=""
              flipHorizontal
              className="absolute -bottom-4 -right-4 w-24 sm:w-32 h-auto opacity-90 z-10"
            />

            <div className="relative z-20 max-w-2xl mx-auto text-center">
              {/* Top Ceremonial Kalash & Coconut Medallion */}
              <DecorativeCutout
                src={weddingConfig.decor.kalashCoconut}
                alt="Traditional Mangal Kalash with coconut and mango leaves"
                className="w-16 sm:w-20 h-auto mx-auto mb-3 drop-shadow"
              />

              <p className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#9F7624] font-semibold">
                {weddingConfig.couple.displayUpper}
              </p>

              <h2 className="font-editorial text-3xl sm:text-5xl font-semibold tracking-wide text-[#5C1222] mt-2">
                {weddingConfig.blessings.englishHeading}
              </h2>

              <h3
                lang="gu"
                className="font-gujarati text-2xl sm:text-4xl font-bold text-[#9F7624] mt-2"
              >
                {weddingConfig.blessings.gujaratiHeading}
              </h3>

              <LotusDivider tone="gold" className="my-6" />

              {/* Primary Gujarati Family Blessing Verse */}
              <div className="rounded-2xl border border-[#C49A45]/45 bg-[#FAF5EB]/85 px-5 py-6 sm:px-8 sm:py-7 shadow-sm">
                <p
                  lang="gu"
                  className="font-gujarati text-lg sm:text-2xl font-medium text-[#5C1222] leading-[1.9] whitespace-pre-line"
                >
                  {weddingConfig.blessings.gujaratiVerseOne}
                </p>
              </div>

              {/* Invitation Blessing Message */}
              <div className="mt-6 px-3 sm:px-6">
                <p
                  lang="gu"
                  className="font-gujarati text-base sm:text-xl font-medium text-[#133D38] leading-[1.9] whitespace-pre-line"
                >
                  {weddingConfig.blessings.gujaratiVerseTwo}
                </p>
              </div>

              <LotusDivider tone="burgundy" className="my-6" />

              <p className="font-calligraphy text-3xl sm:text-4xl text-[#7A1B2E]">
                With Love &amp; Warmest Regards from Both Families
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
