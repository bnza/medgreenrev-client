import { defineNuxtPlugin } from '#app'
import useApiResourcesIndexState from '~/composables/states/useApiResourcesIndexState'
import type { JsonLdDocument } from '~~/types'

export default defineNuxtPlugin({
  name: 'api-index',
  async setup(nuxtApp) {
    const { showError } = useAppSnackbarState()

    const config = useRuntimeConfig()
    await callOnce(async () => {
      try {
        const index = await $fetch<JsonLdDocument>(
          `${config.public.apiBaseURL}/api/index.jsonld`,
        )
        useApiResourcesIndexState(index)
      } catch (e) {
        showError({
          text: 'API problem. Please contact your server administrator',
        })
      }
    })
  },
})
