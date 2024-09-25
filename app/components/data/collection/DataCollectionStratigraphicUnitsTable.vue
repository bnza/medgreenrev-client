<script setup lang="ts">
const props = defineProps({
  parent: {
    type: Object,
    default: () => new Object(),
  },
})

const resourceKey: ResourceKey = 'stratigraphicUnits'

const { fetchCollection, headers, resourceConfig, resourcePageKey } =
  await useResource<ApiResourceStratigraphicUnit>(resourceKey, {
    parent: props.parent,
    resourceOperationType: 'collection',
  })
const {
  error,
  paginationOptions,
  setPaginationOptions,
  items,
  status,
  totalItems,
} = await fetchCollection()
const itemsPerPageOptions = ITEMS_PER_PAGE_OPTIONS
</script>

<template>
  <resource-not-found
    v-if="status === 'error'"
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
    :loading="status === 'pending'"
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
    <!--    <template #[`item.code`]="{ item }">-->
    <!--      <p>{{ resourceConfig.getCodeFn(item)() }}</p>-->
    <!--    </template>-->
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
