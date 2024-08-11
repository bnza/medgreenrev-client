<script setup lang="ts">
import ResourceNotFound from '~/components/ResourceNotFound.vue'
import useUserPasswordDialog from '~/composables/form/useUserPasswordDialog'

const route = useRoute()

const id = ref(routeParamIdToString(route.params.id))
const { resourceConfig, fetchItem, itemLabel, patchItem } =
  await useResource('users')
const { item, code, error } = await fetchItem(id)

const {
  isResetPasswordPending,
  isResetPasswordDialogVisible,
  resetPasswordUserItem,
  plainPassword,
  resetPassword,
} = useUserPasswordDialog()
resetPasswordUserItem.value = Object.assign({}, item.value || {})
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
  <ClientOnly>
    <!-- @see https://github.com/nuxt/nuxt/issues/25164#issuecomment-2123347413-->
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
  </ClientOnly>
  <app-data-card v-if="item" :title="itemLabel" :code="code">
    <template #toolbar-append>
      <navigation-user-reset-password
        class="mr-4"
        :item="item"
        size="large"
        @click="isResetPasswordDialogVisible = true"
      />
      <navigation-resource-item-update
        class="mr-4"
        :item="item"
        :resource="resourceConfig"
        size="large"
      />
      <navigation-resource-item-delete
        class="mr-4"
        :item="item"
        :resource="resourceConfig"
        size="large"
      />
    </template>
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #default>
      <lazy-data-item-user-form
        v-if="item"
        :item="item"
        :mode="API_ACTIONS.Read"
      />
    </template>
  </app-data-card>
</template>
