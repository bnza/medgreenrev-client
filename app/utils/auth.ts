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
const removeAppRoles = (roles: Array<ApiSpecialistRole | ApiRole>) => {
  const isString = (role): role is ApiSpecialistRole =>
    !Object.values(ApiRole).includes(role)
  return roles.filter(isString)
}
const expandAppRole = (role: ApiRole) =>
  Object.values(ApiRole).filter(
    (curRole) => getRoleHierarchyValue(curRole) <= getRoleHierarchyValue(role),
  )
export const mergeRole = (
  role: ApiRole,
  roles: Array<ApiRole | ApiSpecialistRole>,
) => {
  const _roles = removeAppRoles(roles)
  const _expandedRoles = expandAppRole(role)
  return [..._roles, ..._expandedRoles]
}
