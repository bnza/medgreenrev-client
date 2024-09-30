<script setup lang="ts">
withDefaults(
  defineProps<{
    appPath: string
    id: string | number
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)
</script>

<template>
  <v-btn
    density="compact"
    :disabled
    :icon="true"
    variant="text"
    nuxt
    :to="`${appPath}/${id}`"
    data-testid="read-item-button"
  >
    <v-icon color="primary" icon="fas fa-arrow-right" size="xsmall" />
    <v-tooltip activator="parent" location="bottom">View item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
