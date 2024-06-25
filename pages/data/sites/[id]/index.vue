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
  <div v-if="error">
    <!--    <lazy-fetch-error-alert-->
    <!--      :error="error"-->
    <!--      :navigate-to="resourceConfig.appPath"-->
    <!--      :close-tooltip-text="`Back to ${itemLabel} list`"-->
    <!--    />-->
  </div>
  <app-data-card v-else :title="itemLabel" :code="code">
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #default>
      <lazy-data-item-site-form
        v-if="item"
        :item="item"
        :mode="DATA_FORM_MODE.Read"
      />
    </template>
  </app-data-card>
</template>
