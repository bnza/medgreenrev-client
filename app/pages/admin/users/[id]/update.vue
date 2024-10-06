<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="user" mode="update" code-key="email">
    <template #default="{ item, resourcePageKey }">
      <lazy-data-item-user-form mode="update" :item />
    </template>
  </lazy-data-item-page>
</template>
