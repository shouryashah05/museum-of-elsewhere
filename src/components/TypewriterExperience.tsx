import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './TypewriterExperience.css';

interface TypewriterExperienceProps {
  onComplete: () => void;
}

type Stage = 'ready' | 'carriage_reset' | 'typing' | 'complete';

const LINE_1 = 'I HAVE BEEN HERE BEFORE.';
const LINE_2 = 'BUT I DO NOT REMEMBER ARRIVING.';
const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '.'],
];

export function TypewriterExperience({ onComplete }: TypewriterExperienceProps) {
  const [stage, setStage] = useState<Stage>('ready');
  const [line1Count, setLine1Count] = useState(0);
  const [line2Count, setLine2Count] = useState(0);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [typebarStrike, setTypebarStrike] = useState(false);
  const timersRef = useRef<number[]>([]);

  const clearTimers = () => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => {
    return () => clearTimers();
  }, []);

  const currentLine = line1Count < LINE_1.length ? 1 : 2;
  const currentCharIndex = currentLine === 1 ? line1Count : line2Count;

  // Carriage slides left as characters are typed, then resets on line break
  const carriageOffset = useMemo(() => {
    if (stage === 'ready') return 18;
    if (stage === 'carriage_reset') return 36;
    const maxShift = 68;
    const lineLen = currentLine === 1 ? LINE_1.length : LINE_2.length;
    const ratio = currentCharIndex / lineLen;
    return 36 - ratio * maxShift;
  }, [stage, currentLine, currentCharIndex]);

  // Paper advances upward after Line 1 completes
  const paperAdvanceY = useMemo(() => {
    if (stage === 'ready') return 0;
    if (stage === 'carriage_reset') return -10;
    if (currentLine === 2 || stage === 'complete') return -38;
    return -14;
  }, [stage, currentLine]);

  const startSequence = () => {
    clearTimers();
    setLine1Count(0);
    setLine2Count(0);
    setActiveKey(null);
    setStage('carriage_reset');

    const schedule = (fn: () => void, delay: number) => {
      const id = window.setTimeout(fn, delay);
      timersRef.current.push(id);
    };

    // Stage 4: Carriage moves to left margin before typing begins
    let t = 650;
    schedule(() => setStage('typing'), t);

    // Stage 5-6: Keys animate & Line 1 characters appear
    for (let i = 0; i < LINE_1.length; i++) {
      const ch = LINE_1[i];
      const stepDelay = ch === ' ' ? 75 : ch === '.' ? 180 : 95 + (i % 3) * 24;
      t += stepDelay;
      const count = i + 1;
      schedule(() => {
        setActiveKey(ch === ' ' ? 'SPACE' : ch);
        setTypebarStrike(true);
        setLine1Count(count);
      }, t);
      schedule(() => {
        setTypebarStrike(false);
      }, t + 55);
    }

    // Stage 7: Carriage return & paper advance
    t += 480;
    schedule(() => {
      setActiveKey(null);
    }, t);

    // Stage 8: Line 2 characters appear
    t += 320;
    for (let j = 0; j < LINE_2.length; j++) {
      const ch = LINE_2[j];
      const stepDelay = ch === ' ' ? 75 : ch === '.' ? 220 : 92 + (j % 4) * 22;
      t += stepDelay;
      const count = j + 1;
      schedule(() => {
        setActiveKey(ch === ' ' ? 'SPACE' : ch);
        setTypebarStrike(true);
        setLine2Count(count);
      }, t);
      schedule(() => {
        setTypebarStrike(false);
      }, t + 55);
    }

    // Stage 9: Completion state
    t += 460;
    schedule(() => {
      setActiveKey(null);
      setStage('complete');
      onComplete();
    }, t);
  };

  const stageLabel =
    stage === 'ready'
      ? 'MECHANISM IDLE · READY FOR ACTIVATION'
      : stage === 'carriage_reset'
      ? 'CARRIAGE ENGAGING · ALIGNING PLATEN'
      : stage === 'typing'
      ? 'ACTUATION IN PROGRESS · RECORDING'
      : 'SEQUENCE COMPLETE · ARCHIVE LOGGED';

  return (
    <div className="typewriter-exp">
      <div className="typewriter-stage">
        {/* Moving Carriage, Platen, Paper & DOM Text */}
        <motion.div
          className="tw-carriage-assembly"
          animate={{ x: carriageOffset }}
          transition={{ type: 'spring', stiffness: 260, damping: 28 }}
        >
          {/* Paper Sheet */}
          <motion.div
            className="tw-paper"
            animate={{ y: paperAdvanceY }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="tw-paper-header archival-label">
              MOE-001 · TRANSCRIPT
            </div>
            <div className="tw-paper-lines" aria-live="polite">
              <div className="tw-typed-line">
                {LINE_1.slice(0, line1Count)}
                {stage === 'typing' && currentLine === 1 && (
                  <span className="tw-cursor" aria-hidden="true" />
                )}
              </div>
              <div className="tw-typed-line">
                {LINE_2.slice(0, line2Count)}
                {stage === 'typing' && currentLine === 2 && (
                  <span className="tw-cursor" aria-hidden="true" />
                )}
              </div>
            </div>
          </motion.div>

          {/* Platen & Carriage Bar */}
          <div className="tw-return-lever" aria-hidden="true" />
          <div className="tw-platen" aria-hidden="true">
            <div className="tw-platen-knob left" />
            <div className="tw-platen-roller" />
            <div className="tw-platen-knob right" />
          </div>
          <div className="tw-paper-bail" aria-hidden="true" />
        </motion.div>

        {/* Main Typewriter Body */}
        <div className="tw-body">
          <div className="tw-typebasket" aria-hidden="true">
            <div className={`tw-typebar ${typebarStrike ? 'is-striking' : ''}`} />
            <div className="tw-ribbon-guides" />
          </div>

          {/* Mechanical Keyboard */}
          <div className="tw-keyboard" aria-hidden="true">
            {KEYBOARD_ROWS.map((row, rIdx) => (
              <div key={rIdx} className="tw-key-row">
                {row.map((keyChar) => {
                  const isPressed = activeKey === keyChar;
                  return (
                    <span
                      key={keyChar}
                      className={`tw-key ${isPressed ? 'is-pressed' : ''}`}
                    >
                      {keyChar}
                    </span>
                  );
                })}
              </div>
            ))}
            <div className="tw-key-row">
              <span
                className={`tw-spacebar ${
                  activeKey === 'SPACE' ? 'is-pressed' : ''
                }`}
              />
            </div>
          </div>
        </div>

        <div className="tw-table-shadow" aria-hidden="true" />
      </div>

      {/* Mechanical Status & Controls */}
      <div className="tw-controls">
        <div className="archival-label tw-status-readout">{stageLabel}</div>

        <button
          type="button"
          className="tw-activate-btn"
          onClick={startSequence}
          disabled={stage === 'carriage_reset' || stage === 'typing'}
        >
          {stage === 'ready'
            ? 'Activate Mechanism'
            : stage === 'complete'
            ? 'Replay Sequence'
            : 'Actuating...'}
        </button>
      </div>
    </div>
  );
}
