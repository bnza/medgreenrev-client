const routeNameResourceFiltersMap = Object.freeze({
  'data-sites': 'sites',
})

export const routeNameToResourceFilters = (routeName) => {
  const resourceFilter = routeNameResourceFiltersMap[routeName]

  if (!resourceFilter) {
    console.error(
      `Unsupported route name ${routeName}: no suitable resource filter found`,
    )
  }
  if (!Object.keys(RESOURCES_FILTERS).includes(resourceFilter)) {
    console.error(
      `Unsupported filter resource ${resourceFilter}: no matching resource filter found`,
    )
  }
  return RESOURCES_FILTERS[resourceFilter]
}

export const getFilterKey = (filterObj) =>
  API_FILTERS[filterObj.operator].getKey(filterObj)

export class ResourceFiltersMap {
  _routeName
  _filters
  _resourceFilters

  constructor(routeName, filters = []) {
    this._routeName = routeName
    this._filters = structuredClone(toRaw(filters))
    this._resourceFilters = routeNameToResourceFilters(routeName)
  }

  clone() {
    return new ResourceFiltersMap(this._routeName, this._filters)
  }

  setFilter(filter) {
    //const filter = new Filter(rawFilter)
    const index = this.findIndex(filter)
    if (index > -1) {
      this._filters[index] = filter
      return
    }
    this._filters.push(filter)
  }

  setFilters(filterMap) {
    // this._filters = filterMap._filters
    this._filters = structuredClone(filterMap._filters)
  }

  findIndex(filter) {
    return this._filters.findIndex(
      (currFilter) => getFilterKey(currFilter) === getFilterKey(filter),
    )
  }

  toObject() {
    const obj = {}
    for (const filter of this._filters) {
      API_FILTERS[filter.operator].addToObject(obj, filter)
    }
    return obj
  }

  static fromPOJO() {}

  get size() {
    return this._filters.length
  }

  // hasFilter(prop, id) {
  //   return this._filters.some(
  //     (filter) => filter.property === prop && filter.id === id,
  //   )
  // }

  listAvailableProps() {
    return Object.entries(this._resourceFilters)
      .filter(([prop, filters]) => {
        return Object.values(filters).some(
          (filter) => filter.multiple || this.findIndex(filter) === -1,
        )
      })
      .map(([prop, _]) => prop)
  }

  listAvailableOperators(prop) {
    const propFilters = this._resourceFilters[prop] ?? []
    return Object.values(propFilters).filter(
      (filter) => filter.multiple || this.findIndex(filter) === -1,
    )
  }
}
