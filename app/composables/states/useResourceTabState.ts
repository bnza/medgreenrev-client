import { useAppResourcePageState } from '~/composables/states/useAppResourcePageState'
import type { ResourcePageKey } from '~~/types'

export const useResourceTabState = (resourcePageKey: ResourcePageKey) => {
  const { resourcePageState } = useAppResourcePageState(resourcePageKey)
  const tab = computed({
    get() {
      return resourcePageState.tab
    },
    set(value: string) {
      resourcePageState.tab = value
    },
  })
  return { tab }
}
