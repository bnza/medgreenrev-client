import type { VocabularyResourceKey } from '~~/types/api'

export type FilterKey =
  | 'SearchExact'
  | 'SearchPartial'
  | 'NumericEqual'
  | 'NumericGreaterThan'
  | 'NumericGreaterThanOrEqual'
  | 'NumericLowerThan'
  | 'NumericLowerThanOrEqual'
  | 'SiteEqualAutocomplete'
  | 'StratigraphicUnitEqualAutocomplete'
  | 'VocabularyPotteryTypologyEqualAutocomplete'
  | 'VocabularyPotteryFunctionalGroupEqualAutocomplete'
  | 'BooleanIsTrue'
  | 'BooleanIsFalse'

export type Filter = {
  id?: number
  property: string
  filter: FilterKey
  operands: Array<any>
}

export type FilterDefinitionObject = {
  id: FilterKey
  label: string
  multiple: boolean
  propertyLabel?: string
  operandsComponent: string
  operandComponentVocabularyKey?: VocabularyResourceKey
  operandListItemPropertyKey?: string
  operandsNumber: number
  addToObject: (filterObject: Record<string, any>, filter: Filter) => void
}

type ResourcePropertyFiltersDefinitionObject = {
  propertyLabel?: string
  filters: Record<string, FilterDefinitionObject>
}

type ResourceFiltersDefinitionObject = Record<
  string,
  ResourcePropertyFiltersDefinitionObject
>
