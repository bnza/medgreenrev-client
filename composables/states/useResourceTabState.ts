import { useAppResourcePageState } from '~/composables/states/useAppResourcePageState'
import type { ResourceKey } from '~/lib/resources'

export const useResourceTabState = (resourcePageKey: ResourceKey) => {
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
