<script setup lang="ts">
definePageMeta({
  auth: false,
})

const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel } = useResourceSite()
const { item, error, code } = await fetchItem(id)
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
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
      <lazy-data-item-site-form
        v-if="item"
        :item="item"
        :mode="API_ACTIONS.Read"
      />
    </template>
  </app-data-card>
</template>
