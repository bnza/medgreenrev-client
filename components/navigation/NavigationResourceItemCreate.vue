<script setup>
defineProps({
  path: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <v-tooltip location="bottom" text="create new resource">
    <template #activator="{ props }">
      <NuxtLink :to="path">
        <v-icon class="mx-4 pa-6" icon="fas fa-plus" v-bind="props" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>

<style scoped></style>
