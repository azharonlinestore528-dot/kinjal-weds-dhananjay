import { Utensils } from 'lucide-react';
import { weddingConfig, type EventThemeVariant } from '../config/weddingConfig';
import { ClickEventCards } from './ClickEventCards';
import {
  FloralCornerCluster,
  LotusDivider,
  MiniatureMusiciansIllustration,
  RoyalElephantIllustration,
  StaticPeacockCrest,
} from './OrnamentalMotifs';
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
  const jumpToRoom = (id: EventThemeVariant) => {
    const el = document.getElementById(`event-room-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <div className="relative max-w-5xl mx-auto px-4 sm:px-8 pt-16 sm:pt-20 pb-12 text-center">
        <SwingingLotusGarland
          timing="a"
          className="hidden sm:block absolute top-0 left-2 w-12 h-36 opacity-90"
        />
        <SwingingLotusGarland
          timing="b"
          flipHorizontal
          className="hidden sm:block absolute top-0 right-2 w-12 h-36 opacity-90"
        />

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
        <p className="text-base sm:text-lg text-[#F3E9D4]/88 leading-relaxed max-w-2xl mx-auto">
          Explore four royal palace rooms at your own pace, and tap any sealed invitation card to
          unfold its celebration details.
        </p>

        {/* Direct Chapter Jump Controls */}
        <div
          role="navigation"
          aria-label="Ceremony Chambers"
          className="mt-7 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
        >
          {weddingConfig.events.map((ev, idx) => (
            <button
              key={ev.id}
              type="button"
              onClick={() => jumpToRoom(ev.id)}
              className="px-4 py-2 rounded-lg border border-[#C49A45]/55 bg-[#0D2E2A]/85 hover:bg-[#194B44] text-[#FAF5EB] text-xs sm:text-sm font-medium tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 min-h-[40px]"
            >
              0{idx + 1}. {ev.englishName}
            </button>
          ))}
        </div>
      </div>

      {/* Four Spacious Royal Chambers with Click-to-Open Invitation Books */}
      <ClickEventCards events={weddingConfig.events} onJumpToRsvp={onJumpToRsvp} />

      {/* Wedding Day Lunch Card & Royal Baraat Procession */}
      <div className="max-w-5xl mx-auto px-4 sm:px-8 py-16 sm:py-20">
        <div className="relative rounded-3xl border-2 border-[#C49A45]/75 paper-texture text-[#2B1418] p-6 sm:p-9 shadow-xl overflow-visible">
          <StaticPeacockOrnament className="hidden sm:block absolute -top-10 -right-5 w-24 h-auto z-20 drop-shadow-lg" />

          <div className="relative overflow-hidden rounded-2xl">
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
          </div>
        </div>

        {/* Royal Elephants, Banana Trees & Miniature Wedding Procession Panorama */}
        <div className="relative mt-12 rounded-2xl border border-[#C49A45]/55 bg-[#0A221E] overflow-hidden shadow-2xl">
          <DecorativeCutout
            src={weddingConfig.decor.bougainvilleaBranch}
            alt=""
            className="hidden sm:block absolute -top-2 -left-2 w-32 h-auto opacity-80 z-10"
          />
          <DecorativeCutout
            src={weddingConfig.decor.bougainvilleaBranch}
            alt=""
            flipHorizontal
            className="hidden sm:block absolute -top-2 -right-2 w-32 h-auto opacity-80 z-10"
          />

          <div className="relative z-10 px-6 pt-8 pb-4 text-center">
            <p className="text-xs tracking-[0.28em] uppercase text-[#DFBA66] font-semibold">
              Royal Baraat &amp; Courtyard Musicians
            </p>
            <h3 className="font-calligraphy text-4xl sm:text-5xl text-[#FAF5EB] mt-1">
              The Royal Procession
            </h3>
          </div>

          <div className="relative z-10 px-4 sm:px-8 pb-6 pt-2 overflow-hidden">
            <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-around gap-6 animate-procession-march">
              <div className="w-44 sm:w-52 shrink-0 flex items-end justify-center">
                <DecorativeCutout
                  src={weddingConfig.decor.elephantBanana}
                  alt="Caparisoned royal wedding elephant beside banana tree and floral beds"
                  className="w-full h-auto"
                />
              </div>

              <div className="w-52 sm:w-60 shrink-0">
                <MiniatureMusiciansIllustration className="w-full h-auto" />
              </div>

              <div className="w-44 sm:w-52 shrink-0">
                <RoyalElephantIllustration facing="left" withHowdah={true} className="w-full h-auto" />
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
