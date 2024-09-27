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

  const roleColor = computed(
    () => ROLE_COLORS[reduceAppRoles(roles.value)] || '#FFF',
  )

  return {
    isAuthenticated,
    isLoading,
    userIdentifier,
    roleColor,
  }
}
