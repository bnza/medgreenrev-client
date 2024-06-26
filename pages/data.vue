<script setup>
import { useDataUiModeState } from '~/composables/states/useDataUiModeState'

definePageMeta({
  layout: false,
})
defineOptions({ name: 'DataWrapper' })
const { mode } = useDataUiModeState()
</script>

<template>
  <NuxtLayout name="default">
    <template #app-bar-center>
      <ui-mode-switcher />
    </template>
    <KeepAlive>
      <lazy-app-map v-if="mode === 'map'" />
    </KeepAlive>
    <Suspense>
      <KeepAlive>
        <NuxtPage v-if="mode === 'default'" />
      </KeepAlive>
      <template #fallback>
        <v-progress-circular indeterminate :size="128" :width="12" />
      </template>
    </Suspense>
  </NuxtLayout>
</template>

<style scoped></style>
