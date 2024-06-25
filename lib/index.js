export { getResourceConfig } from './resources'

/**
 * @param id string | string[]
 * @returns string
 */
export const routeParamIdToString = (id) => (Array.isArray(id) ? id[0] : id)

/**
 * @param id string | string[]
 * @returns number
 */
export const routeParamIdToInt = (id) => {
  id = routeParamIdToString(id)
  if (Number.isNaN(id)) {
    throw new Error(`Numeric id required: "${id}" given`)
  }
  return parseInt(id)
}
