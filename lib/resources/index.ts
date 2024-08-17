import sitesUsers from './sites-users'
import stratigraphicUnits from './stratigraphic-units'
import users from './users'
// @ts-ignore
import sites from './sites'
import type { ReadonlyHeaders } from '~/lib/constants/vuetify'
import type { Validation } from '@vuelidate/core'
import type { Reactive } from 'vue'

export type ResourceKey =
  | 'sites'
  | 'users'
  | 'stratigraphicUnits'
  | 'sitesUsers'

export type ResourceConfig = {
  apiPath: string
  appPath: string
  name: ResourceKey
  labels: Array<string>
  getCodeFn: (item: Record<string, any>) => () => string
}

export type ResourceOperationType = 'item' | 'collection'

export type ResourcePageKey =
  | `${ResourceKey}/${ResourceOperationType}`
  | `${ResourceKey}/collection/${string}`

export type MaybeResourcePageKey = '' | ResourcePageKey

export type UseResourceType = {
  defaultHeaders: ReadonlyHeaders
}

export type ResourceItem = { id: string | number } & Record<string, any>
export type ResourceAclItem = ResourceItem & {
  _acl: {
    canRead: boolean
    canUpdate: boolean
    canDelete: boolean
  }
}

export type UseResourceTypeOptions = {
  defaultHeaders: ReadonlyHeaders
  formatJsonLdItem?: (item: Record<string, any>) => Record<string, any>
  normalizePatchItem?: (
    newItem: Record<string, any>,
    oldItem: Record<string, any>,
    diffItem: Record<string, any>,
  ) => Record<string, any>
  protectedFields?: ReadonlyArray<string>
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

export type ApiResourceSite = {
  name: string
  code: string
  description?: string
} & ApiResourceItem<number>

export type ApiResourceStratigraphicUnit = {
  site: Pick<ApiResourceSite, 'id' | 'code'>
  year: number
  number: number
  interpretation?: string
  description?: string
} & ApiResourceItem<number>

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
export const resources: Record<ResourceKey, ResourceConfig> = {
  sites,
  sitesUsers,
  users,
  stratigraphicUnits,
}
export const isResourceKey = (key: string): key is ResourceKey =>
  key in resources

const validations: Record<ResourceKey, string> = {
  sites: 'useResourceSiteValidation',
  sitesUsers: 'useResourceSitesUsersValidation',
  users: 'useResourceUserValidation',
  stratigraphicUnits: 'useResourceStratigraphicUnitValidation',
}

export const resourceKeys: ReadonlyArray<string> = Object.freeze(
  Object.keys(resources),
)

export const checkResourceKey = (key: string): key is ResourceKey => {
  return resourceKeys.includes(key)
}

export const getResourceConfig = (key: string) => {
  if (checkResourceKey(key)) {
    return Object.assign({}, resources[key])
  }
  throw new Error(`Invalid resource key "${key}"`)
}

export const getResourceIri = (
  baseUrl: string,
  key: ResourceKey,
  id: string | number,
) => {
  const apiPath = getResourceConfig(key).apiPath
  return `${baseUrl}${apiPath}/${id}`
}

export const getResourceValidation = async (
  key: ResourceKey,
  options = {},
): Promise<
  () => {
    state: Reactive<Partial<RT>>
    v$: Validation
  }
> => {
  if (typeof validations[key] === 'string') {
    validations[key] = (
      await import(`~/composables/validation/${validations[key]}.ts`)
    ).default
  }
  return validations[key]
}
export const getResourcePageRootKey = (
  resourcePageKey: ResourcePageKey,
): ResourceKey => {
  const resourcePageRootKey = resourcePageKey.split('/')[0]
  if (isResourceKey(resourcePageRootKey)) {
    return resourcePageRootKey
  }
  throw new Error(`No such "${resourcePageRootKey}" resource key`)
}
