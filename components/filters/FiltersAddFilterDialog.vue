<script setup>
const props = defineProps({
  filter: Object,
})
const modelValue = defineModel({ required: true })
const triggerSubmit = ref(false)
defineEmits(['addFilter'])
</script>

<template>
  <v-dialog
    v-model="modelValue"
    :persistent="true"
    data-testid="filter-add-dialog"
  >
    <v-card>
      <v-card-title>{{ !!props.filter ? 'Edit' : 'Add' }} filter</v-card-title>
      <lazy-filters-add-filter-card-content
        :trigger-submit
        @add-filter="$emit('addFilter', $event)"
      />
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
        <v-btn
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
