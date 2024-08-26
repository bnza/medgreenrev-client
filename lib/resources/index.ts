import sitesUsers from './sites-users'
import stratigraphicUnits from './stratigraphic-units'
import users from './users'
import sites from './sites'
import type { Validation } from '@vuelidate/core'
import type { Reactive } from 'vue'

export const resources: Record<ResourceKey, ResourceConfig> = {
  sites,
  sitesUsers,
  users,
  stratigraphicUnits,
}
export const isResourceKey = (key: string): key is ResourceKey =>
  key in resources

const validationsKeys: Record<ResourceKey, string> = {
  sites: 'useResourceSiteValidation',
  sitesUsers: 'useResourceSitesUsersValidation',
  users: 'useResourceUserValidation',
  stratigraphicUnits: 'useResourceStratigraphicUnitValidation',
}
type ResourceValidation<RT> = (
  item: MaybeRef<Partial<RT>>,
  emit: Function,
) => {
  state: Reactive<Partial<RT>>
  v$: Validation
}

const validations:
  | Record<ResourceKey, ResourceValidation<ApiAclItem<ApiResourceItem<ApiId>>>>
  | {} = {}

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

export const getResourceValidation = async <RT extends ApiResourceItem<ApiId>>(
  key: ResourceKey,
  options = {},
): Promise<ResourceValidation<RT>> => {
  if (!(key in validations)) {
    validations[key] = (
      await import(`~/composables/validation/${validationsKeys[key]}.ts`)
    ).default
  }
  // if (typeof validations[key] === 'string') {
  //   validations[key] = (
  //     await import(`~/composables/validation/${validations[key]}.ts`)
  //   ).default
  // }
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
export const clone = <T>(item: MaybeRef<Record<string, any>> = {}): T =>
  JSON.parse(JSON.stringify(unref(item)))
