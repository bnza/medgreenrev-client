<script setup lang="ts">
import { resourceFilterStateInjectionKey } from '~/composables/states/useResourceFilterState'

const { isAddFilterDialogOpen } = inject(resourceFilterStateInjectionKey)
</script>

<template>
  <v-btn
    class="mr-4"
    :icon="true"
    @click="isAddFilterDialogOpen = true"
    data-testid="add-filter-button"
  >
    <v-icon icon="fas fa-plus" />
    <v-tooltip activator="parent" location="bottom">Add filter</v-tooltip>
  </v-btn>
</template>
