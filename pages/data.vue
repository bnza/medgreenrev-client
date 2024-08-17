<script setup lang="ts">
import { useDataUiModeState } from '~/composables/states/useDataUiModeState'

definePageMeta({
  layout: false,
})
defineOptions({ name: 'DataWrapper' })
const { mode } = useDataUiModeState()
const route = useRoute()
const layout = computed(() =>
  /search$/.test(route.path) ? 'empty' : 'default',
)
</script>

<template>
  <NuxtLayout :name="layout">
    <template #app-bar-center v-if="layout === 'default'">
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
