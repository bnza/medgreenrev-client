<script setup>
const { filters, isEmpty, removeFilter } = inject('resourceFiltersState')
</script>

<template>
  <v-empty-state
    v-if="isEmpty"
    height="v-100"
    title="No filter selected"
    text="No filter selected yet. Please add new filters clicking the plus button in the top right corner"
  />
  <v-list v-else data-testid="filters-list">
    <lazy-filters-list-item
      v-for="filter in filters"
      :key="filter.id"
      :filter
      @remove-filter="removeFilter($event)"
    />
  </v-list>
</template>

<style scoped></style>
