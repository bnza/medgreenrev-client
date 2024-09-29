import type {
  ApiResourceCollectionParent,
  ApiResourceItem,
  DataResourceKey,
  ResourceOperationType,
  ResourcePageKey,
} from '~~/types'
import useResourceFilterState from '~/composables/states/useResourceFilterState'

type UseResourceOptions = {
  parent?: ApiResourceCollectionParent
  resourceOperationType?: ResourceOperationType
}

function useResource<RT extends ApiResourceItem>(
  resourceKey: DataResourceKey,
  { parent, resourceOperationType = 'item' }: UseResourceOptions,
) {
  const parentKey = parent ? parent[0] : ''
  if (parentKey) {
    resourceOperationType = 'collection'
  }

  const resourcePageKey: ResourcePageKey = parentKey
    ? `${resourceKey}/collection/${parentKey}`
    : `${resourceKey}/${resourceOperationType}`

  const cache = useNuxtApp().$cache.useResource
  if (!cache.has(resourcePageKey)) {
    cache.set(
      resourcePageKey,
      _useResource({ resourceKey, resourcePageKey, parent, parentKey }),
    )
  }
  return cache.get(resourcePageKey)
}

export type UseResourceReturnType = ReturnType<typeof _useResource>

function _useResource<RT extends ApiResourceItem>({
  resourceKey,
  resourcePageKey,
  parent,
  parentKey,
}) {
  const repository = useNuxtApp().$api.getRepository<RT>(resourceKey)
  const resourceConfig = repository.resourceConfig

  const itemLabel = resourceConfig.labels[0]
  const collectionLabel = resourceConfig.labels[1]

  const { isAuthenticated } = useAppAuth()
  const headers = computed(() => {
    const { protectedFields, defaultHeaders } = resourceConfig
    return isAuthenticated.value
      ? defaultHeaders
      : defaultHeaders.filter((h) =>
          typeof h.key === 'string' && protectedFields
            ? !protectedFields.includes(h.key)
            : false,
        )
  })

  const { paginationOptions, queryPaginationOptionsParams } =
    usePaginationOptionsState(resourcePageKey)

  const { resourceFilterParams } = useResourceFilterState(
    resourcePageKey,
    resourceConfig,
  )

  const fetchCollectionsParams = computed(() =>
    Object.assign(
      {},
      Object.fromEntries([parent || []]),
      queryPaginationOptionsParams.value,
      resourceFilterParams.value,
    ),
  )

  type Collection = JsonLdResourceCollection<RT>
  const fetchCollection = async () => {
    const key = resourceConfig.apiPath + parentKey ? '/' + parentKey : ''
    const { data, error, status, refresh } = await useAsyncData<Collection>(
      key,
      () =>
        repository.fetch(resourceConfig.apiPath, {
          method: 'GET',
          query: fetchCollectionsParams.value,
        }),
      { watch: [fetchCollectionsParams] },
    )
    if (error.value) {
      console.error(error.value)
    }
    const items = computed(() => data.value?.['hydra:member'])
    const totalItems = computed(() => data.value?.['hydra:totalItems'] || 0)
    return {
      items,
      totalItems,
      status,
      paginationOptions,
      refresh,
    }
  }

  return {
    headers,
    itemLabel,
    collectionLabel,
    resourcePageKey,
    fetchCollection,
    resourceConfig,
  }
}

export default useResource
