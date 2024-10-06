<script setup lang="ts">
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)

const userPassword = useUserPasswordState()
provide(userPasswordStateInjectionKey, userPassword)
</script>

<template>
  <lazy-data-item-user-page />
</template>
