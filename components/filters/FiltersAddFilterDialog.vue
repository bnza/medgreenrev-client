<script setup>
const props = defineProps({
  filter: Object,
})
const modelValue = defineModel({ required: true })
</script>

<template>
  <v-dialog
    v-model="modelValue"
    :persistent="true"
    data-testid="filter-add-dialog"
  >
    <v-card>
      <v-card-title>{{ !!props.filter ? 'Edit' : 'Add' }} filter</v-card-title>
      <v-card-actions>
        <v-tooltip location="bottom" text="Close">
          <template #activator="{ props }">
            <v-btn
              data-testid="close-button"
              color="anchor"
              @click="modelValue = false"
              icon="fas fa-xmark"
              v-bind="props"
            />
          </template>
        </v-tooltip>
        <v-spacer />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
