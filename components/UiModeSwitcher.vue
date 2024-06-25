<script setup lang="ts">
const { mode, icon, toggle } = useDataUiModeState()
const text = computed(() =>
  mode.value === DATA_UI_MODE.Map ? 'Map mode' : 'Data mode',
)
</script>

<template>
  <v-tooltip :text="text">
    <template #activator="{ props }">
      <v-btn class="mr-6" :icon="icon" v-bind="props" @click="toggle" />
    </template>
  </v-tooltip>
</template>

<style scoped></style>
