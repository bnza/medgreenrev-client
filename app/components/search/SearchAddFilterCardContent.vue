<script setup lang="ts">
import type { Filter, VocabularyResourceKey } from '~~/types'
import type { VForm } from 'vuetify/components'
import { resourceFilterStateInjectionKey } from '~/composables/states/useResourceFilterState'
import { API_FILTERS } from '~/utils/constants/filters'
import useFilterValidation from '~/composables/validation/useFilterValidation'

const {
  setFilter,
  availableProperties,
  getAvailableOperators,
  isAddFilterDialogOpen,
} = inject(resourceFilterStateInjectionKey)

const filter: Filter = reactive({
  property: '',
  filter: null,
  operands: [],
})

const availableOperators = ref([])

watch(
  () => filter.property,
  (prop) => {
    if (prop) {
      availableOperators.value = getAvailableOperators(prop)
      filter.filter = null
    }
  },
  {
    immediate: true,
  },
)

watch(
  () => filter.filter,
  (_, oldFilter) => {
    if (!oldFilter) {
      return
    }
    filter.operands = []
  },
  {
    immediate: true,
  },
)

const operandsComponentsMap = {
  Exists: resolveComponent('SearchFiltersBooleanOperand'),
  Single: resolveComponent('SearchFiltersSingleOperand'),
  SiteAutocomplete: resolveComponent('SearchFiltersSiteAutocompleteOperand'),
  StratigraphicUnitAutocomplete: resolveComponent(
    'SearchFiltersStratigraphicUnitAutocompleteOperand',
  ),
  VocabularyAutocomplete: resolveComponent(
    'SearchFiltersVocabularyAutocompleteOperand',
  ),
}

const operandsComponentsVocabularyKey = ref<VocabularyResourceKey | undefined>(
  undefined,
)
const operandsComponent = computed(() => {
  const operatorId = filter.filter
  if (!operatorId) {
    return ''
  }
  const operatorObject = API_FILTERS[operatorId]
  const operandsKey = operatorObject.operandsComponent
  operandsComponentsVocabularyKey.value =
    operatorObject.operandComponentVocabularyKey
  return operandsComponentsMap[operandsKey]
})

const rules = useFilterValidation()
const form = useTemplateRef<VForm>('form')

const isInvalid = defineModel<boolean>('isInvalid', { required: true })
watchEffect(() => {
  if (form.value) {
    isInvalid.value = !Boolean(form.value.isValid)
  }
})
const triggerSubmit = defineModel<boolean>('triggerSubmit', { required: true })
watch(triggerSubmit, (trigger) => {
  if (trigger) {
    form.value.validate()
    if (!form.value.isValid) {
      return
    }
    triggerSubmit.value = false
    setFilter(filter)
    isAddFilterDialogOpen.value = false
  }
})
</script>

<template>
  <v-card-text class="h-75" data-testid="filter-edit-content">
    <v-form @submit.prevent ref="form">
      <v-container>
        <v-row>
          <v-col>
            <v-select
              :rules="rules['property']"
              v-model="filter.property"
              :items="availableProperties"
              label="property"
            />
          </v-col>
          <v-col>
            <v-select
              :rules="rules['filter']"
              v-if="filter.property"
              v-model="filter.filter"
              :items="availableOperators"
              label="operator"
            />
          </v-col>
          <v-col>
            <component
              v-if="operandsComponent"
              :is="operandsComponent"
              v-model="filter.operands"
              :vocabulary-key="operandsComponentsVocabularyKey"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-form>
  </v-card-text>
</template>
