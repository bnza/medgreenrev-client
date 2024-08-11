import type { Filter } from '~/lib/constants/filters'

export type ResourcePageState = {
  routeName: string
  filters: Array<Filter>
}
type AppResourcePagesState = Record<string, ResourcePageState> | {}
export const useAppResourcePageState = (resourcePageKey: string) => {
  const state: Ref<AppResourcePagesState> = useState(
    STATE_APP_RESOURCE_PAGES,
    () => new Object(),
  )

  const getResourcePageRootKey = (resourcePageKey: string) => {
    const resourcePageRootKey = resourcePageKey.split('/')[0]
    if (!(resourcePageRootKey in RESOURCE_PAGES_KEY_TO_RESOURCE_KEY_MAP)) {
      console.error(`No such "${resourcePageRootKey}" key`)
    }
    return resourcePageRootKey
  }
  const initResourcePageState = (resourcePageKey: string) => {
    state.value[resourcePageKey] = {
      routeName: resourcePageKey,
      filters: [],
    }
  }
  const getResourcePageState = (): ResourcePageState => {
    if (!(resourcePageKey in state.value)) {
      initResourcePageState(resourcePageKey)
    }
    return state.value[resourcePageKey]
  }

  const resourcePageState = computed(getResourcePageState)

  return { resourcePageState }
}
