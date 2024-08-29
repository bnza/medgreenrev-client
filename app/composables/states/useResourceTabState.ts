import { useAppResourcePageState } from '~/composables/states/useAppResourcePageState'

export const useResourceTabState = (resourcePageKey: ResourcePageKey) => {
  const { resourcePageState } = useAppResourcePageState(resourcePageKey)
  const tab = computed({
    get() {
      return resourcePageState.value.tab
    },
    set(value: string) {
      resourcePageState.value.tab = value
    },
  })

  return { tab }
}
