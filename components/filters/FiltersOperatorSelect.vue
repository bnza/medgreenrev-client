<script setup>
const props = defineProps({
  property: {
    type: String,
    required: true,
  },
})

const { property } = toRefs(props)
const { availableOperatorsFn } = inject('resourceFiltersState')
const availableOperators = availableOperatorsFn(property.value)
const operator = defineModel('operator')
</script>

<template>
  <v-select
    v-model="operator"
    :items="availableOperators"
    item-value="id"
    item-title="label"
    label="operator"
  />
</template>

<style scoped></style>
