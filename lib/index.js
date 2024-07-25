import { ROLE_HIERARCHY_VALUES, ROLES } from '~/lib/constants/enums.js'

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

const isAppRole = (role) => Object.values(ROLES).includes(role)

/**
 *
 * @param role string
 * @return number
 */
const getRoleHierarchyValue = (role) => ROLE_HIERARCHY_VALUES[role] || 0

/**
 *
 * @param roles string[]
 * @return string
 */
export const reduceAppRoles = (roles) => {
  const appRoles = roles.filter(isAppRole)
  return appRoles.reduce((acc, curr) => {
    return getRoleHierarchyValue(curr) > getRoleHierarchyValue(acc) ? curr : acc
  }, '')
}
/**
 *
 * @param roles string[]
 * @return string[]
 */
const removeAppRoles = (roles) => {
  return roles.filter((role) => !Object.values(ROLES).includes(role))
}

/**
 *
 * @param role string
 * @return string[]
 */
const expandAppRole = (role) =>
  Object.values(ROLES).filter(
    (curRole) => getRoleHierarchyValue(curRole) <= getRoleHierarchyValue(role),
  )

export const mergeRole = (role, roles) => {
  const _roles = removeAppRoles(roles)
  const _expandedRoles = expandAppRole(role)
  return [..._roles, ..._expandedRoles]
}

export const generatePassword = (length = 10) => {
  const shuffleArray = (array) => {
    const _array = [...array]
    for (let i = _array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      const temp = _array[i]
      _array[i] = _array[j]
      _array[j] = temp
    }
    return _array
  }

  const randomIndex = (array) => Math.floor(Math.random() * array.length)

  const randomItem = (indexed) => {
    const rIndex = randomIndex(indexed)
    return Array.isArray(indexed) ? indexed[rIndex] : indexed.charAt(rIndex)
  }

  length = length < 8 ? 8 : length
  const digits = '0123456789'
  const uppercases = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const lowercases = 'abcdefghijklmnopqrstuvwxyz'
  const nonWords = '!@#$%^&*()'

  const types = [digits, uppercases, lowercases, nonWords]

  const randomChar = (typeIndex) => randomItem(types[typeIndex])

  const generateRandomTypeIndexes = () => {
    const typeIndexes = []

    for (let i = 0; i < length - types.length; i++) {
      typeIndexes.push(randomIndex(types))
    }

    for (let i = 0; i < types.length; i++) {
      typeIndexes.push(i)
    }

    return shuffleArray(typeIndexes)
  }

  return generateRandomTypeIndexes().map(randomChar).join('')
}

export const generateId = generatePassword
