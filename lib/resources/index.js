import sites from './sites.js'
import stratigraphicUnits from './stratigraphic-units.js'
import users from './users.js'

const resources = {
  sites,
  users,
  stratigraphicUnits,
}

const validations = {
  sites: 'useResourceSiteValidation',
  users: 'useResourceUserValidation',
  stratigraphicUnits: 'useResourceStratigraphicUnitsValidation',
}

export const resourceKeys = Object.freeze(Object.keys(resources))

export const checkResourceKey = (key) => {
  if (!resourceKeys.includes(key)) {
    throw new Error(`Invalid resource key "${key}"`)
  }
}
export const getResourceConfig = (key) => {
  checkResourceKey(key)
  return Object.assign({}, resources[key])
}

export const getResourceValidation = async (key, options = {}) => {
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
