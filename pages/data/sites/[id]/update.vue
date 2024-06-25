<script setup lang="ts">
definePageMeta({
  auth: false,
})

const route = useRoute()

const id = ref(routeParamIdToInt(route.params.id))
const { resourceConfig, fetchItem, itemLabel, patchItem } = useResourceSite()
const { item, error, code } = await fetchItem(id)

const invalid = ref(false)
let submit = (item = null) => {
  console.error('Submit function is not set yet!')
}

const setSubmitFn = ({ state, v$ }) => {
  const { submitPatch } = useSubmitResourceRequest(
    patchItem,
    state,
    v$,
    resourceConfig.appPath,
  )
  submit = submitPatch
}
</script>

<template>
  <div v-if="error">
    <!--    <lazy-fetch-error-alert-->
    <!--      :error="error"-->
    <!--      :navigate-to="resourceConfig.appPath"-->
    <!--      :close-tooltip-text="`Back to ${itemLabel} list`"-->
    <!--    />-->
  </div>
  <app-data-card v-else :title="itemLabel" :code="code">
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #toolbar-append>
      <v-btn
        v-if="item"
        class="mx-4"
        :disabled="invalid"
        color="success"
        rounded="false"
        variant="text"
        :icon="true"
        @click="submit(item)"
      >
        <v-icon icon="fas fa-arrow-up-from-bracket" />
        <v-tooltip activator="parent" location="bottom">Submit</v-tooltip>
      </v-btn>
    </template>
    <template #default>
      <lazy-data-item-site-form
        v-if="item"
        :item="item"
        :mode="DATA_FORM_MODE.Update"
        @update:invalid="invalid = $event"
        @ready="setSubmitFn($event)"
      />
    </template>
  </app-data-card>
</template>
