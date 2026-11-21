import { ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralCornerCluster, HangingFloralToran } from './OrnamentalMotifs';

export function PalaceDoorHero({
  onEnterInvitation,
  onHeroActiveChange,
}: {
  onEnterInvitation: () => void;
  onHeroActiveChange?: (active: boolean) => void;
}) {
  const trackRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const targetProgressRef = useRef(0);
  const smoothedTimeRef = useRef(0);
  const durationRef = useRef(7.91);
  const unlockedTouchRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.pause();

    const handleLoadedMetadata = () => {
      if (video.duration && Number.isFinite(video.duration)) {
        durationRef.current = video.duration;
      }
      video.pause();
      video.currentTime = 0;
    };

    const handleLoadedData = () => {
      video.pause();
      video.currentTime = 0;
      setVideoReady(true);
    };

    const handleError = () => {
      setVideoError(
        `Unable to load opening palace doors video (${weddingConfig.assets.palaceDoorsVideo}).`
      );
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('canplay', handleLoadedData);
    video.addEventListener('error', handleError);

    if (video.readyState >= 2) {
      handleLoadedMetadata();
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplay', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, []);

  useEffect(() => {
    const unlock = () => {
      if (unlockedTouchRef.current) return;
      unlockedTouchRef.current = true;
      const v = videoRef.current;
      if (!v) return;
      const cur = v.currentTime;
      v.play()
        .then(() => {
          v.pause();
          v.currentTime = cur;
        })
        .catch(() => {
          // Ignore if browser rejects
        });
    };
    window.addEventListener('touchstart', unlock, { passive: true, once: true });
    return () => window.removeEventListener('touchstart', unlock);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const computeScrollProgress = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const maxScroll = Math.max(1, track.offsetHeight - window.innerHeight);
      const scrolled = Math.min(maxScroll, Math.max(0, -rect.top));
      const progress = scrolled / maxScroll;
      targetProgressRef.current = progress;
      setScrollProgress(progress);
      onHeroActiveChange?.(rect.bottom > window.innerHeight * 0.35);
    };

    computeScrollProgress();
    window.addEventListener('scroll', computeScrollProgress, { passive: true });
    window.addEventListener('resize', computeScrollProgress);

    let rafId = 0;
    const syncVideoFrame = () => {
      const video = videoRef.current;
      if (video && videoReady && !videoError) {
        const dur = durationRef.current;
        const targetTime = targetProgressRef.current * Math.max(0.1, dur - 0.06);

        if (prefersReducedMotion) {
          if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.08) {
            video.currentTime = targetTime;
          }
        } else {
          smoothedTimeRef.current += (targetTime - smoothedTimeRef.current) * 0.22;
          if (!video.seeking && Math.abs(video.currentTime - smoothedTimeRef.current) > 0.016) {
            video.currentTime = smoothedTimeRef.current;
          }
        }
      }
      rafId = requestAnimationFrame(syncVideoFrame);
    };

    rafId = requestAnimationFrame(syncVideoFrame);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', computeScrollProgress);
      window.removeEventListener('resize', computeScrollProgress);
    };
  }, [videoReady, videoError, onHeroActiveChange]);

  const instructionOpacity = Math.max(0, 1 - scrollProgress * 6.5);
  const finaleOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.78) / 0.18));

  return (
    <section
      ref={trackRef}
      aria-label="Royal Palace Entrance"
      className="relative w-full h-[320vh] bg-[#21090F]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center velvet-burgundy">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle at 50% 45%, rgba(223, 186, 102, 0.16) 0%, rgba(92, 18, 34, 0.45) 45%, rgba(24, 6, 11, 0.94) 100%)',
          }}
        />

        {/* Surrounding Floral Corner Decorations on Wide Viewports */}
        <FloralCornerCluster
          variant="lotus-rose"
          position="top-left"
          className="hidden sm:block absolute top-2 left-2 w-28 h-28 lg:w-36 lg:h-36 opacity-80 z-10"
        />
        <FloralCornerCluster
          variant="lotus-rose"
          position="top-right"
          className="hidden sm:block absolute top-2 right-2 w-28 h-28 lg:w-36 lg:h-36 opacity-80 z-10"
        />
        <FloralCornerCluster
          variant="marigold-leaf"
          position="bottom-left"
          className="hidden lg:block absolute bottom-2 left-2 w-32 h-32 opacity-75 z-10"
        />
        <FloralCornerCluster
          variant="marigold-leaf"
          position="bottom-right"
          className="hidden lg:block absolute bottom-2 right-2 w-32 h-32 opacity-75 z-10"
        />

        {/* Desktop flank wedding details */}
        <div className="hidden lg:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between items-center px-12 xl:px-20 pointer-events-none select-none z-10">
          <div className="max-w-[230px] text-left space-y-2 text-[#FAF5EB]/90">
            <p className="text-xs tracking-[0.28em] uppercase text-[#DFBA66]">
              Shubh Vivah
            </p>
            <p className="font-calligraphy text-4xl text-[#FAF5EB]">
              {weddingConfig.couple.bride} &amp; {weddingConfig.couple.groom}
            </p>
            <p className="text-base text-[#F3E9D4]/85 font-medium">
              {weddingConfig.invitation.date}
            </p>
            <p className="text-sm text-[#DFBA66]/90">
              {weddingConfig.invitation.time}
            </p>
          </div>

          <div className="max-w-[230px] text-right space-y-2 text-[#FAF5EB]/90">
            <p className="text-xs tracking-[0.28em] uppercase text-[#DFBA66]">
              Udaipur, Rajasthan
            </p>
            <p className="text-lg font-medium text-[#FAF5EB]">
              {weddingConfig.invitation.venueName}
            </p>
            <p className="text-sm text-[#F3E9D4]/80">
              Hotel Palace, Udaipur
            </p>
          </div>
        </div>

        {/* Original 9:16 Google Flow Palace Doors Video Portal */}
        <div className="relative z-10 h-full sm:h-[94dvh] w-full sm:w-auto aspect-[9/16] max-w-full flex items-center justify-center sm:rounded-t-[180px] sm:rounded-b-2xl overflow-hidden sm:border sm:border-[#C49A45]/60 shadow-[0_25px_90px_rgba(0,0,0,0.75)] bg-[#1B070C]">
          {!videoReady && !videoError && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#230910] text-center px-6">
              <img
                src={weddingConfig.assets.lotusArchDoorImage}
                alt="Royal palace closed golden doors beneath lotus arch"
                className="absolute inset-0 w-full h-full object-cover opacity-55"
              />
              <div className="relative z-10 bg-[#230910]/85 border border-[#C49A45]/60 px-6 py-4 rounded-xl shadow-xl">
                <div className="w-8 h-8 mx-auto mb-3 rounded-full border-2 border-[#C49A45]/30 border-t-[#DFBA66] animate-spin" />
                <p className="text-base tracking-wider text-[#FAF5EB]">
                  Preparing the Palace Entrance...
                </p>
              </div>
            </div>
          )}

          {videoError && (
            <div className="relative z-30 max-w-sm mx-auto p-6 rounded-xl bg-[#2A0B12] border border-[#E8839B]/60 text-center text-[#FAF5EB]">
              <p className="text-base font-medium mb-2">Palace Entrance Video Unavailable</p>
              <p className="text-sm text-[#F3E9D4]/80">{videoError}</p>
            </div>
          )}

          <video
            ref={videoRef}
            src={weddingConfig.assets.palaceDoorsVideo}
            poster={weddingConfig.assets.lotusArchDoorImage}
            muted
            playsInline
            preload="auto"
            disablePictureInPicture
            aria-label="Scroll-controlled royal palace double doors opening to reveal the wedding courtyard"
            className="w-full h-full object-cover sm:object-contain bg-black"
          />

          {/* Top Floral Toran & Couple Header */}
          <div
            className="absolute top-0 inset-x-0 pt-2 pb-12 px-4 text-center pointer-events-none"
            style={{
              background:
                'linear-gradient(to bottom, rgba(24,6,11,0.78) 0%, rgba(24,6,11,0.32) 60%, transparent 100%)',
              opacity: Math.max(0.28, 1 - scrollProgress * 1.4),
            }}
          >
            <HangingFloralToran tone="lotus" className="opacity-85 -mt-1 max-w-[260px]" />
            <p className="text-[11px] sm:text-xs tracking-[0.28em] uppercase text-[#DFBA66] -mt-2">
              Royal Wedding Invitation
            </p>
            <h1 className="font-calligraphy text-3xl sm:text-4xl text-[#FAF5EB] drop-shadow mt-0.5">
              {weddingConfig.couple.bride} &amp; {weddingConfig.couple.groom}
            </h1>
          </div>

          {/* Initial Closed-Door Scroll Instruction */}
          <div
            className="absolute inset-x-0 bottom-0 pb-10 pt-20 px-6 flex flex-col items-center text-center pointer-events-none transition-opacity duration-200"
            style={{
              opacity: instructionOpacity,
              background:
                'linear-gradient(to top, rgba(18,5,9,0.88) 0%, rgba(18,5,9,0.48) 58%, transparent 100%)',
            }}
          >
            <p className="text-base sm:text-lg tracking-[0.12em] text-[#FAF5EB] font-medium drop-shadow">
              Scroll to enter our celebration
            </p>
            <div className="mt-3 flex flex-col items-center text-[#DFBA66] animate-arrow-float">
              <ArrowDown className="w-5 h-5" />
            </div>
          </div>

          {/* Smooth Finale Overlay when doors have opened into the courtyard */}
          <div
            className="absolute inset-x-0 bottom-0 pb-12 pt-24 px-6 flex flex-col items-center text-center transition-opacity duration-300"
            style={{
              opacity: finaleOpacity,
              pointerEvents: finaleOpacity > 0.35 ? 'auto' : 'none',
              background:
                'linear-gradient(to top, rgba(22,7,11,0.92) 0%, rgba(22,7,11,0.52) 65%, transparent 100%)',
            }}
          >
            <p className="text-xs tracking-[0.28em] uppercase text-[#DFBA66] mb-1.5">
              17 February 2027 · Udaipur
            </p>
            <p className="font-calligraphy text-3xl sm:text-4xl text-[#FAF5EB] mb-4">
              {weddingConfig.couple.displayCalligraphy}
            </p>
            <button
              type="button"
              onClick={onEnterInvitation}
              className="px-6 py-2.5 rounded-full bg-[#C49A45] text-[#230910] text-sm font-semibold tracking-wider uppercase hover:bg-[#DFBA66] transition-colors shadow-lg cursor-pointer min-h-[44px]"
            >
              Read Royal Invitation
            </button>
          </div>
        </div>

        {/* Accessible jump button */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3">
          <button
            type="button"
            onClick={onEnterInvitation}
            className="px-3.5 py-2 rounded-full bg-[#FAF5EB]/15 hover:bg-[#FAF5EB]/25 text-[#FAF5EB] text-xs tracking-wider uppercase border border-[#C49A45]/40 transition-colors cursor-pointer min-h-[40px]"
          >
            Skip Entrance
          </button>
          <span className="hidden sm:inline-block text-xs text-[#F3E9D4]/75 tabular-nums">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>
      </div>
    </section>
  );
}
