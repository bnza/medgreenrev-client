<script setup>

const {fetchCollection, headers, resourceConfig} = useResourceUser()
const {pending, error, paginationOptions, totalItems, items} =
  await fetchCollection()
</script>

<template>
  <v-data-table-server
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
      <navigation-resource-item :resource="resourceConfig" :item="item"/>
    </template>
    <template #[`item.roles`]="{ item }">
      {{ reduceAppRoles(item.roles) }}
    </template>

  </v-data-table-server>
</template>
