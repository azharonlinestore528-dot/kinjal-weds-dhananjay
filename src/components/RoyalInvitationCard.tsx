import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import {
  FloralCornerCluster,
  HangingFloralToran,
  LotusDivider,
} from './OrnamentalMotifs';

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
      className="relative py-20 sm:py-28 px-4 sm:px-8 bg-[#FAF5EB] overflow-hidden"
    >
      {/* Soft Botanical & Gold Ambient Backdrop */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at 18% 18%, rgba(232, 131, 155, 0.16) 0%, transparent 45%), radial-gradient(circle at 82% 82%, rgba(196, 154, 69, 0.16) 0%, transparent 48%)',
        }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="paper-texture relative rounded-2xl border border-[#C49A45]/65 shadow-[0_24px_70px_rgba(92,18,34,0.12)] p-4 sm:p-8 md:p-10"
        >
          {/* Inner double gilt stationery frame */}
          <div className="relative border border-[#C49A45]/50 rounded-xl px-5 py-10 sm:px-12 sm:py-14 overflow-hidden">
            {/* Lush Floral Corner Ornaments */}
            <FloralCornerCluster
              variant="lotus-rose"
              position="top-left"
              className="absolute top-1 left-1 w-20 h-20 sm:w-28 sm:h-28 opacity-90"
            />
            <FloralCornerCluster
              variant="lotus-rose"
              position="top-right"
              className="absolute top-1 right-1 w-20 h-20 sm:w-28 sm:h-28 opacity-90"
            />
            <FloralCornerCluster
              variant="marigold-leaf"
              position="bottom-left"
              className="absolute bottom-1 left-1 w-20 h-20 sm:w-28 sm:h-28 opacity-85"
            />
            <FloralCornerCluster
              variant="marigold-leaf"
              position="bottom-right"
              className="absolute bottom-1 right-1 w-20 h-20 sm:w-28 sm:h-28 opacity-85"
            />

            <HangingFloralToran tone="lotus" className="mb-4 -mt-4 opacity-90" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Watercolor Chhatri & Peacock Illustration */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="relative w-full max-w-[320px] rounded-t-[160px] rounded-b-xl overflow-hidden border border-[#C49A45]/55 shadow-md bg-[#FAF5EB]">
                  <img
                    src={weddingConfig.assets.chhatriPavilionImage}
                    alt="Hand-painted Rajasthani palace chhatri pavilion with pink bougainvillea and peacock"
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* Right Luxury Stationery Typography & Highlighted Date */}
              <div className="lg:col-span-7 text-center flex flex-col items-center">
                <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#9F7624] font-semibold">
                  Shubh Vivah · Udaipur
                </p>

                <h2 className="font-calligraphy text-5xl sm:text-6xl md:text-7xl text-[#7A1B2E] mt-3 leading-tight">
                  {weddingConfig.couple.bride} &amp; {weddingConfig.couple.groom}
                </h2>
                <p className="text-sm sm:text-base tracking-[0.28em] uppercase text-[#5C1222]/85 mt-1 font-medium">
                  {weddingConfig.couple.displayUpper}
                </p>

                <LotusDivider tone="gold" className="my-5" />

                <p className="max-w-md text-lg sm:text-xl italic text-[#2B1418]/90 leading-relaxed">
                  {weddingConfig.invitation.message}
                </p>

                {/* Highlighted Wedding Date Composition */}
                <div className="mt-7 w-full max-w-md rounded-2xl border-2 border-[#C49A45]/75 bg-[#FAF5EB]/85 px-6 py-6 shadow-sm relative">
                  <p className="text-xs tracking-[0.26em] uppercase text-[#9F7624] font-semibold">
                    The Auspicious Wedding Day
                  </p>
                  <p className="text-2xl sm:text-3xl font-bold tracking-[0.14em] uppercase text-[#5C1222] mt-2 tabular-nums">
                    {weddingConfig.invitation.dateUpper}
                  </p>
                  <p className="text-base sm:text-lg tracking-[0.18em] uppercase text-[#7A1B2E] font-semibold mt-1.5 tabular-nums">
                    {weddingConfig.invitation.time}
                  </p>
                </div>

                <div className="mt-6 space-y-1 text-[#2B1418]">
                  <p className="text-xl sm:text-2xl font-semibold text-[#133D38]">
                    {weddingConfig.invitation.venueName}
                  </p>
                  <p className="text-base sm:text-lg text-[#2B1418]/85">
                    {weddingConfig.invitation.venueLocation}
                  </p>
                </div>

                <p className="mt-4 text-base sm:text-lg italic text-[#7A1B2E] font-medium">
                  {weddingConfig.invitation.receptionNote}
                </p>
              </div>
            </div>

            {/* Live Wedding Countdown Timer */}
            <div className="relative z-10 mt-12 pt-8 border-t border-[#C49A45]/40 text-center">
              <p className="text-xs sm:text-sm tracking-[0.28em] uppercase text-[#9F7624] font-semibold">
                Counting Down To The Sacred Union · Udaipur IST
              </p>

              {countdown.hasStarted ? (
                <div className="mt-5 inline-block px-8 py-4 rounded-2xl border border-[#C49A45] bg-[#5C1222] text-[#FAF5EB] shadow-md">
                  <p className="font-calligraphy text-3xl sm:text-4xl text-[#DFBA66]">
                    Shubh Vivah Has Begun
                  </p>
                  <p className="text-sm tracking-widest uppercase mt-1 text-[#F3E9D4]">
                    17 February 2027 · Celebrate With Kinjal &amp; Dhananjay
                  </p>
                </div>
              ) : (
                <div
                  className="mt-5 grid grid-cols-4 gap-2.5 sm:gap-5 max-w-xl mx-auto"
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
                      className="rounded-xl border border-[#C49A45]/60 bg-[#FAF5EB] py-3.5 sm:py-4 px-2 shadow-sm"
                    >
                      <span className="block text-2xl sm:text-4xl font-bold text-[#7A1B2E] tabular-nums">
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="block text-[11px] sm:text-xs tracking-[0.2em] uppercase text-[#9F7624] font-semibold mt-1">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
