import type { DetailedHTMLProps, HTMLAttributes } from 'react';

interface ModelViewerAttributes extends HTMLAttributes<HTMLElement> {
  src?: string;
  alt?: string;
  'auto-rotate'?: boolean | string;
  'rotation-per-second'?: string;
  'camera-controls'?: boolean | string;
  'disable-zoom'?: boolean | string;
  'shadow-intensity'?: string;
  exposure?: string;
  'interaction-prompt'?: string;
  'camera-orbit'?: string;
  ar?: boolean;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': DetailedHTMLProps<ModelViewerAttributes, HTMLElement>;
    }
  }
}
