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
  const defaultFn = () => _default
  const state = useState(STATE_APP_SNACKBAR, defaultFn)

  const reset = () => {
    state.value = defaultFn()
  }

  const set = (newState) => {
    state.value = Object.assign({}, defaultFn(), newState)
  }

  const show = (newState) => {
    set(Object.assign({ visible: true }, newState))
  }

  return { state, show, reset }
}
