<script setup>
import { dataFormModeProp, dataFormItemProp } from '~/lib/props.js'
import { useResourceSiteValidation } from '~/composables/validation/useResourceSiteValidation.js'

const props = defineProps({
  mode: dataFormModeProp,
  item: dataFormItemProp,
})

const { readonly } = useDataForm({
  type: props.mode,
})

const { isAuthenticated } = useAppAuth()

const { item } = toRefs(props)
const _emitUpdateInvalid = defineEmits(['update:invalid', 'validationReady'])
const { state, v$ } = useResourceSiteValidation(item, _emitUpdateInvalid)
</script>

<template>
  <v-form :readonly="readonly" @submit.prevent>
    <v-container>
      <v-row v-if="isAuthenticated" no-gutters justify="end">
        <v-col cols="12" sm="3" class="px-2">
          <v-checkbox label="public" v-model="state.public" />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" xs="6" sm="2" class="px-2">
          <v-text-field
            class="text-input-secondary"
            variant="underlined"
            v-model="state.code"
            label="code"
            :error-messages="v$.code.$errors.map((e) => e.$message)"
            @input="v$.code.$touch"
            @blur="v$.code.$touch"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="10" class="px-2">
          <v-text-field
            variant="underlined"
            v-model="state.name"
            label="name"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            @input="v$.name.$touch"
            @blur="v$.name.$touch"
          />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" xs="12" class="px-2">
          <v-textarea
            variant="underlined"
            label="description"
            v-model="state.description"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>
<style scoped>
.text-input-secondary:deep(input) {
  font-weight: bold;
  color: #80bc37;
}
</style>
