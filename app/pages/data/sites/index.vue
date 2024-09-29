<script setup lang="ts">
import type { ApiResourceSite, DataResourceKey } from '~~/types'

const resourceKey: DataResourceKey = 'site'
const { collectionLabel, resourceConfig } = useResource<ApiResourceSite>(
  resourceKey,
  {
    resourceOperationType: 'collection',
  },
)
</script>

<template>
  <data-card :title="collectionLabel">
    <template #toolbar-append>
      <lazy-navigation-resource-collection-search
        :base-path="resourceConfig.appPath"
      />
    </template>
    <lazy-data-collection-site-table />
  </data-card>
</template>

<style scoped></style>
