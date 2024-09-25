<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    parent?: Record<string, number | string>
  }>(),
  {},
)
const resourceKey: ResourceKey = 'samples'
const { fetchCollection, headers, resourcePageKey } =
  await useResource<ApiResourceSample>(resourceKey, {
    parent: props.parent,
    resourceOperationType: 'collection',
  })
const {
  pending,
  error,
  paginationOptions,
  setPaginationOptions,
  items,
  totalItems,
  status,
} = await fetchCollection()
const itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS
</script>

<template>
  <resource-not-found
    v-if="error"
    path="/"
    :error
    tooltip-text="Back to home"
  />
  <v-data-table-server
    v-else-if="['success', 'pending'].includes(status)"
    :items-per-page-options
    :items-per-page="paginationOptions.itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="items"
    :page="paginationOptions.page"
    :loading="pending"
    :sort-by="paginationOptions.sortBy"
    :fixed-header="true"
    density="compact"
    @update:options="setPaginationOptions($event)"
  >
    <template #[`item.id`]="{ item }">
      <navigation-resource-item
        :page-key="<ResourcePageKey>resourcePageKey"
        :item
      />
    </template>
    <!--    <template #[`item.public`]="{ item }">-->
    <!--      <v-checkbox-btn-->
    <!--        density="compact"-->
    <!--        :inline="true"-->
    <!--        :readonly="true"-->
    <!--        :model-value="item.public"-->
    <!--      />-->
    <!--    </template>-->
  </v-data-table-server>
</template>
