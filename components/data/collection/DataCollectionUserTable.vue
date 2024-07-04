<script setup>
import useUserPasswordDialog from '~/composables/form/useUserPasswordDialog.js'

const { fetchCollection, headers, resourceConfig, patchItem } =
  useResourceUser()
const { pending, error, paginationOptions, totalItems, items } =
  await fetchCollection()

const {
  openResetPasswordDialog,
  isResetPasswordDialogOpen,
  resetPasswordUserItem,
  resetPassword,
} = useUserPasswordDialog()
</script>

<template>
  <lazy-show-user-password-dialog
    :item="resetPasswordUserItem"
    :is-open="isResetPasswordDialogOpen"
    @close="isResetPasswordDialogOpen = false"
    @reset-password="resetPassword(patchItem, resetPasswordUserItem)"
  />
  <v-data-table-server
    :items-per-page-options="ITEMS_PER_PAGE_OPTIONS"
    :items-per-page="paginationOptions.itemsPerPage"
    :headers="headers"
    :items-length="totalItems"
    :items="items"
    :page="paginationOptions.page"
    :loading="pending"
    :sort-by="paginationOptions.sortBy"
    :fixed-header="true"
    density="compact"
    @update:options="Object.assign(paginationOptions, $event)"
  >
    <template #[`item.id`]="{ item }">
      <navigation-resource-item :resource="resourceConfig" :item="item">
        <template #prepend>
          <lazy-navigation-user-reset-password
            :item="item"
            @reset-password="openResetPasswordDialog(item)"
          />
        </template>
      </navigation-resource-item>
    </template>
    <template #[`item.roles`]="{ item }">
      {{ reduceAppRoles(item.roles) }}
    </template>
  </v-data-table-server>
</template>
