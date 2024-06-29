<script setup>
const {resourceConfig, collectionLabel} = useResourceUser()
</script>

<template>
  <app-data-card :title="collectionLabel">
    <template #toolbar-append>
      <navigation-resource-item-create
        :path="`${resourceConfig.appPath}/create`"
      />
    </template>
    <template #default>
      <lazy-data-collection-user-table/>
    </template>
  </app-data-card>
</template>
