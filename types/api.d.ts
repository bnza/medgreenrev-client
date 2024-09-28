export type ResourceConfig = Readonly<{
  apiPath: string
  appPath: string
  name: ResourceKey
  labels: [string, string]
  protectedFields?: Array<string>
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

export type ResourceConfigMap = Readonly<ResourceKey, ResourceConfig>
