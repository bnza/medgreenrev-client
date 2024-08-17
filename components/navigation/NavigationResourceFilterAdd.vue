<script setup lang="ts">
import { resourceFiltersStateInjectionKey } from '~/composables/states/useResourceFiltersStates'

const props = defineProps({
  size: {
    type: String,
    default: 'xsmall',
  },
})

const { isAddFilterDialogOpen } = inject(resourceFiltersStateInjectionKey)
</script>

<template>
  <v-btn
    class="mr-4"
    density="compact"
    :icon="true"
    variant="text"
    @click="isAddFilterDialogOpen = true"
    data-testid="add-filter-button"
  >
    <v-icon icon="fas fa-plus" :size="size" />
    <v-tooltip activator="parent" location="bottom">Add filter</v-tooltip>
  </v-btn>
</template>
