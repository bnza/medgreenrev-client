<script setup>
defineProps({
  path: {
    validator(value) {
      return 'string' === typeof value || value?.constructor === Object
    },
    required: true,
  },
})
</script>

<template>
  <v-tooltip location="bottom" text="create new resource">
    <template #activator="{ props }">
      <NuxtLink :to="path" data-testid="collection-create-link">
        <v-icon class="mx-4" icon="fas fa-plus" v-bind="props" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>

<style scoped></style>
