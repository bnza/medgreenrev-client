<script setup>
defineProps({
  path: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <v-tooltip location="bottom" text="search">
    <template #activator="{ props }">
      <NuxtLink :to="path" data-testid="collection-search-link">
        <v-icon class="mx-4" icon="fas fa-magnifying-glass" v-bind="props" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>
