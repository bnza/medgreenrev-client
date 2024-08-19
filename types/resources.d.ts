import type { ReadonlyHeaders } from '~/lib/constants/vuetify'
import type { Reactive } from 'vue'
import type { Validation } from '@vuelidate/core'

declare global {
  export type ResourceKey =
    | 'sites'
    | 'users'
    | 'stratigraphicUnits'
    | 'sitesUsers'

  export type ResourceConfig = Readonly<{
    apiPath: string
    appPath: string
    name: ResourceKey
    labels: Array<string>
    getCodeFn: (item: Record<string, any>) => () => string
    protectedFields?: Array<string>
  }>

  export type ResourceOperationType = 'item' | 'collection'

  export type ResourcePageKey =
    | `${ResourceKey}/${ResourceOperationType}`
    | `${ResourceKey}/collection/${string}`

  export type MaybeResourcePageKey = '' | ResourcePageKey

  export type UseResourceType = {
    defaultHeaders: ReadonlyHeaders
  }

  // export type ResourceItem = { id: string | number } & Record<string, any>

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
    interpretation?: string
    description?: string
  } & ApiResourceItem<number> &
    HideableResourceItem

  export type ApiRole = 'ROLE_BASE' | 'ROLE_EDITOR' | 'ROLE_ADMIN'
  export type ApiResourceUser = {
    email: string
    roles: Array<ApiRole>
    privileges: number
  } & ApiResourceItem<string>

  export type ApiResourceSitesUsers = {
    site: Pick<ApiResourceSite, 'id' | 'code'>
    user: Pick<ApiResourceUser, 'id' | 'email'>
    privileges: number
  } & ApiResourceItem<string>

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
