export const useUserPlainPasswordState = () => {
  const _plainPassword = useState(STATE_USER_PLAIN_PASSWORD, () => '')

  function set(password) {
    _plainPassword.value = password
  }

  function clear() {
    _plainPassword.value = ''
  }

  const plainPassword = computed(() => _plainPassword.value)
  return { plainPassword, set, clear }
}
