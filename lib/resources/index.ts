import sites from './sites.js'
import stratigraphicUnits from './stratigraphic-units.js'
import users from './users.js'

export type ResourceKey = 'sites' | 'users' | 'stratigraphicUnits'

export type ResourceConfig = {
  apiPath: string
  appPath: string
  name: string
  labels: Array<string>
  getCodeFn: (item: Record<string, any>) => () => string
}

const resources: Record<ResourceKey, ResourceConfig> = {
  sites,
  users,
  stratigraphicUnits,
}

const validations: Record<ResourceKey, string> = {
  sites: 'useResourceSiteValidation',
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
  checkResourceKey(key)
  if (!Object.keys(validations).includes(key)) {
    throw new Error(`Unsupported validation key "${key}"`)
  }
  if (typeof validations[key] === 'string') {
    validations[key] = (
      await import(`~/composables/validation/${validations[key]}.js`)
    ).default
  }
  return validations[key]
}
