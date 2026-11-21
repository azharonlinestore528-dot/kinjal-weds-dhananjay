import { AlertCircle, Film, ImagePlus, Loader2, Play, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';
import { FloralCornerCluster, LotusDivider, StaticPeacockCrest } from './OrnamentalMotifs';

type AspectOption = '9:16' | '16:9';

async function imageUrlToBase64(src: string): Promise<{ data: string; mimeType: string }> {
  const res = await fetch(src);
  if (!res.ok) {
    throw new Error('Could not read the selected wedding illustration.');
  }
  const blob = await res.blob();
  const mimeType = blob.type && blob.type.startsWith('image/') ? blob.type : 'image/jpeg';
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      const base64 = result.includes(',') ? result.split(',')[1] : result;
      if (!base64) {
        reject(new Error('Failed to prepare image bytes for animation.'));
        return;
      }
      resolve({ data: base64, mimeType });
    };
    reader.onerror = () => reject(new Error('Failed to encode selected image.'));
    reader.readAsDataURL(blob);
  });
}

export function RoyalKeepsakeStudio() {
  const [selectedPresetId, setSelectedPresetId] = useState<string>(
    weddingConfig.keepsakePresets[0].id
  );
  const [customPreviewUrl, setCustomPreviewUrl] = useState<string | null>(null);
  const [customBase64, setCustomBase64] = useState<{ data: string; mimeType: string } | null>(null);
  const [aspectRatio, setAspectRatio] = useState<AspectOption>('9:16');
  const [motionPrompt, setMotionPrompt] = useState<string>(
    weddingConfig.keepsakePresets[0].prompt
  );

  const [status, setStatus] = useState<'idle' | 'generating' | 'ready' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const activePreset =
    weddingConfig.keepsakePresets.find((p) => p.id === selectedPresetId) ??
    weddingConfig.keepsakePresets[0];
  const displayPreviewSrc = customPreviewUrl || activePreset.src;

  const handleSelectPreset = (presetId: string) => {
    const found = weddingConfig.keepsakePresets.find((p) => p.id === presetId);
    if (!found) return;
    setSelectedPresetId(found.id);
    setCustomPreviewUrl(null);
    setCustomBase64(null);
    setMotionPrompt(found.prompt);
    setErrorMessage(null);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setErrorMessage('Please upload a JPEG, PNG, or WebP photograph.');
      return;
    }

    if (file.size > 6 * 1024 * 1024) {
      setErrorMessage('Please select an image smaller than 6 MB.');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      const base64 = dataUrl.includes(',') ? dataUrl.split(',')[1] : '';
      if (!base64) {
        setErrorMessage('Unable to read the uploaded photograph.');
        return;
      }
      setCustomPreviewUrl(dataUrl);
      setCustomBase64({ data: base64, mimeType: file.type });
      setErrorMessage(null);
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateVideo = async () => {
    setStatus('generating');
    setErrorMessage(null);

    try {
      const payloadImage = customBase64 ?? (await imageUrlToBase64(activePreset.src));

      const response = await fetch('/api/video/animate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: payloadImage.data,
          mimeType: payloadImage.mimeType,
          aspectRatio,
          prompt:
            motionPrompt.trim() ||
            'Subtle falling rose and lotus petals drift peacefully across this Indian royal wedding keepsake.',
        }),
      });

      const result = (await response.json().catch(() => ({}))) as {
        videoDataUrl?: string;
        error?: string;
      };

      if (!response.ok || !result.videoDataUrl) {
        throw new Error(
          result.error ||
            'Unable to animate the portrait right now. Please try again in a moment.'
        );
      }

      setVideoUrl(result.videoDataUrl);
      setStatus('ready');
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : 'An unexpected error occurred while creating the silent keepsake video.';
      setErrorMessage(msg);
      setStatus('error');
    }
  };

  const handleResetVideo = () => {
    setVideoUrl(null);
    setStatus('idle');
    setErrorMessage(null);
  };

  return (
    <section
      id="keepsake-studio"
      aria-label="Photo to Video Royal Keepsake Animator"
      className="relative py-20 sm:py-28 px-4 sm:px-8 velvet-burgundy text-[#FAF5EB] overflow-hidden"
    >
      <FloralCornerCluster
        variant="lotus-rose"
        position="top-left"
        className="absolute top-0 left-0 w-24 h-24 sm:w-32 sm:h-32 opacity-75"
      />
      <FloralCornerCluster
        variant="marigold-leaf"
        position="bottom-right"
        className="absolute bottom-0 right-0 w-24 h-24 sm:w-32 sm:h-32 opacity-75"
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <StaticPeacockCrest tone="ivory" className="w-24 h-14 mx-auto mb-2" />
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#DFBA66] font-semibold">
            Silent Visual Keepsake · Motion Studio
          </p>
          <h2 className="font-calligraphy text-5xl sm:text-6xl text-[#FAF5EB] mt-2">
            Photo to Video Keepsake
          </h2>
          <LotusDivider tone="ivory" className="my-5" />
          <p className="text-base sm:text-lg text-[#F3E9D4]/85 leading-relaxed">
            Bring a royal wedding artwork or personal family photograph to life with gentle drifting
            lotus petals and palace candlelight.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 rounded-3xl border-2 border-[#C49A45]/70 bg-[#2C0811]/90 p-5 sm:p-8 lg:p-10 shadow-[0_26px_70px_rgba(0,0,0,0.48)]"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
            {/* Preview / Generated Silent Video Stage */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="w-full max-w-[440px] rounded-2xl border-2 border-[#C49A45]/75 bg-[#1B050B] overflow-hidden shadow-xl">
                {videoUrl ? (
                  <video
                    src={videoUrl}
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    aria-label="Animated silent royal wedding keepsake video"
                    className={`w-full ${
                      aspectRatio === '9:16' ? 'aspect-[9/16] max-h-[460px]' : 'aspect-video'
                    } object-cover bg-black mx-auto`}
                  />
                ) : (
                  <img
                    src={displayPreviewSrc}
                    alt="Selected wedding keepsake artwork ready to animate"
                    referrerPolicy="no-referrer"
                    className={`w-full ${
                      aspectRatio === '9:16' ? 'h-[360px] sm:h-[420px]' : 'aspect-video'
                    } object-cover block`}
                  />
                )}
              </div>

              {videoUrl && (
                <button
                  type="button"
                  onClick={handleResetVideo}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#C49A45]/60 text-xs tracking-wider uppercase text-[#DFBA66] hover:bg-[#FAF5EB]/10 transition-colors cursor-pointer min-h-[40px]"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Preview Another Portrait</span>
                </button>
              )}
            </div>

            {/* Selection Controls */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <p className="text-xs tracking-[0.22em] uppercase text-[#DFBA66] font-semibold mb-3">
                  01. Choose Artwork or Upload Photo
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {weddingConfig.keepsakePresets.map((preset) => {
                    const selected = !customPreviewUrl && selectedPresetId === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.id)}
                        className={`rounded-xl overflow-hidden border text-left transition-all cursor-pointer ${
                          selected
                            ? 'border-[#DFBA66] ring-2 ring-[#DFBA66]/50 bg-[#5C1222]'
                            : 'border-[#C49A45]/35 bg-[#1B050B]/60 hover:border-[#C49A45]/80'
                        }`}
                      >
                        <img
                          src={preset.src}
                          alt={preset.label}
                          referrerPolicy="no-referrer"
                          className="w-full h-16 object-cover"
                        />
                        <span className="block px-2 py-1.5 text-[11px] font-medium text-[#FAF5EB] truncate">
                          {preset.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <label className="mt-3 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-[#C49A45]/55 bg-[#1E060C] hover:bg-[#3A0B17] text-xs sm:text-sm font-medium text-[#F3E9D4] cursor-pointer transition-colors min-h-[44px]">
                  <ImagePlus className="w-4 h-4 text-[#DFBA66] shrink-0" />
                  <span>{customPreviewUrl ? 'Change Uploaded Photo' : 'Upload Personal Photo'}</span>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </label>
              </div>

              <div>
                <p className="text-xs tracking-[0.22em] uppercase text-[#DFBA66] font-semibold mb-2">
                  02. Video Framing
                </p>
                <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-[#1B050B] border border-[#C49A45]/40">
                  {(['9:16', '16:9'] as AspectOption[]).map((ratio) => (
                    <button
                      key={ratio}
                      type="button"
                      onClick={() => setAspectRatio(ratio)}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer whitespace-nowrap min-h-[40px] ${
                        aspectRatio === ratio
                          ? 'bg-[#C49A45] text-[#230910]'
                          : 'text-[#F3E9D4]/80 hover:text-[#FAF5EB]'
                      }`}
                    >
                      {ratio === '9:16' ? 'Portrait 9:16' : 'Landscape 16:9'}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="keepsake-motion-prompt"
                  className="block text-xs tracking-[0.22em] uppercase text-[#DFBA66] font-semibold mb-2"
                >
                  03. Gentle Motion Scene
                </label>
                <textarea
                  id="keepsake-motion-prompt"
                  rows={3}
                  value={motionPrompt}
                  onChange={(e) => setMotionPrompt(e.target.value)}
                  className="w-full rounded-xl border border-[#C49A45]/50 bg-[#1B050B] px-4 py-3 text-sm sm:text-base text-[#FAF5EB] placeholder:text-[#F3E9D4]/45 focus:outline-none focus:border-[#DFBA66]"
                  placeholder="Describe gentle falling petals, swaying garlands, or warm diya candlelight..."
                />
              </div>

              {errorMessage && (
                <div
                  role="alert"
                  className="rounded-xl border border-[#E8839B]/60 bg-[#4E101E] px-4 py-3 text-sm text-[#FAD4DF] flex items-start gap-2.5"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-[#E8839B]" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="pt-1 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={handleGenerateVideo}
                  disabled={status === 'generating'}
                  className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#C49A45] hover:bg-[#DFBA66] disabled:opacity-60 disabled:cursor-not-allowed text-[#230910] text-sm font-semibold tracking-wider uppercase shadow-xl transition-colors cursor-pointer whitespace-nowrap min-h-[48px]"
                >
                  {status === 'generating' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Animating Keepsake...</span>
                    </>
                  ) : (
                    <>
                      {videoUrl ? <Play className="w-4 h-4" /> : <Film className="w-4 h-4" />}
                      <span>{videoUrl ? 'Create Another Clip' : 'Animate Wedding Photo'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
