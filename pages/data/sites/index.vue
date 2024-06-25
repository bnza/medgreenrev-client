<script setup>
definePageMeta({
  auth: false,
})
const { hasRoleAdmin } = useAppAuth()
const { resourceConfig, collectionLabel } = useResourceSite()
const error = ref(null)
</script>

<template>
  <div v-if="error">
    <!--    <lazy-fetch-error-alert-->
    <!--      :error="error"-->
    <!--      :text="error.message"-->
    <!--      navigate-to="/"-->
    <!--      close-tooltip-text="Back to index"-->
    <!--    />-->
  </div>
  <app-data-card v-else :title="collectionLabel">
    <!--    <template #toolbar-append>-->
    <!--      <navigation-resource-item-create-->
    <!--        v-if="hasRoleAdmin"-->
    <!--        :path="`${resourceConfig.appPath}/create`"-->
    <!--      ></navigation-resource-item-create>-->
    <!--    </template>-->
    <template #default>
      <lazy-data-collection-site-table @error="error = $event" />
    </template>
  </app-data-card>
</template>
