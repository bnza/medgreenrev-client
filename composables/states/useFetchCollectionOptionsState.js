export const useFetchCollectionOptionsState = (key) => {
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

  const getDefaultPaginationOptions = () =>
    reactive(structuredClone(defaultPaginationOptions))

  const _options = useState(STATE_FETCH_COLLECTION_OPTIONS, () => {
    return {}
  })

  const getPaginationOptions = () => {
    if (!(key in _options.value) || !('pagination' in _options.value[key])) {
      setPaginationOptions(getDefaultPaginationOptions())
    }
    return _options.value[key].pagination
  }

  const setPaginationOptions = (pagination) => {
    if (!(key in _options.value)) {
      _options.value[key] = {}
    }
    _options.value[key].pagination = pagination
  }

  return {
    getPaginationOptions,
    setPaginationOptions,
  }
}
