<script setup>
const route = useRoute()
const id = ref(routeParamIdToString(route.params.id))
const { resourceConfig, fetchItem, itemLabel, patchItem } = useResourceUser()
const { item, error, code } = await fetchItem(id)

const invalid = ref(false)

const triggerSubmit = ref(false)
const mode = API_ACTIONS.Update

const { submit, isSubmitPending } = useSubmitResourceRequest(
  mode,
  patchItem,
  resourceConfig.appPath,
)
</script>

<template>
  <app-data-card :title="itemLabel" :code="code" :mode="mode">
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
    <template #default>
      <lazy-data-item-user-form
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submit($event, item)"
      />
    </template>
  </app-data-card>
</template>

<style scoped></style>
