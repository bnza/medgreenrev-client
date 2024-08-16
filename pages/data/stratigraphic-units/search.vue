<script setup>
import { useResourceFiltersState } from '~/composables'

definePageMeta({
  auth: false,
})

const route = useRoute()
const parent = route.query?.parent

const { resourceConfig, resourcePageKey } = await useResource(
  'stratigraphicUnits',
  { parent, resourceOperationType: 'collection' },
)

const resourceFilterState = useResourceFiltersState({
  resourcePageKey,
  resourceConfig,
})
provide('resourceFiltersState', resourceFilterState)
</script>

<template>
  <lazy-filters-add-filter-dialog />
  <lazy-data-card title="Search (Stratigraphic Unit)">
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
