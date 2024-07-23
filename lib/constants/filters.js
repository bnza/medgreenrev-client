const SearchExact = Object.freeze({
  id: 'SearchExact',
  label: 'equals',
  multiple: true,
  operator: '=',
  operandsComponent: 'Single',
  getKey: (filter) => `${filter.property}[]=${filter.operands[0]}`,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property].push(filter.operands[0])
  },
})
const SearchPartial = Object.freeze({
  id: 'SearchPartial',
  label: 'contains',
  multiple: false,
  operator: '=',
  operandsComponent: 'Single',
  getKey: (filter) => `${filter.property}=`,

  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = filter.operands[0]
  },
})
export const API_FILTERS = Object.freeze({
  SearchExact,
  SearchPartial,
})

export const FILTER_COMPONENT = Object.freeze({
  Property: 0,
  Operator: 1,
  Operands: 2,
})

const sites = Object.freeze({
  code: Object.freeze({
    SearchExact,
  }),
  name: Object.freeze({
    SearchPartial,
  }),
  description: Object.freeze({
    SearchPartial,
  }),
})

export const RESOURCES_FILTERS = Object.freeze({
  sites,
})
export const ROUTE_NAMES_RESOURCES_MAP = Object.freeze({
  'data-sites': 'sites',
})
