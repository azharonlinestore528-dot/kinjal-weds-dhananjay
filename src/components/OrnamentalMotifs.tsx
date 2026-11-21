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

export function RoyalElephantIllustration({
  facing = 'right',
  withHowdah = false,
  className = '',
}: {
  facing?: 'left' | 'right';
  withHowdah?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 185"
      fill="none"
      className={`${facing === 'left' ? '-scale-x-100' : ''} ${className}`}
      role="img"
      aria-label={
        withHowdah
          ? 'Royal Indian wedding elephant carrying golden howdah'
          : 'Caparisoned royal Indian wedding elephant'
      }
    >
      <ellipse cx="108" cy="172" rx="68" ry="8" fill="#1E1410" fillOpacity="0.18" />

      <g className="animate-elephant-walk">
        <rect x="64" y="126" width="17" height="40" rx="7" fill="#7D7A77" />
        <rect x="118" y="126" width="17" height="40" rx="7" fill="#7D7A77" />
        <rect x="63" y="156" width="19" height="4.5" rx="2" fill="#C49A45" />
        <rect x="117" y="156" width="19" height="4.5" rx="2" fill="#C49A45" />

        <path
          d="M52 96 Q38 112 42 132"
          stroke="#6E6B68"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="42" cy="134" r="4" fill="#7A1B2E" stroke="#C49A45" strokeWidth="1" />

        <ellipse cx="102" cy="105" rx="50" ry="36" fill="#8C8986" />

        <rect x="78" y="128" width="18" height="42" rx="7.5" fill="#94918E" />
        <rect x="132" y="128" width="18" height="42" rx="7.5" fill="#94918E" />
        <rect x="77" y="159" width="20" height="4.5" rx="2" fill="#C49A45" />
        <rect x="131" y="159" width="20" height="4.5" rx="2" fill="#C49A45" />

        <path
          d="M62 76 C84 68 122 68 140 78 L142 126 C122 134 82 134 62 126 Z"
          fill="#7A1B2E"
          stroke="#C49A45"
          strokeWidth="2.5"
        />
        <path
          d="M68 84 C88 78 118 78 134 86 L134 118 C118 124 86 124 68 118 Z"
          fill="#133D38"
          stroke="#E8839B"
          strokeWidth="1.2"
        />
        <circle cx="101" cy="101" r="10" fill="#C49A45" fillOpacity="0.28" stroke="#C49A45" strokeWidth="1.2" />
        <circle cx="101" cy="101" r="4" fill="#E8839B" />
        <path
          d="M66 127 L66 133 M76 129 L76 135 M86 130 L86 136 M96 131 L96 137 M106 131 L106 137 M116 130 L116 136 M126 129 L126 135 M136 127 L136 133"
          stroke="#DFBA66"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {withHowdah ? (
          <g>
            <rect x="74" y="54" width="54" height="18" rx="4" fill="#C49A45" stroke="#5C1222" strokeWidth="1.5" />
            <rect x="78" y="24" width="4" height="32" fill="#DFBA66" />
            <rect x="120" y="24" width="4" height="32" fill="#DFBA66" />
            <circle cx="94" cy="40" r="5" fill="#F2C8A2" />
            <path d="M89 37 Q94 31 99 37 Z" fill="#7A1B2E" />
            <path d="M88 54 L90 45 L98 45 L100 54 Z" fill="#FAF5EB" stroke="#C49A45" strokeWidth="0.8" />
            <circle cx="108" cy="41" r="4.8" fill="#F2C8A2" />
            <path d="M103 39 Q108 33 113 42 L114 54 L102 54 Z" fill="#B63D57" />
            <path d="M72 25 Q101 10 130 25 Z" fill="#7A1B2E" stroke="#DFBA66" strokeWidth="1.8" />
            <path d="M86 17 Q101 4 116 17 Z" fill="#DFBA66" />
            <line x1="101" y1="2" x2="101" y2="9" stroke="#C49A45" strokeWidth="2" />
            <circle cx="101" cy="2" r="2.2" fill="#DFBA66" />
          </g>
        ) : (
          <g>
            <ellipse cx="101" cy="68" rx="14" ry="5" fill="#C49A45" />
            <circle cx="95" cy="59" r="5.5" fill="#E8839B" />
            <circle cx="107" cy="59" r="5.5" fill="#F7D0D8" />
            <circle cx="101" cy="53" r="6" fill="#D96581" />
          </g>
        )}

        <circle cx="152" cy="88" r="24" fill="#969390" />
        <path
          d="M138 68 Q154 57 170 72 L166 83 Q152 75 138 79 Z"
          fill="#7A1B2E"
          stroke="#DFBA66"
          strokeWidth="1.8"
        />
        <circle cx="156" cy="70" r="3.2" fill="#DFBA66" />

        <ellipse cx="137" cy="89" rx="11" ry="15" fill="#7F7C79" stroke="#C49A45" strokeWidth="1.5" />
        <ellipse cx="137" cy="89" rx="6" ry="9" fill="#E8839B" fillOpacity="0.45" />

        <circle cx="161" cy="82" r="2.4" fill="#2B1418" />
        <circle cx="161.8" cy="81.2" r="0.8" fill="#FAF5EB" />
        <path d="M167 74 L167 80" stroke="#DFBA66" strokeWidth="1.6" strokeLinecap="round" />

        <path
          d="M162 96 Q178 101 183 90"
          stroke="#FAF5EB"
          strokeWidth="4.5"
          strokeLinecap="round"
        />
        <circle cx="172" cy="97" r="2.2" fill="#C49A45" />

        <g className="animate-trunk-sway">
          <path
            d="M170 92 C188 100 192 124 182 135 C176 141 169 135 174 128"
            stroke="#94918E"
            strokeWidth="11"
            strokeLinecap="round"
            fill="none"
          />
          <path d="M178 104 L186 101" stroke="#DFBA66" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M182 117 L190 116" stroke="#DFBA66" strokeWidth="2.5" strokeLinecap="round" />
          <g transform="translate(173, 126)">
            <path d="M0 -11 C4 -6 4 0 0 4 C-4 0 -4 -6 0 -11 Z" fill="#E8839B" />
            <path d="M0 4 C-6 1 -9 -4 -7 -8 C-3 -5 -1 -1 0 4 Z" fill="#F49BB1" />
            <path d="M0 4 C6 1 9 -4 7 -8 C3 -5 1 -1 0 4 Z" fill="#F49BB1" />
          </g>
        </g>
      </g>
    </svg>
  );
}

export function MiniatureMusiciansIllustration({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 240 120"
      fill="none"
      className={className}
      role="img"
      aria-label="Traditional Indian miniature wedding musicians playing shehnai and dholak"
    >
      <rect x="20" y="96" width="200" height="12" rx="4" fill="#7A1B2E" stroke="#C49A45" strokeWidth="1.2" />

      <g className="animate-gentle-sway">
        <path d="M52 96 L58 64 L78 64 L84 96 Z" fill="#F3E9D4" stroke="#C49A45" strokeWidth="1.2" />
        <path d="M56 76 L80 76" stroke="#7A1B2E" strokeWidth="4" />
        <circle cx="68" cy="52" r="9" fill="#E9B890" />
        <path d="M58 49 Q68 36 78 49 Q74 44 62 45 Z" fill="#E8839B" stroke="#C49A45" strokeWidth="1" />
        <circle cx="71" cy="42" r="2.2" fill="#DFBA66" />
        <path d="M75 56 L104 68 L108 64 L77 54 Z" fill="#C49A45" />
      </g>

      <g transform="translate(118, 70)">
        <path d="M-9 26 L-6 12 L6 12 L9 26 Z" fill="#C49A45" />
        <circle cx="-5" cy="8" r="5" fill="#E8839B" />
        <circle cx="5" cy="8" r="5" fill="#F7D0D8" />
        <circle cx="0" cy="3" r="5.5" fill="#D96581" />
      </g>

      <g className="animate-gentle-sway" style={{ animationDelay: '1.1s' }}>
        <path d="M154 96 L160 64 L180 64 L186 96 Z" fill="#1E4D3B" stroke="#C49A45" strokeWidth="1.2" />
        <circle cx="170" cy="52" r="9" fill="#E9B890" />
        <path d="M160 49 Q170 36 180 49 Z" fill="#DFBA66" stroke="#7A1B2E" strokeWidth="1" />
        <ellipse cx="152" cy="80" rx="13" ry="8" fill="#8E4E2A" stroke="#DFBA66" strokeWidth="1.5" />
        <line x1="144" y1="74" x2="148" y2="86" stroke="#FAF5EB" strokeWidth="1.2" />
        <line x1="152" y1="72" x2="156" y2="88" stroke="#FAF5EB" strokeWidth="1.2" />
        <line x1="160" y1="74" x2="158" y2="86" stroke="#FAF5EB" strokeWidth="1.2" />
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

