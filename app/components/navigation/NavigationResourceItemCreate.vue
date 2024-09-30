<script setup lang="ts">
withDefaults(
  defineProps<{
    appPath: string
    disabled?: boolean
  }>(),
  {
    disabled: false,
  },
)
</script>

<template>
  <v-btn
    :disabled
    :icon="true"
    nuxt
    :to="`${appPath}/create`"
    variant="text"
    data-testid="update-item-button"
  >
    <v-icon color="primary" icon="fas fa-plus" />
    <v-tooltip activator="parent" location="bottom">Create item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
