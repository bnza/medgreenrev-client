import type { ResourcePageState } from '~/composables/states/useAppResourcePageState'
import type { FilterDefinitionObject } from '~/lib/constants/filters'
import { getResourcePageRootKey } from '~/lib/resources'

// const getResourceKey = (resourcePageKey: string) => {
//   resourcePageKey = resourcePageKey.split('/')[0]
//   const resourceKey = RESOURCE_PAGES_KEY_TO_RESOURCE_KEY_MAP[resourcePageKey]
//   if (!resourceKey) {
//     console.error(`Invalid route name "${resourcePageKey}"`)
//   }
//   return resourceKey || ''
// }
const getResourceFiltersDefinitions = (resourcePageKey: ResourcePageKey) => {
  //const key = getResourceKey(routeNameOrResourceKey) || routeNameOrResourceKey
  const key = getResourcePageRootKey(resourcePageKey)
  const resourceFiltersDefinitions = RESOURCE_PAGES_STATE[key]
  if (!resourceFiltersDefinitions) {
    console.error(
      `No resource filter definition found: keys "${resourcePageKey}", "${key}"`,
    )
  }
  return resourceFiltersDefinitions || {}
}

const getResourceFiltersDefinitionsByFilterObject = (
  resourceFiltersState: ResourcePageState,
) => {
  if (!('routeName' in resourceFiltersState)) {
    console.error('Invalid filtersObject provided')
    return {}
  }
  return getResourceFiltersDefinitions(resourceFiltersState.routeName)
}

export const getAvailableProps = (
  resourceFiltersState: ResourcePageState,
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
  resourceFiltersState: ResourcePageState,
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
