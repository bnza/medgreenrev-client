import type { Reactive } from 'vue'

export async function useFetchItem({
  id,
  resourceKey,
  state,
  key,
}: {
  id: ApiId
  resourceKey: ResourceKey
  state: Reactive<Record<string, any>>
  key: keyof typeof state
}) {
  const { showError } = useAppSnackbarState()
  const repository = useNuxtApp().$api.getRepository(resourceKey)
  const error = ref(undefined)
  if (id) {
    try {
      state[key] = await repository.$fetchItem(id)
    } catch (e) {
      showError(e)
      error.value = e
    }
  }
  return { error }
}
