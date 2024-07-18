<script setup>
definePageMeta({
  auth: false,
})
const { hasRoleAdmin } = useAppAuth()
const { fetchCollection, resourceConfig, collectionLabel } = useResourceSite()
const { pending, error, paginationOptions, totalItems, items } =
  await fetchCollection()
</script>

<template>
  <app-data-card :title="collectionLabel">
    <template #toolbar-append>
      <lazy-navigation-resource-item-create
        v-if="hasRoleAdmin"
        :path="`${resourceConfig.appPath}/create`"
      />
      <lazy-navigation-resource-item-search
        :path="`${resourceConfig.appPath}/search`"
      />
    </template>
    <template #default>
      <resource-not-found
        v-if="error"
        path="/"
        :error="error"
        tooltip-text="Back to home"
      />
      <lazy-data-collection-site-table
        v-else-if="items"
        :pending
        :paginationOptions
        :totalItems
        :items
      />
    </template>
  </app-data-card>
</template>
