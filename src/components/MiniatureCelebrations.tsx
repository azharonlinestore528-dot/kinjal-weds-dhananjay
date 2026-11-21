import { Utensils } from 'lucide-react';
import { motion } from 'motion/react';
import { weddingConfig, type EventThemeVariant } from '../config/weddingConfig';
import type { FloralIntensity } from './FloatingFloralLayer';
import {
  FloralCornerCluster,
  LotusDivider,
  MiniatureMusiciansIllustration,
  RoyalElephantIllustration,
  StaticPeacockCrest,
} from './OrnamentalMotifs';
import { ScrollEventCards } from './ScrollEventCards';

export function MiniatureCelebrations({
  onJumpToRsvp,
  onFloralStateChange,
}: {
  onJumpToRsvp: () => void;
  onFloralStateChange?: (intensity: FloralIntensity) => void;
}) {
  const jumpToEventOpenState = (id: EventThemeVariant) => {
    const el = document.getElementById(`event-card-${id}`);
    if (!el) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    const targetY =
      el.getBoundingClientRect().top + window.scrollY + (el.offsetHeight - window.innerHeight) * 0.62;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  return (
    <section
      id="celebrations"
      aria-label="Wedding Celebrations Schedule"
      className="relative py-20 sm:py-24 emerald-courtyard text-[#FAF5EB] overflow-x-clip"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-3 bg-gradient-to-r from-[#5C1222] via-[#C49A45] to-[#5C1222] opacity-90"
      />

      {/* Section Intro & Direct Ceremony Jump Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 text-center pb-8">
        <StaticPeacockCrest tone="ivory" className="w-24 h-14 mx-auto mb-2" />
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
        <p className="text-base sm:text-lg text-[#F3E9D4]/85 leading-relaxed max-w-2xl mx-auto">
          Scroll gently to unfold each sacred invitation card from Ganesh Puja through the grand
          Udaipur wedding ceremony.
        </p>

        {/* Clean Single-Line Editorial Event Chapter Jump Controls */}
        <div
          role="navigation"
          aria-label="Jump to Ceremony Invitation"
          className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {weddingConfig.events.map((ev, idx) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => jumpToEventOpenState(ev.id)}
              className="px-4 py-2 rounded-lg border border-[#C49A45]/55 bg-[#0D2E2A]/85 hover:bg-[#194B44] text-[#FAF5EB] text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px]"
            >
              0{idx + 1}. {ev.englishName}
            </button>
          ))}
        </div>
      </div>

      {/* Signature Feature: 4 Dedicated Scroll-Driven Upward-Unfolding 3D Event Cards */}
      <ScrollEventCards
        events={weddingConfig.events}
        onJumpToRsvp={onJumpToRsvp}
        onFloralStateChange={onFloralStateChange}
      />

      {/* Dedicated Wedding Day Lunch Card (17 February 2027, Timing Configurable) */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 mt-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl border-2 border-[#C49A45]/75 paper-texture text-[#2B1418] p-6 sm:p-9 shadow-xl overflow-hidden"
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
        <div className="mt-12 rounded-2xl border border-[#C49A45]/55 bg-[#0A221E] overflow-hidden shadow-2xl">
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
