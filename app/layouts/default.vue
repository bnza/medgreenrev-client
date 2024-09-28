<script setup lang="ts">
import LoginDataCard from '~/components/LoginDataCard.vue'

const { mode } = useDataUiModeState()
</script>

<template>
  <app-bar />
  <KeepAlive>
    <app-navigation-drawer v-if="mode !== 'login'" />
  </KeepAlive>
  <v-main class="d-flex align-center justify-center">
    <KeepAlive>
      <app-map v-if="mode === 'map'" />
    </KeepAlive>
    <KeepAlive>
      <slot v-if="mode === 'default'" />
    </KeepAlive>
    <login-data-card v-if="mode === 'login'" />
  </v-main>
  <app-snackbar />
</template>
