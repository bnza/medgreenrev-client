<script setup lang="ts">
import type {
  ApiResourceCollectionParent,
  ApiResourceItem,
  DataResourceKey,
} from '~~/types'

const props = defineProps<{
  resourceKey: DataResourceKey
  parent?: ApiResourceCollectionParent
}>()
const { headers, fetchCollection, resourceConfig, parent } =
  useResource<ApiResourceItem>(props.resourceKey, {
    parent: props.parent,
    resourceOperationType: 'collection',
  })

if (props.parent) {
  parent.value = props.parent
}

// @ts-ignore
let results: Ref<Partial<Awaited<ReturnType<typeof fetchCollection>>>> = ref({
  items: ref([]),
  status: ref('pending'),
})

fetchCollection().then((_results) => (results.value = _results))
</script>

<template>
  <v-data-table-server
    :loading="results.status === 'pending'"
    fixed-header
    fixed-footer
    height="calc(100vh - 300px)"
    :headers
    :items="results.items"
    :items-length="results.totalItems || 0"
    :items-per-page="results.paginationOptions?.itemsPerPage"
    :items-per-page-options
    :page="results.paginationOptions?.page || 1"
    :sort-by="results.paginationOptions?.sortBy"
    @update:options="results.paginationOptions = $event"
  >
    <!-- https://mokkapps.de/vue-tips/expose-slots-from-a-child-component-->
    <template v-for="(_, name) in $slots" #[name]="slotProps">
      <slot
        :name="name"
        v-bind="slotProps || {}"
        :resource-config="resourceConfig"
      />
    </template>
  </v-data-table-server>

  <!--  <loading-component v-else />-->
</template>

<style scoped></style>
