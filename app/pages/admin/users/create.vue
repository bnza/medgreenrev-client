<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="user" mode="create" code-key="email">
    <template #default="{ item, resourcePageKey }">
      <lazy-data-item-user-form :mode="'create'" :item />
    </template>
  </lazy-data-item-page>
</template>
