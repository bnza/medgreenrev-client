<script setup lang="ts">
const route = useRoute()

const id = ref(routeParamIdToString(route.params.id))
const { resourceConfig, fetchItem, itemLabel } = await useResource('sitesUsers')
const { item, error, code } = await fetchItem(id)
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
  <data-card v-if="item" :title="itemLabel" :code="code">
    <template #toolbar-append>
      <navigation-resource-item-update
        :app-path="resourceConfig.appPath"
        class="mr-4"
        :item="item"
        size="large"
      />
      <navigation-resource-item-delete
        class="mr-4"
        :item="item"
        :app-path="resourceConfig.appPath"
        size="large"
      />
    </template>
    <template #toolbar-prepend>
      <navigation-resource-collection-list />
    </template>
    <template #default>
      <lazy-data-item-sites-users-form v-if="item" :item="item" mode="read" />
    </template>
  </data-card>
</template>
