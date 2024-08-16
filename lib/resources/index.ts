import sites from './sites'
import sitesUsers from './sites-users'
import stratigraphicUnits from './stratigraphic-units'
import users from './users'
import type { ReadonlyHeaders } from '~/lib/constants/vuetify'

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

const resources: Record<ResourceKey, ResourceConfig> = {
  sites,
  sitesUsers,
  users,
  stratigraphicUnits,
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

export const getResourceValidation = async (key: ResourceKey, options = {}) => {
  if (typeof validations[key] === 'string') {
    validations[key] = (
      await import(`~/composables/validation/${validations[key]}.js`)
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
