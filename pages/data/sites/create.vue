<script setup>
definePageMeta({
  middleware: ['acl'],
  voters: [ACL_VOTERS.HasRoleAdmin],
})

const { resourceConfig, postItem, itemLabel } = useResourceSite()
const invalid = ref(false)
const item = ref({})
const triggerSubmit = ref(false)
const mode = API_ACTIONS.Create

const { submit, isSubmitPending } = useSubmitResourceRequest(
  mode,
  postItem,
  resourceConfig.appPath,
)
</script>

<template>
  <app-data-card v :title="itemLabel" code="" :mode="mode">
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
    <template #default>
      <lazy-data-item-site-form
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submit($event)"
      />
    </template>
  </app-data-card>
</template>
