<script setup>
const operands = defineModel('operands', {
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
  <Suspense>
    <v-text-field v-bind="$attrs" label="value" v-model="operand" />
    <template #fallback>
      <v-skeleton-loader type="text" />
    </template>
  </Suspense>
</template>

<style scoped></style>
