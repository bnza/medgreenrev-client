<script setup lang="ts">
const operands = defineModel('operands', {
  required: true,
})
const operand = computed({
  get() {
    return operands.value[0]
  },

  set(value) {
    operands.value = [toRaw(value)]
  },
})
</script>

<template>
  <autocomplete-api
    label="SU"
    path="stratigraphic_units"
    order-by="code"
    item-title="code"
    v-model="operand"
  />
</template>

<style scoped></style>
