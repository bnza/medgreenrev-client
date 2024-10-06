<script setup lang="ts">
import UserPasswordDialogOpenButton from '~/components/UserPasswordDialogOpenButton.vue'

const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)

const userPassword = useUserPasswordState()
provide(userPasswordStateInjectionKey, userPassword)
</script>

<template>
  <lazy-data-item-page resource-key="user" mode="read" code-key="email">
    <template #toolbar-append>
      <user-password-dialog-open-button />
    </template>
    <template #default="{ item, resourcePageKey }">
      <lazy-data-item-user-page :resource-page-key :item />
    </template>
  </lazy-data-item-page>
</template>
