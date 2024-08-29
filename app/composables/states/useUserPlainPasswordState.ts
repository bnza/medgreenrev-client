export const useUserPlainPasswordState = () => {
  const state: Ref<string> = useState(STATE_USER_PLAIN_PASSWORD, () => '')

  function set(password: string) {
    state.value = password
  }

  function clear() {
    state.value = ''
  }

  const plainPassword: ComputedRef<string> = computed(() => state.value)
  return { plainPassword, set, clear }
}
