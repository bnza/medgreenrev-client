<script setup lang="ts">
import type { ApiResourceCollectionParent, ResourceConfig } from '~~/types'
import useSearchParentStateKey from '~/composables/states/useSearchParentStateKey'

const props = defineProps<{
  resourceConfig: ResourceConfig
  parent?: ApiResourceCollectionParent
}>()
const parentKey = useSearchParentStateKey()
</script>

<template>
  <v-btn
    :icon="true"
    nuxt
    :to="`${props.resourceConfig.appPath}/search`"
    variant="text"
    data-testid="collection-search-link"
    @click="parentKey = parent ? parent[0] : ''"
  >
    <v-icon color="anchor" icon="fas fa-magnifying-glass" size="small" />
    <v-tooltip activator="parent" location="bottom">Search</v-tooltip>
  </v-btn>
</template>
