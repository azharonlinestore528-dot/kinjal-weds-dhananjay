import { ArrowDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { HangingFloralToran } from './OrnamentalMotifs';

export function PalaceDoorHero({
  onEnterInvitation,
  onHeroActiveChange,
  onGlowChange,
}: {
  onEnterInvitation: () => void;
  onHeroActiveChange?: (active: boolean) => void;
  onGlowChange?: (intense: boolean) => void;
}) {
  const trackRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const targetProgressRef = useRef(0);
  const smoothedTimeRef = useRef(0);
  const durationRef = useRef(7.91);
  const unlockedTouchRef = useRef(false);

  const unlockVideoPlayback = () => {
    const v = videoRef.current;
    if (!v || unlockedTouchRef.current) return;
    unlockedTouchRef.current = true;
    const cur = v.currentTime;
    v.play()
      .then(() => {
        v.pause();
        v.currentTime = cur;
      })
      .catch(() => {
        // Ignore if browser restricts programmatic pre-unlock
      });
  };

  const handleTapToEnter = () => {
    setHasEntered(true);
    unlockVideoPlayback();
    onGlowChange?.(true);
  };

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
    const unlock = () => unlockVideoPlayback();
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

      if (progress > 0.02) {
        setHasEntered(true);
      }

      const gateStillVisible = progress < 0.98 && rect.bottom > 40;
      onHeroActiveChange?.(gateStillVisible);
      onGlowChange?.(gateStillVisible && progress > 0.08);
    };

    computeScrollProgress();
    window.addEventListener('scroll', computeScrollProgress, { passive: true });
    window.addEventListener('resize', computeScrollProgress);

    let rafId = 0;
    const syncVideoFrame = () => {
      const video = videoRef.current;
      if (video && videoReady && !videoError) {
        const dur = durationRef.current;
        // Doors reach fully open by 0.80 scroll progress, leaving 0.80-1.00 for courtyard reveal & complete exit
        const doorPhase = Math.min(1, targetProgressRef.current / 0.8);
        const targetTime = doorPhase * Math.max(0.1, dur - 0.06);

        if (prefersReducedMotion) {
          if (!video.seeking && Math.abs(video.currentTime - targetTime) > 0.08) {
            video.currentTime = targetTime;
          }
        } else {
          smoothedTimeRef.current += (targetTime - smoothedTimeRef.current) * 0.24;
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
  }, [videoReady, videoError, onHeroActiveChange, onGlowChange]);

  // Phase curves for entrance overlays & clean full-screen exit
  const tapOverlayOpacity = hasEntered ? 0 : Math.max(0, 1 - scrollProgress * 10);
  const scrollPromptOpacity = hasEntered ? Math.max(0, 1 - scrollProgress * 4.5) : 0;
  const courtyardGlowOpacity = hasEntered
    ? Math.min(0.88, 0.28 + Math.min(1, scrollProgress / 0.65) * 0.55)
    : 0.08;
  const finaleOpacity =
    scrollProgress > 0.72 && scrollProgress < 0.92
      ? Math.min(1, (scrollProgress - 0.72) / 0.1) *
        Math.min(1, (0.92 - scrollProgress) / 0.08)
      : 0;
  const exitProgress = Math.max(0, Math.min(1, (scrollProgress - 0.88) / 0.12));
  const sceneOpacity = 1 - exitProgress;
  const sceneTranslateY = -exitProgress * 42;
  const sceneGone = exitProgress >= 0.99;

  return (
    <section
      ref={trackRef}
      aria-label="Royal Palace Entrance"
      className="relative w-full h-[335vh] bg-[#FAF5EB] m-0 p-0"
    >
      <div
        className="sticky top-0 left-0 w-screen h-[100svh] min-h-[100dvh] overflow-hidden bg-[#140408]"
        style={{
          opacity: sceneOpacity,
          transform: `translate3d(0, ${sceneTranslateY}px, 0) scale(${1 + exitProgress * 0.03})`,
          visibility: sceneGone ? 'hidden' : 'visible',
          pointerEvents: sceneGone ? 'none' : 'auto',
          willChange: 'transform, opacity',
        }}
      >
        {/* Full-bleed edge-to-edge Google Flow palace door video (no rounded corners, margins, or gaps) */}
        {!videoReady && !videoError && (
          <div className="absolute inset-0 z-10 bg-[#140408]">
            <img
              src={weddingConfig.assets.lotusArchDoorImage}
              alt="Closed golden palace doors beneath lotus arch"
              className="w-full h-full object-cover object-[50%_42%]"
            />
          </div>
        )}

        {videoError && (
          <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-[#230910] text-center text-[#FAF5EB]">
            <div className="max-w-sm p-6 rounded-xl border border-[#C49A45]/60 bg-[#1B060B]/90">
              <p className="text-base font-medium mb-2">Palace Entrance Video Unavailable</p>
              <p className="text-sm text-[#F3E9D4]/80">{videoError}</p>
            </div>
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
          className="absolute inset-0 w-full h-full object-cover object-[50%_42%]"
        />

        {/* Subtle warm golden palace aura emerging from center threshold */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none transition-opacity duration-700"
          style={{
            opacity: courtyardGlowOpacity,
            background:
              'radial-gradient(ellipse 68% 62% at 50% 48%, rgba(255, 224, 150, 0.34) 0%, rgba(223, 186, 102, 0.14) 38%, rgba(20, 4, 8, 0.25) 75%, rgba(16, 3, 6, 0.62) 100%)',
          }}
        />

        {/* Delicate top floral toran whisper */}
        <div
          className="absolute top-0 inset-x-0 pt-2 sm:pt-3 px-4 flex flex-col items-center pointer-events-none z-10"
          style={{
            opacity: Math.max(0.22, 1 - scrollProgress * 1.4),
            background:
              'linear-gradient(to bottom, rgba(18,4,8,0.68) 0%, rgba(18,4,8,0.18) 65%, transparent 100%)',
          }}
        >
          <HangingFloralToran tone="lotus" className="max-w-[240px] sm:max-w-[300px] opacity-85 -mt-1" />
        </div>

        {/* Initial Minimal "TAP TO ENTER" + "Scroll to discover our celebration" Overlay */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 pb-12 sm:pb-16 pt-28 px-6 flex flex-col items-center justify-end text-center transition-opacity duration-500"
          style={{
            opacity: tapOverlayOpacity,
            pointerEvents: tapOverlayOpacity > 0.1 ? 'auto' : 'none',
            background:
              'linear-gradient(to top, rgba(16,4,7,0.88) 0%, rgba(16,4,7,0.52) 55%, transparent 100%)',
          }}
        >
          <button
            type="button"
            onClick={handleTapToEnter}
            className="px-8 py-3.5 rounded-full bg-[#24070E]/80 hover:bg-[#5C1222]/90 border border-[#DFBA66]/85 text-[#FAF5EB] text-sm sm:text-base font-semibold tracking-[0.26em] uppercase shadow-[0_0_32px_rgba(223,186,102,0.28)] transition-all duration-300 cursor-pointer whitespace-nowrap min-h-[48px]"
          >
            Tap to Enter
          </button>
          <p className="mt-4 text-sm sm:text-base tracking-[0.14em] text-[#F3E9D4]/90 font-medium">
            Scroll to discover our celebration
          </p>
        </div>

        {/* Post-Tap Scroll Cue while doors begin opening */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 pb-10 sm:pb-14 pt-24 px-6 flex flex-col items-center text-center pointer-events-none transition-opacity duration-500"
          style={{
            opacity: scrollPromptOpacity,
            background:
              'linear-gradient(to top, rgba(16,4,7,0.84) 0%, rgba(16,4,7,0.42) 58%, transparent 100%)',
          }}
        >
          <p className="text-base sm:text-lg tracking-[0.14em] text-[#FAF5EB] font-medium drop-shadow">
            Scroll to discover our celebration
          </p>
          <div className="mt-3 text-[#DFBA66] animate-arrow-float">
            <ArrowDown className="w-5 h-5" />
          </div>
        </div>

        {/* Brief Illuminated Courtyard Moment as doors open wide */}
        <div
          className="absolute inset-x-0 bottom-0 z-20 pb-12 sm:pb-16 pt-28 px-6 flex flex-col items-center text-center transition-opacity duration-300"
          style={{
            opacity: finaleOpacity,
            pointerEvents: finaleOpacity > 0.25 ? 'auto' : 'none',
            background:
              'linear-gradient(to top, rgba(18,4,8,0.92) 0%, rgba(18,4,8,0.45) 60%, transparent 100%)',
          }}
        >
          <p className="text-xs tracking-[0.28em] uppercase text-[#DFBA66] mb-1">
            {weddingConfig.invitation.date} · Udaipur
          </p>
          <p className="font-calligraphy text-4xl sm:text-5xl text-[#FAF5EB] mb-4">
            {weddingConfig.couple.displayCalligraphy}
          </p>
          <button
            type="button"
            onClick={onEnterInvitation}
            className="px-6 py-3 rounded-full bg-[#C49A45] text-[#230910] text-sm font-semibold tracking-wider uppercase hover:bg-[#DFBA66] transition-colors shadow-lg cursor-pointer whitespace-nowrap min-h-[44px]"
          >
            Enter Celebration
          </button>
        </div>

        {/* Accessible corner Skip control */}
        <div className="absolute bottom-4 right-4 z-30">
          <button
            type="button"
            onClick={onEnterInvitation}
            className="px-3.5 py-2 rounded-full bg-[#1B060B]/70 hover:bg-[#3A0C16]/90 text-[#F3E9D4] text-xs tracking-wider uppercase border border-[#C49A45]/45 transition-colors cursor-pointer whitespace-nowrap min-h-[40px]"
          >
            Skip
          </button>
        </div>
      </div>
    </section>
  );
}
