import type { Filter, ResourceConfig, ResourcePageKey } from '~~/types'
import { getPropertyAvailableOperators } from '~/utils/filters'
import { API_FILTERS } from '~/utils/constants/filters'

export type UseResourceFiltersState = ReturnType<typeof useResourceFilterState>
export const resourceFilterStateInjectionKey =
  Symbol() as InjectionKey<UseResourceFiltersState>
const useResourceFilterState = (
  resourcePageKey: ResourcePageKey,
  resourceConfig: ResourceConfig,
) => {
  const router = useRouter()
  const state: Ref<Record<number, Filter> | {}> = useState(
    `${States.AppResourceFilter}:${resourcePageKey}`,
    () => ({}),
  )
  const { increment } = useGlobalSequence()
  const isAddFilterDialogOpen = ref(false)

  const _filters = reactive(structuredClone(toRaw(state.value)))
  const filters = computed(() => _filters)

  const isEmpty = computed(() => Object.keys(_filters).length === 0)

  const isChanged = ref(false)

  const _setFilter = (filter: Filter) => {
    filter = structuredClone(toRaw(filter))
    if (!('id' in filter)) {
      filter.id = increment()
    }
    _filters[filter.id] = filter
  }

  const setFilter = (filter: Filter) => {
    _setFilter(filter)
    isAddFilterDialogOpen.value = false
  }

  const { isAuthenticated } = useAppAuth()

  const protectedFields = computed(() =>
    isAuthenticated.value ? [] : resourceConfig.protectedFields || [],
  )

  const getAvailableOperators = (prop: string) =>
    getPropertyAvailableOperators(resourcePageKey, filters.value, prop)

  const availableProperties = computed(() =>
    getResourceAvailableProps(
      resourcePageKey,
      filters.value,
      protectedFields.value,
    ),
  )

  const deleteFilter = (filter: Filter) => {
    if (filter.id in _filters) {
      delete _filters[filter.id]
    }
  }

  watch(_filters, () => {
    isChanged.value = true
  })

  const setFiltersAndClose = () => {
    state.value = toRaw(_filters)
    if (history.state.back) {
      return router.replace(history.state.back)
    }
    return router.replace(resourceConfig.appPath)
  }

  const clearFilters = () => {
    Object.keys(_filters).forEach((key) => _filters[key])
  }

  const resourceFilterParams = computed(() => {
    const obj = {}
    for (const filter of Object.values(state.value)) {
      API_FILTERS[filter.filter].addToObject(obj, filter)
    }
    return obj
  })

  return {
    availableProperties,
    clearFilters,
    deleteFilter,
    filters,
    getAvailableOperators,
    isAddFilterDialogOpen,
    isChanged,
    isEmpty,
    resourceFilterParams,
    setFilter,
    setFiltersAndClose,
  }
}

export default useResourceFilterState
