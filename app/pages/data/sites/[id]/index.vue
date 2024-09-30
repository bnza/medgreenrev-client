<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="site" mode="read">
    <template #default="{ item }">
      <lazy-data-item-site-form :mode="'read'" :item />
    </template>
  </lazy-data-item-page>
</template>
