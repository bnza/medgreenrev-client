<script setup lang="ts">
import { resourceFilterStateInjectionKey } from '~/composables/states/useResourceFilterState'

const { filters, isEmpty, isChanged, deleteFilter } = inject(
  resourceFilterStateInjectionKey,
)
const filterValues = computed(() => Object.values(filters.value))
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
    <search-filters-list-item
      v-for="filter in filterValues"
      :key="filter.id"
      :filter
      @remove-filter="deleteFilter($event)"
    />
  </v-list>
</template>

<style scoped></style>
