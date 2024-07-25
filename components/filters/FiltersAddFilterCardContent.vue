<script setup>
import { generateId } from '~/lib/index.js'

const id = ref('')
const property = ref(null)
const filter = ref(null)
const operands = ref([])

const operandsComponentsMap = {
  Single: resolveComponent('FiltersSingleOperand'),
}

const operandsComponent = computed(() => {
  const operatorId = filter.value
  if (!operatorId) {
    return ''
  }
  const operatorObject = API_FILTERS[operatorId]
  const operandsKey = operatorObject.operandsComponent
  return operandsComponentsMap[operandsKey]
})

const props = defineProps({
  triggerSubmit: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['addFilter'])

const { triggerSubmit } = toRefs(props)

watch(triggerSubmit, async (trigger) => {
  if (trigger) {
    // emit('update:triggerSubmit', false)
    // const valid = await v$.value.$validate()
    // if (valid) {
    emit('addFilter', {
      id: id.value ? toRaw(id.value) : generateId(),
      property: toRaw(property.value),
      filter: toRaw(filter.value),
      operands: toRaw(operands.value),
    })
    // }
  }
})

watch(property, () => {
  filter.value = null
})

watch(filter, (_, oldFilter) => {
  if (!oldFilter) {
    return
  }
  operands.value = []
})
</script>

<template>
  <v-card-text class="h-75">
    <v-container>
      <v-row>
        <v-col>
          <lazy-filters-property-select v-model:property="property" />
        </v-col>
        <v-col>
          <lazy-filters-operator-select
            v-if="property"
            :property="property"
            v-model:operator="filter"
          />
        </v-col>
        <v-col>
          <component
            v-if="operandsComponent"
            :is="operandsComponent"
            v-model:operands="operands"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-card-text>
</template>
