export type ResourcePageState = {
  routeName: string
  filters: Array<Filter>
  pagination: PaginationOptionsState
}
type AppResourcePagesState = Record<string, ResourcePageState> | {}
export const useAppResourcePageState = (resourcePageKey: string) => {
  const state: Ref<AppResourcePagesState> = useState(
    STATE_APP_RESOURCE_PAGES,
    () => new Object(),
  )

  const initResourcePageState = (resourcePageKey: string) => {
    state.value[resourcePageKey] = {
      routeName: resourcePageKey,
      filters: [],
      pagination: structuredClone(defaultPaginationOptions),
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
