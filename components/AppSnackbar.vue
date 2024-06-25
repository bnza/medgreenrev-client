<script setup>
const { state, reset } = useAppSnackbarState()
</script>

<template>
  <v-snackbar
    v-model="state.visible"
    :multi-line="state.multiline"
    :vertical="state.vertical"
    :timeout="state.timeout"
    :timer="state.timeout > -1"
    :color="state.color"
    location="top"
    data-testid="app-snackbar"
  >
    {{ state.text }}

    <div v-if="state.vertical && state.title" class="text-subtitle-1 pb-2">
      {{ state.title }}
    </div>

    <template v-if="state.timeout === -1" #actions>
      <v-btn icon="mdi-close-circle-outline" variant="text" @click="reset()" />
    </template>
  </v-snackbar>
</template>
