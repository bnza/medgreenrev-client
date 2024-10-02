<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="stratigraphicUnit" mode="delete">
    <template #default="{ item }">
      <lazy-data-item-stratigraphic-unit-form mode="delete" :item />
    </template>
  </lazy-data-item-page>
</template>

<style scoped></style>
