import { useAppResourcePageState } from '~/composables/states/useAppResourcePageState'

export const useResourceTotalItemsState = (
  resourcePageKey: ResourcePageKey,
) => {
  const { resourcePageState } = useAppResourcePageState(resourcePageKey)
  return computed({
    get() {
      return resourcePageState.value.totalItems
    },
    set(value: number) {
      resourcePageState.value.totalItems = value
    },
  })
}
