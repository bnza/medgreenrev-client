import useVocabulariesState from '~/composables/states/useVocabulariesState'

export default defineNuxtPlugin({
  name: 'vocabularies',
  dependsOn: ['api'],
  setup(nuxtApp) {
    const api = nuxtApp.$api
    //@ts-ignore
    useVocabulariesState(api)
  },
})
