<script setup>
const operands = defineModel({
  required: true,
})
const operand = computed({
  get() {
    return operands.value[0]
  },

  set(value) {
    operands.value = [Boolean(value)]
  },
})
</script>

<template>
  <v-checkbox
    label="value"
    v-model="operand"
    :rules="[defined]"
    :indeterminate="'undefined' === typeof operand"
  />
</template>
