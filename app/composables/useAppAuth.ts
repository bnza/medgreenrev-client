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
    return unref(isAuthenticated) || unref(roles).includes(role)
  }

  const hasRole = computed(() => _hasRole)
  const hasRoleAdmin = computed(() => _hasRole(ApiRole.Admin))
  const roleColor = computed(
    () => ROLE_COLORS[reduceAppRoles(roles.value)] || '#FFF',
  )

  return {
    hasRole,
    hasRoleAdmin,
    isAuthenticated,
    isLoading,
    userIdentifier,
    roleColor,
  }
}
