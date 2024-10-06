<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="user" mode="read" code-key="email">
    <template #default="{ item, resourcePageKey }">
      <lazy-data-item-user-page :resource-page-key :item />
    </template>
  </lazy-data-item-page>
</template>
