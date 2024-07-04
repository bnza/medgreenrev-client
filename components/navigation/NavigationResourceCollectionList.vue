<script setup>
defineProps({
  path: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <v-tooltip location="bottom" text="Show resource list">
    <template #activator="{ props }">
      <NuxtLink :to="path">
        <v-icon class="mx-3" v-bind="props" icon="fas fa-arrow-left" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>

<style scoped></style>
