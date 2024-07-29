import sites from './sites.js'
import stratigraphicUnits from './stratigraphic-units.js'
import users from './users.js'

export type ResourceConfig = {
  apiPath: string
  appPath: string
  name: string
  labels: Array<string>
  getCodeFn: (item: any) => () => string
}

const resources: Record<string, ResourceConfig> = {
  sites,
  users,
  stratigraphicUnits,
}

export type ResourceKey = keyof typeof resources

const validations: Record<ResourceKey, string> = {
  sites: 'useResourceSiteValidation',
  users: 'useResourceUserValidation',
  stratigraphicUnits: 'useResourceStratigraphicUnitValidation',
}

export const resourceKeys = Object.freeze(Object.keys(resources))

export const checkResourceKey = (key: string) => {
  if (!resourceKeys.includes(key)) {
    throw new Error(`Invalid resource key "${key}"`)
  }
}
export const getResourceConfig = (key: string) => {
  checkResourceKey(key)
  return Object.assign({}, resources[key])
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
