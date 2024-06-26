<script setup>
import { generatePassword } from '~/lib/index.js'
import { useUserPlainPasswordState } from '~/composables/states/useUserPlainPasswordState.js'

definePageMeta({
  middleware: ['acl'],
  voters: [ACL_VOTERS.HasRoleAdmin],
})

const { resourceConfig, postItem, itemLabel } = useResourceUser()
const { set } = useUserPlainPasswordState()

const invalid = ref(false)
const item = ref({})
const triggerSubmit = ref(false)
const mode = API_ACTIONS.Create

const { submit, isSubmitPending } = useSubmitResourceRequest(mode, postItem)

const plainPassword = ref('')
onMounted(() => {
  plainPassword.value = generatePassword(10)
  item.value = {
    plainPassword,
    roles: ['ROLE_USER'],
  }
})
const submitAndFeedBack = async (state) => {
  await submit(state)
  set(plainPassword.value)
}
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
    <template #default v-if="!isSubmitPending">
      <lazy-data-item-user-form
        v-if="Object.keys(item).length > 0"
        :item="item"
        :mode="mode"
        :trigger-submit="triggerSubmit"
        @update:invalid="invalid = $event"
        @submit-form="submitAndFeedBack($event)"
      />
    </template>
  </app-data-card>
</template>
