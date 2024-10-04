<script setup lang="ts">
definePageMeta({
  auth: false,
})
const { hasRoleAdmin } = useAppAuth()
</script>

<template>
  <lazy-data-collection-card
    resource-key="site"
    :create-button="hasRoleAdmin"
  />
</template>
