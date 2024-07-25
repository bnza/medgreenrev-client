export type FilterDefinitionObject = {
  id: string
  label: string
  multiple: boolean
  operandsComponent: string
  operandsNumber: number
  addToObject: (filterObject: Record<string, any>, filter: Filter) => void
}

type ResourcePropertyFiltersDefinitionObject = {
  propertyLabel?: string
  filters: Record<string, FilterDefinitionObject>
}

type ResourceFiltersDefinitionObject = Record<
  string,
  ResourcePropertyFiltersDefinitionObject
>

const SearchExact: Readonly<FilterDefinitionObject> = {
  id: 'SearchExact',
  label: 'equals',
  multiple: true,
  operandsComponent: 'Single',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property].push(filter.operands[0])
  },
}

const SearchPartial: Readonly<FilterDefinitionObject> = {
  id: 'SearchPartial',
  label: 'contains',
  multiple: false,
  operandsComponent: 'Single',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = filter.operands[0]
  },
}

export const API_FILTERS: Readonly<Record<string, FilterDefinitionObject>> = {
  SearchExact,
  SearchPartial,
}

export type Filter = {
  id: string
  property: string
  filter: keyof typeof API_FILTERS
  operands: Array<any>
}
export const FILTER_COMPONENT = Object.freeze({
  Property: 0,
  Operator: 1,
  Operands: 2,
})

const sites: Readonly<ResourceFiltersDefinitionObject> = {
  code: {
    filters: { SearchExact },
  },
  name: {
    filters: { SearchPartial },
  },
  description: {
    filters: { SearchPartial },
  },
}

export const RESOURCES_FILTERS: Readonly<
  Record<string, ResourceFiltersDefinitionObject>
> = {
  sites,
}

export const ROUTE_NAMES_RESOURCES_MAP: Readonly<
  Record<string, keyof typeof RESOURCES_FILTERS>
> = {
  'data-sites': 'sites',
}
