import { useAppFiltersState } from '~/composables/states/useAppFiltersState.js'
import { RESOURCES_FILTERS } from '~/lib/constants/filters.js'

const getResourceKey = (routeName) => {
  const resourceKey = ROUTE_NAMES_RESOURCES_MAP[routeName]
  if (!resourceKey) {
    console.error(`Invalid route name "${routeName}"`)
  }
  return resourceKey || ''
}

const getResourceFilters = (routeNameOrResourceKey) => {
  const key = getResourceKey(routeNameOrResourceKey) || routeNameOrResourceKey
  const resourceFilters = RESOURCES_FILTERS[key]
  if (!resourceFilters) {
    console.error(`Invalid key provided: "${routeNameOrResourceKey}", "${key}"`)
  }
  return resourceFilters || {}
}

const getFilterKey = (filterObj) =>
  API_FILTERS[filterObj.operator].getKey(filterObj)

const hasSameKey = (filterA, filterB) =>
  getFilterKey(filterA) === getFilterKey(filterB)
const findFilterIndex = (filterObject, filter) => {
  return filterObject.filters.findIndex((currFilter) =>
    hasSameKey(currFilter, filter),
  )
}

const getResourceFiltersByFilterObject = (filtersObject) => {
  if (!('routeName' in filtersObject)) {
    console.error('Invalid filtersObject provided')
    return {}
  }
  return getResourceFilters(filtersObject.routeName)
}
const getAvailableProps = (filtersObject) => {
  const resourceFilters = getResourceFiltersByFilterObject(filtersObject)
  return Object.entries(resourceFilters)
    .filter(([prop, propResourceFilters]) =>
      Object.values(propResourceFilters).some(
        (resourceFilter) =>
          resourceFilter.multiple ||
          !filtersObject.filters.some((currStateFilter) => {
            return (
              prop === currStateFilter.property &&
              currStateFilter.operator === resourceFilter.id
            )
          }),
      ),
    )
    .map(([prop, _]) => prop)
}

const getAvailableOperators = (filtersObject) => (prop) => {
  const resourceFilters = getResourceFiltersByFilterObject(filtersObject)
  const propFilters = resourceFilters[prop] || []
  return Object.values(propFilters).filter(
    (filter) =>
      filter.multiple ||
      !filtersObject.filters.some(
        (currFilter) =>
          prop === currFilter.property && currFilter.operator === filter.id,
      ),
  )
}

export const useResourceFiltersState = (routeName = '') => {
  if (!routeName) {
    console.error('route name is required')
    return {}
  }

  const { getResourceFilters } = useAppFiltersState()

  const filtersObject = getResourceFilters(routeName)

  const state = reactive(structuredClone(toRaw(filtersObject.value)))

  const isEmpty = computed(() => state.filters.length === 0)

  const availableProps = computed(() => getAvailableProps(state))

  const getAvailableOperatorsByProp = (prop) =>
    computed(() => getAvailableOperators(state)(prop))

  const filters = computed(() => state.filters)

  const setFilter = (filter) => {
    filter = structuredClone(filter)
    const index = findFilterIndex(state, filter)
    if (index > -1) {
      state.filters[index] = filter
      return
    }
    state.filters.push(filter)
  }

  const removeFilter = (filter) => {
    state.filters = reactive(
      state.filters.filter(
        (currFilter) => getFilterKey(filter) !== getFilterKey(currFilter),
      ),
    )
  }

  const persistFilters = () => {
    filtersObject.value.filters = structuredClone(
      toRaw(state.filters.map(toRaw)),
    )
  }

  const resourceFilterParams = computed(() => {
    const obj = {}
    for (const filter of unref(filtersObject).filters) {
      API_FILTERS[filter.operator].addToObject(obj, filter)
    }
    return obj
  })

  return {
    filters,
    getFilterKey,
    getAvailableOperatorsByProp,
    removeFilter,
    setFilter,
    persistFilters,
    isEmpty,
    availableProps,
    resourceFilterParams,
  }
}
