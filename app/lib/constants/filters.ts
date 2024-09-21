export const isFilter = (obj: unknown): obj is Filter => {
  return (
    isPlainObject(obj) &&
    ['id', 'prop', 'filter', 'operands'].every((prop) => prop in obj)
  )
}
export const isFilterDefinitionObject = (
  obj: unknown,
): obj is FilterDefinitionObject => {
  return (
    isPlainObject(obj) &&
    [
      'id',
      'label',
      'multiple',
      'operandsComponent',
      'operandsNumber',
      'addToObject',
    ].every((prop) => prop in obj)
  )
}

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

const NumericEqual: Readonly<FilterDefinitionObject> = {
  id: 'NumericEqual',
  label: 'equals',
  multiple: false,
  operandsComponent: 'Single',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = filter.operands[0]
  },
}

const NumericGreaterThan: Readonly<FilterDefinitionObject> = {
  id: 'NumericGreaterThan',
  label: 'greater than',
  multiple: false,
  operandsComponent: 'Single',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['gt'] = filter.operands[0]
  },
}

const NumericGreaterThanOrEqual: Readonly<FilterDefinitionObject> = {
  id: 'NumericGreaterThanOrEqual',
  label: 'greater than or equal',
  multiple: false,
  operandsComponent: 'Single',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['gte'] = filter.operands[0]
  },
}

const NumericLowerThan: Readonly<FilterDefinitionObject> = {
  id: 'NumericLowerThan',
  label: 'lower than',
  multiple: false,
  operandsComponent: 'Single',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['lt'] = filter.operands[0]
  },
}

const NumericLowerThanOrEqual: Readonly<FilterDefinitionObject> = {
  id: 'NumericLowerThanOrEqual',
  label: 'lower than or equal',
  multiple: false,
  operandsComponent: 'Single',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    if (!(filter.property in filterObj)) {
      filterObj[filter.property] = []
    }
    filterObj[filter.property]['lte'] = filter.operands[0]
  },
}

const BooleanIsTrue: Readonly<FilterDefinitionObject> = {
  id: 'BooleanIsTrue',
  label: 'is true',
  multiple: false,
  operandsComponent: '',
  operandsNumber: 0,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = 1
  },
}

const BooleanIsFalse: Readonly<FilterDefinitionObject> = {
  id: 'BooleanIsFalse',
  label: 'is false',
  multiple: false,
  operandsComponent: '',
  operandsNumber: 0,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = 0
  },
}

const SiteEqualAutocomplete: Readonly<FilterDefinitionObject> = {
  id: 'SiteEqualAutocomplete',
  label: 'equals',
  multiple: false,
  propertyLabel: 'site',
  operandsComponent: 'SiteAutocomplete',
  operandListItemPropertyKey: 'name',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = filter.operands[0].id
  },
}
const StratigraphicUnitEqualAutocomplete: Readonly<FilterDefinitionObject> = {
  id: 'StratigraphicUnitEqualAutocomplete',
  label: 'equals',
  multiple: false,
  propertyLabel: 'SU',
  operandsComponent: 'StratigraphicUnitAutocomplete',
  operandListItemPropertyKey: 'code',
  operandsNumber: 1,
  addToObject: (filterObj, filter) => {
    filterObj[filter.property] = filter.operands[0].id
  },
}

export const API_FILTERS: Readonly<Record<FilterKey, FilterDefinitionObject>> =
  {
    SearchExact,
    SearchPartial,
    NumericEqual,
    NumericGreaterThan,
    NumericGreaterThanOrEqual,
    NumericLowerThan,
    NumericLowerThanOrEqual,
    BooleanIsTrue,
    BooleanIsFalse,
    SiteEqualAutocomplete,
    StratigraphicUnitEqualAutocomplete,
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
  public: {
    filters: { BooleanIsFalse, BooleanIsTrue },
  },
}

const stratigraphicUnits: Readonly<ResourceFiltersDefinitionObject> = {
  year: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
  },
  number: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
  },
  description: {
    filters: { SearchPartial },
  },
  interpretation: {
    filters: { SearchPartial },
  },
  'site.id': {
    filters: { SiteEqualAutocomplete },
    propertyLabel: 'site',
  },
  public: {
    filters: { BooleanIsFalse, BooleanIsTrue },
  },
}

const samples: Readonly<ResourceFiltersDefinitionObject> = {
  'stratigraphicUnit.site.id': {
    filters: { SiteEqualAutocomplete },
    propertyLabel: 'site',
  },
  'stratigraphicUnit.id': {
    filters: { StratigraphicUnitEqualAutocomplete },
    propertyLabel: 'SU',
  },
  number: {
    filters: {
      NumericEqual,
      NumericGreaterThan,
      NumericGreaterThanOrEqual,
      NumericLowerThan,
      NumericLowerThanOrEqual,
    },
  },
  description: {
    filters: { SearchPartial },
  },
}
export const RESOURCE_PAGES_STATE: Readonly<
  Partial<Record<ResourceKey, ResourceFiltersDefinitionObject>>
> = {
  samples,
  sites,
  stratigraphicUnits,
}
