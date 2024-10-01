import { getResourceStaticConfig } from '~/utils/constants/resources'
import type { ResourceKey } from '~~/types'
import useApiResourcesIndexState from '~/composables/states/useApiResourcesIndexState'

export default function (key: ResourceKey) {
  const cache = useNuxtApp().$cache.resourceConfig
  const getResourceNormalizers = useResourceNormalizers()
  const { index } = useApiResourcesIndexState()
  const getResourceConfig = (key: ResourceKey) => {
    if (!cache.has(key)) {
      const resourceConfig = Object.assign(
        {
          name: key,
          apiPath: index.value[key],
        },
        getResourceStaticConfig(key),
        getResourceNormalizers(key),
      )
      cache.set(key, resourceConfig)
    }
    return cache.get(key)
  }
  return getResourceConfig(key)
}
