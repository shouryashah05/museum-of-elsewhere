import { useState } from 'react';
import { Artifact } from '../types/museum';
import { ArtifactVisual } from './ArtifactVisual';
import './OtherArtifactExperiences.css';

interface OtherArtifactExperienceProps {
  artifact: Artifact;
  onComplete: () => void;
}

export function OtherArtifactExperience({
  artifact,
  onComplete,
}: OtherArtifactExperienceProps) {
  switch (artifact.id) {
    case 'clicker':
      return <ClickerExp artifact={artifact} onComplete={onComplete} />;
    case 'service-weapon':
      return <ServiceWeaponExp onComplete={onComplete} />;
    case 'rubber-duck':
      return <RubberDuckExp artifact={artifact} onComplete={onComplete} />;
    case 'floppy-disk':
      return <FloppyDiskExp onComplete={onComplete} />;
    case 'benicoff-tv':
      return <BenicoffTvExp onComplete={onComplete} />;
    case 'slide-projector':
      return <SlideProjectorExp onComplete={onComplete} />;
    case 'outsiders-mark':
      return <OutsidersMarkExp artifact={artifact} onComplete={onComplete} />;
    case 'neuromod':
      return <NeuromodExp artifact={artifact} onComplete={onComplete} />;
    case 'bb-pod':
      return <BbPodExp artifact={artifact} onComplete={onComplete} />;
    case 'lament-configuration':
      return <LamentExp artifact={artifact} onComplete={onComplete} />;
    case 'hunters-mark':
      return <HuntersMarkExp artifact={artifact} onComplete={onComplete} />;
    case 'golden-idol':
      return <GoldenIdolExp artifact={artifact} onComplete={onComplete} />;
    case 'signalis-artifact':
      return <SignalisExp artifact={artifact} onComplete={onComplete} />;
    case 'wildcard':
      return <WildcardExp onComplete={onComplete} />;
    default:
      return null;
  }
}

function ClickerExp({
  artifact,
  onComplete,
}: {
  artifact: Artifact;
  onComplete: () => void;
}) {
  const [lit, setLit] = useState(false);

  const toggle = () => {
    setLit((prev) => !prev);
    onComplete();
  };

  return (
    <div className={`exp-stage ${lit ? 'is-illuminated' : ''}`}>
      <div className="exp-clicker-halo" aria-hidden="true" />
      <div className="exp-visual-wrap">
        <ArtifactVisual id={artifact.id} isDiscovered={lit} />
      </div>
      <div className="archival-label exp-readout">
        {lit
          ? 'STATE: ENGAGED · AMBIENT OUTPUT EXCEEDING NOMINAL'
          : 'STATE: DISENGAGED · SWITCH DORMANT'}
      </div>
      {lit && (
        <div className="exp-revelation-note">
          “A switch that remembers the room it belonged to.”
        </div>
      )}
      <button type="button" className="exp-action-btn" onClick={toggle}>
        {lit ? 'Depress Switch (Off)' : 'Depress Switch (On)'}
      </button>
    </div>
  );
}

const WEAPON_FORMS = [
  { name: 'GRIP', spread: 0, note: 'Standard semi-automatic configuration.' },
  { name: 'SHATTER', spread: 8, note: 'Barrel segments widen for close-range dispersion.' },
  { name: 'SPIN', spread: 4, note: 'Cyclic alignment; rapid kinetic chambering.' },
  { name: 'PIERCE', spread: 14, note: 'Elongated magnetic rail configuration.' },
];

function ServiceWeaponExp({ onComplete }: { onComplete: () => void }) {
  const [formIdx, setFormIdx] = useState(0);
  const current = WEAPON_FORMS[formIdx];

  const cycle = () => {
    setFormIdx((i) => (i + 1) % WEAPON_FORMS.length);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div className="exp-weapon-diagram">
        <svg viewBox="0 0 240 150" className="exp-weapon-svg" aria-hidden="true">
          <path d="M58 76 L84 76 L70 132 L44 128 Z" fill="#1E1E1B" stroke="#4A4843" strokeWidth="1.2" />
          <polygon
            points={`48,${48 - current.spread * 0.3} 116,${48 - current.spread * 0.3} 110,74 52,74`}
            fill="#2E2D29"
            stroke="#9A9891"
            strokeWidth="1"
          />
          <polygon
            points={`120,${44 - current.spread * 0.5} ${160 + current.spread},${44 - current.spread * 0.5} ${156 + current.spread},72 116,72`}
            fill="#24231F"
            stroke="#9A9891"
            strokeWidth="1"
          />
          <polygon
            points={`${164 + current.spread},48 ${202 + current.spread * 1.4},52 ${198 + current.spread * 1.4},70 ${160 + current.spread},70`}
            fill="#3A3834"
            stroke="#D7D0BD"
            strokeWidth="1"
          />
        </svg>
      </div>
      <div className="archival-label exp-readout">
        FORM: {current.name} · MASS CONSTANT (1.14 KG)
      </div>
      <div className="exp-revelation-note">{current.note}</div>
      <button type="button" className="exp-action-btn" onClick={cycle}>
        Reconfigure Form
      </button>
    </div>
  );
}

function RubberDuckExp({
  artifact,
  onComplete,
}: {
  artifact: Artifact;
  onComplete: () => void;
}) {
  const [angle, setAngle] = useState(0);
  const [count, setCount] = useState(0);

  const nudge = () => {
    setAngle((a) => (a === 0 ? -12 : a < 0 ? 10 : 0));
    setCount((c) => c + 1);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div
        className="exp-visual-wrap"
        style={{ transform: `rotate(${angle}deg)`, transition: 'transform 0.4s ease' }}
      >
        <ArtifactVisual id={artifact.id} isDiscovered={count > 0} />
      </div>
      <div className="archival-label exp-readout">
        {count === 0
          ? 'POSITION: CENTERED · NO ACOUSTIC EMISSION'
          : `DISPLACEMENT LOGGED (${count}) · ACOUSTIC ECHO: 438 HZ`}
      </div>
      <button type="button" className="exp-action-btn" onClick={nudge}>
        Test Orientation
      </button>
    </div>
  );
}

function FloppyDiskExp({ onComplete }: { onComplete: () => void }) {
  const [mounted, setMounted] = useState(false);

  const mount = () => {
    setMounted((m) => !m);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div className="exp-terminal-box">
        <div className="archival-label exp-terminal-head">
          AIR-GAPPED READER · DRIVE A:
        </div>
        {mounted ? (
          <pre className="exp-terminal-pre">
            {`SECTOR 0x001A ... OK\nLABEL: LAUNCH_TELEMETRY_79\nEXTERNAL: 1.44 MB\nINDEXED:  41.82 TB [ANOMALY]\nSTATUS:   REWRITING HEADERS`}
          </pre>
        ) : (
          <pre className="exp-terminal-pre">
            {`NO VOLUME MOUNTED.\nINSERT 3.5" MAGNETIC MEDIA TO INSPECT.`}
          </pre>
        )}
      </div>
      <button type="button" className="exp-action-btn" onClick={mount}>
        {mounted ? 'Eject Diskette' : 'Mount Diskette'}
      </button>
    </div>
  );
}

const TV_SIGNALS = [
  { label: 'NO SIGNAL · PHOSPHOR IDLE', text: '---' },
  { label: 'CH 03 · UNINDEXED CARRIER', text: 'STATIC INTERFERENCE / 59.94 HZ' },
  { label: 'CH 03 · FRAME CAPTURE', text: 'CONCRETE CORRIDOR — NO EXIT VISIBLE' },
  { label: 'CH 03 · RETURN', text: 'SIGNAL LOST' },
];

function BenicoffTvExp({ onComplete }: { onComplete: () => void }) {
  const [sig, setSig] = useState(0);

  const step = () => {
    setSig((s) => (s + 1) % TV_SIGNALS.length);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div className="exp-crt-frame">
        <div className={`exp-crt-screen ${sig > 0 ? 'is-active' : ''}`}>
          <span className="archival-label">{TV_SIGNALS[sig].text}</span>
        </div>
      </div>
      <div className="archival-label exp-readout">{TV_SIGNALS[sig].label}</div>
      <button type="button" className="exp-action-btn" onClick={step}>
        Cycle Receiver
      </button>
    </div>
  );
}

const SLIDES = [
  { title: 'TRAY OFF', caption: 'Projector lamp cold. Three slides loaded.' },
  { title: 'SLIDE 01 — ORDINARY', caption: 'A wooded clearing photographed from an impossible elevation.' },
  { title: 'SLIDE 02 — THRESHOLD', caption: 'An interior doorway whose frame casts two opposing shadows.' },
  { title: 'SLIDE 03 — UNCATALOGED', caption: 'The projected concrete wall matches this gallery.' },
];

function SlideProjectorExp({ onComplete }: { onComplete: () => void }) {
  const [slide, setSlide] = useState(0);

  const advance = () => {
    setSlide((s) => (s + 1) % SLIDES.length);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div className={`exp-projection-wall ${slide > 0 ? 'is-lit' : ''}`}>
        <div className="archival-label">{SLIDES[slide].title}</div>
        <p>{SLIDES[slide].caption}</p>
      </div>
      <button type="button" className="exp-action-btn" onClick={advance}>
        {slide === 0 ? 'Power On Projector' : 'Advance Carousel'}
      </button>
    </div>
  );
}

function OutsidersMarkExp({
  artifact,
  onComplete,
}: {
  artifact: Artifact;
  onComplete: () => void;
}) {
  const [resonant, setResonant] = useState(false);

  const activate = () => {
    setResonant((r) => !r);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div className="exp-visual-wrap">
        <ArtifactVisual id={artifact.id} isDiscovered={resonant} />
      </div>
      <div className="archival-label exp-readout">
        {resonant
          ? 'VOID RESONANCE DETECTED · SURFACE TEMP -4.2 °C'
          : 'SLATE TABLET DORMANT · AMBIENT TEMP 19.4 °C'}
      </div>
      <button type="button" className="exp-action-btn" onClick={activate}>
        {resonant ? 'Cease Observation' : 'Focus Light on Engraving'}
      </button>
    </div>
  );
}

function NeuromodExp({
  artifact,
  onComplete,
}: {
  artifact: Artifact;
  onComplete: () => void;
}) {
  const [schematic, setSchematic] = useState(false);

  const toggle = () => {
    setSchematic((s) => !s);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div className="exp-visual-wrap">
        <ArtifactVisual id={artifact.id} isDiscovered={schematic} />
      </div>
      {schematic && (
        <div className="exp-schematic-card">
          <div className="archival-label">TRANSTAR OCULAR-SYNAPTIC INJECTOR</div>
          <p>
            Dual micro-needles bypass the optic nerve sheath; amber fluid encodes
            connectome templates directly into neural tissue.
          </p>
        </div>
      )}
      <button type="button" className="exp-action-btn" onClick={toggle}>
        {schematic ? 'Hide Technical Diagram' : 'Reveal Mechanism Diagram'}
      </button>
    </div>
  );
}

function BbPodExp({
  artifact,
  onComplete,
}: {
  artifact: Artifact;
  onComplete: () => void;
}) {
  const [pulse, setPulse] = useState(false);

  const toggle = () => {
    setPulse((p) => !p);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div className="exp-visual-wrap">
        <ArtifactVisual id={artifact.id} isDiscovered={pulse} />
      </div>
      <div className="archival-label exp-readout">
        {pulse
          ? 'PRESSURE: 101.4 KPA · RHYTHMIC PULSE 68 BPM'
          : 'VESSEL SEALED · TELEMETRY STANDBY'}
      </div>
      <button type="button" className="exp-action-btn" onClick={toggle}>
        {pulse ? 'Dim Pod Illumination' : 'Poll Pod Telemetry'}
      </button>
    </div>
  );
}

const DETENTS = [
  'SEALED — ZERO DISPLACEMENT',
  'FIRST DETENT — BRASS SEAMS ALIGNED (+1.5 MM)',
  'SECOND DETENT — INTERNAL LOCKS ENGAGED (PROTOCOL LIMIT)',
];

function LamentExp({
  artifact,
  onComplete,
}: {
  artifact: Artifact;
  onComplete: () => void;
}) {
  const [step, setStep] = useState(0);

  const rotate = () => {
    setStep((s) => (s + 1) % DETENTS.length);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div
        className="exp-visual-wrap"
        style={{
          transform: `rotate(${step * 15}deg) scale(${1 + step * 0.04})`,
          transition: 'transform 0.55s var(--ease-architectural)',
        }}
      >
        <ArtifactVisual id={artifact.id} isDiscovered={step > 0} />
      </div>
      <div className="archival-label exp-readout">{DETENTS[step]}</div>
      <button type="button" className="exp-action-btn" onClick={rotate}>
        {step < 2 ? 'Rotate to Next Detent' : 'Reset to Sealed State'}
      </button>
    </div>
  );
}

function HuntersMarkExp({
  artifact,
  onComplete,
}: {
  artifact: Artifact;
  onComplete: () => void;
}) {
  const [focused, setFocused] = useState(false);

  const toggle = () => {
    setFocused((f) => !f);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div
        className="exp-visual-wrap"
        style={{
          transform: focused ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform 0.6s var(--ease-architectural)',
        }}
      >
        <ArtifactVisual id={artifact.id} isDiscovered={focused} />
      </div>
      <div className="archival-label exp-readout">
        {focused
          ? 'RUNE ETCHED IN MEMORY · VERTICAL DISORIENTATION NOTED'
          : 'IRON PLAQUE PASSIVE'}
      </div>
      <button type="button" className="exp-action-btn" onClick={toggle}>
        {focused ? 'Step Back' : 'Examine Rune'}
      </button>
    </div>
  );
}

const IDOL_FRAGMENTS = [
  'FRAGMENT A: Cast in an unknown gold-brass alloy that resists acid assay.',
  'FRAGMENT B: Base dial rotates in 12-degree increments without internal gearing.',
  'FRAGMENT C: Provenance ledger lists three contradictory acquisition dates.',
];

function GoldenIdolExp({
  artifact,
  onComplete,
}: {
  artifact: Artifact;
  onComplete: () => void;
}) {
  const [fragIdx, setFragIdx] = useState<number | null>(null);

  const inspectFrag = (idx: number) => {
    setFragIdx(idx);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div className="exp-visual-wrap">
        <ArtifactVisual id={artifact.id} isDiscovered={fragIdx !== null} />
      </div>
      <div className="exp-fragment-tabs">
        {[0, 1, 2].map((i) => (
          <button
            key={i}
            type="button"
            className={`exp-tab-btn ${fragIdx === i ? 'is-active' : ''}`}
            onClick={() => inspectFrag(i)}
          >
            Evidence 0{i + 1}
          </button>
        ))}
      </div>
      <div className="exp-revelation-note">
        {fragIdx !== null
          ? IDOL_FRAGMENTS[fragIdx]
          : 'Select a recovered evidence fragment to examine.'}
      </div>
    </div>
  );
}

function SignalisExp({
  artifact,
  onComplete,
}: {
  artifact: Artifact;
  onComplete: () => void;
}) {
  const [active, setActive] = useState(false);

  const trigger = () => {
    setActive((a) => !a);
    onComplete();
  };

  return (
    <div className="exp-stage">
      <div className="exp-visual-wrap">
        <ArtifactVisual id={artifact.id} isDiscovered={active} />
      </div>
      <div className="archival-label exp-readout">
        {active
          ? 'CARRIER: 512.00 HZ · CYCLE 23 MEMORY SEAL ACTIVE'
          : 'TAPE STATIONARY · SEAL DORMANT'}
      </div>
      <button type="button" className="exp-action-btn" onClick={trigger}>
        {active ? 'Mute Carrier' : 'Sample 512 Hz Carrier'}
      </button>
    </div>
  );
}

function WildcardExp({ onComplete }: { onComplete: () => void }) {
  const [bearing, setBearing] = useState(0);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const deg = (Math.atan2(e.clientY - cy, e.clientX - cx) * 180) / Math.PI + 90;
    setBearing(Math.round(deg));
    onComplete();
  };

  return (
    <div className="exp-stage" onMouseMove={handleMove}>
      <div className="exp-compass-dial" onClick={() => { setBearing((b) => (b + 45) % 360); onComplete(); }}>
        <svg viewBox="0 0 180 180" className="exp-compass-svg" aria-hidden="true">
          <circle cx="90" cy="90" r="64" fill="#171714" stroke="#77756F" strokeWidth="2" />
          <circle cx="90" cy="90" r="56" fill="#E6E1D5" />
          <g transform={`rotate(${bearing} 90 90)`}>
            <polygon points="90,42 96,90 90,96 84,90" fill="#7A2A25" />
            <polygon points="90,138 96,90 90,84 84,90" fill="#171714" />
          </g>
          <circle cx="90" cy="90" r="5" fill="#77756F" />
        </svg>
      </div>
      <div className="archival-label exp-readout">
        BEARING: {((bearing % 360) + 360) % 360}° · ORIENTED TOWARD OBSERVER
      </div>
      <div className="exp-revelation-note">
        Move cursor or tap dial. The needle refuses magnetic north.
      </div>
    </div>
  );
}
