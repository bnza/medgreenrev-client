<script setup lang="ts">
import type { ApiResourceStratigraphicUnit, DataResourceKey } from '~~/types'

const resourceKey: DataResourceKey = 'stratigraphicUnit'
const { collectionLabel, resourceConfig, isFiltered } =
  useResource<ApiResourceStratigraphicUnit>(resourceKey, {
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
      <lazy-navigation-resource-collection-search :resource-config />
    </template>
    <lazy-data-collection-stratigraphic-unit-table />
  </data-card>
</template>
