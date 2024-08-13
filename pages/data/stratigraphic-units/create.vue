<script setup>
const { resourceConfig, postItem, itemLabel } =
  await useResource('stratigraphicUnits')
const invalid = ref(false)
const item = ref({})
const mode = API_ACTIONS.Create

const { submit, isSubmitPending, triggerSubmit } = useSubmitResourceRequest(
  mode,
  postItem,
)
</script>

<template>
  <data-card
    v
    :title="itemLabel"
    code=""
    :color="DATA_API_ACTIONS_BAR_COLOR[mode]"
  >
    <template #title-append>
      <lazy-data-toolbar-title-append :text="mode" />
    </template>
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
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
      <lazy-data-item-stratigraphic-unit-form
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submit($event)"
      />
    </template>
  </data-card>
</template>
