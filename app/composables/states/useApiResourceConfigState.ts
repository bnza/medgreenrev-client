import type { ResourceConfig, ResourceKey } from '~~/types'
import resources from '~/utils/constants/resources'

export default function () {
  const state: Ref<Record<ResourceKey, ResourceConfig> | {}> = useState(
    States.ApiResourceConfig,
    () => ({}),
  )

  const unsupportedResources = []
  const filterFetched = ([key, _]: [string, string]) => {
    if (['@context', '@id', '@type'].includes(key)) {
      return false
    }
    if (key in resources) {
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
    const configEntries = Object.entries(fetched)
      .filter(filterFetched)
      .map(([name, apiPath]) => {
        const config = resources[name]
        return [name, Object.freeze(Object.assign({ name, apiPath }, config))]
      })
    state.value = Object.fromEntries(configEntries)
    if (unsupportedResources) {
      console.warn('Unsupported API resources:', unsupportedResources)
    }
  }

  const getResourceConfig = (key: ResourceKey): ResourceConfig =>
    state.value[key]

  const configs = computed(() => state.value)

  return { configs, ready, set, getResourceConfig }
}
