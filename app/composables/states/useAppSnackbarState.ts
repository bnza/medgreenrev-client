import { type SnackbarState, getDefault } from '~/utils/constants/snackbar'

export type ResponseError = {
  status: number
  _data?: {
    '@type'?: string
    violations: Array<{ message: string }>
  }
}
export default function () {
  const stack: Ref<Record<number, SnackbarState>> = useState(
    States.AppSnackbar,
    () => ({}),
  )
  const { increment } = useGlobalSequenceState()

  const set = (value: SnackbarState) => {
    const key = increment()
    stack.value[key] = value
    return key
  }

  const showSuccess = (value: Pick<SnackbarState, 'text'> | string) => {
    if ('string' === typeof value) {
      value = { text: value }
    }
    set(Object.assign(getDefault(), { color: 'success', timeout: 5000 }, value))
  }
  const showError = (
    value:
      | Pick<SnackbarState, 'text'>
      | string
      | (Error & { response?: ResponseError }),
  ) => {
    if (value instanceof Error) {
      let text: string = value.message
      let response: ResponseError | undefined = value.response

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
      value = text
    }

    if ('string' === typeof value) {
      value = { text: value }
    }

    set(Object.assign(getDefault(), { color: 'error', timeout: -1 }, value))
  }

  const unset = (key: number) => {
    delete stack.value[key]
  }

  const snackbars = computed(() => Object.entries(stack.value))

  const getMargin = (key: string) => {
    const index = snackbars.value.findIndex((current) => current[0] == key)
    return index * 60
  }

  return { showError, snackbars, showSuccess, unset, getMargin }
}
