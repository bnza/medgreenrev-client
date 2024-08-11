<script setup>
import { dataFormModeProp, dataFormItemProp } from '~/lib/props.js'
import useSubmitForm from '~/composables/form/useSubmitForm.js'

const props = defineProps({
  triggerSubmit: Boolean,
  mode: dataFormModeProp,
  item: dataFormItemProp,
})

const { readonly } = useDataForm({
  type: props.mode,
})

const { isAuthenticated } = useAppAuth()

const emit = defineEmits([
  'update:invalid',
  'validationReady',
  'update:triggerSubmit',
  'submitForm',
])
const { state, v$ } = await useSubmitForm('stratigraphicUnits', props, emit)
const { resourceConfig } = await useResource('stratigraphicUnits')

if (!('site' in state)) {
  state.site = {}
}
</script>

<template>
  <v-form :readonly="readonly" @submit.prevent>
    <v-container>
      <slot name="alert" />
      <v-row v-if="isAuthenticated" no-gutters justify="end">
        <v-col cols="12" sm="3" class="px-2">
          <v-checkbox label="public" v-model="state.public" />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12" xs="6" sm="2" class="px-2">
          <v-text-field
            v-if="mode !== API_ACTIONS.Create"
            class="text-input-secondary"
            variant="underlined"
            :model-value="resourceConfig.getCodeFn(item)()"
            label="code"
          />
          <autocomplete-api
            v-else
            label="site"
            path="sites"
            order-by="code"
            item-title="code"
            item-subtitle="name"
            v-model="state.site"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="5" class="px-2">
          <v-text-field
            variant="underlined"
            v-model="state.year"
            label="year"
            :error-messages="v$.year.$errors.map((e) => e.$message)"
            @input="v$.year.$touch"
            @blur="v$.year.$touch"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="5" class="px-2">
          <v-text-field
            variant="underlined"
            v-model="state.number"
            label="number"
            :error-messages="v$.number.$errors.map((e) => e.$message)"
            @input="v$.number.$touch"
            @blur="v$.number.$touch"
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
      <v-row no-gutters>
        <v-col cols="12" xs="12" class="px-2">
          <v-textarea
            variant="underlined"
            label="interpretation"
            v-model="state.interpretation"
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
