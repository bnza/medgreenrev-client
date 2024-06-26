export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated, hasRoleAdmin, hasRole } = useAppAuth()
  const voters = to.meta.voters || []
  const { show } = useAppSnackbarState()
  const isAuthenticatedVoter = () => {
    const _return = { granted: isAuthenticated.value }
    if (!_return.granted) {
      _return.message = 'Unauthenticated user'
      _return.redirectTo = '/login'
    }
    return _return
  }

  const hasRoleAdminVoter = () => {
    const _return = { granted: hasRoleAdmin.value }
    if (!_return.granted) {
      _return.message = 'Insufficient privileges: role ADMIN required'
      _return.redirectTo = '/'
    }
    return _return
  }

  const _voters = Object.freeze({
    [ACL_VOTERS.IsAuthenticated]: isAuthenticatedVoter,
    [ACL_VOTERS.HasRoleAdmin]: hasRoleAdminVoter,
  })

  const vote = voters.reduce(
    (accVote, cur) => {
      if (accVote.granted) {
        return _voters[cur]()
      }
      return accVote
    },
    structuredClone({ granted: true, message: '', redirectTo: '' }),
  )

  if (!vote.granted) {
    if (vote.message) {
      show({
        color: 'error',
        text: vote.message,
        timeout: -1,
      })
    }
    if (vote.redirectTo) {
      return navigateTo(vote.redirectTo)
    }
    return abortNavigation(vote.message)
  }
})
