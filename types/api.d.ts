import type { ReadonlyHeaders } from '~~/types/index'

export type NormalizePostItem = (
  item: Record<string, any>,
) => Record<string, any>
export type NormalizePatchItem = (
  newItem: Record<string, any>,
  oldItem: Record<string, any>,
  diffItem: Record<string, any>,
) => Record<string, any>

export type ApiAction = 'create' | 'update' | 'read' | 'delete'
export type ResourceConfig = Readonly<{
  apiPath: string
  appPath: string
  name: ResourceKey
  labels: [string, string]
  protectedFields?: Array<string>
  defaultHeaders: ReadonlyHeaders
  normalizePostItem: NormalizePostItem
  normalizePatchItem: NormalizePatchtItem
}>
export type ResourceNormalizers = {
  normalizePostItem: NormalizePostItem
  normalizePatchItem: NormalizePatchItem
}

export type OptionalResourceNormalizers = {
  normalizePostItem?: NormalizePostItem
  normalizePatchItem?: NormalizePatchItem
}

export type StaticResourceConfig = Omit<
  ResourceConfig,
  'apiPath' | 'name' | 'normalizePostItem' | 'normalizePatchItem'
>

export type DataResourceKey =
  | 'pottery'
  // | 'sample'
  | 'site'
  | 'user'
  | 'stratigraphicUnit'
  // | 'sitesUser'
  // | 'stratigraphicUnitsRelationship'
  | 'stratigraphicUnitsMediaObject'

export type VocabularyResourceKey =
  | 'vocabularyPotteryFunctionalGroup'
  | 'vocabularyPotteryPart'
  | 'vocabularyPotteryTypology'
  | 'vocabularySuRelationship'

export type ResourceKey = DataResourceKey | VocabularyResourceKey

export type ResourceConfigMap = Readonly<Record<ResourceKey, ResourceConfig>>

type ResourceOperationType = 'collection' | 'item'

export type ResourcePageKey =
  | `${ResourceKey}/${ResourceOperationType}`
  | `${ResourceKey}/collection/${string}`

export type ApiResourceIndex = Readonly<Record<ResourceKey, string>>
