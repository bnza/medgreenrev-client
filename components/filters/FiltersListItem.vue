<script setup lang="ts">
const props = defineProps<{ filter: Filter }>()
defineEmits(['removeFilter'])
const operandValue = (operand: unknown) => {
  if (!isPlainObject(operand)) {
    return operand
  }
  if (!(props.filter.filter in API_FILTERS)) {
    console.error(`Unknown filter "${props.filter.filter}"`)
    return operand.id
  }
  if (!('operandListItemPropertyKey' in API_FILTERS[props.filter.filter])) {
    console.error('Operand is an object, but no property key given')
    return operand.id
  }
  const key = API_FILTERS[props.filter.filter].operandListItemPropertyKey
  if (!(key || key in operand)) {
    console.error(`Invalid key "${key}"`)
    return operand.id
  }
  return operand[key]
}

const propertyValue = computed(() => {
  if (!props.filter?.filter) {
    return props.filter.property
  }
  const filterDef = API_FILTERS[props.filter.filter]
  return filterDef.propertyLabel || props.filter.property
})
</script>

<template>
  <v-list-item :key="filter.id" data-testid="filters-list-item">
    <v-container>
      <v-row align-content="space-evenly">
        <v-col cols="1">
          <v-btn
            color="error"
            :icon="true"
            variant="text"
            @click="$emit('removeFilter', filter)"
            data-testid="delete-filter-button"
          >
            <v-icon icon="fas fa-minus" size="large" />
            <v-tooltip activator="parent" location="bottom"
              >Delete filter
            </v-tooltip>
          </v-btn>
        </v-col>
        <v-col>
          <v-text-field :readonly="true" :model-value="propertyValue" />
        </v-col>
        <v-col>
          <v-text-field
            :readonly="true"
            :model-value="API_FILTERS[filter.filter].label"
          />
        </v-col>
        <v-col>
          <v-text-field
            v-for="operand in filter.operands"
            :readonly="true"
            :model-value="operandValue(operand)"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-list-item>
</template>

<style scoped></style>
