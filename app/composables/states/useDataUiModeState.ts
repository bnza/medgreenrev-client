import type { AppUiMode } from '~~/types'

export default function () {
  const _mode: Ref<[AppUiMode, AppUiMode]> = useState(States.AppUiMode, () => [
    'default',
    'default',
  ])

  const icon = computed(() =>
    _mode.value[0] === 'default' ? 'fas fa-globe' : 'fas fa-table',
  )
  const toggle = () =>
    (_mode.value[0] = _mode.value[0] === 'default' ? 'map' : 'default')
  const set = (value: AppUiMode) => {
    _mode.value[1] = _mode.value[0]
    _mode.value[0] = value
  }
  const prev = () => {
    _mode.value[0] = _mode.value[1]
  }

  const mode = computed({
    get() {
      return _mode.value[0]
    },
    set,
  })
  return { icon, mode, prev, toggle }
}
