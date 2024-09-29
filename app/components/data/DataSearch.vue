<script setup lang="ts">
import type { ApiResourceItem, DataResourceKey } from '~~/types'
import {
  default as useResourceFilterState,
  resourceFilterStateInjectionKey,
} from '~/composables/states/useResourceFilterState'

const props = defineProps<{ resourceKey: DataResourceKey }>()
const { collectionLabel, resourcePageKey, resourceConfig } =
  useResource<ApiResourceItem>(props.resourceKey, {
    resourceOperationType: 'collection',
  })

const resourceFilterState = useResourceFilterState(
  resourcePageKey,
  resourceConfig,
)

provide(resourceFilterStateInjectionKey, resourceFilterState)
</script>

<template>
  <search-add-filter-dialog />
  <lazy-data-card :title="`Search (${collectionLabel})`">
    <template #toolbar-append>
      <lazy-search-filter-add-button />
    </template>
    <lazy-search-filters-list />
    <template #actions>
      <lazy-search-filters-list-actions :back-path="resourceConfig.appPath" />
    </template>
  </lazy-data-card>
</template>

<style scoped></style>
