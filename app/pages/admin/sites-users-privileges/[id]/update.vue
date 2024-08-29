<script setup lang="ts">
definePageMeta({
  middleware: ['acl'],
  voters: [ACL_VOTERS.HasRoleAdmin],
})

const route = useRoute()
const id = ref(routeParamIdToString(route.params.id))
const { resourceConfig, fetchItem, itemLabel, patchItem } =
  await useResource('sitesUsers')
const { item } = await fetchItem(id)

const invalid = ref(false)

const mode: ApiAction = 'update'
const { submit, isSubmitPending, triggerSubmit } = useSubmitResourceRequest(
  mode,
  patchItem,
)
const barColor = DATA_API_ACTIONS_BAR_COLOR[mode]
</script>

<template>
  <data-card :title="itemLabel" code="" :color="barColor">
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
    <template #default v-show="!isSubmitPending">
      <lazy-data-item-sites-users-form
        v-show="!isSubmitPending"
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="
          submit({ state: $event, oldItem: item, redirectToCollection: true })
        "
      />
    </template>
  </data-card>
</template>
