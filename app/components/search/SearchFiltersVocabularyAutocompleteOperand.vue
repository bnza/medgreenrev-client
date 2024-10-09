<script setup lang="ts">
import type { VocabularyResourceKey } from '~~/types/index.js'

defineProps<{ vocabularyKey: VocabularyResourceKey }>()
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
  <api-vocabulary-autocomplete
    return-object
    item-value="id"
    :vocabulary-key
    label="value"
    v-model="operand"
    :rules="[required]"
  />
</template>
