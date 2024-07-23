<script setup>
const property = defineModel('property')
const { availableProps } = inject('resourceFiltersState')
</script>

<template>
  <v-select v-model="property" :items="availableProps" label="property" />
</template>

<style scoped></style>
