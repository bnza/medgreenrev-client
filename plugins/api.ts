import { useApiFetchOptions } from '~/composables/api/useApiFetchOptions'
import Api from '~/lib/Api'

export default defineNuxtPlugin(() => {
  const fetchOptions = useApiFetchOptions()
  const api = new Api(fetchOptions)
  return {
    provide: {
      api,
    },
  }
})
