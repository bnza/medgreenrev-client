<script setup lang="ts">
import type { ApiResourceCollectionParent, DataResourceKey } from '~~/types'
import { LoadingComponent } from '#components'

const props = withDefaults(
  defineProps<{
    resourceKey: DataResourceKey
    parent: ApiResourceCollectionParent
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

const { resourceConfig, resourcePageKey, isFiltered } = useResource(
  props.resourceKey,
  {
    parent: props.parent,
    resourceOperationType: 'collection',
  },
)

const collectionTableComponentsMap: Partial<
  Record<DataResourceKey, ReturnType<typeof defineAsyncComponent>>
> = {
  stratigraphicUnit: defineAsyncComponent({
    loader: () =>
      import(
        '~/components/data/collection/DataCollectionStratigraphicUnitTable.vue'
      ),
    loadingComponent: LoadingComponent,
  }),
}
const collectionTableComponent = computed(
  () => collectionTableComponentsMap[props.resourceKey],
)
console.log(resourcePageKey)
</script>

<template>
  <data-card :rounded="false" title="">
    <template #title-append>
      <lazy-data-toolbar-title-append
        v-if="isFiltered"
        text="filtered"
        :color="COLORS['secondary']"
      />
    </template>
    <template #toolbar-append>
      <lazy-navigation-resource-collection-search
        v-if="searchButton"
        :resource-config="resourceConfig"
        :parent
      />
    </template>
    <component
      :is="collectionTableComponent"
      data-testid="children-collection-table"
      :parent
    />
  </data-card>
</template>

<style scoped></style>
