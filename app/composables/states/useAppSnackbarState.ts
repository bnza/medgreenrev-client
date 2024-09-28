import { type SnackbarState, getDefault } from '~/utils/constants/snackbar'

export default function () {
  const stack: Ref<Record<number, SnackbarState>> = useState(
    States.AppSnackbar,
    () => ({}),
  )
  const { increment } = useGlobalSequence()

  const set = (value: SnackbarState) => {
    const key = increment()
    stack.value[key] = value
    return key
  }

  const success = (value: Pick<SnackbarState, 'text'>) => {
    set(Object.assign(getDefault(), { color: 'success', timeout: 5000 }, value))
  }
  const error = (value: Pick<SnackbarState, 'text'>) => {
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

  return { error, snackbars, success, unset, getMargin }
}
