import { getResourceStaticConfig } from '~/utils/constants/resources'
import type { ApiId, ResourceConfig, ResourceKey } from '~~/types'
import useApiResourcesIndexState from '~/composables/states/useApiResourcesIndexState'

function useResourceConfig(key: ResourceKey): ResourceConfig
function useResourceConfig(): {
  getResourceConfig: (key: ResourceKey) => ResourceConfig
  getResourceIri: (key: ResourceKey) => string
}

function useResourceConfig(key?: ResourceKey) {
  const cache = useNuxtApp().$cache.resourceConfig
  const getResourceNormalizers = useResourceNormalizers()

  const { index } = useApiResourcesIndexState()
  const getResourceIri = (key: ResourceKey, id: ApiId) =>
    `${index.value[key]}/${id}`

  const getResourceConfig = (key: ResourceKey): ResourceConfig => {
    if (!cache.has(key)) {
      const resourceConfig = Object.assign(
        {
          name: key,
          apiPath: index.value[key],
          protectedFields: [],
        },
        getResourceStaticConfig(key),
        getResourceNormalizers(key),
      )
      cache.set(key, resourceConfig)
    }
    return cache.get(key)
  }
  return key ? getResourceConfig(key) : { getResourceConfig, getResourceIri }
}

export default useResourceConfig
