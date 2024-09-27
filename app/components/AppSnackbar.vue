<script setup lang="ts">
const { snackbars, unset, getMargin } = useAppSnackbarState()
</script>

<template>
  <v-snackbar
    v-for="[key, { text, timeout, visible, color }] in snackbars"
    data-testid="app-snackbar"
    :style="`margin-top: ${getMargin(key)}px`"
    :model-value="visible"
    close-on-content-click
    :color
    :key
    location="top"
    :text
    :timeout
    @update:model-value="unset(Number(key))"
  />
</template>
