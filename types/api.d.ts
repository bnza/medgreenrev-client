export type ResourceConfig = Readonly<{
  apiPath: string
  appPath: string
  name: ResourceKey
  labels: [string, string]
  protectedFields?: Array<string>
  defaultHeaders: ReadonlyHeaders
}>

export type StaticResourceConfig = Omit<ResourceConfig, 'apiPath' | 'name'>

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
