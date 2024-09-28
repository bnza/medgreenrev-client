import { defineNuxtPlugin } from '#app'
// import useApiDocsState from '~/composables/states/useApiDocsState'

export default defineNuxtPlugin({
  name: 'api-index',
  async setup(nuxtApp) {
    const { set } = useApiResourceConfigState()
    const { error } = useAppSnackbarState()

    const config = useRuntimeConfig()
    await callOnce(async () => {
      try {
        const index = await $fetch<JsonLdApiDocumentation>(
          `${config.public.apiBaseURL}/index.jsonld`,
        )
        set(index)
      } catch (e) {
        error({ text: 'API problem. Please contact your server administrator' })
      }
    })
  },
})
