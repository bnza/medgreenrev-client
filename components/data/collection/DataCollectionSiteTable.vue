<script setup>
const props = defineProps({
  parent: {
    type: Object,
    default: () => new Object(),
  },
})
const { fetchCollection, headers, resourceConfig } = useResourceSite()
const { pending, error, paginationOptions, items, totalItems } =
  await fetchCollection(props.parent)
</script>

<template>
  <resource-not-found
    v-if="error"
    path="/"
    :error
    tooltip-text="Back to home"
  />
  <v-data-table-server
    v-else
    :items-per-page-options="ITEMS_PER_PAGE_OPTIONS"
    :items-per-page="paginationOptions.itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="items"
    :page="paginationOptions.page"
    :loading="pending"
    :sort-by="paginationOptions.sortBy"
    :fixed-header="true"
    density="compact"
    @update:options="Object.assign(paginationOptions, $event)"
  >
    <template #[`item.id`]="{ item }">
      <navigation-resource-item :resource="resourceConfig" :item="item" />
    </template>
    <template #[`item.public`]="{ item }">
      <v-checkbox-btn
        density="compact"
        :inline="true"
        :readonly="true"
        :model-value="item.public"
      />
    </template>
  </v-data-table-server>
</template>
