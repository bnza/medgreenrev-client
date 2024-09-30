<script setup lang="ts" generic="RT = ApiResourceSite">
import type { ApiResourceSite } from '~~/types'

const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-page resource-key="site" mode="delete">
    <template #default="{ item }">
      <lazy-data-item-site-form mode="delete" :item />
    </template>
  </lazy-data-item-page>
</template>

<style scoped></style>
