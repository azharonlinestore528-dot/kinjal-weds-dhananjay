export function LotusDivider({
  tone = 'gold',
  className = '',
}: {
  tone?: 'gold' | 'burgundy' | 'ivory' | 'saffron';
  className?: string;
}) {
  const stroke =
    tone === 'ivory'
      ? '#FAF5EB'
      : tone === 'burgundy'
      ? '#7A1B2E'
      : tone === 'saffron'
      ? '#B45309'
      : '#C49A45';
  const petalFill = tone === 'ivory' ? '#F7D0D8' : tone === 'saffron' ? '#F59E0B' : '#E8839B';

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <div className="h-px w-12 sm:w-24" style={{ backgroundColor: stroke, opacity: 0.45 }} />
      <svg width="54" height="32" viewBox="0 0 54 32" fill="none">
        <path
          d="M27 4C30.4 10.6 31 18.2 27 25C23 18.2 23.6 10.6 27 4Z"
          fill={petalFill}
          stroke={stroke}
          strokeWidth="1"
        />
        <path
          d="M27 25C20 22.3 15.8 15.6 16.4 8.8C20.8 11.6 24.4 17.2 27 25Z"
          fill={petalFill}
          fillOpacity="0.82"
          stroke={stroke}
          strokeWidth="1"
        />
        <path
          d="M27 25C34 22.3 38.2 15.6 37.6 8.8C33.2 11.6 29.6 17.2 27 25Z"
          fill={petalFill}
          fillOpacity="0.82"
          stroke={stroke}
          strokeWidth="1"
        />
        <path
          d="M27 25C17.8 25 11 21.2 8.5 14.8C14.4 15.4 21 19 27 25Z"
          fill="#4F7750"
          fillOpacity="0.75"
          stroke={stroke}
          strokeWidth="0.9"
        />
        <path
          d="M27 25C36.2 25 43 21.2 45.5 14.8C39.6 15.4 33 19 27 25Z"
          fill="#4F7750"
          fillOpacity="0.75"
          stroke={stroke}
          strokeWidth="0.9"
        />
        <circle cx="27" cy="27" r="2.2" fill={stroke} />
      </svg>
      <div className="h-px w-12 sm:w-24" style={{ backgroundColor: stroke, opacity: 0.45 }} />
    </div>
  );
}

export function FloralCornerCluster({
  variant = 'lotus-rose',
  position = 'top-left',
  className = '',
}: {
  variant?: 'lotus-rose' | 'marigold-leaf' | 'jasmine-saffron';
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}) {
  const flipClass =
    position === 'top-right'
      ? '-scale-x-100'
      : position === 'bottom-left'
      ? '-scale-y-100'
      : position === 'bottom-right'
      ? '-scale-x-100 -scale-y-100'
      : '';

  const primaryPetal =
    variant === 'marigold-leaf'
      ? '#F59E0B'
      : variant === 'jasmine-saffron'
      ? '#FAF5EB'
      : '#E8839B';
  const secondaryPetal =
    variant === 'marigold-leaf'
      ? '#FBBF24'
      : variant === 'jasmine-saffron'
      ? '#F59E0B'
      : '#D96581';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 110 110"
      fill="none"
      className={`pointer-events-none select-none ${flipClass} ${className}`}
    >
      {/* Botanical Arching Stem */}
      <path
        d="M8 92 C12 46 36 16 94 10"
        stroke="#4F7750"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeOpacity="0.8"
      />
      <path
        d="M14 68 C22 46 42 26 70 20"
        stroke="#C49A45"
        strokeWidth="1"
        strokeOpacity="0.65"
      />
      {/* Botanical Leaves */}
      <path d="M24 44 C12 36 12 24 26 28 C30 34 28 40 24 44 Z" fill="#4F7750" fillOpacity="0.82" />
      <path d="M44 26 C38 12 52 8 56 20 C52 24 48 26 44 26 Z" fill="#3B623E" fillOpacity="0.82" />
      <path d="M18 64 C6 60 6 48 18 52 C22 56 22 60 18 64 Z" fill="#5D875E" fillOpacity="0.8" />
      <path d="M68 18 C70 6 82 6 80 18 C76 20 72 20 68 18 Z" fill="#4F7750" fillOpacity="0.78" />

      {/* Main Corner Blossom (Lotus / Marigold / Jasmine) */}
      <g transform="translate(26, 26)">
        <circle cx="0" cy="0" r="14" fill={primaryPetal} fillOpacity="0.25" />
        <path d="M0 -14 C5 -6 5 4 0 8 C-5 4 -5 -6 0 -14 Z" fill={primaryPetal} stroke="#C49A45" strokeWidth="0.7" />
        <path d="M-12 -5 C-4 -6 2 -1 2 6 C-5 6 -11 1 -12 -5 Z" fill={secondaryPetal} stroke="#C49A45" strokeWidth="0.7" />
        <path d="M12 -5 C4 -6 -2 -1 -2 6 C5 6 11 1 12 -5 Z" fill={secondaryPetal} stroke="#C49A45" strokeWidth="0.7" />
        <circle cx="0" cy="1" r="3" fill="#DFBA66" />
      </g>

      {/* Secondary Blossom Bud */}
      <g transform="translate(52, 16) rotate(22)">
        <path d="M0 -8 C3 -3 3 2 0 5 C-3 2 -3 -3 0 -8 Z" fill={secondaryPetal} />
        <circle cx="0" cy="4" r="2" fill="#4F7750" />
      </g>
      <g transform="translate(15, 52) rotate(-32)">
        <path d="M0 -8 C3 -3 3 2 0 5 C-3 2 -3 -3 0 -8 Z" fill={primaryPetal} />
        <circle cx="0" cy="4" r="2" fill="#4F7750" />
      </g>
    </svg>
  );
}

export function HangingFloralToran({
  tone = 'lotus',
  className = '',
}: {
  tone?: 'lotus' | 'marigold';
  className?: string;
}) {
  const flowerA = tone === 'marigold' ? '#F59E0B' : '#E8839B';
  const flowerB = tone === 'marigold' ? '#FBBF24' : '#FAF5EB';
  const bellColor = '#C49A45';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 560 58"
      fill="none"
      className={`w-full max-w-xl mx-auto pointer-events-none select-none ${className}`}
    >
      {/* Draped Garland Swags */}
      <path
        d="M10 6 Q95 38 185 8 Q280 42 375 8 Q465 38 550 6"
        stroke="#4F7750"
        strokeWidth="2.5"
        fill="none"
      />
      {[46, 95, 144, 232, 280, 328, 416, 465, 514].map((x, idx) => {
        const y = idx % 3 === 1 ? 24 : 16;
        return (
          <g key={x} transform={`translate(${x}, ${y})`}>
            <circle cx="0" cy="0" r="6.5" fill={idx % 2 === 0 ? flowerA : flowerB} stroke="#C49A45" strokeWidth="0.7" />
            <circle cx="0" cy="0" r="2" fill="#DFBA66" />
          </g>
        );
      })}
      {/* Hanging Floral Strings */}
      {[185, 280, 375].map((x) => (
        <g key={x} transform={`translate(${x}, 10)`}>
          <line x1="0" y1="0" x2="0" y2="34" stroke="#4F7750" strokeWidth="1.2" />
          <circle cx="0" cy="14" r="4.5" fill={flowerB} stroke="#C49A45" strokeWidth="0.6" />
          <circle cx="0" cy="25" r="5" fill={flowerA} stroke="#C49A45" strokeWidth="0.6" />
          <path d="M-4 34 L4 34 L6 42 L-6 42 Z" fill={bellColor} />
        </g>
      ))}
    </svg>
  );
}

export function SacredKalashMandala({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 400"
      fill="none"
      className={className}
      role="img"
      aria-label="Sacred Mangal Kalash and golden lotus mandala artwork for Grah Shanti Puja"
    >
      <rect x="8" y="8" width="304" height="384" rx="16" fill="#FBF5E8" stroke="#C49A45" strokeWidth="2" />
      <rect x="18" y="18" width="284" height="364" rx="12" stroke="#C49A45" strokeWidth="1" strokeDasharray="4 4" />

      {/* Concentric Sacred Mandala behind Kalash */}
      <g transform="translate(160, 178)">
        <circle cx="0" cy="0" r="108" fill="#F5E7C6" fillOpacity="0.65" stroke="#C49A45" strokeWidth="1.2" />
        <circle cx="0" cy="0" r="88" stroke="#D97706" strokeWidth="1" strokeOpacity="0.5" />
        {Array.from({ length: 12 }).map((_, idx) => {
          const angle = idx * 30;
          return (
            <g key={idx} transform={`rotate(${angle})`}>
              <path
                d="M0 -106 C10 -88 10 -70 0 -58 C-10 -70 -10 -88 0 -106 Z"
                fill="#E8839B"
                fillOpacity="0.32"
                stroke="#C49A45"
                strokeWidth="0.9"
              />
              <circle cx="0" cy="-94" r="2.2" fill="#D97706" />
            </g>
          );
        })}
        <circle cx="0" cy="0" r="56" fill="#FAF5EB" stroke="#C49A45" strokeWidth="1.5" />
      </g>

      {/* Mango Leaves */}
      <g transform="translate(160, 175)">
        <path d="M-26 -24 C-42 -58 -24 -76 -8 -44 Z" fill="#3F6212" />
        <path d="M26 -24 C42 -58 24 -76 8 -44 Z" fill="#3F6212" />
        <path d="M-42 -12 C-66 -38 -52 -58 -22 -28 Z" fill="#4F7750" />
        <path d="M42 -12 C66 -38 52 -58 22 -28 Z" fill="#4F7750" />
        <path d="M0 -30 C-10 -68 10 -68 0 -30 Z" fill="#4F7750" />

        {/* Sacred Coconut */}
        <ellipse cx="0" cy="-26" rx="22" ry="26" fill="#7C4A26" stroke="#C49A45" strokeWidth="1.5" />
        <path d="M-8 -18 L8 -18 M0 -26 L0 -10" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />

        {/* Brass & Copper Kalash Vessel */}
        <path
          d="M-28 -10 C-22 2 -48 16 -44 48 C-40 72 -18 82 0 82 C18 82 40 72 44 48 C48 16 22 2 28 -10 Z"
          fill="#D97706"
          stroke="#78350F"
          strokeWidth="2"
        />
        <ellipse cx="0" cy="-10" rx="28" ry="6" fill="#F59E0B" stroke="#78350F" strokeWidth="1.5" />
        <path d="M-38 36 Q0 48 38 36" stroke="#FDE68A" strokeWidth="2.5" fill="none" />
        <circle cx="0" cy="54" r="8" fill="#FAF5EB" stroke="#7A1B2E" strokeWidth="1.5" />
        <circle cx="0" cy="54" r="3" fill="#D97706" />

        {/* Pedestal */}
        <rect x="-32" y="82" width="64" height="10" rx="4" fill="#C49A45" />
      </g>

      {/* Flanking Brass Diyas & Lotus Blossoms */}
      {[72, 248].map((dx) => (
        <g key={dx} transform={`translate(${dx}, 288)`}>
          <path d="M-16 0 L16 0 L10 12 L-10 12 Z" fill="#C49A45" stroke="#78350F" strokeWidth="1" />
          <path d="M0 -18 C5 -10 5 -3 0 0 C-5 -3 -5 -10 0 -18 Z" fill="#F59E0B" />
          <path d="M0 -13 C3 -8 3 -3 0 -1 C-3 -3 -3 -8 0 -13 Z" fill="#FEF3C7" />
        </g>
      ))}

      {/* Bottom Lotus Garland */}
      <g transform="translate(160, 336)">
        <path d="M-85 0 Q0 24 85 0" stroke="#4F7750" strokeWidth="2" fill="none" />
        {[-60, -30, 0, 30, 60].map((lx, i) => (
          <g key={lx} transform={`translate(${lx}, ${i === 2 ? 12 : Math.abs(i - 2) === 1 ? 8 : 3})`}>
            <circle cx="0" cy="0" r="8" fill={i % 2 === 0 ? '#E8839B' : '#F59E0B'} stroke="#C49A45" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="2.5" fill="#FAF5EB" />
          </g>
        ))}
      </g>
    </svg>
  );
}

export function StaticPeacockCrest({
  tone = 'gold',
  className = '',
}: {
  tone?: 'gold' | 'ivory';
  className?: string;
}) {
  const featherColor = tone === 'ivory' ? '#DFBA66' : '#133D38';
  const accentColor = tone === 'ivory' ? '#F7D0D8' : '#C49A45';
  const neckColor = tone === 'ivory' ? '#FAF5EB' : '#1E4D3B';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 68"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Fanned Royal Peacock Plumes */}
      {[-42, -26, -12, 0, 12, 26, 42].map((angle, idx) => (
        <g key={angle} transform={`translate(60, 50) rotate(${angle})`}>
          <path
            d="M0 0 C-4 -14 -4 -28 0 -38 C4 -28 4 -14 0 0 Z"
            fill={featherColor}
            fillOpacity={idx % 2 === 0 ? 0.24 : 0.36}
            stroke={accentColor}
            strokeWidth="0.9"
          />
          <circle cx="0" cy="-31" r="2.6" fill={accentColor} />
          <circle cx="0" cy="-31" r="1.2" fill="#E8839B" />
        </g>
      ))}

      {/* Graceful Static Peacock Silhouette */}
      <path
        d="M57 52 C54 43 53 33 57 25 C59 21 63 20 65 23 C67 25 65 28 63 29 C61 35 63 44 66 52 Z"
        fill={neckColor}
        stroke={accentColor}
        strokeWidth="1"
      />
      {/* Beak & Crown */}
      <path d="M65 23 L71 24 L65 26 Z" fill={accentColor} />
      <path d="M60 21 L57 14 M62 20 L62 13 M64 21 L66 15" stroke={accentColor} strokeWidth="0.9" />
      <circle cx="57" cy="14" r="1.1" fill="#E8839B" />
      <circle cx="62" cy="13" r="1.1" fill={accentColor} />
      <circle cx="66" cy="15" r="1.1" fill="#E8839B" />

      {/* Lotus Pedestal Flourish */}
      <path d="M36 56 Q60 49 84 56" stroke={accentColor} strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="60" cy="54" r="3" fill="#E8839B" stroke={accentColor} strokeWidth="0.8" />
    </svg>
  );
}

export function FloralJhoomar({
  variant = 'marigold',
  className = '',
}: {
  variant?: 'marigold' | 'lotus' | 'royal-maroon';
  className?: string;
}) {
  const flowerA =
    variant === 'marigold' ? '#F59E0B' : variant === 'royal-maroon' ? '#E8839B' : '#F48FB1';
  const flowerB =
    variant === 'marigold' ? '#FACC15' : variant === 'royal-maroon' ? '#FAF5EB' : '#FBBF24';
  const accent =
    variant === 'royal-maroon' ? '#7A1B2E' : variant === 'lotus' ? '#B45309' : '#1E4D3B';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 88 180"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Hanging Golden Cord */}
      <line x1="44" y1="0" x2="44" y2="20" stroke="#DFBA66" strokeWidth="2" />
      <circle cx="44" cy="22" r="4" fill="#FAF5EB" stroke="#C49A45" strokeWidth="1" />

      {/* Ornate Golden Jhoomar Canopy */}
      <path
        d="M14 48 Q44 20 74 48 Z"
        fill={accent}
        stroke="#DFBA66"
        strokeWidth="1.8"
      />
      <path
        d="M22 48 Q44 30 66 48"
        stroke="#DFBA66"
        strokeWidth="1.2"
        fill="none"
      />

      {/* Mango Leaves along Canopy Rim */}
      {[20, 32, 44, 56, 68].map((lx) => (
        <path
          key={lx}
          d={`M${lx} 48 C${lx - 4} 57 ${lx - 2} 63 ${lx} 65 C${lx + 2} 63 ${lx + 4} 57 ${lx} 48 Z`}
          fill="#4F7750"
          stroke="#1E4D3B"
          strokeWidth="0.6"
        />
      ))}

      {/* Three Cascading Floral Ladi Strands */}
      {[
        { x: 24, endY: 132 },
        { x: 44, endY: 164 },
        { x: 64, endY: 132 },
      ].map((strand, sIdx) => (
        <g key={strand.x}>
          <line
            x1={strand.x}
            y1="52"
            x2={strand.x}
            y2={strand.endY - 12}
            stroke="#C49A45"
            strokeWidth="1"
          />
          {Array.from({ length: sIdx === 1 ? 5 : 4 }).map((_, i) => {
            const cy = 66 + i * 20;
            const fill = (i + sIdx) % 2 === 0 ? flowerA : flowerB;
            return (
              <g key={cy}>
                <circle cx={strand.x} cy={cy} r="6.5" fill={fill} stroke="#C49A45" strokeWidth="0.7" />
                <circle cx={strand.x} cy={cy} r="2" fill="#FAF5EB" />
              </g>
            );
          })}
          {/* Gold Bell & Floral Tassel */}
          <path
            d={`M${strand.x - 5} ${strand.endY - 14} L${strand.x + 5} ${strand.endY - 14} L${strand.x + 7} ${strand.endY - 5} L${strand.x - 7} ${strand.endY - 5} Z`}
            fill="#DFBA66"
            stroke="#9F7624"
            strokeWidth="0.8"
          />
          <circle cx={strand.x} cy={strand.endY} r="3.5" fill={flowerA} />
        </g>
      ))}
    </svg>
  );
}

export function SilkRibbonBow({
  variant = 'gold',
  className = '',
}: {
  variant?: 'saffron' | 'haldi' | 'gold' | 'maroon';
  className?: string;
}) {
  const palette =
    variant === 'saffron'
      ? { ribbon: '#D97706', shade: '#9A3412', trim: '#FDE68A' }
      : variant === 'haldi'
      ? { ribbon: '#EAB308', shade: '#A16207', trim: '#FEF9C3' }
      : variant === 'maroon'
      ? { ribbon: '#7A1B2E', shade: '#4A0B18', trim: '#DFBA66' }
      : { ribbon: '#C49A45', shade: '#8A631B', trim: '#FAF5EB' };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 180 64"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      {/* Flowing Left & Right Ribbon Tails */}
      <path
        d="M84 28 C66 42 54 54 38 60 L48 48 L34 45 C52 38 68 30 84 24 Z"
        fill={palette.shade}
        stroke={palette.trim}
        strokeWidth="0.9"
      />
      <path
        d="M96 28 C114 42 126 54 142 60 L132 48 L146 45 C128 38 112 30 96 24 Z"
        fill={palette.shade}
        stroke={palette.trim}
        strokeWidth="0.9"
      />
      {/* Left Loop */}
      <path
        d="M86 24 C66 6 36 10 38 26 C40 40 66 38 86 28 Z"
        fill={palette.ribbon}
        stroke={palette.trim}
        strokeWidth="1.2"
      />
      {/* Right Loop */}
      <path
        d="M94 24 C114 6 144 10 142 26 C140 40 114 38 94 28 Z"
        fill={palette.ribbon}
        stroke={palette.trim}
        strokeWidth="1.2"
      />
      {/* Center Gold-Trimmed Silk Knot */}
      <rect
        x="82"
        y="17"
        width="16"
        height="16"
        rx="5"
        fill={palette.ribbon}
        stroke={palette.trim}
        strokeWidth="1.4"
      />
      <circle cx="90" cy="25" r="3" fill={palette.trim} />
    </svg>
  );
}

export function SacredGaneshaMedallion({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 112 112"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      <circle cx="56" cy="56" r="50" fill="#FFF7E2" stroke="#D97706" strokeWidth="1.8" />
      <circle cx="56" cy="56" r="43" stroke="#C49A45" strokeWidth="1" strokeDasharray="3 3" />
      {/* Stylized Auspicious Temple Crown, Tilak & Swastik-Free Lotus Arc Motif */}
      <path
        d="M34 62 C34 44 44 32 56 32 C68 32 78 44 78 62"
        stroke="#B45309"
        strokeWidth="1.8"
        fill="#FDE68A"
        fillOpacity="0.4"
      />
      {/* Crown */}
      <path d="M46 32 L56 19 L66 32 Z" fill="#D97706" stroke="#7C2D12" strokeWidth="1" />
      {/* Sacred Tilak Crest & Lotus Base */}
      <path d="M56 38 C59 44 59 50 56 54 C53 50 53 44 56 38 Z" fill="#7C2D12" />
      <path d="M44 56 Q56 68 68 56" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M56 62 C64 62 67 70 61 74 C57 76 53 74 53 71" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />
      {/* Lotus Petal Halo Base */}
      <path d="M36 78 Q56 88 76 78" stroke="#4F7750" strokeWidth="1.6" />
      <circle cx="42" cy="79" r="3.5" fill="#E8839B" />
      <circle cx="56" cy="83" r="4" fill="#F59E0B" />
      <circle cx="70" cy="79" r="3.5" fill="#E8839B" />
    </svg>
  );
}

export function HaldiSunflowerMedallion({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 112 112"
      fill="none"
      className={`pointer-events-none select-none ${className}`}
    >
      <circle cx="56" cy="56" r="48" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="1.6" />
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = (i * 360) / 14;
        return (
          <g key={i} transform={`translate(56, 56) rotate(${angle})`}>
            <path
              d="M0 -42 C6 -29 6 -16 0 -10 C-6 -16 -6 -29 0 -42 Z"
              fill={i % 2 === 0 ? '#FACC15' : '#F59E0B'}
              stroke="#B45309"
              strokeWidth="0.7"
            />
          </g>
        );
      })}
      <circle cx="56" cy="56" r="17" fill="#92400E" stroke="#FDE047" strokeWidth="2" />
      <circle cx="56" cy="56" r="10" fill="#B45309" />
      <circle cx="51" cy="52" r="1.8" fill="#FEF08A" />
      <circle cx="60" cy="53" r="1.8" fill="#FEF08A" />
      <circle cx="55" cy="60" r="1.8" fill="#FEF08A" />
      <path d="M24 84 C34 74 44 82 38 92 C31 92 26 88 24 84 Z" fill="#4F7750" />
      <path d="M88 84 C78 74 68 82 74 92 C81 92 86 88 88 84 Z" fill="#4F7750" />
    </svg>
  );
}


