import type {
  ApiResourceCollectionParent,
  ApiResourceItem,
  DataResourceKey,
  JsonLdResourceCollection,
  ResourceOperationType,
  ResourcePageKey,
  SubmitStatus,
} from '~~/types'
import useResourceFilterState from '~/composables/states/useResourceFilterState'
import useResourceConfig from '~/composables/useResourceConfig'
import { useResourceFilteredItemsCountState } from '~/composables/states/useResourceFilteredItemsCountState'

type UseResourceOptions = {
  parent?: ApiResourceCollectionParent
  resourceOperationType?: ResourceOperationType
}

const getParentKey = (parent?: ApiResourceCollectionParent) =>
  parent ? parent[0] : ''
export type UseResourceReturnType = ReturnType<typeof _useResource>

const isResourcePageKey = (key: string): key is ResourcePageKey =>
  /\/(collection|item)/.test(key)

function useResource<RT extends ApiResourceItem>(
  resourceKey: DataResourceKey,
  parentKeyOrOptions?: UseResourceOptions | string,
): UseResourceReturnType

function useResource<RT extends ApiResourceItem>(
  resourceKey: ResourcePageKey,
): UseResourceReturnType

function useResource<RT extends ApiResourceItem>(
  resourceKey: DataResourceKey | ResourcePageKey,
  parentKeyOrOptions?: UseResourceOptions | string,
) {
  const cache = useNuxtApp().$cache.useResource
  if (isResourcePageKey(resourceKey)) {
    if (!cache.has(resourceKey)) {
      // @TODO improve error handling: can you extract some useResource() params from key?
      console.error(`Cached resource key ${resourceKey} not set`)
    }
    return cache.get(resourceKey)
  }

  parentKeyOrOptions = parentKeyOrOptions || {}
  const isResourceCached = (arg: UseResourceOptions | string): arg is string =>
    'string' === typeof arg
  const resourceIsCached = isResourceCached(parentKeyOrOptions)
  const parentKey =
    'string' === typeof parentKeyOrOptions
      ? parentKeyOrOptions
      : parentKeyOrOptions.parent
        ? getParentKey(parentKeyOrOptions.parent)
        : ''

  let resourceOperationType: ResourceOperationType = isResourceCached(
    parentKeyOrOptions,
  )
    ? 'item'
    : parentKeyOrOptions.resourceOperationType || 'item'

  if (parentKey) {
    resourceOperationType = 'collection'
  }
  const parent = isResourceCached(parentKeyOrOptions)
    ? undefined
    : parentKeyOrOptions.parent

  const resourcePageKey: ResourcePageKey = parentKey
    ? `${resourceKey}/collection/${parentKey}`
    : `${resourceKey}/${resourceOperationType}`

  if (!cache.has(resourcePageKey)) {
    if (resourceIsCached) {
      console.error(`Cached resource key ${resourceKey} not set`)
    }
    cache.set(
      resourcePageKey,
      _useResource<RT>({ resourceKey, resourcePageKey, parent }),
    )
  }
  return cache.get(resourcePageKey)
}

function _useResource<RT extends ApiResourceItem>({
  resourceKey,
  resourcePageKey,
  parent,
}: {
  resourceKey: DataResourceKey
  resourcePageKey: ResourcePageKey
  parent?: ApiResourceCollectionParent
}) {
  const repository = useNuxtApp().$api.getRepository<RT>(resourceKey)
  const resourceConfig = useResourceConfig(resourceKey)

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

  const { resourceFilterParams, isFiltered } = useResourceFilterState(
    resourcePageKey,
    resourceConfig,
  )

  parent = parent ? clone(parent) : parent
  const parentRef = computed({
    get() {
      return parent
    },
    set(value) {
      if (!parent) {
        return
      }
      if (parent[0] === value[0]) {
        parent[1] = value[1]
        return
      }
      console.error('Parent identifier mismatch. This should not be happen')
    },
  })

  const fetchCollectionsParams = computed(() =>
    Object.assign(
      Object.fromEntries(parentRef.value ? [parentRef.value] : []),
      queryPaginationOptionsParams.value,
      resourceFilterParams.value,
    ),
  )

  type Collection = JsonLdResourceCollection<RT>

  const filteredItemsCountState =
    useResourceFilteredItemsCountState(resourcePageKey)
  const fetchCollection = async () => {
    const key =
      resourceConfig.apiPath + parent ? '/' + getParentKey(parent) : ''
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
    filteredItemsCountState.value = totalItems.value
    return {
      items,
      totalItems,
      status,
      paginationOptions,
      refresh,
    }
  }

  const fetchResourceTotalItem = (fetch = false) => {
    const status: Ref<SubmitStatus> = ref('idle')
    const error: Ref<Error> = ref(undefined)
    const totalItems: Ref<number> = ref(0)
    const _fetch = () =>
      repository
        .fetchResourceTotalItems()
        .then((results) => (totalItems.value = results['hydra:totalItems']))
    if (fetch) {
      _fetch()
    }
    return { status, error, totalItems, refresh: fetch }
  }

  const exportCollection = () =>
    repository.exportCollection(fetchCollectionsParams.value)

  const fetchItem = async (id: Ref<string | number>) => {
    const key = resourceConfig.apiPath + id.value
    const { data, error, status } = await useAsyncData(
      key,
      () => repository.fetchItem(id.value),
      { watch: [id] },
    )
    return { item: data, status, error }
  }

  return {
    deleteItem: repository.deleteItem.bind(repository),
    headers,
    itemLabel,
    isFiltered,
    collectionLabel,
    resourcePageKey,
    exportCollection,
    fetchCollection,
    fetchItem,
    fetchResourceTotalItem,
    paginationOptions,
    parent: parentRef,
    patchItem: repository.patchItem.bind(repository),
    postItem: repository.postItem.bind(repository),
    resourceConfig,
  }
}

export default useResource
