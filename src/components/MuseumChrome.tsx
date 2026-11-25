import './MuseumChrome.css';

interface MuseumChromeProps {
  visible: boolean;
  activeIndex: number;
  totalCount: number;
  progress: number;
  onReturnHome: () => void;
  hasInteracted: boolean;
}

export function MuseumChrome({
  visible,
  activeIndex,
  totalCount,
  progress,
  onReturnHome,
  hasInteracted,
}: MuseumChromeProps) {
  return (
    <header
      className={`museum-chrome ${visible ? 'is-visible' : ''}`}
      aria-hidden={!visible}
    >
      <div className="chrome-top">
        <button
          type="button"
          className="archival-label chrome-brand"
          onClick={onReturnHome}
          title="Return to Museum Entrance"
        >
          Museum of Elsewhere
        </button>

        <div className="chrome-status">
          <span className="archival-label chrome-counter">
            Bay {String(activeIndex).padStart(2, '0')} /{' '}
            {String(totalCount).padStart(2, '0')}
          </span>
          <div className="chrome-progress-track" aria-hidden="true">
            <div
              className="chrome-progress-fill"
              style={{ transform: `scaleX(${Math.max(0.04, progress)})` }}
            />
          </div>
        </div>
      </div>

      <footer className="chrome-bottom">
        <span className="archival-label chrome-wing-note">
          Wing I · Permanent Archive
        </span>
        <span
          className={`archival-label chrome-instruction ${
            hasInteracted ? 'is-quiet' : ''
          }`}
        >
          Scroll vertically to move · Hover or tap to discover · Click to inspect
        </span>
        <span className="archival-label chrome-wing-note chrome-wing-note--right">
          15 Artifacts
        </span>
      </footer>
    </header>
  );
}
