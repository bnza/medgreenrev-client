<script setup lang="ts">
import type {
  ApiAction,
  ApiResourcePottery,
  ApiResourceStratigraphicUnit,
} from '~~/types'
import useDataItemResourcePageWatchTriggerSubmit from '~/composables/useDataItemResourcePageWatchTriggerSubmit'
import usePotteryValidation from '~/composables/validation/usePotteryValidation'
import useCreateParentStateKey from '~/composables/states/useCreateParentStateKey'

type RT = ApiResourcePottery
const props = defineProps<{
  mode: ApiAction
  item: Partial<RT>
}>()

const { isAuthenticated } = useAppAuth()
const state = reactive(clone(props.item))

const rules = usePotteryValidation(props.item)

const { triggerSubmit, submittingItem } = inject(dataItemPageInjectionKey)
useDataItemResourcePageWatchTriggerSubmit(triggerSubmit, state, submittingItem)

const createParentState = useCreateParentStateKey()
if (createParentState.value) {
  state.stratigraphicUnit = await useNuxtApp()
    .$api.getRepository<ApiResourceStratigraphicUnit>('stratigraphicUnit')
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
      <v-col cols="12" xs="12" sm="4" class="px-2">
        <api-resource-stratigraphic-unit-autocomplete
          readonly
          :disabled="mode === 'update'"
          :validation-value="state"
          v-model="state.stratigraphicUnit"
          :rules="rules['stratigraphicUnit']"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="2" class="px-2">
        <v-text-field
          :rules="rules['number']"
          :validation-value="state"
          :disabled="mode === 'update'"
          v-model="state.number"
          label="number"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="2" class="px-2">
        <v-text-field
          v-model="state.projectIdentifier"
          label="project identifier"
        />
      </v-col>
      <v-spacer />
      <v-col cols="12" xs="12" sm="2" class="px-2">
        <v-text-field
          :rules="rules['fragmentsNumber']"
          v-model="state.fragmentsNumber"
          label="number of fragments"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="12" sm="4" class="px-2">
        <lazy-api-vocabulary-autocomplete
          label="part"
          :vocabulary-key="'vocabularyPotteryPart'"
          v-model="state.part"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="px-2">
        <lazy-api-vocabulary-autocomplete
          label="functional group"
          :rules="rules['functionalGroup']"
          :vocabulary-key="'vocabularyPotteryFunctionalGroup'"
          v-model="state.functionalGroup"
        />
      </v-col>
      <v-col cols="12" xs="12" sm="4" class="px-2">
        <lazy-api-vocabulary-autocomplete
          label="typology"
          :rules="rules['typology']"
          :vocabulary-key="'vocabularyPotteryTypology'"
          v-model="state.typology"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12" xs="12" class="px-2">
        <v-textarea label="description" v-model="state.description" />
      </v-col>
    </v-row>
  </lazy-data-item-form>
</template>
