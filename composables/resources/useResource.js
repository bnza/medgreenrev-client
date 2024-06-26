import usePaginationOptions from '~/composables/resources/usePaginationOptions.js'
import { DATA_FORM_MODE } from '~/lib/constants/enums.js'
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
    return repository.patchItem(unref(oldItem), unref(newItem))
  }

  const postItem = (newItem) => {
    return repository.postItem(unref(newItem))
  }

  const deleteItem = (newItem) => {
    return repository.deleteItem(unref(newItem))
  }

  const actions = {
    [DATA_FORM_MODE.Update]: patchItem,
    [DATA_FORM_MODE.Create]: postItem,
    [DATA_FORM_MODE.Delete]: deleteItem,
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
    getAction,
  }
}

export default useResource
