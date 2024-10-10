import type { ResourcePageKey, SubmitStatus } from '~~/types'
import { useResourceFilteredItemsCountState } from '~/composables/states/useResourceFilteredItemsCountState'

export const downloadCsv = (resourceName: string, data: string) => {
  const fileURL = window.URL.createObjectURL(new Blob([data]))
  const fileLink = document.createElement('a')
  fileLink.href = fileURL
  fileLink.setAttribute('download', `export-${resourceName}.csv`)
  document.body.appendChild(fileLink)
  fileLink.click()
  fileLink.remove()
}
export default function (resourcePageKey: ResourcePageKey) {
  const { exportCollection, collectionLabel, fetchResourceTotalItem } =
    useResource(resourcePageKey)
  const filteredItemsCount = useResourceFilteredItemsCountState(resourcePageKey)
  const status: Ref<SubmitStatus> = ref('idle')
  const error: Ref<Error> = ref(undefined)
  const { showSuccess } = useAppSnackbarState()
  const downloadAndFeedback = async () => {
    status.value = 'pending'
    try {
      const data = await exportCollection()
      downloadCsv(resourcePageKey.replace(/\/(.+)$/, ''), data)
      showSuccess('Successfully download resources')
      status.value = 'success'
    } catch (e) {
      status.value = 'error'
      error.value = e
    }
  }

  return {
    status,
    error,
    downloadAndFeedback,
    collectionLabel,
    fetchResourceTotalItem,
    filteredItemsCount,
  }
}
