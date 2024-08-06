<script setup>
const props = defineProps({
  filter: Object,
})

const { isAddFilterDialogOpen } = inject('resourceFiltersState')
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
        {{ !!props.filter ? 'Edit' : 'Add' }} filter
      </v-card-title>
      <lazy-filters-add-filter-card-content
        v-model:trigger-submit="triggerSubmit"
      />
      <v-card-actions>
        <v-tooltip location="bottom" text="Close">
          <template #activator="{ props }">
            <v-btn
              data-testid="close-button"
              color="anchor"
              @click="isAddFilterDialogOpen = false"
              icon="fas fa-xmark"
              v-bind="props"
            />
          </template>
        </v-tooltip>
        <v-spacer />
        <v-btn
          data-testid="submit-button"
          class="mx-4"
          color="anchor"
          rounded="false"
          variant="text"
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
