import type { AppUiMode } from '~~/types'

enum State {
  Current,
  Previous,
  LogoutPending,
}

export default function () {
  const _mode: Ref<[AppUiMode, AppUiMode, boolean]> = useState(
    States.AppUiMode,
    () => ['default', 'default', false],
  )

  const icon = computed(() =>
    _mode.value[0] === 'default' ? 'fas fa-globe' : 'fas fa-table',
  )
  const toggle = () =>
    (_mode.value[State.Current] =
      _mode.value[State.Current] === 'default' ? 'map' : 'default')
  const set = (value: AppUiMode) => {
    if (_mode.value[State.Current] !== value) {
      _mode.value[State.LogoutPending] = value === 'logout'
      _mode.value[State.Previous] = _mode.value[State.Current]
      _mode.value[State.Current] = value
    }
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
  const logoutPending = computed({
    get() {
      return _mode.value[State.LogoutPending]
    },
    set(_: false) {
      _mode.value[State.LogoutPending] = false
    },
  })
  const authMode = computed(() => ['login', 'logout'].includes(mode.value))
  return { icon, mode, prev, toggle, authMode, logoutPending }
}
