<script setup lang="ts">
const { resourceConfig, fetchItem, itemLabel } = useResourceSite()
const item = ref({})
</script>

<template>
  <app-data-card v :title="itemLabel" code="">
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #default>
      <lazy-data-item-site-form
        v-if="item"
        :item="item"
        :mode="DATA_FORM_MODE.Create"
      />
    </template>
  </app-data-card>
</template>
