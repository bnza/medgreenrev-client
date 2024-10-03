<script setup lang="ts">
const { hasRoleAdmin } = useAppAuth()
</script>

<template>
  <lazy-data-collection-card
    resource-key="site"
    :create-button="hasRoleAdmin"
  />
</template>
