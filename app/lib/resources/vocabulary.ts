import relationship from '~/lib/resources/vocabulary/stratigraphicUnits/relationship'

export type StratigraphicUnitRelationshipKey =
  | 'c'
  | 'C'
  | 'e'
  | 'f'
  | 'F'
  | 'x'
  | 'X'

export const stratigraphicUnitRelationshipMap: Record<
  StratigraphicUnitRelationshipKey,
  string
> = {
  c: 'cover to',
  C: 'covered by',
  e: 'same as',
  f: 'fill to',
  F: 'filled by',
  x: 'cuts',
  X: 'cut by',
}

export const vocabularyResources: Record<
  VocabularyKey,
  VocabularyResourceConfig
> = {
  'vocabulary/stratigraphicUnits/relationship': relationship,
}
