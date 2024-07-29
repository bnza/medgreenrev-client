<script setup>
import DeleteItemAlertRow from '~/components/DeleteItemAlertRow.vue'
import ResourceNotFound from '~/components/ResourceNotFound.vue'

const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel, deleteItem } =
  useResourceStratigraphicUnit()
const { item, error, code } = await fetchItem(id)

const invalid = ref(false)

const triggerSubmit = ref(false)

const mode = API_ACTIONS.Delete

const { submit, isSubmitPending } = useSubmitResourceRequest(mode, deleteItem)
</script>

<template>
  <resource-not-found
    v-if="error"
    :path="resourceConfig.appPath"
    :error="error"
  />
  <app-data-card v-if="item" :title="itemLabel" :code="code" :mode="mode">
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
    <template #default v-if="!isSubmitPending">
      <lazy-data-item-stratigraphic-unit-form
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
      </lazy-data-item-stratigraphic-unit-form>
    </template>
  </app-data-card>
</template>
