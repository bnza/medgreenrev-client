<script setup lang="ts">
import type { ApiAction, ApiResourceUser } from '~~/types'
import useDataItemResourcePageWatchTriggerSubmit from '~/composables/useDataItemResourcePageWatchTriggerSubmit'
import useUserValidation from '~/composables/validation/useUserValidation'
import generatePassword from '~/utils/generatePassword'
import { ApiRole } from '~/utils'

type RT = ApiResourceUser

const props = defineProps<{
  mode: ApiAction
  item: Partial<RT>
}>()

const state = reactive(clone(props.item))

const validation = useUserValidation(props.item)

const { triggerSubmit, submittingItem, submitStatus } = inject(
  dataItemPageInjectionKey,
)

const { plainPassword } = useUserPlainPasswordState()

// Generate password for new users
watch(triggerSubmit, (flag) => {
  if (flag && props.mode === 'create') {
    state.plainPassword = generatePassword()
    console.log('password generated:', state.plainPassword)
  }
})
watch(submitStatus, (status) => {
  if (props.mode === 'create' && status === 'success') {
    plainPassword.value = state.plainPassword
  }
})
useDataItemResourcePageWatchTriggerSubmit(triggerSubmit, state, submittingItem)
const role = computed({
  get() {
    return state.roles ? reduceAppRoles(state.roles) : ApiRole.User
  },
  set(value: ApiRole) {
    state.roles = mergeRole(value, state.roles)
  },
})
</script>

<template>
  <lazy-data-item-form :mode>
    <template #default="{ readonly }">
      <v-row no-gutters>
        <v-col class="px-2">
          <v-text-field
            :class="{ 'text-input-disabled': mode === 'update' }"
            :rules="validation.rules['email']"
            :readonly="readonly || mode === 'update'"
            v-model="state.email"
            label="email"
          />
        </v-col>
        <v-col data-cy="roles-input-col">
          <v-radio-group v-model="role">
            <v-radio label="ROLE_ADMIN" color="error" value="ROLE_ADMIN" />
            <v-radio label="ROLE_EDITOR" color="warning" value="ROLE_EDITOR" />
            <v-radio label="ROLE_USER" color="success" value="ROLE_USER" />
          </v-radio-group>
        </v-col>
      </v-row>
    </template>
  </lazy-data-item-form>
</template>
<style scoped>
.text-input-disabled:deep(input) {
  color: #666;
}
</style>
