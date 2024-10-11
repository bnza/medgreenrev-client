<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="sitesUser" mode="delete" code-key="id">
    <template #default="{ item, resourcePageKey }">
      <lazy-data-item-sites-user-form :mode="'delete'" :item />
    </template>
  </lazy-data-item-page>
</template>
