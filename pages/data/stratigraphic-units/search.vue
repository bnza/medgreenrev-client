<script setup>
import { useResourceFiltersState } from '~/composables'

definePageMeta({
  auth: false,
})
const { resourceConfig } = useResourceStratigraphicUnit(
  'data-stratigraphic-units',
)

const resourceFilterState = useResourceFiltersState({
  routeName: 'data-stratigraphic-units',
  resourceConfig,
})
provide('resourceFiltersState', resourceFilterState)
</script>

<template>
  <lazy-filters-add-filter-dialog />
  <lazy-app-data-card title="Search (Stratigraphic Unit)">
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
  </lazy-app-data-card>
</template>
