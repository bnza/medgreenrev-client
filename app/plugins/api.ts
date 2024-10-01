import { useApiFetchOptions } from '~/composables/api/useApiFetchOptions'
import Api from '~/utils/repository/Api'
import type { ResourceKey } from '~~/types'
import useApiResourcesIndexState from '~/composables/states/useApiResourcesIndexState'
const isValidIndex = (
  configs: Record<ResourceKey, string> | {},
): configs is Record<ResourceKey, string> => Object.keys(configs).length > 0
export default defineNuxtPlugin({
  name: 'api',
  dependsOn: ['api-index'],
  setup() {
    const { index } = useApiResourcesIndexState()
    if (!isValidIndex(index.value)) {
      console.error('api-index plugin not called yet')
      return
    }
    const fetchOptions = useApiFetchOptions()
    const api = new Api(index.value, fetchOptions)
    return {
      provide: {
        api,
      },
    }
  },
})
