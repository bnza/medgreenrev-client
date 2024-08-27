import { useAppResourcePageState } from '~/composables/states/useAppResourcePageState'

export default function (resourcePageKey: ResourcePageKey) {
  const { resourcePageState } = useAppResourcePageState(resourcePageKey)
  const paginationOptions = reactive(resourcePageState.value.pagination)
  const queryPaginationOptionsParams = computed(() =>
    vuetifyPaginationOptionToQsObject(paginationOptions),
  )

  const vuetifyPaginationOptionToQsObject = (
    componentPaginationOptions: PaginationOptionsState,
  ) => {
    if (componentPaginationOptions.itemsPerPage === -1) {
      delete componentPaginationOptions.itemsPerPage
    }
    const paginationOptions = Object.assign({}, componentPaginationOptions)
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

  return { paginationOptions, queryPaginationOptionsParams }
}
