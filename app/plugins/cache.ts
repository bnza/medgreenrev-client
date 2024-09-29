import { defineNuxtPlugin } from '#app'
import Cache from '~/utils/cache/Cache'

export default defineNuxtPlugin({
  name: 'cache',
  async setup(nuxtApp) {
    const cache = new Cache()
    return {
      provide: {
        cache,
      },
    }
  },
})
