<script setup lang="ts">
import useUserPasswordDialog from '~/composables/form/useUserPasswordDialog'

const { fetchCollection, resourceConfig, collectionLabel, patchItem } =
  await useResource('users', { resourceOperationType: 'collection' })
const { pending, error, paginationOptions, totalItems, items } =
  await fetchCollection()

const {
  plainPassword,
  isResetPasswordPending,
  openResetPasswordDialog,
  isResetPasswordDialogVisible,
  resetPasswordUserItem,
  resetPassword,
} = useUserPasswordDialog()
</script>

<template>
  <lazy-user-password-dialog
    :item="resetPasswordUserItem"
    :visible="isResetPasswordDialogVisible || !!plainPassword"
  >
    <lazy-user-password-reset-card-content
      v-if="isResetPasswordDialogVisible"
      :pending="isResetPasswordPending"
      @reset-password="resetPassword(patchItem)"
      @close="isResetPasswordDialogVisible = false"
    />
    <lazy-user-password-show-card-content v-else-if="plainPassword" />
  </lazy-user-password-dialog>
  <data-card :title="collectionLabel">
    <template #toolbar-append>
      <navigation-resource-item-create
        :path="`${resourceConfig.appPath}/create`"
      />
    </template>
    <template #default>
      <resource-not-found
        v-if="error"
        path="/"
        :error="error"
        tooltip-text="Back to home"
      />
      <lazy-data-collection-user-table
        v-else-if="items"
        :pending
        :paginationOptions
        :totalItems
        :items
        @open-reset-password-dialog="openResetPasswordDialog($event)"
      />
    </template>
  </data-card>
</template>
