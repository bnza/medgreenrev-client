<script setup lang="ts">
const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel, patchItem } =
  await useResource('samples')
const { item, pending, code, error } = await fetchItem(id)

const invalid = ref(false)

const mode: ApiAction = 'update'

const { submit, isSubmitPending, triggerSubmit } = useSubmitResourceRequest(
  mode,
  patchItem,
)
const barColor = DATA_API_ACTIONS_BAR_COLOR[mode]
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
    :color="barColor"
    :loading="pending || isSubmitPending"
  >
    <template #title-append>
      <lazy-data-toolbar-title-append :text="mode" />
    </template>
    <template #toolbar-prepend>
      <navigation-resource-collection-list />
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
      <lazy-data-item-sample-form
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submit({ state: $event, oldItem: item })"
      />
    </template>
  </data-card>
</template>
