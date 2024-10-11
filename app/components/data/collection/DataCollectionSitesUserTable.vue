<script setup lang="ts">
import type { DataResourceKey } from '~~/types'

const resourceKey: DataResourceKey = 'sitesUser'
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
    <template #[`item.privileges`]="{ item }">
      <auth-sites-user-privilege-button :privileges="item.privileges" />
    </template>
  </lazy-data-collection-table>
</template>
