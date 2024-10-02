<script setup lang="ts">
import type { ApiResourceCollectionParent, DataResourceKey } from '~~/types'

const props = defineProps<{
  resourceKey: DataResourceKey
  parent: ApiResourceCollectionParent
}>()

const { resourceConfig, resourcePageKey } = useResource(props.resourceKey, {
  parent: props.parent,
  resourceOperationType: 'collection',
})

const collectionTableComponentsMap: Partial<
  Record<DataResourceKey, ReturnType<typeof defineAsyncComponent>>
> = {
  stratigraphicUnit: defineAsyncComponent(
    () =>
      import(
        '~/components/data/collection/DataCollectionStratigraphicUnitTable.vue'
      ),
  ),
}
const collectionTableComponent = computed(
  () => collectionTableComponentsMap[props.resourceKey],
)
console.log(resourcePageKey)
</script>

<template>
  <data-card :rounded="false" title="">
    <component
      :is="collectionTableComponent"
      data-testid="children-collection-table"
      :parent
    />
  </data-card>
</template>

<style scoped></style>
