<script setup lang="ts">
definePageMeta({
  auth: false,
})
const dataItemPage = useDataItemPageProvide()
provide(dataItemPageInjectionKey, dataItemPage)
</script>

<template>
  <lazy-data-item-stratigraphic-unit-page />
</template>
