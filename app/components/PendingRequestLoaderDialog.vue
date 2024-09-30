<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<template>
  <v-dialog :model-value="visible" max-width="320" persistent>
    <v-progress-circular
      indeterminate
      :size="117"
      :width="12"
    ></v-progress-circular>
  </v-dialog>
</template>

<style scoped></style>
