<script setup>
const { plainPassword, clear } = useUserPlainPasswordState()
const { show } = useAppSnackbarState()

function copyToClipboard() {
  navigator.clipboard
    .writeText(unref(plainPassword))
    .then(() => {
      show({
        color: 'success',
        text: `Copied!`,
        timeout: 3000,
      })
    })
    .catch((error) => {
      show({
        color: 'error',
        text: `Your browser doesn't support copy to clipboard command. Please do it manually. ${error.message}`,
        timeout: -1,
      })
    })
}

const emit = defineEmits(['close'])
</script>

<template>
  <v-card-text>
    <v-container>
      <v-row class="mx-4 pt-4" justify="center">
        <v-col cols="12" sm="8">
          <div class="text-center">
            <div
              id="plainPassword"
              class="text-secondary border pa-4 font-weight-bold"
            >
              {{ plainPassword }}
            </div>
          </div>
        </v-col>
      </v-row>
      <v-row class="mx-4 pt-8 text-center">
        Copy and save the new password and provide it to the user. You won’t be
        able to see it again!
      </v-row>
    </v-container>
  </v-card-text>
  <v-card-actions>
    <v-tooltip location="bottom" text="Close">
      <template #activator="{ props }">
        <v-btn
          color="anchor"
          @click="clear()"
          icon="fas fa-xmark"
          v-bind="props"
        />
      </template>
    </v-tooltip>
    <v-spacer />
    <v-tooltip location="bottom" text="Copy password">
      <template #activator="{ props }">
        <v-btn
          color="secondary"
          @click="copyToClipboard()"
          icon="far fa-copy"
          v-bind="props"
        />
      </template>
    </v-tooltip>
  </v-card-actions>
</template>
