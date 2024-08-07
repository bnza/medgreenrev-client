import type { ResourceFiltersState } from '~/composables/states/useAppFiltersState'
import type { FilterDefinitionObject } from '~/lib/constants/filters'

const getResourceKey = (routeName: string) => {
  const resourceKey = ROUTE_NAMES_RESOURCES_MAP[routeName]
  if (!resourceKey) {
    console.error(`Invalid route name "${routeName}"`)
  }
  return resourceKey || ''
}
const getResourceFiltersDefinitions = (routeNameOrResourceKey: string) => {
  const key = getResourceKey(routeNameOrResourceKey) || routeNameOrResourceKey
  const resourceFiltersDefinitions = RESOURCES_FILTERS[key]
  if (!resourceFiltersDefinitions) {
    console.error(`Invalid key provided: "${routeNameOrResourceKey}", "${key}"`)
  }
  return resourceFiltersDefinitions || {}
}

const getResourceFiltersDefinitionsByFilterObject = (
  resourceFiltersState: ResourceFiltersState,
) => {
  if (!('routeName' in resourceFiltersState)) {
    console.error('Invalid filtersObject provided')
    return {}
  }
  return getResourceFiltersDefinitions(resourceFiltersState.routeName)
}

export const getAvailableProps = (
  resourceFiltersState: ResourceFiltersState,
): Array<{ value: string; title: string }> => {
  const resourceFiltersDefinitionObject =
    getResourceFiltersDefinitionsByFilterObject(resourceFiltersState)

  const resourceFilters = resourceFiltersState.filters

  return Object.entries(resourceFiltersDefinitionObject)
    .filter(([prop, resourcePropFiltersDefinition]) =>
      Object.values(resourcePropFiltersDefinition.filters).some(
        (filterDefinition) =>
          filterDefinition.multiple ||
          !resourceFilters.some((currFilterState) => {
            return (
              prop === currFilterState.property // &&
              //filterDefinition.id === currFilterState.filter
            )
          }),
      ),
    )
    .map(([prop, resourcePropFilterDefinition]) => {
      // @see https://vuetifyjs.com/en/api/v-select/#props-item-title
      return {
        value: prop,
        title: resourcePropFilterDefinition.propertyLabel || prop,
      }
    })
    .sort((a, b) => a.value.localeCompare(b.value))
}

export const getAvailableOperators = (
  resourceFiltersState: ResourceFiltersState,
  prop: string,
): Array<FilterDefinitionObject> => {
  const resourceFiltersDefinitionObject =
    getResourceFiltersDefinitionsByFilterObject(resourceFiltersState)
  if (!(prop in resourceFiltersDefinitionObject)) {
    return []
  }
  const resourcePropFiltersDefinition =
    resourceFiltersDefinitionObject[prop].filters
  return Object.values(resourcePropFiltersDefinition).filter(
    (filterDefinition) =>
      filterDefinition.multiple ||
      !resourceFiltersState.filters.some(
        (currFilterState) =>
          prop === currFilterState.property &&
          currFilterState.filter === filterDefinition.id,
      ),
  )
}
