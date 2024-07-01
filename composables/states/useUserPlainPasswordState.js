import { STATE_USER_PLAIN_PASSWORD } from '~/lib/constants/stateKeys.js'

export const useUserPlainPasswordState = () => {
  const _plainPassword = useState(STATE_USER_PLAIN_PASSWORD, () => '')

  function set(password) {
    _plainPassword.value = password
  }

  function reset() {
    _plainPassword.value = ''
  }

  const plainPassword = computed(() => _plainPassword.value)
  return { plainPassword, set, reset }
}