export default function () {
  const defaultPaginationOptions = {
    itemsPerPage: 10,
    page: 1,
    sortBy: [
      {
        key: 'id',
        order: 'asc',
      },
    ],
  }

  const paginationOptions = reactive(structuredClone(defaultPaginationOptions))

  const queryPaginationOptionsParams = computed(() =>
    vuetifyPaginationOptionToQsObject(paginationOptions),
  )

  const vuetifyPaginationOptionToQsObject = (componentPaginationOptions) => {
    const paginationOptions = Object.assign(
      {},
      defaultPaginationOptions,
      componentPaginationOptions,
    )
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
