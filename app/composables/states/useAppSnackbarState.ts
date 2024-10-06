import { type SnackbarState, getDefault } from '~/utils/constants/snackbar'

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
  const showError = (value: Pick<SnackbarState, 'text'> | string) => {
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
