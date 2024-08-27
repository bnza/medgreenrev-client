<script setup lang="ts">
import { useResourceFiltersState } from '~/composables'

const props = defineProps<{
  resourceKey: ResourceKey
  parent: Record<string, string | number>
}>()

const { parent, resourceKey } = toRefs(props)

const { isAuthenticated } = useAppAuth()
const { resourceConfig, resourcePageKey } = await useResource(
  resourceKey.value,
  { parent: parent.value, resourceOperationType: 'collection' },
)

const { isFiltered } = useResourceFiltersState({
  resourcePageKey,
  resourceConfig,
})

const collectionTableComponentsMap: Partial<
  Record<ResourceKey, ReturnType<typeof defineAsyncComponent>>
> = {
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
      <lazy-navigation-resource-item-create
        v-if="isAuthenticated"
        :path="{
          path: `${resourceConfig.appPath}/create`,
          query: { parent },
        }"
      />
      <lazy-navigation-resource-item-search
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
