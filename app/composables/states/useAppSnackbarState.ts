// @TODO handle concurrent messages

export type ResponseError = {
  status: number
  _data?: {
    '@type'?: string
    violations: Array<{ message: string }>
  }
}

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

  const showError = (e: Error & { response?: ResponseError }) => {
    let text: string = e.message
    let response: ResponseError | undefined = e.response

    if (
      response?.status === 422 &&
      '@type' in response._data &&
      response._data['@type'] === 'ConstraintViolationList'
    ) {
      text = response._data.violations.reduce(
        (
          acc: string,
          curr: {
            message: string
          },
          i: number,
        ) => (acc += (i > 0 ? ',' : '') + curr.message),
        '',
      )
    }

    show({
      color: 'error',
      text,
      timeout: -1,
    })
  }

  return { state, show, showError, reset }
}
