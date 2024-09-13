export type ResourcePageState = {
  routeName: ResourcePageKey
  filters: Array<Filter>
  pagination: PaginationOptionsState
  tab: string | null
  from: [string, MaybeResourcePageKey]
  totalItems: number
}

export const getDefaultResourcePageState = (
  resourcePageKey: ResourcePageKey,
): ResourcePageState =>
  structuredClone({
    routeName: resourcePageKey,
    filters: [],
    pagination: defaultPaginationOptions,
    tab: null,
    from: ['/', ''],
    totalItems: 0,
  })

type AppResourcePagesState = Record<string, ResourcePageState> | {}
export const useAppResourcePageState = (resourcePageKey: ResourcePageKey) => {
  const state: Ref<AppResourcePagesState> = useState(
    STATE_APP_RESOURCE_PAGES,
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

  const resourcePageState = computed(getResourcePageState)

  return { resourcePageState }
}
