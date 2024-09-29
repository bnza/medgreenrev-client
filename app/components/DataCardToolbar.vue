<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string
    code?: string
    color?: string
    loading?: boolean
    main?: boolean
  }>(),
  { code: '', loading: false, main: true },
)
</script>

<template>
  <v-toolbar
    data-testid="data-card-toolbar"
    density="compact"
    :color="color"
    :loading="loading"
  >
    <template #prepend>
      <slot name="toolbar-prepend" />
    </template>
    <template #title
      >{{ title }}
      <slot name="title-append" />
      <span v-if="code" class="font-weight-bold text-secondary pl-6"
        >{{ code }}
      </span>
    </template>
    <template #append>
      <slot name="toolbar-append" />
    </template>
  </v-toolbar>
</template>

<style scoped></style>
