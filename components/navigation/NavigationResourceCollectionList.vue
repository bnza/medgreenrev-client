<script setup>
defineProps({
  path: {
    type: String,
    required: true,
  },
  tooltipText: {
    type: String,
    default: 'Show resource list',
  },
})
</script>

<template>
  <v-tooltip location="bottom" :text="tooltipText">
    <template #activator="{ props }">
      <NuxtLink :to="path">
        <v-icon class="mx-3" v-bind="props" icon="fas fa-arrow-left" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>
