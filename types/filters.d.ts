declare global {
  export type FilterKey =
    | 'SearchExact'
    | 'SearchPartial'
    | 'NumericEqual'
    | 'NumericGreaterThan'
    | 'NumericGreaterThanOrEqual'
    | 'NumericLowerThan'
    | 'NumericLowerThanOrEqual'
    | 'SiteEqualAutocomplete'
    | 'StratigraphicUnitEqualAutocomplete'
    | 'BooleanIsTrue'
    | 'BooleanIsFalse'

  export type Filter = {
    id: string
    property: string
    filter: FilterKey
    operands: Array<any>
  }

  export type FilterDefinitionObject = {
    id: FilterKey
    label: string
    multiple: boolean
    propertyLabel?: string
    operandsComponent: string
    operandListItemPropertyKey?: string
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
}

export {}
