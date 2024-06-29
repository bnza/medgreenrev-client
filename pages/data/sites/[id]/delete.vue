<script setup>
import DeleteItemAlertRow from '~/components/DeleteItemAlertRow.vue'

definePageMeta({
  middleware: ['acl'],
  voters: [ACL_VOTERS.HasRoleAdmin],
})

const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel, deleteItem } = useResourceSite()
const { item, error, code } = await fetchItem(id)

const invalid = ref(false)

const triggerSubmit = ref(false)

const mode = API_ACTIONS.Delete

const { submit, isSubmitPending } = useSubmitResourceRequest(
  mode,
  deleteItem,
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
    <template #default>
      <lazy-data-item-site-form
        v-if="item"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submit($event, item)"
      >
        <template #alert>
          <delete-item-alert-row />
        </template>
      </lazy-data-item-site-form>
    </template>
  </app-data-card>
</template>
