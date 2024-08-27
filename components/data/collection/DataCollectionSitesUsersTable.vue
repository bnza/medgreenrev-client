<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    parent?: Record<string, number | string>
  }>(),
  {},
)
const resourceKey: ResourceKey = 'sitesUsers'
const { fetchCollection, headers, resourcePageKey } =
  await useResource<ApiResourceSitesUsers>(resourceKey, {
    parent: props.parent,
    resourceOperationType: 'collection',
  })
const { pending, error, paginationOptions, items, totalItems } =
  await fetchCollection()
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
    v-else
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
    @update:options="Object.assign(paginationOptions, $event)"
  >
    <template #[`item.id`]="{ item }">
      <navigation-resource-item
        :page-key="<ResourcePageKey>resourcePageKey"
        :item
      />
    </template>
    <template #[`item.privileges`]="{ item }">
      <lazy-auth-sites-users-privileges-button :privileges="item.privileges" />
    </template>
  </v-data-table-server>
</template>
