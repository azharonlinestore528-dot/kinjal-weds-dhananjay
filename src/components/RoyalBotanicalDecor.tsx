import { useState } from 'react';
import { weddingConfig } from '../config/weddingConfig';

export function DecorativeCutout({
  src,
  alt,
  className = '',
  flipHorizontal = false,
}: {
  src: string;
  alt: string;
  className?: string;
  flipHorizontal?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-contain pointer-events-none select-none ${
        flipHorizontal ? '-scale-x-100' : ''
      } ${className}`}
    />
  );
}

export function SwingingLotusGarland({
  timing = 'a',
  className = '',
  flipHorizontal = false,
}: {
  timing?: 'a' | 'b' | 'c';
  className?: string;
  flipHorizontal?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  const swingClass =
    timing === 'a'
      ? 'animate-lotus-swing-a'
      : timing === 'b'
      ? 'animate-lotus-swing-b'
      : 'animate-lotus-swing-c';

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none select-none ${swingClass} ${className}`}
    >
      <img
        src={weddingConfig.decor.hangingLotus}
        alt=""
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className={`w-full h-full object-contain ${flipHorizontal ? '-scale-x-100' : ''}`}
      />
    </div>
  );
}

export function StaticPeacockOrnament({
  className = '',
  flipHorizontal = false,
}: {
  className?: string;
  flipHorizontal?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  return (
    <img
      src={weddingConfig.decor.royalPeacock}
      alt="Traditional Rajasthani static royal peacock illustration perched on a lotus branch"
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`object-contain pointer-events-none select-none ${
        flipHorizontal ? '-scale-x-100' : ''
      } ${className}`}
    />
  );
}
