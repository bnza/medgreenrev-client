<script setup lang="ts">
import { useResourceFiltersState } from '~/composables'

const { resourcePageKey, resourceConfig, collectionLabel } = await useResource(
  'sitesUsers',
  { resourceOperationType: 'collection' },
)
const { isFiltered } = useResourceFiltersState({
  resourcePageKey,
  resourceConfig,
})
const color = COLORS['secondary']
</script>

<template>
  <data-card :title="collectionLabel">
    <template #title-append>
      <lazy-data-toolbar-title-append
        v-if="isFiltered"
        text="filtered"
        :color
      />
    </template>
    <template #toolbar-append>
      <lazy-navigation-resource-item-create
        :path="`${resourceConfig.appPath}/create`"
      />
    </template>
    <template #default>
      <lazy-data-collection-sites-users-table />
    </template>
  </data-card>
</template>
