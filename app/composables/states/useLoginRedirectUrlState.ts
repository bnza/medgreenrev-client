import type { RouteLocationNormalizedGeneric } from '#vue-router'

export const useLoginRedirectUrlState = () => {
  const state = useState(STATE_LOGIN_REDIRECT_URL, () => '')
  const route = useRoute()

  function set(route: RouteLocationNormalizedGeneric) {
    if (route.name !== 'login') {
      state.value = route.fullPath
    }
  }

  function reset() {
    state.value = ''
  }

  const redirectUrl = computed(
    () => route.redirectedFrom?.fullPath ?? state.value ?? '/',
  )
  return { redirectUrl, set, reset }
}
