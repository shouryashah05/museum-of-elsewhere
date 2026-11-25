import { Artifact } from '../types/museum';
import { ArtifactVisual } from './ArtifactVisual';
import { GreekPedestal } from './GreekPedestal';
import './Exhibit.css';

interface ExhibitProps {
  artifact: Artifact;
  isDiscovered: boolean;
  isCompleted: boolean;
  onDiscover: (id: Artifact['id']) => void;
  onUndiscover: (id: Artifact['id']) => void;
  onInspect: (artifact: Artifact) => void;
}

export function Exhibit({
  artifact,
  isDiscovered,
  isCompleted,
  onDiscover,
  onUndiscover,
  onInspect,
}: ExhibitProps) {
  const handleArtifactClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isDiscovered) {
      onDiscover(artifact.id);
    } else {
      onInspect(artifact);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (!isDiscovered) {
        onDiscover(artifact.id);
      } else {
        onInspect(artifact);
      }
    }
  };

  return (
    <article
      className={`exhibit-bay exhibit-bay--${artifact.bayType} ${
        isDiscovered ? 'is-discovered' : ''
      } ${isCompleted ? 'is-completed' : ''}`}
      data-bay-index={artifact.index}
      aria-label={`Exhibit ${artifact.index}: ${artifact.name}`}
      onMouseEnter={() => onDiscover(artifact.id)}
      onMouseLeave={() => onUndiscover(artifact.id)}
    >
      {/* Architectural wall bay structure */}
      <div className="bay-wall concrete-grain" aria-hidden="true">
        <div className="bay-greek-frieze" />
        <div className="bay-greek-niche" />
        <div className="bay-seam-left" />
        <div className="bay-seam-right" />
        <div className="bay-spotlight" />
        {artifact.bayType === 'curved' && <div className="bay-alcove-curve" />}
      </div>

      {/* Physical Museum Pedestal + Artifact */}
      <div className="bay-stage">
        <div
          className="exhibit-artifact-trigger"
          role="button"
          tabIndex={0}
          aria-expanded={isDiscovered}
          aria-label={`${artifact.name} (${artifact.accessionNumber}). ${
            isDiscovered ? 'Activate to inspect.' : 'Activate to read archival placard.'
          }`}
          onClick={handleArtifactClick}
          onKeyDown={handleKeyDown}
        >
          <ArtifactVisual id={artifact.id} isDiscovered={isDiscovered} />
        </div>

        {/* Vector Greek Fluted Pedestal */}
        <GreekPedestal
          accessionNumber={artifact.accessionNumber}
          name={artifact.name}
          isCompleted={isCompleted}
        />

        {/* Physical Archival Placard (slides from beside/behind pedestal) */}
        <aside
          className={`archival-placard ${isDiscovered ? 'is-visible' : ''}`}
          aria-hidden={!isDiscovered}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="placard-header">
            <span className="archival-label placard-accession">
              {artifact.accessionNumber} · {artifact.classification}
            </span>
            <span className="archival-label placard-status">
              {artifact.status}
            </span>
          </div>

          <h2 className="placard-title">{artifact.name}</h2>
          <div className="archival-label placard-origin">
            Origin: {artifact.origin}
          </div>

          <p className="placard-description">{artifact.description}</p>

          <div className="placard-footer">
            <button
              type="button"
              className="placard-inspect-btn"
              onClick={() => onInspect(artifact)}
            >
              <span>Inspect Artifact</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </aside>
      </div>
    </article>
  );
}
