<script setup lang="ts">

const route = useRoute()

const id = ref(routeParamIdToString(route.params.id))
const {resourceConfig, fetchItem, itemLabel} = useResourceUser()
const {item, error, code} = await fetchItem(id)
const {plainPassword, reset} = useUserPlainPasswordState()
if (plainPassword.value) {
  onUnmounted(() => {
    reset()
  })
}

</script>

<template>
  <lazy-show-user-password-dialog/>
  <app-data-card :title="itemLabel" :code="code">
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
      <navigation-resource-collection-list :path="resourceConfig.appPath"/>
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
