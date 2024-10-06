<script setup lang="ts">
const { isPasswordDialogOpen, submitStatus } = inject(
  userPasswordStateInjectionKey,
)
</script>

<template>
  <v-btn
    :disabled="submitStatus === 'pending'"
    color="warning"
    rounded="false"
    variant="text"
    :icon="true"
    @click="isPasswordDialogOpen = true"
  >
    <v-icon icon="fas fa-key" />
    <v-tooltip activator="parent" location="bottom">Reset password</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
