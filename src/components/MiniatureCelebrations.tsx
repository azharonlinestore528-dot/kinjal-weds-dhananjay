import { useState } from 'react';
import { Utensils } from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { ClickEventCards } from './ClickEventCards';
import {
  FloralCornerCluster,
  LotusDivider,
  StaticPeacockCrest,
} from './OrnamentalMotifs';
import { PalaceArchitectureBg } from './PalaceArchitectureBg';
import {
  DecorativeCutout,
  StaticPeacockOrnament,
  SwingingLotusGarland,
} from './RoyalBotanicalDecor';

export function MiniatureCelebrations({
  onJumpToRsvp,
}: {
  onJumpToRsvp: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);

  const selectChapter = (index: number) => {
    setActiveIndex(index);
    const stage = document.getElementById('event-carousel-stage');
    if (stage) {
      stage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  return (
    <section
      id="celebrations"
      aria-label="Wedding Celebrations Schedule"
      className="relative emerald-courtyard text-[#FAF5EB] overflow-x-clip"
    >
      <div
        aria-hidden="true"
        className="h-3 w-full bg-gradient-to-r from-[#5C1222] via-[#C49A45] to-[#5C1222] opacity-90"
      />

      {/* Celebrations Section Header */}
      <div className="relative overflow-hidden">
        <PalaceArchitectureBg variant="darbar-jharokha" tone="dark" />
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-8 pt-10 sm:pt-18 pb-6 sm:pb-10 text-center">
          <SwingingLotusGarland
            timing="a"
            className="hidden sm:block absolute top-0 left-2 w-12 h-36 opacity-90"
          />
          <SwingingLotusGarland
            timing="b"
            flipHorizontal
            className="hidden sm:block absolute top-0 right-2 w-12 h-36 opacity-90"
          />

          <StaticPeacockCrest
            tone="ivory"
            className="w-20 sm:w-24 h-12 sm:h-14 mx-auto mb-1.5 sm:mb-2"
          />
          <p className="text-[11px] sm:text-sm tracking-[0.28em] uppercase text-[#DFBA66] font-semibold">
            15 – 17 February 2027 · Shubh Vivah Chronicles
          </p>
          <h2 className="font-calligraphy text-4xl sm:text-6xl text-[#FAF5EB] mt-1.5 sm:mt-2">
            Wedding Celebrations
          </h2>
          <p lang="gu" className="font-gujarati text-lg sm:text-xl text-[#F7D0D8] mt-1">
            શુભ પ્રસંગોની પત્રિકા
          </p>
          <LotusDivider tone="ivory" className="my-4 sm:my-5" />
          <p className="text-sm sm:text-lg text-[#F3E9D4]/88 leading-relaxed max-w-2xl mx-auto">
            Swipe sideways or choose a ceremony below — each royal invitation book opens
            automatically as it enters the spotlight.
          </p>

          {/* Direct Chapter Selector Tabs Synced with Horizontal Carousel */}
          <div
            role="navigation"
            aria-label="Ceremony Chapters"
            className="mt-5 sm:mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {weddingConfig.events.map((ev, idx) => {
              const isCurrent = idx === activeIndex;
              return (
                <button
                  key={ev.id}
                  type="button"
                  onClick={() => selectChapter(idx)}
                  aria-pressed={isCurrent}
                  className={`px-3.5 py-2 sm:px-4 rounded-lg border text-xs sm:text-sm font-medium tracking-wider uppercase transition-all cursor-pointer whitespace-nowrap shrink-0 min-h-[40px] ${
                    isCurrent
                      ? 'border-[#FDE68A] bg-[#C49A45] text-[#230910] shadow-[0_0_20px_rgba(223,186,102,0.45)] font-semibold'
                      : 'border-[#C49A45]/55 bg-[#0D2E2A]/85 hover:bg-[#194B44] text-[#FAF5EB]'
                  }`}
                >
                  0{idx + 1}. {ev.englishName}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Horizontal Royal Invitation Book Carousel */}
      <ClickEventCards
        events={weddingConfig.events}
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        onJumpToRsvp={onJumpToRsvp}
      />

      {/* Wedding Day Lunch Card */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        <div className="relative rounded-3xl border-2 border-[#C49A45]/75 paper-texture text-[#2B1418] p-5 sm:p-9 shadow-xl overflow-visible">
          <StaticPeacockOrnament className="hidden sm:block absolute -top-10 -right-5 w-24 h-auto z-20 drop-shadow-lg" />

          <div className="relative overflow-hidden rounded-2xl border border-[#C49A45]/45 px-4 py-6 sm:px-8 sm:py-8">
            <FloralCornerCluster
              variant="marigold-leaf"
              position="top-left"
              className="absolute top-0 left-0 w-16 h-16 sm:w-20 sm:h-20 opacity-85"
            />
            <FloralCornerCluster
              variant="lotus-rose"
              position="top-right"
              className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 opacity-85"
            />
            <DecorativeCutout
              src={weddingConfig.decor.kalashCoconut}
              alt=""
              className="hidden sm:block absolute bottom-1 left-3 w-16 h-auto opacity-85 z-10"
            />
            <DecorativeCutout
              src={weddingConfig.decor.lotusCluster}
              alt=""
              className="hidden sm:block absolute -bottom-2 right-3 w-24 h-auto opacity-85 z-10"
            />

            <div className="relative z-10 max-w-3xl mx-auto text-center py-2">
              <div className="inline-flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#7A1B2E]/10 border border-[#C49A45]/60 text-[#7A1B2E] mb-3">
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
          </div>
        </div>
      </div>
    </section>
  );
}
