import { motion } from 'motion/react';
import { weddingConfig } from '../config/weddingConfig';
import {
  FloralCornerCluster,
  HangingFloralToran,
  LotusDivider,
} from './OrnamentalMotifs';

export function PeacockSanctuary() {
  return (
    <section
      id="royal-peacock"
      aria-label="Royal Indian Peacock & Lotus Artwork"
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF5EB] text-[#2B1418] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(19, 61, 56, 0.08) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="paper-texture relative rounded-3xl border-2 border-[#C49A45]/65 p-5 sm:p-10 md:p-12 shadow-[0_24px_70px_rgba(19,61,56,0.12)] overflow-hidden"
        >
          <FloralCornerCluster
            variant="lotus-rose"
            position="top-left"
            className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-90"
          />
          <FloralCornerCluster
            variant="lotus-rose"
            position="top-right"
            className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-90"
          />
          <FloralCornerCluster
            variant="marigold-leaf"
            position="bottom-left"
            className="absolute bottom-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-85"
          />
          <FloralCornerCluster
            variant="marigold-leaf"
            position="bottom-right"
            className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-85"
          />

          <HangingFloralToran tone="lotus" className="mb-5 -mt-4 max-w-md opacity-90" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Static Bespoke Royal Peacock Artwork */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[380px] rounded-t-[190px] rounded-b-2xl overflow-hidden border-2 border-[#C49A45]/80 shadow-2xl bg-[#FAF5EB]">
                <img
                  src={weddingConfig.assets.royalPeacockImage}
                  alt="Traditional Indian miniature painting of a royal blue-green peacock surrounded by pink lotus blossoms and antique gold filigree"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover block"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Editorial Blessing */}
            <div className="lg:col-span-6 text-center lg:text-left">
              <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#9F7624] font-semibold">
                Mayur · Emblem of Grace &amp; Joy
              </p>
              <h2 className="font-calligraphy text-5xl sm:text-6xl text-[#133D38] mt-2">
                Blessings of Harmony
              </h2>
              <p lang="gu" className="font-gujarati text-xl text-[#7A1B2E] mt-1">
                શુભ મંગળ આવકાર
              </p>

              <LotusDivider tone="gold" className="my-6 lg:justify-start" />

              <p className="text-lg sm:text-xl italic text-[#2B1418]/90 leading-relaxed max-w-lg mx-auto lg:mx-0">
                In Rajasthani and Gujarati palace tradition, the royal peacock among blooming
                lotuses heralds auspicious beginnings, enduring love, and joyous celebration.
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
