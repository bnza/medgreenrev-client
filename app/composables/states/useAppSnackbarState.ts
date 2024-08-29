// @TODO handle concurrent messages
export const useAppSnackbarState = () => {
  const _default = {
    visible: false,
    vertical: false,
    title: '',
    text: '',
    color: 'info',
    timeout: -1,
    multiline: false,
  }

  type SnackbarState = typeof _default
  const defaultFn = () => structuredClone(_default)
  const state = useState(STATE_APP_SNACKBAR, defaultFn)

  const reset = () => {
    state.value = defaultFn()
  }

  const set = (newState: Partial<SnackbarState>) => {
    state.value = Object.assign({}, defaultFn(), newState)
  }

  const show = (newState: Partial<SnackbarState>) => {
    set(Object.assign({ visible: true }, newState))
  }

  return { state, show, reset }
}
