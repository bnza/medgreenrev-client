<script setup lang="ts">
import ResourceNotFound from '~/components/ResourceNotFound.vue'
import useUserPasswordDialog from '~/composables/form/useUserPasswordDialog'

const route = useRoute()

const id = ref(routeParamIdToString(route.params.id))
const { resourceConfig, fetchItem, itemLabel } = useResourceUser()
const { item, code, error } = await fetchItem(id)

const {
  isResetPasswordDialogVisible,
  resetPasswordUserItem,
  plainPassword,
  resetState,
} = useUserPasswordDialog()
resetPasswordUserItem.value = Object.assign({}, item.value || {})
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
  <lazy-user-password-dialog
    :item="resetPasswordUserItem"
    :visible="isResetPasswordDialogVisible || !!plainPassword"
  >
    <user-password-reset-card-content v-if="isResetPasswordDialogVisible" />
    <lazy-user-password-show-card-content
      v-else-if="plainPassword"
      @close="resetState()"
    />
  </lazy-user-password-dialog>
  <app-data-card v-if="item" :title="itemLabel" :code="code">
    <template #toolbar-append>
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
