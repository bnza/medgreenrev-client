<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="sitesUser" mode="update" code-key="id">
    <template #default="{ item, resourcePageKey }">
      <lazy-data-item-sites-user-form mode="update" :item />
    </template>
  </lazy-data-item-page>
</template>
