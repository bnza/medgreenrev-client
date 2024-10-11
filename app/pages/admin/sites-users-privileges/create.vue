<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="sitesUser" mode="create" code-key="id">
    <template #default="{ item, resourcePageKey }">
      <lazy-data-item-sites-user-form :mode="'create'" :item />
    </template>
  </lazy-data-item-page>
</template>
