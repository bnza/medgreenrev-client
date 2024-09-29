<script setup lang="ts">
import type { ApiResourceSite, DataResourceKey } from '~~/types'

const resourceKey: DataResourceKey = 'site'
const { collectionLabel } = useResource<ApiResourceSite>(resourceKey, {
  resourceOperationType: 'collection',
})
</script>

<template>
  <data-card :title="collectionLabel">
    <lazy-data-collection-site-table />
  </data-card>
</template>

<style scoped></style>
