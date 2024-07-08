<script setup>
import { dataFormModeProp, dataFormItemProp } from '~/lib/props.js'
import { reduceAppRoles } from '~/lib/index.js'
import useSubmitForm from '~/composables/form/useSubmitForm.js'

const props = defineProps({
  triggerSubmit: Boolean,
  mode: dataFormModeProp,
  item: dataFormItemProp,
})

const { readonly } = useDataForm({
  type: props.mode,
})

const emit = defineEmits([
  'update:invalid',
  'update:triggerSubmit',
  'submitForm',
  'submitResetPassword',
])
const { state, v$ } = await useSubmitForm('users', props, emit)

const role = computed({
  get() {
    return reduceAppRoles(state.roles)
  },
  set(value) {
    state.roles = mergeRole(value, state.roles)
  },
})
</script>

<template>
  <v-form :readonly="readonly" @submit.prevent data-testid="app-data-form">
    <v-container>
      <slot name="alert" />
      <v-row no-gutters>
        <v-col cols="12" xs="6" sm="6" class="px-2">
          <v-text-field
            :readonly="readonly || mode === API_ACTIONS.Update"
            variant="underlined"
            v-model="state.email"
            label="email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
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
    </v-container>
  </v-form>
</template>
