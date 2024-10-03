<script setup lang="ts">
import UiModeSwitcher from '~/components/UiModeSwitcher.vue'

const { visible, toggle } = useAppNavigationDrawerVisibleState()
const text = computed(() => `${visible.value ? 'close' : 'open'} navigation`)
const { authMode } = useDataUiModeState()
</script>

<template>
  <v-app-bar color="primary" height="48" :flat="true">
    <template #prepend>
      <v-tooltip v-if="!authMode" location="bottom" :text>
        <template #activator="{ props }">
          <v-app-bar-nav-icon
            v-bind="props"
            data-testid="app-bar-nav-icon"
            @click.stop="toggle()"
          />
        </template>
      </v-tooltip>
    </template>
    <ui-mode-switcher v-if="!authMode" />
    <template #append>
      <auth-app-bar-icon />
    </template>
  </v-app-bar>
</template>
