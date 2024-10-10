<script setup lang="ts">
import type { ResourcePageKey } from '~~/types'
import useResourceCollectionDownload from '~/composables/useResourceCollectionDownload'

const props = defineProps<{
  resourcePageKey: ResourcePageKey
}>()

const isDialogOpen = ref(false)

const { status, filteredItemsCount, downloadAndFeedback, collectionLabel } =
  useResourceCollectionDownload(props.resourcePageKey)

const submit = () => {
  downloadAndFeedback()
  isDialogOpen.value = false
}
</script>

<template>
  <download-resource-collection-dialog
    :model-value="isDialogOpen"
    :total-items="filteredItemsCount"
    :label="collectionLabel"
    :pending="status === 'pending'"
    @submit="submit()"
  />
  <v-btn
    :disabled="!filteredItemsCount || status === 'pending'"
    :icon="true"
    @click="isDialogOpen = true"
    data-testid="download-resource-button"
    color="primary"
  >
    <v-icon class="mx-3" v-bind="props" icon="fas fa-download" />
    <v-tooltip activator="parent" location="bottom">Download</v-tooltip>
  </v-btn>
</template>

<style scoped></style>
