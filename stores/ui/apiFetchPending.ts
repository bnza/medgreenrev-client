export const useUiApiFetchPending = defineStore('uiApiFetchPending', () => {
  const pending = ref(false)
  return { pending }
})