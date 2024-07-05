<script setup>
defineProps({
  pending: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['close', 'resetPassword'])
</script>

<template>
  <v-card-text>
    <v-container v-if="pending" style="height: 200px">
      <v-row align-content="center" class="fill-height" justify="center">
        <v-col class="text-subtitle-1 text-center" cols="12">
          Resetting password
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
          <v-icon
            icon="fas fa-triangle-exclamation"
            size="large"
            color="warning"
          />
        </v-col>
        <v-spacer />
      </v-row>
      <v-row class="mx-4 pt-8 text-center">
        Are you sure you want to reset the user's password?<br />
        This action could not be undone.
      </v-row>
    </v-container>
  </v-card-text>
  <v-card-actions>
    <v-tooltip location="bottom" text="Close">
      <template #activator="{ props }">
        <v-btn
          :disabled="pending"
          color="anchor"
          @click="emit('close')"
          icon="fas fa-xmark"
          v-bind="props"
        />
      </template>
    </v-tooltip>
    <v-spacer />
    <v-tooltip location="bottom" text="Reset password">
      <template #activator="{ props }">
        <v-btn
          :disabled="pending"
          color="secondary"
          @click="emit('resetPassword')"
          icon="fas fa-rotate"
          v-bind="props"
        />
      </template>
    </v-tooltip>
  </v-card-actions>
</template>
