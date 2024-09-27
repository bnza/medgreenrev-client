import { ApiRole, ROLE_HIERARCHY_VALUES } from '~/utils/constants/auth'

const isAppRole = (value: string): value is ApiRole =>
  (<any>Object).values(ApiRole).includes(value)

const getRoleHierarchyValue = (role: ApiRole | '') =>
  ROLE_HIERARCHY_VALUES[role] || 0

export const reduceAppRoles = (roles: Array<string>) => {
  const appRoles = roles.filter(isAppRole)
  return appRoles.reduce((acc: ApiRole | '', curr) => {
    return getRoleHierarchyValue(curr) > getRoleHierarchyValue(acc) ? curr : acc
  }, '')
}
