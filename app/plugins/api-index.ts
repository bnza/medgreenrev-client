import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin({
  name: 'api-index',
  async setup(nuxtApp) {
    const { set } = useApiResourceConfigState()
    const { showError } = useAppSnackbarState()

    const config = useRuntimeConfig()
    await callOnce(async () => {
      try {
        const index = await $fetch<JsonLdApiDocumentation>(
          `${config.public.apiBaseURL}/api/index.jsonld`,
        )
        set(index)
      } catch (e) {
        showError({
          text: 'API problem. Please contact your server administrator',
        })
      }
    })
  },
})
