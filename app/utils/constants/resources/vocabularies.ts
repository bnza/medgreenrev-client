import type { StaticResourceConfig, VocabularyResourceKey } from '~~/types'

const vocabularySuRelationship: StaticResourceConfig = {
  appPath: '/vocabulary/stratigraphic-unit/relationships',
  labels: ['Site', 'Sites'],
  defaultHeaders: [
    {
      key: 'id',
      value: 'id',
      title: 'ID',
      align: 'center',
      width: '200',
      maxWidth: '200',
    },
  ],
}

const vocabularies: Record<VocabularyResourceKey, StaticResourceConfig> = {
  vocabularySuRelationship,
}

export default vocabularies
