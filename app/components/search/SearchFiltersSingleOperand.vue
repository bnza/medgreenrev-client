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
  <v-text-field label="value" v-model="operand" />
</template>
