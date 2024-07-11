<script setup>
const { data, status } = useAuth()
const isChangeDialogOpen = ref(false)
const isChangePasswordRequestPending = ref(false)

const { repository } = useResourceUser()
const { show } = useAppSnackbarState()
const submitAndFeedback = async (state) => {
  isChangePasswordRequestPending.value = true
  try {
    await repository.changeUserPassword(state)
    show({
      color: 'success',
      text: 'Successfully changed password',
      timeout: 4000,
    })
    isChangeDialogOpen.value = false
  } catch (error) {
    show({
      color: 'error',
      text: error.response?._data?.message || error.message,
      timeout: -1,
    })
  } finally {
    isChangePasswordRequestPending.value = false
  }
}
</script>

<template>
  <app-data-card
    v-if="status === 'authenticated'"
    title="Current user:"
    :code="data.email"
  >
    <user-password-dialog :item="data" :visible="isChangeDialogOpen">
      <lazy-user-password-change-card-content
        :pending="isChangePasswordRequestPending"
        @close="isChangeDialogOpen = false"
        @change-password="submitAndFeedback($event)"
      />
    </user-password-dialog>
    <template #toolbar-append>
      <lazy-navigation-user-change-password
        :item="data"
        size="large"
        @click="isChangeDialogOpen = true"
      />
    </template>
    <lazy-data-item-user-form :mode="API_ACTIONS.Read" :item="data" />
  </app-data-card>
  <resource-not-found
    v-else-if="status === 'unauthenticated'"
    :error="new Error('unauthenticated user')"
    path="#/"
    tooltip-text="Back to homepage"
  />
  <v-progress-circular v-else indeterminate :size="128" :width="12" />
</template>
