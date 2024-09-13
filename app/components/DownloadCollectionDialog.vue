<script setup lang="ts">
defineProps<{
  pending: boolean
  totalItems: number
  label: string
}>()

const model = defineModel<boolean>({ required: true })
const emit = defineEmits<{ submit: [] }>()
</script>

<template>
  <v-dialog
    :model-value="model"
    width="400px"
    :persistent="true"
    data-testid="download-resource-dialog"
  >
    <v-card>
      <v-card-title>Resource: {{ label }}</v-card-title>
      <v-card-text>
        <v-container v-if="pending" style="height: 200px">
          <v-row align-content="center" class="fill-height" justify="center">
            <v-col class="text-subtitle-1 text-center" cols="12">
              Download in progress
            </v-col>
            <v-col cols="6">
              <v-progress-linear
                color="warning"
                height="6"
                indeterminate
                rounded
              ></v-progress-linear>
            </v-col>
          </v-row>
        </v-container>
        <v-container v-else style="height: 200px">
          <v-row class="mx-4 pt-4" justify="center">
            <v-spacer />
            <v-col cols="12" sm="2">
              <v-icon icon="fas fa-circle-info" size="large" color="info" />
            </v-col>
            <v-spacer />
          </v-row>
          <v-row dense class="my-0 py-0 mx-4 pt-8 text-center" justify="center">
            Are you sure you want to download
          </v-row>
          <v-row
            data-testid="download-resource-total-items"
            dense
            class="my-0 pt-0 mx-4 text-center text-secondary font-weight-bold"
            justify="center"
          >
            {{ totalItems }}
          </v-row>
          <v-row dense class="my-0 pt-0 mx-4 text-center" justify="center">
            selected items?
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-tooltip location="bottom" text="Close">
          <template #activator="{ props }">
            <v-btn
              :disabled="pending"
              color="anchor"
              @click="model = false"
              icon="fas fa-xmark"
              v-bind="props"
            />
          </template>
        </v-tooltip>
        <v-spacer />
        <v-tooltip location="bottom" text="Download">
          <template #activator="{ props }">
            <v-btn
              :disabled="pending"
              data-testid="submit-download-resource-button"
              color="anchor"
              @click="$emit('submit')"
              icon="far fa-circle-down"
              v-bind="props"
            />
          </template>
        </v-tooltip>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
