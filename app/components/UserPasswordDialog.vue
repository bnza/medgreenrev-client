<script setup lang="ts">
import type { ApiResourceItem } from '~~/types'

defineProps<{
  item: ApiResourceItem & { email: string }
}>()
const { isPasswordDialogOpen, plainPassword } = inject(
  userPasswordStateInjectionKey,
)
const copyToClipboard = useCopyToClipboard()
</script>

<template>
  <v-dialog :model-value="isPasswordDialogOpen" persistent>
    <v-card width="400px" class="mx-auto">
      <template #title>
        <span class="text-secondary" data-testid="user-pw-identifier">{{
          item.email
        }}</span>
      </template>
      <user-password-dialog-content-show v-if="plainPassword" :plain-password />
      <template #actions>
        <v-btn
          v-if="plainPassword"
          color="anchor"
          rounded="false"
          variant="text"
          :icon="true"
          @click="copyToClipboard(plainPassword)"
        >
          <v-icon icon="far fa-copy" />
          <v-tooltip activator="parent" location="bottom">Close</v-tooltip>
        </v-btn>
        <v-spacer />
        <v-btn
          color="anchor"
          rounded="false"
          variant="text"
          :icon="true"
          @click="isPasswordDialogOpen = false"
        >
          <v-icon icon="fas fa-xmark" />
          <v-tooltip activator="parent" location="bottom">Close</v-tooltip>
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
