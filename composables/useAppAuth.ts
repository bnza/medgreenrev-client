import { ROLES } from '~/lib/constants/enums'
import { reduceAppRoles } from '~/lib/index.js'

export function useAppAuth() {
  const { data, status } = useAuth()
  const isAuthenticated = computed(() => unref(status) === 'authenticated')
  const isLoading = computed(() => unref(status) === 'loading')
  const userIdentifier = computed(() =>
    unref(isAuthenticated) && data && 'email' in data?.value
      ? data.value.email
      : null,
  )

  const roles = computed(() => (unref(isAuthenticated) ? data.value.roles : []))

  function _hasRole(role: ApiRole) {
    if (!Object.values(ROLES).includes(role)) {
      throw `Invalid role "${role}"`
    }
    return unref(isAuthenticated) ? unref(roles).includes(role) : false
  }

  const hasRole = computed(() => _hasRole)
  const hasRoleAdmin = computed(() => _hasRole(ROLES.Admin))
  const roleColor = computed(
    () => ROLE_COLORS[reduceAppRoles(roles.value)] || '#FFF',
  )
  const hasSitePrivileges = (siteId: number) => siteId in data?.value.privileges

  const getSitePrivileges = (siteId: number) =>
    hasSitePrivileges(siteId) ? data?.value.privileges[siteId] : undefined

  const hasSitePrivilege = (
    siteId: number,
    privilegeKey: SitesGrantableRoles,
  ) =>
    hasRoleAdmin.value ||
    (hasSitePrivileges(siteId)
      ? hasPrivilege(getSitePrivileges(siteId), privilegeKey)
      : false)

  const hasSitePrivilegeEditor = (siteId: number) =>
    hasSitePrivilege(siteId, 'ROLE_SITE_EDITOR')

  return {
    isAuthenticated,
    isLoading,
    userIdentifier,
    hasRoleAdmin,
    hasRole,
    roleColor,
    hasSitePrivileges,
    hasSitePrivilegeEditor,
  }
}
