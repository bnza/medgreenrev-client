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
    nuxt
    :to="`${appPath}/${id}/update`"
    variant="text"
    data-testid="update-item-button"
  >
    <v-icon color="success" icon="far fa-pen-to-square" size="xsmall" />
    <v-tooltip activator="parent" location="bottom">Edit item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
