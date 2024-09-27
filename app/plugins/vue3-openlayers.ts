import { defineNuxtPlugin } from '#app'
import OpenLayers from 'vue3-openlayers'

import 'ol/ol.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(OpenLayers)
})
