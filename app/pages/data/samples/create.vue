<script setup lang="ts">
const { postItem, itemLabel } = await useResource('samples')
const invalid = ref(false)
const item = ref({})
const mode: ApiAction = 'create'

const { submit, isSubmitPending, triggerSubmit } = useSubmitResourceRequest(
  mode,
  postItem,
)
const barColor = DATA_API_ACTIONS_BAR_COLOR[mode]
</script>

<template>
  <data-card v :title="itemLabel" code="" :color="barColor">
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
        data-testid="submit-request-button"
        @click="triggerSubmit = true"
      >
        <v-icon icon="fas fa-arrow-up-from-bracket" />
        <v-tooltip activator="parent" location="bottom">Submit</v-tooltip>
      </v-btn>
    </template>
    <template #default v-show="!isSubmitPending">
      <lazy-data-item-sample-form
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submit({ state: $event, redirectTo: '@item' })"
      />
    </template>
  </data-card>
</template>
