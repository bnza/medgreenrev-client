import { useApiFetchOptions } from '~/composables/api/useApiFetchOptions'
import Api from '~/utils/repository/Api'
import type { ResourceConfigMap } from '~~/types'
const isValidConfig = (
  configs: ResourceConfigMap | {},
): configs is ResourceConfigMap => Object.keys(configs).length > 0
export default defineNuxtPlugin({
  name: 'api',
  dependsOn: ['api-index'],
  setup() {
    const { configs } = useApiResourceConfigState()
    const _configs = isValidConfig(configs.value)
      ? Object.assign({}, configs.value)
      : false
    if (!_configs) {
      console.error('api-index plugin not called yet')
      return
    }
    const fetchOptions = useApiFetchOptions()
    const api = new Api(_configs, fetchOptions)
    return {
      provide: {
        api,
      },
    }
  },
})
