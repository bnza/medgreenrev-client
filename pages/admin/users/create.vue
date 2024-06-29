<script setup>

import {generatePassword} from "~/lib/index.js";
import {
  useUserPlainPasswordState
} from "~/composables/states/useUserPlainPasswordState.js";

definePageMeta({
  middleware: ['acl'],
  voters: [ACL_VOTERS.HasRoleAdmin],
})

const {resourceConfig, getAction, itemLabel} = useResourceUser()
const {set} = useUserPlainPasswordState()

const item = ref({})
const invalid = ref(false)
const mode = API_ACTIONS.Create

const {submit, isSubmitPending, setSubmitFn} = useSubmitResourceRequest(
  mode,
  getAction,
  resourceConfig.appPath,
)

const plainPassword = ref('')
onMounted(() => {
  plainPassword.value = generatePassword(10)
  item.value = {
    plainPassword,
    roles: ['ROLE_USER']
  }
})
const submitAndFeedBack = async () => {
  await submit.value()
  set(plainPassword.value)
}
</script>

<template>
  <app-data-card v :title="itemLabel" code="" :mode="mode">
    <template #toolbar-prepend>
      <navigation-resource-collection-list :path="resourceConfig.appPath"/>
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
        @click="submitAndFeedBack()"
      >
        <v-icon icon="fas fa-arrow-up-from-bracket"/>
        <v-tooltip activator="parent" location="bottom">Submit</v-tooltip>
      </v-btn>
    </template>
    <template #default>
      <lazy-data-item-user-form
        v-if="Object.keys(item).length > 0"
        :item="item"
        :mode="mode"
        @update:invalid="invalid = $event"
        @validation-ready="setSubmitFn($event)"
      />
    </template>
  </app-data-card>
</template>
