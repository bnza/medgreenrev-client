<script setup>
const { fetchCollection, resourceConfig, collectionLabel } = useResourceUser()
const { pending, error, paginationOptions, totalItems, items } =
  await fetchCollection()
</script>

<template>
  <app-data-card :title="collectionLabel">
    <template #toolbar-append>
      <navigation-resource-item-create
        :path="`${resourceConfig.appPath}/create`"
      />
    </template>
    <template #default>
      <resource-not-found
        v-if="error"
        path="/"
        :error="error"
        tooltip-text="Back to home"
      />
      <lazy-data-collection-user-table
        v-else-if="items"
        :pending
        :paginationOptions
        :totalItems
        :items
      />
    </template>
  </app-data-card>
</template>
