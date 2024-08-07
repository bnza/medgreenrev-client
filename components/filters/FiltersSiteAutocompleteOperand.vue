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
    label="site"
    path="sites"
    order-by="code"
    item-title="code"
    item-subtitle="name"
    v-model="operand"
  />
</template>

<style scoped></style>
