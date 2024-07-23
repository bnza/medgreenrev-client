<script setup>
import { useResourceFiltersState } from '~/composables/states/useResourceFiltersState.js'
import { ResourceFiltersMap } from '~/lib/filters/ResourceFiltersMap.js'

const props = defineProps({
  map: { type: Array, required: true },
})
</script>

<template>
  <v-empty-state
    v-if="map.length === 0"
    height="v-100"
    title="No filter selected"
    text="No filter selected yet. Please add new filters clicking the plus button in the top right corner"
  />
  <v-list v-else>
    <lazy-filters-list-item v-for="filter in map" :key="filter.key" :filter />
  </v-list>
</template>

<style scoped></style>
