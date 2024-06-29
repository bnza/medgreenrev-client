import usePaginationOptions from '~/composables/resources/usePaginationOptions.js'
import { updatedDiff } from 'deep-object-diff'

function useResource(options) {
  if (!options.normalizePatchItem) {
    options.normalizePatchItem = (newItem, oldItem, diffItem) => diffItem
  }

  const { resourceKey, defaultHeaders, normalizePatchItem } = options

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
    const _getNormalizedPatchItem = (newItem, oldItem) => [
      newItem,
      oldItem,
      { ...updatedDiff(unref(oldItem), unref(newItem)) },
    ]

    const diffItem = normalizePatchItem(
      ..._getNormalizedPatchItem(newItem, oldItem),
    )
    if (Object.keys(diffItem).length === 0) {
      return Promise.resolve()
    }
    return repository.patchItem(oldItem.id, diffItem)
  }

  const postItem = (newItem) => {
    return repository.postItem(unref(newItem))
  }

  const deleteItem = (newItem) => {
    return repository.deleteItem(unref(newItem))
  }

  const actions = {
    [API_ACTIONS.Update]: patchItem,
    [API_ACTIONS.Create]: postItem,
    [API_ACTIONS.Delete]: deleteItem,
  }

  const getAction = (type) => {
    if ((!type) in actions) {
      throw new Error(`Unsupported action "${type}"`)
    }
    return actions[type]
  }

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
    getAction,
  }
}

export default useResource
