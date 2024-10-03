<script setup lang="ts">
import type { ApiResourceSite, DataResourceKey } from '~~/types'

const resourceKey: DataResourceKey = 'site'
const { collectionLabel, resourceConfig, isFiltered } =
  useResource<ApiResourceSite>(resourceKey, {
    resourceOperationType: 'collection',
  })
</script>

<template>
  <data-card :title="collectionLabel">
    <template #title-append>
      <lazy-data-toolbar-title-append
        v-if="isFiltered"
        text="filtered"
        :color="COLORS['secondary']"
      />
    </template>
    <template #toolbar-append>
      <lazy-navigation-resource-item-create
        :app-path="resourceConfig.appPath"
      />
      <lazy-navigation-resource-collection-search :resource-config />
    </template>
    <lazy-data-collection-site-table />
  </data-card>
</template>
