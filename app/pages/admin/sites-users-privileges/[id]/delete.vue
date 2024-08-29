<script setup lang="ts">
const route = useRoute()

const id = ref(routeParamIdToString(route.params.id))
const { resourceConfig, fetchItem, itemLabel, deleteItem } =
  await useResource('sitesUsers')
const { item, error, code } = await fetchItem(id)

const invalid = ref(false)
const mode: ApiAction = 'delete'

const { submit, isSubmitPending, triggerSubmit } = useSubmitResourceRequest(
  mode,
  deleteItem,
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
    :mode="mode"
    :color="barColor"
  >
    <template #toolbar-prepend>
      <navigation-resource-collection-list />
    </template>
    <template #toolbar-append>
      <v-btn
        v-if="item"
        class="mx-4"
        :disabled="isSubmitPending"
        color="anchor"
        rounded="false"
        variant="text"
        :icon="true"
        @click="triggerSubmit = true"
      >
        <v-icon icon="fas fa-arrow-up-from-bracket" />
        <v-tooltip activator="parent" location="bottom">Delete</v-tooltip>
      </v-btn>
    </template>
    <template #default v-if="!isSubmitPending">
      <lazy-data-item-sites-users-form
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submit({ state: $event })"
      >
        <template #alert>
          <delete-item-alert-row />
        </template>
      </lazy-data-item-sites-users-form>
    </template>
  </data-card>
</template>
