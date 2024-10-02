<script setup lang="ts">
import type {
  ApiResourceSite,
  ApiResourceStratigraphicUnit,
  DataResourceKey,
} from '~~/types'

const resourceKey: DataResourceKey = 'stratigraphicUnit'
const { collectionLabel, resourceConfig } =
  useResource<ApiResourceStratigraphicUnit>(resourceKey, {
    resourceOperationType: 'collection',
  })
</script>

<template>
  <data-card :title="collectionLabel">
    <template #toolbar-append>
      <lazy-navigation-resource-collection-search
        :base-path="resourceConfig.appPath"
      />
    </template>
    <lazy-data-collection-stratigraphic-unit-table />
  </data-card>
</template>
