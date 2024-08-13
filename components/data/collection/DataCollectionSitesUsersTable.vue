<script setup>
const props = defineProps({
  parent: {
    type: Object,
    default: () => new Object(),
  },
})
const { fetchCollection, headers, resourceConfig } =
  await useResource('sitesUsers')
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
      <!--      <v-btn-->
      <!--        color="error"-->
      <!--        density="compact"-->
      <!--        :icon="true"-->
      <!--        variant="text"-->
      <!--        data-testid="delete-item-button"-->
      <!--      >-->
      <!--        <v-icon icon="fas fa-minus" size="xsmall" />-->
      <!--        <v-tooltip activator="parent" location="bottom">Delete item</v-tooltip>-->
      <!--      </v-btn>-->
      <navigation-resource-item :resource="resourceConfig" :item="item" />
    </template>
    <template #[`item.privileges`]="{ item }">
      <lazy-auth-sites-users-privileges-button :privileges="item.privileges" />
    </template>
  </v-data-table-server>
</template>
