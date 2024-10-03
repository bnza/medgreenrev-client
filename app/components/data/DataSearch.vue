<script setup lang="ts">
import type {
  ApiResourceItem,
  DataResourceKey,
  ResourceOperationType,
} from '~~/types'
import {
  default as useResourceFilterState,
  resourceFilterStateInjectionKey,
} from '~/composables/states/useResourceFilterState'
import useSearchParentStateKey from '~/composables/states/useSearchParentStateKey'

const props = defineProps<{ resourceKey: DataResourceKey }>()

const parentKey = useSearchParentStateKey()
const parentKeyOrOptions = parentKey.value || {
  resourceOperationType: 'collection' as ResourceOperationType,
}
const { collectionLabel, resourcePageKey, resourceConfig, parent } =
  useResource<ApiResourceItem>(props.resourceKey, parentKeyOrOptions)

const resourceFilterState = useResourceFilterState(
  resourcePageKey,
  resourceConfig,
)

provide(resourceFilterStateInjectionKey, resourceFilterState)

onBeforeRouteLeave(() => {
  if (parentKey.value) {
    console.log('unsetting parent')
    parentKey.value = ''
  }
})
console.log('parent', parent.value)
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
