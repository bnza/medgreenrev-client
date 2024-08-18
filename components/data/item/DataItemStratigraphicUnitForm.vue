<script setup lang="ts" generic="RT extends ApiResourceStratigraphicUnit">
import useSubmitForm from '~/composables/form/useSubmitForm'

const props = defineProps<{
  triggerSubmit?: boolean
  mode: ApiAction
  item: ApiLdResourceItem<RT>
}>()

const { readonly } = useDataForm({
  type: props.mode,
})

const { isAuthenticated, hasSitePrivilegeEditor, hasRoleAdmin } = useAppAuth()

const emit = defineEmits([
  'update:invalid',
  'validationReady',
  'update:triggerSubmit',
  'submitForm',
])
const { state, v$ } = await useSubmitForm<RT>('stratigraphicUnits', props, emit)
const { resourceConfig } = await useResource('stratigraphicUnits')

if (!('site' in state)) {
  state.site = {}
}

const canEditCode = computed(() => {
  if (readonly.value) {
    return false
  }
  if (props.mode === 'create') {
    return true
  }
  return hasSitePrivilegeEditor(props.item.site.id)
})
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
          <autocomplete-api
            v-if="canEditCode"
            label="site"
            path="sites"
            order-by="code"
            item-title="code"
            item-subtitle="name"
            :authorized-only="true"
            v-model="state.site"
          />
          <v-text-field
            v-else
            readonly
            class="text-input-secondary"
            variant="underlined"
            :model-value="resourceConfig.getCodeFn(item)()"
            label="code"
          />
        </v-col>
        <v-col cols="12" xs="12" sm="5" class="px-2">
          <v-text-field
            :readonly="!canEditCode"
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
            :readonly="!canEditCode"
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
