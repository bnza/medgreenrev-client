<script setup lang="ts">
import type { ApiResourceItem, DataResourceKey } from '~~/types'

const props = defineProps<{ resourceKey: DataResourceKey }>()
const { headers, fetchCollection, resourceConfig } =
  useResource<ApiResourceItem>(props.resourceKey, {
    resourceOperationType: 'collection',
  })

const { items, paginationOptions, totalItems, status } = await fetchCollection()
</script>

<template>
  <v-data-table-server
    :loading="status === 'pending'"
    v-bind="$attrs"
    :headers
    :items
    :items-length="totalItems"
    :items-per-page="paginationOptions.itemsPerPage"
    :items-per-page-options
    :page="paginationOptions.page"
    :sort-by="paginationOptions.sortBy"
    @update:options="paginationOptions = $event"
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
</template>

<style scoped></style>
