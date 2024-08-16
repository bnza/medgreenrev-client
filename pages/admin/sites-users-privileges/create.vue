<script setup>
definePageMeta({
  middleware: ['acl'],
  voters: [ACL_VOTERS.HasRoleAdmin],
})

const { resourceConfig, postItem, itemLabel } = await useResource('sitesUsers')
const invalid = ref(false)
const item = ref({
  privileges: 0,
})
const mode = API_ACTIONS.Create

const { submit, isSubmitPending, triggerSubmit } = useSubmitResourceRequest(
  mode,
  postItem,
)

const route = useRoute()
const parent = ref(route.query?.parent)
</script>

<template>
  <data-card
    :title="itemLabel"
    code=""
    :color="DATA_API_ACTIONS_BAR_COLOR[mode]"
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
    <template #default v-show="!isSubmitPending">
      <lazy-data-item-sites-users-form
        v-show="!isSubmitPending"
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submit($event, true)"
      />
    </template>
  </data-card>
</template>
