<script setup>
const props = defineProps({
  filter: { type: Object, required: true },
})
</script>

<template>
  <v-list-item :key="filter.key">
    <p>{{ API_FILTERS[filter.operator].getKey(filter) }}</p>
  </v-list-item>
</template>

<style scoped></style>
