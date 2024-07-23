import { useAppFiltersState } from '~/composables/states/useAppFiltersState.js'

export const useResourceFiltersState = (routeName = '') => {
  if (!routeName) {
    const { query } = useRoute()
    routeName = query.filterKey
  }
  const { getResourceFilters } = useAppFiltersState()
  const filters = getResourceFilters(routeName)
  const isEmpty = computed(() => filters.size === 0)
  const availableProps = computed(() => filters.listAvailableProps())
  const availableOperatorsFn = (prop) =>
    computed(() => filters.listAvailableOperators(prop))

  const state = reactive(filters.clone())

  const setFilter = (rawFilter) => {
    state.setFilter(rawFilter)
  }

  const resourceFilterParams = computed(() => filters.toObject())
  const setFilters = () => filters.setFilters(toRaw(state))
  return {
    state,
    setFilter,
    setFilters,
    isEmpty,
    availableProps,
    availableOperatorsFn,
    resourceFilterParams,
  }
}
