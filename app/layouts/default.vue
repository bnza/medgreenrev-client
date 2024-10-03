<script setup lang="ts">
import LoginDataCard from '~/components/LoginDataCard.vue'

const { mode, authMode, logoutPending } = useDataUiModeState()
const { status } = useAuth()
watch(status, (value, oldValue) => {
  if (value === 'unauthenticated' && oldValue === 'authenticated') {
    if (logoutPending.value) {
      logoutPending.value = false
      return
    }
    console.log('Session expired')
    mode.value = 'login'
  }
})
</script>

<template>
  <app-bar />
  <KeepAlive>
    <app-navigation-drawer v-if="!authMode" />
  </KeepAlive>
  <v-main class="d-flex align-center justify-center">
    <KeepAlive>
      <lazy-app-map v-if="mode === 'map'" />
    </KeepAlive>
    <KeepAlive>
      <slot v-if="mode === 'default'" />
    </KeepAlive>
    <login-data-card v-if="mode === 'login'" />
    <logout-data-card v-if="mode === 'logout'" />
  </v-main>
  <app-snackbar />
</template>
