<script setup>
const property = defineModel('property')
const { availableProps } = inject('resourceFiltersState')
</script>

<template>
  <Suspense>
    <v-select
      v-bind="$attrs"
      v-model="property"
      :items="availableProps"
      label="property"
    />
    <template #fallback>
      <v-skeleton-loader type="text" />
    </template>
  </Suspense>
</template>

<style scoped></style>
