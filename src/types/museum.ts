export type ArtifactComplexity =
  | 'LOW'
  | 'LOW-MED'
  | 'MED'
  | 'MED-HIGH'
  | 'HIGH'
  | 'VARIABLE';

export type BayGeometry = 'straight' | 'curved';

export type ExhibitState =
  | 'IDLE'
  | 'DISCOVERED'
  | 'INTERACTIVE'
  | 'COMPLETE';

export type ArtifactId =
  | 'typewriter'
  | 'clicker'
  | 'service-weapon'
  | 'rubber-duck'
  | 'floppy-disk'
  | 'benicoff-tv'
  | 'slide-projector'
  | 'outsiders-mark'
  | 'neuromod'
  | 'bb-pod'
  | 'lament-configuration'
  | 'hunters-mark'
  | 'golden-idol'
  | 'signalis-artifact'
  | 'wildcard';

export interface Artifact {
  id: ArtifactId;
  index: number;
  accessionNumber: string;
  name: string;
  classification: string;
  origin: string;
  status: string;
  description: string;
  archiveNote: string;
  bayType: BayGeometry;
  complexity: ArtifactComplexity;
  interactionType: string;
  discoverHint: string;
}
