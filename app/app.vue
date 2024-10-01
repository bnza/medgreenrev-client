<script setup lang="ts">
import HomePageLogo from '~/components/HomePageLogo.vue'
import useApiResourcesIndexState from '~/composables/states/useApiResourcesIndexState'

const { ready } = useApiResourcesIndexState()
</script>
<template>
  <v-app theme="dark">
    <NuxtLayout v-if="ready">
      <NuxtLoadingIndicator />
      <NuxtPage />
    </NuxtLayout>
    <v-main v-else class="d-flex align-center justify-center">
      <home-page-logo />
      <app-snackbar />
    </v-main>
  </v-app>
</template>
