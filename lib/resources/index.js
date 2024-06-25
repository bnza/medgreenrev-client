import sites from './sites.js'
import users from './users.js'

const resources = {
  sites,
  users,
}

export const resourceKeys = Object.freeze(Object.keys(resources))
export const getResourceConfig = (key) => {
  if (!resourceKeys.includes(key)) {
    throw new Error(`Invalid resource key "${key}"`)
  }
  return Object.assign({}, resources[key])
}
