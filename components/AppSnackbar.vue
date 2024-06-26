<script setup>
const { state, reset } = useAppSnackbarState()
</script>

<template>
  <v-snackbar
    v-model="state.visible"
    :multi-line="state.multiline"
    :vertical="state.vertical"
    :timeout="state.timeout"
    :color="state.color"
    location="top"
    data-testid="app-snackbar"
  >
    {{ state.text }}

    <div v-if="state.vertical && state.title" class="text-subtitle-1 pb-2">
      {{ state.title }}
    </div>

    <template v-if="state.timeout === -1" #actions>
      <v-btn
        icon="fas fa-xmark"
        variant="text"
        @click="reset()"
        color="anchor"
      />
    </template>
  </v-snackbar>
</template>
