import { ArtifactId } from '../types/museum';
import './ArtifactVisual.css';

interface ArtifactVisualProps {
  id: ArtifactId;
  isDiscovered?: boolean;
}

export function ArtifactVisual({ id, isDiscovered = false }: ArtifactVisualProps) {
  return (
    <div
      className={`artifact-visual artifact-visual--${id} ${
        isDiscovered ? 'is-discovered' : ''
      }`}
    >
      {renderArtifactSvg(id)}
      <div className="artifact-contact-shadow" aria-hidden="true" />
    </div>
  );
}

function renderArtifactSvg(id: ArtifactId) {
  switch (id) {
    case 'typewriter':
      return (
        <svg viewBox="0 0 220 170" className="artifact-svg" aria-hidden="true">
          {/* Paper */}
          <path
            d="M66 16 L154 12 L156 76 L64 76 Z"
            fill="#E6E1D5"
            stroke="#B7B5AE"
            strokeWidth="1"
          />
          <line x1="78" y1="30" x2="132" y2="28" stroke="#77756F" strokeWidth="1.2" opacity="0.45" />
          <line x1="78" y1="40" x2="120" y2="38" stroke="#77756F" strokeWidth="1.2" opacity="0.35" />
          {/* Carriage & Platen */}
          <rect x="34" y="64" width="152" height="16" rx="4" fill="#171714" />
          <rect x="44" y="59" width="132" height="6" rx="2" fill="#3A3834" />
          <rect x="22" y="68" width="14" height="8" rx="2" fill="#77756F" />
          <rect x="184" y="68" width="14" height="8" rx="2" fill="#77756F" />
          {/* Return lever */}
          <path d="M40 64 L28 48 L44 46" fill="none" stroke="#9A9891" strokeWidth="3" strokeLinecap="round" />
          {/* Main Body */}
          <path
            d="M28 80 L192 80 L204 144 C204 150 198 154 192 154 L28 154 C22 154 16 150 16 144 Z"
            fill="#252522"
            stroke="#11110F"
            strokeWidth="2"
          />
          {/* Typebasket recess */}
          <path d="M52 82 L168 82 L158 106 L62 106 Z" fill="#11110F" />
          <path d="M68 104 Q110 86 152 104" fill="none" stroke="#5A5851" strokeWidth="1.5" />
          {/* Key rows */}
          <g fill="#D7D0BD" stroke="#171714" strokeWidth="0.8">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <circle key={`r1-${i}`} cx={52 + i * 14.5} cy={116} r="4.5" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <circle key={`r2-${i}`} cx={59 + i * 14.5} cy={128} r="4.5" />
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <circle key={`r3-${i}`} cx={66 + i * 14.5} cy={139} r="4.5" />
            ))}
          </g>
          {/* Spacebar */}
          <rect x="74" y="146" width="72" height="5" rx="2" fill="#9A9891" />
        </svg>
      );

    case 'clicker':
      return (
        <svg viewBox="0 0 180 180" className="artifact-svg" aria-hidden="true">
          {/* Severed cord */}
          <path
            d="M90 128 C90 150 116 154 134 146"
            fill="none"
            stroke="#252522"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Bakelite housing */}
          <rect
            x="56"
            y="40"
            width="68"
            height="92"
            rx="6"
            fill="#2B2A26"
            stroke="#171714"
            strokeWidth="2"
          />
          <rect x="64" y="48" width="52" height="76" rx="3" fill="#3A3834" />
          {/* Switch rocker */}
          <rect
            x="77"
            y="64"
            width="26"
            height="42"
            rx="2"
            fill="#E6E1D5"
            stroke="#77756F"
            strokeWidth="1.2"
          />
          <line x1="77" y1="84" x2="103" y2="84" stroke="#B7B5AE" strokeWidth="1.5" />
          {/* Screws */}
          <circle cx="90" cy="55" r="2.2" fill="#9A9891" />
          <circle cx="90" cy="117" r="2.2" fill="#9A9891" />
        </svg>
      );

    case 'service-weapon':
      return (
        <svg viewBox="0 0 220 160" className="artifact-svg" aria-hidden="true">
          {/* Grip */}
          <path d="M54 78 L80 78 L66 136 L40 132 Z" fill="#1E1E1B" stroke="#11110F" strokeWidth="1.5" />
          {/* Trigger guard */}
          <path d="M78 78 L106 78 L100 100 L72 100" fill="none" stroke="#2B2A27" strokeWidth="3.5" />
          <path d="M86 80 L84 94" stroke="#9A9891" strokeWidth="2.5" strokeLinecap="round" />
          {/* Floating / interlocking geometric barrel blocks */}
          <polygon points="44,50 112,50 106,76 48,76" fill="#292824" stroke="#4A4843" strokeWidth="1" />
          <polygon points="116,46 154,46 150,74 112,74" fill="#20201D" stroke="#4A4843" strokeWidth="1" />
          <polygon points="158,50 192,54 188,72 154,72" fill="#2E2D29" stroke="#5A5851" strokeWidth="1" />
          {/* Sight */}
          <rect x="52" y="42" width="12" height="8" fill="#171714" />
          <rect x="176" y="46" width="8" height="6" fill="#D7D0BD" opacity="0.7" />
        </svg>
      );

    case 'rubber-duck':
      return (
        <svg viewBox="0 0 180 160" className="artifact-svg" aria-hidden="true">
          {/* Body */}
          <path
            d="M36 102 C36 78 58 72 88 76 C114 78 134 86 134 106 C134 128 110 136 82 136 C52 136 36 124 36 102 Z"
            fill="#C2B06B"
            stroke="#8B7C43"
            strokeWidth="1.5"
          />
          {/* Tail */}
          <path d="M38 98 L24 84 L48 86" fill="#C2B06B" stroke="#8B7C43" strokeWidth="1.5" strokeLinejoin="round" />
          {/* Wing */}
          <path d="M62 96 C78 90 100 94 104 108 C96 118 68 118 62 96 Z" fill="#B3A05B" stroke="#8B7C43" strokeWidth="1" />
          {/* Head */}
          <circle cx="116" cy="58" r="24" fill="#C2B06B" stroke="#8B7C43" strokeWidth="1.5" />
          {/* Eye */}
          <circle cx="124" cy="52" r="3" fill="#171714" />
          <circle cx="125" cy="51" r="1" fill="#E6E1D5" />
          {/* Bill */}
          <path d="M138 56 L158 60 L138 68 Z" fill="#9A663B" stroke="#6E4625" strokeWidth="1.2" strokeLinejoin="round" />
        </svg>
      );

    case 'floppy-disk':
      return (
        <svg viewBox="0 0 180 180" className="artifact-svg" aria-hidden="true">
          <path
            d="M34 26 L134 26 L148 40 L148 154 L34 154 Z"
            fill="#2B2A27"
            stroke="#171714"
            strokeWidth="2"
          />
          {/* Metal shutter */}
          <rect x="54" y="26" width="62" height="44" fill="#B7B5AE" stroke="#77756F" strokeWidth="1" />
          <rect x="64" y="34" width="16" height="28" fill="#171714" />
          {/* Archival paper label */}
          <rect x="46" y="84" width="88" height="64" rx="2" fill="#E6E1D5" />
          <line x1="56" y1="100" x2="124" y2="100" stroke="#77756F" strokeWidth="1" opacity="0.5" />
          <line x1="56" y1="114" x2="124" y2="114" stroke="#77756F" strokeWidth="1" opacity="0.5" />
          <line x1="56" y1="128" x2="102" y2="128" stroke="#77756F" strokeWidth="1" opacity="0.5" />
          {/* Write protect notch */}
          <rect x="40" y="138" width="6" height="6" fill="#11110F" />
        </svg>
      );

    case 'benicoff-tv':
      return (
        <svg viewBox="0 0 210 175" className="artifact-svg" aria-hidden="true">
          {/* Cabinet */}
          <rect x="22" y="24" width="166" height="128" rx="10" fill="#2A2925" stroke="#171714" strokeWidth="2.5" />
          <rect x="28" y="30" width="154" height="116" rx="7" fill="#3B3934" />
          {/* CRT Screen */}
          <rect x="38" y="40" width="106" height="94" rx="14" fill="#171714" stroke="#11110F" strokeWidth="3" />
          <rect className="tv-phosphor" x="44" y="46" width="94" height="82" rx="10" fill="#2A2D2A" />
          {/* Control Panel */}
          <circle cx="164" cy="58" r="9" fill="#171714" stroke="#77756F" strokeWidth="1.5" />
          <line x1="164" y1="58" x2="169" y2="52" stroke="#D7D0BD" strokeWidth="1.5" />
          <circle cx="164" cy="86" r="9" fill="#171714" stroke="#77756F" strokeWidth="1.5" />
          <line x1="164" y1="86" x2="158" y2="82" stroke="#D7D0BD" strokeWidth="1.5" />
          {/* Speaker grille */}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={i} x1="154" y1={108 + i * 5} x2="174" y2={108 + i * 5} stroke="#171714" strokeWidth="2" />
          ))}
          {/* Feet */}
          <rect x="36" y="152" width="16" height="8" fill="#171714" />
          <rect x="158" y="152" width="16" height="8" fill="#171714" />
        </svg>
      );

    case 'slide-projector':
      return (
        <svg viewBox="0 0 220 160" className="artifact-svg" aria-hidden="true">
          {/* Light cone */}
          <polygon
            className="projector-beam"
            points="168,72 220,44 220,124 168,96"
            fill="url(#projectorBeamGrad)"
          />
          <defs>
            <linearGradient id="projectorBeamGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D7D0BD" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#D7D0BD" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Carousel tray */}
          <ellipse cx="92" cy="54" rx="52" ry="14" fill="#171714" stroke="#4A4843" strokeWidth="1.5" />
          <ellipse cx="92" cy="48" rx="44" ry="10" fill="#2C2B27" />
          {/* Main chassis */}
          <rect x="28" y="64" width="124" height="68" rx="6" fill="#262521" stroke="#11110F" strokeWidth="2" />
          <rect x="36" y="76" width="54" height="38" rx="2" fill="#1A1916" />
          {/* Lens barrel */}
          <rect x="148" y="70" width="24" height="30" rx="3" fill="#4A4843" stroke="#171714" strokeWidth="1.5" />
          <ellipse cx="172" cy="85" rx="5" ry="14" fill="#9A9891" stroke="#171714" strokeWidth="1.5" />
          <ellipse cx="173" cy="85" rx="2.5" ry="8" fill="#D7D0BD" opacity="0.65" />
        </svg>
      );

    case 'outsiders-mark':
      return (
        <svg viewBox="0 0 180 180" className="artifact-svg" aria-hidden="true">
          {/* Slate tablet */}
          <polygon
            points="42,24 138,20 146,154 36,158"
            fill="#2B2A27"
            stroke="#171714"
            strokeWidth="2"
          />
          <polygon points="48,30 132,26 139,148 42,152" fill="#22211E" />
          {/* Outsider's Mark sigil */}
          <g className="mark-sigil" stroke="#D7D0BD" strokeWidth="2.5" fill="none" strokeLinecap="round">
            <path d="M90 44 L90 132" />
            <path d="M56 108 Q90 88 124 108" />
            <path d="M90 44 L66 86 L90 78 L114 86 Z" />
            <circle cx="90" cy="116" r="10" />
            <path d="M62 126 L90 106 L118 126" />
          </g>
        </svg>
      );

    case 'neuromod':
      return (
        <svg viewBox="0 0 210 160" className="artifact-svg" aria-hidden="true">
          {/* Body cylinder */}
          <rect x="34" y="64" width="112" height="34" rx="6" fill="#9A9891" stroke="#171714" strokeWidth="1.5" />
          <rect x="46" y="70" width="54" height="22" rx="3" fill="#252522" />
          {/* Amber reservoir */}
          <rect x="50" y="74" width="46" height="14" rx="2" fill="#B8873D" opacity="0.85" />
          {/* Grip collar */}
          <rect x="114" y="58" width="22" height="46" rx="3" fill="#3A3834" stroke="#171714" strokeWidth="1.5" />
          {/* Ocular prongs */}
          <path d="M136 72 L176 72 L182 76" fill="none" stroke="#E6E1D5" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M136 90 L176 90 L182 86" fill="none" stroke="#E6E1D5" strokeWidth="2.5" strokeLinecap="round" />
          {/* Plunger */}
          <rect x="20" y="75" width="14" height="12" fill="#4A4843" />
        </svg>
      );

    case 'bb-pod':
      return (
        <svg viewBox="0 0 180 180" className="artifact-svg" aria-hidden="true">
          {/* Top & bottom caps */}
          <rect x="58" y="24" width="64" height="18" rx="4" fill="#2A2925" stroke="#171714" strokeWidth="2" />
          <rect x="54" y="138" width="72" height="20" rx="4" fill="#2A2925" stroke="#171714" strokeWidth="2" />
          {/* Glass cylinder */}
          <rect x="62" y="42" width="56" height="96" fill="#9B7538" fillOpacity="0.58" stroke="#4A4843" strokeWidth="2" />
          {/* Suspended form */}
          <ellipse className="pod-core" cx="90" cy="90" rx="14" ry="20" fill="#D7D0BD" fillOpacity="0.45" />
          <circle cx="90" cy="76" r="8" fill="#D7D0BD" fillOpacity="0.5" />
          {/* Glass specular highlight */}
          <line x1="70" y1="48" x2="70" y2="132" stroke="#E6E1D5" strokeWidth="2" opacity="0.35" />
          {/* Gauge */}
          <circle cx="90" cy="148" r="5" fill="#D7D0BD" stroke="#171714" strokeWidth="1.2" />
        </svg>
      );

    case 'lament-configuration':
      return (
        <svg viewBox="0 0 180 180" className="artifact-svg" aria-hidden="true">
          {/* Isometric cube faces */}
          <polygon points="90,26 146,56 90,86 34,56" fill="#3A2E25" stroke="#171714" strokeWidth="1.5" />
          <polygon points="34,56 90,86 90,152 34,122" fill="#28201A" stroke="#171714" strokeWidth="1.5" />
          <polygon points="146,56 90,86 90,152 146,122" fill="#1E1814" stroke="#171714" strokeWidth="1.5" />
          {/* Brass filigree */}
          <g stroke="#B69658" strokeWidth="1.6" fill="none">
            <circle cx="90" cy="56" r="16" />
            <polygon points="90,34 118,56 90,78 62,56" />
            <circle cx="62" cy="104" r="12" />
            <path d="M44 76 L80 96 M44 112 L80 132" />
            <circle cx="118" cy="104" r="12" />
            <path d="M136 76 L100 96 M136 112 L100 132" />
          </g>
        </svg>
      );

    case 'hunters-mark':
      return (
        <svg viewBox="0 0 180 180" className="artifact-svg" aria-hidden="true">
          <rect x="52" y="20" width="76" height="140" rx="2" fill="#22211E" stroke="#171714" strokeWidth="2" />
          {/* Inverted dangling rune */}
          <g stroke="#D7D0BD" strokeWidth="2.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="90" y1="36" x2="90" y2="144" />
            <path d="M68 54 L90 88 L112 54" />
            <path d="M74 96 L90 120 L106 96" />
            <circle cx="90" cy="134" r="5" />
          </g>
        </svg>
      );

    case 'golden-idol':
      return (
        <svg viewBox="0 0 180 180" className="artifact-svg" aria-hidden="true">
          {/* Base plinth */}
          <rect x="46" y="128" width="88" height="22" fill="#7D6224" stroke="#4D3B13" strokeWidth="1.5" />
          {/* Torso */}
          <polygon points="62,64 118,64 128,128 52,128" fill="#C49E3B" stroke="#6E551A" strokeWidth="1.5" />
          {/* Head & Crown */}
          <polygon points="72,26 108,26 114,62 66,62" fill="#D4AE4A" stroke="#6E551A" strokeWidth="1.5" />
          <polygon points="82,16 98,16 104,26 76,26" fill="#E0BE5E" />
          {/* Facial geometry */}
          <line x1="78" y1="44" x2="86" y2="44" stroke="#4D3B13" strokeWidth="2" />
          <line x1="94" y1="44" x2="102" y2="44" stroke="#4D3B13" strokeWidth="2" />
          <line x1="82" y1="54" x2="98" y2="54" stroke="#4D3B13" strokeWidth="1.5" />
          {/* Articulated dial plates */}
          <circle cx="90" cy="100" r="12" fill="#8C6D24" stroke="#4D3B13" strokeWidth="1.5" />
          <circle cx="90" cy="100" r="4" fill="#D4AE4A" />
        </svg>
      );

    case 'signalis-artifact':
      return (
        <svg viewBox="0 0 190 170" className="artifact-svg" aria-hidden="true">
          {/* Porcelain backing plate */}
          <rect x="34" y="34" width="122" height="102" rx="3" fill="#E6E1D5" stroke="#9A9891" strokeWidth="1.5" />
          {/* Anodized crimson cassette block */}
          <rect x="46" y="48" width="98" height="64" rx="4" fill="#7A2A25" stroke="#3D1412" strokeWidth="1.5" />
          {/* Six-fold geometric seal */}
          <g stroke="#E6E1D5" strokeWidth="1.6" fill="none">
            <polygon points="95,58 112,68 112,88 95,98 78,88 78,68" />
            <circle cx="95" cy="78" r="6" />
          </g>
          {/* Cassette reels */}
          <circle cx="70" cy="122" r="5" fill="#171714" />
          <circle cx="120" cy="122" r="5" fill="#171714" />
        </svg>
      );

    case 'wildcard':
      return (
        <svg viewBox="0 0 180 180" className="artifact-svg" aria-hidden="true">
          {/* Brushed steel housing */}
          <circle cx="90" cy="90" r="56" fill="#6E6D68" stroke="#171714" strokeWidth="2.5" />
          <circle cx="90" cy="90" r="46" fill="#171714" />
          <circle cx="90" cy="90" r="40" fill="#E6E1D5" />
          {/* Degree ticks */}
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
            <line
              key={deg}
              x1="90"
              y1="54"
              x2="90"
              y2="60"
              stroke="#171714"
              strokeWidth={deg % 90 === 0 ? '2' : '1'}
              transform={`rotate(${deg} 90 90)`}
            />
          ))}
          {/* Needle */}
          <polygon points="90,58 95,90 90,94 85,90" fill="#7A2A25" />
          <polygon points="90,122 95,90 90,86 85,90" fill="#171714" />
          <circle cx="90" cy="90" r="4" fill="#77756F" />
        </svg>
      );
  }
}
