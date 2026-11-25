import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Artifact } from '../types/museum';
import { TypewriterExperience } from './TypewriterExperience';
import { OtherArtifactExperience } from './OtherArtifactExperiences';
import './ExhibitExperience.css';

interface ExhibitExperienceProps {
  artifact: Artifact;
  hasNext: boolean;
  onComplete: (id: Artifact['id']) => void;
  onReturn: () => void;
  onContinueNext: () => void;
}

export function ExhibitExperience({
  artifact,
  hasNext,
  onComplete,
  onReturn,
  onContinueNext,
}: ExhibitExperienceProps) {
  // Allow Escape key to return to the museum
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onReturn();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onReturn]);

  return (
    <motion.div
      className="exhibit-experience-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inspect-artifact-title"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <div className="experience-inner">
        <div className="experience-stage-col">
          {artifact.id === 'typewriter' ? (
            <TypewriterExperience onComplete={() => onComplete(artifact.id)} />
          ) : (
            <OtherArtifactExperience
              artifact={artifact}
              onComplete={() => onComplete(artifact.id)}
            />
          )}
        </div>

        <div className="experience-info-col">
          <div className="archival-label experience-accession">
            {artifact.accessionNumber} · {artifact.classification}
          </div>

          <h2 id="inspect-artifact-title" className="experience-title">
            {artifact.name}
          </h2>

          <div className="archival-label experience-meta-row">
            <span>Origin: {artifact.origin}</span>
            <span>Status: {artifact.status}</span>
          </div>

          <p className="experience-description">{artifact.description}</p>

          <div className="experience-archive-note">
            <span className="archival-label">Archival Note</span>
            <p>{artifact.archiveNote}</p>
          </div>

          <div className="experience-nav-actions">
            <button
              type="button"
              className="exp-nav-btn primary"
              onClick={onReturn}
            >
              Return to Museum
            </button>
            {hasNext && (
              <button
                type="button"
                className="exp-nav-btn"
                onClick={onContinueNext}
              >
                Continue to Next Exhibit →
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
