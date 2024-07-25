import {
  type ResourceFiltersState,
  useAppFiltersState,
} from '~/composables/states/useAppFiltersState'
import { getAvailableOperators, getAvailableProps } from '~/lib/filters'
import type { Filter } from '~/lib/constants/filters'

export const useResourceFiltersState = (routeName = '') => {
  if (!routeName) {
    console.error('route name is required')
    return {}
  }

  const { getResourceFilters } = useAppFiltersState()

  const resourceFiltersState = getResourceFilters(routeName)

  const workData: ResourceFiltersState = reactive(
    structuredClone(toRaw(resourceFiltersState.value)),
  )

  const isEmpty = computed(() => workData.filters.length === 0)

  const availableProps = computed(() => getAvailableProps(workData))

  const getAvailableOperatorsByProp = (prop: string) =>
    computed(() => getAvailableOperators(workData, prop))

  const filters = computed(() => workData.filters)

  const setFilter = (filter: Filter) => {
    filter = structuredClone(filter)
    const index = workData.filters.findIndex(
      (currFilter) => currFilter.id === filter.id,
    )
    if (index > -1) {
      workData.filters[index] = filter
      return
    }
    workData.filters.push(filter)
  }

  const removeFilter = (filter: Filter) => {
    workData.filters = reactive(
      workData.filters.filter((currFilter) => filter.id !== currFilter.id),
    )
  }

  const persistFilters = () => {
    resourceFiltersState.value.filters = structuredClone(
      toRaw(workData.filters.map(toRaw)),
    )
  }

  const resourceFilterParams = computed(() => {
    const obj = {}
    for (const filter of unref(resourceFiltersState).filters) {
      API_FILTERS[filter.filter].addToObject(obj, filter)
    }
    return obj
  })

  return {
    filters,
    getAvailableOperatorsByProp,
    removeFilter,
    setFilter,
    persistFilters,
    isEmpty,
    availableProps,
    resourceFilterParams,
  }
}
