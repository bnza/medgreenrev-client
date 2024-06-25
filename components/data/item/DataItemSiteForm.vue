<script setup>
import { dataFormModeProp, dataFormItemProp } from '~/lib/props.js'
import { useResourceSiteValidation } from '~/composables/validation/useResourceSiteValidation.js'

const props = defineProps({
  mode: dataFormModeProp,
  item: dataFormItemProp,
})

const { readonly } = useDataForm({
  mode: props.mode,
})

const { item } = toRefs(props)
const _emitUpdateInvalid = defineEmits(['update:invalid', 'ready'])
const { state, v$ } = useResourceSiteValidation(item, _emitUpdateInvalid)
</script>

<template>
  <v-form :readonly="readonly" @submit.prevent class="pa-6">
    <v-text-field
      variant="underlined"
      v-model="state.code"
      label="code"
      :error-messages="v$.code.$errors.map((e) => e.$message)"
      @input="v$.code.$touch"
      @blur="v$.code.$touch"
    />
    <v-text-field
      variant="underlined"
      v-model="state.name"
      label="name"
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      @input="v$.name.$touch"
      @blur="v$.name.$touch"
    />
    <v-textarea
      variant="underlined"
      label="description"
      v-model="state.description"
    />
  </v-form>
</template>
