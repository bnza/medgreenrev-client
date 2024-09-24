import { useAppResourcePageState } from '~/composables/states/useAppResourcePageState'

export const useResourceTotalItemsState = (
  resourcePageKey: ResourcePageKey,
) => {
  const { resourcePageState } = useAppResourcePageState(resourcePageKey)
  return computed({
    get() {
      return resourcePageState.totalItems
    },
    set(value: number) {
      resourcePageState.totalItems = value
    },
  })
}
