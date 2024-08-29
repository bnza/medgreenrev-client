<script setup lang="ts">
import { resourceFiltersStateInjectionKey } from '~/composables/states/useResourceFiltersStates'

const property = defineModel('property')
const { availableProps } = inject(resourceFiltersStateInjectionKey)
</script>

<template>
  <Suspense>
    <v-select
      v-bind="$attrs"
      v-model="property"
      :items="availableProps"
      label="property"
    />
    <template #fallback>
      <v-skeleton-loader type="text" />
    </template>
  </Suspense>
</template>

<style scoped></style>
