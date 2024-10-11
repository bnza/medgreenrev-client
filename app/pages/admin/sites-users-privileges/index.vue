<script setup lang="ts">
const { hasRoleAdmin } = useAppAuth()
</script>

<template>
  <lazy-data-collection-card
    resource-key="sitesUser"
    :create-button="hasRoleAdmin"
    :search-button="false"
  />
</template>
