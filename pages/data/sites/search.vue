<script setup lang="ts">
import {
  useResourceFiltersState,
  resourceFiltersStateInjectionKey,
} from '~/composables/states/useResourceFiltersStates'

definePageMeta({
  auth: false,
})
const { resourcePageKey, resourceConfig } = await useResource('sites', {
  resourceOperationType: 'collection',
})

const resourceFilterState = useResourceFiltersState({
  resourcePageKey,
  resourceConfig,
})
provide(resourceFiltersStateInjectionKey, resourceFilterState)
</script>

<template>
  <lazy-filters-add-filter-dialog />
  <lazy-data-card title="Search (Sites)">
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #toolbar-append>
      <lazy-navigation-resource-filter-add size="large" />
    </template>
    <filters-list />
    <template #actions>
      <lazy-filters-list-actions :back-path="resourceConfig.appPath" />
    </template>
  </lazy-data-card>
</template>
