export function useAppAuth() {
  const { data, status } = useAuth()
  const isAuthenticated = computed(() => unref(status) === 'authenticated')
  const isLoading = computed(() => unref(status) === 'loading')
  const userIdentifier = computed(() =>
    unref(isAuthenticated) && data && 'email' in data?.value
      ? data.value.email
      : null,
  )
  return { isAuthenticated, isLoading, userIdentifier }
}
