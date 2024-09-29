<script setup lang="ts">
import { resourceFilterStateInjectionKey } from '~/composables/states/useResourceFilterState'

defineProps<{ filter?: object }>()

const { isAddFilterDialogOpen } = inject(resourceFilterStateInjectionKey)
const isInvalid = ref(false)
const triggerSubmit = ref(false)
</script>

<template>
  <v-dialog
    :model-value="isAddFilterDialogOpen"
    :persistent="true"
    data-testid="filter-edit-dialog"
  >
    <v-card>
      <v-card-title data-testid="filter-edit-title">
        {{ !!filter ? 'Edit' : 'Add' }} filter
      </v-card-title>
      <search-add-filter-card-content
        v-model:trigger-submit="triggerSubmit"
        @update:invalid="isInvalid = $event"
      />
      <v-card-actions>
        <v-btn
          data-testid="close-button"
          color="anchor"
          @click="isAddFilterDialogOpen = false"
          :icon="true"
        >
          <v-icon icon="fas fa-xmark" />
          <v-tooltip activator="parent" location="bottom">Close</v-tooltip>
        </v-btn>
        <v-btn
          data-testid="submit-button"
          class="mx-4"
          color="primary"
          :disabled="isInvalid"
          rounded="false"
          :icon="true"
          @click="triggerSubmit = true"
        >
          <v-icon icon="fas fa-arrow-up-from-bracket" />
          <v-tooltip activator="parent" location="bottom">Add filter</v-tooltip>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
