<script setup>
defineProps({
  error: {
    type: Error,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  tooltipText: {
    type: String,
  },
})
</script>

<template>
  <v-empty-state
    v-if="error"
    title="Requested resource cannot be found"
    :text="error.message"
    data-testid="resource-empty-state"
  >
    <template #actions>
      <lazy-navigation-resource-collection-list :path="path" :tooltip-text />
    </template>
  </v-empty-state>
</template>
