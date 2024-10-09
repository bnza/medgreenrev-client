<script setup lang="ts">
import type { ApiResourceCollectionParent, DataResourceKey } from '~~/types'
import { LoadingComponent } from '#components'
import useCreateParentStateKey from '~/composables/states/useCreateParentStateKey'

const props = withDefaults(
  defineProps<{
    resourceKey: DataResourceKey
    parent?: ApiResourceCollectionParent
    downloadButton?: boolean
    createButton?: boolean
    searchButton?: boolean
  }>(),
  {
    downloadButton: true,
    createButton: false,
    searchButton: true,
  },
)

const { collectionLabel, resourceConfig, resourcePageKey, isFiltered } =
  useResource(props.resourceKey, {
    parent: props.parent,
    resourceOperationType: 'collection',
  })

const collectionTableComponentsMap: Partial<
  Record<DataResourceKey, ReturnType<typeof defineAsyncComponent>>
> = {
  pottery: defineAsyncComponent({
    loader: () =>
      import('~/components/data/collection/DataCollectionPotteryTable.vue'),
    loadingComponent: LoadingComponent,
  }),
  site: defineAsyncComponent({
    loader: () =>
      import('~/components/data/collection/DataCollectionSiteTable.vue'),
    loadingComponent: LoadingComponent,
  }),
  stratigraphicUnit: defineAsyncComponent({
    loader: () =>
      import(
        '~/components/data/collection/DataCollectionStratigraphicUnitTable.vue'
      ),
    loadingComponent: LoadingComponent,
  }),
  user: defineAsyncComponent({
    loader: () =>
      import('~/components/data/collection/DataCollectionUserTable.vue'),
    loadingComponent: LoadingComponent,
  }),
}
const collectionTableComponent = computed(
  () => collectionTableComponentsMap[props.resourceKey],
)
const createParentState = useCreateParentStateKey()
const setCreateParentState = () => {
  if (props.parent) {
    createParentState.value = [props.resourceKey, props.parent[1]]
  }
}
</script>

<template>
  <data-card :rounded="false" :title="parent ? '' : collectionLabel">
    <template #title-append>
      <lazy-data-toolbar-title-append
        v-if="isFiltered"
        text="filtered"
        :color="COLORS['secondary']"
      />
    </template>
    <template #toolbar-append>
      <lazy-navigation-resource-item-create
        v-if="createButton"
        :app-path="resourceConfig.appPath"
        @click="setCreateParentState"
      />
      <lazy-navigation-resource-collection-search
        v-if="searchButton"
        :resource-config="resourceConfig"
        :parent
      />
    </template>
    <Suspense>
      <component
        :is="collectionTableComponent"
        data-testid="children-collection-table"
        :parent
      />
    </Suspense>
  </data-card>
</template>
