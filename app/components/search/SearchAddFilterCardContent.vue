<script setup lang="ts">
import { resourceFilterStateInjectionKey } from '~/composables/states/useResourceFilterState'
import type { Filter } from '~~/types'
import { API_FILTERS } from '~/utils/constants/filters'
import useFilterValidation from '~/composables/validation/useFilterValidation'
import { helpers, minLength, required } from '@vuelidate/validators'
import { FORM_REQUIRED_FIELD } from '~/composables/validation/messages'

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
  Single: resolveComponent('SearchFiltersOperandSingle'),
}

const operandsComponent = computed(() => {
  const operatorId = filter.filter
  if (!operatorId) {
    return ''
  }
  const operatorObject = API_FILTERS[operatorId]
  const operandsKey = operatorObject.operandsComponent

  return operandsComponentsMap[operandsKey]
})

const emit = defineEmits(['update:invalid'])
const { v$ } = useFilterValidation(filter, emit)

const triggerSubmit = defineModel<boolean>('triggerSubmit', { required: true })
watch(triggerSubmit, (trigger) => {
  if (trigger) {
    v$.value.$validate()
    if (v$.value.$invalid) {
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
    <v-container>
      <v-row>
        <v-col>
          <v-select
            v-model="filter.property"
            :items="availableProperties"
            label="property"
            @blur="v$.property.$touch"
            :error-messages="v$.property.$errors.map((e) => e.$message)"
          />
        </v-col>
        <v-col>
          <v-select
            v-if="filter.property"
            v-model="filter.filter"
            :items="availableOperators"
            label="operator"
            @blur="v$.filter.$touch"
            :error-messages="v$.filter.$errors.map((e) => e.$message)"
          />
        </v-col>
        <v-col>
          <component
            v-if="operandsComponent"
            :is="operandsComponent"
            v-model="filter.operands"
            @blur="v$.operands.$touch"
            :error-messages="v$.operands.$errors.map((e) => e.$message)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
