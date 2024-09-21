<script setup lang="ts">
import {
  useResourceFiltersState,
  resourceFiltersStateInjectionKey,
} from '~/composables/states/useResourceFiltersStates'

definePageMeta({
  auth: false,
})

const route = useRoute()
const parent = route.query?.parent as unknown as
  | Record<string, string | number>
  | undefined

const { resourceConfig, resourcePageKey } = await useResource('samples', {
  parent,
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
  <lazy-data-card title="Search (Sample)">
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
