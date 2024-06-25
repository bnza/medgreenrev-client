export const useLoginRedirectUrlState = () => {
  const _redirectUrl = useState(STATE_LOGIN_REDIRECT_URL, () => '')
  const route = useRoute()

  function set(route) {
    if (route.name !== 'login') {
      _redirectUrl.value = route.fullPath
    }
  }

  function reset() {
    _redirectUrl.value = ''
  }

  const redirectUrl = computed(
    () => route.redirectedFrom?.fullPath ?? _redirectUrl.value ?? '/',
  )
  return { redirectUrl, set, reset }
}
