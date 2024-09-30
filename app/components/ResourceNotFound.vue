<script setup lang="ts">
withDefaults(
  defineProps<{
    error: Error
    path: string
    tooltipText?: string
  }>(),
  {
    tooltipText: 'Back to collection',
  },
)
</script>

<template>
  <v-empty-state
    v-if="error"
    title="Requested resource cannot be found"
    :text="error.message"
    data-testid="resource-empty-state"
  >
    <template #actions>
      <lazy-navigation-resource-collection-list
        :path="path"
        :replace="true"
        :tooltip-text
      />
    </template>
  </v-empty-state>
</template>
