<script setup>
definePageMeta({
  auth: false,
})
const { hasRoleAdmin } = useAppAuth()
const { resourceConfig, collectionLabel } = useResourceSite()
</script>

<template>
  <app-data-card :title="collectionLabel">
    <template #toolbar-append>
      <lazy-navigation-resource-item-create
        v-if="hasRoleAdmin"
        :path="`${resourceConfig.appPath}/create`"
      />
      <lazy-navigation-resource-item-search
        :path="`${resourceConfig.appPath}/search`"
      />
    </template>
    <template #default>
      <lazy-data-collection-site-table />
    </template>
  </app-data-card>
</template>
