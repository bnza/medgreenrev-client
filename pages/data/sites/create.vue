<script setup lang="ts">
const { resourceConfig, getAction, itemLabel } = useResourceSite()
const item = ref({})
const invalid = ref(false)
const mode = API_ACTIONS.Create

const { submit, isSubmitPending, setSubmitFn } = useSubmitResourceRequest(
  mode,
  getAction,
  resourceConfig.appPath,
)
</script>

<template>
  <app-data-card v :title="itemLabel" code="">
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath" />
    </template>
    <template #toolbar-append>
      <v-btn
        v-if="item"
        class="mx-4"
        :disabled="invalid || isSubmitPending"
        color="success"
        rounded="false"
        variant="text"
        :icon="true"
        @click="submit()"
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
        @validation-ready="setSubmitFn($event)"
      />
    </template>
  </app-data-card>
</template>
