<script setup lang="ts">
import type { ApiResourceCollectionParent, DataResourceKey } from '~~/types'

defineProps<{ parent?: ApiResourceCollectionParent }>()

const resourceKey: DataResourceKey = 'stratigraphicUnit'
</script>

<template>
  <lazy-data-collection-table :resource-key :parent>
    <template #[`item.id`]="{ item, resourceConfig }">
      <navigation-resource-item
        :id="item.id"
        :acl="item._acl"
        :app-path="resourceConfig.appPath"
      />
    </template>
    <template #[`item.code`]="{ item }">
      <p class="text-secondary">{{ item.code }}</p>
    </template>
    <template #[`item.public`]="{ item }">
      <v-checkbox-btn
        density="compact"
        :inline="true"
        :readonly="true"
        :model-value="item.public"
      />
    </template>
  </lazy-data-collection-table>
</template>
