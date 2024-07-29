<script setup>
const tableProps = defineProps(resourceDataTableProps)
const { items, pending, totalItems } = toRefs(tableProps)
const paginationOptions = defineModel('paginationOptions')

const { headers, resourceConfig } = useResourceStratigraphicUnit()
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
      <navigation-resource-item :resource="resourceConfig" :item="item" />
    </template>
    <template #[`item.code`]="{ item }">
      <p>{{ resourceConfig.getCodeFn(item)() }}</p>
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
