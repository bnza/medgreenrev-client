<script setup lang="ts">
import { resourceFiltersStateInjectionKey } from '~/composables/states/useResourceFiltersStates'

const { filters, isEmpty, isChanged, removeFilter } = inject(
  resourceFiltersStateInjectionKey,
)
const text = computed(() =>
  isChanged.value
    ? 'All filters have been removed.'
    : 'No filter selected yet. Please add new filters clicking the plus button in the top right corner',
)
</script>

<template>
  <v-empty-state
    v-if="isEmpty"
    min-height="400px"
    title="No filter selected"
    :text
  />
  <v-list v-else min-height="400px" data-testid="filters-list">
    <lazy-filters-list-item
      v-for="filter in filters"
      :key="filter.id"
      :filter
      @remove-filter="removeFilter($event)"
    />
  </v-list>
</template>

<style scoped></style>
