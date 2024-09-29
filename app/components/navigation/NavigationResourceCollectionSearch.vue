<script setup lang="ts">
import type { ApiResourceCollectionParent } from '~~/types'

defineProps<{ basePath: string; parent?: ApiResourceCollectionParent }>()
</script>

<template>
  <v-tooltip location="bottom" text="search">
    <template #activator="{ props }">
      <NuxtLink
        :to="basePath + '/search'"
        data-testid="collection-search-link"
        class="mr-6"
      >
        <v-icon icon="fas fa-magnifying-glass" v-bind="props" />
      </NuxtLink>
    </template>
  </v-tooltip>
</template>
