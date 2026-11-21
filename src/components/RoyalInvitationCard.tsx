import { useEffect, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import {
  FloralCornerCluster,
  HangingFloralToran,
  LotusDivider,
  StaticPeacockCrest,
} from './OrnamentalMotifs';
import { PalaceArchitectureBg } from './PalaceArchitectureBg';
import {
  DecorativeCutout,
  StaticPeacockOrnament,
  SwingingLotusGarland,
} from './RoyalBotanicalDecor';

interface CountdownRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  hasStarted: boolean;
}

function calculateCountdown(): CountdownRemaining {
  const targetMs = new Date(weddingConfig.invitation.timeIsoTarget).getTime();
  const nowMs = Date.now();
  const diff = targetMs - nowMs;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, hasStarted: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, hasStarted: false };
}

export function RoyalInvitationCard() {
  const [countdown, setCountdown] = useState<CountdownRemaining>(() => calculateCountdown());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(calculateCountdown());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="royal-invitation"
      aria-label="Official Wedding Invitation and Live Countdown"
      className="relative scroll-mt-14 min-h-[calc(100svh-3.5rem)] flex flex-col justify-center py-8 sm:py-16 lg:py-20 px-3.5 sm:px-8 bg-[#FAF5EB] overflow-hidden"
    >
      {/* Subtle Heritage Palace Arches Architectural Backdrop */}
      <PalaceArchitectureBg variant="haveli-arches" tone="ivory" />

      {/* Subtle Golden Light & Botanical Radiance Behind Hero */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-85"
        style={{
          background:
            'radial-gradient(circle at 50% 30%, rgba(255, 226, 150, 0.36) 0%, rgba(232, 131, 155, 0.14) 38%, rgba(79, 119, 80, 0.12) 68%, transparent 100%)',
        }}
      />

      {/* Swinging Hanging Lotus Garlands on Section Outer Edges */}
      <SwingingLotusGarland
        timing="a"
        className="hidden sm:block absolute top-0 left-3 lg:left-10 w-12 lg:w-16 h-40 lg:h-52 z-10 opacity-90"
      />
      <SwingingLotusGarland
        timing="b"
        flipHorizontal
        className="hidden sm:block absolute top-0 right-3 lg:right-10 w-12 lg:w-16 h-40 lg:h-52 z-10 opacity-90"
      />

      {/* Outer Garden Coconut Palm Silhouettes */}
      <DecorativeCutout
        src={weddingConfig.decor.coconutPalm}
        alt=""
        className="hidden xl:block absolute bottom-6 left-2 w-44 h-auto opacity-65 z-10"
      />
      <DecorativeCutout
        src={weddingConfig.decor.coconutPalm}
        alt=""
        flipHorizontal
        className="hidden xl:block absolute bottom-6 right-2 w-44 h-auto opacity-65 z-10"
      />

      <div className="relative z-20 max-w-5xl mx-auto">
        <div className="paper-texture relative rounded-2xl border border-[#C49A45]/75 shadow-[0_24px_70px_rgba(92,18,34,0.14)] p-3.5 sm:p-8 md:p-10 overflow-visible">
          {/* Static Royal Peacock Perched Naturally on the Upper Right Corner of the Invitation Frame */}
          <StaticPeacockOrnament className="absolute -top-6 right-0 sm:-top-11 sm:-right-7 w-14 sm:w-28 md:w-32 h-auto z-30 drop-shadow-lg" />

          {/* Bougainvillea Floral Branch Draping Over Top Left Corner */}
          <DecorativeCutout
            src={weddingConfig.decor.bougainvilleaBranch}
            alt=""
            className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-20 sm:w-44 h-auto opacity-95 z-20"
          />

          {/* Inner double gilt stationery frame */}
          <div className="relative border border-[#C49A45]/55 rounded-xl px-4 py-6 pb-10 sm:px-10 sm:py-12 sm:pb-14 overflow-hidden">
            <FloralCornerCluster
              variant="lotus-rose"
              position="top-left"
              className="hidden sm:block absolute top-1 left-1 w-24 h-24 opacity-80"
            />
            <FloralCornerCluster
              variant="lotus-rose"
              position="top-right"
              className="hidden sm:block absolute top-1 right-1 w-24 h-24 opacity-80"
            />
            <DecorativeCutout
              src={weddingConfig.decor.lotusCluster}
              alt=""
              className="hidden sm:block absolute -bottom-3 -left-3 w-24 h-auto opacity-75 z-0"
            />
            <DecorativeCutout
              src={weddingConfig.decor.lotusCluster}
              alt=""
              flipHorizontal
              className="hidden sm:block absolute -bottom-3 -right-3 w-24 h-auto opacity-75 z-0"
            />

            <HangingFloralToran tone="lotus" className="mb-3 sm:mb-4 -mt-2 sm:-mt-3 opacity-90" />

            <div className="relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-9 items-center">
              {/* Left Unframed Transparent Chhatri Pavilion + Lotus Garden Illustration */}
              <div className="lg:col-span-5 relative flex flex-col items-center">
                <DecorativeCutout
                  src={weddingConfig.decor.gardenChhatri}
                  alt="Hand-painted Rajasthani palace chhatri pavilion with pink bougainvillea, banana leaves, palm tree, and peacock"
                  className="w-full max-w-[190px] sm:max-w-[320px] h-auto drop-shadow-[0_14px_24px_rgba(92,18,34,0.14)]"
                />
                <DecorativeCutout
                  src={weddingConfig.decor.lotusCluster}
                  alt="Pink lotus flowers and green lotus leaves"
                  className="w-28 sm:w-44 h-auto -mt-5 sm:-mt-7 relative z-10"
                />
              </div>

              {/* Right Luxury Stationery Typography & Highlighted Date */}
              <div className="lg:col-span-7 text-center flex flex-col items-center">
                <StaticPeacockCrest tone="gold" className="w-16 sm:w-20 h-10 sm:h-12 mb-1" />
                <p className="text-[11px] sm:text-sm tracking-[0.3em] uppercase text-[#9F7624] font-semibold">
                  Shubh Vivah · Udaipur
                </p>

                <h1 className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-[#7A1B2E] mt-2 sm:mt-3 leading-tight">
                  {weddingConfig.couple.bride} &amp; {weddingConfig.couple.groom}
                </h1>
                <p className="text-xs sm:text-base tracking-[0.28em] uppercase text-[#5C1222]/85 mt-1 font-medium">
                  {weddingConfig.couple.displayUpper}
                </p>

                <LotusDivider tone="gold" className="my-4 sm:my-5" />

                <p className="max-w-md text-base sm:text-xl italic text-[#2B1418]/90 leading-relaxed">
                  {weddingConfig.invitation.message}
                </p>

                {/* Highlighted Wedding Date Composition */}
                <div className="mt-5 sm:mt-7 w-full max-w-md rounded-2xl border-2 border-[#C49A45]/75 bg-[#FAF5EB]/90 px-5 py-4 sm:px-6 sm:py-6 shadow-sm relative">
                  <p className="text-[11px] sm:text-xs tracking-[0.26em] uppercase text-[#9F7624] font-semibold">
                    The Auspicious Wedding Day
                  </p>
                  <p className="text-xl sm:text-3xl font-bold tracking-[0.14em] uppercase text-[#5C1222] mt-1.5 sm:mt-2 tabular-nums">
                    {weddingConfig.invitation.dateUpper}
                  </p>
                  <p className="text-sm sm:text-lg tracking-[0.18em] uppercase text-[#7A1B2E] font-semibold mt-1 sm:mt-1.5 tabular-nums">
                    {weddingConfig.invitation.time}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 space-y-1 text-[#2B1418]">
                  <p className="text-lg sm:text-2xl font-semibold text-[#133D38]">
                    {weddingConfig.invitation.venueName}
                  </p>
                  <p className="text-sm sm:text-lg text-[#2B1418]/85">
                    {weddingConfig.invitation.venueLocation}
                  </p>
                </div>

                <p className="mt-3 sm:mt-4 text-sm sm:text-lg italic text-[#7A1B2E] font-medium">
                  {weddingConfig.invitation.receptionNote}
                </p>
              </div>
            </div>

            {/* Live Wedding Countdown Timer */}
            <div className="relative z-20 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#C49A45]/40 text-center">
              <p className="text-[11px] sm:text-sm tracking-[0.26em] uppercase text-[#9F7624] font-semibold">
                Counting Down To The Sacred Union · Udaipur IST
              </p>

              {countdown.hasStarted ? (
                <div className="mt-4 sm:mt-5 inline-block px-6 sm:px-8 py-4 rounded-2xl border border-[#C49A45] bg-[#5C1222] text-[#FAF5EB] shadow-md">
                  <p className="font-calligraphy text-3xl sm:text-4xl text-[#DFBA66]">
                    Shubh Vivah Has Begun
                  </p>
                  <p className="text-xs sm:text-sm tracking-widest uppercase mt-1 text-[#F3E9D4]">
                    17 February 2027 · Celebrate With Kinjal &amp; Dhananjay
                  </p>
                </div>
              ) : (
                <div
                  className="mt-4 sm:mt-5 grid grid-cols-4 gap-2 sm:gap-5 max-w-xl mx-auto"
                  role="timer"
                  aria-live="polite"
                  aria-label="Countdown to 17 February 2027 at 6:00 PM IST"
                >
                  {[
                    { value: countdown.days, label: 'Days' },
                    { value: countdown.hours, label: 'Hours' },
                    { value: countdown.minutes, label: 'Minutes' },
                    { value: countdown.seconds, label: 'Seconds' },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      className="rounded-xl border border-[#C49A45]/60 bg-[#FAF5EB] py-3 sm:py-4 px-1.5 sm:px-2 shadow-sm"
                    >
                      <span className="block text-xl sm:text-4xl font-bold text-[#7A1B2E] tabular-nums">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="block text-[10px] sm:text-xs tracking-[0.18em] uppercase text-[#9F7624] font-semibold mt-0.5 sm:mt-1">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
