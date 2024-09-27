<script setup lang="ts">
const { mode, icon, toggle } = useDataUiModeState()
const text = computed(() => (mode.value === 'map' ? 'Map mode' : 'Data mode'))
</script>

<template>
  <v-tooltip v-if="mode !== 'login'" :text="text">
    <template #activator="{ props }">
      <v-btn class="mr-6" :icon="icon" v-bind="props" @click="toggle" />
    </template>
  </v-tooltip>
</template>
