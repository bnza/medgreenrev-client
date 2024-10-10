import type { ResourcePageKey } from '~~/types'
import { useAppResourcePageState } from '~/composables/states/useAppResourcePageState'

export const useResourceFilteredItemsCountState = (
  resourcePageKey: ResourcePageKey,
) => {
  const { resourcePageState } = useAppResourcePageState(resourcePageKey)
  return computed({
    get() {
      return resourcePageState.filteredItemsCount
    },
    set(value: number) {
      resourcePageState.filteredItemsCount = value
    },
  })
}
