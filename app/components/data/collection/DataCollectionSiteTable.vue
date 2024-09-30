<script setup lang="ts">
import type { DataResourceKey } from '~~/types'

const resourceKey: DataResourceKey = 'site'
</script>

<template>
  <lazy-data-collection-table :resource-key>
    <template #[`item.id`]="{ item, resourceConfig }">
      <navigation-resource-item
        :id="item.id"
        :acl="item._acl"
        :app-path="resourceConfig.appPath"
      />
    </template>
  </lazy-data-collection-table>
</template>

<style scoped></style>
