import type { ResourceKey } from '~~/types'

export default function () {
  const state: Ref<Record<ResourceKey, string> | {}> = useState(
    States.ApiResourceConfig,
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
    // .map(([name, apiPath]) => {
    //   if (isResourceKey(name)) {
    //     const config = getResourceStaticConfig(name)
    //     // const normalizers = getResourceNormalizer(name)
    //     return [name, Object.freeze(Object.assign({ name, apiPath }, config))]
    //   }
    // })
    state.value = Object.fromEntries(configEntries)
    if (unsupportedResources) {
      console.warn('Unsupported API resources:', unsupportedResources)
    }
  }

  // const getResourceIri = (key: ResourceKey, id: ApiId) =>
  //   `${getResourceConfig(key).apiPath}/${id}`

  const index = computed(() => state.value)

  return { index, ready, set }
}
