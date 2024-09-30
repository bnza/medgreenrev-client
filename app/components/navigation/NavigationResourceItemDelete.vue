<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    appPath: string
    disabled?: boolean
    id: string | number
    from?: string
    size?: string
  }>(),
  {
    disabled: false,
    size: 'xsmall',
  },
)
</script>

<template>
  <v-btn
    density="compact"
    :disabled
    :icon="true"
    nuxt
    :to="`${appPath}/${id}/delete`"
    variant="text"
    @click="console.log(from)"
    data-testid="delete-item-button"
  >
    <v-icon color="error" icon="fas fa-minus" size="xsmall" />
    <v-tooltip activator="parent" location="bottom">Delete item</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
