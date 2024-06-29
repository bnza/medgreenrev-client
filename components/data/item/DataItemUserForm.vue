<script setup>
import {dataFormModeProp, dataFormItemProp} from '~/lib/props.js'
import {
  useResourceUserValidation
} from '~/composables/validation/useResourceUserValidation.js'
import {generatePassword, reduceAppRoles} from "~/lib/index.js";

const props = defineProps({
  mode: dataFormModeProp,
  item: dataFormItemProp,
})

const {readonly} = useDataForm({
  type: props.mode,
})

const {item} = toRefs(props)
const _emitUpdateInvalid = defineEmits(['update:invalid', 'validationReady'])
const {state, v$} = useResourceUserValidation(item, _emitUpdateInvalid)

const role = computed({
  get() {
    return reduceAppRoles(state.roles)
  },
  set(value) {
    state.roles = mergeRole(value, state.roles)
    console.log(state.roles)
  }
})

</script>

<template>
  <v-form :readonly="readonly" @submit.prevent>
    <v-container>
      <slot name="alert"/>
      <v-row no-gutters>
        <v-col cols="12" xs="6" sm="6" class="px-2">
          <v-text-field
            variant="underlined"
            v-model="state.email"
            label="code"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            @input="v$.email.$touch"
            @blur="v$.email.$touch"
          />
        </v-col>
        <v-col data-cy="roles-input-col">
          <v-radio-group
            v-model="role"
          >
            <v-radio
              label="ROLE_ADMIN"
              color="error"
              value="ROLE_ADMIN"
            />
            <v-radio
              label="ROLE_EDITOR"
              color="warning"
              value="ROLE_EDITOR"
            />
            <v-radio
              label="ROLE_USER"
              color="success"
              value="ROLE_USER"
            />
          </v-radio-group>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
