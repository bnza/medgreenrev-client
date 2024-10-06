<script setup lang="ts">
const { hasRoleAdmin } = useAppAuth()
</script>

<template>
  <lazy-data-collection-card
    resource-key="user"
    :create-button="hasRoleAdmin"
  />
</template>
