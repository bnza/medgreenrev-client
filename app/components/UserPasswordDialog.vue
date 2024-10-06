<script setup lang="ts">
import type { ApiId, UserChangePasswordBody } from '~~/types'
import UserPasswordDialogContentChange from '~/components/UserPasswordDialogContentChange.vue'

defineProps<{
  item: { id: ApiId; email: string }
  mode: 'reset' | 'change'
}>()
const {
  isPasswordDialogOpen,
  plainPassword,
  resetPassword,
  changePassword,
  submitStatus,
} = inject(userPasswordStateInjectionKey)
const copyToClipboard = useCopyToClipboard()
const changePasswordRequestBody: Ref<UserChangePasswordBody> = ref({
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
})
</script>

<template>
  <v-dialog :model-value="isPasswordDialogOpen" persistent>
    <v-card width="400px" class="mx-auto">
      <template #title>
        <span class="text-secondary" data-testid="user-pw-identifier">{{
          item.email
        }}</span>
      </template>
      <v-container v-if="submitStatus === 'pending'" style="height: 200px">
        <v-row align-content="center" class="fill-height" justify="center">
          <v-col class="text-subtitle-1 text-center" cols="12">
            {{ mode === 'reset' ? 'Resetting' : 'Changing' }} password
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
      <user-password-dialog-content-show
        v-else-if="plainPassword"
        :plain-password
      />
      <user-password-dialog-content-reset v-else-if="mode === 'reset'" />
      <user-password-dialog-content-change
        v-else-if="mode === 'change'"
        v-model="changePasswordRequestBody"
      />
      <template #actions>
        <v-btn
          color="anchor"
          rounded="false"
          variant="text"
          :icon="true"
          :disabled="submitStatus === 'pending'"
          @click="isPasswordDialogOpen = false"
        >
          <v-icon icon="fas fa-xmark" />
          <v-tooltip activator="parent" location="bottom">Close</v-tooltip>
        </v-btn>
        <v-spacer />
        <v-btn
          v-if="plainPassword"
          color="primary"
          rounded="false"
          variant="text"
          :icon="true"
          :disabled="submitStatus === 'pending'"
          @click="copyToClipboard(plainPassword)"
        >
          <v-icon icon="far fa-copy" />
          <v-tooltip activator="parent" location="bottom">Copy</v-tooltip>
        </v-btn>
        <v-btn
          v-else-if="mode === 'reset'"
          color="primary"
          rounded="false"
          variant="text"
          :icon="true"
          :disabled="submitStatus === 'pending'"
          @click="resetPassword(item.id)"
        >
          <v-icon icon="fas fa-arrow-up-from-bracket" />
          <v-tooltip activator="parent" location="bottom">Reset</v-tooltip>
        </v-btn>
        <v-btn
          v-else-if="mode === 'change'"
          color="primary"
          rounded="false"
          variant="text"
          :icon="true"
          :disabled="
            !Boolean(changePasswordRequestBody.newPassword) ||
            submitStatus === 'pending'
          "
          @click="changePassword(changePasswordRequestBody)"
        >
          <v-icon icon="fas fa-arrow-up-from-bracket" />
          <v-tooltip activator="parent" location="bottom">Reset</v-tooltip>
        </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>
