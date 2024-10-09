import type { StaticResourceConfig, VocabularyResourceKey } from '~~/types'

type PartialStaticResourceConfig = Omit<StaticResourceConfig, 'defaultHeaders'>

const vocabularyPotteryFunctionalGroup: PartialStaticResourceConfig = {
  appPath: '/vocabulary/pottery/functional-group',
  labels: ['Functional groups (pottery)', 'Functional group (pottery)'],
}
const vocabularyPotteryPart: PartialStaticResourceConfig = {
  appPath: '/vocabulary/pottery/relationships',
  labels: ['Parts (pottery)', 'Part (pottery)'],
}
const vocabularyPotteryTypology: PartialStaticResourceConfig = {
  appPath: '/vocabulary/pottery/typology',
  labels: ['Typologies (pottery)', 'Typology (pottery)'],
}
const vocabularySuRelationship: PartialStaticResourceConfig = {
  appPath: '/vocabulary/stratigraphic-unit/relationships',
  labels: ['Relationship (SU)', 'Relationships (SU)'],
}

const _vocabularies: Record<
  VocabularyResourceKey,
  PartialStaticResourceConfig
> = {
  vocabularyPotteryFunctionalGroup,
  vocabularyPotteryPart,
  vocabularyPotteryTypology,
  vocabularySuRelationship,
}

// @ts-ignore
const vocabularies: Record<VocabularyResourceKey, StaticResourceConfig> =
  Object.fromEntries(
    Object.entries(_vocabularies).map(
      ([key, voc]: [VocabularyResourceKey, PartialStaticResourceConfig]) => [
        key,
        Object.assign(
          {
            defaultHeaders: [
              {
                key: 'id',
                value: 'id',
                title: 'ID',
                align: 'center',
                width: '200',
                maxWidth: '200',
              },
              {
                key: 'value',
                value: 'value',
                title: 'value',
              },
            ],
          },
          voc,
        ),
      ],
    ),
  )

export default vocabularies
