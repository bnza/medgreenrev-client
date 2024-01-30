import {type Ref, UnwrapRef} from 'vue'

export const useUiAppMode = defineStore('uiAppMode', () => {
  const mode = ref('default' as UiMode)

  const icon = computed(() =>
    mode.value === 'default' ? 'mdi-list-box-outline' : 'mdi-earth',
  )

  function setMode(newMode: UiMode) {
    mode.value = newMode
    console.log('new mode', newMode)
  }

  function toggleMode() {
    const newMode: UiMode = mode.value === 'default' ? 'map' : 'default'
    setMode(newMode)
  }

  return { mode, icon, setMode, toggleMode }
})