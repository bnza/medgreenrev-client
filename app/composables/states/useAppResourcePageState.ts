import type { PaginationOptionsState, ResourcePageKey } from '~~/types'

export type ResourcePageState = {
  key: ResourcePageKey
  // filters: Array<Filter>
  // tab: string | null
  // from: [string, MaybeResourcePageKey]
  // totalItems: number
}

export const getDefaultResourcePageState = (
  resourcePageKey: ResourcePageKey,
): ResourcePageState =>
  structuredClone({
    key: resourcePageKey,
    filters: [],
    tab: null,
    from: ['/', ''],
    totalItems: 0,
  })

type AppResourcePagesState = Record<string, ResourcePageState> | {}
export const useAppResourcePageState = (resourcePageKey: ResourcePageKey) => {
  const state = useState<AppResourcePagesState>(
    States.AppResourcePageState,
    () => new Object(),
  )

  const initResourcePageState = (resourcePageKey: ResourcePageKey) => {
    state.value[resourcePageKey] = getDefaultResourcePageState(resourcePageKey)
  }
  const getResourcePageState = (): ResourcePageState => {
    if (!(resourcePageKey in state.value)) {
      initResourcePageState(resourcePageKey)
    }
    return state.value[resourcePageKey]
  }

  const resourcePageState = getResourcePageState()

  return { resourcePageState }
}
