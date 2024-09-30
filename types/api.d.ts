import type { ReadonlyHeaders } from '~~/types/index'

export type ApiAction = 'create' | 'update' | 'read' | 'delete'
export type ResourceConfig = Readonly<{
  apiPath: string
  appPath: string
  name: ResourceKey
  labels: [string, string]
  protectedFields?: Array<string>
  defaultHeaders: ReadonlyHeaders
  normalizePostItem: (item: Record<string, any>) => Record<string, any>
  normalizePatchItem: (
    newItem: Record<string, any>,
    oldItem: Record<string, any>,
    diffItem: Record<string, any>,
  ) => Record<string, any>
}>

export type StaticResourceConfig = Omit<
  ResourceConfig,
  'apiPath' | 'name' | 'normalizePatchItem' | 'normalizePostItem'
>

export type DataResourceKey =
  // | 'sample'
  'site'
// | 'user'
// | 'stratigraphicUnit'
// | 'sitesUser'
// | 'stratigraphicUnitsRelationship'
// | 'stratigraphicUnitsMediaObject'

export type VocabularyResourceKey = 'vocabularySuRelationship'

export type ResourceKey = DataResourceKey | VocabularyResourceKey

export type ResourceConfigMap = Readonly<Record<ResourceKey, ResourceConfig>>

type ResourceOperationType = 'collection' | 'item'

export type ResourcePageKey =
  | `${ResourceKey}/${ResourceOperationType}`
  | `${ResourceKey}/collection/${string}`
