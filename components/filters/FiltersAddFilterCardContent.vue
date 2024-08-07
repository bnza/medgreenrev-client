<script setup>
import { generateId } from '~/lib/index.js'
import useFilterValidation from '~/composables/validation/filters/useFilterValidation.js'

const filter = reactive({
  id: '',
  property: '',
  filter: '',
  operands: [],
})

const operandsComponentsMap = {
  Single: resolveComponent('FiltersSingleOperand'),
  SiteAutocomplete: resolveComponent('FiltersSiteAutocompleteOperand'),
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

const emit = defineEmits(['addFilter', 'update:invalid'])

const triggerSubmit = defineModel('triggerSubmit', { required: true })

const { setFilterAndCloseDialog } = inject('resourceFiltersState')

watch(triggerSubmit, async (trigger) => {
  if (trigger) {
    triggerSubmit.value = false
    if (!filter.id) {
      filter.id = generateId()
    }
    const valid = await v$.value.$validate()
    if (valid) {
      setFilterAndCloseDialog(filter)
    }
  }
})

watch(
  () => filter.property,
  () => {
    filter.filter = null
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
)

const { v$ } = useFilterValidation(filter, emit)
</script>

<template>
  <v-card-text class="h-75" data-testid="filter-edit-content">
    <v-container>
      <v-row>
        <v-col>
          <lazy-filters-property-select
            v-model:property="filter.property"
            :error-messages="v$.property.$errors.map((e) => e.$message)"
          />
        </v-col>
        <v-col>
          <lazy-filters-operator-select
            v-if="filter.property"
            :property="filter.property"
            v-model:operator="filter.filter"
            :error-messages="v$.filter.$errors.map((e) => e.$message)"
          />
        </v-col>
        <v-col>
          <component
            v-if="operandsComponent"
            :is="operandsComponent"
            v-model:operands="filter.operands"
            :error-messages="v$.operands.$errors.map((e) => e.$message)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
