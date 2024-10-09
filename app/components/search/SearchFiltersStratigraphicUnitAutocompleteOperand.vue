<script setup>
const operands = defineModel({
  required: true,
})
const operand = computed({
  get() {
    return operands.value[0]
  },

  set(value) {
    operands.value = [value]
  },
})
</script>

<template>
  <api-resource-stratigraphic-unit-autocomplete
    item-value="id"
    item-title="code"
    label="value"
    v-model="operand"
  />
</template>
