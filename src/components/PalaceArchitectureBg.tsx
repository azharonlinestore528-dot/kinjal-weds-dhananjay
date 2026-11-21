export function PalaceArchitectureBg({
  variant = 'haveli-arches',
  tone = 'ivory',
}: {
  variant?: 'haveli-arches' | 'palace-colonnade' | 'darbar-jharokha';
  tone?: 'ivory' | 'dark';
}) {
  const stroke = tone === 'dark' ? '#DFBA66' : '#9F7624';
  const fill = tone === 'dark' ? '#F3E9D4' : '#C49A45';
  const lineOpacity = tone === 'dark' ? 0.14 : 0.15;
  const fillOpacity = tone === 'dark' ? 0.045 : 0.05;

  if (variant === 'palace-colonnade') {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
      >
        <svg
          viewBox="0 0 1440 720"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
          className="w-full h-full"
        >
          {/* Distant Heritage Sandstone Domes & Chhatri Skyline */}
          <g stroke={stroke} strokeOpacity={lineOpacity} strokeWidth="1.2">
            {/* Left Chhatri Dome */}
            <path d="M90 220 Q145 155 200 220 Z" fill={fill} fillOpacity={fillOpacity} />
            <line x1="145" y1="145" x2="145" y2="170" />
            <circle cx="145" cy="142" r="3" fill={stroke} fillOpacity={lineOpacity} />
            <path d="M102 220 V380 M188 220 V380" />
            <path d="M102 250 Q145 210 188 250" />

            {/* Right Chhatri Dome */}
            <path d="M1240 220 Q1295 155 1350 220 Z" fill={fill} fillOpacity={fillOpacity} />
            <line x1="1295" y1="145" x2="1295" y2="170" />
            <circle cx="1295" cy="142" r="3" fill={stroke} fillOpacity={lineOpacity} />
            <path d="M1252 220 V380 M1338 220 V380" />
            <path d="M1252 250 Q1295 210 1338 250" />

            {/* Flanking Pillared Palace Arches */}
            <path d="M20 720 V330 C20 265 80 230 145 190 C210 230 270 265 270 330 V720" />
            <path d="M44 720 V345 C44 290 95 258 145 225 C195 258 246 290 246 345 V720" />

            <path d="M1170 720 V330 C1170 265 1230 230 1295 190 C1360 230 1420 265 1420 330 V720" />
            <path d="M1194 720 V345 C1194 290 1245 258 1295 225 C1345 258 1396 290 1396 345 V720" />

            {/* Carved Parapet & Heritage Lattice Band */}
            <line x1="0" y1="680" x2="1440" y2="680" />
            <line x1="0" y1="696" x2="1440" y2="696" strokeDasharray="8 8" />
          </g>
        </svg>
      </div>
    );
  }

  if (variant === 'darbar-jharokha') {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
      >
        <svg
          viewBox="0 0 1440 720"
          preserveAspectRatio="xMidYMid slice"
          fill="none"
          className="w-full h-full"
        >
          <g stroke={stroke} strokeOpacity={lineOpacity} strokeWidth="1.2">
            {/* Grand Central Palace Cusped Arch */}
            <path
              d="M320 720 V310 C320 210 470 150 720 75 C970 150 1120 210 1120 310 V720"
              fill={fill}
              fillOpacity={fillOpacity * 0.7}
            />
            <path d="M355 720 V320 C355 232 490 176 720 108 C950 176 1085 232 1085 320 V720" />

            {/* Left Carved Jharokha Balcony Window */}
            <g transform="translate(54, 150)">
              <rect x="0" y="55" width="130" height="210" rx="6" fill={fill} fillOpacity={fillOpacity} />
              <path d="M-10 55 Q65 15 140 55 Z" fill={fill} fillOpacity={fillOpacity} />
              <path d="M22 265 V125 C22 92 42 75 65 62 C88 75 108 92 108 125 V265" />
              <line x1="0" y1="225" x2="130" y2="225" />
            </g>

            {/* Right Carved Jharokha Balcony Window */}
            <g transform="translate(1256, 150)">
              <rect x="0" y="55" width="130" height="210" rx="6" fill={fill} fillOpacity={fillOpacity} />
              <path d="M-10 55 Q65 15 140 55 Z" fill={fill} fillOpacity={fillOpacity} />
              <path d="M22 265 V125 C22 92 42 75 65 62 C88 75 108 92 108 125 V265" />
              <line x1="0" y1="225" x2="130" y2="225" />
            </g>
          </g>
        </svg>
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none select-none absolute inset-0 overflow-hidden z-0"
    >
      <svg
        viewBox="0 0 1440 720"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        className="w-full h-full"
      >
        <g stroke={stroke} strokeOpacity={lineOpacity} strokeWidth="1.25">
          {/* Left Rajasthani Cusped Haveli Archway */}
          <path
            d="M36 720 V260 C36 185 88 145 148 105 C208 145 260 185 260 260 V720"
            fill={fill}
            fillOpacity={fillOpacity}
          />
          <path d="M64 720 V272 C64 210 105 174 148 142 C191 174 232 210 232 272 V720" />
          <path d="M98 118 Q148 64 198 118" />

          {/* Right Rajasthani Cusped Haveli Archway */}
          <path
            d="M1180 720 V260 C1180 185 1232 145 1292 105 C1352 145 1404 185 1404 260 V720"
            fill={fill}
            fillOpacity={fillOpacity}
          />
          <path d="M1208 720 V272 C1208 210 1249 174 1292 142 C1335 174 1376 210 1376 272 V720" />
          <path d="M1242 118 Q1292 64 1342 118" />

          {/* Upper Horizon Palace Dome Crest Silhouette */}
          <path d="M480 120 Q720 30 960 120" strokeDasharray="5 6" />
          <path d="M675 78 Q720 26 765 78" fill={fill} fillOpacity={fillOpacity * 0.8} />
          <line x1="720" y1="22" x2="720" y2="42" />
          <circle cx="720" cy="18" r="3" fill={stroke} fillOpacity={lineOpacity} />
        </g>
      </svg>
    </div>
  );
}
