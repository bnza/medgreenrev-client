<script setup lang="ts">
import { useResourceFiltersState } from '~/composables'

const props = withDefaults(
  defineProps<{
    resourceKey: ResourceKey
    parent: Record<string, string | number>
    downloadButton?: boolean
    createButton?: boolean
    searchButton?: boolean
  }>(),
  {
    downloadButton: true,
    createButton: true,
    searchButton: true,
  },
)

const { parent, resourceKey } = toRefs(props)

const { isAuthenticated } = useAppAuth()
const { resourceConfig, resourcePageKey, collectionLabel, exportCollection } =
  await useResource(resourceKey.value, {
    parent: parent.value,
    resourceOperationType: 'collection',
  })

const { isFiltered } = useResourceFiltersState({
  resourcePageKey,
  resourceConfig,
})

const collectionTableComponentsMap: Partial<
  Record<ResourceKey, ReturnType<typeof defineAsyncComponent>>
> = {
  samples: defineAsyncComponent(
    () => import('~/components/data/collection/DataCollectionSampleTable.vue'),
  ),
  stratigraphicUnits: defineAsyncComponent(
    () =>
      import(
        '~/components/data/collection/DataCollectionStratigraphicUnitsTable.vue'
      ),
  ),
  sitesUsers: defineAsyncComponent(
    () =>
      import('~/components/data/collection/DataCollectionSitesUsersTable.vue'),
  ),
}

const collectionTableComponent = computed(
  () => collectionTableComponentsMap[resourceKey.value],
)

const toolbarTitleColor = COLORS['secondary']
</script>

<template>
  <data-card :rounded="false" title="">
    <template #title-append>
      <lazy-data-toolbar-title-append
        v-if="isFiltered"
        text="filtered"
        :color="toolbarTitleColor"
      />
    </template>
    <template #toolbar-append>
      <lazy-navigation-resource-collection-download
        v-if="downloadButton && isAuthenticated"
        :resource-page-key
        :export-collection
        :collection-label
      />
      <lazy-navigation-resource-item-create
        v-if="createButton && isAuthenticated"
        :path="{
          path: `${resourceConfig.appPath}/create`,
          query: { parent },
        }"
      />
      <lazy-navigation-resource-item-search
        v-if="searchButton"
        :path="{
          path: `${resourceConfig.appPath}/search`,
          query: { parent },
        }"
      />
    </template>
    <component
      :is="collectionTableComponent"
      data-testid="children-collection-table"
      :parent
    />
  </data-card>
</template>
