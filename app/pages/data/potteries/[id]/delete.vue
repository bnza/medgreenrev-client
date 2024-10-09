<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="pottery" mode="delete">
    <template #default="{ item }">
      <lazy-data-item-pottery-form mode="delete" :item />
    </template>
  </lazy-data-item-page>
</template>
