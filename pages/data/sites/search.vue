<script setup lang="ts">
definePageMeta({
  auth: false,
})
const { resourceConfig } = useResourceSite()
const isAddFilterDialogOpen = ref(false)
const route = useRoute()
</script>

<template>
  <lazy-filters-add-filter-dialog v-model="isAddFilterDialogOpen" />
  <lazy-app-data-card title="Search (Sites)">
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #toolbar-append>
      <lazy-navigation-resource-filter-add
        size="large"
        @click="isAddFilterDialogOpen = true"
      />
    </template>
    <lazy-filters-card-content>
      <filters-list :map-key="route.path" />
    </lazy-filters-card-content>
  </lazy-app-data-card>
</template>

<style scoped></style>
