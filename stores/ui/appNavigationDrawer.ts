export const useUiAppNavigationDrawerStore = defineStore('uiAppNavigationDrawer', () => {
  const visible = ref(false)

  function toggleVisible() {
    visible.value = !visible.value
  }

  return { visible, toggleVisible }
})