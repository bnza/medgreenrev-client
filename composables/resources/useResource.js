import usePaginationOptions from '~/composables/resources/usePaginationOptions.js'
function useResource(options) {
  const { resourceKey, defaultHeaders } = options

  if (!resourceKey) {
    throw new Error('Resource key is required!')
  }

  if (!defaultHeaders) {
    throw new Error('Default headers are required!')
  }

  const protectedFields =
    'protectedFields' in options ? options.protectedFields : []

  const resourceConfig = getResourceConfig(resourceKey)

  const { isAuthenticated } = useAppAuth()

  const headers = computed(() =>
    isAuthenticated.value
      ? defaultHeaders
      : defaultHeaders.filter((h) =>
          typeof h.key === 'string' && protectedFields
            ? !protectedFields.includes(h.key)
            : false,
        ),
  )

  /** @type string */
  const itemLabel = resourceConfig.labels[1]
  /** @type string */
  const collectionLabel = resourceConfig.labels[0]

  const repository = useNuxtApp().$api.getRepository(resourceKey)

  const { paginationOptions, queryPaginationOptionsParams } =
    usePaginationOptions()
  const fetchCollection = async () => {
    const params = computed(() =>
      Object.assign({}, queryPaginationOptionsParams.value),
    )
    const { data, pending, error } = await repository.fetchCollection(
      {
        params,
      },
      { watch: [params] },
    )
    const items = computed(() => data.value?.['hydra:member'])
    const totalItems = computed(() => data.value?.['hydra:totalItems'] || 0)
    return { data, pending, error, items, totalItems, paginationOptions }
  }
  return {
    collectionLabel,
    headers,
    itemLabel,
    resourceConfig,
    fetchCollection,
  }
}

export default useResource
