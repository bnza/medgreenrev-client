<script setup>
definePageMeta({
  middleware: ['acl'],
  voters: [ACL_VOTERS.HasRoleAdmin],
})
const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel, patchItem } =
  await useResource('sites')
const { item, pending, code, error } = await fetchItem(id)

const invalid = ref(false)

const mode = API_ACTIONS.Update

const { submit, isSubmitPending, triggerSubmit } = useSubmitResourceRequest(
  mode,
  patchItem,
)
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
  <data-card
    v-if="item"
    :title="itemLabel"
    :code="code"
    :color="DATA_API_ACTIONS_BAR_COLOR[mode]"
    :loading="pending || isSubmitPending"
  >
    <template #title-append>
      <lazy-data-toolbar-title-append :text="mode" />
    </template>
    <template #toolbar-prepend>
      <navigation-resource-item-read
        class="ml-3"
        :resource="resourceConfig"
        :item="item"
        :back="true"
        size="default"
      />
    </template>
    <template #toolbar-append>
      <v-btn
        v-if="item"
        class="mx-4"
        :disabled="invalid || isSubmitPending"
        color="anchor"
        rounded="false"
        variant="text"
        :icon="true"
        @click="triggerSubmit = true"
      >
        <v-icon icon="fas fa-arrow-up-from-bracket" />
        <v-tooltip activator="parent" location="bottom">Submit</v-tooltip>
      </v-btn>
    </template>
    <template #default v-if="!isSubmitPending">
      <lazy-data-item-site-form
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submit($event, item)"
      />
    </template>
  </data-card>
</template>
