<script setup>
import { useResourceFiltersState } from '~/composables/index.ts'

definePageMeta({
  auth: false,
})
const { hasRoleAdmin } = useAppAuth()
const { resourcePageKey, resourceConfig, collectionLabel } =
  await useResource('stratigraphicUnits')
const { isFiltered } = useResourceFiltersState({
  resourcePageKey,
  resourceConfig,
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
        v-if="hasRoleAdmin"
        :path="`${resourceConfig.appPath}/create`"
      />
      <lazy-navigation-resource-item-search
        :path="`${resourceConfig.appPath}/search`"
      />
    </template>
    <template #default>
      <lazy-data-collection-stratigraphic-units-table />
    </template>
  </data-card>
</template>
