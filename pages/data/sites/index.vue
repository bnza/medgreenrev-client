<script setup>
definePageMeta({
  auth: false,
})
const {hasRoleAdmin} = useAppAuth()
const {resourceConfig, collectionLabel} = useResourceSite()
const error = ref(null)
</script>

<template>
  <app-data-card :title="collectionLabel">
    <template #toolbar-append>
      <navigation-resource-item-create
        v-if="hasRoleAdmin"
        :path="`${resourceConfig.appPath}/create`"
      />
    </template>
    <template #default>
      <lazy-data-collection-site-table @error="error = $event"/>
    </template>
  </app-data-card>
</template>
