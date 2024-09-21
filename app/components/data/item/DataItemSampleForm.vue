<script setup lang="ts">
import useSubmitForm from '~/composables/form/useSubmitForm'

const props = defineProps<{
  triggerSubmit?: boolean
  mode: ApiAction
  item: Partial<ApiLdResourceItem<ApiResourceSample>>
}>()

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
const { state, v$ } = await useSubmitForm<ApiResourceSample>(
  'samples',
  props,
  emit,
)

const parent = useRoute().query?.parent as unknown as
  | Record<string, string | number>
  | undefined

const parentId: ApiId | undefined =
  parent && Object.values(parent).length > 0
    ? Object.values(parent)[0]
    : undefined
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
            v-if="['read', 'delete', 'update'].includes(mode)"
            class="text-input-secondary"
            variant="underlined"
            v-model="state.stratigraphicUnit.code"
            label="SU"
          />
          <autocomplete-parent-api
            v-else
            resource-key="stratigraphicUnits"
            :id="parentId"
            label="SU"
            @fetched="state.stratigraphicUnit = $event"
            :error-messages="
              v$.stratigraphicUnit.$errors.map((e) => e.$message)
            "
          />
        </v-col>
        <v-col cols="12" xs="12" sm="10" class="px-2">
          <v-text-field
            variant="underlined"
            v-model="state.number"
            label="number"
            :error-messages="v$.number.$errors.map((e) => e.$message)"
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
