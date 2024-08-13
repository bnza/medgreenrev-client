import { ROLES } from '~/lib/constants/enums.ts'
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

  function _hasRole(role) {
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
  return {
    isAuthenticated,
    isLoading,
    userIdentifier,
    hasRoleAdmin,
    hasRole,
    roleColor,
  }
}
