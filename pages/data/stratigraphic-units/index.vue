<script setup>
import { useResourceFiltersState } from '~/composables/index.js'

definePageMeta({
  auth: false,
})
const { hasRoleAdmin } = useAppAuth()
const { resourceConfig, collectionLabel, routeName } =
  useResourceStratigraphicUnit()
const { isFiltered } = useResourceFiltersState({
  routeName,
  resourceConfig,
})
</script>

<template>
  <app-data-card :title="collectionLabel">
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
  </app-data-card>
</template>
