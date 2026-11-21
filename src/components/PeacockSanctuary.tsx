import { motion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import { LotusDivider } from './OrnamentalMotifs';
import {
  DecorativeCutout,
  StaticPeacockOrnament,
  SwingingLotusGarland,
} from './RoyalBotanicalDecor';

export function PeacockSanctuary() {
  return (
    <section
      id="royal-peacock"
      aria-label="Static Royal Indian Peacock and Lotus Sanctuary"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF5EB] text-[#2B1418] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(19, 61, 56, 0.08) 0%, transparent 64%)',
        }}
      />

      {/* Swinging Hanging Lotus Garlands on Upper Section Corners */}
      <SwingingLotusGarland
        timing="a"
        className="hidden sm:block absolute top-0 left-4 lg:left-12 w-12 lg:w-14 h-36 lg:h-44 z-10 opacity-90"
      />
      <SwingingLotusGarland
        timing="b"
        flipHorizontal
        className="hidden sm:block absolute top-0 right-4 lg:right-12 w-12 lg:w-14 h-36 lg:h-44 z-10 opacity-90"
      />

      <div className="relative z-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="paper-texture relative rounded-3xl border-2 border-[#C49A45]/75 p-6 sm:p-10 md:p-12 shadow-[0_24px_70px_rgba(19,61,56,0.12)] overflow-visible"
        >
          {/* Bougainvillea Branches Draping Along Upper Corners of Card */}
          <DecorativeCutout
            src={weddingConfig.decor.bougainvilleaBranch}
            alt=""
            className="absolute -top-5 -left-5 w-28 sm:w-40 h-auto opacity-90 z-10"
          />
          <DecorativeCutout
            src={weddingConfig.decor.bougainvilleaBranch}
            alt=""
            flipHorizontal
            className="absolute -top-5 -right-5 w-28 sm:w-40 h-auto opacity-90 z-10"
          />

          {/* Static Royal Peacock Sitting Naturally on the Top-Right Border Corner (No Rectangular Frame) */}
          <StaticPeacockOrnament
            className="hidden lg:block absolute -top-16 -right-10 w-36 h-auto z-30 drop-shadow-xl"
          />

          <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-4">
            {/* Unframed Static Royal Peacock Sitting Amidst Lotus Flowers & Palace Garden (Not Inside Rectangle) */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center min-h-[300px] sm:min-h-[360px]">
              {/* Soft Ornamental Gilt Arch Rail (Pure Decorative Border, Not a Photo Rectangle) */}
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-4 bottom-6 rounded-t-full border-2 border-b-0 border-[#C49A45]/55 bg-gradient-to-b from-[#F3E9D4]/45 via-transparent to-[#133D38]/10 pointer-events-none"
              />

              {/* Background Coconut Palm Foliage Accent */}
              <DecorativeCutout
                src={weddingConfig.decor.coconutPalm}
                alt=""
                className="absolute right-4 sm:right-8 bottom-8 w-28 sm:w-36 h-auto opacity-65 z-10"
              />

              {/* Static Royal Peacock Cutout Standing Proudly Free of Any Box */}
              <StaticPeacockOrnament className="relative z-20 w-56 sm:w-64 md:w-72 h-auto drop-shadow-[0_14px_24px_rgba(19,61,56,0.22)]" />

              {/* Blooming Pink Lotus Flowers & Leaves Pond Cluster at Peacock's Feet */}
              <DecorativeCutout
                src={weddingConfig.decor.lotusCluster}
                alt="Pink and white lotus flowers with green lotus leaves"
                className="relative z-30 -mt-10 w-48 sm:w-60 h-auto drop-shadow-md"
              />
            </div>

            {/* Editorial Blessing */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#9F7624] font-semibold">
                Mayur · Emblem of Grace &amp; Joy
              </p>
              <h2 className="font-calligraphy text-5xl sm:text-6xl text-[#133D38] mt-2">
                Blessings of Harmony
              </h2>
              <p lang="gu" className="font-gujarati text-xl sm:text-2xl text-[#7A1B2E] mt-1 font-semibold">
                શુભ મંગળ આવકાર
              </p>

              <LotusDivider tone="gold" className="my-6 lg:justify-start" />

              <p className="text-lg sm:text-xl italic text-[#2B1418]/90 leading-relaxed max-w-lg mx-auto lg:mx-0">
                In Rajasthani and Gujarati palace tradition, the royal peacock perched beside blooming
                lotuses heralds auspicious beginnings, enduring devotion, and joyous celebration.
              </p>

              <p className="mt-5 text-base font-semibold tracking-[0.14em] uppercase text-[#5C1222]">
                {weddingConfig.couple.displayUpper} · {weddingConfig.invitation.dateUpper}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
