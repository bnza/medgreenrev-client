import type {
  ApiResourceCollectionParent,
  ApiResourceItem,
  ApiResourceItemMediaObject,
  DataResourceKey,
  SubmitStatus,
} from '~~/types'
type UseMediaObjectJoin = Awaited<ReturnType<typeof useMediaObjectJoin>>

export const mediaObjectJoinInjectionKey =
  Symbol() as InjectionKey<UseMediaObjectJoin>
const useMediaObjectJoin = async <RT extends ApiResourceItem>(
  resourceKey: DataResourceKey,
  parent: ApiResourceCollectionParent,
) => {
  const {
    parent: fetchParent,
    paginationOptions,
    fetchCollection,
    deleteItem,
    postItem,
    resourceConfig,
  } = useResource<ApiResourceItemMediaObject>(resourceKey, {
    parent: parent,
    resourceOperationType: 'collection',
  })
  paginationOptions.value = Object.assign({}, defaultPaginationOptions, {
    itemsPerPage: -1,
  })
  fetchParent.value = parent

  const { items, refresh } = await fetchCollection()

  const { showSuccess, showError } = useAppSnackbarState()

  const status: Ref<SubmitStatus> = ref('idle')

  const deletingItem: Ref<ApiResourceItemMediaObject | undefined> =
    ref(undefined)
  const deleteAndFeedback = async (item: ApiResourceItem) => {
    status.value = 'pending'
    try {
      await deleteItem(item)
      refresh()
      status.value = 'success'
      showSuccess('Successfully deleted media')
    } catch (e) {
      status.value = 'error'
      showError(e)
    }
  }

  const createAndFeedback = async (item: Record<string, any>) => {
    status.value = 'pending'
    const _item = resourceConfig.normalizePostItem(item)
    const formData = new FormData()
    formData.append('item', _item.item)
    formData.append('file', item.file)
    try {
      await postItem(formData, 'multipart/form-data')
      refresh()
      status.value = 'success'
      showSuccess('Successfully created media')
    } catch (e) {
      status.value = 'error'
      showError(e)
    }
  }
  return {
    items,
    deletingItem,
    deleteAndFeedback,
    createAndFeedback,
    resourceConfig,
    status,
  }
}

export default useMediaObjectJoin
