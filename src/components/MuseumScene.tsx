import { useEffect, useRef, useState } from 'react';
import { MotionValue, motion, useTransform } from 'framer-motion';
import { Artifact, ArtifactId } from '../types/museum';
import { Exhibit } from './Exhibit';
import './MuseumScene.css';

interface MuseumSceneProps {
  artifacts: Artifact[];
  entranceProgress: MotionValue<number>;
  museumProgress: MotionValue<number>;
  maxTrackX: number;
  onMeasureMaxTrackX: (maxTrackX: number) => void;
  onActiveBayChange: (bayIndex: number) => void;
  completedIds: Set<ArtifactId>;
  onInspect: (artifact: Artifact) => void;
  isInspectOpen: boolean;
}

export function MuseumScene({
  artifacts,
  entranceProgress,
  museumProgress,
  maxTrackX,
  onMeasureMaxTrackX,
  onActiveBayChange,
  completedIds,
  onInspect,
  isInspectOpen,
}: MuseumSceneProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [discoveredId, setDiscoveredId] = useState<ArtifactId | null>(null);
  const touchStartX = useRef<number | null>(null);

  // Measure horizontal track overflow deterministically
  useEffect(() => {
    const measure = () => {
      if (!trackRef.current || !viewportRef.current) return;
      const overflow = Math.max(
        0,
        trackRef.current.scrollWidth - viewportRef.current.clientWidth
      );
      onMeasureMaxTrackX(overflow);
    };

    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [onMeasureMaxTrackX]);

  // Map museum scroll progress [0..1] to clamped translateX
  const trackX = useTransform(museumProgress, [0, 1], [0, -maxTrackX]);

  // Monumental gate reveal: forward camera push & spotlight activation behind opening walls
  const sceneScale = useTransform(entranceProgress, [0.1, 0.92], [0.86, 1]);
  const sceneOpacity = useTransform(entranceProgress, [0.05, 0.35], [0, 1]);
  const interiorDarknessOpacity = useTransform(
    entranceProgress,
    [0.1, 0.5, 0.92],
    [0.88, 0.62, 0]
  );
  const ceilingLightsOpacity = useTransform(
    entranceProgress,
    [0.42, 0.88],
    [0, 1]
  );

  // Track which bay is centered for the Bay 01/15 counter
  useEffect(() => {
    return museumProgress.on('change', (p) => {
      const idx = Math.min(
        artifacts.length,
        Math.max(1, Math.round(p * (artifacts.length - 1)) + 1)
      );
      onActiveBayChange(idx);
    });
  }, [museumProgress, artifacts.length, onActiveBayChange]);

  // Touch horizontal swipe fallback -> translates to vertical scroll
  const handleTouchStart = (e: React.TouchEvent) => {
    if (isInspectOpen) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isInspectOpen || touchStartX.current === null) return;
    const currentX = e.touches[0].clientX;
    const deltaX = touchStartX.current - currentX;
    if (Math.abs(deltaX) > 4) {
      window.scrollBy({ top: deltaX * 1.25, behavior: 'auto' });
      touchStartX.current = currentX;
    }
  };

  const handleTouchEnd = () => {
    touchStartX.current = null;
  };

  return (
    <motion.section
      ref={viewportRef}
      className={`museum-viewport ${isInspectOpen ? 'is-dimmed' : ''}`}
      style={{ opacity: sceneOpacity, scale: sceneScale }}
      onClick={() => setDiscoveredId(null)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Continuous Exhibition Gallery"
    >
      {/* Architectural Ceiling */}
      <div className="museum-ceiling concrete-grain" aria-hidden="true">
        <motion.div
          className="ceiling-light-fixtures"
          style={{ opacity: ceilingLightsOpacity }}
        />
      </div>

      {/* Gallery Track */}
      <div className="museum-gallery-band">
        <motion.div
          ref={trackRef}
          className="museum-track"
          style={{ x: trackX }}
        >
          <div className="gallery-threshold-spacer" aria-hidden="true">
            <span className="archival-label threshold-note">
              Gallery Wing I · Permanent Collection
            </span>
          </div>

          {artifacts.map((artifact) => (
            <Exhibit
              key={artifact.id}
              artifact={artifact}
              isDiscovered={discoveredId === artifact.id}
              isCompleted={completedIds.has(artifact.id)}
              onDiscover={(id) => setDiscoveredId(id)}
              onUndiscover={(id) =>
                setDiscoveredId((prev) => (prev === id ? null : prev))
              }
              onInspect={onInspect}
            />
          ))}

          <div className="gallery-end-spacer" aria-hidden="true">
            <div className="end-wall-plaque">
              <span className="archival-label">End of Exhibition</span>
              <p>Scroll up to return through the gallery.</p>
            </div>
          </div>
        </motion.div>

        {/* Mysterious dark interior veil that lifts as ceiling spotlights activate */}
        <motion.div
          className="museum-darkness-veil"
          style={{ opacity: interiorDarknessOpacity }}
          aria-hidden="true"
        />
      </div>

      {/* Continuous Concrete Floor */}
      <div className="museum-floor rust-grain" aria-hidden="true">
        <div className="floor-shadow-line" />
        <div className="floor-joints" />
      </div>
    </motion.section>
  );
}
