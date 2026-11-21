import { RotateCcw, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import {
  FloralCornerCluster,
  HangingFloralToran,
  LotusDivider,
} from './OrnamentalMotifs';
import {
  DecorativeCutout,
  StaticPeacockOrnament,
  SwingingLotusGarland,
} from './RoyalBotanicalDecor';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
}

export function ScratchRevealCard({
  onPopupOpenChange,
}: {
  onPopupOpenChange?: (open: boolean) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sparkleCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef<{ x: number; y: number } | null>(null);
  const sparklesRef = useRef<Sparkle[]>([]);
  const strokeCountRef = useRef(0);

  const [isRevealed, setIsRevealed] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [showRevealModal, setShowRevealModal] = useState(false);

  useEffect(() => {
    onPopupOpenChange?.(showRevealModal);
  }, [showRevealModal, onPopupOpenChange]);

  useEffect(() => {
    if (!showRevealModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowRevealModal(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showRevealModal]);

  const paintGoldFoil = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, width, height);

    const grad = ctx.createLinearGradient(0, 0, width, height);
    grad.addColorStop(0, '#B2832D');
    grad.addColorStop(0.28, '#E6C677');
    grad.addColorStop(0.55, '#C49A45');
    grad.addColorStop(0.82, '#EED694');
    grad.addColorStop(1, '#9A6F1E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 248, 224, 0.18)';
    ctx.lineWidth = 1;
    for (let y = 0; y < height; y += 6) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y + (y % 12 === 0 ? 3 : -2));
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(92, 18, 34, 0.48)';
    ctx.lineWidth = 2;
    ctx.strokeRect(14, 14, width - 28, height - 28);

    ctx.fillStyle = '#3B0A15';
    ctx.textAlign = 'center';
    ctx.font = 'italic 600 22px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(weddingConfig.scratchCard.initialTitle, width / 2, height / 2 - 14);

    ctx.font = '600 15px "Cormorant Garamond", Georgia, serif';
    ctx.fillText(weddingConfig.scratchCard.initialPrompt, width / 2, height / 2 + 20);

    setIsRevealed(false);
    setScratchPercent(0);
    setShowRevealModal(false);
    strokeCountRef.current = 0;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sparkleCanvas = sparkleCanvasRef.current;
    if (!canvas || !sparkleCanvas) return;

    const initSize = () => {
      const rect = canvas.getBoundingClientRect();
      const w = Math.max(280, Math.round(rect.width));
      const h = Math.max(210, Math.round(rect.height));
      canvas.width = w;
      canvas.height = h;
      sparkleCanvas.width = w;
      sparkleCanvas.height = h;
      paintGoldFoil();
    };

    initSize();
    window.addEventListener('resize', initSize);
    return () => window.removeEventListener('resize', initSize);
  }, [paintGoldFoil]);

  useEffect(() => {
    const sc = sparkleCanvasRef.current;
    if (!sc) return;
    const sctx = sc.getContext('2d');
    if (!sctx) return;

    let raf = 0;
    const loop = () => {
      sctx.clearRect(0, 0, sc.width, sc.height);
      const list = sparklesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.life -= 0.028;
        if (p.life <= 0) {
          list.splice(i, 1);
          continue;
        }
        sctx.save();
        sctx.globalAlpha = p.life;
        sctx.fillStyle = '#FFE4A3';
        sctx.beginPath();
        sctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        sctx.fill();
        sctx.restore();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);

  const spawnSparkles = (x: number, y: number, count = 4) => {
    for (let i = 0; i < count; i++) {
      sparklesRef.current.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 2.8,
        vy: -0.6 - Math.random() * 1.9,
        life: 1,
        size: 1.5 + Math.random() * 2.3,
      });
    }
  };

  const triggerReveal = useCallback(() => {
    const canvas = canvasRef.current;
    setIsRevealed(true);
    setShowRevealModal(true);
    if (canvas) {
      spawnSparkles(canvas.width / 2, canvas.height / 2, 30);
    }
  }, []);

  const evaluateScratchedRatio = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let transparent = 0;
    let sampled = 0;
    for (let i = 3; i < data.length; i += 64) {
      sampled += 1;
      if (data[i] < 40) transparent += 1;
    }
    const pct = Math.round((transparent / Math.max(1, sampled)) * 100);
    setScratchPercent(pct);

    if (pct >= 42 && !isRevealed) {
      triggerReveal();
    }
  };

  const scratchAt = (clientX: number, clientY: number) => {
    if (isRevealed) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * canvas.width;
    const y = ((clientY - rect.top) / rect.height) * canvas.height;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 42;

    ctx.beginPath();
    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
    } else {
      ctx.arc(x, y, 21, 0, Math.PI * 2);
    }
    ctx.stroke();

    lastPointRef.current = { x, y };
    spawnSparkles(x, y, 3);

    strokeCountRef.current += 1;
    if (strokeCountRef.current % 4 === 0) {
      evaluateScratchedRatio();
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLCanvasElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    isDrawingRef.current = true;
    lastPointRef.current = null;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawingRef.current) return;
    scratchAt(e.clientX, e.clientY);
  };

  const handlePointerUp = () => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    lastPointRef.current = null;
    evaluateScratchedRatio();
  };

  return (
    <section
      id="scratch-reveal"
      aria-label="Interactive Scratch to Reveal Wedding Date"
      className="relative py-20 sm:py-28 px-4 sm:px-8 velvet-burgundy text-[#FAF5EB] overflow-hidden"
    >
      <FloralCornerCluster
        variant="lotus-rose"
        position="top-left"
        className="absolute top-2 left-2 w-24 h-24 sm:w-32 sm:h-32 opacity-75"
      />
      <FloralCornerCluster
        variant="lotus-rose"
        position="top-right"
        className="absolute top-2 right-2 w-24 h-24 sm:w-32 sm:h-32 opacity-75"
      />

      <SwingingLotusGarland
        timing="b"
        className="hidden sm:block absolute top-0 left-3 lg:left-10 w-11 lg:w-14 h-36 lg:h-44 opacity-85 z-10"
      />
      <SwingingLotusGarland
        timing="c"
        flipHorizontal
        className="hidden sm:block absolute top-0 right-3 lg:right-10 w-11 lg:w-14 h-36 lg:h-44 opacity-85 z-10"
      />

      <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Unframed Royal Elephant with Banana Tree & Lotus Garden Vignette */}
        <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[340px] rounded-t-[170px] rounded-b-2xl border border-[#DFBA66]/65 bg-gradient-to-b from-[#133D38]/75 via-[#2E0812]/80 to-[#1E4D3B]/75 px-4 pt-8 pb-5 shadow-[0_24px_60px_rgba(0,0,0,0.45)] flex flex-col items-center">
            <StaticPeacockOrnament className="absolute -top-9 -right-3 sm:-right-6 w-20 sm:w-24 h-auto z-20 drop-shadow-lg" />
            <DecorativeCutout
              src={weddingConfig.decor.elephantBanana}
              alt="Traditional royal wedding elephant with golden howdah beside green banana tree and lotus flowers"
              className="w-full max-w-[300px] h-auto relative z-10"
            />
            <DecorativeCutout
              src={weddingConfig.decor.lotusCluster}
              alt=""
              className="w-36 sm:w-44 h-auto -mt-5 relative z-20"
            />
          </div>
        </div>

        {/* Interactive Royal Maroon & Gold Scratch Card */}
        <div className="lg:col-span-7 flex flex-col items-center text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-[#DFBA66] font-semibold">
            {weddingConfig.scratchCard.eyebrow}
          </p>
          <h2 className="font-calligraphy text-4xl sm:text-5xl text-[#FAF5EB] mt-2">
            Unveil Our Sacred Date
          </h2>
          <p className="text-base sm:text-lg text-[#F3E9D4]/85 mt-2 max-w-md">
            Gently rub the antique gold leaf seal below with your finger or cursor to reveal the wedding date.
          </p>

          {/* Floral Framed Scratch Container */}
          <div className="relative mt-8 w-full max-w-[460px] p-3 rounded-3xl border border-[#C49A45]/70 bg-[#460B19] shadow-[0_22px_64px_rgba(0,0,0,0.55)]">
            <FloralCornerCluster
              variant="lotus-rose"
              position="top-left"
              className="absolute -top-2 -left-2 w-16 h-16 z-20"
            />
            <FloralCornerCluster
              variant="lotus-rose"
              position="bottom-right"
              className="absolute -bottom-2 -right-2 w-16 h-16 z-20"
            />

            <div className="relative w-full h-[250px] sm:h-[265px] rounded-2xl border-2 border-[#C49A45] bg-[#FAF5EB] text-[#5C1222] overflow-hidden select-none">
              {/* Revealed Interior */}
              <div className="absolute inset-0 paper-texture flex flex-col items-center justify-center p-6 text-center">
                <p className="text-xs tracking-[0.28em] uppercase text-[#9F7624] font-semibold">
                  Save The Date
                </p>
                <p className="font-calligraphy text-4xl sm:text-5xl text-[#7A1B2E] mt-1">
                  {weddingConfig.couple.displayCalligraphy}
                </p>
                <p className="text-xs sm:text-sm font-semibold tracking-[0.22em] text-[#5C1222] mt-1">
                  {weddingConfig.scratchCard.revealedCouple}
                </p>
                <LotusDivider tone="gold" className="my-2.5" />
                <p className="text-xl sm:text-2xl font-bold tracking-[0.16em] text-[#133D38] tabular-nums">
                  {weddingConfig.scratchCard.revealedDate}
                </p>
                <p className="text-base sm:text-lg font-semibold tracking-[0.18em] text-[#7A1B2E] mt-1 tabular-nums">
                  {weddingConfig.scratchCard.revealedTime}
                </p>
              </div>

              {/* Interactive Scratch Foil Canvas */}
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onPointerCancel={handlePointerUp}
                aria-label="Scratchable golden foil surface concealing Kinjal and Dhananjay's wedding date"
                className={`absolute inset-0 w-full h-full touch-none cursor-crosshair transition-opacity duration-700 ${
                  isRevealed ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              />

              {/* Gold Sparkles Overlay */}
              <canvas
                ref={sparkleCanvasRef}
                aria-hidden="true"
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-sm text-[#F3E9D4]/85">
            {!isRevealed ? (
              <>
                <span className="tabular-nums">
                  {scratchPercent > 0 ? `${scratchPercent}% revealed` : 'Drag across the gold seal'}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setScratchPercent(100);
                    triggerReveal();
                  }}
                  className="underline underline-offset-4 text-[#DFBA66] hover:text-[#FAF5EB] transition-colors cursor-pointer py-1 px-2"
                >
                  Reveal Directly
                </button>
              </>
            ) : (
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => setShowRevealModal(true)}
                  className="px-4 py-2 rounded-full bg-[#C49A45] text-[#230910] font-semibold hover:bg-[#DFBA66] transition-colors cursor-pointer min-h-[40px]"
                >
                  View Celebration Card
                </button>
                <button
                  type="button"
                  onClick={paintGoldFoil}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C49A45]/60 text-[#DFBA66] hover:bg-[#FAF5EB]/10 transition-colors cursor-pointer min-h-[40px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Scratch Seal</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Royal Ivory Celebration Reveal Modal */}
      <AnimatePresence>
        {showRevealModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1B060B]/80"
            role="dialog"
            aria-modal="true"
            aria-labelledby="revealed-modal-title"
            onClick={() => setShowRevealModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg paper-texture rounded-3xl border-2 border-[#C49A45] p-6 sm:p-10 text-center text-[#2B1418] shadow-[0_32px_90px_rgba(0,0,0,0.6)] overflow-hidden"
            >
              <FloralCornerCluster
                variant="lotus-rose"
                position="top-left"
                className="absolute top-0 left-0 w-24 h-24 opacity-90"
              />
              <FloralCornerCluster
                variant="lotus-rose"
                position="top-right"
                className="absolute top-0 right-0 w-24 h-24 opacity-90"
              />
              <FloralCornerCluster
                variant="marigold-leaf"
                position="bottom-left"
                className="absolute bottom-0 left-0 w-20 h-20 opacity-85"
              />
              <FloralCornerCluster
                variant="marigold-leaf"
                position="bottom-right"
                className="absolute bottom-0 right-0 w-20 h-20 opacity-85"
              />

              <button
                type="button"
                onClick={() => setShowRevealModal(false)}
                aria-label="Close reveal popup"
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#FAF5EB] border border-[#C49A45]/60 text-[#5C1222] hover:bg-[#F3E9D4] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="relative z-10 pt-2">
                <HangingFloralToran tone="lotus" className="max-w-[240px] mb-2" />

                <p
                  id="revealed-modal-title"
                  className="text-xs sm:text-sm tracking-[0.26em] uppercase text-[#9F7624] font-semibold"
                >
                  {weddingConfig.scratchCard.popupHeadline}
                </p>

                <p className="font-calligraphy text-5xl sm:text-6xl text-[#7A1B2E] mt-3">
                  {weddingConfig.couple.displayCalligraphy}
                </p>

                <LotusDivider tone="gold" className="my-4" />

                <p className="text-2xl sm:text-3xl font-bold tracking-[0.12em] uppercase text-[#133D38] tabular-nums">
                  {weddingConfig.scratchCard.popupDate}
                </p>
                <p className="text-base sm:text-lg font-medium text-[#5C1222] mt-1.5">
                  {weddingConfig.scratchCard.popupTime}
                </p>
                <p className="text-sm text-[#2B1418]/75 mt-2">
                  {weddingConfig.invitation.venueFull}
                </p>

                <button
                  type="button"
                  onClick={() => setShowRevealModal(false)}
                  className="mt-7 px-7 py-3 rounded-full bg-[#7A1B2E] text-[#FAF5EB] text-sm font-semibold tracking-wider uppercase hover:bg-[#5C1222] transition-colors shadow-md cursor-pointer min-h-[44px]"
                >
                  Continue Exploring
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
