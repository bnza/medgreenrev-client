import usePaginationOptionsState from '~/composables/states/usePaginationOptionsState.ts'
import { diff } from 'deep-object-diff'
import { useResourceFiltersState } from '~/composables/index.js'

function useResource(options) {
  if (!options.resourceKey) {
    throw new Error('Resource key is required!')
  }
  if (!options.resourcePageKey) {
    // options.resourcePageKey = options.resourceKey
    throw new Error('Resource key is required!')
  }

  if (!options.defaultHeaders) {
    throw new Error('Default headers are required!')
  }

  if (!options.formatJsonLdItem) {
    options.formatJsonLdItem = (item) => item
  }

  if (!options.normalizePatchItem) {
    options.normalizePatchItem = (newItem, oldItem, diffItem) =>
      options.formatJsonLdItem(diffItem)
  }

  const {
    resourcePageKey,
    resourceKey,
    defaultHeaders,
    normalizePatchItem,
    formatJsonLdItem,
  } = options

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
  const itemLabel = resourceConfig.labels[0]
  /** @type string */
  const collectionLabel = resourceConfig.labels[1]

  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseURL
  const getIri = (id) => `${baseURL}${resourceConfig.apiPath}/${id}`

  const repository = useNuxtApp().$api.getRepository(resourceKey)

  const { paginationOptions, queryPaginationOptionsParams } =
    usePaginationOptionsState(resourcePageKey)

  const { resourceFilterParams } = useResourceFiltersState({
    resourcePageKey,
    resourceConfig,
  })
  const fetchCollection = async (parent) => {
    parent = parent || {}
    const params = computed(() =>
      Object.assign(
        {},
        parent,
        queryPaginationOptionsParams.value,
        resourceFilterParams.value,
      ),
    )
    const { data, pending, error } = await repository.fetchCollection(
      {
        params,
      },
      { watch: [params] },
    )
    const items = computed(() => data.value?.['hydra:member'])
    const totalItems = computed(() => data.value?.['hydra:totalItems'] || 0)
    return {
      data,
      pending,
      error,
      items,
      totalItems,
      paginationOptions,
      resourceFilterParams,
    }
  }

  const fetchItem = async (id) => {
    const { data, pending, error } = await repository.fetchItem(
      id,
      {},
      {
        watch: [id],
      },
    )
    const code = computed(() => resourceConfig.getCodeFn(data.value)())
    return { item: data, pending, error, code }
  }

  const patchItem = (newItem, oldItem) => {
    // console.log(diff(unref(oldItem), unref(newItem)))
    const getNormalizePatchItemParams = (newItem, oldItem) => [
      newItem,
      oldItem,
      { ...diff(unref(oldItem), unref(newItem)) },
    ]

    const diffItem = formatJsonLdItem(
      normalizePatchItem(...getNormalizePatchItemParams(newItem, oldItem)),
    )

    if (Object.keys(diffItem).length === 0) {
      return Promise.resolve({
        response: 'NO__CHANGE',
        redirectPath: `${resourceConfig.appPath}/${oldItem.id}`,
      })
    }
    return repository.patchItem(oldItem.id, diffItem).then((response) => {
      return {
        response,
        redirectPath: `${resourceConfig.appPath}/${oldItem.id}`,
      }
    })
  }

  const postItem = (newItem) => {
    return repository
      .postItem(formatJsonLdItem(unref(newItem)))
      .then((response) => {
        return {
          response,
          redirectPath: `${resourceConfig.appPath}/${response.id}`,
        }
      })
  }

  const deleteItem = (newItem) => {
    return repository.deleteItem(unref(newItem)).then((response) => {
      return {
        response,
        redirectPath: `${resourceConfig.appPath}`,
      }
    })
  }

  return {
    repository,
    collectionLabel,
    headers,
    itemLabel,
    resourceConfig,
    resourcePageKey,
    fetchCollection,
    fetchItem,
    patchItem,
    postItem,
    deleteItem,
    getIri,
  }
}

export default useResource
