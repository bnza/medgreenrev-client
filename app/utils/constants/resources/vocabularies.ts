import type {
  DataResourceKey,
  StaticResourceConfig,
  VocabularyResourceKey,
} from '~~/types'

const vocabularySuRelationship: StaticResourceConfig = {
  appPath: '/vocabulary/stratigraphic-unit/relationships',
  labels: ['Site', 'Sites'],
}

const vocabularies: Record<VocabularyResourceKey, StaticResourceConfig> = {
  vocabularySuRelationship,
}

export default vocabularies
