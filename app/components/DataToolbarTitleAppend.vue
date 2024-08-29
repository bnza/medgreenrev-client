<script setup lang="ts">
defineProps<{
  text: string
  color?: string
}>()
</script>

<template>
  <span>
    [
    <span :style="{ fontSize: 'small', textTransform: 'uppercase', color }">
      {{ text }}</span
    >
    ]
  </span>
</template>
