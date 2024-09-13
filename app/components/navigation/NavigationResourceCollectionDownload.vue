<script setup lang="ts">
import { downloadCsv } from '~/lib'
import { useResourceTotalItemsState } from '~/composables/states/useResourceTotalItemsState'

const props = defineProps<{
  resourcePageKey: ResourcePageKey
  exportCollection: () => Promise<string>
  collectionLabel: string
}>()
const isDialogOpen = ref(false)
const isRequestPending = ref(false)
const { show } = useAppSnackbarState()

const totalItems = useResourceTotalItemsState(props.resourcePageKey)
const exportAndFeedback = async () => {
  isRequestPending.value = true
  try {
    const data = await props.exportCollection()
    downloadCsv(props.collectionLabel, data)
    isDialogOpen.value = false
    show({
      color: 'success',
      text: 'Data successfully downloaded',
      timeout: 4000,
    })
  } finally {
    isRequestPending.value = false
  }
}
</script>

<template>
  <v-tooltip location="bottom" text="download">
    <template #activator="{ props }">
      <v-btn
        :disabled="!totalItems"
        :icon="true"
        @click="isDialogOpen = true"
        data-testid="download-resource-button"
      >
        <v-icon class="mx-3" v-bind="props" icon="far fa-circle-down" />
      </v-btn>
    </template>
  </v-tooltip>
  <download-collection-dialog
    :model-value="isDialogOpen"
    :total-items
    :label="collectionLabel"
    :pending="isRequestPending"
    @submit="exportAndFeedback()"
  />
</template>
