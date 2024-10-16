import type { ReadonlyHeaders } from '~/app/lib/constants/vuetify'
import type { Reactive } from 'vue'
import type { Validation } from '@vuelidate/core'

declare global {
  export type VocabularyKey = 'vocabulary/stratigraphicUnits/relationship'

  export type ResourceKey =
    | 'samples'
    | 'sites'
    | 'users'
    | 'stratigraphicUnits'
    | 'sitesUsers'
    | 'stratigraphicUnitsRelationships'
    | 'stratigraphicUnitsMediaObjects'

  type ApiResourceConfig = Readonly<{
    apiPath: string
    appPath: string
    labels: [string, string]
    protectedFields?: Array<string>
  }>
  export type VocabularyResourceConfig = Readonly<{
    name: VocabularyKey
  }> &
    ApiResourceConfig

  export type ResourceConfig = Readonly<{
    name: ResourceKey
    getCodeFn: (item: Record<string, any>) => () => string
  }> &
    ApiResourceConfig

  export type ResourceOperationType = 'item' | 'collection'

  export type ResourcePageKey =
    | `${ResourceKey}/${ResourceOperationType}`
    | `${ResourceKey}/collection/${string}`

  export type MaybeResourcePageKey = '' | ResourcePageKey

  export type UseResourceType = {
    defaultHeaders: ReadonlyHeaders
  }

  export type UseResourceTypeOptions = {
    defaultHeaders: ReadonlyHeaders
    formatJsonLdItem?: (item: Record<string, any>) => Record<string, any>
    normalizePatchItem?: (
      newItem: Record<string, any>,
      oldItem: Record<string, any>,
      diffItem: Record<string, any>,
    ) => Record<string, any>
  }

  export type ApiId = string | number

  export type ApiLdResourceType =
    | 'Site'
    | 'User'
    | 'StratigraphicUnit'
    | 'SitesUser'
    | 'StratigraphicUnitRelationship'

  type ApiLdContext = `${string}/context/${ApiLdResourceType}`
  type ApiLdResourceId = `${string}/${ApiId}`

  export type ApiResourceItem<T extends ApiId> = {
    id: T
  }

  export type HideableResourceItem = { public: boolean }

  export type ResourceAclItem = {
    _acl: {
      canRead: boolean
      canUpdate: boolean
      canDelete: boolean
    }
  }

  export type ApiResourceSite = {
    name: string
    code: string
    description?: string
  } & ApiResourceItem<number> &
    HideableResourceItem

  export type ApiResourceStratigraphicUnit = {
    site: Pick<ApiResourceSite, 'id' | 'code'>
    year: number
    number: number
    code: string
    interpretation?: string
    description?: string
  } & ApiResourceItem<number> &
    HideableResourceItem

  export type ApiResourceSample = {
    number: number
    stratigraphicUnit: Pick<
      ApiResourceStratigraphicUnit,
      'id' | 'number' | 'code'
    >
    description?: string
  } & ApiResourceItem<number> &
    HideableResourceItem

  export type ApiRole = 'ROLE_USER' | 'ROLE_EDITOR' | 'ROLE_ADMIN'
  export type ApiResourceUser = {
    email: string
    roles: Array<ApiRole>
    privileges: Record<number, number>
  } & ApiResourceItem<string>

  export type ApiResourceSitesUsers = {
    site: Pick<ApiResourceSite, 'id' | 'code'>
    user: Pick<ApiResourceUser, 'id' | 'email'>
    privileges: number
  } & ApiResourceItem<string>

  export type ApiResourceStratigraphicUnitRelationship = {
    sxSU: ApiResourceStratigraphicUnit
    relationship: ApiLdResourceId | ApiLdResourceItem<string>
    dxSU: ApiResourceStratigraphicUnit
  } & ApiResourceItem<number>

  export type ApiResourceMediaObject = {
    contentUrl: string
    originalFilename: string
    mimeType: string
    size: number
  } & ApiResourceItem<number>

  export type ApiResourceItemMediaObject = {
    item: ApiResourceStratigraphicUnit
    mediaObject: ApiResourceMediaObject
  } & ApiResourceItem<number>

  export type ApiResourceStratigraphicUnitMediaObject = {
    stratigraphicUnit: ApiResourceStratigraphicUnit | ApiLdResourceId
    mediaObject: ApiResourceMediaObject
  } & ApiResourceItem<number>

  export type ApiResources =
    | ApiResourceSite
    | ApiResourceSample
    | ApiResourceUser
    | ApiResourceSitesUsers
    | ApiResourceStratigraphicUnit
    | ApiResourceStratigraphicUnitRelationship

  export type ApiAclItem<RT extends ApiResourceItem<ApiId>> = {
    _acl: {
      canRead: boolean
      canUpdate: boolean
      canDelete: boolean
    }
  } & RT

  export type ApiLdResource = {
    '@context': ApiLdContext
    '@id': ApiLdResourceId
    '@type': ApiLdResourceType
  }

  export type ApiLdResourceItem<RT extends ApiResourceItem<ApiId>> =
    ApiLdResource & RT

  export type ApiLdResourceCollection<RT extends ApiResourceItem<ApiId>> = {
    'hydra:totalNumber': number
    'hydra:member': Array<RT>
  } & ApiLdResource

  export type ResourceValidation<RT extends ApiResourceItem<ApiId>> = (
    item: Partial<RT>,
    emit: (event: string, ...args: any[]) => void,
  ) => {
    state: Reactive<Partial<RT>>
    v$: Validation
  }
}

export {}
