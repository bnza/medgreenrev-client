<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="site" mode="read">
    <template #default="{ item, resourcePageKey }">
      <lazy-data-item-site-page :resource-page-key :item />
    </template>
  </lazy-data-item-page>
</template>
