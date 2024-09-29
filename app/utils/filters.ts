import type {
  Filter,
  FilterDefinitionObject,
  ResourcePageKey,
  ResourcePropertyFiltersDefinitionObject,
} from '~~/types'
import { RESOURCE_PAGES_STATE } from '~/utils/constants/filters'

type ResourceFilterDefinitionEntry = [
  string,
  ResourcePropertyFiltersDefinitionObject,
]
export const getResourceAvailableProps = (
  resourcePageKey: ResourcePageKey,
  state: Record<number, Filter>,
  protectedFields: Array<string>,
) => {
  const resourceFiltersDefinitionObject =
    getResourceFiltersDefinitions(resourcePageKey)

  const isPropAvailable = ([
    prop,
    propFilterDefinition,
  ]: ResourceFilterDefinitionEntry) =>
    !protectedFields.includes(prop) &&
    (hasPropMultipleFilter(propFilterDefinition.filters) ||
      !isPropAlreadySet(state, prop))

  const propFilterDefinitionToMenuEntry = ([
    prop,
    propFilterDefinition,
  ]: ResourceFilterDefinitionEntry) => ({
    value: prop,
    title: propFilterDefinition.propertyLabel || prop,
  })

  return Object.entries(resourceFiltersDefinitionObject)
    .filter(isPropAvailable)
    .map(propFilterDefinitionToMenuEntry)
    .sort((a, b) => a.value.localeCompare(b.value))
}
const hasPropMultipleFilter = (
  filters: Record<string, FilterDefinitionObject>,
) => Object.values(filters).some((filter) => filter.multiple)

export const getPropertyAvailableOperators = (
  resourcePageKey: ResourcePageKey,
  state: Record<number, Filter>,
  prop: string,
) => {
  const resourceFiltersDefinitionObject =
    getResourceFiltersDefinitions(resourcePageKey)
  return Object.values(resourceFiltersDefinitionObject[prop].filters || {})
    .filter(
      (filterDefinitionObject) =>
        filterDefinitionObject.multiple ||
        // Operator is not already set
        !Object.values(state).some(
          (filterState) =>
            prop === filterState.property &&
            filterDefinitionObject.id === filterState.filter,
        ),
    )
    .map((filterDefinition) => ({
      value: filterDefinition.id,
      title: filterDefinition.label,
    }))
}

const isPropAlreadySet = (state: Record<number, Filter>, prop: string) => {
  return Object.values(state).some((filter: Filter) => prop === filter.property)
}

const getResourceFiltersDefinitions = (resourcePageKey: ResourcePageKey) => {
  //const key = getResourceKey(routeNameOrResourceKey) || routeNameOrResourceKey
  const key = getResourceKey(resourcePageKey)
  const resourceFiltersDefinitions = RESOURCE_PAGES_STATE[key]
  if (!resourceFiltersDefinitions) {
    console.error(
      `No resource filter definition found: keys "${resourcePageKey}", "${key}"`,
    )
  }
  return resourceFiltersDefinitions || {}
}
