interface GreekPedestalProps {
  accessionNumber: string;
  name: string;
  isCompleted?: boolean;
}

export function GreekPedestal({
  accessionNumber,
  name,
  isCompleted = false,
}: GreekPedestalProps) {
  return (
    <div className="exhibit-pedestal">
      <svg
        viewBox="0 0 220 170"
        className="greek-pedestal-svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="stoneCyl" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#857E74" />
            <stop offset="28%" stopColor="#B8B2A7" />
            <stop offset="55%" stopColor="#CFC9BD" />
            <stop offset="82%" stopColor="#9A9388" />
            <stop offset="100%" stopColor="#6E675E" />
          </linearGradient>
          <linearGradient id="stoneCap" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#7C756B" />
            <stop offset="45%" stopColor="#C7C1B5" />
            <stop offset="100%" stopColor="#6A635A" />
          </linearGradient>
          <linearGradient id="fluteShadow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#4A433B" stopOpacity="0.55" />
            <stop offset="50%" stopColor="#E6E1D5" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3B352E" stopOpacity="0.45" />
          </linearGradient>
        </defs>

        {/* Abacus (Top slab) */}
        <rect x="14" y="4" width="192" height="12" fill="url(#stoneCap)" stroke="#4A433B" strokeWidth="1" />
        <rect x="14" y="4" width="192" height="2" fill="#E6E1D5" opacity="0.45" />

        {/* Echinus (Classical tapered capital) */}
        <polygon points="22,16 198,16 184,30 36,30" fill="url(#stoneCap)" stroke="#4A433B" strokeWidth="1" />
        {/* Necking astragal ring */}
        <rect x="34" y="30" width="152" height="5" rx="2" fill="#9E978C" stroke="#4A433B" strokeWidth="0.8" />

        {/* Solid Fluted Column Shaft */}
        <rect x="38" y="35" width="144" height="106" fill="url(#stoneCyl)" stroke="#4A433B" strokeWidth="1" />
        {/* 9 Carved Vertical Flutes */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <rect
            key={i}
            x={46 + i * 14.5}
            y="40"
            width="10"
            height="96"
            rx="4"
            fill="url(#fluteShadow)"
          />
        ))}

        {/* Base Torus Moldings */}
        <rect x="30" y="141" width="160" height="7" rx="3" fill="url(#stoneCap)" stroke="#4A433B" strokeWidth="0.9" />
        <polygon points="26,148 194,148 202,155 18,155" fill="#9E978C" stroke="#4A433B" strokeWidth="0.9" />

        {/* Stepped Plinth Base */}
        <rect x="12" y="155" width="196" height="13" fill="url(#stoneCap)" stroke="#3B352E" strokeWidth="1.2" />
      </svg>

      {/* Institutional Accession Plaque */}
      <div className="pedestal-plaque">
        <span className="archival-label plaque-code">{accessionNumber}</span>
        <span className="plaque-name">{name}</span>
      </div>

      {isCompleted && (
        <div
          className="pedestal-examined-mark archival-label"
          title="Examined"
        >
          Examined
        </div>
      )}
    </div>
  );
}
