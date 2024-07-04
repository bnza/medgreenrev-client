import usePaginationOptions from '~/composables/resources/usePaginationOptions.js'
import { diff } from 'deep-object-diff'

function useResource(options) {
  if (!options.normalizePatchItem) {
    options.normalizePatchItem = (newItem, oldItem, diffItem) => diffItem
  }

  if (!options.formatJsonLdItem) {
    options.formatJsonLdItem = (item) => item
  }

  const { resourceKey, defaultHeaders, normalizePatchItem, formatJsonLdItem } =
    options

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
  const itemLabel = resourceConfig.labels[0]
  /** @type string */
  const collectionLabel = resourceConfig.labels[1]

  const repository = useNuxtApp().$api.getRepository(resourceKey)

  const { paginationOptions, queryPaginationOptionsParams } =
    usePaginationOptions(resourceKey)
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
      return Promise.resolve()
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

  // const actions = {
  //   [API_ACTIONS.Update]: patchItem,
  //   [API_ACTIONS.Create]: postItem,
  //   [API_ACTIONS.Delete]: deleteItem,
  // }
  //
  // const getAction = (type) => {
  //   if ((!type) in actions) {
  //     throw new Error(`Unsupported action "${type}"`)
  //   }
  //   return actions[type]
  // }

  return {
    collectionLabel,
    headers,
    itemLabel,
    resourceConfig,
    fetchCollection,
    fetchItem,
    patchItem,
    postItem,
    deleteItem,
    // getAction,
  }
}

export default useResource
