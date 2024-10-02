<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="stratigraphicUnit" mode="read">
    <template #default="{ item }">
      <lazy-data-item-stratigraphic-unit-form :mode="'read'" :item />
    </template>
  </lazy-data-item-page>
</template>
