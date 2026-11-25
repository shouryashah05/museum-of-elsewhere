import { MotionValue, motion, useTransform } from 'framer-motion';
import './HomeScene.css';

interface HomeSceneProps {
  entranceProgress: MotionValue<number>;
  onEnterClick: () => void;
}

export function HomeScene({ entranceProgress, onEnterClick }: HomeSceneProps) {
  // Thin line of warm light between the two concrete gate walls
  const seamGlowOpacity = useTransform(
    entranceProgress,
    [0, 0.14, 0.35, 0.7],
    [0.36, 0.95, 0.65, 0]
  );
  const seamWidth = useTransform(entranceProgress, [0, 0.22], ['2px', '10px']);

  // Both enormous concrete gate walls slide apart horizontally
  const leftWallX = useTransform(entranceProgress, [0.08, 0.78], ['0vw', '-56vw']);
  const rightWallX = useTransform(entranceProgress, [0.08, 0.78], ['0vw', '56vw']);

  // Subtle forward camera push through the portal
  const portalScale = useTransform(entranceProgress, [0.08, 0.85], [1, 1.08]);

  // Identity recedes cleanly as the concrete gate opens
  const identityOpacity = useTransform(entranceProgress, [0, 0.32], [1, 0]);
  const identityY = useTransform(entranceProgress, [0, 0.4], [0, -28]);

  const containerPointerEvents = useTransform(entranceProgress, (v) =>
    v > 0.72 ? 'none' : 'auto'
  );
  const containerVisibility = useTransform(entranceProgress, (v) =>
    v >= 0.98 ? 'hidden' : 'visible'
  );

  return (
    <motion.section
      className="home-scene"
      style={{
        pointerEvents: containerPointerEvents,
        visibility: containerVisibility,
      }}
      aria-label="Monumental Museum Entrance"
    >
      {/* Monumental Concrete Gate Walls with Grainy Rust Texture */}
      <motion.div className="portal-stage" style={{ scale: portalScale }}>
        <motion.div
          className="portal-wall portal-wall--left rust-grain"
          style={{ x: leftWallX }}
          aria-hidden="true"
        >
          <div className="portal-coffer-grid" />
          <div className="portal-edge-bevel portal-edge-bevel--right" />
        </motion.div>

        <motion.div
          className="portal-wall portal-wall--right rust-grain"
          style={{ x: rightWallX }}
          aria-hidden="true"
        >
          <div className="portal-coffer-grid" />
          <div className="portal-edge-bevel portal-edge-bevel--left" />
        </motion.div>

        <motion.div
          className="portal-light-seam"
          style={{ opacity: seamGlowOpacity, width: seamWidth }}
          aria-hidden="true"
        />
      </motion.div>

      {/* Museum Identity (Left) */}
      <motion.div
        className="home-identity"
        style={{ opacity: identityOpacity, y: identityY }}
      >
        <div className="archival-label home-kicker">
          Permanent Collection · Archive 01—15
        </div>
        <h1 className="home-title">
          MUSEUM
          <br />
          OF ELSEWHERE
        </h1>
        <p className="home-tagline">A collection of things that never existed.</p>

        <div className="home-entry-controls">
          <button
            type="button"
            className="home-enter-btn"
            onClick={onEnterClick}
          >
            <span>Enter Institution</span>
            <span className="home-enter-arrow" aria-hidden="true">
              ↓
            </span>
          </button>
          <span className="archival-label home-scroll-cue">
            Scroll down to open threshold
          </span>
        </div>
      </motion.div>

      {/* 3D Typewriter Showcase (Right Side) */}
      <motion.div
        className="home-model-showcase"
        style={{ x: rightWallX, opacity: identityOpacity }}
      >
        <div className="home-model-spotlight" aria-hidden="true" />
        <model-viewer
          src="/models/typewriter.glb"
          alt="3D Typewriter artifact"
          auto-rotate
          rotation-per-second="14deg"
          camera-controls
          disable-zoom
          interaction-prompt="none"
          shadow-intensity="1.2"
          exposure="0.95"
          camera-orbit="32deg 72deg 105%"
          className="home-model-viewer"
        />
        <div className="archival-label home-model-attribution">
          “Typewriter” by{' '}
          <a
            href="https://vinish.dev/free-3d-models/"
            target="_blank"
            rel="noreferrer"
          >
            vinish.dev
          </a>{' '}
          · CC BY 4.0
        </div>
      </motion.div>
    </motion.section>
  );
}
