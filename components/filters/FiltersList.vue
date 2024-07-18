<script setup>
import { useResourceFiltersState } from '~/composables/states/useResourceFiltersState.js'

const props = defineProps({
  mapKey: {
    type: String,
    required: true,
  },
})
const { filters, isEmpty } = useResourceFiltersState(props.mapKey)
</script>

<template>
  <v-empty-state
    v-if="isEmpty"
    height="v-100"
    title="No filter selected"
    text="No filter selected yet. Please add new filters clicking the plus button in the top right corner"
  />
</template>

<style scoped></style>
