export const useDataUiModeState = () => {
  const mode = useState(STATE_DATA_UI_MODE, () => DATA_UI_MODE.Default)

  const icon = computed(() =>
    mode.value === DATA_UI_MODE.Default ? 'fas fa-globe' : 'fas fa-table',
  )
  const toggle = () =>
    (mode.value =
      mode.value === DATA_UI_MODE.Default
        ? DATA_UI_MODE.Map
        : DATA_UI_MODE.Default)
  const set = (newMode) => {
    mode.value = newMode
  }
  return { icon, mode, set, toggle }
}
