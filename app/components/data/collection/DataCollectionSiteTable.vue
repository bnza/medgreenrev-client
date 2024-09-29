<script setup lang="ts">
import type { DataResourceKey } from '~~/types'

const resourceKey: DataResourceKey = 'site'
</script>

<template>
  <lazy-data-collection-table :resource-key>
    <template #[`item.id`]="{ item }"> id </template>
  </lazy-data-collection-table>
</template>

<style scoped></style>
