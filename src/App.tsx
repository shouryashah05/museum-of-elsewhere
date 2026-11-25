import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ARTIFACTS } from './data/artifacts';
import { Artifact, ArtifactId } from './types/museum';
import { HomeScene } from './components/HomeScene';
import { MuseumScene } from './components/MuseumScene';
import { MuseumChrome } from './components/MuseumChrome';
import { ExhibitExperience } from './components/ExhibitExperience';
import './App.css';

const ENTRANCE_SCROLL_PX = 1050;

export default function App() {
  const [maxTrackX, setMaxTrackX] = useState(4000);
  const [isInMuseum, setIsInMuseum] = useState(false);
  const [activeBay, setActiveBay] = useState(1);
  const [museumProgressVal, setMuseumProgressVal] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [inspectedArtifact, setInspectedArtifact] = useState<Artifact | null>(
    null
  );
  const [completedIds, setCompletedIds] = useState<Set<ArtifactId>>(
    () => new Set()
  );

  const { scrollY } = useScroll();

  const entranceProgress = useTransform(
    scrollY,
    [0, ENTRANCE_SCROLL_PX],
    [0, 1],
    { clamp: true }
  );

  const museumProgress = useTransform(
    scrollY,
    [ENTRANCE_SCROLL_PX, ENTRANCE_SCROLL_PX + Math.max(1, maxTrackX)],
    [0, 1],
    { clamp: true }
  );

  useEffect(() => {
    const unsubEntrance = entranceProgress.on('change', (v) => {
      setIsInMuseum(v >= 0.72);
    });
    const unsubMuseum = museumProgress.on('change', (v) => {
      setMuseumProgressVal(v);
      if (v > 0.02) {
        setHasInteracted(true);
      }
    });
    return () => {
      unsubEntrance();
      unsubMuseum();
    };
  }, [entranceProgress, museumProgress]);

  // Lock background scroll while inspecting an artifact
  useEffect(() => {
    if (inspectedArtifact) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [inspectedArtifact]);

  const handleEnterMuseum = useCallback(() => {
    window.scrollTo({
      top: ENTRANCE_SCROLL_PX + 20,
      behavior: 'smooth',
    });
  }, []);

  const handleReturnHome = useCallback(() => {
    setInspectedArtifact(null);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  const handleInspect = useCallback((artifact: Artifact) => {
    setHasInteracted(true);
    setInspectedArtifact(artifact);
  }, []);

  const handleCompleteArtifact = useCallback((id: ArtifactId) => {
    setCompletedIds((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const handleContinueNext = useCallback(() => {
    if (!inspectedArtifact) return;
    const currentIdx = ARTIFACTS.findIndex((a) => a.id === inspectedArtifact.id);
    if (currentIdx >= 0 && currentIdx < ARTIFACTS.length - 1) {
      const nextArtifact = ARTIFACTS[currentIdx + 1];
      setInspectedArtifact(nextArtifact);
      // Align background museum track to the next bay
      const targetProgress = (currentIdx + 1) / (ARTIFACTS.length - 1);
      window.scrollTo({
        top: ENTRANCE_SCROLL_PX + targetProgress * maxTrackX,
        behavior: 'auto',
      });
    }
  }, [inspectedArtifact, maxTrackX]);

  const inspectedIndex = inspectedArtifact
    ? ARTIFACTS.findIndex((a) => a.id === inspectedArtifact.id)
    : -1;

  return (
    <main className="museum-site">
      {/* Tall vertical scroll spacer driving both Entrance and Horizontal Museum */}
      <div
        className="scroll-spacer"
        style={{
          height: `calc(100vh + ${ENTRANCE_SCROLL_PX + maxTrackX}px)`,
        }}
        aria-hidden="true"
      />

      {/* Sticky Visual Scenes */}
      <HomeScene
        entranceProgress={entranceProgress}
        onEnterClick={handleEnterMuseum}
      />

      <MuseumScene
        artifacts={ARTIFACTS}
        entranceProgress={entranceProgress}
        museumProgress={museumProgress}
        maxTrackX={maxTrackX}
        onMeasureMaxTrackX={setMaxTrackX}
        onActiveBayChange={setActiveBay}
        completedIds={completedIds}
        onInspect={handleInspect}
        isInspectOpen={Boolean(inspectedArtifact)}
      />

      <MuseumChrome
        visible={isInMuseum && !inspectedArtifact}
        activeIndex={activeBay}
        totalCount={ARTIFACTS.length}
        progress={museumProgressVal}
        onReturnHome={handleReturnHome}
        hasInteracted={hasInteracted}
      />

      {/* Dedicated Artifact Inspection Experience */}
      <AnimatePresence>
        {inspectedArtifact && (
          <ExhibitExperience
            key={inspectedArtifact.id}
            artifact={inspectedArtifact}
            hasNext={inspectedIndex < ARTIFACTS.length - 1}
            onComplete={handleCompleteArtifact}
            onReturn={() => setInspectedArtifact(null)}
            onContinueNext={handleContinueNext}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
