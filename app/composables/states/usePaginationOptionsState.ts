import type { ResourcePageKey, PaginationOptionsState } from '~~/types'

export default function (resourcePageKey: ResourcePageKey) {
  const state = useState(
    `${States.AppResourcePagePagination}:${resourcePageKey}`,
    () => defaultPaginationOptions,
  )

  const vuetifyPaginationOptionToQsObject = (
    componentPaginationOptions: PaginationOptionsState,
  ) => {
    const _componentPaginationOptions = componentPaginationOptions
    if (_componentPaginationOptions.itemsPerPage === -1) {
      delete _componentPaginationOptions.itemsPerPage
    }
    const paginationOptions = Object.assign({}, _componentPaginationOptions)
    const order = {}
    paginationOptions.sortBy.forEach((sortItem) => {
      let _order = 'asc'
      if (typeof sortItem.order === 'string') {
        _order = sortItem.order
      }
      order[sortItem.key] = _order
    })
    return {
      order,
      page: paginationOptions.page,
      itemsPerPage: paginationOptions.itemsPerPage,
    }
  }
  const queryPaginationOptionsParams = computed(() =>
    vuetifyPaginationOptionToQsObject(state.value),
  )

  return {
    paginationOptions: state,
    queryPaginationOptionsParams,
  }
}
