<script setup lang="ts">
const { mode } = useDataUiModeState()
</script>

<template>
  <v-tooltip text="login">
    <template #activator="{ props }">
      <v-btn
        icon="fas fa-right-to-bracket"
        v-bind="props"
        data-testid="login-button"
        @click="mode = 'login'"
      />
    </template>
  </v-tooltip>
</template>
