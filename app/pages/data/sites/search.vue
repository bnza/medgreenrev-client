<script setup lang="ts">
import type { DataResourceKey } from '~~/types'

const resourceKey: DataResourceKey = 'site'
</script>

<template>
  <lazy-data-search :resource-key />
</template>

<style scoped></style>
