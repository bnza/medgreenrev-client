<script setup lang="ts">
import type {
  ApiAction,
  ApiResourceSite,
  ApiResourceStratigraphicUnit,
} from '~~/types'
import useDataItemResourcePageWatchTriggerSubmit from '~/composables/useDataItemResourcePageWatchTriggerSubmit'
import useStratigraphicUnitValidation from '~/composables/validation/useStratigraphicUnitValidation'
import useCreateParentStateKey from '~/composables/states/useCreateParentStateKey'

type RT = ApiResourceStratigraphicUnit
const props = defineProps<{
  mode: ApiAction
  item: Partial<RT>
}>()

const { isAuthenticated } = useAppAuth()
const state = reactive(clone(props.item))

const validation = useStratigraphicUnitValidation(props.item)

const { triggerSubmit, submittingItem } = inject(dataItemPageInjectionKey)
useDataItemResourcePageWatchTriggerSubmit(triggerSubmit, state, submittingItem)
const createParentState = useCreateParentStateKey()
if (createParentState.value) {
  state.site = await useNuxtApp()
    .$api.getRepository<ApiResourceSite>('site')
    .fetchItem(createParentState.value[1])
}
onUnmounted(() => {
  createParentState.value = undefined
})
</script>

<template>
  <lazy-data-item-form :mode>
    <v-row v-if="isAuthenticated" no-gutters justify="end">
      <v-col cols="12" sm="3" class="px-2">
        <v-checkbox label="public" v-model="state.public" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="6" sm="4" class="px-2">
        <api-resource-site-autocomplete
          :disabled="mode === 'update'"
          readonly
          :validation-value="state"
          v-model="state.site"
          :rules="validation.rules['site']"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="px-2">
        <v-text-field
          :disabled="mode === 'update'"
          v-model="state.year"
          label="year"
          :rules="validation.rules['year']"
          :validation-value="state"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="px-2">
        <v-text-field
          :disabled="mode === 'update'"
          :rules="validation.rules['number']"
          v-model="state.number"
          label="number"
          :validation-value="state"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="12" class="px-2">
        <v-textarea label="interpretation" v-model="state.interpretation" />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="12" class="px-2">
        <v-textarea label="description" v-model="state.description" />
      </v-col>
    </v-row>
  </lazy-data-item-form>
</template>
