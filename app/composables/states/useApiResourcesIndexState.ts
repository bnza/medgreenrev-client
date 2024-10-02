import type { ResourceKey } from '~~/types'

export default function (fetched?: JsonLdDocument) {
  const state = useState<Readonly<Record<ResourceKey, string> | {}>>(
    States.ApiResourcesIndex,
    () => ({}),
  )

  const unsupportedResources = []
  const filterFetched = ([key, _]: [string, string]) => {
    if (['@context', '@id', '@type'].includes(key)) {
      return false
    }
    if (isResourceKey(key)) {
      return true
    }
    unsupportedResources.push(key)
  }

  const ready = computed(() => Boolean(Object.keys(state.value).length))

  const set = (fetched: Record<string, string>) => {
    if (Object.keys(state.value).length > 0) {
      console.warn('API resources config already set. Skipped')
      return
    }
    const configEntries = Object.entries(fetched).filter(filterFetched)
    state.value = Object.freeze(Object.fromEntries(configEntries))
    if (unsupportedResources) {
      console.warn('Unsupported API resources:', unsupportedResources)
    }
  }

  if (fetched) {
    if (ready.value) {
      console.warn('Resource index state already set. Skipped')
    } else {
      set(fetched)
    }
  }

  return { index: state, ready }
}
