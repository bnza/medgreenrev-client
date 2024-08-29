<script setup lang="ts">
import { Map, Layers, Sources } from 'vue3-openlayers'
const center = ref([40, 40])
const projection = ref('EPSG:4326')
const zoom = ref(8)
const rotation = ref(0)
</script>

<template>
  <Map.OlMap
    :loadTilesWhileAnimating="true"
    :loadTilesWhileInteracting="true"
    style="height: 100%; width: 100%"
  >
    <Map.OlView
      ref="view"
      :center.sync="center"
      :rotation="rotation"
      :zoom.sync="zoom"
      :projection="projection"
    />

    <Layers.OlTileLayer>
      <Sources.OlSourceOsm />
    </Layers.OlTileLayer>
  </Map.OlMap>
</template>
