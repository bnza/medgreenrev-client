<script setup lang="ts">
import UserPasswordDialogOpenButton from '~/components/UserPasswordDialogOpenButton.vue'

const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)

const userPassword = useUserPasswordState()
provide(userPasswordStateInjectionKey, userPassword)
</script>

<template>
  <lazy-data-item-user-page />
</template>
