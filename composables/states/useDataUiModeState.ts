import type { AppUiMode } from '~/lib/constants/enums'

export const useDataUiModeState = () => {
  const mode: Ref<AppUiMode> = useState(STATE_DATA_UI_MODE, () => 'default')

  const icon = computed(() =>
    mode.value === 'default' ? 'fas fa-globe' : 'fas fa-table',
  )
  const toggle = () =>
    (mode.value = mode.value === 'default' ? 'map' : 'default')
  const set = (newMode: AppUiMode) => {
    mode.value = newMode
  }
  return { icon, mode, set, toggle }
}
