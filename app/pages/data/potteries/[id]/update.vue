<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page mode="update" resource-key="pottery">
    <template #default="{ item }">
      <lazy-data-item-pottery-form :mode="'update'" :item />
    </template>
  </lazy-data-item-page>
</template>
