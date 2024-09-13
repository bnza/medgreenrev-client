<script setup lang="ts">
import { useResourceFiltersState } from '~/composables'

definePageMeta({
  auth: false,
})
const { hasRoleAdmin, isAuthenticated } = useAppAuth()
const { resourcePageKey, resourceConfig, collectionLabel, exportCollection } =
  await useResource('sites', { resourceOperationType: 'collection' })
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
      <lazy-navigation-resource-collection-download
        v-if="isAuthenticated"
        :resource-page-key
        :export-collection
        :collection-label
      />
      <lazy-navigation-resource-item-create
        v-if="hasRoleAdmin"
        :path="`${resourceConfig.appPath}/create`"
      />
      <lazy-navigation-resource-item-search
        :path="`${resourceConfig.appPath}/search`"
      />
    </template>
    <template #default="">
      <lazy-data-collection-site-table />
    </template>
  </data-card>
</template>
