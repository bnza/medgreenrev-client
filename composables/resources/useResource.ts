import usePaginationOptionsState from '~/composables/states/usePaginationOptionsState'
import { diff } from 'deep-object-diff'
import { useResourceFiltersState } from '~/composables/index.js'
import { type ResourceKey, type UseResourceTypeOptions } from '~/lib/resources'

const _identity1 = (item: Record<string, any>) => item
const _identity3 = (
  newItem: Record<string, any>,
  oldItem: Record<string, any>,
  diffItem: Record<string, any>,
) => diffItem

const getUseResourceType = async (
  resourceKey: ResourceKey,
): Promise<() => UseResourceTypeOptions> => {
  return (await import(`~/composables/resources/types/${resourceKey}.ts`))
    .default
}

async function useResource(
  resourceKey: ResourceKey,
  parent?: Record<string, any>,
) {
  const resourcePageKey: string =
    parent && Object.keys(parent).length > 0
      ? resourceKey.concat('/' + Object.keys(parent)[0])
      : resourceKey

  const resourceConfig = getResourceConfig(resourceKey)

  const { isAuthenticated } = useAppAuth()

  const useResourceType = await getUseResourceType(resourceKey)

  const {
    defaultHeaders,
    protectedFields = [],
    normalizePatchItem = _identity3,
    formatJsonLdItem = _identity1,
  } = useResourceType()

  const headers = computed(() =>
    isAuthenticated.value
      ? defaultHeaders
      : defaultHeaders.filter((h) =>
          typeof h.key === 'string' && protectedFields
            ? !protectedFields.includes(h.key)
            : false,
        ),
  )

  const itemLabel = resourceConfig.labels[0]
  const collectionLabel = resourceConfig.labels[1]

  const config = useRuntimeConfig()
  const baseURL = config.public.apiBaseURL
  const getIri = (id: string | number) =>
    `${baseURL}${resourceConfig.apiPath}/${id}`

  const repository = useNuxtApp().$api.getRepository(resourceKey)

  const { paginationOptions, queryPaginationOptionsParams } =
    usePaginationOptionsState(resourcePageKey)

  const { resourceFilterParams } = useResourceFiltersState({
    resourcePageKey,
    resourceConfig,
  })
  const fetchCollection = async (parent: Record<string, string | number>) => {
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

  const fetchItem = async (id: Ref<string | number>) => {
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

  const patchItem = (
    newItem: Record<string, any>,
    oldItem: Record<string, any>,
    redirectToCollection = false,
  ) => {
    const getNormalizePatchItemParams = (
      newItem: Record<string, any>,
      oldItem: Record<string, any>,
    ) => [newItem, oldItem, { ...diff(unref(oldItem), unref(newItem)) }]

    const [_newItem, _oldItem, _diffItem] = getNormalizePatchItemParams(
      newItem,
      oldItem,
    )
    const diffItem = formatJsonLdItem(
      normalizePatchItem(_newItem, _oldItem, _diffItem),
    )

    if (Object.keys(diffItem).length === 0) {
      return Promise.resolve({
        response: 'NO__CHANGE',
        redirectPath: `${resourceConfig.appPath}/${oldItem.id}`,
      })
    }
    return repository.patchItem(oldItem.id, diffItem).then((response) => {
      const redirectPath = redirectToCollection
        ? resourceConfig.appPath
        : `${resourceConfig.appPath}/${oldItem.id}`
      return {
        response,
        redirectPath,
      }
    })
  }

  const postItem = (
    newItem: Record<string, any>,
    redirectToCollection = false,
  ) => {
    return repository
      .postItem(formatJsonLdItem(unref(newItem)))
      .then((response) => {
        const redirectPath = redirectToCollection
          ? resourceConfig.appPath
          : `${resourceConfig.appPath}/${response.id}`
        return {
          response,
          redirectPath,
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
